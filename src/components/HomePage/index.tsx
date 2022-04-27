import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import homePage_background from '../../assets/images/homePage_background.png'
import AppBottom from '../../components/AppBottom'

const HomePageBg = styled.div`
  width: calc(100% - 14.32rem);
  height: calc(100vh - 12.32rem);
  background: url(${homePage_background}) no-repeat center;
  background-size: 85%;
  margin: 0 auto;
`
const IntroduceStyles = styled.div`
  position: absolute;
  width: 39.59rem;
  height: 24.166rem;
  top: calc(50% - 15.3229rem);
  right: calc(50% - 51.625rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  zoom: ${window.screen.width / 1920};
`
const IntroducetIitle = styled.h3<{ active: boolean }>`
  font-size: ${({ active }) => (active ? '36px' : '48px')};
  font-family: Source Han Sans CN;
  font-weight: 800;
  color: #ffffff;
  line-height: 100px;
  background: linear-gradient(13deg, #0ce2ff 0%, #1bffec 100%);
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  margin-bottom: 30px;
`

const IntroducetText = styled.p`
  font-size: 26px;
  font-weight: bold;
  color: #ffffff;
  line-height: 40px;
  background: linear-gradient(13deg, #10dbf7 0%, #1cffec 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export default function HomePage() {
  const { t } = useTranslation()
  const { i18n } = useTranslation()

  return (
    <div style={{ width: '100vw' }}>
      <HomePageBg>
        <IntroduceStyles>
          <IntroducetIitle active={i18n.language === 'en'}>{t('HomePage_welcome')}</IntroducetIitle>
          <IntroducetText>{t('HomePage_info')}</IntroducetText>
        </IntroduceStyles>
      </HomePageBg>
      <AppBottom link="/home" />
    </div>
  )
}
