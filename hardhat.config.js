// for Goerli
require('dotenv').config({ path: __dirname + '/process.env' });
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");

// for Skale
// require("@nomiclabs/hardhat-ethers");
// require("@nomicfoundation/hardhat-chai-matchers");
// require("@nomicfoundation/hardhat-toolbox");
// require('dotenv').config({ path: __dirname + '/process.env' });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    // skale: {
    //   url: "https://eth-sf.skalenodes.com/v1/hackathon-complex-easy-naos",
    //   accounts: [process.env.SK]
    // },
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
