import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import integral_background from '../../assets/images/integral_background.png'
import integral_content_bg from '../../assets/images/integral_content_bg.png'
import integral_list_active from '../../assets/images/integral_list_active.png'
import integral_list from '../../assets/images/integral_list.png'
import integral_right from '../../assets/images/integral_right.png'
import integral_right_active from '../../assets/images/integral_right_active.png'
import right_icon from '../../assets/images/integral_left_icon.png'
import session_1 from '../../assets/images/session_1.png'
import session_2 from '../../assets/images/session_2.png'
import { useTranslation } from 'react-i18next'
import { pointsSeason, currentTimeText } from '../../utils'
import { useIntegralHooks } from '../../hooks/useIntegralHooks'
import type { listType } from '../../hooks/useIntegralHooks'
import AppBottom from '../../components/AppBottom'
import moment from 'moment'
import { Modal } from 'antd'
import { IP_URL } from '../../contracts/constant'

const IntegralWapper = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  zoom: ${window.screen.width / 1920};
`

const IntegralBg = styled.div`
  width: 100%;
  height: 100%;
  background: url(${integral_background}) no-repeat;
  background-size: 100% 100%;
  position: fixed;
  bottom: 0;
`

const IntegralContent = styled.div`
  width: 1064px;
  height: 808px;
  background: url(${integral_content_bg}) no-repeat;
  background-size: 100% 100%;
  margin-left: calc(50% - 532px);
  position: relative;
  z-index: 1111;
`

const IntegralTitle = styled.div`
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 700;
  color: #09454d;
  line-height: 24px;
  text-stroke: 2px #000000;
  position: absolute;
  top: 140px;
  left: 95px;
  text-shadow: 0 0 0.2em #1cfefe, -0 -0 0.2em #86f8ff, -0 -0 0.2em #86ffe4;
`

const StartTime = styled.div`
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #1cfefe;
  line-height: 27px;
  position: absolute;
  top: 156px;
  left: 503px;
`

const NewTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const NewTableTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
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

const NewTableList = styled.div`
  width: 100%;
  height: 63px;
  background: ${`url(${integral_list}) no-repeat`};
  background-size: 100% 100%;
  margin-bottom: 12.6px;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const IntegralTable = styled.div`
  position: absolute;
  top: 200px;
  left: 434px;
  width: 602px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TableTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
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
    width: calc(33% - 43px);
    padding-left: 43px;
  }
`

const TableList = styled.div<{ active: boolean }>`
  width: 563px;
  height: 63px;
  background: ${({ active }) =>
    active ? `url(${integral_list_active}) no-repeat` : `url(${integral_list}) no-repeat`};
  background-size: 100% 100%;
  margin-bottom: 12.6px;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const ListInfoSort = styled.div`
  width: calc(33% - 23px);
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #4ddfff;
  margin-left: 23px;
  line-height: 23px;
`

const ListInfoName = styled.div<{ active: boolean }>`
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

const NewListInfoName = styled.div`
  width: 33%;
  text-align: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #4ddfff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ListInfoPsNumber = styled.div<{ active: boolean }>`
  width: 33%;
  text-align: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: ${({ active }) => (active ? '#117D94' : '#4DDFFF')};
`

const NewListInfoPsNumber = styled.div`
  width: 33%;
  text-align: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #4ddfff;
`

const TableOneName = styled.div`
  position: absolute;
  left: -230px;
  top: 95px;
  width: 90px;
  line-height: 25px;
  text-align: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const TableOnePsNumber = styled.div`
  position: absolute;
  left: -225px;
  top: 185px;
  width: 85px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #185d6d;
    line-height: 23px;
  }
  .integral {
    width: 28.8px;
    height: 28.8px;
    background: #3fcfda;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 12px;
  }
`

const TableTwoName = styled.div`
  position: absolute;
  left: -305px;
  top: 227px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.35);
  width: 60px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const TableTwoPsNumber = styled.div`
  position: absolute;
  left: -295px;
  top: 277px;
  width: 70px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #185d6d;
    line-height: 23px;
  }
  .integral {
    width: 28.8px;
    height: 28.8px;
    background: #3fcfda;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 12px;
  }
