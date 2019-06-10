const fs = require("fs");
const HDWalletProvider =  require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledSellOffer = require('../build/SellOffer.json');

const abi = compiledSellOffer.interface;

const provider  = new HDWalletProvider(
  'quiz park fancy certain rail quality furnace enhance goat unlock advance figure',
  'https://rinkeby.infura.io/v3/5c73d426f5d94a5086f8c6d0e6ca9530',
  0, 2
);

const web3 = new Web3(provider);

const CancelOffer = async(offer_addr, sender)=>{
	var contract = new web3.eth.Contract(JSON.parse(abi), offer_addr);
	var accounts = await web3.eth.getAccounts();
	var res = await contract.methods.CancelOffer()
		.send({from: sender});
	console.log('CancelOffer res: ', res);
	return res;
};

const ConfirmOffer = async(offer_addr, sender)=>{
	var contract = new web3.eth.Contract(JSON.parse(abi), offer_addr);
	var res = await contract.methods.ConfirmOffer()
		.send({from: sender});
	console.log('ConfirmOffer res: ', res);
	return res;
};

const AcceptOffer = async(offer_addr, sender)=>{
	var contract = new web3.eth.Contract(JSON.parse(abi), offer_addr);
	var price = await contract.methods.GetPrice().call({from: sender});
	var res = await contract.methods.AcceptOffer()
		.send({
			from: sender,
			value: price
		});
	console.log('AcceptOffer res: ', res, '\nprice: ', price);
	return res;
};

const GetContractBalacne = async(offer_addr, sender)=>{
	var contract = new web3.eth.Contract(JSON.parse(abi), offer_addr);
	var res = await contract.methods.GetContractBalacne()
		.call({from: sender});
	console.log('GetContractBalacne res: ', res);
	return res;
};

const GetCurrOwner = async(offer_addr, sender)=>{
	var contract = new web3.eth.Contract(JSON.parse(abi), offer_addr);
	var res = await contract.methods.GetCurrOwner()
		.call({from: sender});
	console.log('GetCurrOwner res: ', res);
	return res;
};

const GetNewOwner = async(offer_addr, sender)=>{
	var contract = new web3.eth.Contract(JSON.parse(abi), offer_addr);
	var res = await contract.methods.GetNewOwner()
		.call({from: sender});
	console.log('GetNewOwner res: ', res);
	return res;
};

const GetPrice = async(offer_addr, sender)=>{
	var contract = new web3.eth.Contract(JSON.parse(abi), offer_addr);
	var res = await contract.methods.GetPrice()
		.call({from: sender});
	console.log('GetPrice res: ', res);
	return res;
};

const GetState = async(offer_addr, sender)=>{
	var contract = new web3.eth.Contract(JSON.parse(abi), offer_addr);
	var res = await contract.methods.GetState()
		.call({from: sender});
	console.log('GetState res: ', res);
	return res;
};

const Test = async(o)=>{
	var accounts = await web3.eth.getAccounts();
	// GetNewOwner(offer_addr, accounts[0]);
	// var res = await GetPrice(offer_addr, accounts[0]);
	// GetPrice(offer_addr, accounts[0]).then(console.log);
	await GetState(o, accounts[0]);
	await AcceptOffer(o, accounts[0]);
	await GetState(o, accounts[1]);
	await GetContractBalacne(o, accounts[1]);
	await ConfirmOffer(o, accounts[1]);
	await GetState(o, accounts[1]);
	await GetContractBalacne(o, accounts[1]);
						
	// console.log('Test(): ', res);
};

// Test('0xd8a6cd07bcfd499f2ccc1efc00dae4fa31bea4bb');