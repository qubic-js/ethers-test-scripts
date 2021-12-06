import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

task("testxor", "Get function signature hash")
  .addParam("op1", "op1", "")
  .addParam("op2", "op2", "")
  .addFlag("deploy", "deploy contract")
  .setAction(
    async (
      {
        op1 = "",
        op2 = "",
        deploy = false,
      }: {
        op1: string;
        op2: string;
        deploy: boolean;
      },
      hre: HardhatRuntimeEnvironment
    ): Promise<void> => {
      const { getNamedAccounts, ethers } = hre;

      console.log("op1", op1, "op2", op2, "deploy", deploy);
      if (deploy) {
        const accounts = await ethers.getSigners();

        console.log(
          "Accounts:",
          accounts.map((a) => a.address)
        );

        const Contract = await ethers.getContractFactory("TestXOR");

        console.log("Deploying ....");

        const contract = await Contract.deploy();

        await contract.deployed();

        console.log("TestXOR deployed to:", contract.address);
      } else {
        const { testXOR: testXORAddress } = await getNamedAccounts();

        const contract = await ethers.getContractAt("TestXOR", testXORAddress);
        const { hash: txHash } = await contract.testXOR(op1, op2, 200, {
          gasLimit: ethers.BigNumber.from(5000000),
        });

        console.log("txHash", txHash);
      }
    }
  );
