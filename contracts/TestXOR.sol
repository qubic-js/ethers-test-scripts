// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract TestXOR {
    constructor() {}

    function testXOR(bytes calldata op1, bytes calldata op2, uint times) public virtual {
        for (uint i = 0; i < times; i++) {
            for (uint b = 0; b < op1.length; b++) {
                op1[b] ^ op2[b];
            }
        }

        revert('done');
    }
}
