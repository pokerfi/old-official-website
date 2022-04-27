import web3 from '../contracts/initWeb3'
import { BigNumber } from 'bignumber.js'

/**
 * 小数点后18位
 * 将单位 wei 的数值转换为整数,并保留小数点后4位
 *  @param {string} value
 */
// | import("bn.js")
const toolFromWei = (value: any) => {
  const valueEther = web3.utils.fromWei(value, 'ether')
  var re = /([0-9]+\.[0-9]{2})[0-9]*/
  const valueNumber = valueEther.replace(re, '$1')
  return valueNumber
}

const toolFromNumber = (value: number) => {
  const valueNumber = value.toFixed(2)
  return valueNumber
}

/**
 * 时间戳转换时间格式 2000-01-01 00:00:00
 * @param {number} timeStamp 时间戳
 */
const conversionDate = (timeStamp: number) => {
  if (timeStamp > 0) {
    var date = new Date(timeStamp * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return Y + M + `${D} ` + h + m + s //时分秒可以根据自己的需求加上
  }
  return '0000-00-00'
}

/**
 * 倒计时
 * @param {string} timeStamp 时间戳
 */
const showTime = function (timeStamp: string) {
  const nowtime = new Date() //获取当前时间
  const endtime = Number(timeStamp) * 1000 //定义结束时间
  const lefttime = endtime - nowtime.getTime(), //距离结束时间的毫秒数
    leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
    lefth = Math.floor((lefttime / (1000 * 60 * 60)) % 24), //计算小时数
    leftm = Math.floor((lefttime / (1000 * 60)) % 60), //计算分钟数
    lefts = Math.floor((lefttime / 1000) % 60) //计算秒数

  return leftd + '天' + lefth + ':' + leftm + ':' + lefts //返回倒计时的字符串
}

const showTimeText = function (timeStamp: string) {
  const nowtime = new Date() //获取当前时间
  const endtime = Number(timeStamp) * 1000 //定义结束时间
  const lefttime = endtime - nowtime.getTime(), //距离结束时间的毫秒数
    // leftd = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
    lefth = Math.floor((lefttime / (1000 * 60 * 60)) % 24), //计算小时数
    leftm = Math.floor((lefttime / (1000 * 60)) % 60), //计算分钟数
    lefts = Math.floor((lefttime / 1000) % 60) //计算秒数

  if (lefttime <= 0) {
    return '已结束'
  } else {
    return lefth + ':' + leftm + ':' + lefts //返回倒计时的字符串
  }
}

/**
 * 工作状态判断： 0 工作中 1饥饿 2死亡
 * @param {string} timeStamp 时间戳
 */
const showTimeState = function (timeStamp: string) {
  const nowtime = new Date().getTime() //获取当前时间
  const endtime = Number(timeStamp) * 1000 //结束时间
  const remaining = endtime - nowtime
  if (remaining > 0 && remaining < 86400000) {
    return '饥饿'
  } else if (remaining <= 0) {
    return '死亡'
  } else {
    return '工作中'
  }
}

const endAuctionTime = (timeStamp: number) => {
  const nowtime = new Date().getTime() //获取当前时间
  const endtime = Number(timeStamp) * 1000 //定义结束时间
  if (nowtime >= endtime) {
    return true
  } else {
    return false
  }
}

/**
 * 获取当前时间转换时间格式 2000-01-01 00:00:00
 */
function getCurrentTime() {
  var d = new Date(),
    str = ''
  str += d.getFullYear() + '-'
  str += d.getMonth() + 1 + '-'
  str += d.getDate() + ' '
  str += d.getHours() + ':'
  str += d.getMinutes() + ':'
  str += d.getSeconds() + ''
  return str
}

/** 判断数据是否能够领取奖励 */
const releasableIsMumber = (totalShares: string, totalReleased: string, releasable: string) => {
  let shares = new BigNumber(Number(totalShares))
  let difference = shares.minus(Number(totalReleased)).toNumber()
  return difference < Number(releasable) ? '0' : releasable
}

export {
  toolFromWei,
  conversionDate,
  endAuctionTime,
  showTime,
  getCurrentTime,
  showTimeState,
  showTimeText,
  toolFromNumber,
  releasableIsMumber,
}
