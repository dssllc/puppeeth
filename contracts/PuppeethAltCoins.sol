//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

//                                     _   _
//   _ __  _   _ _ __  _ __   ___  ___| |_| |__
//  | '_ \| | | | '_ \| '_ \ / _ \/ _ \ __| '_ \
//  | |_) | |_| | |_) | |_) |  __/  __/ |_| | | |
//  | .__/ \__,_| .__/| .__/ \___|\___|\__|_| |_|
//  |_|         |_|   |_|
//         _ _            _
//    __ _| | |_ ___ ___ (_)_ __  ___
//   / _` | | __/ __/ _ \| | '_ \/ __|
//  | (_| | | || (_| (_) | | | | \__ \
//   \__,_|_|\__\___\___/|_|_| |_|___/
//
//  web3 development by Decentralized Software Systems, LLC
//  https://puppeeth.art

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";

/// @title puppeeth altcoins
/// @author Decentralized Software Systems, LLC
contract PuppeethAltCoins is ERC721Holder, Ownable, ReentrancyGuard {

    using Address for address;

    // Price.
    uint256 constant private PUPPEETH_TOKEN_PRICE = .015 ether;

    // Puppeeth contract address.
    address private puppeethContract;

    // Mapping of alt coins and relative prices.
    mapping(address => uint256) private altCoins;

    /// @notice Deposit minting funds in ether.
    function depositMintingFunds() external payable {
        require(msg.value > 0, "Invalid minting funds amount");
    }

    /// @notice Withdraw minting funds.
    function withdrawMintingFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    /// @notice Withdraw alt coin.
    function withdrawAltCoin(
        address coinAddress,
        uint256 amt
    ) external onlyOwner {
        require(altCoins[coinAddress] > 0, "Invalid alt coin address");
        // Transfer tokens.
        coinAddress.functionCall(
            abi.encodeWithSignature(
                "transfer(address,uint256)",
                msg.sender,
                amt
            ),
            "Alt coin withdraw failed"
        );
    }

    /// @notice Get puppeeth contract.
    function getPuppeethContract() external view returns (address) {
        return puppeethContract;
    }

    /// @notice Set puppeeth contract address.
    function setPuppeethContract(address contractAddress) external onlyOwner {
        puppeethContract = contractAddress;
    }

    /// @notice Get alt coin mapping.
    function getAltCoin(address coinAddress) external view returns (uint256) {
        return altCoins[coinAddress];
    }

    /// @notice Set alt coin address / price mapping entry.
    function setAltCoin(
        address coinAddress,
        uint256 price
    ) external onlyOwner {
        altCoins[coinAddress] = price;
    }

    /// @notice Mint by alt coin. Assumes token approval for this contract.
    function mintByAltCoin(
        address coinAddress,
        uint16 tokenId
    ) external nonReentrant {
        // Validate alt coin is registered.
        require(altCoins[coinAddress] > 0, "Invalid alt coin address");
        // Transfer tokens.
        coinAddress.functionCall(
            abi.encodeWithSignature(
                "transferFrom(address,address,uint256)",
                msg.sender,
                address(this),
                altCoins[coinAddress]
            ),
            "Alt coin payment failed"
        );
        // Mint.
        puppeethContract.functionCallWithValue(
            abi.encodeWithSignature("mint(uint16)", tokenId),
            PUPPEETH_TOKEN_PRICE,
            "NFT mint failed"
        );
        // Transfer NFT.
        puppeethContract.functionCall(
            abi.encodeWithSignature(
                "transferFrom(address,address,uint256)",
                address(this),
                msg.sender,
                tokenId
            ),
            "NFT transfer failed"
        );
    }
}
