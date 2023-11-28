import { createClient } from 'redis';

const client = createClient();

const killMessage = 'KILL_SERVER';

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error}`);
});

client.subscribe('holberton school channel');

client.on('message', (error, message) => {
    console.log(message);
    if (message === killMessage) {
        client.unsubscribe();
        client.quit();
    }
});
