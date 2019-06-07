/*const fs = require("fs");
const solc = require("solc");*/
const HDWalletProvider =  require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledProperty = require('../build/Property.json');
const compiledGiftOffer = require('../build/GiftOffer.json');


const  provider = new HDWalletProvider(
  'quiz park fancy certain rail quality furnace enhance goat unlock advance figure',
  'https://rinkeby.infura.io/v3/5c73d426f5d94a5086f8c6d0e6ca9530'
);
const web3 = new Web3(provider);
let abi = compiledProperty.interface;
let bytecode = compiledProperty.bytecode;

const InteractWithProp = async(test_value)=>{
	var abi = compiledProperty.interface;
	var bytecode = compiledProperty.bytecode;
	// var gasEstimate = web3.eth.estmateGas({data: bytecode});
	// var propContract = web3.eth.contract(JSON.parse(abi));
	var propContract = new web3.eth.Contract(JSON.parse(abi), '0xaC944BCE7dc5abe3999Ee3057581af26665deD93');
	// console.log('contract: ', propContract);

	const accounts = await web3.eth.getAccounts();

	// propContract.options.address = 

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

}

InteractWithProp(4);