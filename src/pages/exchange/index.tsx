import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import leftsort from '../../assets/images/leftsort.png'
import wenhao from '../../assets/images/wenhao.png'
import button_exchange from '../../assets/images/button_exchange.png'
import btn1 from '../../assets/images/btn1.png'
import btn2 from '../../assets/images/btn2.png'
import { useTranslation } from 'react-i18next'
import AppBottom from '../../components/AppBottom'
import { IN_Contract, EX_Contract } from '../../contracts'
import { bagAnalysis, getPokerName } from '../../utils/common'
import { pokerFiReedem_address } from '../../contracts/constant'
import { useWallet } from 'use-wallet'
import { SaveAddress } from '../../store/user/action'
import { useSelector, useDispatch } from 'react-redux'

declare const window: any

const ExchangeWapper = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  zoom: ${window.screen.width / 1920};
`

const ExchangeContent = styled.div`
  width: 1064px;
  height: 838px;
  background: url(${leftsort}) no-repeat;
  background-size: 100% 100%;
  margin-left: calc(50% - 532px);
  position: relative;
  z-index: 1111;
`
const ExchangeTitle = styled.div`
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #1ac5e0;
  line-height: 24px;
  position: absolute;
  top: 185px;
  left: 145px;
`

const ExchangeBg = styled.div`
  width: 244px;
  height: 380px;
  background: url(${wenhao}) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 250px;
  left: 132px;
`

const NewCard = styled.img`
  width: 100%;
  height: 100%;
`

const ExchangeBtn = styled.div`
  width: 217px;
  height: 67px;
  background: url(${button_exchange}) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 645px;
  left: 140px;
  text-align: center;
  line-height: 67px;
  font-size: 30px;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
`

const ExchangeTable = styled.div`
  position: absolute;
  top: 200px;
  left: 434px;
  width: 602px;
`

const ContentHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
`

const Tags = styled.div`
  width: calc(100% - 110px);
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
`

const TagsItem = styled.div`
  width: 115px;
  height: 48px;
  background-image: url(${btn2});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  line-height: 43px;
  text-align: center;
  color: #64a9bd;
  font-size: 18px;
  cursor: pointer;
  &.active {
    background-image: url(${btn1});
    color: #ffffff;
  }
`

const ItemSpan = styled.span`
  font-size: 24px;
`

const ChooseCount = styled.div`
  line-height: 48px;
  text-align: center;
  padding: 0 10px;
  font-size: 16px;
  color: #30949f;
`

const Count = styled.span`
  color: #f4a53b;
`

const CardContent = styled.div`
  padding: 0 10px 10px;
  width: 100%;
  height: 440px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`

const CardItem = styled.div`
  width: calc((100% - 60px) / 4);
  padding: 10px;
  height: 214px;
  background: #1c2a35;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  &.active {
    background: #413618;
  }
`

const CardImg = styled.img`
  width: 100%;
`

const ZhanWei = styled.div`
  width: calc((100% - 60px) / 4);
`

const NoData = styled.div`
  font-size: 18px;
  color: #eaeaea;
  text-align: center;
  padding: 150px 0;
  flex: 1;
  opacity: 0.8;
`

