require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({ path: __dirname + '/process.env' });
require("@nomiclabs/hardhat-waffle");

const GOERLI_PRIVATE_KEY = process.env.GOERLI_KEY;
console.log(GOERLI_PRIVATE_KEY)

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://rpc.ankr.com/eth_goerli`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};
