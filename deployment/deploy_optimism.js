const hre = require("hardhat");
const { Wallet } = require("ethers");
const pubKey = "trial";
const provider = new ethers.providers.JsonRpcProvider("https://goerli.optimism.io");
const user = new Wallet(process.env.USER_KEY, provider)

async function main() {
	let SecrETHL2sContract = await hre.ethers.getContractFactory("SecrETHL2s");
	initialSigners = ['0xeFbe4c29bdc59c41373338Acbb588334193c59Ca', '0x509a16b8919f83398c15FC13d7EccAb5D27718d8', '0x36E4ecf641705F474ebD3f3Ae016399db0be69E1', '0xd6bD315ddC935cc1348528d0B9Eb7Ff501DD913b', '0x25d35305a822f53f543769D858EB065b51BF4eA8'];
	SecrETHL2s = await SecrETHL2sContract.connect(user, provider);
	const secrETHL2sContract = await SecrETHL2sContract.deploy(initialSigners, hre.ethers.utils.formatBytes32String(pubKey), 3, 5000, 1000, {gasPrice: 2e9, gasLimit: 5e6});
	console.log(secrETHL2sContract)
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});