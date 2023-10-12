process.on('message', (message) => {
    console.log('Child process received:', message);
  });
  
  process.send({ hello: 'from child process' });