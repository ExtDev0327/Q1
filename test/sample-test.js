const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MainContract", function () {
  let MainContract;
  let mainContract;
  let owner;
  let user1;

  beforeEach(async function () {
    MainContract = await ethers.getContractFactory("MainContract");
    mainContract = await MainContract.deploy();
    await mainContract.deployed();
    [owner, user1] = await ethers.getSigners();
  });

  it("IllegalTest can't interact with MainContract", async function () {
    const IllegalTest = await ethers.getContractFactory("IllegalTest");
    const illegalTest = await IllegalTest.deploy(mainContract.address);
    await illegalTest.deployed();

    await expect(illegalTest.connect(user1).tryInteract()).to.be.revertedWith(
      "This contract couldn't be interacted by other one."
    );

    expect(await mainContract.connect(user1).isCallSuccessed()).to.equal(false);
  });

  it("LegalTest can interact with MainContract", async function () {
    const LegalTest = await ethers.getContractFactory("LegalTest");
    const legalTest = await LegalTest.deploy(mainContract.address);
    await legalTest.deployed();

    expect(await mainContract.connect(user1).isCallSuccessed()).to.equal(true);
  });
});
