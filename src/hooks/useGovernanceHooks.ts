import { useEffect, useState } from 'react'
import { ContractPokerFiSharesFactory, ContractPokerFiSharesPKS } from '../contracts'
import web3 from '../contracts/initWeb3'
import moment from 'moment'
import { PokerFiSharesFactory_address } from '../contracts/constant'
import ICON1 from '../assets/images/governance_icon1.png'
import ICON2 from '../assets/images/governance_icon2.png'
import ICON3 from '../assets/images/governance_icon3.png'
import ICON4 from '../assets/images/governance_icon4.png'
import axios from 'axios'
import { BigNumber } from 'bignumber.js'

export interface listType {
  icon: any
  title: string
  stage?: string
  number: string | number
}

const ListInit: listType[] = [
  {
    icon: ICON1,
    title: '当前发行量：',
    stage: '-',
    number: '0',
  },
  {
    icon: ICON2,
    title: '总LP数量：',
    number: '0',
  },
  {
    icon: ICON3,
    title: '我的LP数量：',
    number: '0',
  },
  {
    icon: ICON4,
    title: 'PKS：',
    number: '0',
  },
]

interface Types {
  myAddress: string
  isTrue: boolean
}

export function useGovernanceHooks({ myAddress, isTrue }: Types) {
  const [totalPKSShares, setTotalPKSShares] = useState<string>('0')
  const [lists, setList] = useState<listType[]>(ListInit)
  const [earned, setEarned] = useState<string>('0')
  const [currentStageTime, setCurrentStageTime] = useState<{ start_time: string; end_time: string }>({
    start_time: '',
    end_time: '',
  })

  useEffect(() => {
    if (isTrue) {
      getTotalPKSShares()
      getList()
    }
    if (isTrue && myAddress) getList()
    if (myAddress) getEarned()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTrue, myAddress])

  const toWeiNumber = (number: string) => {
    let data = Number(web3.utils.fromWei(number, 'ether')).toFixed(6)
    return Number(data).toString()
  }

  /** 获取pks总发行量 */
  const getTotalPKSShares = async () => {
    const data = await ContractPokerFiSharesPKS.methods.MAX_SUPPLY().call()
    setTotalPKSShares(toWeiNumber(data))
  }

  /** 获取总的Lp、我的LP、PKS */
  const getList = async () => {
    let data_list = lists
    if (myAddress) {
      let MY_SHARES_NUMBER = await ContractPokerFiSharesFactory.methods.shares(myAddress).call()
      let EARNED_PKS = await ContractPokerFiSharesPKS.methods.balanceOf(myAddress).call()
      data_list[2].number = toWeiNumber(MY_SHARES_NUMBER)
      data_list[3].number = toWeiNumber(EARNED_PKS)
    }
    let TOTAL_SHARES = await ContractPokerFiSharesFactory.methods.totalShares().call()
    data_list[1].number = toWeiNumber(TOTAL_SHARES)
    axios
      .get('https://api.bscscan.com/api', {
        params: {
          module: 'logs',
          action: 'getLogs',
          fromBlock: 0,
          address: PokerFiSharesFactory_address,
          topic0: '0x9795f222c951ae3e749f872dbe287f78d21fa52353e9175cb20ed3aa2b29b82b',
          apikey: 'KDFT5SYSNNFUBPEZI1113JE2NIAAKV7CW7',
        },
      })
      .then(({ data }) => {
        let result = data.result
        if (result !== undefined && result.length > 0) {
          /** start */
          let parameters0 = web3.eth.abi.decodeParameters(['uint256', 'uint256', 'uint256'], result[0].data)
          /** end */
          let parameters = web3.eth.abi.decodeParameters(
            ['uint256', 'uint256', 'uint256'],
            result[result.length - 1].data,
          )
          let valuess = {
            amount: parameters[0],
            endDuration: parameters[2],
            startDuration: parameters[1],
            stage: result.length,
          }
          /** start */
          let parameters0_amount = new BigNumber(toWeiNumber(parameters0[0]))
          data_list[0].number =
            result.length > 2
              ? toWeiNumber(valuess.amount)
              : Number(parameters0_amount.plus(toWeiNumber(valuess.amount)))
          data_list[0].stage = (valuess.stage - 1) as any
          /** end */
          /**
           * data_list[0].number = toWeiNumber(valuess.amount)
           * data_list[0].stage = valuess.stage
           */
          setCurrentStageTime({
            start_time: moment.unix(valuess.startDuration).format('YYYY-MM-DD HH:mm:ss'),
            end_time: moment.unix(valuess.endDuration).format('YYYY-MM-DD HH:mm:ss'),
          })
          setList(data_list)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    // ContractPokerFiSharesFactory.getPastEvents('RewardAdded',
    //   {filter: {}, fromBlock: 12808396, toBlock: 'latest'},
    //   function(error: any, event: any){
    //     console.log('err', error)
    //   })
    //   .then(function(event: any) {
    //     let valuess = {
    //       amount: event[event.length - 1].returnValues.amount,
    //       endDuration: event[event.length - 1].returnValues.finish,
    //       startDuration: event[event.length - 1].returnValues.start,
    //       stage: event.length
    //     }
    //     data_list[0].number = toWeiNumber(valuess.amount)
    //     data_list[0].stage = valuess.stage
    //     setCurrentStageTime({
    //       start_time: moment.unix(valuess.startDuration).format('YYYY-MM-DD HH:mm:ss'),
    //       end_time: moment.unix(valuess.endDuration).format('YYYY-MM-DD HH:mm:ss'),
    //     })
    //     setList(data_list)
    //   })
  }

  /** 计算能获得的 pks 数量 */
  const getEarned = async () => {
    let data = await ContractPokerFiSharesFactory.methods.earned(myAddress).call()
    console.log('earned', data)
    setEarned(toWeiNumber(data))
  }

  /** 获取当前阶段开始时间、结束时间 */
  // const getStartTimeAndEndTime = async () => {
  //   let end_time = await ContractPokerFiSharesFactory.methods.periodFinish().call()
  //   let start_time = await ContractPokerFiSharesFactory.methods.lastUpdateTime().call()
  //   setCurrentStageTime({
  //     start_time: moment.unix(start_time).format('YYYY-MM-DD HH:mm:ss'),
  //     end_time: moment.unix(end_time).format('YYYY-MM-DD HH:mm:ss'),
  //   })
  // }

  return { totalPKSShares, lists, earned, currentStageTime }
}
