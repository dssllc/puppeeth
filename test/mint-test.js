const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Puppeeth", function () {
  // Declare common variables
  let owner, secondAddress, PuppeethContract, Puppeeth;

  before(async function () {

    // Get signers of local chain
    [owner, secondAddress] = await ethers.getSigners();

    // Deploy contract instance
    PuppeethContract = await ethers.getContractFactory("Puppeeth");
    Puppeeth = await PuppeethContract.deploy();
    await Puppeeth.deployed();

  });

  it("Should mint", async function () {
    await Puppeeth.mintNFT(owner.address, "https://bighappyface.io/a");
    await Puppeeth.mintNFT(owner.address, "https://bighappyface.io/b");
    await Puppeeth.mintNFT(owner.address, "https://bighappyface.io/c");
  });
});
