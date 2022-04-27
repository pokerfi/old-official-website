import { useState, useEffect } from 'react'
import { ContractBurnPool } from '../contracts'
import i18n from '../i18n'
import moment from 'moment'
import { Arabia_To_SimplifiedChinese } from '../utils'
import web3 from '../contracts/initWeb3'

interface Types {
  myAddress: string
  isTrue: boolean
}

interface RoundUserType {
  lastTime: string
  reward: string
  rewardPerShareseReleased: string
  share: string
}

interface PeriodListType {
  value: any
  label: any
}

interface RoundListType {
  key?: any
  number: string | number
  times: string
  round: number
  isTrue: boolean
  time?: string
}

export function useCombustionHooks(props: Types) {
  const { myAddress, isTrue } = props

  const [currentRound, setCurrentRound] = useState<string>('-')
  const [currentRoundNumber, setCurrentRoundNumber] = useState<number>(1)
  const [currentRoundToday, setCurrentRoundToday] = useState<string>('-')
  const [burningNumber, setBurningNumber] = useState<string | number>('0')
  const [roundUser, setRoundUser] = useState<RoundUserType>({
    lastTime: '0',
    reward: '0',
    rewardPerShareseReleased: '0',
    share: '0',
  })
  const [earnedPks, setEarnedPks] = useState<string>('0')
  const [roundEarned, setRoundEarned] = useState<number>(0)
  const [period, setPeriod] = useState<string>('-')

  /** 周期 */
  const [periodList, setPeriodList] = useState<PeriodListType[]>([])

  /** 轮列表 */
  const [roundList, setRoundList] = useState<RoundListType[]>([])
  /** my list */
  const [userRoundList, setUserRoundList] = useState<RoundListType[]>([])

  useEffect(() => {
    getToday()
    getPeriod()
    getCurrentRound()
    if (myAddress) {
      getEarnedUser(myAddress)
      // getRoundEarned(myAddress)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language, myAddress, isTrue])

  /** 获取当前轮数 */
  const getCurrentRound = async () => {
    try {
      let data = await ContractBurnPool.methods.round().call()
      let num = Number(data)
      setCurrentRoundNumber(Math.ceil(num / 10))
      setRoundEarned((num - 1) * 15)
      let text =
        i18n.language === 'zh'
          ? `第${Arabia_To_SimplifiedChinese(data % 10 === 0 ? 10 : data % 10)}轮`
          : `Round ${data % 10 === 0 ? 10 : data % 10}`
      setCurrentRound(text)
      getBurningNumber(data)
      switchRoundList(data)
      getRoundList(data)
      if (myAddress) {
        getUserRoundList(data, myAddress)
        getRoundUser(myAddress, data)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  /** 计算周期 */
  const switchRoundList = async (number: number) => {
    let num = Math.ceil(Number(number) / 10)
    let list: PeriodListType[] = []
    for (let i = 0; i < num; i++) {
      let text = i18n.language === 'zh' ? `第${Arabia_To_SimplifiedChinese(i + 1)}周期` : `Period ${i + 1}`
      list.push({
        label: text,
        value: (i + 1).toString(),
      })
    }
    setPeriodList(list)
  }

  /** 获取当前轮的第几天 */
  const getToday = async () => {
    try {
      let data = await ContractBurnPool.methods.today().call()
      let text =
        i18n.language === 'zh' ? `第${data % 5 === 0 ? 5 : data % 5}天` : `Day ${data % 5 === 0 ? 5 : data % 5}`
      setCurrentRoundToday(text)
    } catch (error) {
      console.log('error', error)
    }
  }

  /** 获取指定轮的燃烧数 */
  const getBurningNumber = async (round: any) => {
    try {
      let data = await ContractBurnPool.methods.roundShares(round).call()
      setBurningNumber(data)
    } catch (error) {
      console.log('error', error)
    }
  }

  /** 获取总燃烧数轮列表 */
  const getRoundList = async (res: string) => {
    let list: RoundListType[] = []
    for (let i = 1; i <= Number(res); i++) {
      let times =
        i18n.language === 'zh'
          ? `第${Number(Math.ceil(i / 10))}周期第${Number(i) % 10 === 0 ? 10 : Number(i) % 10}轮`
          : `Cycle ${Number(Math.ceil(i / 10))}, Round ${Number(i) % 10 === 0 ? 10 : Number(i) % 10}`
      let number = await ContractBurnPool.methods.roundShares(i).call()
      let params: RoundListType = {
        key: i,
        number,
        times,
        isTrue: i === Number(res),
        round: Number(Math.ceil(i / 10)),
      }
      list.push(params)
    }
    setRoundList(list)
  }

  /** 获取我的燃烧列表 */
  const getUserRoundList = async (res: any, account: string) => {
    try {
      let list: RoundListType[] = []
      let data = await ContractBurnPool.methods.stakeList(account, 0, 0).call()
      data.forEach((element: any, i: number) => {
        let time_s =
          i18n.language === 'zh'
            ? `第${Number(Math.ceil(element.round / 10))}周期第${
                Number(element.round) % 10 === 0 ? 10 : Number(element.round) % 10
              }轮`
            : `Cycle ${Number(Math.ceil(element.round / 10))}, Round ${
                Number(element.round) % 10 === 0 ? 10 : Number(element.round) % 10
              }`
        let params: RoundListType = {
          key: i + 1,
          number: element.amount,
          times: moment(Number(element.time) * 1000).format('YYYY-MM-DD HH:mm:ss'),
          isTrue: Number(Math.ceil(element.round / 10)) === Number(Math.ceil(res / 10)),
          round: Number(Math.ceil(element.round / 10)),
          time: time_s,
        }
        list.push(params)
      })
      setUserRoundList(list)
    } catch (error) {
      console.log('error', error)
    }
  }

  /** 获取用户当前信息 */
  const getRoundUser = async (account: string, round: string) => {
    try {
      let data = await ContractBurnPool.methods.users(account, round).call()
      let params: RoundUserType = {
        rewardPerShareseReleased: data.rewardPerShareseReleased,
        reward: data.rewardPerShareseReleased,
        lastTime: data.rewardPerShareseReleased,
        share: data.share,
      }
      setRoundUser(params)
    } catch (error) {
      console.log('error', error)
    }
  }

  /** 用户待领取奖励 */
  const getEarnedUser = async (account: string) => {
    try {
      let data = await ContractBurnPool.methods.earned(account).call()
      setEarnedPks(data)
    } catch (error) {
      console.log('error', error)
    }
  }

  /** 已产出奖励 */
  // const getRoundEarned = async (account: string) => {
  //   try {
  //     let data = await ContractBurnPool.methods.roundEarned(account).call()
  //     setRoundEarned(data)
  //   } catch (error) {
  //     console.log('error', error)
  //   }
  // }

  /** 运行周期 */
  const getPeriod = async () => {
    try {
      let data = await ContractBurnPool.methods.period().call()
      console.log('data', data)
      let text = i18n.language === 'zh' ? `第${Arabia_To_SimplifiedChinese(data)}周期` : `Period ${data}`
      setPeriod(text)
    } catch (error) {
      console.log('error', error)
    }
  }

  return {
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
  }
}

/** 获取下次待领取的倒计时 */
export function useCombustionTimeHooks(props: { isTrue: boolean }) {
  const [currentTime, setCurrentTime] = useState<number>(0)
  const { isTrue } = props

  useEffect(() => {
    getOpeningTimes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTrue])

  /** 获取启动时间 */
  const getOpeningTimes = async () => {
    let start_time = await ContractBurnPool.methods.opening().call()
    let data = await ContractBurnPool.methods.today().call()
    let end_time = moment(moment.unix(start_time)).add(Math.ceil(Number(data) / 5) * 5, 'days')
    let current_block = await web3.eth.getBlockNumber()
    let current_time_data = await web3.eth.getBlock(current_block)
    let current_time: any = current_time_data.timestamp || '0'
    let duration = end_time.diff(moment(moment.unix(current_time)), 'seconds')
    setCurrentTime(duration)
  }

  return { currentTime, setCurrentTime }
}

/** 列表、总数据 */
export function useCombustionListHooks(props: Types) {
  const { myAddress, isTrue } = props

  const [totalShares, setTotalShares] = useState<string>('0')
  const [userTotalShare, setUserTotalShare] = useState<string>('0')

  useEffect(() => {
    getTotalShares()
    if (myAddress) {
      getUserTotalShare(myAddress)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myAddress, isTrue])

  /** 获取总燃烧数 */
  const getTotalShares = async () => {
    try {
      let data = await ContractBurnPool.methods.totalShares().call()
      setTotalShares(data)
    } catch (error) {
      console.log(error)
    }
  }

  /** 获取用户的总燃烧数 */
  const getUserTotalShare = async (address: string) => {
    try {
      let data = await ContractBurnPool.methods.userTotalShare(address).call()
      setUserTotalShare(data)
    } catch (error) {
      console.log(error)
    }
  }

  return { totalShares, userTotalShare }
}
