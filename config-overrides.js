module.exports = function override(config) {
  console.log(config);
  config.resolve.fallback = { fs: false };
  return config;
};
