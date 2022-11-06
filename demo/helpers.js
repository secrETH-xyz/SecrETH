// =============================================================================
//                                  Config
// =============================================================================

const { ethers } = require("hardhat");
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

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

var contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

var SecrETH = new ethers.Contract(contractAddress, abi, provider.getSigner());

// =============================================================================
//                                 UI Functions
// =============================================================================

async function _register(userAddress, cipher) {
  let userAddress = userAddress.toLowerCase();
	let SecrETH = await SecrETH.connect(provider.getSigner(userAddress));
  await SecrETH.register(cipher, {value: 1000, gasLimit: 3e7});
}

async function _submitPartialDecrypion(signerAddress, cipher, partialDecryptionX, partialDecryptionC1_x, partialDecryptionC1_y) {
	let signerAddress = signerAddress.toLowerCase();
	let SecrETH = await SecrETH.connect(provider.getSigner(signerAddress));
  await SecrETH.submitPartialDecryption(cipher, partialDecryptionX, partialDecryptionC1_x, partialDecryptionC1_y, {gasLimit: 3e7});
}

async function test() {
  let accounts = await provider.listAccounts();
  await _register(accounts[10], "trialCipher2");
  await _submitPartialDecrypion(accounts[0], "trialCipher2", "trial", "trial", "trial");
}

test();