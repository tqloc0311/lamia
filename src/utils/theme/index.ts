import { textVariants } from './text-variants';
import { createBox, createText, createTheme } from '@shopify/restyle';
import { Colors } from './colors';

const theme = createTheme({
  colors: Colors,
  textVariants,
  spacing: {
    '-3': -12,
    '0.5': 2,
    '1': 4,
    '1.5': 6,
    '2': 8,
    '2.5': 10,
    '3': 12,
    '4': 16,
    '5': 20,
    '6': 24,
    '10': 40,
    '11': 44,
    '12': 48,
    '13': 56,
    '100px': 100,
  },
  borderRadii: {
    none: 0,
    rounded4: 4,
    rounded: 8,
    rounded12: 12,
    rounded16: 16,
    rounded20: 20,
    rounded24: 24,
    rounded28: 28,
    rounded32: 32,
  },
});

export type Theme = typeof theme;
export type ThemeColor = keyof Theme['colors'];

export const Box = createBox<Theme>();
export const Text = createText<Theme>();

export default theme;
