import React, { useState } from 'react'
import styled from 'styled-components'
import { BaseColorBg, HelpWapper } from '../help'
import Destruction_base from '../../assets/images/Destruction_base.png'
import Destruction_base_1 from '../../assets/images/Destruction_base_1.png'
import Destruction_bg from '../../assets/images/Destruction_bg.png'
import Destruction_number_bg from '../../assets/images/Destruction_number_bg.png'
import Destruction_ranking from '../../assets/images/Destruction_ranking.png'
import Destruction_ranking_1 from '../../assets/images/Destruction_ranking_1.png'

import DestructionEcharts from '../../components/DestructionEcharts'
import LiftState from '../../components/LiftState'
import ScrollText from '../../components/ScrollText'
import { Modelback, ModelInfo, ModelStyles, ModelTitle } from '../public'
import { useTranslation } from 'react-i18next'
import {
  useDestructionBlockHooks,
  useDestructionChartHooks,
  useDestructionRankingHooks,
} from '../../hooks/useDestructionHooks'
import axios from 'axios'
import { IP_URL } from '../../contracts/constant'
import Tips from '../../components/Tips'
import AppBottom from '../../components/AppBottom'

const DestructionWapper = styled.div`
  position: relative;
  width: 100%;
`

const DestructionStyles = styled.div`
  width: 100%;
  height: 600px;
  box-sizing: border-box;
  padding: 50px 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const LeftStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 220px;
  height: 300px;
`
const ChooseActivity = styled.div<{ active: boolean }>`
  width: 198px;
  height: 85px;
  background: ${({ active }) =>
    active ? `url(${Destruction_base_1}) no-repeat center` : `url(${Destruction_base}) no-repeat center`};
  background-size: 100%;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #bdd2d1;
  line-height: 85px;
  text-align: center;
  cursor: pointer;
`
const RightStyles = styled.div`
  width: 700px;
  height: 510px;
  background: url(${Destruction_bg}) no-repeat center;
  background-size: 100%;
  box-sizing: border-box;
  padding: 30px;
  margin-top: 60px;
  margin-left: 30px;
`

const QueryDestruction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const TitleStyles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  h4 {
    display: block;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #a7cbcf;
    line-height: 72px;
    margin-right: 30px;
  }
