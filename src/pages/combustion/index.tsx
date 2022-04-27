import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import {
  GovernanceWapper,
  GovernanceTabs,
  TabsTitle,
  TotalNumber,
  TotalTitle,
  TotalCirculation,
  GovernanceList,
  ReceiveBtn,
  ExpirationDate,
  ListInfoTitle,
  Title,
  AmountReceived,
  TransferDome,
  TransferInput,
  InputTitle,
  TransferBtn,
} from '../governance'
import { useWallet } from 'use-wallet'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { ButtonDefault } from '../../components/Button'
import { SaveAddress } from '../../store/user/action'
import { useCombustionHooks, useCombustionTimeHooks, useCombustionListHooks } from '../../hooks/useCombustionHooks'
import AppBottom from '../../components/AppBottom'
import CountDown from '../../components/CountDown'
import moment from 'moment'
import COMBUSTION_1 from '../../assets/images/combustion_1.png'
import COMBUSTION_2 from '../../assets/images/combustion_2.png'
import VOTING_BTN_3 from '../../assets/images/voting_btn_3.png'
import COMBUSTION_ICON1 from '../../assets/images/combustion_icon1.png'
import COMBUSTION_ICON2 from '../../assets/images/combustion_icon2.png'
import COMBUSTION_ICON3 from '../../assets/images/combustion_icon3.png'
import COMBUSTION_ICON4 from '../../assets/images/combustion_icon4.png'
import TECHNOLOGYPAGE_BACKGROUND from '../../assets/images/technologyPage_background.png'
import VOTING_RIGHT_ACTIVE from '../../assets/images/voting_right_active.png'
import { ContractPancakeToken, ContractBurnPool } from '../../contracts'
import { BurnPool_Address } from '../../contracts/constant'
import web3 from '../../contracts/initWeb3'
import { toolFromWei } from '../../utils/tool'

declare const window: any
const TitleIcon = styled.img`
  width: auto;
  height: 17.1px;
  margin-right: 10px;
`

const TotalCycle = styled.div`
  width: 86px;
  height: 34px;
  justify-content: center;
  align-items: center;
  display: flex;
  background: url(${VOTING_BTN_3}) no-repeat;
  background-size: 100% 100%;
  font-size: 14px;
  font-weight: bold;
  color: #fcab0e;
  margin-left: 37.91px;
`

const ListInfoContent = styled.div`
  font-size: 21.6px;
  font-weight: bold;
  color: #eaeaea;
  margin-top: 32.12px;
`

const ListInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 25%;
  position: relative;
  ::after {
    content: '';
    width: 0.5px;
    height: 94.8px;
    background: #1cfefe;
    position: absolute;
    right: 0;
  }
`

const ChatList = styled.div`
  width: 76px;
  height: 28px;
  background: url(${COMBUSTION_2}) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: calc(50% - 38px);
  font-size: 10.21px;
  top: 32px;
  font-weight: 400;
  color: #1cfefe;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const CombustionListMask = styled.div`
  width: 1102.5px;
  height: 619.4px;
  background: url(${TECHNOLOGYPAGE_BACKGROUND}) no-repeat;
  background-size: 100% 100%;
  margin-left: calc(50% - 612.5px);
  margin-top: 20px;
  position: relative;
`

const LeftBtn = styled.div`
  width: 59px;
  height: 31px;
  background: url(${VOTING_RIGHT_ACTIVE}) no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  position: absolute;
  z-index: 10;
  top: 53px;
  left: 68px;
  transform: rotate(180deg);
`

const TabbleList = styled.div`
  width: 720px;
  height: 437.6px;
  border: 1px solid #1dc9ca;
  margin-top: 76.53px;
  margin-left: calc(50% - 360px);
  span {
    width: 33.33%;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: #eaeaea;
  }
`
const TabbleTops = styled.div`
  height: 47.7px;
  background: #084a53;
  border-bottom: 1px solid #1dc9ca;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TabbleConter = styled.div`
  height: 81.9px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(8, 74, 83, 0.16);
  position: relative;
`

const TabbleConterDiv = styled.div`
  height: calc(100% - 48.7px);
  overflow: hidden;
  overflow-y: scroll;
  /* for Chrome */
  ::-webkit-scrollbar {
    display: none;
  }
