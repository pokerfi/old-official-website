import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { createGlobalStyle, css, DefaultTheme, ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { Colors } from './styled'

const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1200,
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {},
) as any

const white = '#FFFFFF'
const black = '#000000'
export function colors(darkMode: boolean): Colors {
  return {
    white,
    black,

    text1: darkMode ? '#FFFFFF' : '#FFFFFF',
    text2: darkMode ? '#3B3B3B' : '#3B3B3B',
    text3: darkMode ? '#657E8A' : '#657E8A',
    text4: darkMode ? '#9300F5' : '#9300F5',
    text5: darkMode ? '#9EC7D9' : '#9EC7D9',
    text6: darkMode ? '#DCEAF3' : '#DCEAF3',

    bg1: darkMode ? '#FFFFFF' : '#FFFFFF',
    bg2: darkMode ? '#000000' : '#000000',
    bg3: darkMode ? '#101C26' : '#101C26',
    bg4: darkMode ? '#7977F2' : '#7977F2',
    bg5: darkMode ? '#e9eaeb' : '#e9eaeb',

    primary1: darkMode ? '#9300F5' : '#9300F5',
    primary2: darkMode ? '#7977F2' : '#7977F2',
    primary3: darkMode ? '#4D8FEA' : '#dae6ff',
    primary4: darkMode ? '#FFFFFF' : '#FFFFFF',
    primary5: darkMode ? '#153d6f7' : '#dae6ff',

    // other
    red1: '#FF6871',
    red2: '#F82D3A',
    green1: '#01D07B',
    yellow1: '#FFE270',
    yellow2: '#F3841E',
    blue1: '#2172E5',
  }
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),
    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    mediaWidth: mediaWidthTemplates,

    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }, props: any) {
  const thmemBoolean = useSelector((state: any) => state.themeInfo.themeBoolean)

  const darkMode = thmemBoolean

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}> {children} </StyledComponentsThemeProvider>
}

export const ThemedGlobalStyle = createGlobalStyle`
    html {
        background-color: ${({ theme }) => theme.bg1};
    }

    body {
        min-height: 100vh;
        background-repeat: no-repeat;
        background-color: #FFFFFF;
    }; 
`
