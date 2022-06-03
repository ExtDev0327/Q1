//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./IMainContract.sol";

contract IllegalTest {
    IMainContract private mainContract;

    constructor(address _mainAddr) {
        mainContract = IMainContract(_mainAddr);
    }

    function tryInteract() public {
        mainContract.setFlag(true);
    }
}
