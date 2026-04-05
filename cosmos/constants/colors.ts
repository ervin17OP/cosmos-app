// Palette Cosmos Galactic — source unique pour toutes les couleurs de l'app
export const Colors = {
  // Fond principal
  background: '#0f0d18',
  surface: '#0f0d18',
  surfaceDim: '#0f0d18',
  surfaceBright: '#2d2a3d',
  surfaceContainerLowest: '#000000',
  surfaceContainerLow: '#14121f',
  surfaceContainer: '#1a1826',
  surfaceContainerHigh: '#211d2e',
  surfaceContainerHighest: '#272335',
  surfaceVariant: '#272335',
  surfaceTint: '#c799ff',

  // Primaire — Violet Nébuleuse
  primary: '#c799ff',
  primaryDim: '#bb83ff',
  primaryFixed: '#bd87ff',
  primaryFixedDim: '#b374fe',
  primaryContainer: '#bd87ff',
  onPrimary: '#440080',
  onPrimaryFixed: '#000000',
  onPrimaryFixedVariant: '#41007a',
  onPrimaryContainer: '#340064',
  inversePrimary: '#7b3cc4',

  // Secondaire — Cyan Pulsar
  secondary: '#26fedc',
  secondaryDim: '#00efce',
  secondaryFixed: '#26fedc',
  secondaryFixedDim: '#00efce',
  secondaryContainer: '#006b5b',
  onSecondary: '#005d4f',
  onSecondaryFixed: '#00483d',
  onSecondaryFixedVariant: '#006859',
  onSecondaryContainer: '#ddfff5',

  // Tertiaire — Or Stellaire
  tertiary: '#ffdb8f',
  tertiaryDim: '#eabe55',
  tertiaryFixed: '#f9cc61',
  tertiaryFixedDim: '#eabe55',
  tertiaryContainer: '#f9cc61',
  onTertiary: '#664c00',
  onTertiaryFixed: '#443100',
  onTertiaryFixedVariant: '#674d00',
  onTertiaryContainer: '#5b4400',

  // Texte sur surfaces
  onSurface: '#e9e3f5',
  onSurfaceVariant: '#aea8b9',
  onBackground: '#e9e3f5',
  inverseSurface: '#fdf8ff',
  inverseOnSurface: '#575362',

  // Contours
  outline: '#777383',
  outlineVariant: '#494654',

  // Erreur / Rose
  error: '#ff6e84',
  errorDim: '#d73357',
  errorContainer: '#a70138',
  onError: '#490013',
  onErrorContainer: '#ffb2b9',

  // Transparences utilitaires
  glass: 'rgba(255, 255, 255, 0.04)',
  glassBorder: 'rgba(255, 255, 255, 0.07)',
  glassBorderFocus: 'rgba(38, 254, 220, 0.4)',
  overlayLight: 'rgba(255, 255, 255, 0.05)',
  overlayDark: 'rgba(0, 0, 0, 0.3)',

  // Halos (glows)
  glowPrimary: 'rgba(199, 153, 255, 0.3)',
  glowSecondary: 'rgba(38, 254, 220, 0.3)',
  glowTertiary: 'rgba(255, 219, 143, 0.3)',
} as const;

export type ColorKey = keyof typeof Colors;
