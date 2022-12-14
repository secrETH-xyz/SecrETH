// =============================================================================
//                                  Config
// =============================================================================

const { Wallet } = require("ethers");
const { ethers } = require("hardhat");
require('dotenv').config({ path: __dirname + '/process.env' });
const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");
const user = new Wallet(process.env.USER_KEY, provider)
const signers = [new Wallet(process.env.SIGNER_0_KEY, provider), new Wallet(process.env.SIGNER_1_KEY, provider), new Wallet(process.env.SIGNER_2_KEY, provider)]

var abi = [
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "initialSigners",
          "type": "address[]"
        },
        {
          "internalType": "bytes32",
          "name": "_pubKey",
          "type": "bytes32"
        },
        {
          "internalType": "uint32",
          "name": "_threshold",
          "type": "uint32"
        },
        {
          "internalType": "uint32",
          "name": "_blocksDelay",
          "type": "uint32"
        },
        {
          "internalType": "uint32",
          "name": "_generalFee",
          "type": "uint32"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "cipher",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "shouldStoreDecryption",
          "type": "bool"
        }
      ],
      "name": "DecryptionCalled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "cipher",
          "type": "string"
        }
      ],
      "name": "DecryptionReady",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "cipher",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "storageFee",
          "type": "uint256"
        }
      ],
      "name": "DecryptionReadyIncentivized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "newSignerPubKey",
          "type": "bytes32"
        }
      ],
      "name": "JoinNetworkRequest",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "allCiphers",
      "outputs": [
        {
          "internalType": "address",
          "name": "cipherOwner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "decryptionInitBlock",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "storeDecryption",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "decryptedCipher",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "decryptionStorageFee",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "cipher",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "shouldStoreDecryption",
          "type": "bool"
        }
      ],
      "name": "decrypt",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBlocksDelay",
      "outputs": [
        {
          "internalType": "uint32",
          "name": "",
          "type": "uint32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getGeneralFee",
      "outputs": [
        {
          "internalType": "uint32",
          "name": "",
          "type": "uint32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getNumSigners",
      "outputs": [
        {
          "internalType": "uint32",
          "name": "",
          "type": "uint32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPubKey",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getThreshold",
      "outputs": [
        {
          "internalType": "uint32",
          "name": "",
          "type": "uint32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isSigner",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "newSignerPubKey",
          "type": "bytes32"
        }
      ],
      "name": "joinNetwork",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "cipher",
          "type": "string"
        }
      ],
      "name": "register",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "shareGenerationPartialSignatures",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "cipher",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "decryptedCipher",
          "type": "string"
        }
      ],
      "name": "submitDecryption",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "cipher",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "partialDecryptionX",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "partialDecryptionC1_x",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "partialDecryptionC1_y",
          "type": "string"
        }
      ],
      "name": "submitPartialDecryption",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "newSignerPubKey",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "share",
          "type": "bytes32"
        }
      ],
      "name": "submitShare",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

var contractAddress = "0xF53fb18D51168c1e06546a9ef7B0d1c4cad8b633";

var SecrETHGoerli = new ethers.Contract(contractAddress, abi, user);

// =============================================================================
//                                 UI Functions
// =============================================================================

async function _register(cipher) {
  SecrETHGoerli = await SecrETHGoerli.connect(user);
  x = await SecrETHGoerli.register(cipher, {value: 1000, gasPrice: 2e9, gasLimit: 1e5});
  console.log(x)
}

async function _decrypt(cipher) {
  SecrETHGoerli = await SecrETHGoerli.connect(user);
  x = await SecrETHGoerli.decrypt(cipher, false, {gasPrice: 2e9, gasLimit: 1e5});
  console.log(x)
}

async function _submitPartialDecrypion(signerIndex, cipher, partialDecryptionX, partialDecryptionC1_x, partialDecryptionC1_y) {
  SecrETHGoerli = await SecrETHGoerli.connect(signers[signerIndex]);
    x = await SecrETHGoerli.submitPartialDecryption(cipher, partialDecryptionX, partialDecryptionC1_x, partialDecryptionC1_y, {gasPrice: 2e9, gasLimit: 5e5});
    console.log(x)
}

// ===========================================================================
//                                 Testing
// ===========================================================================

async function test() {
    await _register("trialCipher");
    await _decrypt("trialCipher");
    await _submitPartialDecrypion(0, "trialCipher", "trial", "trial", "trial");
    await _submitPartialDecrypion(1, "trialCipher", "trial", "trial", "trial");
    await _submitPartialDecrypion(2, "trialCipher", "trial", "trial", "trial");
}

test();