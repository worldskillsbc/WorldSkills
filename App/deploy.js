const HDWalletProvider =  require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledProperty = require('./build/Property.json');
const compiledGiftOffer = require('./build/GiftOffer.json');
const fs=require("fs")


const provider  = new HDWalletProvider(
  'quiz park fancy certain rail quality furnace enhance goat unlock advance figure',
  'https://rinkeby.infura.io/v3/5c73d426f5d94a5086f8c6d0e6ca9530',
  0, 2
);

const web3 = new Web3(provider);

async function DeployProperty(ownerAddr, fullSpace, usefuslSpace) {
  var accounts = await web3.eth.getAccounts();
  const result = await new web3.eth.Contract(JSON.parse(compiledProperty.interface))
    .deploy({ data: '0x' + compiledProperty.bytecode, arguments: [ownerAddr, fullSpace, usefuslSpace]})
    .send({from: accounts[0]});
  console.log('address= ', result.options.address);
  // fs.appendFileSync("addr.txt", result.options.address + '\n', "utf8")
  fs.writeFileSync("addr.txt", result.options.address, "utf8");
  return result.options.address;
};

const DeployGiftOffer = async (prop_addr, old_owner, new_owner) =>{
  console.log('DeployGiftOffer()');
  var accounts = await web3.eth.getAccounts();
  console.log('accs:', accounts[0], accounts[1]);
  const res = await new web3.eth.Contract(JSON.parse(compiledGiftOffer.interface))
    .deploy({
      data: '0x' + compiledGiftOffer.bytecode,
      arguments: [prop_addr, new_owner]
    })
    .send({from: old_owner});
  console.log('GiftOffer', res.options.address);
};

const DeploySellOffer = async (prop_addr, old_owner, new_owner) =>{

};

const Test = async() =>{
  var accounts = await web3.eth.getAccounts();
  var a = await DeployProperty(accounts[0], 14, 7);
  // DeployProperty()
  //   .then(DeployGiftOffer('0x115F805e4786B3E7c2A73cE6BAf20F226e51e427', accounts[1], accounts[0]))
  //   .catch(function(){
  //     console.log('failure!');
  //   });
  
};
// Test();