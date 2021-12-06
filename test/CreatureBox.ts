import { getNamedAccounts, ethers } from "hardhat";
import { Signer } from "ethers";

describe("CreatureBox", function () {
  let accounts: Signer[];

  beforeEach(async function () {
    accounts = await ethers.getSigners();
  });

  it("should do something right", async function () {
    // const { CreatureBox: creatureBoxAddress } = await getNamedAccounts();

    // console.log("Use CreatureBox at:", creatureBoxAddress);

  
    // const creatureBox = await ethers.getContractAt("CreatureBox", creatureBoxAddress);
    // const { hash: txHash } = await creatureBox.mint('0x496Bc91e961Ce9eA239994C483FEE30184dB874A');
    // Do something with the accounts
    const CreatureBox = await ethers.getContractFactory("CreatureBox");
    const creatureBox = await CreatureBox.deploy(500);

    await creatureBox.deployed();

    for (let i = 0; i < 200; i++) {
      const tokenId = await creatureBox.computeIndex();
      console.log(tokenId);
    }

    // console.log("Creature deployed to:", creatureBox.address);
  });
});
