module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        // This will remove the existing rule for fabric
        webpackConfig.module.rules = webpackConfig.module.rules.filter(
          (rule) => !rule.test || !rule.test.test('fabric.js')
        );
  
        // Add a new rule for fabric
        webpackConfig.module.rules.push({
          test: /fabric\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        });
  
        return webpackConfig;
      },
    },
  };