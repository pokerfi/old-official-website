import React from 'react'
import styled from 'styled-components'
import logo_2 from '../../assets/images/logo_2.png'
import icon_1 from '../../assets/images/icon_1.png'
import icon_2 from '../../assets/images/icon_2.png'
// import icon_3 from "../../assets/images/icon_3.png";
// import icon_4 from "../../assets/images/icon_4.png";

import { ButtonDefault } from '../../components/Button'
import { useTranslation } from 'react-i18next'
import AppBottom from '../../components/AppBottom'

const ContactWapper = styled.div`
  text-align: center;
  zoom: ${window.screen.width / 1920};
`
export const ContactLogo = styled.div`
  width: 477px;
  height: 207px;
  background: url(${logo_2}) no-repeat center;
  background-size: 100%;
  margin: 0 auto;
  margin-top: 100px;
`
export const ButtonStyles = styled.div`
  text-align: center;
  margin-top: 85px;
`
export const MessageInput = styled.input`
  width: 800px;
  height: 90px;
  background: #3a4e5e;
  opacity: 0.5;
  margin-top: 30px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #fff;
  text-align: center;
`
export const ShareStyles = styled.div`
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 100px;
`

export default function Contact() {
  const { t } = useTranslation()

  const UrlClick = (Url: string) => {
    window.open(Url)
  }

  return (
    <div style={{ width: '100vw' }}>
      <ContactWapper>
        <ContactLogo />
        <MessageInput type="text" placeholder={t('Contact_message')} />
        <ButtonStyles>
          <ButtonDefault>{t('Contact_submit')}</ButtonDefault>
        </ButtonStyles>
        <ShareStyles>
          <img src={icon_1} alt="" onClick={() => UrlClick('https://0.plus/PokerFi')} />
          <img
            src={icon_2}
            alt=""
            onClick={() => UrlClick('https://twitter.com/PokerfiOfficial/status/1414469727200579590?s=19')}
          />
          {/* <img src={icon_3} alt="" /> */}
          {/* <img src={icon_4} alt="" /> */}
        </ShareStyles>
      </ContactWapper>
      <AppBottom link="/contact" />
    </div>
  )
}
