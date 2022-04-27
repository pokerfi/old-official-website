import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import technologyPage_cake from '../../assets/images/technologyPage_cake.png'
import { useViewport } from '../ViewportProvider'

const TechnologyPageCakeBg = styled.div`
  width: 298px;
  height: 308px;
  background: url(${technologyPage_cake}) no-repeat center;
  background-size: 100%;
  position: relative;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  line-height: 28px;
  margin: 70px 160px 50px 50px;
  span {
    font-size: 18px;
    font-weight: bold;
    color: #1afdd0;
  }
  p:nth-of-type(1) {
    position: absolute;
    top: -10px;
    left: -55px;
  }
  p:nth-of-type(2) {
    position: absolute;
    top: -15px;
    right: -75px;
  }
  p:nth-of-type(3) {
    position: absolute;
    bottom: -42px;
    right: -40px;
  }
  p:nth-of-type(4) {
    position: absolute;
    top: 85px;
    left: -85px;
  }
`
const TechnologyPageCakeMiniBg = styled(TechnologyPageCakeBg)`
  width: 343px;
  height: 405px;
  font-size: 24px;
  line-height: 34px;
  margin: 0;
  span {
    font-size: 26px;
    font-weight: bold;
    color: #1afdd0;
  }
  p:nth-of-type(1) {
    position: absolute;
    top: -10px;
    left: -70px;
  }
  p:nth-of-type(2) {
    position: absolute;
    top: 5px;
    right: -110px;
  }
  p:nth-of-type(3) {
    position: absolute;
    bottom: -25px;
    right: -90px;
  }
  p:nth-of-type(4) {
    position: absolute;
    top: 120px;
    left: -110px;
  }
`
const TechnologyPageCakeMiniBgEn = styled(TechnologyPageCakeMiniBg)`
  p:nth-of-type(1) {
    position: absolute;
    top: -10px;
    left: -200px;
  }
  p:nth-of-type(2) {
    position: absolute;
    top: 5px;
    right: -140px;
  }
  p:nth-of-type(3) {
    position: absolute;
    bottom: -40px;
    right: -140px;
  }
  p:nth-of-type(4) {
    position: absolute;
    top: 120px;
    left: -190px;
  }
`
const TechnologyPageCakeBgEn = styled(TechnologyPageCakeBg)`
  p:nth-of-type(1) {
    position: absolute;
    top: -20px;
    left: -130px;
  }
  p:nth-of-type(2) {
    position: absolute;
    top: -15px;
    right: -90px;
  }
  p:nth-of-type(3) {
    position: absolute;
    bottom: -25px;
    right: -130px;
  }
  p:nth-of-type(4) {
    position: absolute;
    top: 85px;
    left: -150px;
  }
`

export default function TechnologyPageCake() {
  const { width } = useViewport()
  const { i18n } = useTranslation()

  if (width <= 1200) {
    return (
      <>
        {i18n.language === 'en' ? (
          <TechnologyPageCakeMiniBgEn>
            <p>
              Fund for community
              <br /> ecology building: <span>1.47</span> mil{' '}
            </p>
            <p>
              Founding team: <br />
              <span>1.05</span> mil
            </p>
            <p>
              NFT card hashrate mining: <br /> <span>16.38</span> mil
            </p>
            <p>
              Private placement: <br />
              <span>2.1</span> mil
            </p>
          </TechnologyPageCakeMiniBgEn>
        ) : (
          <TechnologyPageCakeMiniBg>
            <p>
              社区生态建设基
              <br />金<span>147</span>万
            </p>
            <p>
              创世团队<span>105</span>万
            </p>
            <p>
              NFT卡牌算力挖矿
              <br />
              <span>1638</span>万
            </p>
            <p>
              私募<span>210</span>万
            </p>
          </TechnologyPageCakeMiniBg>
        )}
      </>
    )
  } else {
    return (
      <>
        {i18n.language === 'en' ? (
          <TechnologyPageCakeBgEn>
            <p>
              Fund for community
              <br /> ecology building: <span>1.47</span> mil{' '}
            </p>
            <p>
              Founding team: <br />
              <span>1.05</span> mil
            </p>
            <p>
              NFT card hashrate mining: <br /> <span>16.38</span> mil
            </p>
            <p>
              Private placement: <br />
              <span>2.1</span> mil
            </p>
          </TechnologyPageCakeBgEn>
        ) : (
          <TechnologyPageCakeBg>
            <p>
              社区生态建设基
              <br />金<span>147</span>万
            </p>
            <p>
              创世团队<span>105</span>万
            </p>
            <p>
              NFT卡牌算力挖矿
              <br />
              <span>1638</span>万
            </p>
            <p>
              私募<span>210</span>万
            </p>
          </TechnologyPageCakeBg>
        )}
      </>
    )
  }
}
