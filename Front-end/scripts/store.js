import { BigNumber, ethers } from "../resources/ethers-5.6.esm.min.js";
import { abi, contractAddress } from "../resources/constants.js";

const addCart1 = document.getElementById("btn1");
const addCart2 = document.getElementById("btn2");
const addCart3 = document.getElementById("btn3");
const addCart4 = document.getElementById("btn4");
const addCart5 = document.getElementById("btn5");
const addCart6 = document.getElementById("btn6");
const addCart7 = document.getElementById("btn7");
const addCart8 = document.getElementById("btn8");

const totalPrice = document.getElementById("totalPrice");
const checkoutbtn = document.getElementById("checkoutBtn");

checkoutbtn.onclick = checkout;

addCart1.onclick = () =>
  addinToCart(0, document.getElementById("quantity1").value);
addCart2.onclick = () =>
  addinToCart(1, document.getElementById("quantity2").value);
addCart3.onclick = () =>
  addinToCart(2, document.getElementById("quantity3").value);
addCart4.onclick = () =>
  addinToCart(3, document.getElementById("quantity4").value);
addCart5.onclick = () =>
  addinToCart(4, document.getElementById("quantity5").value);
addCart6.onclick = () =>
  addinToCart(5, document.getElementById("quantity6").value);
addCart7.onclick = () =>
  addinToCart(6, document.getElementById("quantity7").value);
addCart8.onclick = () =>
  addinToCart(7, document.getElementById("quantity8").value);

async function addinToCart(prodId, count) {
  console.log(prodId, count);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const singer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, singer);

  console.log("adding to cart...");
  await contract.addToCart(prodId, count);

  // const cart = await contract.getCart();
  // console.log(cart);
}

async function liking() {
  let coustomer = JSON.parse(localStorage.getItem("user_data"));
  const id = coustomer.id;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const singer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, singer);
  const fealty = await contract.CustReccomandations(id);
  console.log(fealty);
  for (let i = 0; i < 8; i++) {
    // console.log(BigNumber.from(fealty[i]).toNumber());
    document.getElementById(`s${i + 1}`).innerHTML = `Liking: ${BigNumber.from(
      fealty[i]
    )}`;
  }
}

async function checkout() {
  // fuction in contract to update cart make bill and update score...
  // updateFealty
  // billing

  let coustomer = JSON.parse(localStorage.getItem("user_data"));
  const id = coustomer.id;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const singer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, singer);

  await contract.updateFealty(id);

  const p = await contract.billing(id);
  totalPrice.innerHTML = `Calculating total and updating Inventory...`;
  await p.wait();

  const price = await contract.getTotalP();
  console.log(BigNumber.from(price).toNumber());

  setInterval(() => {
    totalPrice.innerHTML = `Total : ${BigNumber.from(price).toNumber()} `;
  }, 3000);

  liking();

  const rec = await contract.CustReccomandations(id);
  console.log(rec);
}

(() => {
  let coustomer = JSON.parse(localStorage.getItem("user_data"));
  const name = coustomer.name;

  document.getElementById("customerName").innerHTML = `Customer : ${name}`;
  liking();
})();
