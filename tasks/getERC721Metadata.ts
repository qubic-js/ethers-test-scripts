import { task } from "hardhat/config";
import axios from "axios";
import { HardhatRuntimeEnvironment } from "hardhat/types";

task("metadata721", "Get ERC721 metadata")
  .addParam("address", "The contract's address", "string")
  .addParam("tokenId", "The token id", "string")
  .setAction(
    async (
      {
        address = "0x",
        tokenId = "0",
      }: {
        address: string;
        tokenId: string;
      },
      hre: HardhatRuntimeEnvironment
    ): Promise<void> => {
      const { ethers, network } = hre;
      const { name: networkName } = network;

      console.log("Network:", networkName);
      console.log("Contract address:", address, "token id:", tokenId);

      try {
        const contract = await ethers.getContractAt("AnyERC721", address);
        const tokenUri = await contract.tokenURI(
          ethers.BigNumber.from(tokenId)
        );

        let uri = String(tokenUri);

        if (!uri || uri.length === 0) {
          console.error("empty token URI");
          return;
        }

        console.log(`Token URI:`, uri);

        if (uri.startsWith("ipfs://")) {
          uri = uri.replace("ipfs://", "https://ipfs.io/ipfs/");
        }

        const resp = await axios.get(uri);
        console.log(resp.data);
      } catch (e) {
        console.error(e);
      }
    }
  );
