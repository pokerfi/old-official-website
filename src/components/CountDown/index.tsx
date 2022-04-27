import * as React from 'react'
import i18n from '../../i18n'
const { useState, useEffect, useRef } = React

interface IProps {
  timeStamp: any
  returnClick: () => void
}

const CountDown = (props: IProps) => {
  const { timeStamp, returnClick } = props
  const intervalRef = useRef<any>(null)

  const now: any = Math.round(new Date().getTime() / 1000).toString() //获取当前时间
  const end: any = timeStamp //设置截止时间

  const [leftTime, setLeftTime] = useState(end - now) //时间间隔
  const [h, setHours] = useState<any>('') //小时
  const [m, setMinutes] = useState<any>('') //分钟
  const [s, setSeconds] = useState<any>('') //秒
  const [d, setDays] = useState<any>('') // 天

  useEffect(() => {
    if (leftTime === 0) returnClick()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftTime])

  useEffect(() => {
    if (leftTime > 0) {
      intervalRef.current = setInterval(() => {
        const newNow: any = Math.round(new Date().getTime() / 1000).toString() // 重新获取当前时间

        let newLeftTime = timeStamp - newNow
        setLeftTime(() => newLeftTime) //计算新的时间间隔数值

        let day = newLeftTime > 86400 ? Math.floor(newLeftTime / 86400) : '0'

        let hours =
          Math.floor((newLeftTime / 60 / 60) % 24) < 10
            ? `0${Math.floor((newLeftTime / 60 / 60) % 24)}`
            : Math.floor((newLeftTime / 60 / 60) % 24)
        let minutes =
          Math.floor((newLeftTime / 60) % 60) < 10
            ? `0${Math.floor((newLeftTime / 60) % 60)}`
            : Math.floor((newLeftTime / 60) % 60)
        let seconds =
          Math.floor(newLeftTime % 60) < 10 ? `0${Math.floor(newLeftTime % 60)}` : Math.floor(newLeftTime % 60)
        setHours(() => hours) //函数写法 设置小时
        setMinutes(() => minutes) //函数写法 设置分钟
        setSeconds(() => seconds) //函数写法保证值在setInterval里更新，避免useEffect的bug
        setDays(() => day)
      }, 1000)
    } else {
      setLeftTime(0)
      setHours(0)
      setMinutes(0)
      setSeconds(0)
      setDays(0)
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) //不传依赖

  return (
    <>
      {leftTime <= 0 && <span>-</span>}
      {leftTime > 0 && (
        <span>
          {d > 0 ? (i18n.language === 'zh' ? `${d} 天 ${h}:${m}:${s}` : `${d} Day ${h}:${m}:${s}`) : `${h}:${m}:${s}`}
        </span>
      )}
    </>
  )
}

export default CountDown
