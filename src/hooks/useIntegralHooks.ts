import axios from 'axios'
import { useEffect, useState } from 'react'
import { IP_URL } from '../contracts/constant'

export interface listType {
  address: string
  name: string
  rankSeq: number
  seasonId: number
  value: number
}

export interface newlistType {
  mindAddress: string
  mineName: string
  rankSeq: number
  value: number
}

export function useIntegralHooks(seasonId: number) {
  const [integralList, setIntegralList] = useState<listType[]>([])

  useEffect(() => {
    axios
      .post(`${IP_URL}api/burn/pspoints`, {
        loginAddress: 'admin',
        seasonId,
        page: 1,
      })
      .then(function (res) {
        let number = Math.ceil(res.data.Data.totalCount / 20)
        if (number > 1) {
          GetList(number)
        } else {
          if (res.data.Data.list !== undefined) setIntegralList(res.data.Data.list)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seasonId])

  const GetList = async (number: any) => {
    let lists = []
    for (let i = 1; i <= number; i++) {
      let res = await axios.post(`${IP_URL}api/pspoints`, {
        loginAddress: '0xbEe5b9859B03FEefd5Ae3ce7C5d92f3b09a55149',
        seasonId,
        page: i,
      })
      if (res.data.Code === 0 && res.data.Data.list) {
        lists.push(...res.data.Data.list)
      }
    }
    setIntegralList(lists)
  }

  return { integralList }
}
