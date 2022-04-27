import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import GOVERNANCE_BACKGROUND from '../../assets/images/governance_background.png'
import GOVERNANCE_TITLE_DEFAULT from '../../assets/images/governance_title_default.png'
import GOVERNANCE_TITLE_ACTIVE from '../../assets/images/governance_title_active.png'
import Destruction_number_bg from '../../assets/images/Destruction_number_bg.png'
import GOVERNANCE_TITLE_BACKGROUND from '../../assets/images/governance_title_background.png'
import VOTING_MASK_BJ from '../../assets/images/voting_mask_bj.png'
import { ButtonDefault } from '../../components/Button'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import AppBottom from '../../components/AppBottom'
import { useGovernanceHooks } from '../../hooks/useGovernanceHooks'
import { useWallet } from 'use-wallet'
import { SaveAddress } from '../../store/user/action'
import { ContractPokerFiSharesFactory, ContractPokerFiShares } from '../../contracts'
import { PokerFiSharesFactory_address } from '../../contracts/constant'
import web3 from '../../contracts/initWeb3'

declare const window: any

export const GovernanceWapper = styled.div`
  width: 1005px;
  height: 694px;
  background: url(${GOVERNANCE_BACKGROUND}) no-repeat center;
  background-size: 100%;
  position: relative;
  margin-top: 40px;
  font-family: Microsoft YaHei;
  .line_none::after {
    content: none;
  }
  margin-left: calc(50% - 502.5px);
  zoom: ${window.screen.width / 1920};
`

export const GovernanceTabs = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 137.7px;
  margin-top: -30px;
`

export const TabsTitle = styled.div<{ active: boolean }>`
  width: 312px;
  height: 108px;
  background: ${({ active }) =>
    active ? `url(${GOVERNANCE_TITLE_ACTIVE}) no-repeat` : `url(${GOVERNANCE_TITLE_DEFAULT}) no-repeat`};
  background-size: 100% 100%;
  position: relative;
  cursor: pointer;
  span {
    font-size: 22px;
    font-weight: bold;
    color: ${({ active }) => (active ? '#6BFFFF' : '#75A3AA')};
    position: absolute;
    right: 0;
    text-align: center;
    width: 70%;
    top: 13.5px;
  }
`

export const TotalCirculation = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  align-items: center;
  margin-top: 34px;
  position: relative;
  ::after {
    content: '';
    width: 366px;
    height: 28px;
    background: url(${Destruction_number_bg}) no-repeat center;
    background-size: 100%;
    position: absolute;
    bottom: -20px;
  }
`

