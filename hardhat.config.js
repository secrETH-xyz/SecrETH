require('dotenv').config({ path: __dirname + '/process.env' });
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [
          process.env.USER_KEY,
          process.env.SIGNER_1_KEY,
          process.env.SIGNER_2_KEY,
          process.env.SIGNER_3_KEY
        
      ]
    }
  }
};
