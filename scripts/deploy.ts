const hre = require("hardhat");

async function main() {
  const tokenName = "Faria";
  const tokenSymbol = "FAR";

  let ERC721Factory = await hre.ethers.getContractFactory("ERC721Factory");
  ERC721Factory = await ERC721Factory.deploy(tokenName, tokenSymbol);

  await ERC721Factory.deployed();

  console.log(`Deployed to ${ERC721Factory.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
