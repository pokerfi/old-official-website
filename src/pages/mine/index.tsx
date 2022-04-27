import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import help_background from '../../assets/images/help_background.png'
import base_background from '../../assets/images/base_background.png'
import { useTranslation } from 'react-i18next'
import AppBottom from '../../components/AppBottom'
import integral_list_active from '../../assets/images/integral_list_active.png'
import integral_list from '../../assets/images/integral_list.png'
import { currentTimeText } from '../../utils'
import { IP_URL } from '../../contracts/constant'
import { Pagination } from 'antd'

export const BaseColorBg = styled.div`
  width: 80%;
  height: 206px;
  background: url(${base_background}) no-repeat;
  background-size: 100%;
  position: absolute;
  bottom: 0px;
  left: 10%;
  z-index: -10;
  zoom: ${window.screen.width / 1920};
`

export const HelpWapper = styled.div`
  width: 1194px;
  margin-left: calc(50% - 597px);
  /* background: url(${help_background}) no-repeat center; */
  background-size: 85%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
  padding: 100px;
  zoom: ${window.screen.width / 1920};
`

const NewTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #1ac2c4;
  border-radius: 10px;
  padding: 20px 0;
`

const NewTableTitle = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  line-height: 43px;
  span {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 300;
    color: #32a5be;
    width: 33%;
    text-align: center;
  }
  span:nth-child(1) {
    text-align: start;
    width: 33%;
    padding-left: 20px;
  }
`

const NewTableList = styled.div<{ active: boolean }>`
  width: 100%;
  height: 63px;
  background: ${({ active }) =>
    active ? `url(${integral_list_active}) no-repeat` : `url(${integral_list}) no-repeat`};
  background-size: 100% 100%;
  margin-bottom: 12.6px;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const TableContent = styled.div`
  width: 80%;
  max-height: 450px;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`

const ListInfoSort = styled.div`
  width: calc(33% - 23px);
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #4ddfff;
  margin-left: 23px;
  line-height: 23px;
  text-indent: 10px;
`

const NewListInfoName = styled.div<{ active: boolean }>`
  width: 33%;
  text-align: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: ${({ active }) => (active ? '#117D94' : '#4DDFFF')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const NoData = styled.div`
  padding: 20px;
  font-size: 18px;
  color: #eaeaea;
  text-align: center;
`

const NewListInfoPsNumber = styled.div<{ active: boolean }>`
  width: 33%;
  text-align: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: ${({ active }) => (active ? '#117D94' : '#4DDFFF')};
`

const Page = styled.div`
  width: 80%;
  margin: 20px auto;
  text-align: center;
`

export interface newlistType {
  mindAddress: string
  mineName: string
  rankSeq: number
  value: number
}

export default function Mine() {
  const { t } = useTranslation()
  const { CURRENT_SEASON } = currentTimeText()
  const [activeSession] = useState<number>(CURRENT_SEASON)
  const [activeNumber, setActiveNumber] = useState<number>(0)
  const [decurrent, setDecurrent] = useState(1)
  const [dataSource, setDataSource] = useState<{
    data: newlistType[]
    total: number
  }>({
    data: [],
    total: 0,
  })

  useEffect(() => {
    console.log(activeSession)
    if (activeSession) {
      getList(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getList = (pageNumber: number) => {
    axios
      .post(`${IP_URL}api/burn/psminepoints`, {
        loginAddress: 'admin',
        seasonId: activeSession,
        page: pageNumber,
      })
      .then((res) => {
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

  const onChange = (pageNumber: number) => {
    setDecurrent(pageNumber)
    getList(pageNumber)
  }

  return (
    <div style={{ width: '100vw' }}>
      <HelpWapper>
        <NewTable>
          <NewTableTitle>
            <span>{t('integral_table_title1')}</span>
            <span>{t('new_table_title2')}</span>
            <span>{t('new_table_title3')}</span>
          </NewTableTitle>
          <TableContent>
            {dataSource.total !== 0 &&
              dataSource.data.map((item: newlistType, i: number) => {
                return (
                  <div key={i}>
                    <NewTableList
                      active={i === activeNumber}
                      onClick={() => {
                        setActiveNumber(i)
                      }}
                    >
                      <ListInfoSort>{decurrent > 1 ? 20 + i + 1 : i + 1}</ListInfoSort>
                      <NewListInfoName active={i === activeNumber}>{item.mineName}</NewListInfoName>
                      <NewListInfoPsNumber active={i === activeNumber}>{item.value}</NewListInfoPsNumber>
                    </NewTableList>
                  </div>
                )
              })}
            {dataSource.total === 0 && <NoData>暂无相关数据</NoData>}
          </TableContent>
          {dataSource.total > 0 && (
            <Page>
              <Pagination
                defaultCurrent={decurrent}
                current={decurrent}
                pageSize={20}
                total={dataSource.total}
                onChange={onChange}
              />
            </Page>
          )}
        </NewTable>
      </HelpWapper>
      <BaseColorBg />
      <AppBottom link="/mine" />
    </div>
  )
}
