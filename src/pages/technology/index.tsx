import React from 'react'
import styled from 'styled-components'
import technologyPage_background from '../../assets/images/technologyPage_background.png'
import technologyPage_logo from '../../assets/images/technologyPage_logo.png'
import technologyPage_frame from '../../assets/images/technologyPage_frame.png'
import technologyPage_icon_1 from '../../assets/images/technologyPage_icon_1.png'
import technologyPage_icon_2 from '../../assets/images/technologyPage_icon_2.png'
import technologyPage_icon_3 from '../../assets/images/technologyPage_icon_3.png'
import { ButtonDefault } from '../../components/Button'
import TechnologyPageCake from '../../components/TechnologyPageCake'
import ProgressBar from '../../components/ProgressBar'
import { useTechnologyHooks } from '../../hooks/useTechnologyHooks'
import { useTranslation } from 'react-i18next'
import AppBottom from '../../components/AppBottom'

export const TechnologyBg = styled.div`
  width: 1277.1px;
  height: 693.9px;
  background: url(${technologyPage_background}) no-repeat center;
  background-size: 100%;
  position: relative;
  margin: 0 auto;
  margin-top: 2.5rem;
  zoom: ${window.screen.width / 1920};
`
const TechnologyTopFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`
const TechnologyBottomFlex = styled(TechnologyTopFlex)`
  padding: 30px 42px;
`
const TechnologyTopStyles = styled.div`
  width: 600px;
  height: 480px;
  box-sizing: border-box;
  padding: 60px 0 0 74px;
  display: flex;
  flex-direction: column;
  .technologyText {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #fcf8ff;
    line-height: 36px;
    margin-top: 30px;
  }
  .buttonTop {
    margin-top: 40px;
  }
`
const TechnologyTopLogo = styled.div`
  width: 280px;
  height: 144px;
  background: url(${technologyPage_logo}) no-repeat center;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #1afcee;
  line-height: 72px;
  p {
    margin-top: 80px;
  }
`
const TechnologyFrame = styled.div`
  width: 387px;
  height: 144px;
  background: url(${technologyPage_frame}) no-repeat center;
  background-size: 100%;
  position: relative;
  img {
    position: absolute;
    left: 22px;
    top: 60px;
  }
  h2 {
    width: 100%;
    text-align: center;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #2bc9b1;
    line-height: 30px;
  }
`
const FrameStyles = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 30px 20px 75px;
`
const FrameText = styled.div`
  text-align: center;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #fff;
  line-height: 32px;
  h6 {
    font-size: 12px;
    color: #bdd2d1;
  }
`
const FrameTextColor = styled.div`
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #19fcee;
  line-height: 32px;
  h6 {
    color: #fcf8ff;
  }
`

export default function Technology() {
  const [totalSupply, currentSupply, round, roundSales, totalSales] = useTechnologyHooks()

  const { t } = useTranslation()
  const { i18n } = useTranslation()

  const Urlclick = (url: string) => {
    window.open(url)
  }

  return (
    <div style={{ width: '100vw' }}>
      <TechnologyBg>
        <TechnologyTopFlex>
          <TechnologyTopStyles>
            <TechnologyTopLogo>
              <p>{t('Technology_token')}</p>
            </TechnologyTopLogo>
            <p className="technologyText">{t('Technology_based')}</p>
            <ButtonDefault
              onClick={() => Urlclick('http://app.pokerfi.network/')}
              className={i18n.language === 'en' ? '' : 'buttonTop'}
            >
              {t('Technology_get_PKs')}
            </ButtonDefault>
          </TechnologyTopStyles>
          <TechnologyPageCake />
        </TechnologyTopFlex>
        <TechnologyBottomFlex>
          <TechnologyFrame>
            <img style={{ top: '63px' }} src={technologyPage_icon_1} width={'22px'} alt="" />
            <FrameStyles>
              <FrameText>
                <h6>{t('Technology_amount')}</h6>
                {i18n.language === 'en' ? <p>21 mil</p> : <p>2100 万</p>}
              </FrameText>
              <FrameText>
                <h6>{t('Technology_issued')}</h6>
                <p>{totalSupply}</p>
              </FrameText>
            </FrameStyles>
            <ProgressBar remaining={250} color={'#2BC9B1'} />
          </TechnologyFrame>
          <TechnologyFrame>
            <img src={technologyPage_icon_2} width={'22px'} alt="" />
            <FrameStyles>
              <FrameText>
                <h6>{t('Technology_sale')}</h6>
                <p>
                  {currentSupply} {t('unit_suit')}
                </p>
              </FrameText>
              <FrameText>
                <h6>{t('Technology_sold')}</h6>
                <p>
                  {roundSales} {t('unit_suit')}
                </p>
              </FrameText>
            </FrameStyles>
            <ProgressBar remaining={100} color={'#FF8E6B'} />
            <h2>
              {t('Technology_round')}：{round} {t('unit_round')}
            </h2>
          </TechnologyFrame>
          <TechnologyFrame>
            <img src={technologyPage_icon_3} width={'22px'} alt="" />
            <FrameStyles>
              <FrameTextColor>
                <h6>{t('Technology_card')}</h6>
                <p>
                  {t('Technology_sold')}：{totalSales} {t('unit_card')}
                </p>
              </FrameTextColor>
            </FrameStyles>
          </TechnologyFrame>
        </TechnologyBottomFlex>
      </TechnologyBg>
      <AppBottom link="/technology" />
    </div>
  )
}
