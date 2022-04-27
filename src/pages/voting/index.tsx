import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ButtonDefault } from '../../components/Button'
import TECHNOLOGYPAGE_BACKGROUND from '../../assets/images/technologyPage_background.png'
import VOTING_LIST_ACTIVE from '../../assets/images/voting_list_active.png'
import VOTING_LIST_DEFAULT from '../../assets/images/voting_list_default.png'
import GOVERNANCE_TITLE_BACKGROUND from '../../assets/images/governance_title_background.png'
import VOTING_SUCCESS from '../../assets/images/voting_success.png'
import VOTING_LEFT from '../../assets/images/voting_left.png'
import VOTING_LEFT_ACTIVE from '../../assets/images/voting_left_active.png'
import VOTING_RIGHT from '../../assets/images/voting_right.png'
import VOTING_RIGHT_ACTIVE from '../../assets/images/voting_right_active.png'
import BUTTON_BG from '../../assets/images/button_bg.png'
import VOTING_BTN_2 from '../../assets/images/voting_btn_2.png'
// import VOTING_BTN_1 from '../../assets/images/voting_btn_1.png'
import VOTING_ICON_1 from '../../assets/images/voting_icon_1.png'
import VOTING_ICON_2 from '../../assets/images/voting_icon_2.png'
import VOTING_ICON_3 from '../../assets/images/voting_icon_3.png'
import VOTING_ICON_4 from '../../assets/images/voting_icon_4.png'
import VOTING_BTN_3 from '../../assets/images/voting_btn_3.png'
import VOTING_BTS_INPUT from '../../assets/images/voting_bts_input.png'
import VOTING_BTS_TEXTAREA from '../../assets/images/voting_bts_textarea.png'
import VOTING_BACKGROUND from '../../assets/images/voting_background.png'
import AppBottom from '../../components/AppBottom'
import { isJSON } from '../../utils'
import web3 from '../../contracts/initWeb3'
import { ContractPokerFiGovernor, ContractPokerFiSharesPKS } from '../../contracts'
import { useSelector, useDispatch } from 'react-redux'
import { useVotingHooks, useVotingListStatus, ListType, useVotingProposals } from '../../hooks/useVotingHooks'
import { useWallet } from 'use-wallet'
import { SaveAddress } from '../../store/user/action'
import { message, Modal, Input, Form, Button } from 'antd'
import { toolFromWei } from '../../utils/tool'
import { ethers } from 'ethers'
import moment from 'moment'
import axios from 'axios'

declare const window: any

const VotingWapperOne = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 130px);
  .detailsVoting {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #eaeaea;
    display: flex;
    p {
      width: 200px;
    }
  }
`

const BaseColorBg = styled.div`
  width: 100vw;
  height: 112.4px;
  background: url(${VOTING_BACKGROUND}) no-repeat;
  background-size: 100% 100%;
  position: fixed;
  bottom: 0;
  z-index: 1;
  zoom: ${window.screen.width / 1920};
`

const NoList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.85);
`

const VotingWapper = styled.div`
  width: 1277px;
  min-height: 693.9px;
  background: url(${TECHNOLOGYPAGE_BACKGROUND}) no-repeat;
  background-size: 100% 100%;
  position: relative;
  box-sizing: border-box;
  padding: 67px 135px;
  margin-top: 20px;
  margin-left: calc(50% - 638px);
  zoom: ${window.screen.width / 1920};
  z-index: 11;
  .details_left {
    position: absolute;
    top: 53px;
    left: 68px;
    transform: rotate(180deg);
  }
`

const AbiBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`

const VotingProposal = styled.div`
  position: absolute;
  top: 31.5px;
  right: 31.5px;
`
const VotingTitle = styled.div`
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #238da3;
  line-height: 18px;
  display: flex;
  align-items: center;
`

const VotingList = styled.div`
  padding-top: 21.6px;
