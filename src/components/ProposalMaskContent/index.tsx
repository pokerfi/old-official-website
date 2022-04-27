import React, { useState } from 'react'
import styled from 'styled-components'
import type { ListType } from '../../hooks/useVotingHooks'
import H5_DATACENTER_BACKGROUND from '../../assets/images/H5_dataCenter_background.png'
// import VOTING_BTN_1 from '../../assets/images/voting_btn_1.png'
import VOTING_ICON_1 from '../../assets/images/voting_icon_1.png'
import VOTING_ICON_2 from '../../assets/images/voting_icon_2.png'
import VOTING_ICON_3 from '../../assets/images/voting_icon_3.png'
import VOTING_ICON_4 from '../../assets/images/voting_icon_4.png'
import BUTTON_BG from '../../assets/images/button_bg.png'
import VOTING_BTN_2 from '../../assets/images/voting_btn_2.png'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ContractPokerFiGovernor } from '../../contracts'
import { useVotingProposals } from '../../hooks/useVotingHooks'

const ProposalMaskWapple = styled.div`
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

export const Content = styled.div`
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

// const ContentTitle = styled.div`
//   font-size: 48px;
//   font-family: Microsoft YaHei;
//   font-weight: bold;
//   color: #fcf8ff;
//   width: 80%;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   margin-left: 10%;
//   text-align: center;
//   background: linear-gradient(13deg, #0ce2ff 0%, #1bffec 100%);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   margin-top: 20px;
// `

const ProposalReturn = styled.div`
  width: 150px;
  height: 60px;
  border: 1px solid #1f4b57;
  border-radius: 30px;
  font-size: 28px;
  font-family: Microsoft YaHei;
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

const Line = styled.div`
  width: 535px;
  height: 1px;
  margin-top: 47px;
  margin-bottom: 53px;
  background: rgba(21, 252, 253, 0.53);
  position: absolute;
  ::after {
    content: '';
    position: absolute;
    top: -4.5px;
    left: 0;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #15fcfd;
  }
  ::before {
    content: '';
    position: absolute;
    top: -4.5px;
    right: 0;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #15fcfd;
  }
`

const ContentHtml = styled.div`
  font-size: 24px;
  width: 567px;
  max-height: calc(80vh - 550px);
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #eaeaea;
  line-height: 36px;
  margin-top: 101px;
  overflow: hidden;
  overflow-y: auto;
`

// const ConetntHold = styled.div`
//   width: 600px;
//   height: 90px;
//   margin-top: 48px;
//   margin-bottom: 31px;
//   background: url(${VOTING_BTN_1}) no-repeat;
//   background-size: 100% 100%;
//   font-size: 24px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-family: Microsoft YaHei;
//   font-weight: bold;
//   color: #a7cbcf;
//   span {
//     font-size: 42px;
//     font-family: Microsoft YaHei;
//     font-weight: bold;
//     color: #15fcfd;
//   }
// `

const DetailsBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
`

const BtnLeft = styled.div<{ is_collect_type: number }>`
  min-width: 40%;
  padding: 0 40px;
  height: 87px;
  background: url(${BUTTON_BG}) no-repeat;
  background-size: 100% 100%;
  font-size: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-indent: 38px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
  line-height: 34px;

  margin-bottom: 20px;
  position: relative;
  ::after {
    content: '';
    position: absolute;
    left: 80px;
    top: 27px;
    width: 30px;
    height: 29px;
    background: ${({ is_collect_type }) =>
      is_collect_type === 1 ? `url(${VOTING_ICON_3}) no-repeat` : `url(${VOTING_ICON_1}) no-repeat`};
    background-size: 100% 100%;
  }
`

const BtnRight1 = styled.div<{ is_collect_type: number }>`
  min-width: 40%;
  padding: 0 40px;
  margin-right: 20px;
  height: 87px;
  background: url(${VOTING_BTN_2}) no-repeat;
  background-size: 100% 100%;
  font-size: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-indent: 38px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
  line-height: 34px;
  position: relative;
  margin-bottom: 20px;
