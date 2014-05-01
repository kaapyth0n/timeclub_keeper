var env = process.env['nodejs_environment'] || 'dev';

var config = {}

// = DEV environment

config.dev = {
  'vk.app_id': '4316873',
  'vk.app_secret': 'UGvtlYTxfXeql9jEL8uA',

  'fs.app_id': '3YXAQ5X0R52YNXCT2K0WLDS0O1LX4JEKDBU2YPPIIMUIUYSR',
  'fs.app_secret': '5QTWJPGTS2NFLTEC2SRPS2AELIN1N1QBC3HC4EE2Z1QA1BML',
  
  'url': 'http://chaifai-105917.euw1-2.nitrousbox.com',
  'db': 'chaifai'
}

// = TEST environment

config.test = {};
// copy all from dev
for (p in config.dev) config.test[p] = config.dev[p];

config.test = {
  'url': 'http://localhost',
  'db': 'chaifai-test'
}

// ===

// set 'env' to current environment
for (p in config) {
  config[p].env = env;
}

module.exports = config[env];