`
const Total = styled.h2`
  font-size: 48px;
  font-weight: bold;
  color: #02feff;
  line-height: 54px;
  text-shadow: 0px 5px 2px rgba(0, 0, 0, 0.5);
  background: linear-gradient(90deg, #06dfff 30%, #b764fd 40%, #3ccaff 100%, #03feff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
export const TotalNumberBg = styled.div`
  width: 396px;
  height: 28px;
  background: url(${Destruction_number_bg}) no-repeat center;
  background-size: 100%;
  margin-bottom: 20px;
  margin-top: -10px;
`
const ChooseTimeStyles = styled.div`
  width: 450px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const ChooseTimeButton = styled.button<{ active: boolean }>`
  width: 66px;
  height: 34px;
  background: ${({ active }) =>
    active ? `linear-gradient(13deg, rgba(12, 226, 255, 0.32), rgba(27, 255, 236, 0.32))` : 'transparent'};
  color: #bdd2d1;
  cursor: pointer;
`
const EducationStyles = styled.div`
  width: 400px;
  height: 70px;
  border: 1px solid #15fcfd;
  margin-top: -55px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
  h4 {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #a7cbcf;
  }
`
const EducationNumber = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 30px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #15fcfd;
  line-height: 70px;
  span {
    margin-left: 10px;
  }
`
const BlockDestruction = styled.div``
const BlockTitleStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 15px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #a7cbcf;
  line-height: 59px;
  p:nth-child(1) {
    width: 40%;
  }
  p:nth-child(2) {
    width: 25%;
  }
  p:nth-child(3) {
    width: 35%;
  }
`
const BlockList = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #bdd2d1;
  line-height: 60px;
  border-top: 1px solid #1a2e38;
  p:nth-child(1) {
    width: 40%;
  }
  p:nth-child(2) {
    width: 25%;
    color: #15fdfe;
  }
  a {
    width: 35%;
    color: #bdd2d1;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
      color: #15fdfe;
    }
  }
`
const RankingDestruction = styled.div`
  box-sizing: border-box;
  padding: 0 15px;
`
const RankingTitleStyles = styled.div``
const TitleColor = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  span {
    width: 5px;
    height: 18px;
    background: #1ce5e5;
    border-radius: 2px;
    margin-right: 5px;
  }
  p {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #a7cbcf;
    line-height: 59px;
  }
`
const RankingCenter = styled.div`
  display: flex;
  flex-direction: row;
`
const RankingTimeStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
const RankingTimeBtn = styled.div<{ active: boolean }>`
  font-size: 14px;
  font-family: Microsoft YaHei;
  line-height: 60px;
  color: ${({ active }) => (active ? `#16D6D8` : '#BDD2D1')};
  border-right: ${({ active }) => (active ? `1px solid #16D6D8` : '1px solid #1C3640')};
  padding: 0 30px 0 30px;
  cursor: pointer;
`
const RankingData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 50px;
`
const RankingList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`
const RankingText = styled.div<{ active: boolean }>`
  width: 320px;
  height: 65px;
  background: ${({ active }) =>
    active ? `url(${Destruction_ranking_1}) no-repeat center` : `url(${Destruction_ranking}) no-repeat center`};
  background-size: 100%;
  margin-left: 15px;
  position: relative;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #fcf8ff;
  line-height: 65px;
  text-align: center;
  cursor: pointer;
`
const RankingNumber = styled.div`
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #1dfefe;
  position: absolute;
  top: 2px;
  left: 15px;
`
const ModelText = styled.div`
  padding: 30px 60px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #bdd2d1;
  line-height: 70px;
  a {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #bdd2d1;
  }
`

export default function Destruction() {
  const { t } = useTranslation()

  const [chooseId, setChooseId] = useState<number>(0)
  const [chooseBtnId, setChooseBtnId] = useState<number>(24)
  const [rankingBtnId, setRankingBtnId] = useState<number>(24)
  const [rankingTextId, setRankingTextId] = useState<number>(0)

  const [isOpen, setIsOpen] = useState(false)

  const [pkDetail, setPkDetail] = useState({
    blockNumber: '',
    contractAddress: '',
    hash: '',
    kindTotalCount: '',
    value: '',
  })

  const { totalCount, kindTotalCount, rate, isRise, setPkChartTips, pkChartTips } = useDestructionChartHooks(
    chooseBtnId,
    6,
  )

  const { blockList, blockListTips, setBlockListTips } = useDestructionBlockHooks()

  const { rankList, rankListTips, setRankListTips } = useDestructionRankingHooks(rankingBtnId)

  const getKindName = (kind: number) => {
    if (kind === 1) {
      return t('destruction_2')
    } else if (kind === 2) {
      return t('destruction_3')
    } else if (kind === 3) {
      return t('destruction_4')
    } else if (kind === 4) {
      return t('destruction_5')
    } else if (kind === 5) {
      return t('destruction_0')
    }
  }

  const rankingTextClick = (kind: number) => {
    setRankingTextId(kind)
    setIsOpen(true)
    axios
      .post(`${IP_URL}api/burn/pkdetail`, {
        address: 'admin',
        kind: kind,
      })
      .then(function (res) {
        console.log(res)
        setPkDetail(res.data.Data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div style={{ width: '100vw' }}>
      <DestructionWapper>
        <div style={{ marginTop: '-50px' }}>
          <HelpWapper>
            <DestructionStyles>
              <LeftStyles>
                <ChooseActivity active={chooseId === 0} onClick={() => setChooseId(0)}>
                  {t('destruction_title_0')}
                </ChooseActivity>
                <ChooseActivity active={chooseId === 1} onClick={() => setChooseId(1)}>
                  {t('destruction_title_1')}
                </ChooseActivity>
                <ChooseActivity active={chooseId === 2} onClick={() => setChooseId(2)}>
                  {t('destruction_title_2')}
                </ChooseActivity>
              </LeftStyles>
              <RightStyles>
                {(() => {
                  if (chooseId === 0) {
                    return (
                      <QueryDestruction>
                        <TitleStyles>
                          <h4>{t('destruction_title_3')}:</h4>
                          <Total>{totalCount} PK</Total>
                        </TitleStyles>
                        <TotalNumberBg />
                        <ChooseTimeStyles>
                          <ChooseTimeButton active={chooseBtnId === 6} onClick={() => setChooseBtnId(6)}>
                            6h
                          </ChooseTimeButton>
                          <ChooseTimeButton active={chooseBtnId === 12} onClick={() => setChooseBtnId(12)}>
                            12h
                          </ChooseTimeButton>
                          <ChooseTimeButton active={chooseBtnId === 24} onClick={() => setChooseBtnId(24)}>
                            24h
                          </ChooseTimeButton>
                          <ChooseTimeButton active={chooseBtnId === 168} onClick={() => setChooseBtnId(168)}>
                            7d
                          </ChooseTimeButton>
                          <ChooseTimeButton active={chooseBtnId === 720} onClick={() => setChooseBtnId(720)}>
                            30d
                          </ChooseTimeButton>
                          <ChooseTimeButton active={chooseBtnId === 99} onClick={() => setChooseBtnId(99)}>
                            all
                          </ChooseTimeButton>
                        </ChooseTimeStyles>
                        <DestructionEcharts seriesData={kindTotalCount} size={true} />
                        <EducationStyles>
                          <h4>{t('destruction_title_4')}:</h4>
                          <EducationNumber>
                            <LiftState type={isRise} />
                            <span>{rate} PK/min</span>
                          </EducationNumber>
                        </EducationStyles>
                      </QueryDestruction>
                    )
                  }
                  if (chooseId === 1) {
                    return (
                      <BlockDestruction>
                        <BlockTitleStyles>
                          <p>{t('destruction_title_1')}</p>
                          <p>{t('destruction_title_5')}</p>
                          <p>{t('destruction_title_2')}</p>
                        </BlockTitleStyles>
                        <ScrollText>
                          {blockList.length > 0 &&
                            blockList.map((item, index) => {
                              return (
                                <BlockList key={index}>
                                  <p>block#{item.block}</p>
                                  <p>{item.value} PK</p>
                                  <a href={`https://bscscan.com/tx/${item.hash}`}>{item.hash}</a>
                                </BlockList>
                              )
                            })}
                        </ScrollText>
                      </BlockDestruction>
                    )
                  } else {
                    return (
                      <RankingDestruction>
                        <RankingTitleStyles>
                          <TitleColor>
                            <span></span>
                            <p>{t('destruction_title_2')}</p>
                          </TitleColor>
                        </RankingTitleStyles>
                        <RankingCenter>
                          <RankingTimeStyles>
                            <RankingTimeBtn active={rankingBtnId === 6} onClick={() => setRankingBtnId(6)}>
                              6h
                            </RankingTimeBtn>
                            <RankingTimeBtn active={rankingBtnId === 12} onClick={() => setRankingBtnId(12)}>
                              12h
                            </RankingTimeBtn>
                            <RankingTimeBtn active={rankingBtnId === 24} onClick={() => setRankingBtnId(24)}>
                              24h
                            </RankingTimeBtn>
                            <RankingTimeBtn active={rankingBtnId === 168} onClick={() => setRankingBtnId(168)}>
                              7d
                            </RankingTimeBtn>
                            <RankingTimeBtn active={rankingBtnId === 720} onClick={() => setRankingBtnId(720)}>
                              30d
                            </RankingTimeBtn>
                            <RankingTimeBtn active={rankingBtnId === 99} onClick={() => setRankingBtnId(99)}>
                              all
                            </RankingTimeBtn>
                          </RankingTimeStyles>
                          <RankingData>
                            {rankList.length > 0 &&
                              rankList.map((item, index) => {
                                return (
                                  <RankingList key={index}>
                                    <LiftState type={item.isRise} />
                                    <RankingText
                                      active={rankingTextId === item.kind}
                                      onClick={() => rankingTextClick(item.kind)}
                                    >
                                      <RankingNumber>{index + 1}</RankingNumber>
                                      <p>{getKindName(item.kind)}</p>
                                    </RankingText>
                                  </RankingList>
                                )
                              })}
                          </RankingData>
                        </RankingCenter>
                      </RankingDestruction>
                    )
                  }
                })()}
              </RightStyles>
            </DestructionStyles>
            {isOpen && (
              <ModelStyles>
                <ModelInfo>
                  <ModelTitle>{getKindName(rankingTextId)}</ModelTitle>
                  <Modelback onClick={() => setIsOpen(false)}>{t('back')}</Modelback>
                  <ModelText>
                    <p>
                      {t('destruction_6')} {pkDetail.blockNumber ? pkDetail.blockNumber : '0'}
                    </p>
                    <p>
                      {t('destruction_7')}{' '}
                      <a href={`https://bscscan.com/address/${pkDetail.contractAddress}`}>
                        {pkDetail.contractAddress ? pkDetail.contractAddress : '0x00....0000'}
                      </a>
                    </p>
                    <p>
                      {t('destruction_8')} {pkDetail.value}
                    </p>
                    <p>
                      {t('destruction_9')} {pkDetail.kindTotalCount}
                    </p>
                    <p>
                      {t('destruction_10')}{' '}
                      <a href={`https://bscscan.com/tx/${pkDetail.hash}`}>
                        {pkDetail.hash ? pkDetail.hash : '0x00....0000'}
                      </a>
                    </p>
                  </ModelText>
                </ModelInfo>
              </ModelStyles>
            )}
          </HelpWapper>
        </div>
        <BaseColorBg style={{ position: 'fixed' }} />
      </DestructionWapper>
      {pkChartTips !== '' && chooseId === 0 && (
        <Tips
          title={pkChartTips}
          closeTips={() => {
            setPkChartTips('')
          }}
        />
      )}
      {blockListTips !== '' && chooseId === 1 && (
        <Tips
          title={blockListTips}
          closeTips={() => {
            setBlockListTips('')
          }}
        />
      )}
      {rankListTips !== '' && chooseId === 2 && (
        <Tips
          title={rankListTips}
          closeTips={() => {
            setRankListTips('')
          }}
        />
      )}
      <AppBottom link="/destruction" />
    </div>
  )
}
