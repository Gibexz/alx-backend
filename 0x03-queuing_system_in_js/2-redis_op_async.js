// import createClient from "redis/lib/createClient";
import { createClient, print } from 'redis';
import { promisify } from 'util';

const client = createClient();

client.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error}`);
});

const setNewSchool = function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);
};

const display = promisify(client.get).bind(client);

const displaySchoolValue = async (schoolName) => {
  const reply = await display(schoolName);
  console.log(reply);
};

async function main() {
  await displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
}

client.on('connect', async () => {
  console.log('Redis client connected to the server');
  await main();
});
