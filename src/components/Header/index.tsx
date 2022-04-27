import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import SetLanguage from '../SetLanguage'
import logo from '../../assets/images/logo.png'
import { useViewport } from '../ViewportProvider'
import { useTranslation } from 'react-i18next'
import { Menu } from 'antd'

const HeaderFrame = styled.div`
  ${({ theme }) => theme.mediaWidth.upToMedium`
        background-color:#131A1F;
    `};
  position: relative;
  top: 0;
  z-index: 11111;
  width: 100%;
  padding: 25px;
  display: flex;
  align-items: center;
  .menuList {
    display: flex;
    flex-direction: row;
    color: #fff;
    width: calc(100% - 433px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    background: transparent;
  }
`
const HeaderTitle = styled.div`
  display: flex;
  z-index: 99;
  img {
    vertical-align: middle;
    border-style: none;
  }
`

const activeClassName = 'ACTIVE'
const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    font-weight: 400;
    color: #35ddc0 !important;
  }
`

export default function Header() {
  const { width } = useViewport()
  const { t } = useTranslation()

  if (width <= 1200) {
    return (
      <HeaderFrame style={{ justifyContent: 'space-between' }}>
        <HeaderTitle>
          <img width={'183px'} height={'50px'} src={logo} alt="Logo" />
        </HeaderTitle>
        <SetLanguage />
      </HeaderFrame>
    )
  } else {
    return (
      <HeaderFrame>
        <HeaderTitle>
          <img width={'183px'} height={'50px'} src={logo} alt="Logo" />
        </HeaderTitle>
        <Menu className="menuList" mode="horizontal" theme="dark" subMenuCloseDelay={1}>
          <Menu.Item key="/home">
            <StyledNavLink to={'/home'}>{t('Homepage')}</StyledNavLink>
          </Menu.Item>
          <Menu.Item key="/technology">
            <StyledNavLink to={'/technology'}>{t('Technology_and_data')}</StyledNavLink>
          </Menu.Item>
          <Menu.Item key="/governance">
                <StyledNavLink to={'/governance'}>{t('Governance')}</StyledNavLink>
              </Menu.Item>
              <Menu.Item key="/combustion">
              <StyledNavLink to={'/combustion'}>{t('Combustion')}</StyledNavLink>
            </Menu.Item>
          {/* <Menu.SubMenu
            title={
              <Menu.Item key="/governance">
                <StyledNavLink to={'/governance'}>{t('Governance')}</StyledNavLink>
              </Menu.Item>
            }
            popupClassName="governance-child"
            key={'governance'}
          >
            <Menu.Item key="/combustion">
              <StyledNavLink to={'/combustion'}>{t('Combustion')}</StyledNavLink>
            </Menu.Item>
          </Menu.SubMenu> */}
          <Menu.Item key="/voting">
            <StyledNavLink to={'/voting'}>{t('Governance_voting')}</StyledNavLink>
          </Menu.Item>
          <Menu.Item key="/destruction">
            <StyledNavLink to={'/destruction'}>{t('Destruction')}</StyledNavLink>
          </Menu.Item>
          <Menu.Item key="/public">
            <StyledNavLink to={'/public'}>{t('Address_announcement')}</StyledNavLink>
          </Menu.Item>
          <Menu.Item key="/announcement">
            <StyledNavLink to={'/announcement'}>{t('Announcement')}</StyledNavLink>
          </Menu.Item>
          <Menu.Item key="/introduction">
            <StyledNavLink to={'/introduction'}>{t('Project_intro')}</StyledNavLink>
          </Menu.Item>
          <Menu.Item key="/exchange">
            <StyledNavLink to={'/exchange'}>{t('Exchange')}</StyledNavLink>
          </Menu.Item>
          <Menu.Item key="/integral">
            <StyledNavLink to={'/integral'}>{t('Integral')}</StyledNavLink>
          </Menu.Item>
          {/* <Menu.Item key="/mine">
            <StyledNavLink to={'/mine'}>{t('Mine')}</StyledNavLink>
          </Menu.Item> */}
          {/* <Menu.Item key="/reward">
            <StyledNavLink to={'/reward'}>{t('Claim_rewards')}</StyledNavLink>
          </Menu.Item> */}
          <Menu.Item key="/partners">
            <StyledNavLink to={'/partners'}>{t('Partner')}</StyledNavLink>
          </Menu.Item>
          <Menu.Item key="/help">
            <StyledNavLink to={'/help'}>{t('Help_center')}</StyledNavLink>
          </Menu.Item>
          <Menu.Item key="/contact">
            <StyledNavLink to={'/contact'}>{t('Contact_us')}</StyledNavLink>
          </Menu.Item>
        </Menu>
        <SetLanguage />
      </HeaderFrame>
    )
  }
}
