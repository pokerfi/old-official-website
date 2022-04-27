import { BigNumber } from 'bignumber.js'
import web3 from '../contracts/initWeb3'
/** PS 积分 赛季计算 */
import moment from 'moment'
export const pointsSeason = () => {
  let CURRENT_TIME = moment()
  let START_TIME = moment('2021-11-01 13:00:00')
  let TIME_DIFFERENCE_DAYS = CURRENT_TIME.diff(START_TIME, 'days', true)
  let SEASON_TOTAL = Math.ceil(TIME_DIFFERENCE_DAYS / 10)
  let list = []
  for (let i = 0; i < SEASON_TOTAL; i++) {
    if (i === 0)
      list.push({
        id: 1,
        name: '预热赛',
      })
    else if (i > 0 && i < 3) {
      list.push({
        id: i + 1,
        name: `第${Arabia_To_SimplifiedChinese(i)}届`,
      })
    } else
      list.push({
        id: i + 1,
        name: `第${Arabia_To_SimplifiedChinese(i - 2)}届(正式赛)`,
      })
  }
  return list
}

/** 获取当前时间位于那个赛季 */
export const currentTimeText = () => {
  let CURRENT_TIME = moment()
  let CURRENT_TIME_HOURS = moment().format('HH')
  let START_TIME = moment('2021-11-01 13:00:00')
  let TIME_DIFFERENCE_DAYS = CURRENT_TIME.diff(START_TIME, 'days')

  /** 传入参数，seasonId， 计算属于第几届。 */
  let CURRENT_SEASON = Math.floor(TIME_DIFFERENCE_DAYS / 10) + 1

  /** 当前赛季的第几天 */
  let CURRENT_SEASON_DAYS = TIME_DIFFERENCE_DAYS % 10

  /** 当前时间对于赛季的名称 */
  let CURRENT_SEASON_NAME =
    CURRENT_SEASON === 1
      ? '预热赛'
      : CURRENT_SEASON > 3
      ? `第${Arabia_To_SimplifiedChinese(CURRENT_SEASON - 3)}届(正式赛)`
      : `第${Arabia_To_SimplifiedChinese(CURRENT_SEASON - 1)}届`

  /** 当前赛季的结束时间 */
  let CURRENT_SEASON_END_TIME =
    CURRENT_TIME_HOURS >= '13'
      ? moment().add(10 - CURRENT_SEASON_DAYS, 'days')
      : moment().add(9 - CURRENT_SEASON_DAYS, 'days')
  CURRENT_SEASON_END_TIME.set('hour', 13)
  CURRENT_SEASON_END_TIME.set('minute', 0)
  CURRENT_SEASON_END_TIME.set('second', 0)

  return {
    CURRENT_SEASON,
    CURRENT_SEASON_DAYS: Math.ceil(CURRENT_TIME.diff(START_TIME, 'days', true) % 10),
    CURRENT_SEASON_NAME,
    CURRENT_SEASON_END_TIME: CURRENT_SEASON_END_TIME.format('YYYY-MM-DD HH:mm:ss'),
  }
}

