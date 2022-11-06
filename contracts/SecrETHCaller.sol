// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import './SecrETHL2s.sol';

contract SecrETHCaller {
    
    string public ourCipher;

    uint32 public locktime; // in block number

    SecrETHL2s secrETH;

    constructor(string memory _ourCipher, uint32 _locktime, address secrETHAddress) {
        ourCipher = _ourCipher;
        locktime = _locktime;
        secrETH = SecrETHL2s(secrETHAddress);
    }

    function callDecryption() public {
        if (block.number >= locktime) {
            secrETH.decrypt{value: 20000}(ourCipher, true);
        }
    }
}