/**
 * WRD Design System Tokens
 * Based on the "Modern Indian" / "Crafted Modernism" Stitch design
 * Color palette: Earth and Spice spectrum
 */

export const Colors = {
  // Primary - Terracotta
  primary: '#6C2F00',
  onPrimary: '#FFFFFF',
  primaryContainer: '#8B4513',
  onPrimaryContainer: '#FFC29F',
  primaryFixed: '#FFDBC9',
  primaryFixedDim: '#FFB68C',
  onPrimaryFixed: '#321200',
  onPrimaryFixedVariant: '#753401',
  inversePrimary: '#FFB68C',

  // Secondary - Saffron/Ochre
  secondary: '#9A4600',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#FD8A3E',
  onSecondaryContainer: '#672C00',
  secondaryFixed: '#FFDBC9',
  secondaryFixedDim: '#FFB68D',
  onSecondaryFixed: '#321200',
  onSecondaryFixedVariant: '#763400',

  // Tertiary - Deep Teal
  tertiary: '#00484F',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#00626B',
  onTertiaryContainer: '#8BDCE7',
  tertiaryFixed: '#9FF0FB',
  tertiaryFixedDim: '#82D3DE',
  onTertiaryFixed: '#001F23',
  onTertiaryFixedVariant: '#004F56',

  // Error
  error: '#BA1A1A',
  onError: '#FFFFFF',
  errorContainer: '#FFDAD6',
  onErrorContainer: '#93000A',

  // Surface & Background
  background: '#FFF9F0',
  onBackground: '#1D1B16',
  surface: '#FFF9F0',
  surfaceDim: '#DFD9D1',
  surfaceBright: '#FFF9F0',
  surfaceContainerLowest: '#FFFFFF',
  surfaceContainerLow: '#F9F3EA',
  surfaceContainer: '#F3EDE4',
  surfaceContainerHigh: '#EDE7DF',
  surfaceContainerHighest: '#E7E2D9',
  onSurface: '#1D1B16',
  onSurfaceVariant: '#54433A',
  surfaceVariant: '#E7E2D9',
  surfaceTint: '#934B19',
  inverseSurface: '#32302A',
  inverseOnSurface: '#F6F0E7',

  // Outline
  outline: '#877369',
  outlineVariant: '#DAC2B6',

  // Transparent helpers
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export const Typography = {
  displayLg: {
    fontFamily: 'BeVietnamPro-Bold',
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: -0.8,
  },
  headlineLg: {
    fontFamily: 'BeVietnamPro-SemiBold',
    fontSize: 32,
    lineHeight: 40,
  },
  headlineLgMobile: {
    fontFamily: 'BeVietnamPro-SemiBold',
    fontSize: 28,
    lineHeight: 36,
  },
  titleMd: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 20,
    lineHeight: 28,
  },
  bodyLg: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  bodySm: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  labelCaps: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    textTransform: 'uppercase' as const,
  },
} as const;

export const Spacing = {
  base: 8,
  stackSm: 12,
  gutter: 16,
  stackMd: 24,
  containerPadding: 24,
  stackLg: 40,
} as const;

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
} as const;
