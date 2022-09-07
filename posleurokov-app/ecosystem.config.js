module.exports = {
  apps: [
    {
      name: 'vse-cruzki-front-end',
      cwd: '/var/www/html/vse-cruzki/posleurokov-front-end/posleurokov-app',
      script: 'yarn',
      args: 'start',
      env: {
        NODE_ENV: 'production'
      },
    },
  ],
}
