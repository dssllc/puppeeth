require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");

const alchemyMainnetEndpoint = process.env.ALCHEMY_ENDPOINT_MAINNET || "https://eth-rinkeby.alchemyapi.io/v2/67890";
const alchemyRinkebyEndpoint = process.env.ALCHEMY_ENDPOINT_RINKEBY || "https://eth-rinkeby.alchemyapi.io/v2/67890";
const privateKey = process.env.PRIVATE_KEY || "0000000000000000000000000000000000000000";
const etherScanAPIKey = process.env.ETHERSCAN_API_KEY || "";
const cmcAPIKey = process.env.CMC_API_KEY || "";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: './app/src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    mainnet: {
      url: alchemyMainnetEndpoint,
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
    enabled: false,
    showTimeSpent: true,
    coinmarketcap: cmcAPIKey
  },
  etherscan: {
    apiKey: etherScanAPIKey
  }
};
