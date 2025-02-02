//https://raw.githubusercontent.com/tailwindlabs/tailwindcss/master/stubs/defaultConfig.stub.js
const colors = {
  primary: {
    0: '#F5F5F5',
    25: '#FCFCFD',
    50: '#F9FAFB',
    100: '#FDF5EF',
    200: '#F0A881',
    300: '#B8B8B8',
    400: '#A3A3A3',
    DEFAULT: '#E45B2F',
    dark: '#B12F1D',
    darker: '#72241C',
    800: '#474747',
    900: '#333333'
  },
  moss: {
    25: '#FAFDF7',
    50: '#F5FBEE',
    100: '#E6F4D7',
    200: '#CEEAB0',
    300: '#ACDC79',
    400: '#86CB3C',
    500: '#669F2A',
    600: '#4F7A21',
    700: '#3F621A',
    800: '#335015',
    900: '#2B4212'
  },
  'green-light': {
    25: '#FAFEF5',
    50: '#F3FEE7',
    100: '#E4FBCC',
    200: '#D0F8AB',
    300: '#A6EF67',
    400: '#85E13A',
    500: '#85E13A',
    600: '#4CA30D',
    700: '#3B7C0F',
    800: '#326212',
    900: '#2B5314'
  },
  green: {
    25: '#F6FEF9',
    50: '#F3FFFD',
    100: '#DDFFF8',
    200: '#D1FFF6',
    300: '#C9FCF2',
    400: '#BAEEE4',
    500: '#98E9D9',
    600: '#00CCC9',
    700: '#00B8B5',
    800: '#029F9C',
    900: '#008481'
  },
  teal: {
    25: '#F6FEFC',
    50: '#F0FDF9',
    100: '#CCFBEF',
    200: '#99F6E0',
    300: '#5FE9D0',
    400: '#2ED3B7',
    500: '#15B79E',
    600: '#0E9384',
    700: '#107569',
    800: '#125D56',
    900: '#134E48'
  },
  cyan: {
    25: '#F5FEFF',
    50: '#ECFDFF',
    100: '#CFF9FE',
    200: '#A5F0FC',
    300: '#67E3F9',
    400: '#22CCEE',
    500: '#06AED4',
    600: '#088AB2',
    700: '#0E7090',
    800: '#155B75',
    900: '#164C63'
  },
  'blue-light': {
    25: '#F5FBFF',
    50: '#F0F9FF',
    100: '#E0F2FE',
    200: '#B9E6FE',
    300: '#7CD4FD',
    400: '#36BFFA',
    500: '#0BA5EC',
    600: '#0086C9',
    700: '#026AA2',
    800: '#065986',
    900: '#0B4A6F'
  },
  blue: {
    25: '#F5FAFF',
    50: '#F3FDFF',
    100: '#EBFAFE',
    200: '#D7F4FE',
    300: '#C3EEFD',
    400: '#B0E9FD',
    500: '#9CE4FC',
    600: '#88DFFB',
    700: '#63CAF8',
    800: '#2491C2',
    900: '#1777A2'
  },
  'blue-dark': {
    25: '#F5F8FF',
    50: '#EFF4FF',
    100: '#D1E0FF',
    200: '#B2CCFF',
    300: '#84ADFF',
    400: '#528BFF',
    500: '#2970FF',
    600: '#155EEF',
    700: '#004EEB',
    800: '#0040C1',
    900: '#00359E'
  },
  indigo: {
    25: '#F5F8FF',
    50: '#EEF4FF',
    100: '#E0EAFF',
    200: '#C7D7FE',
    300: '#A4BCFD',
    400: '#8098F9',
    500: '#6172F3',
    600: '#444CE7',
    700: '#3538CD',
    800: '#2D31A6',
    900: '#2D3282'
  },
  violet: {
    25: '#FBFAFF',
    50: '#F5F3FF',
    100: '#ECE9FE',
    200: '#DDD6FE',
    300: '#C3B5FD',
    400: '#A48AFB',
    500: '#875BF7',
    600: '#7839EE',
    700: '#6927DA',
    800: '#5720B7',
    900: '#491C96'
  },
  purple: {
    25: '#FAFAFF',
    50: '#F4F3FF',
    100: '#EBE9FE',
    200: '#D9D6FE',
    300: '#BDB4FE',
    400: '#9B8AFB',
    500: '#7A5AF8',
    600: '#6938EF',
    700: '#5925DC',
    800: '#4A1FB8',
    900: '#3E1C96'
  },
  fuchsia: {
    25: '#FEFAFF',
    50: '#FDF4FF',
    100: '#FBE8FF',
    200: '#F6D0FE',
    300: '#EEAAFD',
    400: '#E478FA',
    500: '#D444F1',
    600: '#BA24D5',
    700: '#9F1AB1',
    800: '#821890',
    900: '#6F1877'
  },
  pink: {
    25: '#FEF6FB',
    50: '#FDF2FA',
    100: '#FCE7F6',
    200: '#FCCEEE',
    300: '#FAA7E0',
    400: '#F670C7',
    500: '#EE46BC',
    600: '#DD2590',
    700: '#C11574',
    800: '#9E165F',
    900: '#851651'
  },
  rose: {
    25: '#FFF5F6',
    50: '#FFF1F3',
    100: '#FFE4E8',
    200: '#FECDD6',
    300: '#FEA3B4',
    400: '#FD6F8E',
    500: '#F63D68',
    600: '#E31B54',
    700: '#C01048',
    800: '#A11043',
    900: '#89123E'
  },
  'orange-dark': {
    25: '#FFF9F5  ',
    50: '#FFF4ED',
    100: '#FFE6D5',
    200: '#FFD6AE',
    300: '#FF9C66',
    400: '#FF692E',
    500: '#FF4405',
    600: '#E62E05',
    700: '#BC1B06',
    800: '#97180C',
    900: '#771A0D'
  },
  orange: {
    25: '#FEFAF5',
    50: '#FEF6EE',
    100: '#FDEAD7',
    200: '#F9DBAF',
    300: '#F7B27A',
    400: '#F38744',
    500: '#EF6820',
    600: '#E04F16',
    700: '#B93815',
    800: '#932F19',
    900: '#772917'
  },
  yellow: {
    25: '#FEFDF0',
    50: '#FEFBE8',
    100: '#FEF7C3',
    200: '#FEEE95',
    300: '#FDE272',
    400: '#FAC515',
    500: '#EAAA08',
    600: '#CA8504',
    700: '#A15C07',
    800: '#854A0E',
    900: '#713B12'
  },
  'gray-blue': {
    25: '#FCFCFD',
    50: '#F8F9FC',
    100: '#EAECF5',
    200: '#D5D9EB',
    300: '#B3B8DB',
    400: '#717BBC',
    500: '#4E5BA6',
    600: '#3E4784',
    700: '#363F72',
    800: '#293056',
    900: '#101323'
  },
  'gray-cool': {
    25: '#FCFCFD',
    50: '#F9F9FB',
    100: '#EFF1F5',
    200: '#DCDFEA',
    300: '#B9C0D4',
    400: '#7D89B0',
    500: '#5D6B98',
    600: '#4A5578',
    700: '#404968',
    800: '#30374F',
    900: '#111322'
  },
  'gray-modern': {
    25: '#FCFCFD',
    50: '#F8FAFC',
    100: '#EEF2F6',
    200: '#E3E8EF',
    300: '#CDD5DF',
    400: '#9AA4B2',
    500: '#697586',
    600: '#4B5565',
    700: '#364152',
    800: '#202939',
    900: '#121926'
  },
  'gray-neutral': {
    25: '#FCFCFD',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D2D6DB',
    400: '#9DA4AE',
    500: '#6C737F',
    600: '#4D5761',
    700: '#384250',
    800: '#1F2A37',
    900: '#111927'
  },
  'gray-iron': {
    25: '#FCFCFC',
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D1D1D6',
    400: '#A0A0AB',
    500: '#70707B',
    600: '#51525C',
    700: '#3F3F46',
    800: '#26272B',
    900: '#18181B'
  },
  'gray-true': {
    25: '#FCFCFC',
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D6D6D6',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#424242',
    800: '#292929',
    900: '#141414'
  },
  'gray-warm': {
    25: '#FDFDFC',
    50: '#FAFAF9',
    100: '#F5F5F4',
    200: '#E7E5E4',
    300: '#D7D3D0',
    400: '#A9A29D',
    500: '#79716B',
    600: '#57534E',
    700: '#44403C',
    800: '#292524',
    900: '#1C1917'
  },
  gray: {
    0: '#F5F5F5',
    25: '#FCFCFD',
    50: '#F9FAFB',
    100: '#E0E0E0',
    200: '#CCCCCC',
    300: '#B8B8B8',
    400: '#A3A3A3',
    500: '#8F8F8F',
    600: '#7A7A7A',
    700: '#666666',
    800: '#474747',
    900: '#333333'
  },
  error: {
    25: '#FFFBFA',
    50: '#FEF3F2',
    100: '#FFF3F3',
    200: '#FEC5C5',
    300: '#FC9898',
    400: '#FB6A6A',
    500: '#F93D3D',
    600: '#D01117',
    700: '#AA0E13',
    800: '#912018',
    900: '#7A271A'
  },
  warning: {
    25: '#FFFCF5',
    50: '#FFFAEB',
    100: '#FFF7ED',
    200: '#FFEDD5',
    300: '#FED7AA',
    400: '#FDBA74',
    500: '#FB923C',
    600: '#DC6803',
    700: '#B54708',
    800: '#93370D',
    900: '#7A2E0E'
  },
  success: {
    25: '#F6FEF9',
    50: '#ECFDF3',
    100: '#EBFFF5',
    200: '#B0EECB',
    300: '#76DDA0',
    400: '#3BCB76',
    500: '#00BA4B',
    600: '#039855',
    700: '#027A48',
    800: '#05603A',
    900: '#054F31'
  }
}

