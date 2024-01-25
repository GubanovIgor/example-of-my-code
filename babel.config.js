// Reanimated plugin has to be listed last.

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: [],
    },
  },
  plugins: [
    ['relay', { schema: 'data/schema.json' }],
    [
      'module-resolver',
      {
        alias: {
          components: './src/components',
          assets: './src/assets',
          config: './src/config',
          constants: './src/constants',
          core: './src/core',
          data: './src/data',
          modules: './src/modules',
          services: './src/core/services',
          queries: './src/queries',
          relay: './src/relay',
          store: './src/store',
          styles: './src/core/styles',
          libs: './src/libs',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
