import { FindNftsByOwnerOutput, Metaplex } from '@metaplex-foundation/js'
import { getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token'
import { clusterApiUrl, Connection, Keypair, PublicKey } from '@solana/web3.js'

export async function nftsOfOwner(
  pubkey: PublicKey | null
): Promise<FindNftsByOwnerOutput> {
  const connection = new Connection(clusterApiUrl('devnet'))
  const metaplex = new Metaplex(connection)

  let nfts: FindNftsByOwnerOutput = []
  if (pubkey != null) {
    nfts = await metaplex.nfts().findAllByOwner({
      owner: pubkey
    })
  }

  return nfts
}

async function getMetaplexAssociatedTokenAccount(
  pubkey: PublicKey,
  mint: PublicKey,
  payer: Keypair
): Promise<string> {
  const connection = new Connection(clusterApiUrl('devnet'))
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    pubkey
  )
  return tokenAccount.address.toBase58()
}

export async function transferTo(
  payer: Keypair,
  mint: PublicKey,
  to: PublicKey
): Promise<string> {
  const connection = new Connection(clusterApiUrl('devnet'))
  const fromAccount = getMetaplexAssociatedTokenAccount(
    payer.publicKey,
    mint,
    payer
  )
  const toAccount = getMetaplexAssociatedTokenAccount(to, mint, payer)
  const signature = await transfer(
    connection,
    payer,
    new PublicKey(fromAccount),
    new PublicKey(toAccount),
    payer.publicKey,
    1
  )
  return signature
}
