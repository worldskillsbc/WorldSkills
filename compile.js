const fs = require('fs');
const solc = require('solc');
const path = require('path');

const contractPath = path.resolve(__dirname,'contracts','mainContract.sol');
const source = fs.readFileSync(contractPath,'utf8');

//console.log(solc.compile(source, 1));

module.exports =  solc.compile(source, 1 ).
  contracts[':Test'];
