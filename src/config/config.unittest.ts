import * as path from 'path';

module.exports = (appInfo: any) => {
  const config: any = (exports = {});

  config.assets = {
    devServer: false,
  };

  config.view = {
    root: path.join(appInfo.baseDir, 'app/view'),
    mapping: {
      '.html': 'nunjucks',
    },
  };

  return config;
};
