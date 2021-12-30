//SPDX-License-Identifier: NOLICENSE
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PuppeethCoin is ERC20 {

  // Set constants.
  string private constant TOKEN_NAME = "PuppeethCoin";
  string private constant TOKEN_SYMBOL = "PUPCOIN";

  /**
    * @dev Constructor.
    *
    * Constructor method used in deployment.
    */
  constructor(uint256 initialSupply) ERC20(TOKEN_NAME, TOKEN_SYMBOL) {
    _mint(msg.sender, initialSupply);
  }

}
