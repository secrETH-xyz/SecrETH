
require('dotenv').config({ path: __dirname + '/process.env' });
require("@nomiclabs/hardhat-waffle");

const GOERLI_PRIVATE_KEY = process.env.USER_KEY;
console.log(process.env.GOERLI_URL)
console.log(GOERLI_PRIVATE_KEY)

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [
          GOERLI_PRIVATE_KEY,
          // process.env.SIGNER_1_KEY,
          // process.env.SIGNER_2_KEY,
          // process.env.SIGNER_3_KEY
        
      ]
    }
  }
};
