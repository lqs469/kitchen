import * as path from 'path';

module.exports = (appInfo: any) => {
  const config: any = (exports = {});

  config.watchDirs = [
    'app',
    'lib',
    'service',
    'config',
    'app.ts',
    'agent.ts',
    'interface.ts',
  ];
  config.overrideDefault = true;

  config.assets = {
    publicPath: 'public',
    devServer: {
      port: 10000,
      command: 'npm run dev:client',
      env: {
        BROWSER: 'none',
      },
    },
  };

  config.view = {
    root: path.join(appInfo.baseDir, 'app/view'),
    mapping: {
      '.html': 'nunjucks',
    },
  };

  return config;
};
