import type { StorybookConfig } from '@storybook/react-native';

const config: StorybookConfig = {
  stories: [
    '../components/**/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
  ],
  framework: {
    name: '@storybook/react-native',
    options: {},
  },
};

export default config;
