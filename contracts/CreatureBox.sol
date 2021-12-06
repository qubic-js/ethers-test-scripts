// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CreatureBox is ERC721Enumerable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdTracker;

    uint8[] residue;
    uint128[] record;
    uint256 constant CONSTANT128 = 128;
    // sums of residue
    uint256 totalResidue;

    event TokenIdGenerated(uint256 indexed tokenId);

    constructor(uint256 numberNFT) ERC721("CreatureBox", "CREATURE_BOX") {
        uint256 length = numberNFT / CONSTANT128;
        uint256 compare = (numberNFT - 1) / CONSTANT128;
        if (length == compare) {
            length += 1;
        }
        record = new uint128[](length);
        residue = new uint8[](length);
        for (uint256 i = 0; i < length - 1; i++) {
            residue[i] = 128;
        }
        residue[length - 1] = uint8(numberNFT - ((length - 1) * 128));
        totalResidue = numberNFT;
    }

    function computeIndex() public returns (uint256) {
        uint256 value = uint256(blockhash(block.number)) % totalResidue;
        uint256 regionIndex = 0;
        // find index
        uint256 position = uint256(value);
        for (uint256 i = 0; i < residue.length; i++) {
            regionIndex += residue[i];
            if (regionIndex > value) {
                regionIndex = i - 1;
                break;
            }
            position -= residue[i];
        }
        residue[regionIndex] = residue[regionIndex] - 1;
        totalResidue = totalResidue - 1;
        uint128 searchNumber = record[regionIndex];
        // 128bit user 128. Maybe use a constant is better.
        uint256 countzero = 0;
        uint256 positionIndex = 0;
        for (uint256 i = 0; i < CONSTANT128; i++) {
            if (countzero == position) {
                positionIndex = i;
                break;
            }
            if (searchNumber & 1 == 0) {
                countzero++;
            }
            searchNumber >>= 1;
        }
        record[regionIndex] ^= uint128(1 << positionIndex);
        uint256 tokenId = CONSTANT128 * regionIndex + positionIndex;
        emit TokenIdGenerated(tokenId);
        return tokenId;
    }

    function mint(address to) public virtual returns (uint256 tokenId) {
        tokenId = computeIndex();
        _mint(to, tokenId);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "https://creatures-api.opensea.io/api/creature/";
    }

    function contractURI() public pure returns (string memory) {
        return "https://creatures-api.opensea.io/contract/opensea-creatures";
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
