import { Platform } from 'react-native'

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    white: '#f4f7f9',
    error: '#d73a4a'
  },
  backgroundColors: {
    lightGrey: '#e0e2e5',
    dark: '#24292e',
    light: '#e1e4e8',
    white: 'white'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
