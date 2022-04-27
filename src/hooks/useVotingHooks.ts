import { useEffect, useState } from 'react'
import { ContractPokerFiGovernor, ContractPokerFiSharesPKS } from '../contracts'
import { PokerFiGovernor_address } from '../contracts/constant'
import { blockTime } from '../utils'
import moment from 'moment'
import axios from 'axios'
import web3 from '../contracts/initWeb3'
import { toolFromWei } from '../utils/tool'

export interface ListType {
  proposalId: string
  proposer: string
  targets: string[]
  values: number[]
  signatures: string[]
  calldatas: string[]
  startBlock: any
  endBlock: any
  description: string
  status?: any
  startTime: string
  queueTime: string
}

export const useVotingListStatus = ['等待', '激活', '取消', '未通过', '已通过', '排队', '已到期', '已执行']

interface Types {
  isTrueVotingHooks: boolean
  page: number
  myAddress: string
}

export function useVotingHooks({ isTrueVotingHooks, page, myAddress }: Types) {
  const [listVoting, setListVoting] = useState<ListType[]>([])
  const [wholeList, setWholeList] = useState<ListType[]>([])
  // const [watchWholeList, setWatchWholeList] = useState<ListType[]>([])
  const [listTotal, setTotal] = useState(0)

  const [isLeft, setIsLeft] = useState(false)
  const [isRight, setIsRight] = useState(true)
  const [isUserDelegate, setIsUserDelegate] = useState(false)

  useEffect(() => {
    getWholeList()
    if (isTrueVotingHooks && myAddress) catUserDelegate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTrueVotingHooks, page, myAddress])

  useEffect(() => {
    if (myAddress) catUserDelegate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myAddress])

  /** 获取数据 */
  const getWholeList = async () => {
    axios
      .get('https://api.bscscan.com/api', {
        params: {
          module: 'logs',
          action: 'getLogs',
          fromBlock: 0,
          address: PokerFiGovernor_address,
          topic0: '0x7d84a6263ae0d98d3329bd7b46bb4e8d6f98cd35a7adb45c274c8b7fd5ebd5e0',
          apikey: 'KDFT5SYSNNFUBPEZI1113JE2NIAAKV7CW7',
        },
      })
      .then(({ data }) => {
        let result = data.result
        if (result !== undefined && result.length > 0) {
          let DATA_LIST: ListType[] = []
          let ParameterArray = [
            'uint256',
            'address',
            'address[]',
            'uint256[]',
            'string[]',
            'bytes[]',
            'uint256',
            'uint256',
            'string',
          ]
          result.forEach((item: any) => {
            let parameters = web3.eth.abi.decodeParameters(ParameterArray, item.data)
            let datas: any = {
              proposalId: parameters[0],
              proposer: parameters[1],
              targets: parameters[2],
              values: parameters[3],
              signatures: parameters[4],
              calldatas: parameters[5],
              startBlock: parameters[6],
              endBlock: parameters[7],
              description: parameters[8],
            }
            DATA_LIST.push(datas)
          })
          const compare = (key: string) => {
            return function (obj1: any, obj2: any) {
              return obj2[key] - obj1[key]
            }
          }
          DATA_LIST.sort(compare('startBlock'))
          setTotal(DATA_LIST.length)
          getList(DATA_LIST)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    // ContractPokerFiGovernor.getPastEvents(
    //   'ProposalCreated',
    //   {
    //     fromBlock: 0,
    //     toBlock: 'latest',
    //   },
    //   function (err, event) {},
    // ).then((res) => {
    //   let DATA_LIST: ListType[] = []
    //   res.forEach((element) => {
    //     let datas: any = {
    //       proposalId: element.returnValues.proposalId,
    //       proposer: element.returnValues.proposer,
    //       targets: element.returnValues.targets,
    //       values: element.returnValues.values,
    //       signatures: element.returnValues.signatures,
    //       calldatas: element.returnValues.calldatas,
    //       startBlock: element.returnValues.startBlock,
    //       endBlock: element.returnValues.endBlock,
    //       description: element.returnValues.description,
    //     }
    //     DATA_LIST.push(datas)
    //   })
    //   const compare = (key: string) => {
    //     return function (obj1: any, obj2: any) {
    //       return obj2[key] - obj1[key]
    //     }
    //   }
    //   DATA_LIST.sort(compare('startBlock'))
    //   setTotal(DATA_LIST.length)
    //   getList(DATA_LIST)
    // })
  }

  /** 监听合约事件 ProposalCreated  */
  // const getWatchWholeList = () => {
  //   console.log('ssss')
  //   ContractPokerFiGovernor.events.ProposalCreated({fromBlock: 0, filter: {}}, function(error: any, event: any){
  //   })
  //     .on('data', function(event: any) {
  //       console.log('data',event)
  //     })
  //     .on('changed', function(event: any){
  //       console.log('changed', event)
  //     })
  //     .on('error', function(error: any) {
  //       console.log('error', error)
  //     })
  // }

  /** 获取数据 */
  const getList = async (DATA_LIST: ListType[]) => {
    let showList = []
    for (let i = 0; i < DATA_LIST.length; i++) {
      let status = await getState(DATA_LIST[i].proposalId)
      let startTime = await blockTime(DATA_LIST[i].startBlock)
      DATA_LIST[i].status = Number(status)
      DATA_LIST[i].startTime = startTime
      if (Number(status) === 5) {
        DATA_LIST[i].queueTime = await proposalEta(DATA_LIST[i].proposalId)
      }
    }
    let max = page * 5 > DATA_LIST.length ? DATA_LIST.length : page * 5
    for (let i = (page - 1) * 5; i < max; i++) {
      showList.push(DATA_LIST[i])
    }
    console.log('showList', showList)
    setListVoting(showList)
    setWholeList(DATA_LIST)
  }

  /** 获取状态 */
  const getState = async (proposalId: string) => {
    let data = await ContractPokerFiGovernor.methods.state(proposalId).call()
    return data
  }

  // 加入队列，执行，判断是否可以执行
  const proposalEta = async (proposalId: string) => {
    let data = await ContractPokerFiGovernor.methods.proposalEta(proposalId).call()
    return moment.unix(data).format('YYYY-MM-DD HH:mm:ss')
  }

  /** 查询用户是否可以委托 */
  const catUserDelegate = async () => {
    let data = await ContractPokerFiSharesPKS.methods.getVotes(myAddress).call()
    console.log('Voting rights: ', data)
    console.log('myaddress: ', myAddress)
    if (data === '0') setIsUserDelegate(false)
    else setIsUserDelegate(true)
  }

  return {
    listVoting,
    listTotal,
    wholeList,
    isLeft,
    setIsLeft,
    isRight,
    setIsRight,
    setListVoting,
    proposalEta,
    setWholeList,
    isUserDelegate,
  }
}

interface DetailsType {
  forVotes: string
  againstVotes: string
  abstainVotes: string
}

export function useVotingProposals(proposalId: string) {
  const [detailsVoting, setDetails] = useState<DetailsType>({ forVotes: '0', againstVotes: '0', abstainVotes: '0' })

  useEffect(() => {
    if (proposalId !== undefined && proposalId !== '') getDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposalId])

  const getDetails = async () => {
    let data = await ContractPokerFiGovernor.methods.proposals(proposalId).call()
    let params = {
      forVotes: toolFromWei(data.forVotes),
      againstVotes: toolFromWei(data.againstVotes),
      abstainVotes: toolFromWei(data.abstainVotes),
    }
    setDetails(params)
  }

  return { detailsVoting }
}
