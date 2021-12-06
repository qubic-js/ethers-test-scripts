import { getNamedAccounts, ethers } from "hardhat";

async function main() {
  const { CreatureBox: creatureBoxAddress } = await getNamedAccounts();

  console.log("Use CreatureBox at:", creatureBoxAddress);

  // const [address] = process.argv.slice(1);

  const creatureBox = await ethers.getContractAt("CreatureBox", creatureBoxAddress);
  const { hash: txHash } = await creatureBox.mint('0x496Bc91e961Ce9eA239994C483FEE30184dB874A');

  console.log(`Token has been minted successfully, hash:`, txHash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