`

const TableThreeName = styled.div`
  position: absolute;
  left: -125px;
  top: 224px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.35);
  width: 60px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const TableThreePsNumber = styled.div`
  position: absolute;
  left: -140px;
  top: 277px;
  width: 70px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #185d6d;
    line-height: 23px;
  }
  .integral {
    width: 28.8px;
    height: 28.8px;
    background: #3fcfda;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 12px;
  }
`

const IntegralRight = styled.div`
  position: absolute;
  right: calc(50% - 582px);
  top: 204.8px;
`

const RightListInfo = styled.div<{ active: boolean }>`
  width: 72.9px;
  height: 77.04px;
  background: ${({ active }) =>
    active ? `url(${integral_right_active}) no-repeat` : `url(${integral_right}) no-repeat`};
  background-size: 100% 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: ${({ active }) => (active ? '#ffffff' : '#3E9EBB')};
  margin-bottom: 14px;
  position: relative;
  z-index: 11;
  cursor: pointer;
`

const RightIcon = styled.img`
  margin-top: 6px;
  width: 15px;
  height: 9px;
`

const SessionShow = styled.div`
  position: absolute;
  top: 492px;
  right: 50px;
  z-index: 22222;
  max-width: 780px;
  max-height: 198.9px;
  background: #224c5d;
  border: 1px solid #1afdee;
  box-shadow: 0px 0px 2px 0px rgba(30, 32, 50, 0.18), 0px 0px 4px 0px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 31.5px 23px;
  padding-right: 0;
  overflow: hidden;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  -ms-overflow-style: none; /* IE 10+ */
  scrollbar-width: none; /* Firefox */
`

const SessionShowInfo = styled.div<{ active: boolean }>`
  width: 106px;
  height: 52px;
  background: ${({ active }) => (active ? `url(${session_2}) no-repeat` : `url(${session_1}) no-repeat`)};
  background-size: 100% 100%;
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: ${({ active }) => (active ? '#FFFFFF' : '#3E9EBB')};
  cursor: pointer;
  margin-right: 23px;
  margin-bottom: 17px;
  text-align: center;
`

const TableContent = styled.div`
  width: 100%;
  max-height: 450px;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`

const FooterBtn = styled.div`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`

const NoData = styled.div`
  padding: 20px;
  font-size: 18px;
  color: #eaeaea;
  text-align: center;
`

export interface newlistType {
  mindAddress: string
  mineName: string
  rankSeq: number
  value: number
}

