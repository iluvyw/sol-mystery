import { useCallback, useMemo } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const { publicKey } = useWallet()

  const buttonContent = useMemo(() => {
    console.log('publickKey', publicKey)
    if (publicKey) return 'Continue'
    return 'Connect Wallet'
  }, [publicKey])

  const onConnectWallet = useCallback(() => {
    if (!publicKey) return
    navigate('/nft-collection')
  }, [navigate, publicKey])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-black font-outfit">
      <div className="h-[175px] text-8xl font-bold leading-[121px] mb-[15px]">
        Sol Mystery
      </div>
      <div className="h-[80px] text-base font-light leading-5">
        Owners of NFTs can go to Sol Mystery to sell their assets there in the
        form of mystery boxes.
      </div>
      <WalletMultiButton
        className="w-[270px] h-[80px] mt-[15px] flex items-center justify-center bg-white rounded-[20px] text-2xl text-black leading-[30px] font-semibold shadow-button hover:bg-slate-200"
        children={buttonContent}
        onClick={onConnectWallet}
      />
      <div className="h-[80px] mt-[205px] font-semibold text-2xl leading-[30px]">
        Powered by TroubleMakers
      </div>
    </div>
  )
}

export default Home
