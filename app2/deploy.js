 const HDWalletProvider =  require('truffle-hdwallet-provider');
 const Web3 = require('web3');
 const {interface, bytecode} = require('./compile');

 const  provider  = new HDWalletProvider(
   'notice idle earth life leave thing scene foil paddle finger chase',
   'http://rinkeby.infura.io/v3/6942fba935034bf6a9ad23920b7ce6ae'
 );
 const web3 = new Web3(provider);

 const deploy = async () =>{
   const accounts = await web3.eth.getAccounts();

   console.log('attemping to deploy', accounts[0]);

   const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data :bytecode, arguments :[1]})
    .send({gas: '1000000', from : accounts[0]});
 };

deploy();
