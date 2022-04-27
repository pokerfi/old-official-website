import React from 'react'
import styled from 'styled-components'
import reward_background from '../../assets/images/reward_background.png'
import icon_5 from '../../assets/images/icon_5.png'
import icon_6 from '../../assets/images/icon_6.png'
import icon_7 from '../../assets/images/icon_7.png'
import { ButtonDefault } from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useRewardHooks } from '../../hooks/useRewardHooks'
import { ContractReward } from '../../contracts'
import { useWallet } from 'use-wallet'
import { SaveAddress } from '../../store/user/action'
import { useTranslation } from 'react-i18next'
import { toolFromNumber, releasableIsMumber } from '../../utils/tool'
import AppBottom from '../../components/AppBottom'
/* eslint-disable */
const RewardWapper = styled.div`
  width: 1630px;
  height: 840px;
  background: url(${reward_background}) no-repeat center;
  background-size: 100%;
  box-sizing: border-box;
  padding: 300px;
  margin-left: calc(50% - 815px);
  zoom: ${window.screen.width / 1920};
` /* eslint-disable */
const RewardStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`
const RewardDivider = styled.div`
  height: 93px;
  border: 1px solid #1cfefe;
  opacity: 0.22;
`
const RewardInfo = styled.div`
  width: 300px;
`
const IconStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #eaeaea;
  line-height: 30px;
  span {
    margin-left: 20px;
  }
`
const NumberStyles = styled.div`
  width: 300px;
  font-size: 36px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #eaeaea;
  line-height: 30px;
  text-align: center;
  margin-top: 50px;
`
const ButtonStyles = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 90px;
`
declare const window: any

export default function Reward() {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const myAddress = useSelector((state: any) => state.userInfo.address)
  const wallet = useWallet()
  const activate = (connector: 'injected' | 'walletconnect') => wallet.connect(connector)
  const { totalShares, totalReleased, releasable } = useRewardHooks(myAddress)

  //领取奖励
  const releaseClick = async () => {
    if (Number(releasable) === 0) {
      alert('No prizes to claim!')
      return
    }
    ContractReward.methods
      .release()
      .send({ from: myAddress })
      .on('transactionHash', function (hash: any) {
        console.log(hash)
      })
      .on('receipt', function (receipt: any) {
        alert('Operation is successful')
      })
      .on('error', function (error: any, receipt: any) {
        console.log(receipt)
      })
  }

  const injectedClick = async () => {
    try {
      const chainId = window.ethereum.networkVersion
      // eslint-disable-next-line eqeqeq
      if (chainId == wallet.chainId) {
        activate('injected')
        window.ethereum.on('accountsChanged', function (accounts: any[]) {
          if (accounts.length > 0) {
            dispatch(SaveAddress(accounts[0]))
          }
        })
      } else {
        alert('Network node link error!')
      }
    } catch (error) {
      alert('Please install MetaMask!')
    }
  }

  return (
    <div style={{ width: '100vw' }}>
      <RewardWapper>
        <RewardStyles>
          <RewardInfo>
            <IconStyles>
              <img src={icon_5} alt="" />
              <span>{t('Reward_issuance')}</span>
            </IconStyles>
            <NumberStyles>{toolFromNumber(totalShares)}</NumberStyles>
          </RewardInfo>
          <RewardDivider />
          <RewardInfo>
            <IconStyles>
              <img src={icon_7} alt="" />
              <span>{t('Reward_collection')}</span>
            </IconStyles>
            <NumberStyles>{totalReleased}</NumberStyles>
          </RewardInfo>
          <RewardDivider />
          <RewardInfo>
            <IconStyles>
              <img src={icon_6} alt="" />
              <span>{t('Reward_available')}</span>
            </IconStyles>
            <NumberStyles>{releasableIsMumber(toolFromNumber(totalShares), totalReleased, releasable)}</NumberStyles>
          </RewardInfo>
        </RewardStyles>
        <ButtonStyles>
          <ButtonDefault onClick={myAddress ? releaseClick : injectedClick}>
            {' '}
            {myAddress ? t('Reward_claim') : t('wallet')}
          </ButtonDefault>
        </ButtonStyles>
      </RewardWapper>
      <AppBottom link="/reward" />
    </div>
  )
}
