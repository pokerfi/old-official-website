import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import styled from 'styled-components'
import AppBackgroundBody from './components/AppBackgroundBody'
import Header from './components/Header'
import { useViewport } from './components/ViewportProvider'
import web3 from './contracts/initWeb3'
import H5 from './pages/H5'
import routes from './router'
import { SaveAddress } from './store/user/action'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
`
export default function App() {
  const dispatch = useDispatch()
  const { width } = useViewport()

  useEffect(() => {
    getAppInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAppInfo = async () => {
    try {
      const address = await web3.eth.getAccounts()
      if (address) {
        dispatch(SaveAddress(address[0]))
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (width <= 1200) {
    return (
      <AppBackgroundBody>
        <AppWrapper>
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
          <BodyWrapper>
            <H5 />
          </BodyWrapper>
        </AppWrapper>
      </AppBackgroundBody>
    )
  } else {
    return (
      <AppBackgroundBody>
        <div style={{ zoom: window.screen.width / 1920 }}>
          <Header />
        </div>
        <AppWrapper>
          <BodyWrapper>{renderRoutes(routes)}</BodyWrapper>
        </AppWrapper>
      </AppBackgroundBody>
    )
  }
}
