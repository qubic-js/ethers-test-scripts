import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

task("sighashes", "Get common function signature hashes").setAction(
  async (_, hre: HardhatRuntimeEnvironment): Promise<void> => {
    const { ethers } = hre;

    await Promise.all(
      ["EIP3009", "AnyERC20", "AnyERC721", "AnyERC1155"].map(async (name) => {
        const contract = await ethers.getContractAt(
          name,
          ethers.constants.AddressZero
        );
        console.log(name);
        await Promise.all(
          contract.interface.fragments.map((f) =>
            console.log(
              contract.interface.getSighash(f),
              f.format(ethers.utils.FormatTypes.minimal)
            )
          )
        );
        console.log(" ");
      })
    );
  }
);
