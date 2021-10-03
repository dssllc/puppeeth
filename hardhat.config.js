require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");

const alchemyRinkebyEndpoint = process.env.ALCHEMY_ENDPOINT_RINKEBY || "https://eth-rinkeby.alchemyapi.io/v2/67890";
const privateKey = process.env.PRIVATE_KEY || "0000000000000000000000000000000000000000";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.7",
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      url: alchemyRinkebyEndpoint,
      accounts: [`0x${privateKey}`]
    },
    gasReporter: {
      url: "http://localhost:8545"
    }
  },
  gasReporter: {
    currency: 'USD'
  }
};
