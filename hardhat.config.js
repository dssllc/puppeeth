require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");

const alchemyRinkebyEndpoint = process.env.ALCHEMY_ENDPOINT_RINKEBY || "https://eth-rinkeby.alchemyapi.io/v2/67890";
const privateKey = process.env.PRIVATE_KEY || "0000000000000000000000000000000000000000";
const cmcAPIKey = process.env.CMC_API_KEY || "";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337
    },
    mainnet: {
      url: alchemyRinkebyEndpoint,
      accounts: [`0x${privateKey}`]
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
    currency: "USD",
    enabled: true,
    showTimeSpent: true,
    coinmarketcap: cmcAPIKey
  }
};
