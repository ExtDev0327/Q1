// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the main contract to deploy
  const MainContract = await hre.ethers.getContractFactory("MainContract");
  const mainContract = await MainContract.deploy();

  let txHash = mainContract.deployTransaction.hash;
  let txReceipt = await ethers.provider.waitForTransaction(txHash);
  console.log("MainContract deployed to :", txReceipt.contractAddress);

  // We get the IllegalTest contract to deploy
  const IllegalTest = await hre.ethers.getContractFactory("IllegalTest");
  const illegalTest = await IllegalTest.deploy(mainContract.address);

  txHash = illegalTest.deployTransaction.hash;
  txReceipt = await ethers.provider.waitForTransaction(txHash);
  console.log("IllegalTest deployed to :", txReceipt.contractAddress);

  // We get the legal contract to deploy
  const LegalTest = await hre.ethers.getContractFactory("LegalTest");
  const legalTest = await LegalTest.deploy(mainContract.address);

  txHash = legalTest.deployTransaction.hash;
  txReceipt = await ethers.provider.waitForTransaction(txHash);
  console.log("LegalTest deployed to :", txReceipt.contractAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
