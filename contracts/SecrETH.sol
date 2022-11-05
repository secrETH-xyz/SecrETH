// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

contract SecrETH {
    
    // public key of our contract
    bytes32 private pubKey;

    uint public threshold = 67;

    uint public blocksDelay = 100;

    // ciphertext --> addresses_that_can_decrypt_cipher
    mapping(bytes64 => address) public cipherOwner;

    // ciphertext --> block_number_when_decryption_was_called
    mapping(bytes64 => uint) public decryptionInitBlock;

    // adress --> is_a_signer
    mapping(address => bool) public isSigner;

    // ciphertext -> [signers_that_already_signed]
    mapping(bytes64 => address[]) decryptionParticipants;

    // ciphertext --> [fractional_decryption_of_ciphertext]
    mapping(bytes64 => bytes64[]) public fractionalDecryptions;

    // ciphertext --> decryption_storage_was_requested
    mapping(bytes64 => bool) public storeDecryption;

    // ciphertext --> decryption_of_ciphertext
    mapping(bytes64 => bytes64) public decryption;

    // new_signer_public_key --> [shares_to_generate_new_signers_share_encrypted_with_their_public_key]
    mapping(bytes64 => bytes64[]) public shareGenerationFractions;

    event DecryptionCalled(bytes64 cipher, bool shouldStoreDecryption);
    event DecryptionReady(bytes64 cipher);
    event DecryptionReadyIncentivized(bytes64 cipher);
    event JoinNetworkRequest(bytes64 newSignerPubKey);

    function register(bytes64 cipher) {
        require (cipherOwner[cipher] == address(0), "This ciphertext is already registered. Try using another salt.");
        // TODO P2: charge fee to msg.sender
        cipherOwner[cipher] = msg.sender;
    }

    function decrypt(bytes64 cipher, bool shouldStoreDecryption) {
        require (cipherOwner[cipher] == msg.sender, "This address is not allowed to decrypt this ciphertext.");
        emit DecryptionCalled(cipher, shouldStoreDecryption);
        decryptionInitBlock[cipher] = block.number;

        if (shouldStoreDecryption) {
            storeDecryption[cipher] = true;
        }
    }

    function submitFractionalDecryption (bytes64 cipher, bytes64 fractionalDecryption) {
        require (isSigner[msg.sender], "This address is not a secrETH signer.");
        require (block.number <= decryptionInitBlock[cipher] + blocksDelay, "The time to submit a fractional decryption has passed.");
        for (int i = 0; i < decryptionParticipants[cipher].length; i++) {
            require (decryptionParticipants[cipher][i] != msg.sender, "This address aleready provided their fractional decryption.")
        }

        // TODO P2: pay fee to msg.sender

        // TODO P5: implement ZK to require fractionalDecryption is a valid decryption

        fractionalDecryptions[cipher].push(fractionalDecryption);
        decryptionParticipants[cipher].push(msg.sender);

        if (fractionalDecryptions[cipher].length >= threshold) {
            if (!storeDecryption[cipher]) {
                emit DecryptionReady(cipher);
            }
            else {
                emit DecryptionReadyIncentivized(cipher);
            }
        }
    }

    function submitDecryption (bytes64 cipher, string decryptedCipher) {
        require (cipherOwner[cipher] != address(0));
        // require encrypt(decryption, pubKey) == cipher

        decryption[cipher] = decryptedCipher;

        if (storeDecryption[cipher]) {
            // TODO P2: pay fee to msg.sender
        }
    }

    // Tell current signers to generate a new share of the secret key for msg.sender
    function joinNetwork(bytes64 newSignerPubKey) {
        // TODO P3: process stake
        emit JoinNetworkRequest(newSignerPubKey);
    }

    function submitShare(bytes64 newSignerPubKey, bytes64 share) {
        shareGenerationFractions[newSignerPubKey].push(share);
    }

    function getPubKey() public view return (bytes32) {
        return pubKey;
    }
}