import { useEffect, useState } from 'react'
import { nftsOfOwner } from 'libs/index'
import { FindNftsByOwnerOutput, Metadata } from '@metaplex-foundation/js'
import NftCard from 'pages/Nft/NftCard'
import User from 'components/User'
import { useWallet } from '@solana/wallet-adapter-react'
import Modal from './Modal'
import { useNavigate } from 'react-router-dom'

export default function Nft() {
  const [nfts, setNfts] = useState<FindNftsByOwnerOutput>([])
  const [chosenNft, setChosenNft] = useState<string[]>([]) // List of mint addresses
  const [loading, setLoading] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { publicKey } = useWallet()
  const navigate = useNavigate()


  useEffect(() => {
    async function getNfts() {
      setLoading(true)
      const data = await nftsOfOwner(publicKey)
      setNfts(data)
      setLoading(false)
    }
    getNfts()
  }, [publicKey])

  const chooseNft = (nft: string) => {
    setChosenNft([...chosenNft, nft])
  }

  const removeNft = (nft: string) => {
    setChosenNft(chosenNft.filter((item) => item !== nft))
  }

  const sellAvailable = () => {
    return chosenNft.length > 0 && chosenNft.length % 3 === 0
  }

  useEffect(() => {
    if (!publicKey) navigate('/')
  }, [navigate, publicKey])

  return (
    <div className="relative w-screen h-screen flex flex-col items-center px-44 font-outfit overflow-x-hidden overflow-y-scroll">
      {openModal && (
        <Modal closeModal={() => setOpenModal(false)} chosenNft={chosenNft} />
      )}
      <User />
      <h1 className="font-bold text-4xl mt-36">Your NFTs</h1>
      {!loading ? (
        nfts.length > 0 ? (
          <div className="w-full grid grid-cols-3 gap-6 my-10">
            {nfts.map((nft, index) => (
              <div key={index} className="w-full">
                <NftCard
                  metadata={nft}
                  chooseNft={chooseNft}
                  removeNft={removeNft}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <h1 className="-translate-y-10 text-lg">Empty</h1>
          </div>
        )
      ) : (
        <div className="w-full grid grid-cols-3 gap-6 my-10">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-gray-200 shadow-lg rounded-2xl h-[50vh] overflow-hidden animate-pulse"
            ></div>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpenModal(true)}
        disabled={!sellAvailable()}
        className={`fixed bottom-10 w-[200px] h-[60px] bg-white shadow-lg hover:shadow-2xl duration-300 px-10 rounded-2xl cursor-pointer font-semibold text-lg leading-[30px] z-10 ${
          !sellAvailable() && 'grayscale opacity-50'
        }`}
      >
        List On Market
      </button>
    </div>
  )
}
