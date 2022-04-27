import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import H5_logo from '../../assets/images/H5_logo.png'
import H5_logo_en from '../../assets/images/H5_logo_en.png'
import technologyPage_icon_1 from '../../assets/images/technologyPage_icon_1.png'
import technologyPage_icon_2 from '../../assets/images/technologyPage_icon_2.png'
import technologyPage_icon_3 from '../../assets/images/technologyPage_icon_3.png'
import icon_5 from '../../assets/images/icon_5.png'
import icon_6 from '../../assets/images/icon_6.png'
import icon_7 from '../../assets/images/icon_7.png'
import icon_1 from '../../assets/images/icon_1.png'
import icon_2 from '../../assets/images/icon_2.png'
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
import H5_integral_icon from '../../assets/images/H5_integral_icon.png'

import ProgressBar from '../../components/ProgressBar'
import TechnologyPageCake from '../../components/TechnologyPageCake'
import { ButtonDefault } from '../../components/Button'
import { useTechnologyHooks } from '../../hooks/useTechnologyHooks'
import { useRewardHooks } from '../../hooks/useRewardHooks'
import { useSelector } from 'react-redux'
import { ContractReward } from '../../contracts'
import { toolFromWei } from '../../utils/tool'
import { useTranslation } from 'react-i18next'
import { IP_URL, pokerFiReedem_address, STATIC_URL } from '../../contracts/constant'
import axios from 'axios'
import { parseAccount } from '../../utils/parseAccount'
import { PlayerVoteMini1, PlayerVoteMini2, PlayerVoteMini3, PlayerVoteMini4 } from '../../components/PlayerVote'
import {
  H5Wapper,
  BlockList,
  Address,
  VideoStyles,
  TitleStyles,
  HereText,
  PaperStyles,
  PaperButton,
  DataCenterStyles,
  DataCenterFlex,
  DataAnalysis,
  GainStyles,
  GainLogo,
  GainButton,
  RewardStyles,
  RewardInfo,
  IconStyles,
  NumberStyles,
  AddressStyles,
  AddressTitle,
  DividerHr,
  AddressUrl,
  PublicTextStyles,
  PublicText,
  Label,
  HelpStyles,
  PlayerSelect,
  DestructionFlex,
  DestructionTitle,
  DestructionCenter,
  DestructionList,
  AnnouncementCenterStyles,
  HelpText,
  HelpTextInfo,
  HelpPartnerStyles,
  PartnersList,
  ContactStyles,
  ModalMain,
  ShadowWapper,
  ModelStyles,
  ModelTitle,
  Modelback,
  ContentText,
  ModelAddress,
  FrameText,
  TechnologyFrame,
  FrameStyles,
  FrameTextColor,
  ContactLogo,
  MessageInput,
  ButtonStyles,
  ShareStyles,
  QueryDestruction,
  TitleColor,
  QueryCenter,
  Total,
  ChooseTimeStyles,
  ChooseTimeButton,
  EducationNumber,
  EducationStyles,
  QueryTitleStyles,
  RankingData,
  RankingList,
  RankingText,
  RankingNumber,
  PSIntegral,
  IntegralTitle,
  IntegralStartTime,
  IntegralTime,
  IntegralTable,
  IntegralTableTitle,
  IntegralListInfo,
  IntegralListInfoName,
  IntegralListInfoSort,
  IntegralListInfoPs,
  IntegralTableLists,
  IntegralOneInfo,
  IntegralOneInfoName,
  IntegralOneInfoPs,
  IntegralOneInfoPsName,
  IntegralTwoInfo,
  IntegralTwoInfoName,
  IntegralTwoInfoPs,
  IntegralTwoInfoPsName,
  IntegralThreeInfoPsName,
  IntegralThreeInfo,
  IntegralThreeInfoName,
  IntegralThreeInfoPs,
  IntegralSession,
  ActiveSessionMask,
  ActiveSessionList,
  PKSRedemption,
  PKSRedemptionTitle,
  PKSTotal,
  PKSContent,
  ListInfo,
  Stage,
  TitleIcon,
  Title,
  InfoNumber,
  ExpirationDate,
  ReceiveBtn,
  TransferPK,
  TransferPKTitle,
  RansferPKInput,
  RansferPKInputIcon,
  RansferPKSpan,
  RansferPKNumber,
  Proposal,
  ProposalTitle,
  ProposalList,
  ProposalListInfo,
  ProposalListInfoTitle,
  Vote,
  VoteNo,
  VoteSuccess,
  InfoStartTime,
  PlayerTriangleRight,
  PlayerSelectMask,
  NoList,
  AmountReceived,
  CommissionBtn,
  Exchange,
  ExchangeTitle,
  ExchangeWenhao,
  ExchangeChoose,
  ChooseCount,
  ExchangeBtn,
  Tags,
  TagsItem,
  CardContet,
  CardItem,
  CardImg,
  NoData,
  NewCard,
  NewTable,
  FooterBtn,
  NewIntegralListInfo,
  NewIntegralListInfoSort,
  NewIntegralListInfoName,
  NewIntegralListInfoPs,
  NoNewData,
  MineTableLists,
  Mine,
  MineTable,
  Page,
} from './styles'
import { TotalNumberBg } from '../destruction'
import DestructionEcharts from '../../components/DestructionEcharts'
import {
  useDestructionBlockHooks,
  useDestructionChartHooks,
  useDestructionRankingHooks,
} from '../../hooks/useDestructionHooks'
import LiftState from '../../components/LiftState'
import ScrollText from '../../components/ScrollText'
import { toolFromNumber, releasableIsMumber } from '../../utils/tool'
import ProposalMaskContent from '../../components/ProposalMaskContent'
import ProposalMaskRelease from '../../components/ProposalMaskRelease'
import { pointsSeason, currentTimeText } from '../../utils'
import { useIntegralHooks } from '../../hooks/useIntegralHooks'
import type { listType, newlistType } from '../../hooks/useIntegralHooks'
import moment from 'moment'
import { ContractPokerFiSharesFactory, ContractPokerFiShares } from '../../contracts'
import { PokerFiSharesFactory_address } from '../../contracts/constant'
import { useGovernanceHooks } from '../../hooks/useGovernanceHooks'
import web3 from '../../contracts/initWeb3'
import { useVotingHooks, useVotingListStatus, ListType } from '../../hooks/useVotingHooks'
import { ContractPokerFiGovernor, ContractPokerFiSharesPKS, IN_Contract, EX_Contract } from '../../contracts'
import { ethers } from 'ethers'
import { Modal, Form, Input, Button } from 'antd'
import { bagAnalysis, getPokerName } from '../../utils/common'
import H5Combustion from '../../components/H5Combustion'

