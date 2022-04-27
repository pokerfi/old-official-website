import React, { useState } from 'react'
import styled from 'styled-components'
import help_background from '../../assets/images/help_background.png'
import base_background from '../../assets/images/base_background.png'
import 'video-react/dist/video-react.css'
import { useTranslation } from 'react-i18next'
import { PlayerVote1, PlayerVote2, PlayerVote3, PlayerVote4 } from '../../components/PlayerVote'
import AppBottom from '../../components/AppBottom'

export const BaseColorBg = styled.div`
  width: 80%;
  height: 206px;
  background: url(${base_background}) no-repeat;
  background-size: 100%;
  position: absolute;
  bottom: 0px;
  left: 10%;
  z-index: -10;
  zoom: ${window.screen.width / 1920};
`

export const HelpWapper = styled.div`
  width: 1194px;
  margin-left: calc(50% - 597px);
  background: url(${help_background}) no-repeat center;
  background-size: 85%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
  padding: 100px;
  zoom: ${window.screen.width / 1920};
`

const IntroduceStyles = styled.div`
  width: 300px;
  height: 540px;
  box-sizing: border-box;
  padding-top: 50px;
`
const IntroduceTitle = styled.div<{ active: boolean }>`
  width: 100%;
  font-size: ${({ active }) => (active ? '24px' : '40px')};
  font-family: Source Han Sans CN;
  font-weight: 800;
  color: #ffffff;
  line-height: 102px;
  background: linear-gradient(13deg, #0ce2ff 0%, #1bffec 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`
const Segmentation = styled.div`
  width: 245px;
  border: 1px solid #15fcfd;
  opacity: 0.53;
  margin: 0 auto;
  margin-bottom: 20px;
`

const IntroduceText = styled.div`
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #eaeaea;
  line-height: 30px;
`
export const SelectText = styled.div<{ active: boolean }>`
  width: 281px;
  background: ${({ active }) =>
    active
      ? `linear-gradient(90deg, rgba(25, 35, 60, 0) 0%, rgba(64, 198, 162, 0.35) 55.00000000000001%, rgba(30, 37, 43, 0) 100%);`
      : ''};
  text-align: center;
  font-size: 20px;
  font-family: Source Han Sans CN;
  font-weight: 800;
  color: #a7cbcf;
  line-height: 30px;
  margin-bottom: 50px;
  margin-top: 50px;
  cursor: pointer;
`

export default function Help() {
  const { t } = useTranslation()
  const { i18n } = useTranslation()

  const [selectKey, setSelectKey] = useState(1)

  return (
    <div style={{ width: '100vw' }}>
      <HelpWapper>
        {(() => {
          if (selectKey === 2) {
            return <PlayerVote2 />
          }
          if (selectKey === 3) {
            return <PlayerVote3 />
          }
          if (selectKey === 4) {
            return <PlayerVote4 />
          }
          return <PlayerVote1 />
        })()}
        <IntroduceStyles>
          <IntroduceTitle active={i18n.language === 'en'}>{t('Help_introduction')}</IntroduceTitle>
          <Segmentation />
          <IntroduceText>
            <SelectText active={selectKey === 1} onClick={() => setSelectKey(1)}>
              {t('Help_1')}
            </SelectText>
            <SelectText active={selectKey === 2} onClick={() => setSelectKey(2)}>
              {t('Help_2')}
            </SelectText>
            <SelectText active={selectKey === 3} onClick={() => setSelectKey(3)}>
              {t('Help_3')}
            </SelectText>
            <SelectText active={selectKey === 4} onClick={() => setSelectKey(4)}>
              {t('Help_4')}
            </SelectText>
          </IntroduceText>
        </IntroduceStyles>
      </HelpWapper>
      <BaseColorBg />
      <AppBottom link="/help" />
    </div>
  )
}
