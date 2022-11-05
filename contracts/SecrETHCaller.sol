// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import './SecrETH.sol';

contract SecrETHCaller {
    
    string public ourCipher;

    uint32 public locktime; // in block number

    SecrETH secrETH;

    constructor(string memory _ourCipher, uint32 _locktime, address secrETHAddress) {
        ourCipher = _ourCipher;
        locktime = _locktime;
        secrETH = SecrETH(secrETHAddress);
    }

    function callDecryption() public {
        if (block.number >= locktime) {
            secrETH.decrypt{value: 20000}(ourCipher, true);
        }
    }
}