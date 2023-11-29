const kue = require('kue');

const createPushNotificationsJobs = (jobs, queue) => {
  if (Array.isArray(jobs) && jobs.length > 0) {
    jobs.forEach((jobObject) => {
      const newJob = queue.create('push_notification_code_3', jobObject);
      newJob
        .on('enqueue', () => {
          console.log(`Notification job created: ${newJob.id}`);
        })
        .on('complete', () => {
          console.log(`Notification job ${newJob.id} completed`);
        })
        .on('failed', (error) => {
          console.log(`Notification job ${newJob} failed: ${error}`);
        })
        .on('progress', (progress, data) => {
          console.log(`Notification job ${newJob} ${progress}% complete`);
        });
      newJob.save();
    });
  } else {
    throw (new Error('Jobs is not an array'));
  }
};

module.exports = createPushNotificationsJobs;
