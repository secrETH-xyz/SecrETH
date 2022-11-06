const hre = require("hardhat");
const pubKey = "trial";

async function main() {
	const SecrETHContract = await hre.ethers.getContractFactory("SecrETH");
	initialSigners = ['0xeFbe4c29bdc59c41373338Acbb588334193c59Ca', '0x95c1775c9cc92B4d623BabA92c3895126162438A', '0x509a16b8919f83398c15FC13d7EccAb5D27718d8', '0x36E4ecf641705F474ebD3f3Ae016399db0be69E1', '0xd6bD315ddC935cc1348528d0B9Eb7Ff501DD913b'];
	console.log("Starting to deploy...");
	const secrETHContract = await SecrETHContract.deploy(initialSigners, hre.ethers.utils.formatBytes32String(pubKey), 3, 50, 1000, {gasPrice: 5});
	await secrETHContract.deployed();
	console.log(`SecrETH contract address: ${secrETHContract.address}`);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});