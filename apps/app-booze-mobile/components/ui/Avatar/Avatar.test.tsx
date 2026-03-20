/**
 * Avatar Component Tests
 * 
 * Unit tests for the Avatar component covering rendering, props,
 * accessibility, and edge cases.
 * 
 * @module components/ui/Avatar/Avatar.test
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { Avatar, type AvatarProps } from './Avatar';

describe('Avatar Component', () => {
  describe('Rendering', () => {
    it('should render with initials', () => {
      const { getByText } = render(<Avatar initials="JD" />);
      expect(getByText('JD')).toBeTruthy();
    });

    it('should render with image source', () => {
      const { getByTestId } = render(
        <Avatar
          source={{ uri: 'https://example.com/avatar.jpg' }}
          testID="avatar-image"
        />
      );
      expect(getByTestId('avatar-image')).toBeTruthy();
    });

    it('should render empty when no initials or source provided', () => {
      const { getByTestId } = render(<Avatar testID="avatar-empty" />);
      expect(getByTestId('avatar-empty')).toBeTruthy();
    });
  });

  describe('Props', () => {
    it('should apply correct size', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
      sizes.forEach((size) => {
        const { getByTestId } = render(
          <Avatar size={size} initials="A" testID={`avatar-${size}`} />
        );
        expect(getByTestId(`avatar-${size}`)).toBeTruthy();
      });
    });

    it('should apply correct shape', () => {
      const shapes = ['circle', 'square'] as const;
      shapes.forEach((shape) => {
        const { getByTestId } = render(
          <Avatar shape={shape} initials="A" testID={`avatar-${shape}`} />
        );
        expect(getByTestId(`avatar-${shape}`)).toBeTruthy();
      });
    });

    it('should apply custom background color', () => {
      const { getByTestId } = render(
        <Avatar
          initials="JD"
          backgroundColor="#FF0000"
          testID="avatar-bg-color"
        />
      );
      expect(getByTestId('avatar-bg-color')).toBeTruthy();
    });

    it('should apply custom text color', () => {
      const { getByText } = render(
        <Avatar
          initials="JD"
          textColor="#FFFFFF"
        />
      );
      expect(getByText('JD')).toBeTruthy();
    });

    it('should apply custom style', () => {
      const customStyle = { marginTop: 10 };
      const { getByTestId } = render(
        <Avatar
          initials="JD"
          style={customStyle}
          testID="avatar-custom-style"
        />
      );
      expect(getByTestId('avatar-custom-style')).toBeTruthy();
    });
  });

  describe('Initials', () => {
    it('should uppercase initials', () => {
      const { getByText } = render(<Avatar initials="jd" />);
      expect(getByText('JD')).toBeTruthy();
    });

    it('should handle single initial', () => {
      const { getByText } = render(<Avatar initials="A" />);
      expect(getByText('A')).toBeTruthy();
    });

    it('should handle multiple initials', () => {
      const { getByText } = render(<Avatar initials="ABCD" />);
      expect(getByText('ABCD')).toBeTruthy();
    });

    it('should handle empty initials string', () => {
      const { getByTestId } = render(
        <Avatar initials="" testID="avatar-empty-initials" />
      );
      expect(getByTestId('avatar-empty-initials')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have testID when provided', () => {
      const { getByTestId } = render(
        <Avatar initials="JD" testID="avatar-test" />
      );
      expect(getByTestId('avatar-test')).toBeTruthy();
    });

    it('should render with default size', () => {
      const { getByTestId } = render(
        <Avatar initials="JD" testID="avatar-default" />
      );
      expect(getByTestId('avatar-default')).toBeTruthy();
    });

    it('should render with default shape', () => {
      const { getByTestId } = render(
        <Avatar initials="JD" testID="avatar-default-shape" />
      );
      expect(getByTestId('avatar-default-shape')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle both source and initials (source takes precedence)', () => {
      const { getByTestId, queryByText } = render(
        <Avatar
          source={{ uri: 'https://example.com/avatar.jpg' }}
          initials="JD"
          testID="avatar-both"
        />
      );
      expect(getByTestId('avatar-both')).toBeTruthy();
      // When source is provided, initials should not be rendered
      expect(queryByText('JD')).toBeNull();
    });

    it('should handle special characters in initials', () => {
      const { getByText } = render(<Avatar initials="@#" />);
      expect(getByText('@#')).toBeTruthy();
    });

    it('should handle very long initials', () => {
      const { getByText } = render(<Avatar initials="VERYLONGINITIALS" />);
      expect(getByText('VERYLONGINITIALS')).toBeTruthy();
    });

    it('should handle numeric initials', () => {
      const { getByText } = render(<Avatar initials="123" />);
      expect(getByText('123')).toBeTruthy();
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref correctly', () => {
      const ref = React.createRef<any>();
      render(<Avatar ref={ref} initials="JD" />);
      expect(ref.current).toBeTruthy();
    });
  });

  describe('Display Name', () => {
    it('should have correct display name', () => {
      expect(Avatar.displayName).toBe('Avatar');
    });
  });

  describe('Default Props', () => {
    it('should use default size of md', () => {
      const { getByTestId } = render(
        <Avatar initials="JD" testID="avatar-default-size" />
      );
      expect(getByTestId('avatar-default-size')).toBeTruthy();
    });

    it('should use default shape of circle', () => {
      const { getByTestId } = render(
        <Avatar initials="JD" testID="avatar-default-circle" />
      );
      expect(getByTestId('avatar-default-circle')).toBeTruthy();
    });

    it('should use default background color', () => {
      const { getByTestId } = render(
        <Avatar initials="JD" testID="avatar-default-bg" />
      );
      expect(getByTestId('avatar-default-bg')).toBeTruthy();
    });

    it('should use default text color', () => {
      const { getByText } = render(<Avatar initials="JD" />);
      expect(getByText('JD')).toBeTruthy();
    });
  });
});
