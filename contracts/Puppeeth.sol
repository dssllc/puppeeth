//                                     _   _     
//   _ __  _   _ _ __  _ __   ___  ___| |_| |__  
//  | '_ \| | | | '_ \| '_ \ / _ \/ _ \ __| '_ \ 
//  | |_) | |_| | |_) | |_) |  __/  __/ |_| | | |
//  | .__/ \__,_| .__/| .__/ \___|\___|\__|_| |_|
//  |_|         |_|   |_|  
//
//  Original artwork by Olivia Porter

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title puppeeth
/// @author Decentralized Software Systems, LLC
/// @notice NFT avatar art collection hosted on IPFS and tokenized on Ethereum
contract Puppeeth is ERC721, Ownable {

    // Starting ID.
    uint16 startingId = 11111;

    // Price.
    uint256 constant TOKEN_PRICE = .015 ether;

    // Array of minted token IDs.
    uint16[] private _mintedTokens;

    // Invalid token event.
    error InvalidTokenID();

    // Invalid payment event.
    error InvalidPayment();

    /**
     * @dev Constructor
     */
    constructor() ERC721("puppeeth", "PUPPEETH") {
        for (uint8 i = 1; i <= 5; i++) {
            _mintedTokens.push(i * startingId);
            _safeMint(_msgSender(), i * startingId);
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
     * @dev Owner-only mint
     */
    function ownerMint(uint16 tokenId)
        public onlyOwner
    {
        if (!validId(tokenId))
            revert InvalidTokenID();
        
        _mintedTokens.push(tokenId);
        _safeMint(_msgSender(), tokenId);
    }

    /**
     * @dev Public mint
     */
    function publicMint(uint16 tokenId) public payable {
        if (msg.value < TOKEN_PRICE)
            revert InvalidPayment();
            
        if (!validId(tokenId))
            revert InvalidTokenID();

        _mintedTokens.push(tokenId); 
        _safeMint(_msgSender(), tokenId);
    }
   
    /**
     * @dev Withdrawl accrued balance
     */
    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    /**
     * @dev Array of minted token IDs
     */
    function mintedTokens() public view returns (uint16[] memory) {
        return _mintedTokens;
    }
}
