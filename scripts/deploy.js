const hre = require("hardhat");

async function main() {
  const PuppeethContract = await hre.ethers.getContractFactory("Puppeeth");
  const Puppeeth = await PuppeethContract.deploy();

  await Puppeeth.deployed();

  console.log("Puppeeth deployed to:", Puppeeth.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
