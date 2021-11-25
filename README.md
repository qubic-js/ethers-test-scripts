# ethers-test-scripts

# Setup
```
yarn && yarn hardhat compile
```

Prepare your .env file
```
// Copy the example .env and fill your `INFURA_API_KEY`
cp .env.example .env
```

---

# Example of getting ERC721 metadata
```
yarn hardhat metadata721 --address 0xba30E5F9Bb24caa003E9f2f0497Ad287FDF95623 --token-id 90 --network mainnet
```

# Example of getting ERC1155 metadata
```
yarn hardhat metadata1155 --address 0x3edf71a31b80Ff6a45Fdb0858eC54DE98dF047AA --token-id 1144 --network mainnet
```
