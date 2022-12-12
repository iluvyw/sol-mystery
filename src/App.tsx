import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from 'pages/Home'
import {
  ConnectionProvider,
  WalletProvider
} from '@solana/wallet-adapter-react'
import { PhantomWalletAdapter, Coin98WalletAdapter } from '@solana/wallet-adapter-wallets'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'

require('@solana/wallet-adapter-react-ui/styles.css')

function App() {
  return (
    <BrowserRouter>
      <ConnectionProvider endpoint={'https://api.devnet.solana.com'}>
        <WalletProvider wallets={[new PhantomWalletAdapter(), new Coin98WalletAdapter()]} autoConnect>
          <WalletModalProvider>
            <Home />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </BrowserRouter>
  )
}

export default App
