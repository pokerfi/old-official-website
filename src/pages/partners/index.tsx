import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import partners_background from '../../assets/images/partners_background.png'
import partners_1 from '../../assets/images/partners_1.png'
import partners_2 from '../../assets/images/partners_2.png'
import partners_3 from '../../assets/images/partners_3.png'
import partners_4 from '../../assets/images/partners_4.png'
import partners_5 from '../../assets/images/partners_5.png'
import partners_6 from '../../assets/images/partners_6.png'
import partners_7 from '../../assets/images/partners_7.png'
import partners_8 from '../../assets/images/partners_8.png'
import partners_9 from '../../assets/images/partners_9.png'
import partners_10 from '../../assets/images/partners_10.png'
import AppBottom from '../../components/AppBottom'

export const PartnersWapper = styled.div`
  width: 1026px;
  height: 660px;
  background: url(${partners_background}) no-repeat center;
  background-size: 100%;
  position: relative;
  margin-top: 40px;
  margin-left: calc(50% - 513px);
  zoom: ${window.screen.width / 1920};
`
export const PartnersTitle = styled.div<{ active: boolean }>`
  width: 100%;
  text-align: center;
  font-size: ${({ active }) => (active ? '36px' : '48px')};
  font-family: Source Han Sans CN;
  font-weight: 800;
  color: #ffffff;
  line-height: 102px;
  background: linear-gradient(13deg, #0ce2ff 0%, #1bffec 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;
  top: 0;
`
const PartnersList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 70px 100px;
  margin-top: 40px;
  height: calc(100% - 180px);
  padding-top: 140px;
`

export default function Partners() {
  const { t } = useTranslation()
  const { i18n } = useTranslation()

  return (
    <div style={{ width: '100vw' }}>
      <PartnersWapper>
        <PartnersTitle active={i18n.language === 'en'}>{t('Partner')}</PartnersTitle>
        <PartnersList>
          <img src={partners_1} width={'250px'} alt="" />
          <img src={partners_2} width={'250px'} alt="" />
          <img src={partners_3} width={'250px'} alt="" />
          <img src={partners_4} width={'250px'} alt="" />
          <img src={partners_5} width={'250px'} alt="" />
          <img src={partners_6} width={'250px'} alt="" />
          <img src={partners_7} width={'250px'} alt="" />
          <img src={partners_8} width={'250px'} alt="" />
          <img src={partners_9} width={'250px'} alt="" />
          <img src={partners_10} width={'250px'} alt="" />
        </PartnersList>
      </PartnersWapper>
      <AppBottom link="/partners" />
    </div>
  )
}
