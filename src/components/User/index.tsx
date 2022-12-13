import React from 'react'
import AvatarHolder from 'assets/avatar_holder.jpeg'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'

export default function User() {
  const { publicKey } = useWallet()

  const displayPublicKey = (publicKey: PublicKey | null) => {
    if (publicKey == null) return 'Unknown'
    let str = publicKey.toBase58()
    str = str.slice(0, 4) + '...' + str.slice(-4)
    return str
  }

  return (
    <a
      href={`https://explorer.solana.com/address/${publicKey?.toBase58()}?cluster=devnet`}
      target="_blank"
      className="fixed top-20 right-44 px-10 py-4 flex flex-row items-center z-20 bg-white rounded-full shadow-lg hover:shadow-2xl duration-300 cursor-pointer"
    >
      <h1 className="mr-4">{displayPublicKey(publicKey)}</h1>
      <img
        src={AvatarHolder}
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
    </a>
  )
}
