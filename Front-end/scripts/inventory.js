import { BigNumber, ethers } from "../resources/ethers-5.6.esm.min.js";
import { abi, contractAddress } from "../resources/constants.js";

const btn = document.getElementById("btnupdate");

btn.onclick = update;

async function addDataToInventory() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const singer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, singer);

  await contract.addProductToInventory("Dettol", 50, 56, "soap");
  await contract.addProductToInventory("Lifebuoy", 40, 78, "soap");
  await contract.addProductToInventory("Wheel", 60, 60, "detergent");
  await contract.addProductToInventory("Tide", 70, 83, "detergent");
  await contract.addProductToInventory("Bru", 70, 30, "coffee");
  await contract.addProductToInventory("kissan", 30, 40, "Jam");
  await contract.addProductToInventory("Almond", 55, 60, "oil");
  await contract.addProductToInventory("Garnier", 80, 70, "shampoo");

  //testing js dom manipulation
  // document.getElementById("Livebuoy").innerHTML = 5;
  // document.getElementById("Detol").innerHTML = 5;
  // document.getElementById("Wheel").innerHTML = 5;
  // document.getElementById("Wheel").innerHTML = 5;
  // document.getElementById("Tide").innerHTML = 5;
  // document.getElementById("Bru").innerHTML = 5;
  // document.getElementById("kissan").innerHTML = 5;
  // document.getElementById("Almond").innerHTML = 5;
  // document.getElementById("Garnier").innerHTML = 5;
}

async function update() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const singer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, singer);

  // console.log(BigNumber.from(item.qua).toNumber());
  for (let i = 0; i < 8; i++) {
    let item = await contract.getProduct(i);
    document.getElementById(item[0]).innerHTML = BigNumber.from(
      item.qua
    ).toNumber();
    console.log(item, BigNumber.from(item.qua).toNumber());
  }
}
