import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { PKSTotal } from '../../pages/H5/styles'
import COMBUSTION_1 from '../../assets/images/combustion_1.png'
import { useSelector } from 'react-redux'
import { useCombustionHooks, useCombustionListHooks } from '../../hooks/useCombustionHooks'
import H5_DATACENTER_BACKGROUND from '../../assets/images/H5_dataCenter_background.png'
import { toolFromWei } from '../../utils/tool'

const PKSDetailsMaskWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(21, 27, 30, 0.93);
  z-index: 1111;
  .detailsVoting {
    font-size: 28px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #eaeaea;
    display: flex;
    p {
      width: 200px;
    }
  }
`

const ProposalReturn = styled.div`
  width: 150px;
  height: 60px;
  border: 1px solid #1f4b57;
  border-radius: 30px;
  font-size: 28px;
  font-weight: 400;
  color: #35dddb;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 25px;
  right: 27px;
  cursor: pointer;
`
const Content = styled.div`
  width: 689px;
  margin-left: calc(50% - 349px);
  height: 80vh;
  background: url(${H5_DATACENTER_BACKGROUND}) no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  margin-top: 164px;
  padding: 50px;
  position: relative;
`

const TabbleList = styled.div`
  width: 600px;
  height: 760px;
  border: 1px solid #1dc9ca;
  margin-top: 52px;
  margin-left: calc(50% - 300px);
  span {
    width: 33.33%;
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    color: #eaeaea;
  }
`
const TabbleTops = styled.div`
  height: 80px;
  background: #084a53;
  border-bottom: 1px solid #1dc9ca;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TabbleConter = styled.div`
  height: 92px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(8, 74, 83, 0.16);
  position: relative;
`

const TabbleConterDiv = styled.div`
  height: calc(100% - 80px);
  overflow: hidden;
  overflow-y: scroll;
  /* for Chrome */
  ::-webkit-scrollbar {
    display: none;
  }
`

export const CurrentTabble = styled.div`
  width: 65px;
  height: 36px;
  background: url(${COMBUSTION_1}) no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
  color: #fcab0e;
  position: absolute;
  left: calc(17% + 20px);
`

export default memo(function PKSListMaskPages({
  setChatDetails,
  activeList,
  isTrue,
  defaultValue,
}: {
  setChatDetails: () => void
  activeList: 'round' | 'my'
  isTrue: boolean
  defaultValue: any
}) {
  const { t } = useTranslation()
  const myAddress = useSelector((state: any) => state.userInfo.address)

  const { roundList, userRoundList } = useCombustionHooks({ myAddress, isTrue })
  const { totalShares, userTotalShare } = useCombustionListHooks({ myAddress, isTrue })

  return (
    <PKSDetailsMaskWrapper>
      <ProposalReturn onClick={setChatDetails}>{t('voting_return')}</ProposalReturn>
      <Content>
        <PKSTotal>
          <span>{activeList === 'round' ? t('combustion.list.title1') : t('combustion.list.title2')}</span>
          {activeList === 'round' ? toolFromWei(totalShares) : toolFromWei(userTotalShare)}
        </PKSTotal>
        <TabbleList>
          <TabbleTops>
            <span>{t('combustion.list.top1')}</span>
            <span>{activeList === 'round' ? t('combustion.list.top2') : t('combustion.list.top2_1')}</span>
            <span>{t('combustion.list.top5')}</span>
            {activeList === 'my' && <span>{t('combustion.list.top3')}</span>}
          </TabbleTops>
          <TabbleConterDiv>
            {activeList === 'round' &&
              roundList
                .filter((item) => {
                  return item.round === Number(defaultValue)
                })
                .sort((a: any, b: any) => {
                  return b.key - a.key
                })
                .map((item, i) => (
                  <TabbleConter key={item.key}>
                    <span>{i + 1}</span>
                    <span>{toolFromWei(item.number)}</span>
                    <span>{item.times}</span>
                    {item.isTrue && <CurrentTabble>{t('combustion.list.top4')}</CurrentTabble>}
                  </TabbleConter>
                ))}
            {activeList === 'my' &&
              userRoundList
                .filter((item) => {
                  return item.round === Number(defaultValue)
                })
                .sort((a: any, b: any) => {
                  return b.key - a.key
                })
                .map((item, i) => (
                  <TabbleConter key={item.key}>
                    <span>{i + 1}</span>
                    <span>{toolFromWei(item.number)}</span>
                    <span>{item.time}</span>
                    <span>{item.times}</span>
                    {/* {item.isTrue && <CurrentTabble>{t('combustion.list.top4')}</CurrentTabble>} */}
                  </TabbleConter>
                ))}
          </TabbleConterDiv>
        </TabbleList>
      </Content>
    </PKSDetailsMaskWrapper>
  )
})
