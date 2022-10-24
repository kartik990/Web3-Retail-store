// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

// Written by Kartik rai
// on date 25 August 2022
contract RetailStore {
    //--------------------Inventory and Product database------------------

    // 0 detol soap 56 150
    struct Product {
        //id as index in inventory array
        uint256 id;
        string brand;
        string productType;
        uint256 price;
    }

    //just add new product objects as new product gets in inventory
    Product[] Inventory;
    uint256[] public quantity;

    //-----------------Customer Database-----------------------------------------

    //not use whole product list we add items only been purchased in this bill
    //each cart item represents what bought (product id) quantity and price
    struct CartItem {
        uint256 prodId;
        uint256 count;
        uint256 price;
    }

    // 0 kartik 78600598 Reccomandations
    struct Customer {
        // id as index in array
        uint256 id;
        string name;
        uint256 PhNo;
    }

    CartItem[] public cart;
    mapping(uint256 => uint256[8]) fealtyScore;

    //an array to hold customers and their id as their index in this array
    Customer[] public customers;

    uint256 public totalP = 0;

    //----------------Functions-----------------------------------

    function addProductToInventory(
        string memory _name,
        uint256 _price,
        uint256 _quantity,
        string memory _productType
    ) public returns (bool success) {
        uint256 idx = Inventory.length;
        Product memory product = Product({
            id: idx,
            brand: _name,
            productType: _productType,
            price: _price
        });

        quantity.push(_quantity);
        Inventory.push(product);
        return true;
    }

    //return details of a product for given productID
    function getProduct(uint256 prodId)
        public
        view
        returns (
            string memory brand,
            string memory productType,
            uint256 qua,
            uint256 price
        )
    {
        return (
            Inventory[prodId].brand,
            Inventory[prodId].productType,
            quantity[prodId],
            Inventory[prodId].price
        );
    }

    //returns an productlist: array of products with their count by which customer show priority
    function CustReccomandations(uint256 customerId)
        public
        view
        returns (uint256[8] memory fealty)
    {
        return fealtyScore[customerId];
    }

    // Customer memory customer = new Customer();
    // customers.push(customer);
    function addCustomer(string memory _name, uint256 _PhNo) public {
        uint256 lastIdx = customers.length;

        Customer memory customer = Customer({
            id: lastIdx,
            name: _name,
            PhNo: _PhNo
        });
        customers.push(customer);
    }

    //reduce fealty by 1 for each element after every shop visit
    function reduceFealty(uint256 customerId) public {
        for (uint256 i = 0; i < fealtyScore[customerId].length; i++) {
            if (fealtyScore[customerId][i] >= 1) {
                fealtyScore[customerId][i] -= 1;
            }
        }
    }

    // update fealty of a customer towards the products based on current cart state
    function updateFealty(uint256 customerId) public {
        for (uint256 i = 0; i < cart.length; i++) {
            uint256 productId = cart[i].prodId;
            fealtyScore[customerId][productId] += cart[i].count + 2;
        }
    }

    //reset cart of given customer to empty
    function resetCart() public {
        for (uint256 i = 0; i < cart.length; i++) {
            cart.pop();
        }
        uint256 size = cart.length;
        if (size == 1) {
            cart.pop();
        }
    }

    //add an CartItem to cart
    function addToCart(uint256 prodId, uint256 count)
        public
        returns (bool success)
    {
        uint256 _price = Inventory[prodId].price;
        cart.push(CartItem(prodId, count, _price));
        return true;
    }

    //returns the cart of current customer
    function getCart() public view returns (CartItem[] memory c) {
        return cart;
    }

    //update inventory
    //reduce fealty
    //update fealty
    //reset cart
    function billing(uint256 customerId) public {
        uint256 totalPrice = 0;

        for (uint256 i = 0; i < cart.length; i++) {
            uint256 productId = cart[i].prodId;

            totalPrice += cart[i].count * Inventory[productId].price;

            quantity[productId] -= cart[i].count;
        }

        reduceFealty(customerId);
        resetCart();
        //don't work with this function inside
        //updateFealty(customerId);

        totalP = totalPrice;
    }

    //returns the cart of current customer
    function getCustomers() public view returns (Customer[] memory c) {
        return customers;
    }

    function getTotalP() public view returns (uint256) {
        return totalP;
    }

    //----------------------------testing area--------------------
    //--------------------Problems :
    // null

    uint256 public val;

    function storeVal(uint256 x) public {
        val = x;
    }

    function getVal() public view returns (uint256) {
        return val;
    }

    //report
    // p+= check
    // quantity[productId] -= cart[customerId][i].count; check
    // for loop number of iterations  for cart[customerId].length; check
    // cart[customerId][idx].prodId; check
    // cart[customerId][idx].prodId; check
}
