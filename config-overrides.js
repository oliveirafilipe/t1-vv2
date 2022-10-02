module.exports = function override(configuration) {
  configuration.resolve.fallback = { fs: false };
  return configuration;
};
