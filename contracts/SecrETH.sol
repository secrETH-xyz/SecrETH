// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

contract SecrETH {
    
    // public key of our contract
    bytes32 pubKey;

    // ciphertext --> [addresses_that_can_decrypt_cipher]
    mapping(string => address[]) private ciphers;

    // ciphertext --> [decrypted_fractions_of_ciphertext_c]
    mapping(string => string[]) private decryptedFractions;

    //
    function encrypt(string calldata message, string calldata salt, address[] calldata owners) public {
        // string result =  encrypt message, salt and public key
        string memory result = "";

        // if owners are provided, store their add
        if (owners.length > 0) {
            ciphers[result] = owners;
        } else {
            ciphers[result] = [msg.sender];
        }
    }
}