// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

contract SecrETH {
    
    // public key of our contract
    bytes32 private pubKey;

    uint32 public threshold = 67;

    uint32 public numSigners = 100;

    uint32 public blocksDelay = 100;

    uint32 generalFee = 10000;

    struct CipherInfo {
        address cipherOwner; // address that registered cipher
        uint256 decryptionInitBlock; // block number when decryption was called
        address[] decryptionSigners; // signers that already provided their fractional decryption
        bytes32[] fractionalDecryptions; // indexes correspond to index of signer that provied fractional decryption
        bool storeDecryption; // should final decryption of cipher be stored on change
        string decryptedCipher;
        uint256 decryptionStorageFee;
    }

    // adress --> is_a_signer
    mapping(address => bool) public isSigner;

    // new_signer_public_key --> [shares_to_generate_new_signers_share_encrypted_with_their_public_key]
    mapping(bytes32 => bytes32[]) public shareGenerationFractions;

    // stores all registered ciphers and information about them
    mapping(string => CipherInfo) public allCiphers;

    event DecryptionCalled(string cipher, bool shouldStoreDecryption);
    event DecryptionReady(string cipher);
    event DecryptionReadyIncentivized(string cipher, uint256 storageFee);
    event JoinNetworkRequest(bytes32 newSignerPubKey);

    function register(string calldata cipher) payable public {
        require (allCiphers[cipher].cipherOwner == address(0), "This ciphertext is already registered. Try using another salt.");
        require (msg.value >= generalFee);
        allCiphers[cipher].cipherOwner = msg.sender;
    }

    function decrypt(string calldata cipher, bool shouldStoreDecryption) payable public {
        require (allCiphers[cipher].cipherOwner == msg.sender, "This address is not allowed to decrypt this ciphertext.");
        emit DecryptionCalled(cipher, shouldStoreDecryption);
        allCiphers[cipher].decryptionInitBlock = block.number;

        if (shouldStoreDecryption) {
            allCiphers[cipher].decryptionStorageFee = msg.value;
            allCiphers[cipher].storeDecryption = true;
        }
    }

    function submitFractionalDecryption (string calldata cipher, bytes32 fractionalDecryption) public {
        require (isSigner[msg.sender], "This address is not a secrETH signer.");
        require (block.number <= allCiphers[cipher].decryptionInitBlock + blocksDelay, "The time to submit a fractional decryption has passed.");
        for (uint i = 0; i < allCiphers[cipher].decryptionSigners.length; i++) {
            require (allCiphers[cipher].decryptionSigners[i] != msg.sender, "This address aleready provided their fractional decryption.");
        }

        payable(msg.sender).transfer(generalFee / numSigners);

        // TODO P5: implement ZK to require fractionalDecryption is a valid decryption

        allCiphers[cipher].fractionalDecryptions.push(fractionalDecryption);
        allCiphers[cipher].decryptionSigners.push(msg.sender);

        if (allCiphers[cipher].fractionalDecryptions.length >= threshold) {
            if (!allCiphers[cipher].storeDecryption) {
                emit DecryptionReady(cipher);
            }
            else {
                emit DecryptionReadyIncentivized(cipher, allCiphers[cipher].decryptionStorageFee);
            }
        }
    }

    function submitDecryption (string calldata cipher, string calldata decryptedCipher) public {
        require (allCiphers[cipher].cipherOwner != address(0));
        // require encrypt(decryption, pubKey) == cipher

        allCiphers[cipher].decryptedCipher = decryptedCipher;

        if (allCiphers[cipher].storeDecryption) {
            payable(msg.sender).transfer(allCiphers[cipher].decryptionStorageFee);
        }
    }

    // Tell current signers to generate a new share of the secret key for msg.sender
    function joinNetwork(bytes32 newSignerPubKey) public {
        // TODO P3: process stake
        emit JoinNetworkRequest(newSignerPubKey);
    }

    function submitShare(bytes32 newSignerPubKey, bytes32 share) public {
        shareGenerationFractions[newSignerPubKey].push(share);
    }

    function getPubKey() public view returns (bytes32) {
        return pubKey;
    }
}