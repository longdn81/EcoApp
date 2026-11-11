// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: [
      'dist/**',
      '.expo/**',
      '.expo-web-build/**',
      '.tamagui/**',
      'tamagui-web.css',
      'node_modules/**',
      'web-build/**',
    ],
  },
]);
