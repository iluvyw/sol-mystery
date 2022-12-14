import { PublicKey } from '@solana/web3.js'

export function displayPublicKey(publicKey: PublicKey | null): String {
  if (publicKey == null) return 'Unknown'
  let str = publicKey.toBase58()
  str = str.slice(0, 4) + '...' + str.slice(-4)
  return str
}
