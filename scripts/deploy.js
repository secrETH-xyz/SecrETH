const hre = require("hardhat");

async function main() {
	const SecrETHContract = await hre.ethers.getContractFactory("SecrETH");
	const secrETHContract = await SecrETHContract.deploy();
	await secrETHContract.deployed();
	console.log(`SecrETH contract address: ${secrETHContract.address}`);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});