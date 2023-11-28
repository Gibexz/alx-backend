// import createClient from "redis/lib/createClient";
import { createClient } from 'redis';

const client = createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
  client.quit();
});

client.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error}`);
});
