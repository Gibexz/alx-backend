// import { createClient } from 'redis';
const redis = require('redis')
const createClient = redis.createClient();

const client = await createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .connect();

await client.set('key', 'value');
const value = await client.get('key');
await client.disconnect();


// import { createClient } from 'redis';

// const client = createClient();

// client.on('error', err => console.log('Redis Client Error', err));

// client.set('key111', 'ANDREW', (err, reply) => {
//   if (err) {
//     console.error('Error setting value in Redis:', err);
//     client.quit();
//     return;
//   }

//   client.get('key111', (err, value) => {
//     if (err) {
//       console.error('Error retrieving value from Redis:', err);
//       client.quit();
//       return;
//     }

//     console.log('Retrieved value:', value);
//     console.log('Type of value:', typeof value); // Check the type of the retrieved value
//     console.log('String value:', String(value)); // Convert value to a string explicitly
//     console.log('Value as boolean:', Boolean(value)); // Check value as a boolean
//     client.quit();
//   });
// });
