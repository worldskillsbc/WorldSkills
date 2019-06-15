const fs = require("fs");
// const solc = require("solc");
const HDWalletProvider =  require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledProperty = require('../build/Property.json');
const compiledGiftOffer = require('../build/GiftOffer.json');
const compiledSellOffer = require('../build/SellOffer.json');

const  provider = new HDWalletProvider(
  'quiz park fancy certain rail quality furnace enhance goat unlock advance figure',
  'https://rinkeby.infura.io/v3/5c73d426f5d94a5086f8c6d0e6ca9530'
);
const web3 = new Web3(provider);
// let abi = compiledProperty.interface;
// let bytecode = compiledProperty.bytecode;
var propAbi = compiledProperty.interface;
var propBytecode = compiledProperty.bytecode;
const TestInteractWithProp = async(test_value)=>{
	
	// var gasEstimate = web3.eth.estmateGas({data: bytecode});
	// var propContract = web3.eth.contract(JSON.parse(abi));
	var propContract = new web3.eth.Contract(JSON.parse(propAbi), '0xaC944BCE7dc5abe3999Ee3057581af26665deD93');
	// console.log('contract: ', propContract);

	var accounts = await web3.eth.getAccounts();

	var result = await propContract.methods.GetTest().call({
		from: accounts[0]
	});
	// console.log('*************************************************************');
	console.log(result);
	var temp = await propContract.methods.SetTest(test_value)
		.send({from: accounts[0]});
	// console.log(temp);
	var result = await propContract.methods.GetTest().call({
		from: accounts[0]
	});
	console.log(result);

};

const getPropOwner = async(prop_addr)=>{
	var contract = new web3.eth.Contract(JSON.parse(propAbi), prop_addr);
	var accounts = await web3.eth.getAccounts();
	var res = await contract.methods.GetOwner()
		.call({from: accounts[0]});
	console.log(res);
};

const getFullSpace = async(offer_addr, sender)=>{
	var contract = new web3.eth.Contract(JSON.parse(propAbi), offer_addr);
	var res = await contract.methods.GetFullSpace()
		.call({from: sender});
	console.log('getFullSpace res: ', res);
	return res;
};

const getUsefulSpace = async(offer_addr, sender)=>{
	var contract = new web3.eth.Contract(JSON.parse(propAbi), offer_addr);
	var res = await contract.methods.GetUsefulSpace()
		.call({from: sender});
	console.log('getFullSpace res: ', res);
	return res;
};

// TestInteractWithProp(413);
// getPropOwner('0xaC944BCE7dc5abe3999Ee3057581af26665deD93');