import React, { memo, useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  PKSRedemption,
  PKSRedemptionTitle,
  ReceiveBtn,
  TransferPK,
  TransferPKTitle,
  RansferPKInput,
  RansferPKInputIcon,
} from '../../pages/H5/styles'
import Select from 'react-select'
import COMBUSTION_2 from '../../assets/images/combustion_2.png'
import VOTING_BTN_3 from '../../assets/images/voting_btn_3.png'
import COMBUSTION_ICON1 from '../../assets/images/combustion_icon1.png'
import COMBUSTION_ICON2 from '../../assets/images/combustion_icon2.png'
import COMBUSTION_ICON3 from '../../assets/images/combustion_icon3.png'
import COMBUSTION_ICON4 from '../../assets/images/combustion_icon4.png'
import Destruction_number_bg from '../../assets/images/Destruction_number_bg.png'
import VOTING_MASK_BJ from '../../assets/images/voting_mask_bj.png'
import { ButtonDefault } from '../../components/Button'
import { useTranslation } from 'react-i18next'
import PKSDetailsMask from '../PKSListMask'
import { useCombustionHooks, useCombustionTimeHooks } from '../../hooks/useCombustionHooks'
import { useSelector } from 'react-redux'
import CountDown from '../../components/CountDown'
import moment from 'moment'
import { toolFromWei } from '../../utils/tool'
import web3 from '../../contracts/initWeb3'
import { ContractPancakeToken, ContractBurnPool } from '../../contracts'
import { BurnPool_Address } from '../../contracts/constant'

const PKSCurrent = styled.div`
  width: 128px;
  height: 47px;
  justify-content: center;
  align-items: center;
  display: flex;
  background: url(${VOTING_BTN_3}) no-repeat;
  background-size: 100% 100%;
  font-size: 24px;
  font-weight: bold;
  color: #fcab0e;
`

const PKSTotal = styled.div`
  font-size: 47px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
  line-height: 133px;
  position: relative;
  background: linear-gradient(13deg, #0ce2ff 0%, #1bffec 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  span {
    font-size: 31px;
  }
`

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  ::after {
    content: '';
    width: 396px;
    height: 28px;
    background: url(${Destruction_number_bg}) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: -10px;
    left: calc(50% - 198px);
  }
