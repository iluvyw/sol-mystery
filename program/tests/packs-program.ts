import * as anchor from '@project-serum/anchor'
import { Program } from '@project-serum/anchor'
import { Keypair } from '@solana/web3.js'
import { PacksProgram } from '../target/types/packs_program'

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
    console.log('Your transaction signature', tx)
  })
})
