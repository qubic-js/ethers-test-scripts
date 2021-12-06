import { ethers } from "hardhat";

async function main() {
  const accounts = await ethers.getSigners();

  console.log(
    "Accounts:",
    accounts.map((a) => a.address)
  );

  const CreatureBox = await ethers.getContractFactory("CreatureBox");
  const creatureBox = await CreatureBox.deploy(500);

  await creatureBox.deployed();

  console.log("Creature deployed to:", creatureBox.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
