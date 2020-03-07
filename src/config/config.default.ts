import { EggAppConfig, PowerPartial, EggAppInfo } from 'midway';

export type DefaultConfig = PowerPartial<EggAppConfig>;

const path = require('path');

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1573735359774_9316';

  // add your config here
  config.middleware = [];

  config.static = {
    prefix: '/',
    dir: [
      path.join(appInfo.baseDir, 'app/public'),
      path.join(appInfo.baseDir, 'app/public/build'),
    ],
  };

  config.view = {
    root: path.join(appInfo.baseDir, 'app/public/build'),
    mapping: {
      '.html': 'nunjucks',
    },
  };

  config.assets = {
    publicPath: 'public',
  };

  config.io = {
    init: {}, // passed to engine.io
    namespace: {
      ws: {
        connectionMiddleware: ['auth'],
        packetMiddleware: [],
      },
    },
  };

  return config;
};
