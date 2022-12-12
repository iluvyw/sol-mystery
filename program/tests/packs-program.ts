import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { PacksProgram } from "../target/types/packs_program";

describe("packs-program", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.PacksProgram as Program<PacksProgram>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
