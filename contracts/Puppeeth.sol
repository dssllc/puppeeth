//                                     _   _
//   _ __  _   _ _ __  _ __   ___  ___| |_| |__
//  | '_ \| | | | '_ \| '_ \ / _ \/ _ \ __| '_ \
//  | |_) | |_| | |_) | |_) |  __/  __/ |_| | | |
//  | .__/ \__,_| .__/| .__/ \___|\___|\__|_| |_|
//  |_|         |_|   |_|
//
//  Original artwork by Olivia Porter

//SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title puppeeth
/// @author Decentralized Software Systems, LLC
/// @notice NFT avatar art collection hosted on IPFS and tokenized on Ethereum
contract Puppeeth is ERC721, Ownable {
    // Counter.
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Price.
    uint256 constant TOKEN_PRICE = .015 ether;

    // Invalid token error.
    error InvalidTokenID();

    // Invalid payment error.
    error InvalidPayment();

    /**
     * @dev Constructor
     */
    constructor() ERC721("puppeeth", "PUPPEETH") {
        uint16[5] memory reserved = [
            11111,
            22222,
            33333,
            44444,
            55555
        ];
        for (uint8 i = 0; i < reserved.length; i++) {
            _tokenIds.increment();
            _safeMint(_msgSender(), reserved[i]);
        }
    }

    /**
     * @dev See {ERC721-_baseURI}.
     */
    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmXmjY1bFMuH5fCGbZ8CHd8fFWzJRZxTKQo7aievy7LUou/";
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(super.tokenURI(tokenId), ".json"));
    }

    /**
     * @dev Check if ID is valid.
     */
    function validId(uint16 tokenId) public pure returns (bool) {
        return tokenId >= 11111 && tokenId <= 55555
            && tokenId % 10 > 0 && tokenId % 10 <= 5
            && tokenId % 100 > 10 && tokenId % 100 <= 55
            && tokenId % 1000 > 100 && tokenId % 1000 <= 555
            && tokenId % 10000 > 1000 && tokenId % 10000 <= 5555;
    }

    /**
     * @dev Public mint.
     */
    function publicMint(uint16 tokenId) public payable {
        if (msg.value < TOKEN_PRICE)
            revert InvalidPayment();

        if (!validId(tokenId))
            revert InvalidTokenID();

        _tokenIds.increment();
        _safeMint(_msgSender(), tokenId);
    }

    /**
     * @dev Withdrawl accrued balance.
     */
    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    /**
     * @dev Get total number of tokens.
     */
    function totalTokens() public view returns (uint256) {
      return _tokenIds.current();
    }

    /**
     * @dev Indicate if token is minted.
     */
    function tokenMinted(uint16 tokenId) public view returns (bool) {
      return _exists(tokenId);
    }
}
