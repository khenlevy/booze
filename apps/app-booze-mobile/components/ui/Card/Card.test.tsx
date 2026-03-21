/**
 * Card Component Tests
 * 
 * Tests for the Card component including variants, slots, and testID props.
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Card } from './Card';

describe('Card Component', () => {
  describe('Basic Rendering', () => {
    it('should render Card with children', () => {
      const { getByText } = render(
        <Card>
          <Text>Card Content</Text>
        </Card>
      );

      expect(getByText('Card Content')).toBeTruthy();
    });

    it('should render with testID', () => {
      const { getByTestId } = render(
        <Card testID="test-card">
          <Text>Content</Text>
        </Card>
      );

      expect(getByTestId('test-card')).toBeTruthy();
    });
  });

  describe('Slot Components', () => {
    it('should render Card.Header slot', () => {
      const { getByText } = render(
        <Card>
          <Card.Header>
            <Text>Header</Text>
          </Card.Header>
        </Card>
      );

      expect(getByText('Header')).toBeTruthy();
    });

    it('should render Card.Body slot', () => {
      const { getByText } = render(
        <Card>
          <Card.Body>
            <Text>Body</Text>
          </Card.Body>
        </Card>
      );

      expect(getByText('Body')).toBeTruthy();
    });

    it('should render Card.Footer slot', () => {
      const { getByText } = render(
        <Card>
          <Card.Footer>
            <Text>Footer</Text>
          </Card.Footer>
        </Card>
      );

      expect(getByText('Footer')).toBeTruthy();
    });

    it('should render all slots together', () => {
      const { getByText } = render(
        <Card>
          <Card.Header>
            <Text>Header</Text>
          </Card.Header>
          <Card.Body>
            <Text>Body</Text>
          </Card.Body>
          <Card.Footer>
            <Text>Footer</Text>
          </Card.Footer>
        </Card>
      );

      expect(getByText('Header')).toBeTruthy();
      expect(getByText('Body')).toBeTruthy();
      expect(getByText('Footer')).toBeTruthy();
    });

    it('should render Header with testID', () => {
      const { getByTestId } = render(
        <Card>
          <Card.Header testID="card-header">
            <Text>Header</Text>
          </Card.Header>
        </Card>
      );

      expect(getByTestId('card-header')).toBeTruthy();
    });

    it('should render Body with testID', () => {
      const { getByTestId } = render(
        <Card>
          <Card.Body testID="card-body">
            <Text>Body</Text>
          </Card.Body>
        </Card>
      );

      expect(getByTestId('card-body')).toBeTruthy();
    });

    it('should render Footer with testID', () => {
      const { getByTestId } = render(
        <Card>
          <Card.Footer testID="card-footer">
            <Text>Footer</Text>
          </Card.Footer>
        </Card>
      );

      expect(getByTestId('card-footer')).toBeTruthy();
    });
  });

  describe('Variants', () => {
    it('should render with elevated variant (default)', () => {
      const { getByTestId } = render(
        <Card variant="elevated" testID="elevated-card">
          <Text>Elevated</Text>
        </Card>
      );

      expect(getByTestId('elevated-card')).toBeTruthy();
    });

    it('should render with outlined variant', () => {
      const { getByTestId } = render(
        <Card variant="outlined" testID="outlined-card">
          <Text>Outlined</Text>
        </Card>
      );

      expect(getByTestId('outlined-card')).toBeTruthy();
    });

    it('should render with filled variant', () => {
      const { getByTestId } = render(
        <Card variant="filled" testID="filled-card">
          <Text>Filled</Text>
        </Card>
      );

      expect(getByTestId('filled-card')).toBeTruthy();
    });
  });

  describe('Props', () => {
    it('should accept custom padding', () => {
      const { getByTestId } = render(
        <Card padding={16} testID="padded-card">
          <Text>Padded</Text>
        </Card>
      );

      expect(getByTestId('padded-card')).toBeTruthy();
    });

    it('should accept custom backgroundColor', () => {
      const { getByTestId } = render(
        <Card backgroundColor="#FF0000" testID="bg-card">
          <Text>Custom BG</Text>
        </Card>
      );

      expect(getByTestId('bg-card')).toBeTruthy();
    });

    it('should accept custom style', () => {
      const { getByTestId } = render(
        <Card style={{ marginTop: 10 }} testID="styled-card">
          <Text>Styled</Text>
        </Card>
      );

      expect(getByTestId('styled-card')).toBeTruthy();
    });
  });

  describe('Display Names', () => {
    it('Card should have correct displayName', () => {
      expect(Card.displayName).toBe('Card');
    });

    it('Card.Header should have correct displayName', () => {
      expect(Card.Header.displayName).toBe('Card.Header');
    });

    it('Card.Body should have correct displayName', () => {
      expect(Card.Body.displayName).toBe('Card.Body');
    });

    it('Card.Footer should have correct displayName', () => {
      expect(Card.Footer.displayName).toBe('Card.Footer');
    });
  });
});
