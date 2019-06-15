// var go = require('./build/GiftOffer.json');
// var t = require('./test.json');
// var t1 = require('./test1.json');
var r = require('./test1.json');

const Test = async()=>{
	for(let i in t1){
		console.log(t1[i]);
	}
	// console.log(JSON.parse(file.interface));
};

const addToJSON = async (filePath, propAddr, ownerAddr, fullSpace, usefulSpace) =>{ 
	file = require(filePath); 
	var data = file;

	data.push({"propAddr" : propAddr, 
	"ownerAddr" : ownerAddr, 
	"fullSpace" : fullSpace, 
	"usefulSpace" : usefulSpace}); 
	fs = require("fs"); 
	fs.writeFileSync(filePath, txt = JSON.stringify(data), "utf8", ()=> {}); 
	console.log(data[3].propAddr); 
};

// addToJSON('./test1.json', 44,44,4,4)

const ShowTable = async(tableName, fileName) =>{
	var table = document.getElementById(tableName);
	var file = require(fileName);
	for (let i in file){
		var tr = document.createElement('tr');
		var td_addr = document.createElement('td');
		var td_owner = document.createElement('td');
		var td_fullSpace = document.createElement('td');
		var td_usefulSpace = document.createElement('td');
		// tr.id = file[i].propAddr;
		td_addr.innerHTML = file[i].propAddr;
		td_owner.innerHTML = file[i].ownerAddr;
		td_fullSpace = file[i].fullSpace;
		td_usefulSpace = file[i].usefulSpace;
		tr.appendChild(td_addr);
		tr.appendChild(td_owner);
		tr.appendChild(td_fullSpace);
		tr.appendChild(td_usefulSpace);
		table.appendChild(tr);
	}
};




// function addToJSON(propAddr, ownerAddr, fullSpace, usefulSpace){
//   data = require("./txt.json");
//   data = {

//   }
//   data.property.push("propAddr" : {555,
//     "ownerAddr" : 555,
//     "fullSpace" : 555,
//     "usefulSpace" : 555});
//   console.log(data);
//   fs = require("fs");
//   fs.writeFileSync("txt.json", txt = JSON.stringify(data), "utf8", ()=> {});
// }

