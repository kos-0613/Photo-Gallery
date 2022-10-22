const WindiCSS = require("windicss-webpack-plugin");

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.plugins.push(new WindiCSS());
    return config;
  },

  images: {
    domains: ["images.unsplash.com", "deelay.me", "picsum.photos"],
  },
};