`

export const CurrentTabble = styled.div`
  width: 60px;
  height: 28px;
  background: url(${COMBUSTION_1}) no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #fcab0e;
  position: absolute;
  left: calc(17% + 20px);
`

export default function Combustion() {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const wallet = useWallet()
  const activate = (connector: 'injected' | 'walletconnect') => wallet.connect(connector)
  const myAddress = useSelector((state: any) => state.userInfo.address)

  const [activeTabs, setActiveTabs] = useState<'pool' | 'transfer' | 'list'>('pool')
  const [activeList, setActiveList] = useState<'round' | 'my'>('my')
  const [PSNumber, setPSNumber] = useState<any>(0)
  const [isTrue, setIsTrue] = useState(false)

  const [isMaskOptions, setIsMaskOptions] = useState(false)

  const {
    currentRound,
    currentRoundToday,
    burningNumber,
    roundUser,
    earnedPks,
    roundEarned,
    period,
    periodList,
    roundList,
    userRoundList,
    currentRoundNumber,
  } = useCombustionHooks({ myAddress, isTrue })
  const { currentTime, setCurrentTime } = useCombustionTimeHooks({ isTrue })
  const { totalShares, userTotalShare } = useCombustionListHooks({ myAddress, isTrue })

  const [defaultValue, setDefaultValue] = useState<any>(() => {
    return currentRoundNumber.toString() || '1'
  })

  useEffect(() => {
    setDefaultValue(currentRoundNumber.toString())
  }, [currentRoundNumber, activeTabs])

  const selectedOptionSwitch = (e: any) => {
    setDefaultValue(e.value.toString())
  }

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
    if (Number(earnedPks) === 0) {
      alert('No prizes to claim!')
      return
    }
    ContractBurnPool.methods
      .getReward()
      .send({ from: myAddress })
      .on('transactionHash', function (hash: any) {
        console.log(hash)
      })
      .on('receipt', async (receipt: any) => {
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
  const destroyPSClick = async () => {
    let re = /^[0-9]*[1-9][0-9]*$/
    if (!re.test(PSNumber)) {
      alert(i18n.language === 'zh' ? '只能输入正整数！' : 'Only positive integers can be entered!')
      return
    }
    if (Number(PSNumber) === 0) {
      alert(i18n.language === 'zh' ? '数量不能为0！' : 'Quantity cannot be 0!')
      return
    }
    let Balance_Ps = await ContractPancakeToken.methods.balanceOf(myAddress).call()
    if (Number(web3.utils.fromWei(Balance_Ps, 'ether')) < Number(PSNumber)) {
      alert(i18n.language === 'zh' ? '余额不足！' : 'Insufficient balance!')
      return false
    }
    const AUTHORIZED_AMOUNT_INIT = web3.utils.toWei('1000000', 'ether')
    let AUTHORIZED_AMOUNT_REMAINING = await ContractPancakeToken.methods.allowance(myAddress, BurnPool_Address).call()
    if (AUTHORIZED_AMOUNT_REMAINING < web3.utils.toWei(PSNumber, 'ether')) {
      let data = await ContractPancakeToken.methods
        .approve(BurnPool_Address, AUTHORIZED_AMOUNT_INIT)
        .send({ from: myAddress })
      if (data) destroyPS()
      return false
    }
    destroyPS()
  }

  /** 执行销毁Ps */
  const destroyPS = () => {
    const PSNumberWei = web3.utils.toWei(PSNumber, 'ether')
    ContractBurnPool.methods
      .stake(PSNumberWei)
      .send({ from: myAddress })
      .on('transactionHash', function (hash: any) {
        console.log(hash)
      })
      .on('receipt', function (receipt: any) {
        alert('Successful transaction')
        setIsTrue(true)
        setTimeout(() => {
          setIsTrue(false)
          setPSNumber(0)
        }, 500)
      })
      .on('error', function (error: any, receipt: any) {
        console.log(receipt, error)
      })
  }

  /** 切换列表 */
  const switchList = (str: 'round' | 'my') => {
    setActiveList(str)
    setActiveTabs('list')
  }

  return (
    <div style={{ width: '100vw' }}>
      {activeTabs !== 'list' && (
        <GovernanceWapper>
          <GovernanceTabs>
            <TabsTitle
              active={activeTabs === 'pool'}
              onClick={() => {
                setIsTrue(true)
                setTimeout(() => {
                  setIsTrue(false)
                  setPSNumber(0)
                  setCurrentTime(0)
                  setActiveTabs('pool')
                }, 50)
              }}
            >
              <span>{t('combustion.tabs.1')}</span>
            </TabsTitle>
            <TabsTitle
              active={activeTabs === 'transfer'}
              onClick={() => {
                setIsTrue(true)
                setTimeout(() => {
                  setIsTrue(false)
                  setPSNumber(0)
                  setCurrentTime(0)
                  setActiveTabs('transfer')
                }, 50)
              }}
            >
              <span>{t('combustion.tabs.2')}</span>
            </TabsTitle>
          </GovernanceTabs>
          {activeTabs === 'pool' && (
            <>
              <TotalCirculation>
                <TotalTitle>{t('combustion.pool.title')}</TotalTitle>
                <TotalNumber>{roundEarned}</TotalNumber>
                <TotalCycle>{period}</TotalCycle>
              </TotalCirculation>
              <GovernanceList>
                <ListInfo>
                  <ListInfoTitle>
                    <TitleIcon src={COMBUSTION_ICON1}></TitleIcon>
                    <Title>{t('combustion.pool.list1')}</Title>
                  </ListInfoTitle>
                  <ListInfoContent>{currentRound}</ListInfoContent>
                </ListInfo>
                <ListInfo>
                  <ListInfoTitle>
                    <TitleIcon src={COMBUSTION_ICON2}></TitleIcon>
                    <Title>{t('combustion.pool.list2')}</Title>
                  </ListInfoTitle>
                  <ListInfoContent>{currentRoundToday}</ListInfoContent>
                </ListInfo>
                <ListInfo>
                  <ListInfoTitle>
                    <TitleIcon src={COMBUSTION_ICON3}></TitleIcon>
                    <Title>{t('combustion.pool.list3')}</Title>
                  </ListInfoTitle>
                  <ListInfoContent>{toolFromWei(burningNumber)}</ListInfoContent>
                  <ChatList onClick={() => switchList('round')}>{t('combustion.pool.list5')}</ChatList>
                </ListInfo>
                <ListInfo className="line_none">
                  <ListInfoTitle>
                    <TitleIcon src={COMBUSTION_ICON4}></TitleIcon>
                    <Title>{t('combustion.pool.list4')}</Title>
                  </ListInfoTitle>
                  <ListInfoContent>{toolFromWei(roundUser.share)}</ListInfoContent>
                  <ChatList onClick={myAddress ? () => switchList('my') : injectedClick}>
                    {myAddress ? t('combustion.pool.list5') : t('wallet')}
                  </ChatList>
                </ListInfo>
              </GovernanceList>
              <ExpirationDate>
                {t('combustion.pool.next')}
                {currentTime !== 0 && !isTrue ? (
                  <CountDown
                    timeStamp={moment().add(currentTime, 'seconds').format('X')}
                    returnClick={() => {}}
                  />
                ) : (
                  <>-</>
                )}
              </ExpirationDate>

              <AmountReceived className="pkss">
                {t('combustion.pool.2')}
                {toolFromWei(earnedPks)}
              </AmountReceived>
              <ReceiveBtn>
                <ButtonDefault onClick={myAddress ? releaseClick : injectedClick}>
                  {myAddress ? t('combustion.pool.receive') : t('wallet')}
                </ButtonDefault>
              </ReceiveBtn>
            </>
          )}
          {activeTabs === 'transfer' && (
            <>
              <TransferDome>
                <TransferInput value={PSNumber} onChange={({ target }) => setPSNumber(target.value)}></TransferInput>
                <InputTitle>PS</InputTitle>
                <TransferBtn>
                  <ButtonDefault onClick={myAddress ? destroyPSClick : injectedClick}>
                    {myAddress ? t('governance_transfer_submit') : t('wallet')}
                  </ButtonDefault>
                </TransferBtn>
              </TransferDome>
            </>
          )}
        </GovernanceWapper>
      )}
      {activeTabs === 'list' && (
        <CombustionListMask>
          <LeftBtn
            onClick={() => {
              setIsTrue(true)
              setTimeout(() => {
                setIsTrue(false)
                setCurrentTime(0)
                setActiveTabs('pool')
              }, 50)
            }}
          ></LeftBtn>
          <TotalCirculation style={{ top: '36.9px' }}>
            <TotalTitle>
              {activeList === 'round' ? t('combustion.list.title1') : t('combustion.list.title2')}
            </TotalTitle>
            <TotalNumber>{activeList === 'round' ? toolFromWei(totalShares) : toolFromWei(userTotalShare)}</TotalNumber>
          </TotalCirculation>
          <div className="option-combustion">
            <Select
              isSearchable={false}
              styles={customStyles}
              defaultValue={defaultValue}
              menuIsOpen={isMaskOptions}
              onChange={selectedOptionSwitch}
              value={periodList.filter((item) => item.value === defaultValue)[0]}
              options={periodList}
              onMenuOpen={() => setIsMaskOptions(true)}
              onMenuClose={() => setIsMaskOptions(false)}
            />
          </div>
          <TabbleList>
            <TabbleTops>
              <span>{t('combustion.list.top1')}</span>
              <span>{activeList === 'round' ? t('combustion.list.top2') : t('combustion.list.top2_1')}</span>
              <span>{t('combustion.list.top5')}</span>
              {activeList === 'my' && <span>{t('combustion.list.top3')}</span>}
            </TabbleTops>
            <TabbleConterDiv>
              {activeList === 'round' &&
                roundList
                  .filter((item) => {
                    return item.round === Number(defaultValue)
                  })
                  .sort((a: any, b: any) => {
                    return b.key - a.key
                  })
                  .map((item, i) => (
                    <TabbleConter key={item.key}>
                      <span>{i + 1}</span>
                      <span>{toolFromWei(item.number)}</span>
                      <span>{item.times}</span>
                      {item.isTrue && <CurrentTabble>{t('combustion.list.top4')}</CurrentTabble>}
                    </TabbleConter>
                  ))}
              {activeList === 'my' &&
                userRoundList
                  .filter((item) => {
                    return item.round === Number(defaultValue)
                  })
                  .sort((a: any, b: any) => {
                    return b.key - a.key
                  })
                  .map((item, i) => (
                    <TabbleConter key={item.key}>
                      <span>{i + 1}</span>
                      <span>{toolFromWei(item.number)}</span>
                      <span>{item.time}</span>
                      <span>{item.times}</span>
                      {/* {item.isTrue && <CurrentTabble>{t('combustion.list.top4')}</CurrentTabble>} */}
                    </TabbleConter>
                  ))}
            </TabbleConterDiv>
          </TabbleList>
        </CombustionListMask>
      )}
      <AppBottom link="/combustion" />
    </div>
  )
}

const customStyles = {
  placeholder: (provided: any) => ({
    ...provided,
    color: '#01b3b3',
    fontWeight: 600,
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    minWidth: 166,
    textAlign: 'center',
    border: '0.9px solid #1DC9CA',
    borderRadius: '18.9px',
    display: 'flex',
    background: 'transparent',
    borderColor: '#1DC9CA',
    boxShadow: '1px solid #1DC9CA',
    '&:hover': {
      borderColor: '#1DC9CA',
    },
  }),
  singleValue: (provided: any, state: any) => {
    const transition = 'opacity 300ms'
    return {
      ...provided,
      transition,
      color: '#1DC9CA',
      fontWeight: 600,
    }
  },
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: 'none',
    color: state.isSelected ? '#34DBBE' : '#EAEAEA',
    background: '#152029',
    textAlign: 'center',
    margin: 0,
    ':active': {
      backgroundColor: 'transparent',
    },
    ':hover': {
      color: '#34DBBE',
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: 0,
    backgroundColor: '#152029',
    border: '0.9px solid #1DC9CA',
  }),
  menuList: (provided: any) => ({
    ...provided,
    boxShadow: '2px 2px 10px 0px rgba(18, 18, 27, 0.26)',
  }),
}
