import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './assets/css/index.css'
import { HashRouter } from 'react-router-dom'
import { ThemedGlobalStyle, ThemeProvider } from './theme/index'
import store from './store'
import { Provider } from 'react-redux'
import './i18n'
import { UseWalletProvider } from 'use-wallet'
import { ViewportProvider } from './components/ViewportProvider'
import { CHAIN_ID, RPC_URL } from './contracts/constant'

ReactDOM.render(
  <Provider store={store}>
    <UseWalletProvider chainId={CHAIN_ID} connectors={{ walletconnect: { rpcUrl: RPC_URL } }}>
      <ViewportProvider>
        <ThemeProvider>
          <ThemedGlobalStyle />
          <HashRouter>
            <App />
          </HashRouter>
        </ThemeProvider>
      </ViewportProvider>
    </UseWalletProvider>
  </Provider>,
  document.getElementById('root'),
)