export default function H5() {
  const { CURRENT_SEASON, CURRENT_SEASON_DAYS, CURRENT_SEASON_NAME, CURRENT_SEASON_END_TIME } = currentTimeText()
  const myAddress = useSelector((state: any) => state.userInfo.address)
  const { t } = useTranslation()
  const { i18n } = useTranslation()

  const [selectKey, setSelectKey] = useState(1)
  const [selectKeyShow, setSelectKeyShow] = useState(false)

  const [isOpen, setIsOpen] = useState(false)

  const [totalSupply, currentSupply, round, roundSales, totalSales] = useTechnologyHooks()
  const { totalShares, totalReleased, releasable } = useRewardHooks(myAddress)

  const [title, setTitle] = useState('')
  const [list, setList] = useState<any[]>([])
  const [destructionData, setDestructionData] = useState<any>({})

  const [chooseBtnId, setChooseBtnId] = useState<number>(24)
  const [rankingBtnId, setRankingBtnId] = useState<number>(24)
  const [rankingTextId, setRankingTextId] = useState<number>(1)

  const { totalCount, kindTotalCount, rate, isRise } = useDestructionChartHooks(chooseBtnId, 6)
  const { blockList } = useDestructionBlockHooks()
  const { rankList } = useDestructionRankingHooks(rankingBtnId)

  const [integralActive, setIntegralActive] = useState<number>(3)
  const [mineActive, setMineActive] = useState<number>(0)

  const [sessionList] = useState<{ id: number; name: string }[]>(pointsSeason())
  const [activeSession, setActiveSession] = useState<number>(CURRENT_SEASON)
  const [activeSessionShow, setActiveSessionShow] = useState<boolean>(false)

  const { integralList } = useIntegralHooks(activeSession)

  const [isTrue, setIsTrue] = useState<boolean>(true)
  const { totalPKSShares, lists, earned, currentStageTime } = useGovernanceHooks({ myAddress, isTrue })
  const [PkNumber, setPkNumber] = useState<any>(0)
  const [LPNumber, setLPNumber] = useState<any>(0)

  const [proposalActive, setProposalActive] = useState<any>(0)
  const [proposalContent, setProposalContent] = useState<any>({})
  const [proposalStatus, setProposalStatus] = useState<'list' | 'details' | 'release'>('list')

  const [isTrueVotingHooks, setIsTrueVotingHooks] = useState(true)
  const [params] = useState<{ page: number }>({ page: 1 })
  const { wholeList, listTotal, proposalEta, setWholeList, isUserDelegate } = useVotingHooks({
    page: params.page,
    isTrueVotingHooks,
    myAddress,
  })

  const [transferIsMode, setTransferIsMode] = useState(false)

  const [allCard, setAllCard] = useState<any[]>()
  const [cardList, setCardList] = useState<any[]>()
  const [tabCurrent, setTabCurrent] = useState(2)
  const [choose, setChoose] = useState(0)
  const [newCard, setNewCard] = useState<any[]>()
  /* eslint-disable */
  const [tab, setTab] = useState([
    {
      index: 1,
      value: 2,
    },
    {
      index: 2,
      value: 3,
    },
    {
      index: 3,
      value: 4,
    },
    {
      index: 4,
      value: 5,
    },
  ])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalName, setModalName] = useState('')
  const [decurrent, setDecurrent] = useState(1)
  const [dataSource, setDataSource] = useState<{
    data: newlistType[]
    total: number
  }>({
    data: [],
    total: 0,
  })
  const [loading, setLoading] = useState(false)
  /* eslint-enable */
  const checkPs = (number: number) => {
    // setModalName(item.name)
    // setIsModalVisible(true)
    // setLoading(true)
    axios
      .post(`${IP_URL}api/burn/psminepoints`, {
        loginAddress: 'admin',
        seasonId: CURRENT_SEASON,
        page: number,
        // PoolAddress: item.address
      })
      .then((res) => {
        setLoading(false)
        let paramsData: any = {
          data: [],
          total: 0,
        }
        if (res.data.Data.list !== undefined) {
          paramsData.data = res.data.Data.list
          paramsData.total = res.data.Data.totalCount
          setDataSource(paramsData)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const pageChange = (pagenumber: number) => {
    setDecurrent(pagenumber)
    checkPs(pagenumber)
  }

  useEffect(() => {}, [dataSource])

  useEffect(() => {
    cardInit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myAddress])

  useEffect(() => {
    if (allCard) {
      let a = allCard?.filter((item1) => {
        const result = ((item1.tokenId % 1000) - (item1.tokenId % 10)) / 10
        return result === tabCurrent
      })
      setCardList(a)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCard])

  useEffect(() => {
    rankingTextClick(1)
    checkPs(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    axios
      .get('./staticText/notice.json')
      .then(function (res) {
        console.log(res.data.announcement)
        if (i18n.language === 'en') {
          setTitle(res.data.announcement.title_en)
          setList(res.data.announcement.list_en)
        } else {
          setTitle(res.data.announcement.title_zh)
          setList(res.data.announcement.list_zh)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])

  const UrlClick = (Url: string) => {
    window.open(Url)
  }

  // 领取PKS
  const releaseClickPKS = async () => {
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
        let datas = await ContractPokerFiSharesPKS.methods.delegate(myAddress).send({ from: myAddress })
        if (datas) {
          alert('Operation is successful')
          setIsTrue(false)
          setTimeout(() => {
            setIsTrue(true)
          }, 500)
        }
      })
      .on('error', function (error: any, receipt: any) {
        console.log(receipt)
      })
  }

  const rankingTextClick = (kind: number) => {
    setRankingTextId(kind)
    axios
      .post(`${IP_URL}api/burn/pkdetail`, {
        address: 'admin',
        kind: kind,
      })
      .then(function (res) {
        console.log(res)
        setDestructionData(res.data.Data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  // 授权金额，判断授权金额是否够
  const destroyPKClick = async () => {
    let re = /^[0-9]*[1-9][0-9]*$/
    if (!re.test(PkNumber)) {
      alert(i18n.language === 'zh' ? '只能输入正整数！' : 'Only positive integers can be entered!')
      return
    }
    if (Number(PkNumber) === 0) {
      alert(i18n.language === 'zh' ? '数量不能为0！' : 'Quantity cannot be 0!')
      return
    }
    let Balance_Pks = await ContractPokerFiShares.methods.balanceOf(myAddress).call()
    if (Number(web3.utils.fromWei(Balance_Pks, 'ether')) < Number(PkNumber)) {
      alert(i18n.language === 'zh' ? '余额不足！' : 'Insufficient balance!')
      return false
    }
    const AUTHORIZED_AMOUNT_INIT = web3.utils.toWei('1000000', 'ether')
    let AUTHORIZED_AMOUNT_REMAINING = await ContractPokerFiShares.methods
      .allowance(myAddress, PokerFiSharesFactory_address)
      .call()
    if (AUTHORIZED_AMOUNT_REMAINING < web3.utils.toWei(PkNumber, 'ether')) {
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
    const pkNumberWei = web3.utils.toWei(PkNumber, 'ether')
    ContractPokerFiSharesFactory.methods
      .stake(pkNumberWei)
      .send({ from: myAddress })
      .on('transactionHash', function (hash: any) {
        console.log(hash)
      })
      .on('receipt', function (receipt: any) {
        alert('Successful transaction')
        setLPNumber(PkNumber)
      })
      .on('error', function (error: any, receipt: any) {
        console.log(receipt, error)
      })
  }

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

  /** 发起新提案 判断是否能够提案 */
  const votingReleaseClick = async () => {
    let data = await ContractPokerFiGovernor.methods.proposalThreshold().call()
    let minThreshold = toolFromWei(data)
    let data1 = await ContractPokerFiSharesPKS.methods.getVotes(myAddress).call()
    console.log('getVotes', data1)
    let myCurrentThreshold = toolFromWei(data1)
    console.log('minThreshold', minThreshold)
    console.log('myCurrentThreshold', myCurrentThreshold)
    if (Number(myCurrentThreshold) >= Number(minThreshold)) {
      setProposalStatus('release')
    } else {
      alert(t('voting_go_tips'))
    }
  }

  const getKindName = (kind: number) => {
    if (kind === 1) {
      return t('destruction_2')
    } else if (kind === 2) {
      return t('destruction_3')
    } else if (kind === 3) {
      return t('destruction_4')
    } else if (kind === 4) {
      return t('destruction_5')
    } else if (kind === 5) {
      return t('destruction_0')
    }
  }

  // 去投票判断是否已经投票
  const getDetailsNumberStatus = async (proposalId: string) => {
    setProposalStatus('details')
    // try {
    //   let data = await ContractPokerFiGovernor.methods.hasVoted(proposalId, myAddress).call()
    //   console.log('data', data, 'proposalId', proposalId)
    //   if (!data) {
    //     setProposalStatus('details')
    //   } else {
    //     alert(t('voting_voted_tips'))
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  }

  // 点击查看详情
  const getDetails = async (proposalId: string) => {
    setProposalStatus('details')
  }

  /** 投票通过，放入队里，并判断延迟时间是否达到 */
  const onVoteSuccessClick = async (item: ListType) => {
    try {
      console.log('item', item)
      let descriptionBytens = ethers.utils.id(item.description)
      ContractPokerFiGovernor.methods
        .queue(item.targets, item.values, item.calldatas, descriptionBytens)
        .send({
          from: myAddress,
        })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', async (receipt: any) => {
          alert('Successful')
          let list = JSON.parse(JSON.stringify(wholeList))
          for (let i = 0; i < list.length; i++) {
            if (list[i].proposalId === item.proposalId) {
              list[i].status = 5
              list[i].queueTime = await proposalEta(item.proposalId)
            }
          }
          console.log('list', list)
          setWholeList(list)
        })
        .on('error', function (error: any, receipt: any) {
          console.log(receipt, error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const toExecuteChange = async (item: ListType) => {
    Modal.confirm({
      title: '是否执行提案',
      content: (
        <div>
          <p>队列完成时间：{item.startTime}</p>
        </div>
      ),
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        let descriptionBytens = ethers.utils.id(item.description)
        ContractPokerFiGovernor.methods
          .execute(item.targets, item.values, item.calldatas, descriptionBytens)
          .send({
            from: myAddress,
          })
          .on('transactionHash', function (hash: any) {
            console.log(hash)
          })
          .on('receipt', async (receipt: any) => {
            alert('Execution Succeed')
            setIsTrueVotingHooks(false)
            setTimeout(() => {
              setIsTrueVotingHooks(true)
            }, 10)
          })
          .on('error', function (error: any, receipt: any) {
            console.log(receipt, error)
          })
      },
      onCancel() {},
    })
  }

  /** 委托给其他用户---打开 */
  const votingCommissionClick = async () => {
    setTransferIsMode(true)
  }

  /** 委托给其他用户-执行 */
  const votingCommissionClickGo = async (values: any) => {
    ContractPokerFiSharesPKS.methods
      .delegate(values.address)
      .send({
        from: myAddress,
      })
      .on('transactionHash', function (hash: any) {
        console.log(hash)
      })
      .on('receipt', async (receipt: any) => {
        alert('Successfully transferred')
        setTransferIsMode(false)
        setIsTrueVotingHooks(false)
        setTimeout(() => {
          setIsTrueVotingHooks(true)
        }, 10)
      })
      .on('error', function (error: any, receipt: any) {
        console.log(receipt, error)
      })
  }

  // 兑换卡牌
  const cardInit = async () => {
    if (myAddress) {
      let data = await IN_Contract.methods.balanceOf(myAddress).call()
      if (data > 0) {
        let dataArr = await IN_Contract.methods.ownedTokens(myAddress, 0, data).call()
        if (dataArr) {
          setAllCard(bagAnalysis(dataArr))
        }
      }
    }
  }

  const chooseCard = (i: number) => {
    try {
      setCardList((card) => {
        let newCounts = JSON.parse(JSON.stringify(card))
        newCounts[i].isChoose = !newCounts[i].isChoose
        let count = newCounts.filter((item: any) => {
          return item.isChoose
        })
        setChoose(count.length)
        if (count.length > 3) {
          newCounts[i].isChoose = !newCounts[i].isChoose
          alert(t('tips4'))
          return newCounts
        }
        return newCounts
      })
    } catch (error) {
      console.log(error)
    }
  }

  const exchange = async () => {
    if (myAddress === '') {
      return
    }
    const list: any[] = []
    cardList?.forEach((item) => {
      if (item.isChoose) {
        list.push(parseInt(item.tokenId))
      }
    })
    if (list.length === 0) {
      alert(t('tips1'))
      return
    }
    if (list.length !== 3) {
      alert(t('tips2'))
      return
    }
    let data = await IN_Contract.methods.isApprovedForAll(myAddress, pokerFiReedem_address).call()
    if (!data) {
      await IN_Contract.methods.setApprovalForAll(pokerFiReedem_address, true).send({ from: myAddress })
    }

    EX_Contract.methods
      .redeem(list)
      .send({ from: myAddress })
      .on('transactionHash', function (hash: string) {
        // console.log('hash', hash)
      })
      .on('receipt', async function (receipt: any) {
        // console.log(receipt.events.Redeemed.returnValues.newTokenId)
        let arr = []
        arr.push(receipt.events.Redeemed.returnValues.newTokenId)
        setNewCard(bagAnalysis(arr))
        setChoose(0)
        cardInit()
        alert(t('tips3'))
      })
      .on('confirmation', function (confirmationNumber: any, receipt: any) {
        // console.log(receipt, confirmationNumber)
      })
      .on('error', function (err: any) {
        console.log(err)
      })
  }

  return (
    <H5Wapper>
      {/* 欢迎 */}
      <TitleStyles>
        <img src={i18n.language === 'en' ? H5_logo_en : H5_logo} alt="logo" />
        <HereText>{t('HomePage_info')}</HereText>
      </TitleStyles>
      {/* 白皮书下载 */}
      <PaperStyles active={i18n.language === 'en'}>
        <p>{t('introduction_1')}</p>
        <a
          href={i18n.language === 'en' ? STATIC_URL + 'pdf/pokerFi_en.pdf' : STATIC_URL + 'pdf/pokerFi_zh.pdf'}
          download="pokerFi.pdf"
        >
          <PaperButton>{t('introduction_whitepaper')}</PaperButton>
        </a>
      </PaperStyles>
      {/* PK发售数据 */}
      <DataCenterStyles active={i18n.language === 'en'}>
        <p>{t('Technology_based')}</p>
        <DataCenterFlex>
          <TechnologyFrame>
            <img src={technologyPage_icon_1} width={'35px'} alt="" />
            <FrameStyles style={{ padding: `30px 20px 35px 100px` }}>
              <FrameText active={i18n.language === 'en'}>
                <h6>{t('Technology_amount')}</h6>
                {i18n.language === 'en' ? <p>21 mil</p> : <p>2100万</p>}
              </FrameText>
              <FrameText active={i18n.language === 'en'}>
                <h6>{t('Technology_issued')}</h6>
                <p>{totalSupply}</p>
              </FrameText>
            </FrameStyles>
            <ProgressBar remaining={250} color={'#2BC9B1'} />
          </TechnologyFrame>
          <TechnologyFrame>
            <img src={technologyPage_icon_2} width={'35px'} alt="" />
            <FrameStyles>
              <FrameText active={i18n.language === 'en'}>
                <h6>{t('Technology_sale')}</h6>
                <p>
                  {currentSupply} {t('unit_suit')}
                </p>
              </FrameText>
              <FrameText active={i18n.language === 'en'}>
                <h6>{t('Technology_sold')}</h6>
                <p>
                  {roundSales} {t('unit_suit')}
                </p>
              </FrameText>
            </FrameStyles>
            <ProgressBar remaining={100} color={'#FF8E6B'} />
            <h2>
              {t('Technology_round')}: {round} {t('unit_round')}
            </h2>
          </TechnologyFrame>
          <TechnologyFrame>
            <img src={technologyPage_icon_3} width={'35px'} alt="" />
            <FrameStyles>
              <FrameTextColor>
                <h6>{t('Technology_card')}</h6>
                <p>
                  {t('Technology_sold')}：{totalSales} {t('unit_card')}
                </p>
              </FrameTextColor>
            </FrameStyles>
          </TechnologyFrame>
        </DataCenterFlex>
      </DataCenterStyles>
      {/* PK发售数据饼图 */}
      <DataAnalysis>
        <TechnologyPageCake />
      </DataAnalysis>
      {/* 获取PK币 */}
      <GainStyles>
        <GainLogo>
          <p>{t('Technology_token')}</p>
        </GainLogo>
        <GainButton onClick={() => UrlClick('http://app.pokerfi.network/')}>{t('Technology_get_PKs')}</GainButton>
      </GainStyles>
      {/* 矿池公会积分比赛 ps 积分 */}
      <PSIntegral>
        {activeSessionShow && (
          <ActiveSessionMask>
            {sessionList.map((item, i) => {
              return (
                <ActiveSessionList
                  key={i}
                  active={item.id === activeSession}
                  onClick={() => {
                    setActiveSession(item.id)
                    setActiveSessionShow(false)
                  }}
                >
                  {item.name}
                </ActiveSessionList>
              )
            })}
          </ActiveSessionMask>
        )}
        <IntegralTitle>{t('H5_ps_integral_title')}</IntegralTitle>
        <IntegralSession
          onClick={() => {
            setActiveSessionShow(true)
          }}
        >
          {sessionList.map((item) => {
            return <div key={item.id}>{item.id === activeSession && <span>{item.name}</span>}</div>
          })}
          <img src={H5_integral_icon} className="icon" alt="" />
        </IntegralSession>
        <IntegralStartTime style={{ fontSize: i18n.language === 'en' ? '14px' : '16px' }}>
          {moment() < moment('2021-11-15 13:00:00')
            ? '预热赛：09月30日10时起，结束时间：2021.11.15 13:00'
            : `${CURRENT_SEASON_NAME}：共15天，第${CURRENT_SEASON_DAYS}天。${t('integral_start_time')}
          ${CURRENT_SEASON_END_TIME}`}
        </IntegralStartTime>
        <IntegralTime>{t('integral_title')}</IntegralTime>
        <IntegralTable>
          <IntegralTableTitle>
            <span>{t('integral_table_title1')}</span>
            <span>{t('integral_table_title2')}</span>
            <span>{t('integral_table_title3')}</span>
          </IntegralTableTitle>
          <IntegralTableLists>
            {integralList.map((item: listType, i: number) => {
              return (
                <div key={i}>
                  {i > 2 && (
                    <IntegralListInfo
                      key={i}
                      active={i === integralActive}
                      onClick={() => {
                        setIntegralActive(i)
                        // checkPs(item)
                      }}
                    >
                      <IntegralListInfoSort>{i + 1}</IntegralListInfoSort>
                      <IntegralListInfoName active={i === integralActive}>{item.name}</IntegralListInfoName>
                      <IntegralListInfoPs active={i === integralActive}>{item.value}</IntegralListInfoPs>
                    </IntegralListInfo>
                  )}
                  {i === 0 && (
                    <IntegralOneInfo
                      key={i}
                      // onClick={() => {checkPs(item)}}
                    >
                      <IntegralOneInfoName>{item.name}</IntegralOneInfoName>
                      <IntegralOneInfoPs>{item.value}</IntegralOneInfoPs>
                      <IntegralOneInfoPsName>
                        <span>{t('integral_tips_name')}</span>
                      </IntegralOneInfoPsName>
                    </IntegralOneInfo>
                  )}
                  {i === 1 && (
                    <IntegralTwoInfo
                      key={i}
                      // onClick={() => {checkPs(item)}}
                    >
                      <IntegralTwoInfoName>{item.name}</IntegralTwoInfoName>
                      <IntegralTwoInfoPs>{item.value}</IntegralTwoInfoPs>
                      <IntegralTwoInfoPsName>
                        <span>{t('integral_tips_name')}</span>
                      </IntegralTwoInfoPsName>
                    </IntegralTwoInfo>
                  )}
                  {i === 2 && (
                    <IntegralThreeInfo
                      key={i}
                      // onClick={() => {checkPs(item)}}
                    >
                      <IntegralThreeInfoName>{item.name}</IntegralThreeInfoName>
                      <IntegralThreeInfoPs>{item.value}</IntegralThreeInfoPs>
                      <IntegralThreeInfoPsName>
                        <span>{t('integral_tips_name')}</span>
                      </IntegralThreeInfoPsName>
                    </IntegralThreeInfo>
                  )}
                </div>
              )
            })}
          </IntegralTableLists>
        </IntegralTable>
        <Modal
          title={modalName}
          visible={isModalVisible}
          closable={false}
          centered={true}
          className="newModal h5NewModal"
          width="602px"
          footer={[
            <FooterBtn
              key="back"
              onClick={() => {
                setIsModalVisible(false)
              }}
            >
              关闭
            </FooterBtn>,
          ]}
        >
          <NewTable>
            <IntegralTableTitle>
              <span>{t('integral_table_title1')}</span>
              <span>{t('new_table_title2')}</span>
              <span>{t('new_table_title3')}</span>
            </IntegralTableTitle>
            <IntegralTableLists>
              {dataSource.total !== 0 &&
                dataSource.data.map((item: any, i: number) => {
                  return (
                    <div key={i}>
                      <NewIntegralListInfo
                        key={i}
                        // onClick={() => {
                        //   checkPs(item)
                        // }}
                      >
                        <NewIntegralListInfoSort>{i + 1}</NewIntegralListInfoSort>
                        <NewIntegralListInfoName>{item.mineName}</NewIntegralListInfoName>
                        <NewIntegralListInfoPs style={{ textAlign: 'center' }}>{item.value}</NewIntegralListInfoPs>
                      </NewIntegralListInfo>
                    </div>
                  )
                })}
              {dataSource.total === 0 && <NoNewData>暂无相关数据</NoNewData>}
            </IntegralTableLists>
          </NewTable>
        </Modal>
      </PSIntegral>
      {/* ps积分排行榜 */}
      {/* <Mine>
        <IntegralTitle>{t('H5_ps_mine_title')}</IntegralTitle>
        <MineTable>
          <IntegralTableTitle>
            <span>{t('integral_table_title1')}</span>
            <span>{t('new_table_title2')}</span>
            <span>{t('new_table_title3')}</span>
          </IntegralTableTitle>
          <MineTableLists>
            {dataSource.data.map((item: any, i: number) => {
              return (
                <div key={i}>
                  <IntegralListInfo
                    key={i}
                    active={i === mineActive}
                    onClick={() => {
                      setMineActive(i)
                    }}
                  >
                    <IntegralListInfoSort>{decurrent > 1 ? 20 + i + 1 : i + 1}</IntegralListInfoSort>
                    <IntegralListInfoName active={i === mineActive}>{item.mineName}</IntegralListInfoName>
                    <IntegralListInfoPs active={i === mineActive}>{item.value}</IntegralListInfoPs>
                  </IntegralListInfo>
                </div>
              )
            })}
          </MineTableLists>
          {dataSource.total > 0 && (
            <Page>
              <Pagination
                defaultCurrent={decurrent}
                current={decurrent}
                pageSize={20}
                total={dataSource.total}
                onChange={pageChange}
              />
            </Page>
          )}
        </MineTable>
      </Mine> */}
      {/* 获取奖励 */}
      {/* <RewardStyles>
        <RewardInfo>
          <IconStyles>
            <img src={icon_5} alt="" />
            <span>{t('Reward_issuance')}</span>
          </IconStyles>
          <NumberStyles>{toolFromNumber(totalShares)}</NumberStyles>
        </RewardInfo>
        <RewardInfo>
          <IconStyles>
            <img src={icon_7} alt="" />
            <span>{t('Reward_collection')}</span>
          </IconStyles>
          <NumberStyles>{totalReleased}</NumberStyles>
        </RewardInfo>
        <RewardInfo>
          <IconStyles>
            <img src={icon_6} alt="" />
            <span>{t('Reward_available')}</span>
          </IconStyles>
          <NumberStyles>{releasableIsMumber(toolFromNumber(totalShares), totalReleased, releasable)}</NumberStyles>
        </RewardInfo>
        <GainButton onClick={releaseClick}>{t('Reward_claim')}</GainButton>
      </RewardStyles> */}
      {/* 地址公示 */}
      <AddressStyles>
        <AddressTitle active={i18n.language === 'en'}>{t('Address_announcement')}</AddressTitle>
        <DividerHr />
        <AddressUrl> {i18n.language === 'en' ? 'Click on the address for details' : '点击地址可查看详情'}</AddressUrl>.
        <PublicTextStyles>
          <PublicText>
            <Label>
              <span className="icon"></span>
              <p>{t('Address_burning')}:</p>
            </Label>
            <Address href="https://bscscan.com/address/0x92cE18117DA27c5B7A409F08800D0Ad2cB961138">
              0x92cE18117DA27c5B7A409F08800D0Ad2cB961138
            </Address>
          </PublicText>
          <PublicText>
            <Label>
              <span className="icon"></span>
              <p>{t('Address_fund')}:</p>
            </Label>
            <Address href="https://bscscan.com/address/0x68fe7967b84f2e3aD15620cB03bA51E36a547Df7">
              0x68fe7967b84f2e3aD15620cB03bA51E36a547Df7
            </Address>
          </PublicText>
          <PublicText>
            <Label>
              <span className="icon"></span>
              <p>{t('Address_contract')}:</p>
            </Label>
            <Address href="https://bscscan.com/address/0x76000F17fD34a1cB1Ccd78DF89F89fE1319CAca0">
              0x76000F17fD34a1cB1Ccd78DF89F89fE1319CAca0
            </Address>
          </PublicText>
          <PublicText>
            <Label>
              <span className="icon"></span>
              <p>{t('Address_supporting')}:</p>
            </Label>
            <Address href="https://bscscan.com/address/0x2f67250fC4eF41689E98931e4D2927E7665a0329">
              0x2f67250fC4eF41689E98931e4D2927E7665a0329
            </Address>
          </PublicText>
          <PublicText>
            <Label>
              <span className="icon"></span>
              <p>{t('Address_gas')}:</p>
            </Label>
            <Address href="https://bscscan.com/address/0x5772e1Cdb6D6240c581792303189851e612c21f1">
              0x5772e1Cdb6D6240c581792303189851e612c21f1
            </Address>
          </PublicText>
          <GainButton onClick={() => setIsOpen(true)}>{t('view')}</GainButton>
        </PublicTextStyles>
      </AddressStyles>
      {/* 兑换 */}
      <Exchange>
        <ExchangeTitle>{t('exchange_title')}</ExchangeTitle>
        <ExchangeWenhao>{newCard && <NewCard src={getPokerName(newCard[0].value, newCard[0].huase)} />}</ExchangeWenhao>
        <ExchangeChoose>
          {t('choose')}：<ChooseCount>{choose > 3 ? 3 : choose}</ChooseCount>
        </ExchangeChoose>
        <ExchangeBtn onClick={exchange}> {t('exchange')}</ExchangeBtn>
        <Tags>
          {tab.map((item) => {
            return (
              <TagsItem
                className={item.value === tabCurrent ? 'active' : ''}
                key={item.value}
                onClick={() => {
                  setTabCurrent(item.value)
                  let a = allCard?.filter((item1) => {
                    const result = ((item1.tokenId % 1000) - (item1.tokenId % 10)) / 10
                    return result === item.value
                  })
                  setCardList(a)
                }}
              >
                {t('card')}
                {item.value}
              </TagsItem>
            )
          })}
        </Tags>
        {cardList?.length ? (
          <CardContet>
            {cardList.map((item, i) => {
              return (
                <CardItem
                  className={item.isChoose ? 'active' : ''}
                  key={item.tokenId}
                  onClick={() => {
                    chooseCard(i)
                  }}
                >
                  <CardImg src={getPokerName(item.value, item.huase)} />
                </CardItem>
              )
            })}
          </CardContet>
        ) : (
          <CardContet>
            <NoData>{t('nodata')}</NoData>
          </CardContet>
        )}
      </Exchange>
      {/* PK总销毁 */}
      <QueryDestruction>
        <TitleColor>
          <span></span>
          <p>{t('destruction_title_3')}</p>
        </TitleColor>
        <QueryCenter>
          <Total>{totalCount} PK</Total>
          <TotalNumberBg />
          <DestructionEcharts seriesData={kindTotalCount} size={false} />
          <ChooseTimeStyles>
            <ChooseTimeButton active={chooseBtnId === 6} onClick={() => setChooseBtnId(6)}>
              6h
            </ChooseTimeButton>
            <ChooseTimeButton active={chooseBtnId === 12} onClick={() => setChooseBtnId(12)}>
              12h
            </ChooseTimeButton>
            <ChooseTimeButton active={chooseBtnId === 24} onClick={() => setChooseBtnId(24)}>
              24h
            </ChooseTimeButton>
            <ChooseTimeButton active={chooseBtnId === 168} onClick={() => setChooseBtnId(168)}>
              7d
            </ChooseTimeButton>
            <ChooseTimeButton active={chooseBtnId === 720} onClick={() => setChooseBtnId(720)}>
              30d
            </ChooseTimeButton>
            <ChooseTimeButton active={chooseBtnId === 99} onClick={() => setChooseBtnId(99)}>
              all
            </ChooseTimeButton>
          </ChooseTimeStyles>
          <EducationStyles>
            <h3>{t('destruction_title_4')}</h3>
            <EducationNumber>
              <LiftState type={isRise} />
              <span>{rate} PK/min</span>
            </EducationNumber>
          </EducationStyles>
        </QueryCenter>
      </QueryDestruction>
      {/* PK销毁区块高度 */}
      <QueryDestruction>
        <QueryTitleStyles>
          <TitleColor>
            <span></span>
            <p>{t('destruction_title_3')}</p>
          </TitleColor>
          <TitleColor>
            <p>{t('destruction_title_5')}</p>
          </TitleColor>
        </QueryTitleStyles>
        <ScrollText>
          {blockList.length > 0 &&
            blockList.map((item, index) => {
              return (
                <BlockList key={index}>
                  <p>block#{item.block}</p>
                  <p>{item.value} PK</p>
                </BlockList>
              )
            })}
        </ScrollText>
      </QueryDestruction>
      <QueryDestruction>
        <TitleColor>
          <span></span>
          <p>{t('destruction_title_2')}</p>
        </TitleColor>
        <ChooseTimeStyles>
          <ChooseTimeButton active={rankingBtnId === 6} onClick={() => setRankingBtnId(6)}>
            6h
          </ChooseTimeButton>
          <ChooseTimeButton active={rankingBtnId === 12} onClick={() => setRankingBtnId(12)}>
            12h
          </ChooseTimeButton>
          <ChooseTimeButton active={rankingBtnId === 24} onClick={() => setRankingBtnId(24)}>
            24h
          </ChooseTimeButton>
          <ChooseTimeButton active={rankingBtnId === 168} onClick={() => setRankingBtnId(168)}>
            7d
          </ChooseTimeButton>
          <ChooseTimeButton active={rankingBtnId === 720} onClick={() => setRankingBtnId(720)}>
            30d
          </ChooseTimeButton>
          <ChooseTimeButton active={rankingBtnId === 99} onClick={() => setRankingBtnId(99)}>
            all
          </ChooseTimeButton>
        </ChooseTimeStyles>
        <RankingData>
          {rankList.length > 0 &&
            rankList.map((item, index) => {
              return (
                <RankingList key={index}>
                  <LiftState type={item.isRise} />
                  <RankingText active={rankingTextId === item.kind} onClick={() => rankingTextClick(item.kind)}>
                    <RankingNumber>{index + 1}</RankingNumber>
                    <p>{getKindName(item.kind)}</p>
                  </RankingText>
                </RankingList>
              )
            })}
        </RankingData>
      </QueryDestruction>
      {/* PK销毁 */}
      <RewardStyles style={{ paddingTop: '100px', marginTop: '30px' }}>
        <DestructionFlex>
          <DestructionTitle>{getKindName(rankingTextId)}</DestructionTitle>
          <DestructionCenter>
            <DestructionList>
              <p>{t('destruction_6')}</p>
              <p>{destructionData?.blockNumber ? destructionData.blockNumber : '0'}</p>
            </DestructionList>
            <DestructionList>
              <p>{t('destruction_7')}</p>
              <p>
                <Address href={`https://bscscan.com/address/${destructionData?.contractAddress}`}>
                  {destructionData?.contractAddress ? parseAccount(destructionData.contractAddress) : '0x..00'}
                </Address>
              </p>
            </DestructionList>
            <DestructionList>
              <p>{t('destruction_8')}</p>
              <p>{destructionData?.value ? destructionData.value : '0'}</p>
            </DestructionList>
            <DestructionList>
              <p>{t('destruction_9')}</p>
              <p>{destructionData?.kindTotalCount ? destructionData.kindTotalCount : '0'}</p>
            </DestructionList>
            <DestructionList>
              <p>{t('destruction_10')}</p>
              <p>
                <Address href={`https://bscscan.com/tx/${destructionData?.hash}`}>
                  {destructionData?.hash ? parseAccount(destructionData.hash) : '0x..00'}
                </Address>
              </p>
            </DestructionList>
          </DestructionCenter>
        </DestructionFlex>
      </RewardStyles>
      {/* PKS兑换 */}
      <PKSRedemption>
        <PKSRedemptionTitle>{t('governance_title1')}</PKSRedemptionTitle>
        <PKSTotal>
          <span>{t('governance_total_title')}</span>
          {totalPKSShares}
        </PKSTotal>
        <PKSContent>
          {lists.map((item, i) => (
            <ListInfo key={i}>
              <TitleIcon src={item.icon}></TitleIcon>
              <Title>{t(`governance_list_title${i}`)}</Title>
              {item.stage && (
                <Stage>
                  {t('governance_the')} {item.stage} {t('governance_the_stage')}
                </Stage>
              )}
              <InfoNumber>{item.number}</InfoNumber>
            </ListInfo>
          ))}
        </PKSContent>
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
          <ButtonDefault onClick={releaseClickPKS}>{t('governance_exchange_submit')}</ButtonDefault>
        </ReceiveBtn>
      </PKSRedemption>
      {/* 转入Pk */}
      <TransferPK>
        <TransferPKTitle>{t('governance_title2')}</TransferPKTitle>
        <RansferPKInput value={PkNumber} onChange={({ target }: any) => setPkNumber(target.value)}></RansferPKInput>
        <RansferPKInputIcon>PK</RansferPKInputIcon>
        <ButtonDefault onClick={destroyPKClick}>{t('governance_transfer_submit')}</ButtonDefault>
        <RansferPKSpan>{t('governance_transfer_tips')}</RansferPKSpan>
        <RansferPKNumber>{LPNumber}</RansferPKNumber>
      </TransferPK>
      {/* 当前共有提案 */}
      <Proposal>
        <ProposalTitle>
          {t('voting_total_tips')}
          {listTotal}
          {isUserDelegate && <CommissionBtn onClick={votingCommissionClick}>{t('voting_commission')}</CommissionBtn>}
        </ProposalTitle>
        <ProposalList>
          {wholeList.length > 0 &&
            wholeList.map((item, i) => {
              return (
                <ProposalListInfo
                  key={i}
                  active={proposalActive === i}
                  onClick={() => {
                    setProposalActive(i)
                  }}
                >
                  <ProposalListInfoTitle active={proposalActive === i}>{item.description}</ProposalListInfoTitle>
                  {item.status === 1 && (
                    <Vote
                      onClick={() => {
                        setProposalContent(item)
                        getDetailsNumberStatus(item.proposalId)
                      }}
                    >
                      {t('voting_status_0')}
                    </Vote>
                  )}
                  {item.status === 4 && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <VoteNo
                        onClick={() => {
                          onVoteSuccessClick(item)
                        }}
                      >
                        {useVotingListStatus[item.status]}
                      </VoteNo>
                      <CommissionBtn
                        onClick={() => {
                          setProposalContent(item)
                          getDetails(item.proposalId)
                        }}
                        style={{ marginLeft: '10px' }}
                      >
                        {t('voting_detailss')}
                      </CommissionBtn>
                    </div>
                  )}
                  {item.status !== 1 && item.status !== 4 && item.status !== 5 && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <VoteNo className={item.status === 3 ? 'nopass' : ''}>{useVotingListStatus[item.status]}</VoteNo>
                      <CommissionBtn
                        onClick={() => {
                          setProposalContent(item)
                          getDetails(item.proposalId)
                        }}
                        style={{ marginLeft: '10px' }}
                      >
                        {t('voting_detailss')}
                      </CommissionBtn>
                    </div>
                  )}
                  {item.status === 5 && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {item.status === 5 && moment() >= moment(item.queueTime) ? (
                        <VoteSuccess
                          onClick={() => {
                            toExecuteChange(item)
                          }}
                        >
                          待执行
                        </VoteSuccess>
                      ) : (
                        <VoteNo>{useVotingListStatus[item.status]}</VoteNo>
                      )}
                      <CommissionBtn
                        onClick={() => {
                          setProposalContent(item)
                          getDetails(item.proposalId)
                        }}
                        style={{ marginLeft: '10px' }}
                      >
                        {t('voting_detailss')}
                      </CommissionBtn>
                    </div>
                  )}
                  <InfoStartTime active={proposalActive === i}>{item.startTime}</InfoStartTime>
                </ProposalListInfo>
              )
            })}
          {wholeList.length === 0 && <NoList>{t('voting_no_list')}</NoList>}
        </ProposalList>
        <ButtonDefault onClick={votingReleaseClick}>{t('voting_release_title')}</ButtonDefault>
        {proposalStatus === 'details' && (
          <ProposalMaskContent
            data={proposalContent}
            setProposalStatus={() => {
              setProposalStatus('list')
            }}
          />
        )}
        {proposalStatus === 'release' && (
          <ProposalMaskRelease
            setProposalStatus={() => {
              setProposalStatus('list')
            }}
            setIsTrueVotingHooks={(s) => setIsTrueVotingHooks(s)}
          />
        )}
      </Proposal>
      {/* 燃烧池 */}
      <H5Combustion></H5Combustion>
      {/* 帮助中心 */}
      <HelpStyles>
        <VideoStyles>
          {selectKeyShow && (
            <PlayerSelectMask>
              <div
                className={selectKey === 1 ? 'p-active player-options' : 'player-options'}
                onClick={() => {
                  setSelectKey(1)
                  setSelectKeyShow(false)
                }}
              >
                {t('Help_1')}
              </div>
              <div
                className={selectKey === 2 ? 'p-active player-options' : 'player-options'}
                onClick={() => {
                  setSelectKey(2)
                  setSelectKeyShow(false)
                }}
              >
                {t('Help_2')}
              </div>
              <div
                className={selectKey === 3 ? 'p-active player-options' : 'player-options'}
                onClick={() => {
                  setSelectKey(3)
                  setSelectKeyShow(false)
                }}
              >
                {t('Help_3')}
              </div>
              <div
                className={selectKey === 4 ? 'p-active player-options' : 'player-options'}
                onClick={() => {
                  setSelectKey(4)
                  setSelectKeyShow(false)
                }}
              >
                {t('Help_4')}
              </div>
            </PlayerSelectMask>
          )}
          <PlayerSelect
            onClick={() => {
              setSelectKeyShow(true)
            }}
          >
            <div style={{ width: '640px', height: '1px', background: '#1CE5E5' }}></div>
            <div
              style={{
                width: '1px',
                height: '60px',
                background: '#1CE5E5',
                position: 'absolute',
                right: '0',
                top: '40px',
              }}
            ></div>
            <PlayerTriangleRight />
            <span>{t(`Help_${selectKey}`)}</span>
          </PlayerSelect>
          {(() => {
            if (selectKey === 2) {
              return <PlayerVoteMini2 />
            }
            if (selectKey === 3) {
              return <PlayerVoteMini3 />
            }
            if (selectKey === 4) {
              return <PlayerVoteMini4 />
            }
            return <PlayerVoteMini1 />
          })()}
        </VideoStyles>

        {/* 公示中心 */}
        <AnnouncementCenterStyles active={i18n.language === 'en'}>
          <h3>{t('Announcement')}</h3>
        </AnnouncementCenterStyles>
        <HelpText>
          <AddressTitle active={i18n.language === 'en'}>{title}</AddressTitle>
          <DividerHr />
          <HelpTextInfo>
            {list.length > 0 &&
              list.map((item, index) => {
                return <p key={index}>{item}</p>
              })}
          </HelpTextInfo>
        </HelpText>
        {/* 合作伙伴 */}
        <HelpPartnerStyles>
          <AddressTitle active={i18n.language === 'en'} style={{ marginTop: '110px' }}>
            {t('Partner')}
          </AddressTitle>
          <DividerHr style={{ marginBottom: '88px' }} />
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
        </HelpPartnerStyles>
      </HelpStyles>
      {/* 页尾留言 */}
      <ContactStyles>
        <ContactLogo />
        <MessageInput type="text" placeholder={t('Contact_message')} />
        <ButtonStyles>
          <ButtonDefault>{t('Contact_submit')}</ButtonDefault>
        </ButtonStyles>
        <ShareStyles>
          <img src={icon_1} alt="" onClick={() => UrlClick('https://0.plus/PokerFi')} />
          <img src={icon_2} alt="" onClick={() => UrlClick('https://0.plus/PokerFi')} />
        </ShareStyles>
      </ContactStyles>
      {isOpen && (
        <ModalMain>
          <ShadowWapper />
          <ModelStyles>
            <ModelTitle>{t('important')}</ModelTitle>
            <Modelback onClick={() => setIsOpen(false)}>{t('back')}</Modelback>
            {i18n.language === 'en' ? (
              <ContentText>
                <div className="outer-container">
                  <div className="inner-container">
                    <div className="content">
                      <p>
                        PokerFi players, with the official launch of PokerFi and the first batch of cards on sale, the
                        entire planet's economic system has officially opened for operation, now the core consensus
                        contract address involving the operation of the economic system will be publicized, so that you
                        can easily understand the operation of the entire economic system and monitor the rationality of
                        each expenditure, the specific contract address is as follows:
                      </p>
                      <ModelAddress href="https://bscscan.com/address/0x89Aba1453f58aB08056DA973163A67EFed95A432">
                        PK：0x89Aba1453f58aB08056DA973163A67EFed95A432
                      </ModelAddress>{' '}
                      <br />
                      <ModelAddress href="https://bscscan.com/address/0xF61b203B7FF3be1D6a53f902d5CbC3e508Fa728F">
                        PK_1：0xF61b203B7FF3be1D6a53f902d5CbC3e508Fa728F
                      </ModelAddress>
                      <br />
                      <br />
                      <p>
                        Poker (NFT Asset Contract)：
                        <ModelAddress href="https://bscscan.com/address/0x3DDECfa3E7D4Ff87DD6533095F47F01E71Cc14fe">
                          0x3DDECfa3E7D4Ff87DD6533095F47F01E71Cc14fe
                        </ModelAddress>
                      </p>
                      <p>
                        CardMarket (card trading contract)：
                        <ModelAddress href="https://bscscan.com/address/0x1DBE23A144b74A2C157Dd9d74d66c39102bBa4A4">
                          0x1DBE23A144b74A2C157Dd9d74d66c39102bBa4A4
                        </ModelAddress>
                      </p>
                      <p>
                        SlotStore (Card Slot Sales Contract)：
                        <ModelAddress href="https://bscscan.com/address/0x6200266D5e9fd8226D496036c475BB350a3232c4">
                          0x6200266D5e9fd8226D496036c475BB350a3232c4
                        </ModelAddress>
                      </p>
                      <p>
                        CardStore (card sales contract)：
                        <ModelAddress href="https://bscscan.com/address/0x471AfCB0923796D33922785915E09469970D1D10">
                          0x471AfCB0923796D33922785915E09469970D1D10
                        </ModelAddress>
                      </p>
                      <p>
                        MiningPool (mining pool contract)：
                        <ModelAddress href="https://bscscan.com/address/0x9c93e6100183235999A3085Af48C8b2945A4e9A2">
                          0x9c93e6100183235999A3085Af48C8b2945A4e9A2
                        </ModelAddress>
                      </p>
                      <p>
                        JokerActivate (Special NFT Asset Contract)：
                        <ModelAddress href="https://bscscan.com/address/0x9c93e6100183235999A3085Af48C8b2945A4e9A2">
                          0x9c93e6100183235999A3085Af48C8b2945A4e9A2
                        </ModelAddress>
                      </p>
                      <br />
                      <p>【Card slot sales receiving contract】</p>
                      <p>
                        <ModelAddress href="https://bscscan.com/address/0x587fcAbB403f617c965637870db5514d40856e4c">
                          0x587fcAbB403f617c965637870db5514d40856e4c
                        </ModelAddress>
                        （smart contract）
                      </p>
                      <p>
                        <ModelAddress href="https://bscscan.com/address/0x4a2AeD8b592ef42a5bc30278310842f5D2334C68">
                          0x4a2AeD8b592ef42a5bc30278310842f5D2334C68
                        </ModelAddress>
                        （address for receiving card slot sales）
                      </p>
                      <p>
                        50% to{' '}
                        <ModelAddress href="https://bscscan.com/address/0x68fe7967b84f2e3aD15620cB03bA51E36a547Df7">
                          0x68fe7967b84f2e3aD15620cB03bA51E36a547Df7
                        </ModelAddress>
                        （Community Ecology Building Fund）
                      </p>
                      <p>
                        50% to be used for destruction, left at{' '}
                        <ModelAddress href="https://bscscan.com/address/0x587fcAbB403f617c965637870db5514d40856e4c ">
                          0x587fcAbB403f617c965637870db5514d40856e4c{' '}
                        </ModelAddress>
                        （event initiated by signature, and can only be used for destruction, contract automatically
                        executed）
                      </p>
                      <br />
                      <p>【Card Sales Receiving Contract】</p>
                      <p>
                        <ModelAddress href="https://bscscan.com/address/0x587fcAbB403f617c965637870db5514d40856e4c">
                          0x76000F17fD34a1cB1Ccd78DF89F89fE1319CAca0
                        </ModelAddress>
                      </p>
                      <p>
                        <ModelAddress href="https://bscscan.com/address/0x2f67250fC4eF41689E98931e4D2927E7665a0329">
                          0x2f67250fC4eF41689E98931e4D2927E7665a0329
                        </ModelAddress>
                      </p>
                      <p>
                        70% to
                        <ModelAddress href="https://bscscan.com/address/0x92cE18117DA27c5B7A409F08800D0Ad2cB961138 ">
                          0x92cE18117DA27c5B7A409F08800D0Ad2cB961138{' '}
                        </ModelAddress>
                        （specifically for secondary market PK token buyback destruction）
                      </p>
                      <p>
                        30% for adding liquidity support retained at{' '}
                        <ModelAddress href="https://bscscan.com/address/0x76000F17fD34a1cB1Ccd78DF89F89fE1319CAca0 ">
                          0x76000F17fD34a1cB1Ccd78DF89F89fE1319CAca0{' '}
                        </ModelAddress>
                        （initiated by the signature event and can only be used to add liquidity, the contract is
                        automatically executed）
                      </p>
                      <br />
                      <p>【NFT card transaction fee receiving contract】</p>
                      <p>
                        <ModelAddress href="https://bscscan.com/address/0xA883795C2fa5D62d8517702fdc45fAAe811DE8de">
                          0xA883795C2fa5D62d8517702fdc45fAAe811DE8de
                        </ModelAddress>
                      </p>
                      <br />
                      <p>【Gas fee allocation contract address】</p>
                      <p>
                        <ModelAddress href="https://bscscan.com/address/0xA883795C2fa5D62d8517702fdc45fAAe811DE8de">
                          0x5772e1Cdb6D6240c581792303189851e612c21f1
                        </ModelAddress>
                        (events are initiated by signatures and can only be assigned to specified addresses according to
                        the contract logic)
                      </p>
                      <p>
                        30% to{' '}
                        <ModelAddress href="https://bscscan.com/address/0xdEA2284928a4B56C4c1C55B8e772cd0523BC923E">
                          0xdEA2284928a4B56C4c1C55B8e772cd0523BC923E
                        </ModelAddress>
                        (event initiated by signature, dedicated to secondary market PK token redeem&burning)
                      </p>
                      <p>
                        20% to{' '}
                        <ModelAddress href="https://bscscan.com/address/0xbe5803497c13B932399244bCD09c425f7AB2Dfc5">
                          0xbe5803497c13B932399244bCD09c425f7AB2Dfc5
                        </ModelAddress>
                        (Founding team)
                      </p>
                      <p>
                        20% to{' '}
                        <ModelAddress href="https://bscscan.com/address/0x68fe7967b84f2e3aD15620cB03bA51E36a547Df7">
                          0x68fe7967b84f2e3aD15620cB03bA51E36a547Df7
                        </ModelAddress>
                        (Community Ecology Building Fund)
                      </p>
                      <p>
                        10% to{' '}
                        <ModelAddress href="https://bscscan.com/address/0x1A276a0bd3E39dd6C005b9AD95216335199238aC">
                          0x1A276a0bd3E39dd6C005b9AD95216335199238aC
                        </ModelAddress>
                        (allocation address for collecting a set of NFT playing cards)
                      </p>
                      <p>20% allocated by the mine owner, the contract is automatically executed</p>
                      <br />
                    </div>
                  </div>
                </div>
              </ContentText>
            ) : (
              <ContentText>
                <div className="outer-container">
                  <div className="inner-container">
                    <div className="content">
                      <p>
                        PokerFi世界的各位玩家，随着PokerFi的正式上线及首批卡牌发售，整个星球的经济系统已经正式开启运转，现将涉及经济体系运转的核心共识合约地址进行公示，方便大家了解整个经济系统的运行状况以及监督每一笔开支的合理性，具体合约地址如下：
                      </p>
                      <ModelAddress href="https://bscscan.com/address/0x89Aba1453f58aB08056DA973163A67EFed95A432">
                        PK：0x89Aba1453f58aB08056DA973163A67EFed95A432
                      </ModelAddress>{' '}
                      <br />
                      <ModelAddress href="https://bscscan.com/address/0xF61b203B7FF3be1D6a53f902d5CbC3e508Fa728F">
                        PK_1：0xF61b203B7FF3be1D6a53f902d5CbC3e508Fa728F
                      </ModelAddress>
                      <br />
                      <br />
                      <p>
                        Poker (NFT 资产合约)：
                        <ModelAddress href="https://bscscan.com/address/0x3DDECfa3E7D4Ff87DD6533095F47F01E71Cc14fe">
                          0x3DDECfa3E7D4Ff87DD6533095F47F01E71Cc14fe
                        </ModelAddress>
                      </p>
                      <p>
                        CardMarket (卡牌交易合约)：
                        <ModelAddress href="https://bscscan.com/address/0x1DBE23A144b74A2C157Dd9d74d66c39102bBa4A4">
                          0x1DBE23A144b74A2C157Dd9d74d66c39102bBa4A4
                        </ModelAddress>
                      </p>
                      <p>
                        SlotStore (卡槽销售合约)：
                        <ModelAddress href="https://bscscan.com/address/0x6200266D5e9fd8226D496036c475BB350a3232c4">
                          0x6200266D5e9fd8226D496036c475BB350a3232c4
                        </ModelAddress>
                      </p>
                      <p>
                        CardStore (卡牌销售合约)：
                        <ModelAddress href="https://bscscan.com/address/0x471AfCB0923796D33922785915E09469970D1D10">
                          0x471AfCB0923796D33922785915E09469970D1D10
                        </ModelAddress>
                      </p>
                      <p>
                        MiningPool (矿池合约)：
                        <ModelAddress href="https://bscscan.com/address/0x9c93e6100183235999A3085Af48C8b2945A4e9A2">
                          0x9c93e6100183235999A3085Af48C8b2945A4e9A2
                        </ModelAddress>
                      </p>
                      <p>
                        JokerActivate (特殊 NFT 资产合约)：
                        <ModelAddress href="https://bscscan.com/address/0x9c93e6100183235999A3085Af48C8b2945A4e9A2">
                          0x9c93e6100183235999A3085Af48C8b2945A4e9A2
                        </ModelAddress>
                      </p>
                      <br />
                      <p>【卡槽销售接收合约】</p>
                      <p>
                        <ModelAddress href="https://bscscan.com/address/0x587fcAbB403f617c965637870db5514d40856e4c">
                          0x587fcAbB403f617c965637870db5514d40856e4c
                        </ModelAddress>
                        （智能合约）
                      </p>
                      <p>
                        <ModelAddress href="https://bscscan.com/address/0x4a2AeD8b592ef42a5bc30278310842f5D2334C68">
                          0x4a2AeD8b592ef42a5bc30278310842f5D2334C68
                        </ModelAddress>
                        （接收卡槽销售的地址）
                      </p>
                      <p>
                        50% 到
                        <ModelAddress href="https://bscscan.com/address/0x68fe7967b84f2e3aD15620cB03bA51E36a547Df7">
                          0x68fe7967b84f2e3aD15620cB03bA51E36a547Df7
                        </ModelAddress>
                        （社区生态建设基金）
                      </p>
                      <p>
                        50% 用于销毁，留存于
                        <ModelAddress href="https://bscscan.com/address/0x587fcAbB403f617c965637870db5514d40856e4c ">
                          0x587fcAbB403f617c965637870db5514d40856e4c{' '}
                        </ModelAddress>
                        （由签名发起事件，且只能用于销毁，合约自动执行）
                      </p>
                      <br />
                      <p>【卡牌销售接收合约】</p>
                      <p>
                        <ModelAddress href="https://bscscan.com/address/0x587fcAbB403f617c965637870db5514d40856e4c">
                          0x76000F17fD34a1cB1Ccd78DF89F89fE1319CAca0
                        </ModelAddress>
                      </p>
                      <p>
                        <ModelAddress href="https://bscscan.com/address/0x2f67250fC4eF41689E98931e4D2927E7665a0329">
                          0x2f67250fC4eF41689E98931e4D2927E7665a0329
                        </ModelAddress>
                      </p>
                      <p>
                        70% 到
                        <ModelAddress href="https://bscscan.com/address/0x92cE18117DA27c5B7A409F08800D0Ad2cB961138 ">
                          0x92cE18117DA27c5B7A409F08800D0Ad2cB961138{' '}
                        </ModelAddress>
                        （由签名发起事件，且只能用于二级市场PK币回购销毁）
                      </p>
                      <p>
                        30%用于添加流动性支持的留存在
                        <ModelAddress href="https://bscscan.com/address/0x76000F17fD34a1cB1Ccd78DF89F89fE1319CAca0 ">
                          0x76000F17fD34a1cB1Ccd78DF89F89fE1319CAca0{' '}
                        </ModelAddress>
                        （由签名发起事件，且只能用于增加流动性，合约自动执行）
                      </p>
                      <br />
                      <p>【NFT卡牌交易手续费接收合约】</p>
                      <p>
                        <ModelAddress href="https://bscscan.com/address/0xA883795C2fa5D62d8517702fdc45fAAe811DE8de">
                          0xA883795C2fa5D62d8517702fdc45fAAe811DE8de
                        </ModelAddress>
                      </p>
                      <br />
                      <p>【能量费分配逻辑合约地址】</p>
                      <p>
                        <ModelAddress href="https://bscscan.com/address/0xA883795C2fa5D62d8517702fdc45fAAe811DE8de">
                          0x5772e1Cdb6D6240c581792303189851e612c21f1
                        </ModelAddress>
                        (由签名发起事件，且只能按照合约逻辑向指定地址分配)
                      </p>
                      <p>
                        30% 到{' '}
                        <ModelAddress href="https://bscscan.com/address/0xdEA2284928a4B56C4c1C55B8e772cd0523BC923E">
                          0xdEA2284928a4B56C4c1C55B8e772cd0523BC923E
                        </ModelAddress>
                        (由签名发起事件，专项用于二级市场PK币回购销毁)
                      </p>
                      <p>
                        20% 到{' '}
                        <ModelAddress href="https://bscscan.com/address/0xbe5803497c13B932399244bCD09c425f7AB2Dfc5">
                          0xbe5803497c13B932399244bCD09c425f7AB2Dfc5
                        </ModelAddress>
                        (创世团队)
                      </p>
                      <p>
                        20% 到
                        <ModelAddress href="https://bscscan.com/address/0x68fe7967b84f2e3aD15620cB03bA51E36a547Df7">
                          0x68fe7967b84f2e3aD15620cB03bA51E36a547Df7
                        </ModelAddress>
                        (社区生态建设基金)
                      </p>
                      <p>
                        10% 到
                        <ModelAddress href="https://bscscan.com/address/0x1A276a0bd3E39dd6C005b9AD95216335199238aC">
                          0x1A276a0bd3E39dd6C005b9AD95216335199238aC
                        </ModelAddress>
                        (集齐一套NFT扑克牌的分配地址)
                      </p>
                      <p>20% 矿场所有人分配，合约自动执行</p>
                      <br />
                    </div>
                  </div>
                </div>
              </ContentText>
            )}
          </ModelStyles>
        </ModalMain>
      )}
      <Modal
        visible={transferIsMode}
        footer={null}
        title="票权转移"
        onCancel={() => {
          setTransferIsMode(false)
        }}
      >
        <Form onFinish={votingCommissionClickGo}>
          <Form.Item
            label="转入地址"
            name="address"
            rules={[
              { required: true, message: '转入地址不能为空' },
              {
                min: 42,
                max: 42,
                message: '用户地址不正确，长度不够',
              },
            ]}
          >
            <Input maxLength={42}></Input>
          </Form.Item>
          <div style={{ textAlign: 'end' }}>
            <Button
              type="primary"
              onClick={() => {
                setTransferIsMode(false)
              }}
              danger
              style={{ marginRight: '20px' }}
            >
              关闭
            </Button>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </div>
        </Form>
      </Modal>
    </H5Wapper>
  )
}
