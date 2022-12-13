import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useCallback, useState } from 'react'
import { WalletNotConnectedError } from '@solana/wallet-adapter-base'
import { PublicKey } from '@solana/web3.js'
import { getOrCreateAssociatedTokenAccount } from 'libs/getOrCreateAssociatedTokenAccount'
import { Transaction } from '@solana/web3.js'
import { createTransferInstruction } from 'libs/createTransferInstructions'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { LoadingOutlined } from '@ant-design/icons'

interface ModalProps {
  closeModal: () => void
  chosenNft: string[]
}

export default function Modal({ closeModal, chosenNft }: ModalProps) {
  const [boxName, setBoxName] = useState<string>('')
  const [price, setPrice] = useState<string>('0')
  const { connection } = useConnection()
  const { publicKey, signTransaction, sendTransaction } = useWallet()
  const [loading, setLoading] = useState<boolean>(false)

  const sendSPLTransaction = useCallback(
    async (toPubkey: string, mintAddress: string) => {
      if (!toPubkey || !mintAddress) return

      try {
        if (!publicKey || !signTransaction) throw new WalletNotConnectedError()
        const toPublicKey = new PublicKey(toPubkey)
        const mint = new PublicKey(mintAddress)

        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          publicKey,
          mint,
          publicKey,
          signTransaction
        )

        console.log('From', fromTokenAccount.address.toBase58())

        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          publicKey,
          mint,
          toPublicKey,
          signTransaction
        )

        console.log('To', toTokenAccount.address.toBase58())

        const transaction = new Transaction().add(
          createTransferInstruction(
            fromTokenAccount.address, // source
            toTokenAccount.address, // dest
            publicKey,
            1,
            [],
            TOKEN_PROGRAM_ID
          )
        )

        const blockHash = await connection.getRecentBlockhash()
        transaction.feePayer = await publicKey
        transaction.recentBlockhash = await blockHash.blockhash
        const signed = await signTransaction(transaction)

        const tx = await connection.sendRawTransaction(signed.serialize())
        console.log('Tx', tx)
        await connection.confirmTransaction(tx)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log('Tx error', error)
      }
    },
    [publicKey, sendTransaction, connection]
  )

  const clickHandler = async () => {
    console.log(boxName, price, chosenNft)
    setLoading(true)
    for (let i = 0; i < chosenNft.length; i++) {
      await sendSPLTransaction(
        '86F7gaSSkZyxVCybvrM6aGghx7cQPTCkVTFrGvUWaPyA',
        chosenNft[i]
      )
    }
    console.log('Done')
    setLoading(false)
    closeModal()
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-40 flex flex-col items-center justify-center">
      <div
        onClick={closeModal}
        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60"
      ></div>
      <div className="relative h-3/4 w-2/3 bg-white shadow-lg rounded-lg z-10 flex flex-col items-center justify-center overflow-hidden">
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-white z-50">
            <LoadingOutlined />
            <h1>Waiting for transaction</h1>
          </div>
        )}
        <h1 className="font-bold text-4xl mb-10">Configure your listing</h1>
        <h2 className="my-4">Enter the name of your boxes</h2>
        <input
          value={boxName}
          onChange={(e) => setBoxName(e.target.value)}
          className="w-40 h-10 border border-black outline-none rounded-full text-center text-xl font-bold"
        />
        <h2 className="my-4">
          Each box will contain 3 NFTs, enter the price of your boxes
        </h2>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-40 h-10 border border-black outline-none rounded-full text-center text-xl font-bold mb-10"
        />
        <button
          onClick={clickHandler}
          className="w-[200px] h-[60px] bg-white shadow-lg hover:shadow-2xl duration-300 px-10 rounded-full cursor-pointer font-semibold text-lg leading-[30px] z-10"
        >
          Sell
        </button>
      </div>
    </div>
  )
}
