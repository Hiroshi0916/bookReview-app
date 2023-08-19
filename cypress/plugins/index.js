const { startDevServer } = require("@cypress/webpack-dev-server");
const webpackConfig = require("@cypress/react/plugins/react-scripts");

module.exports = (on, config) => {
  on("dev-server:start", (options) => {
    return startDevServer({ options, webpackConfig });
  });

  return config;
};
