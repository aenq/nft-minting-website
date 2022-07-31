const hre = require("hardhat");

async function main() {
   
    const AenqNFT = await hre.ethers.getContractFactory("AenqNFT");
    const aenq = await AenqNFT.deploy();

    await aenq.deployed();
  
    console.log("AenqNFT address:", aenq.address);
  }
  
  main()
    .then(() => process.exit())
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });