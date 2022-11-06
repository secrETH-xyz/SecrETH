const hre = require("hardhat");
const pubKey = "trial";

async function main() {
	const SecrETHContract = await hre.ethers.getContractFactory("SecrETH");
	initialSigners = ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', '0x70997970C51812dc3A010C7d01b50e0d17dc79C8', '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', '0x90F79bf6EB2c4f870365E785982E1f101E93b906', '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65']
	const secrETHContract = await SecrETHContract.deploy(initialSigners, hre.ethers.utils.formatBytes32String(pubKey), 3, 50, 1000);
	await secrETHContract.deployed();
	console.log(`SecrETH contract address: ${secrETHContract.address}`);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});