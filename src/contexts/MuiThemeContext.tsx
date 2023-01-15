import React from 'react'
import { StylesProvider, jssPreset } from '@mui/styles'
import defaultUnit from 'jss-plugin-default-unit'
import {
  createTheme,
  ThemeProvider,
  Theme,
  Palette as PaletteProps,
  ThemeOptions as ThemeOptionsProps,
} from '@mui/material/styles'
import { create } from 'jss'

declare module '@mui/styles' {
  type TypeText = PaletteProps['text'] & {
    third: string
    fourth: string
  }
  interface Palette extends PaletteProps {
    text: TypeText
  }
  interface DefaultTheme extends Theme {
    palette: Palette
  }
}
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    mobile: true // adds the `mobile` breakpoint
  }
  interface TypeText {
    third: string
    fourth: string
  }
}
// const jssPlugins = [...jssPreset().plugins]
// jssPlugins[4] = defaultUnit({ padding: 'rem' })
const jss = create({
  ...jssPreset(),
  // plugins: jssPlugins,
  // 当将样式注入到 DOM 中时，定义了一个自定义插入点以供 JSS 查询。
  insertionPoint: document.getElementById('jss-insertion-point'),
})

const MuiThemeContextProvider = ({ children }) => {
  const isMobile = window.innerWidth < 600
  const theme = createTheme({
    palette: {
      primary: { main: '#8AFA0F', dark: '#6DC80A', contrastText: '#000' },
      action: {
        disabledBackground: '#437D03',
        disabled: '#000',
      },
      text: {
        primary: '#fff',
        secondary: '#bababa',
        third: '#efefef',
        fourth: '#808080',
      } as any,
      background: { paper: '#171719', default: '#171719' },
      divider: '#171719',
    },
    shape: {
      borderRadius: 2,
    },
    // @ts-ignored
    shadows: [],
    typography: {
      button: {
        textTransform: 'none',
      },
    },
    spacing: 10,
    breakpoints: {
      keys: ['xs', 'sm', 'md', 'lg', 'xl', 'mobile'],
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1360,
        xl: 1536,
        mobile: 600,
      },
    },
  })
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StylesProvider>
  )
}
export default MuiThemeContextProvider