`

const PKSTitleList = styled.div`
  width: 540px;
  height: 536px;
  background: #121c24;
  margin-top: 30px;
  margin-bottom: 18px;
  margin-left: calc(50% - 270px);
  padding-left: 51px;
  .pks-list-info {
    display: flex;
    align-items: center;
    margin-bottom: 69.98px;
    position: relative;
    .cha-list {
      width: 134px;
      height: 53px;
      background: url(${COMBUSTION_2}) no-repeat;
      background-size: 100% 100%;
      font-size: 21.6px;
      font-weight: 500;
      color: #0ee7fc;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 40px;
      left: 1.5em;
      cursor: pointer;
    }
    span {
      font-size: 24px;
      font-weight: 500;
      color: #eaeaea;
      text-indent: 1.5em;
      position: relative;
      ::after {
        content: '';
        position: absolute;
        left: 0;
        top: calc(50% - 12px);
        width: 24px;
        height: 24px;
        background: url(${COMBUSTION_ICON1}) no-repeat;
        background-size: 100% 100%;
      }
    }
    .datas {
      font-size: 32px;
      font-weight: 600;
      color: #eaeaea;
    }

    :nth-child(1) {
      padding-top: 50px;
    }
    :nth-child(2) {
      span::after {
        content: '';
        height: 21px;
        background: url(${COMBUSTION_ICON2}) no-repeat;
        background-size: 100% 100%;
      }
    }
    :nth-child(3) {
      span::after {
        content: '';
        background: url(${COMBUSTION_ICON3}) no-repeat;
        background-size: 100% 100%;
      }
    }
    :nth-child(4) {
      span::after {
        content: '';
        background: url(${COMBUSTION_ICON4}) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
`

const NextCountdown = styled.div`
  width: 540px;
  height: 46px;
  background: #1b2934;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: calc(50% - 270px);
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 500;
  color: #bdd2d1;
`

const PendingPKS = styled.div`
  width: 523px;
  height: 54px;
  background: url(${VOTING_MASK_BJ}) no-repeat;
  background-size: 100% 100%;
  margin-left: calc(50% - 261.5px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 500;
  color: #19faef;
  margin-bottom: 25px;
`

export default memo(function H5CombustionPages() {
  const { t, i18n } = useTranslation()
  const [chatDetails, setChatDetails] = useState<boolean>(false)

  const [activeList, setActiveList] = useState<'round' | 'my'>('my')
  const [PSNumber, setPSNumber] = useState<any>(0)
  const [isTrue, setIsTrue] = useState(false)
  const myAddress = useSelector((state: any) => state.userInfo.address)

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
    currentRoundNumber,
  } = useCombustionHooks({ myAddress, isTrue })
  const { currentTime } = useCombustionTimeHooks({ isTrue })

  const [defaultValue, setDefaultValue] = useState<any>(() => {
    return currentRoundNumber.toString() || '1'
  })

  useEffect(() => {
    setDefaultValue(currentRoundNumber.toString())
  }, [currentRoundNumber])

  const releaseClickPKS = async () => {
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
    console.log('PSNumber', PSNumber)
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

  const selectedOptionSwitch = (e: any) => {
    setDefaultValue(e.value.toString())
  }

  /** 切换列表 */
  const switchList = (str: 'round' | 'my') => {
    setActiveList(str)
    setChatDetails(true)
  }

  return (
    <>
      <PKSRedemption>
        <div className="option-h5-combustion">
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
        <PKSRedemptionTitle>{t('combustion.tabs.1')}</PKSRedemptionTitle>
        <Div>
          <PKSTotal>
            <span>{t('combustion.pool.title')}</span>
            {roundEarned}
          </PKSTotal>
          <PKSCurrent>{period}</PKSCurrent>
        </Div>
        <PKSTitleList>
          <div className="pks-list-info">
            <span>{t('combustion.pool.list1')}</span>
            <div className="datas">{currentRound}</div>
          </div>
          <div className="pks-list-info">
            <span>{t('combustion.pool.list2')}</span>
            <div className="datas">{currentRoundToday}</div>
          </div>
          <div className="pks-list-info">
            <span>{t('combustion.pool.list3')}</span>
            <div className="datas">{toolFromWei(burningNumber)}</div>
            <div className="cha-list" onClick={() => switchList('round')}>
              {t('combustion.pool.list5')}
            </div>
          </div>
          <div className="pks-list-info">
            <span>{t('combustion.pool.list4')}</span>
            <div className="datas">{toolFromWei(roundUser.share)}</div>
            <div className="cha-list" onClick={() => switchList('my')}>
              {t('combustion.pool.list5')}
            </div>
          </div>
        </PKSTitleList>
        <NextCountdown>
          {t('combustion.pool.next')}
          {currentTime !== 0 && !isTrue ? (
            <CountDown
              timeStamp={moment().add(currentTime, 'seconds').format('X')}
              returnClick={() => {}}
            />
          ) : (
            <>-</>
          )}
        </NextCountdown>
        <PendingPKS>
          {t('combustion.pool.2')}
          {toolFromWei(earnedPks)}
        </PendingPKS>
        <ReceiveBtn>
          <ButtonDefault onClick={releaseClickPKS}>{t('combustion.pool.receive')}</ButtonDefault>
        </ReceiveBtn>
      </PKSRedemption>

      <TransferPK style={{ height: '599px' }}>
        <TransferPKTitle>{t('combustion.tabs.2')}</TransferPKTitle>
        <RansferPKInput value={PSNumber} onChange={({ target }: any) => setPSNumber(target.value)}></RansferPKInput>
        <RansferPKInputIcon>PS</RansferPKInputIcon>
        <ButtonDefault onClick={destroyPSClick}>{t('combustion.transfer.destroy')}</ButtonDefault>
      </TransferPK>
      {chatDetails && (
        <PKSDetailsMask
          setChatDetails={() => setChatDetails(false)}
          activeList={activeList}
          isTrue={isTrue}
          defaultValue={defaultValue}
        ></PKSDetailsMask>
      )}
    </>
  )
})

const customStyles = {
  placeholder: (provided: any) => ({
    ...provided,
    color: '#01b3b3',
    fontWeight: 600,
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    minWidth: 240,
    fontSize: 27,
    textAlign: 'center',
    border: '0.9px solid #1DC9CA',
    borderRadius: '27px',
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
    fontSize: 28,
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
