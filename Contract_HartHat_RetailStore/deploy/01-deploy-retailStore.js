const { getNamedAccounts, deployments, network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  log("Deploying RetailStore contract wait for confirmation...");
  const retailStore = await deploy("RetailStore", {
    from: deployer,
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  log(`Contract deployed at ${retailStore.address}`);

  if (network.config.chainId == 4 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations....");
    await verify(retailStore.address, []);
  }
};
