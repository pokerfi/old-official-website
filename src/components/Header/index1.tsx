import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import SetLanguage from '../SetLanguage'
import logo from '../../assets/images/logo.png'
import { useViewport } from '../ViewportProvider'
import { useTranslation } from 'react-i18next'

const HeaderFrame = styled.div`
  width: 100%;
  padding: 25px;
  display: flex;
  position: relative;
  z-index: 9999;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToMedium`
        background-color:#131A1F;
    `};
`
const HeaderTitle = styled.div`
  display: flex;
  z-index: 99;
  img {
    vertical-align: middle;
    border-style: none;
  }
`
const HeaderLinks = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`
const activeClassName = 'ACTIVE'
const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  font-weight: 500;
  text-align: center;

  :hover,
  :focus {
    color: #35ddc0;
  }
  &.${activeClassName} {
    font-weight: 400;
    color: #35ddc0;
  }
  @media screen and (max-width: 1500px) {
    padding: 10px 7px;
  }
`

export default function Header() {
  const { width } = useViewport()
  const { t } = useTranslation()

  if (width <= 1200) {
    return (
      <HeaderFrame>
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
        <HeaderLinks>
          <StyledNavLink to={'/home'}>{t('Homepage')}</StyledNavLink>
          <StyledNavLink to={'/technology'}>{t('Technology_and_data')}</StyledNavLink>
          <StyledNavLink to={'/governance'}>{t('Governance')}</StyledNavLink>
          <StyledNavLink to={'/destruction'}>{t('Destruction')}</StyledNavLink>
          <StyledNavLink to={'/public'}>{t('Address_announcement')}</StyledNavLink>
          <StyledNavLink to={'/announcement'}>{t('Announcement')}</StyledNavLink>
          <StyledNavLink to={'/introduction'}>{t('Project_intro')}</StyledNavLink>
          <StyledNavLink to={'/exchange'}>{t('Exchange')}</StyledNavLink>
          <StyledNavLink to={'/voting'}>{t('Governance_voting')}</StyledNavLink>
          <StyledNavLink to={'/integral'}>{t('Integral')}</StyledNavLink>
          {/* <StyledNavLink to={'/mine'}>{t('Mine')}</StyledNavLink> */}
          {/* <StyledNavLink to={'/reward'}>{t('Claim_rewards')}</StyledNavLink> */}
          <StyledNavLink to={'/partners'}>{t('Partner')}</StyledNavLink>
          <StyledNavLink to={'/help'}>{t('Help_center')}</StyledNavLink>
          <StyledNavLink to={'/contact'}>{t('Contact_us')}</StyledNavLink>
        </HeaderLinks>
        <SetLanguage />
      </HeaderFrame>
    )
  }
}
