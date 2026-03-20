/**
 * Divider Component Stories
 * 
 * Storybook stories for the Divider component demonstrating
 * all variants, orientations, and customization options.
 * 
 * @module components/ui/Divider/Divider.stories
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Divider } from './Divider';
import { colors, spacing } from '../../constants/designTokens';

/**
 * Divider component stories for Storybook
 */
export default {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    orientation: {
      control: { type: 'select', options: ['horizontal', 'vertical'] },
      description: 'Orientation of the divider',
      defaultValue: 'horizontal',
    },
    color: {
      control: { type: 'color' },
      description: 'Color of the divider',
      defaultValue: colors.border.light,
    },
    thickness: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Thickness of the divider in pixels',
      defaultValue: 1,
    },
    margin: {
      control: { type: 'number', min: 0, max: 40, step: 4 },
      description: 'Margin around the divider',
      defaultValue: spacing[4],
    },
  },
};

/**
 * Default horizontal divider story
 */
export const Horizontal = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Content Above</Text>
      </View>
      <Divider orientation="horizontal" />
      <View style={styles.content}>
        <Text style={styles.label}>Content Below</Text>
      </View>
    </View>
  ),
};

/**
 * Vertical divider story
 */
export const Vertical = {
  render: () => (
    <View style={styles.verticalContainer}>
      <View style={styles.verticalContent}>
        <Text style={styles.label}>Left</Text>
      </View>
      <Divider orientation="vertical" />
      <View style={styles.verticalContent}>
        <Text style={styles.label}>Right</Text>
      </View>
    </View>
  ),
};

/**
 * Divider with custom color story
 */
export const CustomColor = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Primary Color Divider</Text>
      </View>
      <Divider
        orientation="horizontal"
        color={colors.primary.light}
        thickness={2}
      />
      <View style={styles.content}>
        <Text style={styles.label}>Content Below</Text>
      </View>
    </View>
  ),
};

/**
 * Divider with custom thickness story
 */
export const CustomThickness = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Thin Divider (1px)</Text>
      </View>
      <Divider orientation="horizontal" thickness={1} />
      <View style={styles.content}>
        <Text style={styles.label}>Medium Divider (2px)</Text>
      </View>
      <Divider orientation="horizontal" thickness={2} />
      <View style={styles.content}>
        <Text style={styles.label}>Thick Divider (4px)</Text>
      </View>
      <Divider orientation="horizontal" thickness={4} />
      <View style={styles.content}>
        <Text style={styles.label}>Content Below</Text>
      </View>
    </View>
  ),
};

/**
 * Divider with custom margin story
 */
export const CustomMargin = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Small Margin (8px)</Text>
      </View>
      <Divider orientation="horizontal" margin={spacing[2]} />
      <View style={styles.content}>
        <Text style={styles.label}>Medium Margin (16px)</Text>
      </View>
      <Divider orientation="horizontal" margin={spacing[4]} />
      <View style={styles.content}>
        <Text style={styles.label}>Large Margin (32px)</Text>
      </View>
      <Divider orientation="horizontal" margin={spacing[8]} />
      <View style={styles.content}>
        <Text style={styles.label}>Content Below</Text>
      </View>
    </View>
  ),
};

/**
 * Divider with semantic colors story
 */
export const SemanticColors = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Success Color</Text>
      </View>
      <Divider
        orientation="horizontal"
        color={colors.success.light}
        thickness={2}
      />
      <View style={styles.content}>
        <Text style={styles.label}>Error Color</Text>
      </View>
      <Divider
        orientation="horizontal"
        color={colors.error.light}
        thickness={2}
      />
      <View style={styles.content}>
        <Text style={styles.label}>Warning Color</Text>
      </View>
      <Divider
        orientation="horizontal"
        color={colors.warning.light}
        thickness={2}
      />
      <View style={styles.content}>
        <Text style={styles.label}>Info Color</Text>
      </View>
      <Divider
        orientation="horizontal"
        color={colors.info.light}
        thickness={2}
      />
      <View style={styles.content}>
        <Text style={styles.label}>Content Below</Text>
      </View>
    </View>
  ),
};

/**
 * Divider with neutral colors story
 */
export const NeutralColors = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Light Border</Text>
      </View>
      <Divider
        orientation="horizontal"
        color={colors.border.light}
        thickness={1}
      />
      <View style={styles.content}>
        <Text style={styles.label}>Medium Border</Text>
      </View>
      <Divider
        orientation="horizontal"
        color={colors.border.medium}
        thickness={1}
      />
      <View style={styles.content}>
        <Text style={styles.label}>Dark Border</Text>
      </View>
      <Divider
        orientation="horizontal"
        color={colors.border.dark}
        thickness={1}
      />
      <View style={styles.content}>
        <Text style={styles.label}>Content Below</Text>
      </View>
    </View>
  ),
};

/**
 * Divider in a list-like layout story
 */
export const InList = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.listItem}>
        <Text style={styles.label}>Item 1</Text>
      </View>
      <Divider orientation="horizontal" margin={0} />
      <View style={styles.listItem}>
        <Text style={styles.label}>Item 2</Text>
      </View>
      <Divider orientation="horizontal" margin={0} />
      <View style={styles.listItem}>
        <Text style={styles.label}>Item 3</Text>
      </View>
      <Divider orientation="horizontal" margin={0} />
      <View style={styles.listItem}>
        <Text style={styles.label}>Item 4</Text>
      </View>
    </View>
  ),
};

/**
 * Divider with custom styling story
 */
export const CustomStyling = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Custom Styled Divider</Text>
      </View>
      <Divider
        orientation="horizontal"
        color={colors.primary.light}
        thickness={2}
        style={styles.customDivider}
      />
      <View style={styles.content}>
        <Text style={styles.label}>Content Below</Text>
      </View>
    </View>
  ),
};

/**
 * Divider responsive layout story
 */
export const ResponsiveLayout = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.responsiveRow}>
        <View style={styles.responsiveColumn}>
          <Text style={styles.label}>Column 1</Text>
        </View>
        <Divider orientation="vertical" margin={spacing[4]} />
        <View style={styles.responsiveColumn}>
          <Text style={styles.label}>Column 2</Text>
        </View>
      </View>
      <Divider orientation="horizontal" margin={spacing[4]} />
      <View style={styles.responsiveRow}>
        <View style={styles.responsiveColumn}>
          <Text style={styles.label}>Column 3</Text>
        </View>
        <Divider orientation="vertical" margin={spacing[4]} />
        <View style={styles.responsiveColumn}>
          <Text style={styles.label}>Column 4</Text>
        </View>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
    backgroundColor: colors.background.primary,
  },
  content: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[3],
  },
  label: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  verticalContainer: {
    flexDirection: 'row',
    height: 200,
    padding: spacing[4],
    backgroundColor: colors.background.primary,
  },
  verticalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[3],
  },
  listItem: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
  },
  customDivider: {
    opacity: 0.7,
  },
  responsiveRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  responsiveColumn: {
    flex: 1,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[4],
  },
});
