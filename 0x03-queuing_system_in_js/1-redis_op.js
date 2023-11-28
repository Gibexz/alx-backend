// import createClient from "redis/lib/createClient";
import { createClient, print } from 'redis';

const client = createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
  client.quit();
});

client.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error}`);
});

const setNewSchool = function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);
};

const displaySchoolValue = (schoolName) => {
  client.get(schoolName, (error, reply) => {
    console.log(reply);
  });
};

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
