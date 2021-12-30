const hre = require("hardhat");

async function main() {
  const PuppeethAltCoinsContract = await hre.ethers.getContractFactory("PuppeethAltCoins");
  const PuppeethAltCoins = await PuppeethAltCoinsContract.deploy();

  await PuppeethAltCoins.deployed();

  console.log("PuppeethAltCoins deployed to:", PuppeethAltCoins.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
