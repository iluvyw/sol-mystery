import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import {
  ConnectionProvider,
  WalletProvider
} from '@solana/wallet-adapter-react'
import {
  PhantomWalletAdapter,
  Coin98WalletAdapter
} from '@solana/wallet-adapter-wallets'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConnectionProvider endpoint={'https://api.devnet.solana.com'}>
        <WalletProvider
          wallets={[new PhantomWalletAdapter(), new Coin98WalletAdapter()]}
          autoConnect
        >
          <App />
        </WalletProvider>
      </ConnectionProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
