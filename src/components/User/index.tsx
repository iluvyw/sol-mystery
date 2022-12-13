import AvatarHolder from 'assets/avatar_holder.jpeg'
import { useWallet } from '@solana/wallet-adapter-react'
import { displayPublicKey } from 'utils/index'
import { useCallback, useState } from 'react'

function UserDropdown() {
  const wallet = useWallet()

  const onDisconnectWallet = async () => {
    await wallet.disconnect()
  }
  
  return (
    <div
      className="fixed top-[116px] right-44 flex flex-col items-center bg-gray-100 w-[200px] h-[150px] pt-12 border-1 border-black rounded-b-[20px] shadow-lg"
    >
      <a
        href={`https://explorer.solana.com/address/${wallet.publicKey?.toBase58()}?cluster=devnet`}
        target="_blank"
        rel="noreferrer"
        className="w-full h-1/2 py-2 flex items-center justify-center hover:shadow-2xl hover:bg-slate-100"
      >
        View account in explorer
      </a>
      <button
        className="w-full h-1/2 py-2 flex items-center justify-center hover:shadow-2xl hover:bg-slate-100 rounded-b-[20px]"
        onClick={onDisconnectWallet}
      >
        Disconnect
      </button>
    </div>
  )
}

export default function User() {
  const { publicKey } = useWallet()

  const [isDropdown, setIsDropDown] = useState<boolean>(false)

  const openUserDropdown = useCallback(() => {
    console.log(isDropdown)
    setIsDropDown(!isDropdown)
  }, [isDropdown])

  return (
    <>
      <button
        className="fixed w-[200px] top-20 right-44 px-10 py-4 flex flex-row items-center z-20 bg-white rounded-full shadow-lg hover:shadow-2xl duration-300 cursor-pointer"
        onClick={openUserDropdown}
      >
        <h1 className="mr-4">{displayPublicKey(publicKey)}</h1>
        <img
          src={AvatarHolder}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      </button>
      {isDropdown && <UserDropdown />}
    </>
  )
}
