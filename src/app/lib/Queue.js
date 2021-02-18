import Queue from 'bull';
import redisConfig from '../../config/redis';
import * as jobs from '../jobs';

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle,
}));

export default {
  queues,
  add(name, data) {
    const queue = this.queues.find(({ name: queueName }) => queueName === name);

    return queue.bull.add(data);
  },
  process() {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.handle);

      mailQueue.on('failed', (job, error) => {
        console.log('Job Failed :>> ', queue.name, job.data, error);
      });
    });
  },
};

// const mailQueue = new Queue(RegistrationMail.key, redisConfig);

export default mailQueue;
