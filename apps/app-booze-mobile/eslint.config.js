// https://docs.expo.dev/guides/using-eslint/
const path = require('path');
const { defineConfig } = require('eslint/config');
const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
  resolvePluginsRelativeTo: path.join(__dirname, 'node_modules'),
});
const expoConfig = require('eslint-config-expo/flat');

// Base config from dv-prettier-lint (client)
const baseConfig = compat.config(
  require('@r-f-booze/dv-prettier-lint/config/client/.eslintrc.cjs'),
);

module.exports = defineConfig([
  ...baseConfig,
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    settings: {
      'import/resolver': {
        alias: {
          map: [['@', '.']],
          extensions: ['.js', '.jsx', '.json'],
        },
      },
    },
  },
]);
