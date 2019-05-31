 const HDWalletProvider =  require('truffle-hdwallet-provider');
 const Web3 = require('web3');
 const {interface, bytecode} = require('./compile');

 const  provider  = new HDWalletProvider(
   'quiz park fancy certain rail quality furnace enhance goat unlock advance figure',
   'https://rinkeby.infura.io/v3/5c73d426f5d94a5086f8c6d0e6ca9530'
 );
 const web3 = new Web3(provider);

 const deploy = async () =>{

   const accounts = await web3.eth.getAccounts();

   console.log('attemping to deploy', accounts[0]);

   const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data : '0x' + bytecode})
    .send({from : accounts[0]});
    console.log('adress= ', result.options.address);
 };

deploy();
