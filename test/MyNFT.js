const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("One contract", function () {
  let contract;
  let owner;

  beforeEach(async () => {
    const [firstAccount] = await ethers.getSigners();
    owner = firstAccount;
    const Contract = await ethers.getContractFactory("One");
    contract = await Contract.deploy("MyNFT", "MYSYM");
    await contract.deployed();
  });

  it("Should deploy successfully", async () => {
    expect(contract.address).not.to.be.equal(ethers.constants.AddressZero);
  });

  it("Should mint a new NFT", async () => {
    const tx = await contract.mint(owner.address, "ipfs://...");
    await tx.wait();

    const balance = await contract.balanceOf(owner.address);
    expect(balance).to.equal(1);
  });

  it("Should set and retrieve token URI", async () => {
    const tx = await contract.mint(owner.address, "ipfs://...");
    await tx.wait();
  
    const tokenId = await contract.tokenURI(1);
    expect(tokenId).to.equal("ipfs://...");
  });

  it("Should allow transfer of NFT", async () => {
    const tx = await contract.mint(owner.address, "ipfs://...");
    await tx.wait();
  
    const [secondAccount] = await ethers.getSigners();
    await contract.connect(owner).safeTransferFrom(owner.address, secondAccount.address, 1);
  
    const balance = await contract.balanceOf(secondAccount.address);
    expect(balance).to.equal(1);
  });

  it("Should allow approval of NFT", async () => {
    const tx = await contract.mint(owner.address, "ipfs://...");
    await tx.wait();
  
    const [secondAccount] = await ethers.getSigners();
    await contract.connect(owner).approve(secondAccount.address, 1);
  
    const isApproved = await contract.isApprovedForAll(owner.address, secondAccount.address);
    expect(isApproved).to.equal(true);
  });
});