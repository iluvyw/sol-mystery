import * as anchor from '@project-serum/anchor'
import { Program } from '@project-serum/anchor'
import { Keypair } from '@solana/web3.js'
import { PacksProgram } from '../target/types/packs_program'
import * as borsh from 'borsh'
import crypto from 'crypto'

class Assignable {
  constructor(properties: { [x: string]: any }) {
    Object.keys(properties).map((key) => {
      return (this[key] = properties[key])
    })
  }
}
class BorshPackPdaAccountData extends Assignable {
  mint0Hash: Uint8Array
  mint1Hash: Uint8Array
  mint2Hash: Uint8Array
}
const BorshPackPdaAccountSchema = new Map([
  [
    BorshPackPdaAccountData,
    {
      kind: 'struct',
      fields: [
        ['discriminator', 'u64'],
        ['mint0Hash', [64]],
        ['mint1Hash', [64]],
        ['mint2Hash', [64]]
      ]
    }
  ]
])
const ENCRYPT_ALGORITHM = 'aes-256-cbc'
describe('packs-program', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  const program = anchor.workspace.PacksProgram as Program<PacksProgram>

  it('Create pack', async () => {
    // create user
    const userAccount = Keypair.generate()
    await provider.connection.requestAirdrop(
      userAccount.publicKey,
      1 * anchor.web3.LAMPORTS_PER_SOL
    )
    await new Promise((r) => setTimeout(r, 1000))
    const balance = await provider.connection.getBalance(userAccount.publicKey)
    console.log({ balance })

    // create mint account
    const mint0 = Keypair.generate()
    const mint1 = Keypair.generate()
    const mint2 = Keypair.generate()

    // create pda
    const [pda, _] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        mint0.publicKey.toBuffer(),
        mint1.publicKey.toBuffer(),
        mint2.publicKey.toBuffer()
      ],
      program.programId
    )
    const tx = await program.methods
      .createPack(mint0.publicKey, mint1.publicKey, mint2.publicKey)
      .accounts({
        payer: userAccount.publicKey,
        packPda: pda
      })
      .signers([userAccount])
      .rpc()

    // get account info
    const pda_account = await provider.connection.getAccountInfo(pda)
    const data = pda_account.data
    // deserialize data
    const decodedData = borsh.deserialize(
      BorshPackPdaAccountSchema,
      BorshPackPdaAccountData,
      data
    )
    console.log('mint0.publicKey:', mint0.publicKey)
    // RUN THIS: openssl enc -aes-256-cbc -k secret -P -pbkdf2
    // salt=9A1562D052D0ED65
    // key=85FF301E0BB814E18A7C684B3BC4B6F641F2EC34161D6AA47105D85E445D4704
    // iv =2811F9461D9CC4EBF6454C251028BC4F

    // TODO: fix this
    console.log(process.env.SECRET_KEY, process.env.SECRET_IV)
    const decipher = crypto.createDecipheriv(
      ENCRYPT_ALGORITHM,
      crypto.scryptSync(process.env.SECRET_KEY, 'salt', 32),
      Buffer.alloc(16, 0)
    )
    let decrypted = decipher.update(decodedData.mint0Hash)
    // const final = decipher.final()
    // decrypted = Buffer.concat([decrypted, final])
    // decrypted = decipher.final('utf8')
    console.log(decrypted.toString('base64'))
  })
})
