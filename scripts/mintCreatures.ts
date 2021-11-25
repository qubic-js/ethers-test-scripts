import { getNamedAccounts, ethers } from "hardhat";

async function main() {
  const { creature: creatureAddress } = await getNamedAccounts();

  console.log("Use Creature at:", creatureAddress);

  const [address] = process.argv.slice(1);

  const creature = await ethers.getContractAt("Creature", creatureAddress);
  const { hash: txHash } = await creature.mint(address, {
    gasPrice: ethers.utils.parseUnits("50", "gwei"),
  });

  console.log(`Token has been minted successfully, hash:`, txHash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
