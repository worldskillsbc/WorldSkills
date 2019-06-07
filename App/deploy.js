const HDWalletProvider =  require('truffle-hdwallet-provider');
const Web3 = require('web3');
//const {interface, bytecode} = require('./compile');
const compiledProperty = require('./build/Property.json');
const compiledGiftOffer = require('./build/GiftOffer.json');

const  provider = new HDWalletProvider(
  'quiz park fancy certain rail quality furnace enhance goat unlock advance figure',
  'https://rinkeby.infura.io/v3/5c73d426f5d94a5086f8c6d0e6ca9530'
);
const web3 = new Web3(provider);
var propRes;

const DeployProperty = async () =>{
 const accounts = await web3.eth.getAccounts();

 console.log('attemping to deploy', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledProperty.interface))
   .deploy({ data: '0x' + compiledProperty.bytecode, arguments: [accounts[0]]})
   .send({from: accounts[0]});
  console.log('adress= ', result.options.address);
  return result;

  /*const res2 = await new web3.eth.Contract(JSON.parse(compiledGiftOffer.interface))
  .deploy({data: '0x' + compiledGiftOffer.bytecode, arguments: [result.options.address, address[1]]})
  .send({from: accounts[0]});
  console.log('adress= ', res2.options.address);*/
};

// const DelpoyGiftOffer = async () =>{
//   const accounts = await web3.eth.getAccounts();
//   console.log('attemping to deploy', accounts[0]);

//   const result = await new web3.eth.Contract(JSON.parse(compiledGiftOffer.interface))
//    .deploy({ data: '0x' + compiledProperty.bytecode, arguments: [accounts[0], ]})
//    .send({from: accounts[0]});
  
//   console.log('adress= ', result.options.address);
// };

propRes = DeployProperty();

console.log('adress= ', propRes.options.address);
