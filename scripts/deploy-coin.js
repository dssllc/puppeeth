const hre = require("hardhat");

async function main() {
  const totalSupply = ethers.BigNumber.from("1000000000000000000000000000");
  const PuppeethCoinContract = await hre.ethers.getContractFactory("PuppeethCoin");
  const PuppeethCoin = await PuppeethCoinContract.deploy(totalSupply);

  await PuppeethCoin.deployed();

  console.log("PuppeethCoin deployed to:", PuppeethCoin.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
