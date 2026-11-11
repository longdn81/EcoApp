const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withTamagui } = require('@tamagui/metro-plugin');

const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  alias: {
    ...(config.resolver?.alias || {}),
    '@': path.resolve(__dirname, 'src'),
    '@/assets': path.resolve(__dirname, 'assets'),
  },
  resolveRequest: (context, moduleName, platform, _resolver) => {
    if (moduleName.startsWith('@/')) {
      const relativePath = moduleName.replace(/^@\//, '');
      const candidate = path.resolve(__dirname, 'src', relativePath);
      const resolved = require.resolve(candidate, { paths: [__dirname] });
      return context.resolveRequest(context, resolved, platform, _resolver);
    }

    if (moduleName.startsWith('@/assets/')) {
      const relativePath = moduleName.replace(/^@\/assets\//, '');
      const candidate = path.resolve(__dirname, 'assets', relativePath);
      const resolved = require.resolve(candidate, { paths: [__dirname] });
      return context.resolveRequest(context, resolved, platform, _resolver);
    }

    return context.resolveRequest(context, moduleName, platform, _resolver);
  },
};

module.exports = withTamagui(config, {
  components: ['tamagui'],
  config: './tamagui.config.ts',
  outputCSS: './tamagui-web.css',
});

