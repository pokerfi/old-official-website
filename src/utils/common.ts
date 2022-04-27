import { listCard } from './init'
class Card {
  tokenId = ''
  value = -1
  huase = -1
  isChoose = false
}

export const getCard = (tokenId: any) => {
  let card = new Card()
  if (tokenId.length <= 1) {
    return card
  }
  let tokenIdArr = []
  for (let i = tokenId.length - 3; i < tokenId.length; i++) {
    tokenIdArr.push(tokenId[i])
  }
  card.tokenId = tokenId
  card.value = parseInt(tokenIdArr[0] + tokenIdArr[1])
  card.huase = parseInt(tokenIdArr[2])
  card.isChoose = false
  if (card.value === 0 && card.huase > 1) {
    card.huase = 0
  }
  return card
}

export const bagAnalysis = (data: any) => {
  let cards = []
  for (let i = 0; i < data.length; i++) {
    let temp = data['' + i]
    if (typeof temp == 'undefined') {
      temp = '0'
    }
    let tempCard = getCard(temp)
    cards.push(tempCard)
  }
  return cards
}

export const getPokerName = (value: any, house: any) => {
  if (value === 0 && house === 0) {
    return listCard['joker1']
  } else if (value === 0 && house === 1) {
    return listCard['joker2']
  }
  let tempValue = value + 20 * house
  if (tempValue < 10) {
    const card = 'card0' + tempValue
    return listCard[card]
  } else {
    const card = 'card' + tempValue
    return listCard[card]
  }
}