/* eslint-disable */
//阿拉伯数字转换为简写汉字
export const Arabia_To_SimplifiedChinese = (Num: any) => {
  for (let i = Num.length - 1; i >= 0; i--) {
    Num = Num.replace(',', '') //替换Num中的“,”
    Num = Num.replace(' ', '') //替换Num中的空格
  }
  if (isNaN(Num)) {
    //验证输入的字符是否为数字
    //alert("请检查小写金额是否正确");
    return
  }
  //字符处理完毕后开始转换，采用前后两部分分别转换
  let part = String(Num).split('.')
  let newchar = ''
  //小数点前进行转化
  for (let i = part[0].length - 1; i >= 0; i--) {
    if (part[0].length > 10) {
      //alert("位数过大，无法计算");
      return ''
    } //若数量超过拾亿单位，提示
    let tmpnewchar = ''
    let perchar = part[0].charAt(i) as any
    switch (perchar) {
      case '0':
        tmpnewchar = '零' + tmpnewchar
        break
      case '1':
        tmpnewchar = '一' + tmpnewchar
        break
      case '2':
        tmpnewchar = '二' + tmpnewchar
        break
      case '3':
        tmpnewchar = '三' + tmpnewchar
        break
      case '4':
        tmpnewchar = '四' + tmpnewchar
        break
      case '5':
        tmpnewchar = '五' + tmpnewchar
        break
      case '6':
        tmpnewchar = '六' + tmpnewchar
        break
      case '7':
        tmpnewchar = '七' + tmpnewchar
        break
      case '8':
        tmpnewchar = '八' + tmpnewchar
        break
      case '9':
        tmpnewchar = '九' + tmpnewchar
        break
    }
    switch (part[0].length - i - 1) {
      case 0:
        tmpnewchar = tmpnewchar
        break
      case 1:
        if (perchar != 0) tmpnewchar = tmpnewchar + '十'
        break
      case 2:
        if (perchar != 0) tmpnewchar = tmpnewchar + '百'
        break
      case 3:
        if (perchar != 0) tmpnewchar = tmpnewchar + '千'
        break
      case 4:
        tmpnewchar = tmpnewchar + '万'
        break
      case 5:
        if (perchar != 0) tmpnewchar = tmpnewchar + '十'
        break
      case 6:
        if (perchar != 0) tmpnewchar = tmpnewchar + '百'
        break
      case 7:
        if (perchar != 0) tmpnewchar = tmpnewchar + '千'
        break
      case 8:
        tmpnewchar = tmpnewchar + '亿'
        break
      case 9:
        tmpnewchar = tmpnewchar + '十'
        break
    }
    newchar = tmpnewchar + newchar
  }
  //替换所有无用汉字，直到没有此类无用的数字为止
  while (
    newchar.search('零零') != -1 ||
    newchar.search('零亿') != -1 ||
    newchar.search('亿万') != -1 ||
    newchar.search('零万') != -1
  ) {
    newchar = newchar.replace('零亿', '亿')
    newchar = newchar.replace('亿万', '亿')
    newchar = newchar.replace('零万', '万')
    newchar = newchar.replace('零零', '零')
  }
  //替换以“一十”开头的，为“十”
  if (newchar.indexOf('一十') == 0) {
    newchar = newchar.substr(1)
  }
  //替换以“零”结尾的，为“”
  if (newchar.lastIndexOf('零') == newchar.length - 1) {
    newchar = newchar.substr(0, newchar.length - 1)
  }
  return newchar
}
/* eslint-disable */

export const isJSON = (str: any) => {
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str)
      if (typeof obj == 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log('error：' + str + '!!!' + e)
      return false
    }
  }
}

/** 通过块计算事件 1块==13.14s BSC 3s */
export const blockTime = async (str: string) => {
  let blockNumber = await web3.eth.getBlockNumber()
  console.log('blockNumber', blockNumber)
  if (blockNumber >= Number(str)) {
    let times = (await web3.eth.getBlock(str)).timestamp
    return moment.unix(times as any).format('YYYY-MM-DD HH:mm:ss')
  } else {
    let INIT_NUMBER = new BigNumber(3.1)
    let start = new BigNumber(await web3.eth.getBlockNumber())
    let Difference = start.minus(str).toNumber()
    console.log('Difference', Difference)
    let TOTAL_NUMBER = INIT_NUMBER.multipliedBy(Math.abs(Difference)).toNumber()
    let CURRENT_TIME = moment()
    if (Difference >= 0) {
      let ENE_TIME = CURRENT_TIME.subtract(TOTAL_NUMBER, 'seconds')
      return ENE_TIME.format('YYYY-MM-DD HH:mm:ss')
    } else {
      let ENE_TIME = CURRENT_TIME.add(TOTAL_NUMBER, 'seconds')
      return ENE_TIME.format('YYYY-MM-DD HH:mm:ss')
    }
  }
  // return moment.unix(times as any).format('YYYY-MM-DD HH:mm:ss')
}
