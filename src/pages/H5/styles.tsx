import styled from 'styled-components'
import H5_paper_background from '../../assets/images/H5_paper_background.png'
import H5_paper_button from '../../assets/images/H5_paper_button.png'
import H5_dataCenter_background from '../../assets/images/H5_dataCenter_background.png'
import technologyPage_frame from '../../assets/images/technologyPage_frame.png'
import technologyPage_logo from '../../assets/images/technologyPage_logo.png'
import button_bg from '../../assets/images/button_bg.png'
import H5_address_background from '../../assets/images/H5_address_background.png'
import divider_background from '../../assets/images/divider_background.png'
import H5_announcement_background from '../../assets/images/H5_announcement_background.png'
import logo_2 from '../../assets/images/logo_2.png'
import Destruction_ranking from '../../assets/images/Destruction_ranking.png'
import Destruction_ranking_1 from '../../assets/images/Destruction_ranking_1.png'
import h5_exchange_bg from '../../assets/images/h5_exchange_bg.png'
import H5_integral_bg from '../../assets/images/H5_integral_bg.png'
import H5_integral from '../../assets/images/H5_integral.png'
import H5_integral_active from '../../assets/images/H5_integral_active.png'
import Destruction_number_bg from '../../assets/images/Destruction_number_bg.png'
import GOVERNANCE_TITLE_BACKGROUND from '../../assets/images/governance_title_background.png'
import H5_Proposal_active from '../../assets/images/H5_Proposal_active.png'
import H5_Proposal_default from '../../assets/images/H5_Proposal_default.png'
import VOTING_SUCCESS from '../../assets/images/voting_success.png'
import H5_SELECT from '../../assets/images/H5_select.png'
import VOTING_MASK_BJ from '../../assets/images/voting_mask_bj.png'
import H5_COOPERATE_BACKGROUND from '../../assets/images/H5_cooperate_background.png'
import VOTING_BTN_3 from '../../assets/images/voting_btn_3.png'
import h5_exchange_wenhao from '../../assets/images/h5_exchange_wenhao.png'
import button_exchange from '../../assets/images/button_exchange.png'
import btn1 from '../../assets/images/btn1.png'
import btn2 from '../../assets/images/btn2.png'

export const H5Wapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
`
export const TitleStyles = styled.div`
  margin-top: 80px;
`
export const HereText = styled.div`
  width: 560px;
  padding-bottom: 30px;
  font-size: 40px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #ffffff;
  line-height: 60px;
  background: linear-gradient(13deg, #10dbf7 0%, #1cffec 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-top: 50px;
`
export const PaperStyles = styled.div<{ active: boolean }>`
  width: 685px;
  height: 848px;
  background: url(${H5_paper_background}) no-repeat;
  background-size: 100%;
  box-sizing: border-box;
  padding: ${({ active }) => (active ? '30px 40px' : '90px 50px')};
  text-align: center;
  font-size: ${({ active }) => (active ? '22px' : '28px')};
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #a7cbcf;
  line-height: 40px;
  p {
    text-align: left;
    text-indent: 60px;
    margin-bottom: ${({ active }) => (active ? '0px' : '70px')};
  }
`
export const PaperButton = styled.button`
  width: 244px;
  height: 88px;
  background: url(${H5_paper_button}) no-repeat;
  background-size: 100%;
  font-size: 36px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #2ae6d0;
  line-height: 70px;
  text-align: center;
`
export const DataCenterStyles = styled.div<{ active: boolean }>`
  width: 689px;
  height: 1199px;
  background: url(${H5_dataCenter_background}) no-repeat;
  background-size: 100%;
  box-sizing: border-box;
  margin-top: 30px;
  padding: 50px;
  p:nth-child(1) {
    text-indent: 60px;
    margin-bottom: ${({ active }) => (active ? '10px' : '80px')};
  }
  p {
    font-size: 28px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #a7cbcf;
    line-height: 40px;
    text-align: left;
  }
`
export const DataCenterFlex = styled.div`
  display: flex;
  flex-direction: column;
`

export const TechnologyFrame = styled.div`
  width: 545px;
  height: 221px;
  background: url(${technologyPage_frame}) no-repeat center;
  background-size: 100%;
  margin-bottom: 45px;
  position: relative;
  img {
    position: absolute;
    left: 30px;
    top: 95px;
  }
  h2 {
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #2bc9b1;
    line-height: 40px;
  }
`
export const FrameStyles = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 60px 35px 110px;
`
export const FrameText = styled.div<{ active: boolean }>`
  text-align: center;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 60px;
  p {
    text-align: center;
    font-size: ${({ active }) => (active ? '32px' : '40px')};
    color: #fcf8ff;
  }
  h6 {
    font-size: ${({ active }) => (active ? '16px' : '24px')};
    color: #bdd2d1;
  }
`
export const FrameTextColor = styled.div`
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 60px;
  padding-top: 20px;
  text-align: left;
  p {
    font-size: 40px;
    color: #19fcee;
  }
  h6 {
    font-size: 24px;
    color: #fcf8ff;
  }
`
export const DataAnalysis = styled.div`
  width: 750px;
  height: 586px;
  background: #17242f;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 35px;
`
export const GainStyles = styled.div`
  width: 750px;
  height: 220px;
  background: #17242f;
  border-radius: 10px;
  margin-top: 30px;
  box-sizing: border-box;
  padding: 30px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const GainLogo = styled.div`
  width: 308px;
  height: 159px;
  background: url(${technologyPage_logo}) no-repeat center;
  background-size: 100%;
  position: relative;
  p {
    font-size: 22px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    position: absolute;
    bottom: 20px;
  }
`
export const GainButton = styled.button`
  width: 244px;
  height: 88px;
  background: url(${button_bg}) no-repeat center;
  background-size: 100%;
  font-size: 36px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #ffffff;
  line-height: 34px;
  outline: none;
  cursor: pointer;
`
export const RewardStyles = styled.div`
  width: 685px;
  height: 848px;
  background: url(${H5_dataCenter_background}) no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 90px 50px;
  text-align: center;
  font-size: 28px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #a7cbcf;
  line-height: 40px;
  margin: 0 auto;
  p {
    text-align: left;
    margin-bottom: 70px;
  }
  p:nth-child(1) {
    text-indent: 60px;
    margin-bottom: 30px;
  }
  margin-top: 70px;
`
export const RewardInfo = styled.div`
  width: 100%;
  margin-bottom: 80px;
`
export const IconStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #eaeaea;
  line-height: 40px;
  span {
    margin-left: 20px;
  }
`
export const NumberStyles = styled.div`
  font-size: 42px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #19fcee;
  line-height: 30px;
  text-align: center;
  margin-top: 50px;
`
export const AddressStyles = styled.div`
  width: 691px;
  height: 1156px;
  background: url(${H5_address_background}) no-repeat center;
  background-size: 100%;
  margin-top: 90px;
  box-sizing: border-box;
  padding: 100px 60px;
`
export const AddressTitle = styled.div<{ active: boolean }>`
  width: 100%;
  font-size: ${({ active }) => (active ? '38px' : '48px')};
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #fcf8ff;
  line-height: 48px;
  background: linear-gradient(13deg, #0ce2ff 0%, #1bffec 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 30px;
`
export const PublicTextStyles = styled.div`
  margin-top: 40px;
`

export const PublicText = styled.div`
  height: 135px;
  text-align: center;
`
export const Label = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  .icon {
    display: block;
    width: 5px;
    height: 28px;
    background: #1ce5e5;
    border-radius: 2px;
  }
  p {
    display: block;
    font-size: 24px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #f8fffd;
    opacity: 0.9;
    margin-left: 15px;
  }
`
export const Address = styled.a`
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  text-decoration: underline;
  color: #35ddc0;
  line-height: 60px;
`
export const DividerHr = styled.div`
  width: 253px;
  height: 5px;
  background: url(${divider_background}) no-repeat center;
  background-size: 100%;
  margin: 0 auto;
`
export const AddressUrl = styled.div`
  width: 397px;
  height: 56px;
  background: linear-gradient(
    90deg,
    rgba(25, 35, 60, 0) 0%,
    rgba(48, 174, 170, 0.48) 57.99999999999999%,
    rgba(25, 35, 60, 0) 100%
  );
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #fcf8ff;
  line-height: 56px;
  margin: 0 auto;
  margin-top: 30px;
`
export const AnnouncementCenterStyles = styled.div<{ active: boolean }>`
  width: 750px;
  height: 200px;
  background: url(${H5_announcement_background}) no-repeat;
  background-size: 100%;
  margin-top: 100px;
  text-align: center;
  h3 {
    font-size: ${({ active }) => (active ? '28px' : '48px')};
    font-family: Source Han Sans CN;
    font-weight: 800;
    color: #ffffff;
    line-height: 102px;
    background: linear-gradient(13deg, #0ce2ff 0%, #1bffec 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding-right: 50px;
  }
`
export const HelpStyles = styled.div`
  margin: 30px 30px 0 30px;
  width: 690px;
`
export const VideoStyles = styled.div`
  width: 690px;
  height: auto;
  box-sizing: border-box;
  position: relative;
  .video-react-big-play-button {
    width: 80px;
    height: 80px;
    opacity: 0.17;
    border-radius: 50%;
    position: absolute;
    left: 300px;
    top: 150px;
    :before {
      font-size: 50px;
      line-height: 76px;
    }
  }
`
export const PlayerTriangleRight = styled.div`
  border: 0px solid #152029;
  width: 0;
  height: 0;
  border-left-color: transparent;
  border-width: 40px 0px 0px 50px;
  position: absolute;
  top: 0;
  right: 0;
  ::after {
    content: '';
    position: absolute;
    top: -20px;
    right: -7px;
    width: 63px;
    height: 1px;
    background: #1ce5e5;
    -webkit-transform: rotateZ(40deg);
    -ms-transform: rotateZ(40deg);
    transform: rotateZ(40deg);
  }
`

export const PlayerSelect = styled.div`
  width: 690px;
  height: 100px;
  box-sizing: border-box;
  position: relative;
  border-left: 1px solid #1ce5e5;
  border-bottom: none;
  font-size: 30px;
  font-family: SourceHanSansCN;
  font-weight: 800;
  color: #19fcee;
  line-height: 102px;
  cursor: pointer;
  span {
    position: relative;
    ::after {
      content: '';
      position: absolute;
      top: 14px;
      right: -46px;
      width: 25px;
      height: 18px;
      background: url(${H5_SELECT}) no-repeat;
      background-size: 100% 100%;
    }
  }
`

export const PlayerSelectMask = styled.div`
  width: 688px;
  max-height: 684px;
  padding-top: 30px;
  background: #17242f;
  border: 1px solid #15fdfe;
  opacity: 0.9;
  position: absolute;
  top: 100px;
  left: 0;
  z-index: 888;
  display: flex;
  flex-direction: column;
  align-items: center;
  .player-options {
    width: 480px;
    height: 76px;
    font-size: 28px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #95c7c7;
    margin-bottom: 30px;
    line-height: 76px;
    cursor: pointer;
  }
  .p-active {
    background: linear-gradient(180deg, #14e3bf, #08b6ac);
    color: #fff;
  }
`

export const HelpText = styled.div`
  width: 706px;
  box-sizing: border-box;
  padding: 40px;
  border-left: 1px solid #16fafb;
  border-right: 1px solid #16fafb;
  border-bottom: 1px solid #16fafb;
  margin: 0 auto;
`
export const HelpTextInfo = styled.div`
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #eaeaea;
  line-height: 40px;
  text-align: left;
  margin-top: 40px;
  p {
    margin-bottom: 20px;
  }
`
export const HelpPartnerStyles = styled.div`
  width: 660px;
  box-sizing: border-box;
  padding: 40px;
  background: url(${H5_COOPERATE_BACKGROUND}) no-repeat;
  background-size: 100% 100%;
  /* border-left: 1px solid #16fafb;
  border-right: 1px solid #16fafb;
  border-bottom: 1px solid #16fafb; */
  margin: 0 auto;
`
export const PartnersList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* flex-wrap: wrap;
  justify-content: center;
  align-items: center; */
  img {
    margin-top: 30px;
    height: 110px;
    width: auto;
  }
`
export const ContactStyles = styled.div`
  width: 750px;
  box-sizing: border-box;
  padding: 70px;
`

export const ContactLogo = styled.div`
  width: 477px;
  height: 207px;
  background: url(${logo_2}) no-repeat center;
  background-size: 100%;
  margin: 0 auto;
`
export const ButtonStyles = styled.div`
  text-align: center;
  margin-top: 85px;
`
export const MessageInput = styled.input`
  width: 100%;
  height: 90px;
  background: #3a4e5e;
  opacity: 0.5;
  margin-top: 30px;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #fff;
  text-align: center;
`
export const ShareStyles = styled.div`
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 100px;
`
export const ModalMain = styled.div`
  width: 100%;
`

export const ModelStyles = styled.div`
  width: 690px;
  height: 86vh;
  background: url(${H5_dataCenter_background}) no-repeat;
  background-size: 100% 100%;
  z-index: 99;
  position: fixed;
  top: 164px;
  left: 30px;
`
export const ShadowWapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #000;
  transition: opacity 0.4s ease 0s;
  opacity: 0.8;
  z-index: 90;
  pointer-events: initial;
`

export const ModelTitle = styled.h3`
  margin-top: 52px;
  margin-bottom: 27px;
  font-size: 48px;
  font-family: Source Han Sans CN;
  font-weight: 800;
  color: #ffffff;

  background: linear-gradient(13deg, #0ce2ff 0%, #1bffec 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
export const Modelback = styled.div`
  width: 150px;
  height: 60px;
  border: 1px solid #1f4b57;
  border-radius: 30px;
  font-size: 28px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #35ddc0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: -140px;
  cursor: pointer;
`
export const ContentText = styled.div`
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #eaeaea;
  line-height: 36px;
  .outer-container,
  .content {
    width: 100%;
    height: calc(86vh - 191px);
    text-align: left;
    box-sizing: border-box;
    padding: 0 70px;
  }
  .outer-container {
    position: relative;
    overflow: hidden;
  }
  .inner-container {
    position: absolute;
    left: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  /* for Chrome */
  .inner-container::-webkit-scrollbar {
    display: none;
  }
`
export const ModelAddress = styled.a`
  line-height: 24px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  text-decoration: underline;
  color: #35ddc0;
  line-height: 50px;
  text-decoration: none;
`
export const DestructionFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const DestructionTitle = styled.div`
  border: 1px solid #15fdfe;
  font-size: 28px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #ffffff;
  line-height: 48px;
  background: linear-gradient(13deg, #0ce2ff 0%, #1bffec 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 25px 50px;
  margin-bottom: 30px;
`
export const DestructionCenter = styled.div`
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #bdd2d1;
  line-height: 20px;
  margin-top: 30px;
`
export const DestructionList = styled.div`
  width: 600px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  p {
    text-indent: 0px !important;
    margin-bottom: 20px !important;
    line-height: 80px;
  }
`

export const QueryDestruction = styled.div`
  width: 685px;
  height: 848px;
  background: url(${H5_dataCenter_background}) no-repeat;
  background-size: 100% 100%;
  margin-top: 30px;
  box-sizing: border-box;
  padding: 60px 60px;
`
export const TitleColor = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
  span {
    width: 6px;
    height: 22px;
    background: #1ce5e5;
    border-radius: 2px;
    margin-right: 10px;
  }
  p {
    font-size: 28px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #a7cbcf;
    line-height: 72px;
  }
`
export const QueryCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const Total = styled.h2`
  font-size: 68px;
  font-weight: bold;
  color: #02feff;
  line-height: 68px;
  text-shadow: 0px 5px 2px rgba(0, 0, 0, 0.5);
  background: linear-gradient(90deg, #06dfff 30%, #b764fd 40%, #3ccaff 100%, #03feff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
`
export const ChooseTimeStyles = styled.div`
  display: flex;
  flex-direction: row;
`
export const ChooseTimeButton = styled.div<{ active: boolean }>`
  font-size: 26px;
  font-family: Microsoft YaHei;
  line-height: 70px;
  color: ${({ active }) => (active ? `#16D6D8` : '#BDD2D1')};
  border-bottom: ${({ active }) => (active ? `1px solid #16D6D8` : '1px solid #1C3640')};
  padding: 0 30px 0 30px;
  margin-top: -30px;
`
export const EducationStyles = styled.div`
  width: 600px;
  height: 100px;
  background: rgb(27, 147, 162, 0.09);
  border-radius: 10px;
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 30px;
  h3 {
    font-size: 28px;
    font-weight: bold;
    color: #a7cbcf;
  }
`
export const EducationNumber = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 38px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #15fcfd;
  line-height: 70px;
  span {
    margin-left: 10px;
  }
`
export const QueryTitleStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const BlockList = styled.div`
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 0px;
  font-size: 28px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #bdd2d1;
  line-height: 80px;
  border-top: 1px solid #1a2e38;
  p:nth-child(1) {
    width: 50%;
    text-align: left;
  }
  p:nth-child(2) {
    width: 50%;
    color: #15fdfe;
    text-align: right;
  }
`
export const RankingData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`
export const RankingList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`
export const RankingText = styled.div<{ active: boolean }>`
  width: 482px;
  height: 97px;
  background: ${({ active }) =>
    active ? `url(${Destruction_ranking_1}) no-repeat center` : `url(${Destruction_ranking}) no-repeat center`};
  background-size: 100%;
  margin-left: 15px;
  position: relative;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #fcf8ff;
  line-height: 97px;
  text-align: center;
  cursor: pointer;
`
export const RankingNumber = styled.div`
  font-size: 32px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #1dfefe;
  position: absolute;
  top: 2px;
  left: 18px;
`

export const Exchange = styled.div`
  width: 680px;
  height: 2100px;
  background: url(${h5_exchange_bg}) no-repeat;
  background-size: 100% 100%;
  margin-top: 55.8px;
  position: relative;
`

export const ExchangeTitle = styled.div`
  font-size: 28px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #1cfefe;
  text-align: center;
  position: absolute;
  top: 5px;
  left: 50%;
  margin-left: -168px;
`
export const ExchangeWenhao = styled.div`
  width: 416px;
  height: 635px;
  background-image: url(${h5_exchange_wenhao});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 90px auto 50px auto;
`

export const ExchangeBtn = styled.div`
  width: 240px;
  height: 85px;
  background-image: url(${button_exchange});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 20px auto;
  font-size: 36px;
  font-weight: bold;
  color: #ffffff;
  line-height: 85px;
`

export const ExchangeChoose = styled.div`
  text-align: center;
  color: #30949f;
  font-size: 24px;
`

export const ChooseCount = styled.span`
  color: #f4a53b;
`

export const Tags = styled.div`
  width: auto;
  padding: 20px 50px;
  display: flex;
  justify-content: center;
  margin-top: 70px;
`

export const TagsItem = styled.div`
  width: 130px;
  background-image: url(${btn2});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 20px 0;
  color: #64a9bd;
  font-size: 24px;
  font-weight: 400;
  &.active {
    background-image: url(${btn1});
    color: #ffffff;
  }
`

export const CardContet = styled.div`
  display: flex;
  width: 100%;
  height: 950px;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px 50px 20px 30px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`

export const CardItem = styled.div`
  width: calc((100% - 20px) / 2);
  padding: 20px;
  height: 470px;
  background: #1c2a35;
  border-radius: 5px;
  margin-bottom: 10px;
  &.active {
    background: #413618;
  }
`

export const CardImg = styled.img`
  width: 100%;
`

export const NoData = styled.div`
  font-size: 18px;
  color: #eaeaea;
  text-align: center;
  padding: 150px 0;
  flex: 1;
  opacity: 0.8;
`

export const PSIntegral = styled.div`
  width: 680px;
  height: 1519px;
  background: url(${H5_integral_bg}) no-repeat;
  background-size: 100% 100%;
  margin-top: 55.8px;
  position: relative;
`

export const IntegralTitle = styled.div`
  font-size: 28px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #a7cbcf;
  text-align: start;
  text-indent: 2em;
  position: relative;
  ::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 1em;
    width: 5px;
    height: 28px;
    background: #1ce5e5;
    border-radius: 2px;
  }
`

export const IntegralStartTime = styled.div`
  position: absolute;
  top: 56px;
  left: 53px;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #1cfefe;
  width: 50%;
`

export const NewCard = styled.img`
  width: 100%;
  height: 100%;
`

export const IntegralTime = styled.div`
  position: absolute;
  top: 58px;
  left: 444px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  width: 25%;
  color: #09454d;
`

export const NewTable = styled.div`
  width: 100%;
`

export const IntegralTable = styled.div`
  position: absolute;
  top: 1036px;
  width: 556px;
  left: calc(50% - 293px);
`

export const IntegralTableLists = styled.div`
  max-height: 391px;
  overflow: hidden;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  -ms-overflow-style: none; /* IE 10+ */
  scrollbar-width: none; /* Firefox */
`

export const IntegralTableTitle = styled.div`
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #19778c;
  display: flex;
  justify-content: space-between;
  line-height: 27px;

  span {
    width: 33%;
    :nth-child(1) {
      width: calc(33% - 23px);
      margin-left: 23px;
      text-align: start;
    }
  }
`

export const NewIntegralListInfo = styled.div`
  width: 555px;
  height: 71px;
  background: url(${H5_integral}) no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  cursor: pointer;
`

export const IntegralListInfo = styled.div<{ active: boolean }>`
  width: 555px;
  height: 71px;
  background: url(${({ active }) => (!active ? H5_integral : H5_integral_active)}) no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  cursor: pointer;
`

export const NewIntegralListInfoSort = styled.div`
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #4ddfff;
  margin-left: 23px;

  width: calc(33% - 23px);
  text-align: start;
`

export const NewIntegralListInfoName = styled.div`
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #4ddfff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 33%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const NoNewData = styled.div`
  font-size: 18px;
  color: #eaeaea;
  padding: 40px;
  text-align: center;
`

export const NewIntegralListInfoPs = styled.div`
  width: 33%;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #4ddfff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 33%;
`

export const IntegralListInfoSort = styled.div`
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #4ddfff;
  margin-left: 23px;
  width: calc(33% - 23px);
  text-align: start;
`

export const IntegralListInfoName = styled.div<{ active: boolean }>`
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: ${({ active }) => (active ? '#117D94' : '#4DDFFF')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 33%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const IntegralListInfoPs = styled.div<{ active: boolean }>`
  width: 33%;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: ${({ active }) => (active ? '#117D94' : '#4DDFFF')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 33%;
`

export const IntegralOneInfo = styled.div`
  position: absolute;
  top: -670px;
  left: calc(50% - 30px);
`

export const IntegralOneInfoName = styled.div`
  width: 140px;
  position: absolute;
  left: -30px;
  top: -26px;
  font-size: 21px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  line-height: 40px;
  text-shadow: 0px 2px 0px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const IntegralOneInfoPs = styled.div`
  position: absolute;
  top: 100px;
  width: 140px;
  left: -30px;
  font-size: 21px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #185d6d;
  line-height: 45px;
`

export const IntegralOneInfoPsName = styled.div`
  position: absolute;
  top: 140px;
  width: 140px;
  left: -30px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    width: 48px;
    height: 48px;
    background: #3fcfda;
    border-radius: 50%;
    line-height: 48px;
    color: #fff;
    font-size: 18px;
  }
`
export const IntegralTwoInfo = styled.div`
  position: absolute;
  top: -470px;
  left: 20%;
`

export const IntegralTwoInfoName = styled.div`
  position: absolute;
  top: -14px;
  left: -30px;
  width: 110px;
  line-height: 28px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  text-shadow: 0px 2px 0px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const IntegralTwoInfoPs = styled.div`
  position: absolute;
  top: 77px;
  width: 120px;
  left: -20px;
  font-size: 21px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #185d6d;
`

export const IntegralTwoInfoPsName = styled.div`
  position: absolute;
  top: 110px;
  width: 140px;
  left: -30px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    width: 48px;
    height: 48px;
    background: #3ebbd4;
    border-radius: 50%;
    line-height: 48px;
    color: #fff;
    font-size: 18px;
  }
`

export const IntegralThreeInfo = styled.div`
  position: absolute;
  top: -470px;
  right: 26%;
`

export const IntegralThreeInfoName = styled.div`
  position: absolute;
  top: -19px;
  left: -30px;
  width: 110px;
  line-height: 28px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  text-shadow: 0px 2px 0px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const IntegralThreeInfoPs = styled.div`
  position: absolute;
  top: 77px;
  width: 120px;
  left: -40px;
  font-size: 21px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #185d6d;
`

export const IntegralThreeInfoPsName = styled.div`
  position: absolute;
  top: 110px;
  width: 140px;
  left: -50px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    width: 48px;
    height: 48px;
    background: #3ebbd4;
    border-radius: 50%;
    line-height: 48px;
    color: #fff;
    font-size: 18px;
  }
`

export const IntegralSession = styled.div`
  font-size: 28px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #1ce5e5;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 77px;
  width: 180px;
  line-height: 52px;
  cursor: pointer;
  .icon {
    width: 25px;
    height: 16px;
    margin-left: 19px;
  }
`

export const ActiveSessionMask = styled.div`
  width: calc(95% - 82px);
  max-height: 684px;
  background: rgba(23, 36, 47, 0.9);
  border: 1px solid #15fdfe;
  position: absolute;
  top: 54px;
  left: 33px;
  z-index: 999;
  padding: 36px 0 0 68px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  -ms-overflow-style: none; /* IE 10+ */
  scrollbar-width: none; /* Firefox */
`

export const ActiveSessionList = styled.div<{ active: boolean }>`
  width: 145px;
  height: 56px;
  background: ${({ active }) => (active ? `url(${button_bg}) no-repeat` : `transparent`)};
  background-size: 100% 100%;
  font-size: 28px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: ${({ active }) => (active ? '#FFFFFF' : '#95C7C7')};
  text-shadow: 0px 2px 0px rgba(30, 32, 50, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 97px;
  margin-bottom: 36px;
  cursor: pointer;
`

export const PKSRedemption = styled.div`
  width: 691px;
  height: 1124px;
  background: url(${H5_address_background}) no-repeat;
  background-size: 100% 100%;
  margin-top: 90px;
  box-sizing: border-box;
  padding: 80px 60px;
  position: relative;
`

export const PKSRedemptionTitle = styled.div`
  font-size: 28px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #a7cbcf;
  text-indent: 1.5em;
  text-align: start;
  position: relative;
  ::after {
    content: '';
    position: absolute;
    left: 20px;
    top: calc(50% - 11px);
    width: 6px;
    height: 22px;
    background: #1ce5e5;
    border-radius: 3px;
  }
`

export const PKSTotal = styled.div`
  font-size: 47px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
  line-height: 133px;
  position: relative;
  background: linear-gradient(13deg, #0ce2ff 0%, #1bffec 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  span {
    font-size: 31px;
  }
  ::after {
    content: '';
    width: 396px;
    height: 28px;
    background: url(${Destruction_number_bg}) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: -10px;
    left: calc(50% - 198px);
  }
`
export const PKSContent = styled.div`
  width: 540px;
  height: 535px;
  background: #121c24;
  margin-top: 40px;
  margin-left: calc(50% - 270px);
  display: flex;
  padding-top: 50px;
  flex-direction: column;
`

export const ListInfo = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 43px;
  margin-bottom: 102px;
  position: relative;
`

export const TitleIcon = styled.img`
  width: auto;
  height: 24px;
  margin-right: 16px;
`

export const Title = styled.div`
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #eaeaea;
  line-height: 30px;
  text-align: start;
`

export const Stage = styled.div`
  position: absolute;
  top: 40px;
  left: 80px;
  height: 52px;
  padding: 0 14px 0 18px;
  background: url(${GOVERNANCE_TITLE_BACKGROUND}) no-repeat;
  background-size: 100% 100%;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #0ee7fc;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const InfoNumber = styled.div`
  font-size: 32px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #eaeaea;
  line-height: 30px;
`

export const ExpirationDate = styled.div`
  height: 46px;
  width: 540px;
  margin-left: calc(50% - 270px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1b2934;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #738ca0;
  margin-top: 18px;
  margin-bottom: 35px;
`

export const ReceiveBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TransferPK = styled.div`
  width: 689px;
  height: 764px;
  background: url(${H5_dataCenter_background}) no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  margin-top: 30px;
  padding: 50px;
  position: relative;
`

export const TransferPKTitle = styled.div`
  font-size: 28px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #a7cbcf;
  text-indent: 1.5em;
  text-align: start;
  position: relative;
  ::after {
    content: '';
    position: absolute;
    left: 20px;
    top: calc(50% - 11px);
    width: 6px;
    height: 22px;
    background: #1ce5e5;
    border-radius: 3px;
  }
`

export const RansferPKInput = styled.input`
  width: calc(540px - 2em);
  height: 90px;
  background: rgba(58, 78, 94, 0.21);
  margin-top: 63px;
  font-size: 30px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #79aeaf;
  margin-bottom: 77px;
  text-align: center;
  padding: 0 2em;
`

export const RansferPKInputIcon = styled.div`
  position: absolute;
  top: 175px;
  right: 59px;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #79aeaf;
`

export const RansferPKSpan = styled.div`
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #a7cbcf;
  margin: 83px 0 57px 0;
`

export const RansferPKNumber = styled.div`
  font-size: 48px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #15fcfd;
  line-height: 72px;
  position: relative;
  ::after {
    content: '';
    width: 396px;
    height: 28px;
    background: url(${Destruction_number_bg}) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: -52px;
    left: calc(50% - 198px);
  }
`

export const Proposal = styled.div`
  width: 689px;
  height: 1021px;
  background: url(${H5_dataCenter_background}) no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  margin-top: 30px;
  padding: 50px;
  position: relative;
`

export const ProposalTitle = styled.div`
  font-size: 28px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #a7cbcf;
  text-indent: 1.5em;
  text-align: start;
  position: relative;
  display: flex;
  align-items: center;
  ::after {
    content: '';
    position: absolute;
    left: 20px;
    top: calc(50% - 11px);
    width: 6px;
    height: 22px;
    background: #1ce5e5;
    border-radius: 3px;
  }
`

export const ProposalList = styled.div`
  margin-top: 34px;
  max-height: 774px;
  width: 596px;
  overflow: hidden;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`

export const ProposalListInfo = styled.div<{ active: boolean }>`
  width: 596px;
  height: 127px;
  background: ${({ active }) =>
    active ? `url(${H5_Proposal_active}) no-repeat` : `url(${H5_Proposal_default}) no-repeat`};
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  margin-bottom: 24px;
`

export const ProposalListInfoTitle = styled.div<{ active: boolean }>`
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: ${({ active }) => (active ? '#FFFFFF' : '#74A2A4')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 70%;
  margin-left: 20px;
  margin-top: -20px;
`

export const Vote = styled.div`
  width: 116px;
  height: 46px;
  background: url(${GOVERNANCE_TITLE_BACKGROUND}) no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: 600;
  color: #0ee7fc;
  margin-top: -20px;
`

export const VoteSuccess = styled.div`
  width: 74px;
  height: 74px;
  /* background: url(${VOTING_SUCCESS}) no-repeat;
  background-size: 100% 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #0ee7fc;
  margin-top: -24px;
  margin-left: 20px;
`

export const VoteNo = styled.div`
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #0ee7fc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`

export const InfoStartTime = styled.div<{ active: boolean }>`
  position: absolute;
  bottom: 12px;
  right: 12px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 500;
  color: ${({ active }) => (active ? '#C5E8E8' : '#376F79')};
  line-height: 20px;
`
export const NoList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.85);
`
export const AmountReceived = styled.div`
  width: 350px;
  height: 34px;
  margin-left: calc(50% - 175px);
  background: url(${VOTING_MASK_BJ}) no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #bdd2d1;
  margin-bottom: 23.7px;
`
export const CommissionBtn = styled.div`
  background: url(${VOTING_BTN_3}) no-repeat;
  background-size: 100% 100%;
  width: 116px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ed9723;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-indent: 0;
  cursor: pointer;
`

export const FooterBtn = styled.div`
  padding: 10px;
  font-size: 24px;
  cursor: pointer;
`

export const Mine = styled.div`
  width: 691px;
  height: 1190px;
  background: url(${H5_address_background}) no-repeat center;
  background-size: 100%;
  margin-top: 90px;
  box-sizing: border-box;
  padding: 80px 60px;
`

export const MineTable = styled.div`
  width: 556px;
  left: calc(50% - 293px);
  padding: 20px 0;
`
export const MineTableLists = styled.div`
  max-height: 850px;
  overflow: hidden;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  -ms-overflow-style: none; /* IE 10+ */
  scrollbar-width: none; /* Firefox */
`

export const Page = styled.div`
  width: 80%;
  margin: 40px auto;
  text-align: center;
`
