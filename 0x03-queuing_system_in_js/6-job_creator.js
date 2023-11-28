const kue = require('kue');

const queue = kue.createQueue();

const jobObject = {
  phoneNumber: '08140475093',
  message: 'I see you',
};

const job = queue.create('push_notification_code', jobObject);

job
  .on('enqueue', () => {
    console.log(`Notification job created: ${job.id}`);
  })

  .on('complete', () => {
    console.log('Notification job completed');
  })

  .on('failed', () => {
    console.log('Notification job failed');
  });
job.save();
