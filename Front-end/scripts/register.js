import { ethers } from "./../resources/ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./../resources/constants.js";

const formRegister = document.getElementById("registerForm");

formRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  let contactText = e.target[0].value;
  let nameText = e.target[1].value;
  register(nameText, Number(contactText));
});

const register = async (name, number) => {
  if (typeof window.ethereum != undefined) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const singer = provider.getSigner();
    console.log("Adding...");
    const contract = new ethers.Contract(contractAddress, abi, singer);
    const resp = await contract.addCustomer(name, number);
    // const val = await contract.getCustomers();
    // console.log(val);
  } else {
    console.log("no wallet found");
  }
};