`

const BtnRight = styled.div<{ is_collect_type: number }>`
  min-width: 40%;
  padding: 0 40px;
  height: 87px;
  background: url(${VOTING_BTN_2}) no-repeat;
  background-size: 100% 100%;
  font-size: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-indent: 38px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
  line-height: 34px;
  position: relative;
  margin-bottom: 20px;
  ::after {
    content: '';
    position: absolute;
    left: 80px;
    top: 29px;
    width: 30px;
    height: 29px;
    background: ${({ is_collect_type }) =>
      is_collect_type === 2 ? `url(${VOTING_ICON_4}) no-repeat` : `url(${VOTING_ICON_2}) no-repeat`};
    background-size: 100% 100%;
  }
`

export default function ProposalMaskContent({
  data,
  setProposalStatus,
}: {
  data: ListType
  setProposalStatus: () => void
}) {
  console.log('data', data)
  const [isCollectType, setIsCollectType] = useState<number>(0)
  const { t, i18n } = useTranslation()
  const [details] = useState<ListType>(data)

  const { detailsVoting } = useVotingProposals(data.proposalId)

  const myAddress = useSelector((state: any) => state.userInfo.address)

  const collectTypeChange = async (i: number) => {
    let data1 = await ContractPokerFiGovernor.methods.hasVoted(data.proposalId, myAddress).call()
    if (!data1) {
      try {
        setIsCollectType(i)
        const initSupport = [1, 0, 2]
        const proposalId = details.proposalId
        console.log('proposalId', details.proposalId)
        console.log('initSupport[i-1]', initSupport[i - 1])
        let data = await ContractPokerFiGovernor.methods
          .castVote(proposalId, initSupport[i - 1])
          .send({ from: myAddress })
        console.log('vot_data', data)
        if (data) {
          alert(t('voting_tipss'))
          setTimeout(() => {
            setProposalStatus()
          }, 50)
        }
      } catch (error: any) {
        alert(t('voting_tipss_no'))
        console.log('errs', error.message)
      }
    } else {
      alert(t('voting_voted_tips'))
    }
  }

  return (
    <ProposalMaskWapple>
      <ProposalReturn onClick={setProposalStatus}>{t('voting_return')}</ProposalReturn>
      <Content>
        {/* <ContentTitle>{details.description}</ContentTitle> */}
        <Line />
        <ContentHtml>
          <p>{t('voting_description')}</p>
          <p>{details.description}</p>
          <p>{t('voting_targets')}</p>
          <p>{details.targets[0]}</p>
          <p>{t('voting_proposer')}</p>
          <p>{details.proposer}</p>
          {/* <p>执行：</p>
          <p style={{ wordWrap: 'break-word' }}>{details.calldatas[0]}</p> */}
        </ContentHtml>
        {/* <ConetntHold>
          {t('voting_details_hold')}
          <span>{details.hold}</span>
        </ConetntHold> */}
        {details.status === 1 && (
          <DetailsBtn>
            <BtnRight1
              is_collect_type={isCollectType}
              onClick={() => {
                collectTypeChange(1)
              }}
            >
              {t('voting_details_collect_3')}({detailsVoting.abstainVotes})
            </BtnRight1>
            <BtnLeft
              is_collect_type={isCollectType}
              onClick={() => {
                collectTypeChange(1)
              }}
              style={{ textIndent: i18n.language === 'zh' ? '38px' : '72px' }}
            >
              {t('voting_details_collect_1')}({detailsVoting.forVotes})
            </BtnLeft>
            <BtnRight
              is_collect_type={isCollectType}
              onClick={() => {
                collectTypeChange(2)
              }}
              style={{ textIndent: i18n.language === 'zh' ? '38px' : '72px' }}
            >
              {t('voting_details_collect_2')}({detailsVoting.againstVotes})
            </BtnRight>
          </DetailsBtn>
        )}
        {details.status !== 1 && (
          <div className="detailsVoting">
            <p>
              {t('voting_details_collect_3')}：{detailsVoting.abstainVotes}
            </p>
            <p>
              {t('voting_details_collect_1')}：{detailsVoting.forVotes}
            </p>
            <p>
              {t('voting_details_collect_2')}：{detailsVoting.againstVotes}
            </p>
          </div>
        )}
      </Content>
    </ProposalMaskWapple>
  )
}
