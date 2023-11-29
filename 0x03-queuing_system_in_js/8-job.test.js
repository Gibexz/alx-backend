import sinon from 'sinon';

const { expect } = require('chai');

const queue = require('kue').createQueue();
const testfunction = require('./8-job');

before(() => {
  queue.testMode.enter();
});

afterEach(() => {
  queue.testMode.clear();
});

after(() => {
  queue.testMode.exit();
});

describe('createPushNotificationsJobs as testfunction', () => {
  before(() => {
    queue.testMode.enter();
  });

  afterEach(() => {
    queue.testMode.clear();
  });

  after(() => {
    queue.testMode.exit();
  });

  const faketests = sinon.spy(console);
  it('if job is not an array, show throw the correct coded error message', () => {
    expect(() => testfunction(null, queue)).to.throw('Jobs is not an array');
  });

  it('if job is an empty array, show throw the correct coded error message', () => {
    expect(() => testfunction([], queue)).to.throw('Jobs is not an array');
  });

  it('should create 2 new jobs in the queue', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account',
      },
    ];

    testfunction(jobs, queue);

    expect(queue.testMode.jobs.length).to.equal(2);
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[0].data).to.eql({
      phoneNumber: '4153518780',
      message: 'This is the code 1234 to verify your account',
    });
    expect(queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
    queue.process('push_notification_code_3', (done) => {
      expect(
        faketests.log
          .calledWith('Notification job created:', queue.testMode.jobs[0].id),
      ).to.be.true;
      done();
    });
  });

  it('should create jobs with unique IDs', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account',
      },
    ];

    testfunction(jobs, queue);

    const jobIds = queue.testMode.jobs.map((job) => job.id);
    expect(new Set(jobIds).size).to.equal(jobIds.length);
  });
});
