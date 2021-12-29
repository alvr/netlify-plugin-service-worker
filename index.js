const workbox = require("workbox-build");

module.exports = {
  onPostBuild: async ({ constants, inputs, netlifyConfig }) => {
    await workbox.generateSW({
      cacheId: netlifyConfig.build.environment.COMMIT_REF,
      globDirectory: constants.PUBLIC_DIR,
      swDest: constants.PUBLIC_DIR + inputs.sw,
      globPatterns: inputs.patterns,
      navigateFallback: inputs.fallback,
      globIgnores: inputs.ignores,
      runtimeCaching: inputs.caching,
    })
  }
}