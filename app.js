// const https = require('https');
// const fs = require('fs');

// const options = {
//     key: fs.readFileSync('localhost-key.pem'),
//     cert: fs.readFileSync('localhost.pem')
// };

// const port = 4000;

// const server = https.createServer(options, (req, res) => {
//     res.writeHead(200);
//     res.end('Hello World!');

// });

// server.listen(port, () => {
//   console.log(`Server running 🚀 at http://localhost:${port}/`);
// });


// const { fork } = require('child_process');

// const child = fork('./child.js');

// child.on('message', (message) => {
//   console.log('Parent process received:', message);
// });

// child.send({ hello: 'from parent process' });

// child.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });


// const cluster = require('cluster');
// const http = require('http');
// const os = require('os');

// const port = 6006;

// const requestHandler = (request, response) => {
//   response.writeHead(200);
//   if (request.url === '/error') {
//     throw new Error('Oh no!'); // Uncaught exception
//   } else {
//     response.end(`<h1 style="text-align:center;margin-top:40px;">It runs &#128640;</h1>`);
//     process.send({ cmd: 'notifyRequest' }); // Notify primary about the request
//   }
// };

// const server = http.createServer(requestHandler);

// console.log(`✅ ${cluster.isPrimary ? 'I am Primary' : `I am worker, my id is ${cluster.worker.id}`}`);

// // Check is cluster primary or not
// if (cluster.isPrimary) {
//   const cpuCount = os.cpus().length; // CPU core's amount

//   for (let i = 0; i < cpuCount; i++) {
//     cluster.fork(); // Forks worker for each CPU core
//   }

//   cluster.on('fork', (worker) => {
//     console.log(`Worker #${worker.id} is online 👍`);
//   });

//   cluster.on('listening', (worker, address) => {
//     console.log(`The worker #${worker.id} is now connected to port #${JSON.stringify(address.port)}`);
//     // Worker is waiting for Primary message
//     worker.on('message', messageHandler);
//   });

//   cluster.on('disconnect', (worker) => {
//     console.log(`The worker #${worker.id} has disconnected 🥲`);
//   });

//   cluster.on('exit', (worker) => {
//     console.log(`Worker ${worker.id} is dead 😵`);
//     cluster.fork(); // Create another worker instead of dead one
//   });

//   let numRequests = 0; // Number of incoming requests

//   function messageHandler(message) {
//     if (message.cmd && message.cmd === 'notifyRequest') {
//       numRequests += 1;
//       console.log(`Requests received: ${numRequests}`);
//     }
//   }
// } else {
//   server.listen(port + cluster.worker.id, (error) => {
//     if (error) {
//       return console.log(`Server error ${error}`);
//     }

//     console.log(`Server running 🚀 at http://localhost:${port + cluster.worker.id}/`);
//   });

//   process.on('uncaughtException', (error) => {
//     console.error(`${(new Date).toUTCString()} uncaught exception: ${error.message}`);
//     console.error(error.stack);
//     process.exit(1);
//   });
// }
