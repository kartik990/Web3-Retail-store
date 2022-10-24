import { BigNumber, ethers } from "./resources/ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./resources/constants.js";

const btnConnect = document.getElementById("btn-connectToChain");
const btnlogin = document.getElementById("btn-login");
const loginForm = document.getElementById("loginForm");

btnConnect.onclick = connect;

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let contactText = e.target[0].value;
  retailStore(Number(contactText));
});

async function retailStore(contactNumber) {
  if (typeof window.ethereum != undefined) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const singer = provider.getSigner();
    console.log(singer);
    console.log("finding customer using phone number...");
    const contract = new ethers.Contract(contractAddress, abi, singer);
    const customers = await contract.getCustomers();
    console.log(customers);
    // let id = BigNumber.from(customers[0].id).toNumber();
    let customer = customers.filter((ele) => {
      return BigNumber.from(ele.PhNo).toNumber() === contactNumber;
    })[0];

    // const name = customer.name;
    // const id = BigNumber.from(customer.id).toNumber();
    // const PhNo = BigNumber.from(customer.PhNo).toNumber();
    // console.log(name, id, PhNo);

    console.log("loggin in", customer);
    btnlogin.value = "Logged in";
    localStorage.removeItem("user_data");

    localStorage.setItem(
      "user_data",
      JSON.stringify({
        name: customer.name,
        id: BigNumber.from(customer.id).toNumber(),
        PhNo: BigNumber.from(customer.PhNo).toNumber(),
      })
    );
  } else {
    console.log("no wallet found");
  }
}

// to connect to block chain we need...
// provider / connection to block chain  RPC URL
// singer or a wallet with gas

// to work with a contract we need....
// ABI
// address

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    btnConnect.value = "Connected";
    console.log("connected with metamask...Displaying accounts....");
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
  } else {
    console.log("Please install MetaMask");
  }
}
