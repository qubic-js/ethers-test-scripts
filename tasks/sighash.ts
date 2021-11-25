import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

task("sighash", "Get function signature hash")
  .addParam("abi", "The contract's ABI", "string")
  .setAction(
    async (
      {
        abi = "",
      }: {
        abi: string;
      },
      hre: HardhatRuntimeEnvironment
    ): Promise<void> => {
      const { ethers } = hre;

      const hash = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(abi)
      ) as string;
      console.log(hash.substr(0, 10));
    }
  );
