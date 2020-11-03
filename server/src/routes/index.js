// mount each individual router into the main application
const main = require('./main');

module.exports = app => {
  app.use('/api', main);
};

