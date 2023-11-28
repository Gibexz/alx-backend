import { createClient, print } from 'redis';

const client = createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
  client.quit();
});

client.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error}`);
});

const setSchoolHash = function setNewSchool(schoolHashKey, key, value) {
  client.hset(schoolHashKey, key, value, print);
};

const displaySchoolHash = (schoolHashKey) => {
  client.hgetall(schoolHashKey, (error, reply) => {
    console.log(reply);
  });
};

// use a loop as shown below, from franks repo
// function main() {
//     const hashObj = {
//       Portland: 50,
//       Seattle: 80,
//       'New York': 20,
//       Bogota: 20,
//       Cali: 40,
//       Paris: 2,
//     };
//     for (const [field, value] of Object.entries(hashObj)) {
//       updateHash('HolbertonSchools', field, value);
//     }
//     printHash('HolbertonSchools');
//   }

setSchoolHash('HolbertonSchools', 'Portland', 50);
setSchoolHash('HolbertonSchools', 'Seattle', 80);
setSchoolHash('HolbertonSchools', 'New York', 20);
setSchoolHash('HolbertonSchools', 'Bogota', 20);
setSchoolHash('HolbertonSchools', 'Cali', 40);
setSchoolHash('HolbertonSchools', 'Paris', 2);

displaySchoolHash('HolbertonSchools');
