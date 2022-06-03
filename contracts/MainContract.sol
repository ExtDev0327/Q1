//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MainContract {
    bool private flag;
    modifier isNotContract() {
        require(
            !isContract(msg.sender),
            "This contract couldn't be interacted by other one."
        );
        _;
    }

    constructor() {
        console.log("Deploying a MainContract:");
    }

    function isContract(address _addr) internal view returns (bool) {
        uint32 codeSize;
        assembly {
            codeSize := extcodesize(_addr)
        }
        return (codeSize > 0);
    }

    function isCallSuccessed() external view returns (bool) {
        return flag;
    }

    function setFlag(bool _flag) external isNotContract {
        flag = _flag;
        console.log("MainContract test function called successfully");
    }
}
