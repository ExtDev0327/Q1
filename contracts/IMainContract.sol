//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IMainContract {
    function isCallSuccessed() external view returns (bool);

    function setFlag(bool) external;
}
