const workbox = require('workbox-build')
const {
  env: { COMMIT_REF },
} = require('process')

module.exports = {
  onBuild: async ({ constants, inputs }) => {
    await workbox.generateSW({
      cacheId: COMMIT_REF,
      globDirectory: constants.PUBLISH_DIR,
      swDest: `${constants.PUBLISH_DIR}/${inputs.sw}`,
      globPatterns: inputs.patterns,
      navigateFallback: inputs.fallback,
      mode: inputs.mode,
      globIgnores: inputs.ignores,
      runtimeCaching: inputs.caching,
    })
  }
}