`

const VotingListInfo = styled.div<{ active: boolean }>`
  width: 936px;
  height: 84.6px;
  margin-bottom: 16.2px;
  background: ${({ active }) =>
    active ? `url(${VOTING_LIST_ACTIVE}) no-repeat` : `url(${VOTING_LIST_DEFAULT}) no-repeat`};
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`

const InfoTitle = styled.div`
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
  width: calc(80% - 35px);
  margin-left: 35px;
  margin-top: -10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const InfoStatus = styled.div`
  width: 180px;
  margin-left: 30px;
  height: 40px;
  margin-top: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const InfoStartTime = styled.div`
  position: absolute;
  bottom: 6px;
  right: 12px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 500;
  color: #def5f5;
  line-height: 20px;
`

const Vote = styled.div`
  width: 86px;
  height: 36px;
  background: url(${GOVERNANCE_TITLE_BACKGROUND}) no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 600;
  color: #0ee7fc;
`

const VoteSuccess = styled.div`
  width: 48px;
  height: 48px;
  background: url(${VOTING_SUCCESS}) no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #0ee7fc;
  margin-top: -10px;
`
const VoteNo = styled.div`
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #0ee7fc;
  display: flex;
  justify-content: center;
  align-items: center;
`

const VotingBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 999;
`

const VotingBtnLeft = styled.div<{ active: boolean }>`
  width: 59px;
  height: 31px;
  background: ${({ active }) => (!active ? `url(${VOTING_LEFT})  no-repeat` : `url(${VOTING_LEFT_ACTIVE}) no-repeat`)};
  background-size: 100% 100%;
  margin-right: 51px;
  cursor: pointer;
`

const VotingBtnRight = styled.div<{ active: boolean }>`
  width: 59px;
  height: 31px;
  background: ${({ active }) =>
    !active ? `url(${VOTING_RIGHT})  no-repeat` : `url(${VOTING_RIGHT_ACTIVE}) no-repeat`};
  background-size: 100% 100%;
  cursor: pointer;
`

const VotingDetailsTitle = styled.div`
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #0ee7fc;
  line-height: 20px;
  text-align: center;
  width: 90%;
  margin-left: 5%;
  margin-top: -10px;
  line-height: 24px;
`

const VotingDetailsContent = styled.div`
  height: 434px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #eaeaea;
  line-height: 30px;
  margin-top: 36px;
`

const VotingDetailsBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

// const BtnLeft = styled.div`
//   width: 329.4px;
//   height: 81px;
//   padding-left: 26px;
//   background: url(${VOTING_BTN_1}) no-repeat;
//   background-size: 100% 100%;
//   display: flex;
//   align-items: center;
//   font-size: 14px;
//   font-family: Microsoft YaHei;
//   font-weight: 500;
//   color: #a7cbcf;
//   span {
//     font-size: 32px;
//     font-family: Microsoft YaHei;
//     color: #15fcfd;
//   }
// `

const BtnRight = styled.div<{ is_collect_type: number }>`
  display: flex;
  .icon {
    min-width: 195.3px;
    padding: 0 40px;
    height: 60.3px;
    background: url(${BUTTON_BG}) no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #ffffff;
    cursor: pointer;
    position: relative;
    :nth-child(2) {
      margin-right: 25px;
      ::after {
        content: '';
        position: absolute;
        left: 34.2px;
        top: 17px;
        width: 29px;
        height: 29px;
        background: ${({ is_collect_type }) =>
          is_collect_type === 1 ? `url(${VOTING_ICON_3}) no-repeat` : `url(${VOTING_ICON_1}) no-repeat`};
        background-size: 100% 100%;
      }
    }
    :nth-child(3) {
      background: url(${VOTING_BTN_2}) no-repeat;
      background-size: 100% 100%;
      ::after {
        content: '';
        position: absolute;
        left: 34.2px;
        top: 17px;
        width: 29px;
        height: 29px;
        background: ${({ is_collect_type }) =>
          is_collect_type === 2 ? `url(${VOTING_ICON_4}) no-repeat` : `url(${VOTING_ICON_2}) no-repeat`};
        background-size: 100% 100%;
      }
    }
    :nth-child(1) {
      background: url(${VOTING_BTN_2}) no-repeat;
      background-size: 100% 100%;
      margin-right: 25px;
    }
  }
`