export const TotalTitle = styled.div`
  font-size: 27px;
  font-weight: bold;
  color: #ffffff;
  line-height: 44px;
  background: linear-gradient(13deg, #0ce2ff 0%, #1bffec 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const TotalNumber = styled.div`
  font-size: 44px;
  font-weight: bold;
  color: #1bffec;
  background: linear-gradient(13deg, #0ce2ff 0%, #1bffec 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const GovernanceList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 76px 44px 0 44px;
`

export const ListInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 25%;
  position: relative;
  ::after {
    content: '';
    width: 0.5px;
    height: 84px;
    background: #1cfefe;
    position: absolute;
    right: 0;
    bottom: -24.3px;
  }
`

export const ListInfoTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TitleIcon = styled.img`
  width: auto;
  height: 25.2px;
  margin-right: 10px;
`

export const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #eaeaea;
  line-height: 30px;
`

const Stage = styled.div`
  position: absolute;
  top: 30px;
  right: 60px;
  height: 31px;
  padding: 0 14px 0 10px;
  background: url(${GOVERNANCE_TITLE_BACKGROUND}) no-repeat;
  background-size: 100% 100%;
  font-size: 12px;
  font-weight: bold;
  color: #0ee7fc;
  display: flex;
  justify-content: center;
  align-items: center;
`

const InfoNumber = styled.div`
  font-size: 21.6px;
  font-weight: bold;
  color: #eaeaea;
  line-height: 30px;
  margin-top: 60.3px;
`

export const ExpirationDate = styled.div`
  height: 37.8px;
  width: 432px;
  margin-left: calc(50% - 216px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1b2934;
  font-size: 12px;
  font-weight: bold;
  color: #bdd2d1;
  margin-top: 66.4px;
  margin-bottom: 23.7px;
`

export const ReceiveBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TransferDome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`

export const TransferInput = styled.input`
  padding: 31px 78px 31px 51px;
  width: 591px;
  background: #3a4e5e;
  font-size: 22px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #79aeaf;
  text-align: center;
  margin-top: 85.5px;
  &::-webkit-input-placeholder {
    color: #79aeaf;
  }
`

export const InputTitle = styled.div`
  font-size: 22px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #79aeaf;
  line-height: 27px;
  position: absolute;
  right: calc(100% - 790px);
  top: 116.1px;
`

export const TransferBtn = styled.div`
  margin-top: 76px;
  margin-bottom: 58.5px;
`

const TransferSpan = styled.div`
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #a7cbcf;
  line-height: 30px;
`

const TransferNumber = styled.div`
  font-size: 27px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #15fcfd;
  line-height: 72px;
`

const TransferLine = styled.div`
  width: 366px;
  height: 28px;
  background: url(${Destruction_number_bg}) no-repeat center;
  background-size: 100%;
  margin-top: 20px;
`

export const AmountReceived = styled.div`
  width: 350px;
  height: 34px;
  margin-left: calc(50% - 175px);
  background: url(${VOTING_MASK_BJ}) no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #bdd2d1;
  margin-bottom: 23.7px;
`

export default function Governance() {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const wallet = useWallet()
  const activate = (connector: 'injected' | 'walletconnect') => wallet.connect(connector)
  const myAddress = useSelector((state: any) => state.userInfo.address)
  const [isTrue, setIsTrue] = useState<boolean>(true)

  const [activeTabs, setActiveTabs] = useState<'exchange' | 'transfer'>('exchange')
  const { totalPKSShares, lists, earned, currentStageTime } = useGovernanceHooks({ myAddress, isTrue })
  const [pkNumber, setPkNumber] = useState<any>(0)
  const [LPNumber, setLPNumber] = useState<any>(0)

  useEffect(() => {
    if (activeTabs === 'transfer') {
      setPkNumber(0)
      setLPNumber(0)
    }
    if (activeTabs === 'exchange') {
      setIsTrue(false)
      setTimeout(() => {
        setIsTrue(true)
      }, 500)
    }
  }, [activeTabs])

  const injectedClick = () => {
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
      console.log(error)
    }
  }

  // 领取奖励PKS
  const releaseClick = async () => {
    if (Number(earned) === 0) {
      alert('No prizes to claim!')
      return
    }
    ContractPokerFiSharesFactory.methods
      .getReward()
      .send({ from: myAddress })
      .on('transactionHash', function (hash: any) {
        console.log(hash)
      })
      .on('receipt', async (receipt: any) => {
        // let datas = await ContractPokerFiSharesPKS.methods.delegate(myAddress).send({ from: myAddress })
        // if (datas) {

        // }
        alert('Operation is successful')
        setIsTrue(false)
        setTimeout(() => {
          setIsTrue(true)
        }, 500)
      })
      .on('error', function (error: any, receipt: any) {
        console.log(receipt)
      })
  }

  // 授权金额，判断授权金额是否够
  const destroyPKClick = async () => {
    let re = /^[0-9]*[1-9][0-9]*$/
    if (!re.test(pkNumber)) {
      alert(i18n.language === 'zh' ? '只能输入正整数！' : 'Only positive integers can be entered!')
      return
    }
    if (Number(pkNumber) === 0) {
      alert(i18n.language === 'zh' ? '数量不能为0！' : 'Quantity cannot be 0!')
      return
    }
    let Balance_Pks = await ContractPokerFiShares.methods.balanceOf(myAddress).call()
    if (Number(web3.utils.fromWei(Balance_Pks, 'ether')) < Number(pkNumber)) {
      alert(i18n.language === 'zh' ? '余额不足！' : 'Insufficient balance!')
      return false
    }
    const AUTHORIZED_AMOUNT_INIT = web3.utils.toWei('1000000', 'ether')
    let AUTHORIZED_AMOUNT_REMAINING = await ContractPokerFiShares.methods
      .allowance(myAddress, PokerFiSharesFactory_address)
      .call()
    if (AUTHORIZED_AMOUNT_REMAINING < web3.utils.toWei(pkNumber, 'ether')) {
      let data = await ContractPokerFiShares.methods
        .approve(PokerFiSharesFactory_address, AUTHORIZED_AMOUNT_INIT)
        .send({ from: myAddress })
      if (data) destroyPK()
      return false
    }
    destroyPK()
  }

  // 销毁PK获取pks、Lp
  const destroyPK = async () => {
    const pkNumberWei = web3.utils.toWei(pkNumber, 'ether')
    ContractPokerFiSharesFactory.methods
      .stake(pkNumberWei)
      .send({ from: myAddress })
      .on('transactionHash', function (hash: any) {
        console.log(hash)
      })
      .on('receipt', function (receipt: any) {
        alert('Successful transaction')
        setLPNumber(pkNumber)
      })
      .on('error', function (error: any, receipt: any) {
        console.log(receipt, error)
      })
  }

  return (
    <div style={{ width: '100vw' }}>
      <GovernanceWapper>
        <GovernanceTabs>
          <TabsTitle
            active={activeTabs === 'exchange'}
            onClick={() => {
              setActiveTabs('exchange')
            }}
          >
            <span>{t('governance_title1')}</span>
          </TabsTitle>
          <TabsTitle
            active={activeTabs === 'transfer'}
            onClick={() => {
              setActiveTabs('transfer')
            }}
          >
            <span>{t('governance_title2')}</span>
          </TabsTitle>
        </GovernanceTabs>
        {activeTabs === 'exchange' && (
          <>
            <TotalCirculation>
              <TotalTitle>{t('governance_total_title')}</TotalTitle>
              <TotalNumber>{totalPKSShares}</TotalNumber>
            </TotalCirculation>
            <GovernanceList>
              {lists.map((item, i) => (
                <ListInfo key={i} className={i === 3 ? 'line_none' : ''}>
                  <ListInfoTitle>
                    <TitleIcon src={item.icon}></TitleIcon>
                    <Title>{t(`governance_list_title${i}`)}</Title>
                  </ListInfoTitle>
                  {item.stage && (
                    <Stage>
                      {t('governance_the')} {item.stage} {t('governance_the_stage')}
                    </Stage>
                  )}
                  <InfoNumber>{item.number}</InfoNumber>
                </ListInfo>
              ))}
            </GovernanceList>
            <ExpirationDate>
              {t('governance_deadline')}
              {currentStageTime.start_time !== '' && (
                <>
                  {currentStageTime.start_time}~{currentStageTime.end_time}
                </>
              )}
            </ExpirationDate>

            <AmountReceived>
              {t('governance_receive_tips')}
              {earned}
            </AmountReceived>
            <ReceiveBtn>
              <ButtonDefault onClick={myAddress ? releaseClick : injectedClick}>
                {myAddress ? t('governance_exchange_submit') : t('wallet')}
              </ButtonDefault>
            </ReceiveBtn>
          </>
        )}
        {activeTabs === 'transfer' && (
          <TransferDome>
            <TransferInput value={pkNumber} onChange={({ target }) => setPkNumber(target.value)}></TransferInput>
            <InputTitle>PK</InputTitle>
            <TransferBtn>
              <ButtonDefault onClick={myAddress ? destroyPKClick : injectedClick}>
                {myAddress ? t('governance_transfer_submit') : t('wallet')}
              </ButtonDefault>
            </TransferBtn>
            <TransferSpan>{t('governance_transfer_tips')}</TransferSpan>
            <TransferNumber>{LPNumber}</TransferNumber>
            <TransferLine />
          </TransferDome>
        )}
      </GovernanceWapper>
      <AppBottom link="/governance" />
    </div>
  )
}
