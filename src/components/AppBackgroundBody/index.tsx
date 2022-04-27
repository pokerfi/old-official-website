import React from 'react'
import styled from 'styled-components'
import hero_background from '../../assets/images/hero-background.png'
import { useViewport } from '../ViewportProvider'

const BackgroundBodyWapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: url(${hero_background}) no-repeat;
  background-size: cover;
  background-position: center;
`

const BackgroundBodyMiniWapper = styled.div`
  position: relative;
  height: auto;
  background-color: #152029;
`

export default function AppBackgroundBody({ children }: { children: React.ReactNode }) {
  const { width } = useViewport()

  if (width <= 1200) {
    return <BackgroundBodyMiniWapper>{children}</BackgroundBodyMiniWapper>
  } else {
    return <BackgroundBodyWapper>{children}</BackgroundBodyWapper>
  }
}
