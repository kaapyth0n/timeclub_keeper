var env = process.env['nodejs_environment'] || 'dev';

var config = {}

// = DEV environment

config.dev = {
  'vk.app_id': '',
  'vk.app_secret': '',

  'fs.app_id': '',
  'fs.app_secret': '',
  
  'url': '',
  'db': ''
}

// = TEST environment

config.test = {};
// copy all from dev
for (p in config.dev) config.test[p] = config.dev[p];

config.test = {
  'url': '',
  'db': ''
}

// ===

// set 'env' to current environment
for (p in config) {
  config[p].env = env;
}

module.exports = config[env];
