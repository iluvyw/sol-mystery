import { Metadata, JsonMetadata, Nft, Sft } from '@metaplex-foundation/js'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface NftCardProps {
  metadata: any
  chooseNft: (nft: string) => void
  removeNft: (nft: string) => void
}

export default function NftCard({
  metadata,
  chooseNft,
  removeNft
}: NftCardProps) {
  const [nft, setNft] = useState<any>(null)
  const [mintAddress, setMintAddress] = useState<string>('')
  const [isChosen, setIsChosen] = useState<boolean>(false)

  useEffect(() => {
    async function getNft() {
      setMintAddress(metadata.mintAddress.toBase58())
      if (metadata.uri) {
        const data = await axios.get(metadata.uri)
        data.data && setNft(data.data)
        console.log(data.data)
      }
    }
    getNft()
  }, [metadata])

  const clickHandler = () => {
    if (isChosen) {
      removeNft(mintAddress)
    } else {
      chooseNft(mintAddress)
    }
    setIsChosen(!isChosen)
  }

  return (
    <div
      onClick={clickHandler}
      className={`bg-white shadow-lg rounded-2xl h-[50vh] overflow-hidden flex flex-col hover:scale-105 duration-300 cursor-pointer ${
        isChosen && 'grayscale'
      }`}
    >
      {nft ? (
        <img
          src={nft && nft.image}
          alt="nft"
          className="w-full h-[80%] object-cover bg-gray-200"
        />
      ) : (
        <div className="bg-white w-full h-full"></div>
      )}
      <h1 className="text-center flex flex-col items-center justify-center h-full font-bold text-xl">
        {nft && nft.name}
      </h1>
    </div>
  )
}
