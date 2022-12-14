import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from 'pages/Home'
import Nft from 'pages/Nft'
import MysteryBox from 'pages/MysteryBox'

import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'

require('@solana/wallet-adapter-react-ui/styles.css')

function App() {

  
  return (
    <Routes>
      <Route
        path="/"
        element={
          <WalletModalProvider>
            <Home />
          </WalletModalProvider>
        }
      />
      <Route path="/nft" element={<Nft />}></Route>
      <Route path="/box" element={<MysteryBox />}></Route>
    </Routes>
  )
}

export default App
