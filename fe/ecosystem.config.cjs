module.exports = {
  apps: [
    {
      name: 'hello-world-fe',
      exec_mode: 'cluster',
      instances: 'max',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 80 ./',
    },
  ],
};
