const hre = require("hardhat");
const { Wallet } = require("ethers");
const pubKey = "trial";
const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
const user = new Wallet(process.env.USER_KEY, provider)

async function main() {
	let SecrETHGoerliContract = await hre.ethers.getContractFactory("SecrETHGoerli");
	initialSigners = ['0xeFbe4c29bdc59c41373338Acbb588334193c59Ca', '0x509a16b8919f83398c15FC13d7EccAb5D27718d8', '0x36E4ecf641705F474ebD3f3Ae016399db0be69E1', '0xd6bD315ddC935cc1348528d0B9Eb7Ff501DD913b', '0x25d35305a822f53f543769D858EB065b51BF4eA8'];
	SecrETHGoerliContract = await SecrETHGoerliContract.connect(user, provider);
	const secrETHGoerliContract = await SecrETHGoerliContract.deploy(initialSigners, hre.ethers.utils.formatBytes32String(pubKey), 3, 5000, 1000, {gasPrice: 2e9, gasLimit: 5e6});
	console.log(secrETHGoerliContract)
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});