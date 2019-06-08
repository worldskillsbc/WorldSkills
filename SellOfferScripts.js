const fs = require("fs");
const HDWalletProvider =  require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledSellOffer = require('.../build/SellOffer.json');

const provider  = new HDWalletProvider(
  'quiz park fancy certain rail quality furnace enhance goat unlock advance figure',
  'https://rinkeby.infura.io/v3/5c73d426f5d94a5086f8c6d0e6ca9530',
  0, 2
);

const web3 = new Web3(provider);

const CancelOffer = async(offer_addr, sender)=>{
	var contract = new web3.eth.Contract(JSON.parse(compiledSellOffer.interface, offer_addr));
	var accounts = await web3.eth.getAccounts();
	var res = await contract.methods.CancelOffer()
		.send({from: sender});
	console.log('CancelOffer res: ', res);
};

const ConfirmOffer = async(offer_addr, sender)=>{
	var contract = new web3.eth.Contract(JSON.parse(compiledSellOffer.interface, offer_addr));
	var res = await contract.methods.ConfirmOffer()
		.send({from: sender});
	console.log('ConfirmOffer res: ', res);
};

const AcceptOffer = async(offer_addr, sender)=>{
	var contract = new web3.eth.Contract(JSON.parse(compiledSellOffer.interface, offer_addr));
	var price = await contract.methods.GetPrice().call({from: sender});
	var res = await contract.methods.AcceptOffer()
		.send({
			from: sender,
			value: price
		});
	console.log('AcceptOffer res: ', res);
};

const GetContractBalacne = async(offer_addr, sender)=>{
	var contract = new web3.eth.Contract(JSON.parse(compiledSellOffer.interface, offer_addr));
	var res = await contract.methods.GetContractBalacne()
		.send({from: sender});
	console.log('GetContractBalacne res: ', res);
};

const GetCurrOwner = async(offer_addr, sender)=>{
	var contract = new web3.eth.Contract(JSON.parse(compiledSellOffer.interface, offer_addr));
	var res = await contract.methods.GetCurrOwner()
		.send({from: sender});
	console.log('GetCurrOwner res: ', res);
};

const GetNewOwner = async(offer_addr, sender)=>{
	var contract = new web3.eth.Contract(JSON.parse(compiledSellOffer.interface, offer_addr));
	var res = await contract.methods.GetNewOwner()
		.send({from: sender});
	console.log('GetNewOwner res: ', res);
};

const GetPrice = async(offer_addr, sender)=>{
	var contract = new web3.eth.Contract(JSON.parse(compiledSellOffer.interface, offer_addr));
	var res = await contract.methods.GetPrice()
		.send({from: sender});
	console.log('GetPrice res: ', res);
};

const GetState = async(offer_addr, sender)=>{
	var contract = new web3.eth.Contract(JSON.parse(compiledSellOffer.interface, offer_addr));
	var res = await contract.methods.GetState()
		.send({from: sender});
	console.log('GetState res: ', res);
};

const Test = async()=>{
	var accounts = await web3.eth.getAccounts();

};

Test();