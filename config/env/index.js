const development = require('./development');
const production = require('./production');

const defaults = {
  host: process.env.HOST || 'mongodb',
  port: process.env.PORT || 8100,
};

function getConfig() {
  var config = null;
  switch (process.env.NODE_ENV) {
    case 'development':
      return (config = Object.assign({}, defaults, development));
    case 'production':
      return (config = Object.assign({}, defaults, production));
    default:
      return (config = Object.assign({}, defaults, development)); //eslint-disable-line
  }
}

/**
 * Expose
 */

module.exports = getConfig();
