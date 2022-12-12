import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from 'pages/Home'
import NFT from 'pages/NFT'

import {
  ConnectionProvider,
  WalletProvider
} from '@solana/wallet-adapter-react'
import {
  PhantomWalletAdapter,
  Coin98WalletAdapter
} from '@solana/wallet-adapter-wallets'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'

require('@solana/wallet-adapter-react-ui/styles.css')

function App() {
  return (
    <ConnectionProvider endpoint={'https://api.devnet.solana.com'}>
      <WalletProvider
        wallets={[new PhantomWalletAdapter(), new Coin98WalletAdapter()]}
        autoConnect
      >
        <WalletModalProvider>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </WalletModalProvider>
        <Routes>
          <Route path="/nft-collection" element={<NFT />}></Route>
        </Routes>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
