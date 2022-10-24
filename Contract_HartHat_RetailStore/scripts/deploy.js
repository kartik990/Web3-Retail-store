const { ethers, run, network } = require("hardhat");
const { verify } = require("../utils/verify");

const hre = require("hardhat");

async function main() {
  const RetailStoreFactory = await ethers.getContractFactory("RetailStore");
  console.log("Deploying the contract RetailStore.....");
  const retailStore = await RetailStoreFactory.deploy();
  retailStore.deployed();
  console.log(
    `Deployed the contract RetailStore at address ${retailStore.address}.....`
  );
  // console.log(network.config);
  if (network.config.chainId == 4 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations....");
    await verify(retailStore.address, []);
  }
}

const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
