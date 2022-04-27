import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import APP_BOTTOM_ACTIVE from '../../assets/images/app_bottom_active.png'
import APP_BOTTOM from '../../assets/images/app_bottom.png'

const AppBottomWapper = styled.div`
  position: fixed;
  bottom: 18px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #20636a;
  width: 829px;
  height: 30px;
  margin-left: calc(50% - 414.5px);
  border-bottom: 1px solid #1e7e6b;
  z-index: 1111;
  zoom: ${window.screen.width / 1920};
`

const AppBottomLinks = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  position: relative;
  &::-webkit-scrollbar {
    // 滚动条整体
    background: none;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    //滑块
    background: rgba(30, 126, 107, 0.2);
    border-radius: 5px;
  }
  ::after {
    content: '';
    position: absolute;
    left: 0px;
    bottom: 3px;
    width: 1px;
    height: 9px;
    background: #1e7e6b;
  }
  scrollbar-color: rgba(30, 126, 107, 1) rgba(0, 0, 0, 0); /* 滑块颜色  滚动条背景颜色 */
  scrollbar-width: thin; /* 滚动条宽度有三种：thin、auto、none */
`
const LinkInfo = styled.div<{ active: boolean }>`
  display: inline-block;
  margin: 0 12px;
  line-height: 48px;
  width: 226.8px;
  position: relative;
  text-align: center;
  margin-top: -20px;
  ::before {
    content: '';
    position: absolute;
    right: -10px;
    bottom: 3px;
    width: 1px;
    height: 9px;
    background: #1e7e6b;
  }
  ::after {
    content: '';
    position: absolute;
    bottom: ${({ active }) => (active ? '3px' : '8px')};
    left: 0;
    width: 226.8px;
    height: ${({ active }) => (active ? '14px' : '5.4px')};
    background: ${({ active }) => (active ? `url(${APP_BOTTOM_ACTIVE}) no-repeat` : `url(${APP_BOTTOM}) no-repeat`)};
    background-size: 100% 100%;
  }
  a {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: ${({ active }) => (active ? '#35CBB1' : '#20636A')};
  }
`

interface AppBottomType {
  link?: string
}

export default function AppBottom(props: AppBottomType) {
  const { t } = useTranslation()

  const { link = '/' } = props

  useEffect(() => {
    setScrollLefts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link])

  /** 设置滚动条位置 */
  const setScrollLefts = () => {
    if (link === '/' || link === '/home' || link === '/technology') {
      document.getElementsByClassName('links')[0].scrollLeft = 0
      return false
    }
    let offsetLeft = document.getElementById(`link${link}`)?.offsetLeft
    document.getElementsByClassName('links')[0].scrollLeft = (offsetLeft as number) - 200
  }

  return (
    <AppBottomWapper id="links">
      <AppBottomLinks className="links">
        <LinkInfo active={link === '/' || link === '/home'} id="link/home">
          <Link to={'/home'}>{t('Homepage')}</Link>
        </LinkInfo>
        <LinkInfo active={link === '/technology'} id="link/technology">
          <Link to={'/technology'}>{t('Technology_and_data')}</Link>
        </LinkInfo>
        <LinkInfo active={link === '/governance'} id="link/governance">
          <Link to={'/governance'}>{t('Governance')}</Link>
        </LinkInfo>
        <LinkInfo active={link === '/combustion'} id="link/combustion">
          <Link to={'/combustion'}>{t('Combustion')}</Link>
        </LinkInfo>
        <LinkInfo active={link === '/voting'} id="link/voting">
          <Link to={'/voting'}>{t('Governance_voting')}</Link>
        </LinkInfo>
        <LinkInfo active={link === '/destruction'} id="link/destruction">
          <Link to={'/destruction'}>{t('Destruction')}</Link>
        </LinkInfo>
        <LinkInfo active={link === '/public'} id="link/public">
          <Link to={'/public'}>{t('Address_announcement')}</Link>
        </LinkInfo>
        <LinkInfo active={link === '/announcement'} id="link/announcement">
          <Link to={'/announcement'}>{t('Announcement')}</Link>
        </LinkInfo>
        <LinkInfo active={link === '/introduction'} id="link/introduction">
          <Link to={'/introduction'}>{t('Project_intro')}</Link>
        </LinkInfo>
        <LinkInfo active={link === '/exchange'} id="link/exchange">
          <Link to={'/exchange'}>{t('Exchange')}</Link>
        </LinkInfo>
        <LinkInfo active={link === '/integral'} id="link/integral">
          <Link to={'/integral'}>{t('Integral')}</Link>
        </LinkInfo>
        {/* <LinkInfo active={link === '/mine'} id="link/mine">
          <Link to={'/mine'}>{t('Mine')}</Link>
        </LinkInfo> */}
        {/* <LinkInfo active={link === '/reward'} id="link/reward">
          <Link to={'/reward'}>{t('Claim_rewards')}</Link>
        </LinkInfo> */}
        <LinkInfo active={link === '/partners'} id="link/partners">
          <Link to={'/partners'}>{t('Partner')}</Link>
        </LinkInfo>
        <LinkInfo active={link === '/help'} id="link/help">
          <Link to={'/help'}>{t('Help_center')}</Link>
        </LinkInfo>
        <LinkInfo active={link === '/contact'} id="link/contact">
          <Link to={'/contact'}>{t('Contact_us')}</Link>
        </LinkInfo>
      </AppBottomLinks>
    </AppBottomWapper>
  )
}