export default function Integral() {
  const { CURRENT_SEASON, CURRENT_SEASON_DAYS, CURRENT_SEASON_NAME, CURRENT_SEASON_END_TIME } = currentTimeText()
  const [activeNumber, setActiveNumber] = useState<number>(3)

  const [sessionList] = useState<{ id: number; name: string }[]>(pointsSeason())
  const [activeSession, setActiveSession] = useState<number>(CURRENT_SEASON)
  const [activeSessionShow, setActiveSessionShow] = useState<boolean>(false)

  const { integralList } = useIntegralHooks(activeSession)

  const { t, i18n } = useTranslation()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalName, setModalName] = useState('')
  const [dataSource, setDataSource] = useState<{
    data: newlistType[]
    total: number
  }>({
    data: [],
    total: 0,
  })

  // const [loading,setLoading] = useState(false)
  /* eslint-disable */
  const checkPs = (item: listType) => {
    setModalName(item.name)
    setIsModalVisible(true)
    // setLoading(true)
    axios
      .post(`${IP_URL}api/burn/psminepoints`, {
        loginAddress: 'admin',
        seasonId: item.seasonId,
        page: 1,
        PoolAddress: item.address,
      })
      .then((res) => {
        // setLoading(false)
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
  /* eslint-enable */
  return (
    <IntegralWapper>
      <IntegralContent>
        <IntegralTitle>
          <span>{t('integral_title')}</span>
        </IntegralTitle>
        <StartTime style={{ fontSize: i18n.language === 'en' ? '12px' : '14px' }}>
          {moment() < moment('2021-11-15 13:00:00')
            ? '预热赛：09月30日10时起，结束时间：2021.11.15 13:00'
            : `${CURRENT_SEASON_NAME}：共10天，第${CURRENT_SEASON_DAYS}天。${t('integral_start_time')}
          ${CURRENT_SEASON_END_TIME}`}
        </StartTime>
        <IntegralTable>
          <TableTitle>
            <span>{t('integral_table_title1')}</span>
            <span>{t('integral_table_title2')}</span>
            <span>{t('integral_table_title3')}</span>
          </TableTitle>
          <TableContent>
            {integralList.map((item: listType, i: number) => {
              return (
                <div key={i}>
                  {i > 2 && (
                    <TableList
                      key={i}
                      active={i === activeNumber}
                      onClick={() => {
                        setActiveNumber(i)
                        // checkPs(item)
                      }}
                    >
                      <ListInfoSort>{i + 1}</ListInfoSort>
                      <ListInfoName active={i === activeNumber}>{item.name}</ListInfoName>
                      <ListInfoPsNumber active={i === activeNumber}>{item.value}</ListInfoPsNumber>
                    </TableList>
                  )}
                  {i === 0 && (
                    <div
                      key={i}
                      // onClick={() => {checkPs(item)}}
                    >
                      <TableOneName>{item.name}</TableOneName>
                      <TableOnePsNumber>
                        <span>{item.value}</span>
                        <div className="integral">{t('integral_tips_name')}</div>
                      </TableOnePsNumber>
                    </div>
                  )}
                  {i === 1 && (
                    <div
                      key={i}
                      // onClick={() => {checkPs(item)}}
                    >
                      <TableTwoName>{item.name}</TableTwoName>
                      <TableTwoPsNumber>
                        <span>{item.value}</span>
                        <div className="integral">{t('integral_tips_name')}</div>
                      </TableTwoPsNumber>
                    </div>
                  )}
                  {i === 2 && (
                    <div
                      key={i}
                      // onClick={() => {checkPs(item)}}
                    >
                      <TableThreeName>{item.name}</TableThreeName>
                      <TableThreePsNumber>
                        <span>{item.value}</span>
                        <div className="integral">{t('integral_tips_name')}</div>
                      </TableThreePsNumber>
                    </div>
                  )}
                </div>
              )
            })}
          </TableContent>
        </IntegralTable>
        {activeSessionShow && (
          <SessionShow onMouseLeave={() => setActiveSessionShow(false)}>
            {sessionList.map((item, i: number) => {
              return (
                <div key={i}>
                  {i >= 4 && (
                    <SessionShowInfo
                      key={i}
                      active={item.id === activeSession}
                      onClick={() => {
                        setActiveSession(item.id)
                        setActiveSessionShow(false)
                      }}
                    >
                      <span>{item.name}</span>
                    </SessionShowInfo>
                  )}
                </div>
              )
            })}
          </SessionShow>
        )}
      </IntegralContent>
      <IntegralBg />
      <IntegralRight>
        {sessionList.map((item, i: number) => {
          return (
            <div key={i}>
              {i < 4 && (
                <RightListInfo
                  key={i}
                  active={item.id === activeSession}
                  onClick={() => {
                    setActiveSession(item.id)
                  }}
                >
                  <span>{item.name}</span>
                </RightListInfo>
              )}
            </div>
          )
        })}
        {sessionList.length > 4 && (
          <RightListInfo
            active={activeSession > 3}
            style={{ flexDirection: 'column' }}
            onMouseEnter={() => {
              setActiveSessionShow(true)
            }}
          >
            <span>更多</span>
            <RightIcon src={right_icon}></RightIcon>
          </RightListInfo>
        )}
      </IntegralRight>
      <AppBottom link="/integral" />
      <Modal
        title={modalName}
        visible={isModalVisible}
        closable={false}
        centered={true}
        className="newModal"
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
                    <NewTableList>
                      <ListInfoSort>{i + 1}</ListInfoSort>
                      <NewListInfoName>{item.mineName}</NewListInfoName>
                      <NewListInfoPsNumber>{item.value}</NewListInfoPsNumber>
                    </NewTableList>
                  </div>
                )
              })}
            {dataSource.total === 0 && <NoData>暂无相关数据</NoData>}
          </TableContent>
        </NewTable>
      </Modal>
    </IntegralWapper>
  )
}
