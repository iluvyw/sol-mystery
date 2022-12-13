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
