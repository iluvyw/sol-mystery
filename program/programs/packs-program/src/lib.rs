use anchor_lang::prelude::*;
use magic_crypt::{new_magic_crypt, MagicCryptTrait};

declare_id!("ASqbFGxqkxMJWcG25pguvvS5p2JAQToR3HLMVV8T3WNL");

#[program]
pub mod packs_program {
    use super::*;

    pub fn create_pack(
        ctx: Context<CreatePack>,
        mint0: Pubkey,
        mint1: Pubkey,
        mint2: Pubkey,
    ) -> Result<()> {
        let pack_pda = &mut ctx.accounts.pack_pda;
        let secret_key = env!("SECRET_KEY");
        let magic_crypt = new_magic_crypt!(secret_key, 256);

        pack_pda.mint0 = magic_crypt.encrypt_bytes_to_base64(mint0.as_ref());
        pack_pda.mint1 = magic_crypt.encrypt_bytes_to_base64(mint1.as_ref());
        pack_pda.mint2 = magic_crypt.encrypt_bytes_to_base64(mint2.as_ref());
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(mint0: Pubkey, mint1: Pubkey, mint2: Pubkey)]
pub struct CreatePack<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(init_if_needed, payer=payer, space=32+32+32+8, seeds=[mint0.as_ref(),mint1.as_ref(),mint2.as_ref()], bump)]
    pub pack_pda: Account<'info, Pack>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Pack {
    mint0: [u8; 64],
    mint1: [u8; 64],
    mint2: [u8; 64],
}
