import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ButtonDefault } from '../../components/Button'
import { STATIC_URL } from '../../contracts/constant'
import { PartnersTitle, PartnersWapper } from '../partners'
import AppBottom from '../../components/AppBottom'

const IntroductionStyles = styled.div<{ active: boolean }>`
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #a7cbcf;
  line-height: ${({ active }) => (active ? '30px' : '40px')};
  box-sizing: border-box;
  padding: ${({ active }) => (active ? '80px' : '100px')};
  text-align: center;
  p {
    text-align: left;
  }
  p:nth-child(1) {
    text-indent: 60px;
    margin-bottom: ${({ active }) => (active ? '20px' : '40px')};
  }
  p:nth-child(2) {
    margin-bottom: ${({ active }) => (active ? '40px' : '10px')};
  }
`

export default function Introduction() {
  const { t } = useTranslation()
  const { i18n } = useTranslation()

  return (
    <div style={{ width: '100vw' }}>
      <PartnersWapper>
        <PartnersTitle active={i18n.language === 'en'}>{t('Project_intro')}</PartnersTitle>
        <IntroductionStyles active={i18n.language === 'en'} style={{ paddingTop: '120px' }}>
          <p>{t('introduction_1')}</p>
          <a
            href={i18n.language === 'en' ? STATIC_URL + 'pdf/pokerFi_en.pdf' : STATIC_URL + 'pdf/pokerFi_zh.pdf'}
            download="pokerFi.pdf"
          >
            <ButtonDefault>{t('introduction_whitepaper')}</ButtonDefault>
          </a>
        </IntroductionStyles>
      </PartnersWapper>
      <AppBottom link="/introduction" />
    </div>
  )
}
