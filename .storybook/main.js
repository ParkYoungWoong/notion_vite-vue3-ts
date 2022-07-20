const { loadConfigFromFile, mergeConfig } = require('vite')

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/vue3",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "features": {
    "storyStoreV7": true
  },
  viteFinal: async storybookConfig => {
    const { config: projectConfig } = await loadConfigFromFile(`${__dirname}/../vite.config.ts`)
    return mergeConfig(storybookConfig, {
      ...projectConfig,
      plugins: [] // `plugins: [vue()]` 초기화 필수!
    })
  }
}