const VotingForm = styled.div`
  width: 90%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
`

const FormTitle = styled.div`
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #9cbbbf;
  line-height: 60.8px;
`

const FormTitleInput = styled.input`
  width: 100%;
  height: 81px;
  background: url(${VOTING_BTS_INPUT}) no-repeat;
  background-size: 100% 100%;
  padding: 0 40px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #a7cbcf;
`

const FormTitleInputDiv = styled.div`
  width: 100%;
  height: 304.4px;
  background: url(${VOTING_BTS_TEXTAREA}) no-repeat;
  background-size: 100% 100%;
  padding: 30px 40px;
`

const FormTitleInputTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  background: transparent;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #a7cbcf;
  resize: none;
`

const Selects = styled.select`
  width: 140px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
`

const SelectOption = styled.option`
  font-size: 16px;
`

const CommissionBtn = styled.div`
  background: url(${VOTING_BTN_3}) no-repeat;
  background-size: 100% 100%;
  width: 86px;
  height: 33.7px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ed9723;
  margin-right: 20px;
  cursor: pointer;
`

interface ChildType {
  list: { type: string; name: string; value: string }[]
  name: string
}

export default function Voting() {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const wallet = useWallet()
  const activate = (connector: 'injected' | 'walletconnect') => wallet.connect(connector)

  const [pageStatus, setPageStatus] = useState<'list' | 'details' | 'release'>('list')
  const [isTrueVotingHooks, setIsTrueVotingHooks] = useState(true)
  const myAddress = useSelector((state: any) => state.userInfo.address)

  const [listActive, setListActive] = useState(0)
  const [params, setParams] = useState<{ page: number }>({ page: 1 })
  const { listVoting, listTotal, isLeft, setIsLeft, isRight, setIsRight, setListVoting, proposalEta, isUserDelegate } =
    useVotingHooks({
      page: params.page,
      isTrueVotingHooks,
      myAddress,
    })

  const [proposalId, setProposalId] = useState<string>('')
  const { detailsVoting } = useVotingProposals(proposalId)

  const [detailsNumber, setDetailsNumber] = useState<number>(0)

  const [abiContent, setAbiContent] = useState<string>('')
  const [methodParametersList, setMethodParametersList] = useState<ChildType[]>([])

  // const [calldatas, setCalldatas] = useState<any>('')
  const [defaultValue, setDefaultValue] = useState('')

  const [isCollectType, setIsCollectType] = useState<number>(0)

  const [transferIsMode, setTransferIsMode] = useState(false)

  useEffect(() => {
    console.log('params.page', params.page)
    if (params.page === 1) {
      setIsLeft(false)
      switch (listTotal <= 5) {
        case true:
          setIsRight(false)
          break
        default:
          setIsRight(true)
          break
      }
    } else {
      setIsLeft(true)
      switch (listTotal > params.page * 5) {
        case true:
          setIsRight(true)
          break
        default:
          setIsRight(false)
          break
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.page, listTotal])

  /** 投票 */
  const collectTypeChange = async (i: number) => {
    let data = await ContractPokerFiGovernor.methods.hasVoted(proposalId, myAddress).call()
    if (!data) {
      try {
        setIsCollectType(i)
        const initSupport = [1, 0, 2]
        const proposalId = listVoting[detailsNumber].proposalId
        console.log('proposalId', listVoting[detailsNumber].proposalId)
        console.log('initSupport[i-1]', initSupport[i - 1])
        let data = await ContractPokerFiGovernor.methods
          .castVote(proposalId, initSupport[i - 1])
          .send({ from: myAddress })
        console.log('vot_data', data)
        if (data) {
          alert(t('voting_tipss'))
          setTimeout(() => {
            setPageStatus('list')
          }, 50)
        }
      } catch (error: any) {
        alert(t('voting_tipss_no'))
        console.log('errs', error.message)
      }
    } else {
      alert(t('voting_voted_tips'))
    }
  }

  const onFinish = async () => {
    let isTrueCalldatasChange = await setCalldatasChange()
    if (isTrueCalldatasChange) {
      let { isTrue, DATA_HEX } = await setCalldatasBytens()
      if (isTrue) {
        try {
          let params = {
            targets: (document as any).getElementById('title_address').value,
            values: 0,
            calldatas: DATA_HEX,
            descriptionHash: (document as any).getElementById('descriptionHash').value,
          }
          if (params.targets === '' || params.targets.length !== 42) {
            alert('Incorrect contract address')
            return false
          }
          if (params.descriptionHash === '') {
            alert('Description cannot be empty')
            return false
          }
          console.log('params', params)
          createData(params)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  // 创建提案
  const createData = async (params: any) => {
    if (params.calldatas === '') return false
    console.log(params)
    try {
      ContractPokerFiGovernor.methods
        .propose([params.targets], [params.values], [params.calldatas], params.descriptionHash)
        .send({
          from: myAddress,
        })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', function (receipt: any) {
          alert('Successful')
          setAbiContent('')
          setMethodParametersList([])
          // setCalldatas('')
          setDefaultValue('')
          setPageStatus('list')
          setParams({ page: 1 })
          setIsTrueVotingHooks(false)
          setTimeout(() => {
            setIsTrueVotingHooks(true)
          }, 50)
        })
        .on('error', function (error: any, receipt: any) {
          console.log(receipt)
        })
    } catch (error) {
      console.log('sss', error)
    }
  }

  /** 验证格式 */
  const setCalldatasChange = async () => {
    try {
      const data: any = methodParametersList.find((item) => item.name === defaultValue)
      let array: any[] = []
      data.list.forEach((element: { name: string; type: string; value: string }) => {
        if (element.value === '') {
          throw new Error(`${element.name}: Can not be empty!`)
        }
        if (element.type === 'address' && element.value.length !== 42) {
          throw new Error(`${element.name}: Can not be empty!`)
        }
        array.push(element.value)
      })
      return true
    } catch (error: any) {
      console.log('error.message', error.message)
      message.error(error.message)
      return false
    }
  }

  /** 生成bytens字节 */
  const setCalldatasBytens = async () => {
    const loading = message.loading('loading...', 0)
    try {
      const data: any = methodParametersList.find((item) => item.name === defaultValue)
      let array: any[] = []
      data.list.forEach((element: { name: string; type: string; value: string }) => {
        array.push(element.value)
      })
      const JSON_CONTENT: any[] = JSON.parse(abiContent)
      const list = JSON_CONTENT.find((item: any) => item.name === data.name)
      let DATA_HEX = web3.eth.abi.encodeFunctionCall(list, array)
      // setCalldatas(DATA_HEX)
      if (DATA_HEX) {
        console.log(DATA_HEX)
        setTimeout(loading, 500)
        return { isTrue: true, DATA_HEX }
      } else {
        return { isTrue: false, DATA_HEX: '' }
      }
    } catch (error) {
      console.log(';', error)
      setTimeout(loading, 500)
      return { isTrue: false, DATA_HEX: '' }
    }
  }

  const parsingAbi = async () => {
    try {
      console.log('abiContent', abiContent)
      let isTrue = isJSON(abiContent)
      if (isTrue) {
        const JSON_CONTENT: any[] = JSON.parse(abiContent)
        let METHOD_PARAMETERS_List: ChildType[] = []
        console.log(JSON_CONTENT instanceof Array)
        console.log(JSON_CONTENT.length !== 0)
        if (!(JSON_CONTENT instanceof Array)) {
          alert(t('json_tips'))
          return false
        }
        if (JSON_CONTENT.length === 0) {
          alert(t('json_tips'))
          return false
        }
        JSON_CONTENT.forEach((item) => {
          if (item.inputs !== undefined && item.inputs.length > 0) {
            let child: ChildType = {
              name: item.name,
              list: [],
            }
            item.inputs.forEach((element: any) => {
              child.list.push({ name: element.name, type: element.type, value: '' })
            })
            METHOD_PARAMETERS_List.push(child)
          } else {
            if (item.name) METHOD_PARAMETERS_List.push({ name: item.name, list: [] })
          }
        })
        if (METHOD_PARAMETERS_List.length > 0) setDefaultValue(METHOD_PARAMETERS_List[0].name)
        setMethodParametersList(METHOD_PARAMETERS_List)
      } else {
        alert('Not json')
      }
    } catch (error) {
      console.log('errors', error)
    }
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
      setPageStatus('release')
    } else {
      alert(t('voting_go_tips'))
    }
  }

  // 去投票判断是否已经投票
  const getDetailsNumberStatus = async (proposalId: string) => {
    try {
      setProposalId(proposalId)
      setPageStatus('details')
      // let data = await ContractPokerFiGovernor.methods.hasVoted(proposalId, myAddress).call()
      // if (!data) {
      //   setProposalId(proposalId)
      //   setPageStatus('details')
      // } else {
      //   alert(t('voting_voted_tips'))
      // }
    } catch (error) {
      console.log(error)
    }
  }

  // 点击查看详情
  const getDetails = async (proposalId: string) => {
    setProposalId(proposalId)
    setPageStatus('details')
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
          let list = JSON.parse(JSON.stringify(listVoting))
          for (let i = 0; i < list.length; i++) {
            if (list[i].proposalId === item.proposalId) {
              list[i].status = 5
              list[i].queueTime = await proposalEta(item.proposalId)
            }
          }
          console.log('list', list)
          setListVoting(list)
        })
        .on('error', function (error: any, receipt: any) {
          console.log(receipt, error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  // 去执行
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

  /** 动态获取合约地址 -abi */
  const catTitleAddress = async ({ target }: any) => {
    if (target.value !== undefined && target.value.length === 42) {
      setAbiContent('')
      setMethodParametersList([])
      axios
        .get(
          `https://api.bscscan.com/api?module=contract&action=getabi&address=${target.value}&apikey=KDFT5SYSNNFUBPEZI1113JE2NIAAKV7CW7`,
        )
        .then(({ data }) => {
          let result = data.result
          let result_array = JSON.parse(result)
          if (result_array !== undefined && result_array.length > 0) {
            setAbiContent(result)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
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

  return (
    <VotingWapperOne>
      <VotingWapper>
        {pageStatus === 'list' && (
          <>
            <VotingProposal>
              <ButtonDefault onClick={myAddress ? votingReleaseClick : injectedClick}>
                {myAddress ? t('voting_release_title') : t('wallet')}
              </ButtonDefault>
            </VotingProposal>
            {listVoting.length > 0 && (
              <>
                <VotingTitle>
                  {isUserDelegate && (
                    <CommissionBtn onClick={votingCommissionClick}>{t('voting_commission')}</CommissionBtn>
                  )}
                  {t('voting_total_tips')}
                  {listTotal}
                </VotingTitle>
                <VotingList>
                  {listVoting.map((item, i) => {
                    return (
                      <VotingListInfo key={i} active={listActive === i} onClick={() => setListActive(i)}>
                        <InfoTitle>{item.description}</InfoTitle>
                        <InfoStatus>
                          {myAddress ? (
                            <>
                              {item.status === 1 && (
                                <Vote
                                  onClick={() => {
                                    setDetailsNumber(i)
                                    getDetailsNumberStatus(item.proposalId)
                                  }}
                                >
                                  {t('voting_status_0')}
                                </Vote>
                              )}
                              {item.status === 4 && (
                                <>
                                  <VoteNo
                                    onClick={() => {
                                      onVoteSuccessClick(item)
                                    }}
                                  >
                                    {useVotingListStatus[item.status]}
                                  </VoteNo>
                                  <CommissionBtn
                                    onClick={() => {
                                      setDetailsNumber(i)
                                      getDetails(item.proposalId)
                                    }}
                                    style={{ marginLeft: '10px' }}
                                  >
                                    {t('voting_detailss')}
                                  </CommissionBtn>
                                </>
                              )}
                              {item.status !== 1 && item.status !== 4 && item.status !== 5 && (
                                <>
                                  <VoteNo className={item.status === 3 ? 'nopass' : ''}>
                                    {useVotingListStatus[item.status]}
                                  </VoteNo>
                                  <CommissionBtn
                                    onClick={() => {
                                      setDetailsNumber(i)
                                      getDetails(item.proposalId)
                                    }}
                                    style={{ marginLeft: '10px' }}
                                  >
                                    {t('voting_detailss')}
                                  </CommissionBtn>
                                </>
                              )}
                              {item.status === 5 && (
                                <>
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
                                      setDetailsNumber(i)
                                      getDetails(item.proposalId)
                                    }}
                                    style={{ marginLeft: '10px' }}
                                  >
                                    {t('voting_detailss')}
                                  </CommissionBtn>
                                </>
                              )}
                            </>
                          ) : (
                            <Vote onClick={injectedClick}>{t('wallet')}</Vote>
                          )}
                        </InfoStatus>
                        <InfoStartTime>{item.startTime}</InfoStartTime>
                      </VotingListInfo>
                    )
                  })}
                </VotingList>
                <VotingBtn>
                  <VotingBtnLeft
                    active={isLeft}
                    onClick={() => {
                      if (!isLeft) return false
                      setParams({ page: params.page - 1 })
                    }}
                  />
                  <VotingBtnRight
                    active={isRight}
                    onClick={() => {
                      if (!isRight) return false
                      setParams({ page: params.page + 1 })
                    }}
                  />
                </VotingBtn>
              </>
            )}
            {listVoting.length === 0 && <NoList>{t('voting_no_list')}</NoList>}
          </>
        )}
        {pageStatus === 'details' && (
          <>
            <VotingBtnRight
              active={true}
              className="details_left"
              onClick={() => {
                setPageStatus('list')
              }}
            />
            {/* <VotingDetailsTitle>{listVoting[detailsNumber].description}</VotingDetailsTitle> */}
            <VotingDetailsContent>
              <p>{t('voting_description')}</p>
              <p>{listVoting[detailsNumber].description}</p>
              <p>{t('voting_targets')}</p>
              <p>{listVoting[detailsNumber].targets[0]}</p>
              <p>{t('voting_proposer')}</p>
              <p>{listVoting[detailsNumber].proposer}</p>
              {/* <p>执行：</p>
              <p style={{ wordWrap: 'break-word' }}>{listVoting[detailsNumber].calldatas[0]}</p> */}
            </VotingDetailsContent>
            <VotingDetailsBtn>
              {/* <BtnLeft>
                {t('voting_details_hold')} <span>243454545</span>
              </BtnLeft> */}
              {listVoting[detailsNumber].status === 1 && (
                <BtnRight is_collect_type={isCollectType}>
                  <div
                    className="icon"
                    onClick={() => {
                      collectTypeChange(3)
                    }}
                  >
                    {t('voting_details_collect_3')}({detailsVoting.abstainVotes})
                  </div>
                  <div
                    className="icon"
                    onClick={() => {
                      collectTypeChange(1)
                    }}
                    style={{ textIndent: i18n.language === 'zh' ? '18px' : '38px' }}
                  >
                    {t('voting_details_collect_1')}({detailsVoting.forVotes})
                  </div>
                  <div
                    className="icon"
                    onClick={() => {
                      collectTypeChange(2)
                    }}
                    style={{ textIndent: i18n.language === 'zh' ? '18px' : '38px' }}
                  >
                    {t('voting_details_collect_2')}({detailsVoting.againstVotes})
                  </div>
                </BtnRight>
              )}
              {listVoting[detailsNumber].status !== 1 && (
                <div className="detailsVoting">
                  <p>
                    {t('voting_details_collect_3')}：{detailsVoting.abstainVotes}
                  </p>
                  <p>
                    {t('voting_details_collect_1')}：{detailsVoting.forVotes}
                  </p>
                  <p>
                    {t('voting_details_collect_2')}：{detailsVoting.againstVotes}
                  </p>
                </div>
              )}
            </VotingDetailsBtn>
          </>
        )}
        {pageStatus === 'release' && (
          <>
            <VotingBtnRight
              active={true}
              className="details_left"
              onClick={() => {
                setPageStatus('list')
              }}
            />
            <VotingDetailsTitle>{t('voting_release_title')}</VotingDetailsTitle>
            <VotingForm id="form">
              <FormTitle>{t('voting_release_form_1')}</FormTitle>
              <FormTitleInput
                name="title_address"
                placeholder={'address'}
                id="title_address"
                onChange={catTitleAddress}
              />
              <FormTitle>{t('voting_release_form_2')}</FormTitle>
              <FormTitleInputDiv>
                <FormTitleInputTextArea
                  value={abiContent}
                  name="content"
                  placeholder={`Enter your ABI json [{"inputs":[], "name":[], "type":"function"}]`}
                  onChange={({ target }) => {
                    setAbiContent(target.value)
                  }}
                />
              </FormTitleInputDiv>
              <AbiBtn>
                <ButtonDefault
                  style={{
                    width: '108px',
                    height: '34px',
                    marginRight: '30px',
                    fontSize: '16px',
                    background: `url(${VOTING_BTN_2}) no-repeat`,
                    backgroundSize: `100% 100%`,
                  }}
                  onClick={() => {
                    setAbiContent('')
                    setMethodParametersList([])
                  }}
                >
                  Clear
                </ButtonDefault>
                <ButtonDefault style={{ width: '108px', height: '34px', fontSize: '16px' }} onClick={parsingAbi}>
                  Parse
                </ButtonDefault>
              </AbiBtn>
              {methodParametersList.length > 0 && (
                <Selects
                  defaultValue={defaultValue}
                  onChange={({ target }) => {
                    setDefaultValue(target.value)
                  }}
                >
                  {methodParametersList.map((item, i) => (
                    <SelectOption key={i} value={item.name}>
                      {item.name}
                    </SelectOption>
                  ))}
                </Selects>
              )}
              {methodParametersList.map((item, i) => {
                return (
                  <div key={i}>
                    {defaultValue === item.name && (
                      <>
                        <FormTitle>{item.name}</FormTitle>
                        {item.list.map((ite, s) => {
                          return (
                            <div key={s} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                              <div style={{ width: '15%', fontSize: '18px', color: '#9cbbbf', fontWeight: 'bold' }}>
                                {ite.name}:
                              </div>
                              <FormTitleInput
                                name={ite.name}
                                placeholder={ite.type}
                                onChange={({ target }) => {
                                  ite.value = target.value
                                }}
                              />
                            </div>
                          )
                        })}
                      </>
                    )}
                  </div>
                )
              })}

              <FormTitle>{t('voting_release_form_3')}</FormTitle>
              <FormTitleInput name="descriptionHash" placeholder={'describe text'} id="descriptionHash" />
            </VotingForm>
            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: '20px' }}>
              <ButtonDefault onClick={() => onFinish()}>{t('voting_release_form_submit')}</ButtonDefault>
            </div>
          </>
        )}
      </VotingWapper>
      <BaseColorBg />
      <Modal
        visible={transferIsMode}
        footer={null}
        title="票权转移"
        onCancel={() => {
          setTransferIsMode(false)
        }}
        className="Votetransfer"
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
      <AppBottom link="/voting" />
    </VotingWapperOne>
  )
}
