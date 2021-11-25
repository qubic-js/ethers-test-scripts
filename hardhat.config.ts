import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";
import * as dotenv from "dotenv";

import "./tasks";

dotenv.config({ path: __dirname + "/.env" });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

export default {
  solidity: "0.8.4",
  defaultNetwork: "rinkeby",
  networks: {
    mainnet: {
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    rinkeby: {
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    mumbai: {
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    polygon: {
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
  },
  namedAccounts: {
    // Test NFT
    creature: {
      rinkeby: "0xC730b891F4FF8b659ab4Fc8D362239907cb99c17",
      polygon: "0xda5F28AA697c6066c5f03f0A56007fD03932be86",
      mumbai: "0x8C457b37013369D130a7Ef293979cD48869dEe5E",
    },
    // Test BraveSeriesMoreWant NFT
    BraveSeriesMoreWant: {
      rinkeby: "0x8B12160A998890034Af14a5458b0e1cBB3E0865e",
    },
  },
};
