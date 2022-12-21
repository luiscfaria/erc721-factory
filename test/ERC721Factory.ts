import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract, ContractFactory } from "ethers";

const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

describe("ERC721Factory", function () {
  let ERC721Factory: Contract;
  let users,
    owner: SignerWithAddress,
    addr1: SignerWithAddress,
    addr2: SignerWithAddress,
    addr3: SignerWithAddress;

  before(async () => {
    users = await ethers.getSigners();
    owner = users[0];
    addr1 = users[1];
    addr2 = users[2];
    addr3 = users[3];
  });

  beforeEach(async () => {
    ERC721Factory = await ethers.getContractFactory("ERC721Factory");
    ERC721Factory = await ERC721Factory.deploy("Faria", "FAR");
    await ERC721Factory.deployed();
  });

  describe("Deployment and minting", function () {
    it("Should Mint as Minter", async function () {
      await expect(await ERC721Factory.safeMint(addr1.address, 1, "uri"));
    });

    it("Should not mint as regular address", async function () {
      await expect(
        ERC721Factory.connect(addr1).safeMint(addr1.address, 1, "uri")
      ).to.be.revertedWith(
        "AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6"
      );
    });
  });
});