module.exports = {
  content: ['src/tailwind.config.js'],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      '2xl': '1600px',
      'max-2xl': { max: '1599px' },
      'max-xl': { max: '1439px' },
      'max-lg': { max: '1023px' },
      'max-md': { max: '767px' },
      'max-sm': { max: '639px' }
    },

    extend: {
      colors: {
        ...colors,
        neutral: {
          100: '#F5F5F5',
          200: '#F0F0F0',
          300: '#D9D9D9',
          400: '#BFBFBF',
          500: '#8C8C8C',
          600: '#595959',
          700: '#434343',
          800: '#262626',
          900: '#171717'
        },
        info: {
          100: '#E9F2FF',
          200: '#AFCFF7',
          300: '#75ABEE',
          400: '#3A88E6',
          500: '#0065DD'
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: '#0000EE'
            }
          }
        }
      }),

      fontFamily: {
        display: ['Inter', 'sans-serif'],
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"'
        ]
      },

      maxWidth: {
        '60vw': '60vw',
        '70vw': '70vw',
        '80vw': '80vw',
        '90vw': '90vw'
      },

      container: {
        center: true,
        padding: {
          DEFAULT: '0.5rem',
          md: '2rem',
          xl: '5rem'
        }
      }
    }
  },

  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio')]
}
