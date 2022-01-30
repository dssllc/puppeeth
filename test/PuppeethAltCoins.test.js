const { BigNumber } = require("@ethersproject/bignumber");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PuppeethAltCoins", function () {
  // Declare common variables
  let owner, secondAddress, thirdAddress,
  PuppeethAltCoinsContract, PuppeethAltCoins,
  PuppeethContract, Puppeeth,
  PuppeethCoinContract, PuppeethCoin, totalSupply;


  before(async function () {
    // Get signers of local chain
    [owner, secondAddress, thirdAddress] = await ethers.getSigners();

    // Deploy contract instances
    PuppeethAltCoinsContract = await ethers.getContractFactory("PuppeethAltCoins");
    PuppeethAltCoins = await PuppeethAltCoinsContract.deploy();
    await PuppeethAltCoins.deployed();

    PuppeethContract = await ethers.getContractFactory("Puppeeth");
    Puppeeth = await PuppeethContract.deploy();
    await Puppeeth.deployed();

    PuppeethCoinContract = await ethers.getContractFactory("PuppeethCoin");
    totalSupply = BigNumber.from("1000000000000000000000000000");
    PuppeethCoin = await PuppeethCoinContract.deploy(totalSupply);
    await PuppeethCoin.deployed();
  });

  it("should accept a deposit for minting funds", async function () {
    const depositAmount = ethers.utils.parseEther(".015")
    const overrides = {
      value: depositAmount
    };
    const oldBalance = await owner.getBalance();
    await PuppeethAltCoins.depositMintingFunds(overrides);
    const newBalance = await owner.getBalance();
    expect(oldBalance.sub(newBalance).sub(depositAmount).lt(depositAmount)).to.be.true;
    const contractBalance = await ethers.provider.getBalance(PuppeethAltCoins.address);
    expect(contractBalance).to.equal(depositAmount);
  });

  it("should allow only owner to withdraw minting funds", async function () {
    await expect(
      PuppeethAltCoins.connect(secondAddress).withdrawMintingFunds()
    ).to.be.revertedWith("caller is not the owner");
  });

  it("should allow owner to withdraw minting funds", async function () {
    const oldBalance = await owner.getBalance();
    await PuppeethAltCoins.withdrawMintingFunds();
    const newBalance = await owner.getBalance();
    expect(newBalance.sub(oldBalance) > 0).to.be.true;
    const contractBalance = await ethers.provider.getBalance(PuppeethAltCoins.address);
    expect(contractBalance).to.equal(0);
  });

  it("should allow only owner to set Puppeeth contract address", async function () {
    await expect(
      PuppeethAltCoins.connect(secondAddress)
        .setPuppeethContract(Puppeeth.address)
    ).to.be.revertedWith("caller is not the owner");
  });

  it("should allow owner to set Puppeeth contract address", async function () {
    expect(
      await PuppeethAltCoins.getPuppeethContract()
    ).to.equal(ethers.constants.AddressZero);
    await PuppeethAltCoins.setPuppeethContract(Puppeeth.address);
    expect(
      await PuppeethAltCoins.getPuppeethContract()
    ).to.equal(Puppeeth.address);
  });

  it("should allow only owner to set altcoin address and price", async function () {
    let price = BigNumber.from("10000000000000000000000000");
    await expect(
      PuppeethAltCoins.connect(secondAddress)
        .setAltCoin(PuppeethCoin.address, price)
    ).to.be.revertedWith("caller is not the owner");
  });

  it("should allow owner to set altcoin address and price", async function () {
    let price = BigNumber.from("10000000000000000000000000");
    PuppeethAltCoins.setAltCoin(PuppeethCoin.address, price)
    expect(
      await PuppeethAltCoins.getAltCoin(PuppeethCoin.address)
    ).to.equal(price);
    expect(
      await PuppeethAltCoins.getAltCoin(secondAddress.address)
    ).to.equal(ethers.constants.Zero);
  });

  it("should mint for the public with minting funds", async function () {
    // Add minting funds.
    const overrides = {
      value: ethers.utils.parseEther("1.5")
    };
    await PuppeethAltCoins.depositMintingFunds(overrides);

    // Confirm alt coin price.
    let price = BigNumber.from("10000000000000000000000000");
    expect(
      await PuppeethAltCoins.getAltCoin(PuppeethCoin.address)
    ).to.equal(price);

    // Send altcoins to second address and confirm balances.
    expect(await PuppeethCoin.balanceOf(owner.address)).to.equal(totalSupply);
    let amt = BigNumber.from("100000000000000000000000000");
    await PuppeethCoin.transfer(secondAddress.address, amt);
    expect(await PuppeethCoin.balanceOf(secondAddress.address)).to.equal(amt);

    // Approve contract allowances for minting price
    // for owner and secondAddress wallets.
    await PuppeethCoin.approve(PuppeethAltCoins.address, price);
    await PuppeethCoin.connect(secondAddress).approve(PuppeethAltCoins.address, price);

    // Mint for owner.
    await PuppeethAltCoins.mintByAltCoin(PuppeethCoin.address, 11114);
    expect(await Puppeeth.ownerOf(11114)).to.equal(owner.address);
    expect(await PuppeethCoin.balanceOf(PuppeethAltCoins.address)).to.equal(price);

    // Mint for secondAddress.
    await PuppeethAltCoins.connect(secondAddress).mintByAltCoin(PuppeethCoin.address, 11125);
    expect(await Puppeeth.ownerOf(11125)).to.equal(secondAddress.address);

    // Verify contract ERC20 balance.
    expect(await PuppeethCoin.balanceOf(PuppeethAltCoins.address)).to.equal(price.mul(2));
  });

  it("should allow owner to withdraw alt coin balance", async function () {
    let balance = BigNumber.from("10000000000000000000000000");
    await expect(
      PuppeethAltCoins.connect(secondAddress)
        .withdrawAltCoin(PuppeethCoin.address, balance)
    ).to.be.revertedWith("caller is not the owner");
  });

  it("should allow owner to withdraw alt coin balance", async function () {
    // Verify contract ERC20 balance.
    let balance = BigNumber.from("20000000000000000000000000");
    expect(await PuppeethCoin.balanceOf(PuppeethAltCoins.address)).to.equal(balance);
    let ownerBalance = await PuppeethCoin.balanceOf(owner.address);
    // Withdraw balance.
    await PuppeethAltCoins.withdrawAltCoin(PuppeethCoin.address, balance);
    // Verify balances
    expect(await PuppeethCoin.balanceOf(PuppeethAltCoins.address)).to.equal(0);
    expect(await PuppeethCoin.balanceOf(owner.address)).to.equal(ownerBalance.add(balance));
  });

});