export default function Exchange() {
  const wallet = useWallet()
  const activate = (connector: 'injected' | 'walletconnect') => wallet.connect(connector)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [choose, setChoose] = useState(0)
  const myAddress = useSelector((state: any) => state.userInfo.address)
  const [current, setCurrent] = useState(2)
  const [allCard, setAllCard] = useState<any[]>()
  const [cardList, setCardList] = useState<any[]>()
  const [newCard, setNewCard] = useState<any[]>()
  const [cardTab] = useState([
    {
      index: 1,
      value: 2,
    },
    {
      index: 1,
      value: 3,
    },
    {
      index: 1,
      value: 4,
    },
    {
      index: 1,
      value: 5,
    },
  ])

  useEffect(() => {
    if (allCard) {
      let a = allCard?.filter((item1) => {
        const result = ((item1.tokenId % 1000) - (item1.tokenId % 10)) / 10
        return result === current
      })
      setCardList(a)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCard])

  useEffect(() => {
    init()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myAddress])

  const init = async () => {
    if (myAddress) {
      let data = await IN_Contract.methods.balanceOf(myAddress).call()
      if (data > 0) {
        let dataArr = await IN_Contract.methods.ownedTokens(myAddress, 0, data).call()
        if (dataArr) {
          setAllCard(bagAnalysis(dataArr))
        }
      }
    }
  }

  const injectedClick = () => {
    try {
      const chainId = window.ethereum.networkVersion
      // eslint-disable-next-line eqeqeq
      if (chainId == wallet.chainId) {
        activate('injected')
        window.ethereum.on('accountsChanged', function (accounts: any[]) {
          if (accounts.length > 0) {
            dispatch(SaveAddress(accounts[0]))
          }
        })
      } else {
        alert('Network node link error!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const chooseCard = (i: number) => {
    try {
      setCardList((card) => {
        let newCounts = JSON.parse(JSON.stringify(card))
        newCounts[i].isChoose = !newCounts[i].isChoose
        let count = newCounts.filter((item: any) => {
          return item.isChoose
        })
        setChoose(count.length)
        if (count.length > 3) {
          newCounts[i].isChoose = !newCounts[i].isChoose
          alert(t('tips4'))
          return newCounts
        }
        return newCounts
      })
    } catch (error) {
      console.log(error)
    }
  }

  const exchange = async () => {
    if (!myAddress) {
      injectedClick()
      return
    }
    const list: any[] = []
    cardList?.forEach((item) => {
      if (item.isChoose) {
        list.push(parseInt(item.tokenId))
      }
    })
    if (list.length === 0) {
      alert(t('tips1'))
      return
    }
    if (list.length !== 3) {
      alert(t('tips2'))
      return
    }
    let data = await IN_Contract.methods.isApprovedForAll(myAddress, pokerFiReedem_address).call()
    if (!data) {
      await IN_Contract.methods.setApprovalForAll(pokerFiReedem_address, true).send({ from: myAddress })
    }

    EX_Contract.methods
      .redeem(list)
      .send({ from: myAddress })
      .on('transactionHash', function (hash: string) {
        // console.log('hash', hash)
      })
      .on('receipt', async function (receipt: any) {
        let arr = []
        arr.push(receipt.events.Redeemed.returnValues.newTokenId)
        if (arr) {
          setNewCard(bagAnalysis(arr))
          setChoose(0)
          init()
          alert(t('tips3'))
        }
      })
      .on('confirmation', function (confirmationNumber: any, receipt: any) {
        // console.log(receipt, confirmationNumber)
      })
      .on('error', function (err: any) {
        console.log(err)
      })
  }

  return (
    <ExchangeWapper>
      <ExchangeContent>
        <ExchangeTitle>
          <span>{t('exchange_title')}</span>
        </ExchangeTitle>
        <ExchangeBg>{newCard && <NewCard src={getPokerName(newCard[0].value, newCard[0].huase)} />}</ExchangeBg>
        <ExchangeBtn onClick={exchange}>{myAddress ? t('exchange') : t('exchangeLogin')}</ExchangeBtn>
        <ExchangeTable>
          <ContentHeader>
            <Tags>
              {cardTab.map((item: any) => {
                return (
                  <TagsItem
                    className={item.value === current ? 'active' : ''}
                    key={item.value}
                    onClick={() => {
                      setCurrent(item.value)
                      let a = allCard?.filter((item1) => {
                        const result = ((item1.tokenId % 1000) - (item1.tokenId % 10)) / 10
                        return result === item.value
                      })
                      setCardList(a)
                    }}
                  >
                    {t('card')}
                    <ItemSpan>{item.value}</ItemSpan>
                  </TagsItem>
                )
              })}
            </Tags>
            <ChooseCount>
              {t('choose')}：<Count>{choose > 3 ? 3 : choose}</Count>
            </ChooseCount>
          </ContentHeader>
          {cardList?.length ? (
            <CardContent>
              {cardList.map((item, i) => {
                return (
                  <CardItem
                    className={item.isChoose ? 'active' : ''}
                    key={item.tokenId}
                    onClick={() => {
                      chooseCard(i)
                    }}
                  >
                    <CardImg src={getPokerName(item.value, item.huase)} />
                  </CardItem>
                )
              })}
              <ZhanWei></ZhanWei>
              <ZhanWei></ZhanWei>
              <ZhanWei></ZhanWei>
              <ZhanWei></ZhanWei>
            </CardContent>
          ) : (
            <CardContent>
              <NoData>{t('nodata')}</NoData>
            </CardContent>
          )}
        </ExchangeTable>
      </ExchangeContent>
      <AppBottom link="/exchange" />
    </ExchangeWapper>
  )
}
