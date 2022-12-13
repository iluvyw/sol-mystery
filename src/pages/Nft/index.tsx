import React, { FC, useEffect, useState } from 'react'
import { nftsOfOwner } from 'libs/index'
import { PublicKey } from '@solana/web3.js'
import { FindNftsByOwnerOutput, Metadata } from '@metaplex-foundation/js'
import NftCard from 'pages/Nft/NftCard'

export default function Nft() {
  const [nfts, setNfts] = useState<FindNftsByOwnerOutput>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    async function getNfts() {
      setLoading(true)
      const data = await nftsOfOwner(
        new PublicKey('86F7gaSSkZyxVCybvrM6aGghx7cQPTCkVTFrGvUWaPyA')
      )
      setNfts(data)
      setLoading(false)
    }
    getNfts()
  }, [])

  return (
    <div className="relative w-screen h-screen flex flex-col items-center px-44 font-outfit overflow-x-hidden overflow-y-scroll">
      <h1 className="font-bold text-4xl mt-28">Your NFTs</h1>
      {!loading ? (
        <div className="w-full grid grid-cols-3 gap-6 my-10">
          {nfts.map((nft, index) => (
            <div key={index} className="w-full">
              <NftCard metadata={nft} />
            </div>
          ))}
        </div>
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
      <button className="fixed bottom-10 w-[200px] h-[60px] bg-white shadow-lg hover:shadow-2xl duration-300 px-10 rounded-2xl cursor-pointer font-semibold text-lg leading-[30px] z-10">
        List On Market
      </button>
    </div>
  )
}
