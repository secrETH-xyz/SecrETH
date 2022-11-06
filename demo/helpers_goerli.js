// =============================================================================
//                                  Config
// =============================================================================

const { Wallet } = require("ethers");
const { ethers } = require("hardhat");
require('dotenv').config({ path: __dirname + '/process.env' });
const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
const user = new Wallet(process.env.USER_KEY, provider)
const signers = [new Wallet(process.env.SIGNER_1_KEY, provider), new Wallet(process.env.SIGNER_2_KEY, provider), new Wallet(process.env.SIGNER_3_KEY, provider)]

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

var contractAddress = "0xAfd266Bf3d0Cfbb3a8775F918f13a996907e5F13";

var SecrETH = new ethers.Contract(contractAddress, abi, provider.getSigner());

// =============================================================================
//                                 UI Functions
// =============================================================================

async function _register(cipher) {
  SecrETH = await SecrETH.connect(user);
  await SecrETH.register(cipher, {value: 1000, gasLimit: 3e7});
}

async function _submitPartialDecrypion(signerIndex, cipher, partialDecryptionX, partialDecryptionC1_x, partialDecryptionC1_y) {
    SecrETH = await SecrETH.connect(signers[signerIndex]);
    await SecrETH.submitPartialDecryption(cipher, partialDecryptionX, partialDecryptionC1_x, partialDecryptionC1_y);
}

async function test() {
    await _register("trialCipher");
    await _submitPartialDecrypion(0, "trialCipher", "trial", "trial", "trial");
}

test();