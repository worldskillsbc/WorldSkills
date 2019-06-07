const fs = require("fs");
const solc = require("solc");
const Web3 = require('web3');

const  provider = new HDWalletProvider(
  'quiz park fancy certain rail quality furnace enhance goat unlock advance figure',
  'https://rinkeby.infura.io/v3/5c73d426f5d94a5086f8c6d0e6ca9530'
);
const web3 = new Web3(provider);

//let source = fs.readFileSync('')
let compiledProperty = require('./build/Property.json');
/*let abi = compiledContract.contracts['nameContract'].interface;
let bytecode = compiledContract.contracts['nameContract'].bytecode;*/

let abi = compiledProperty.interface;
let bytecode = compiledProperty.bytecode;
let gasEstimate = web3.eth.estmateGas({data: bytecode});
let propertyContract = web3.eth.contract(JSON.parse(abi));
var propertyContractReturned = propertyContract.new()
