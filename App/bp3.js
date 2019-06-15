(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
const fs = require('fs');

const Test = async()=>{
	for(let i in t1){
		console.log(t1[i]);
	}
	// console.log(JSON.parse(file.interface));
};

window.addToJSON = async (/*filePath,*/ propAddr, ownerAddr, fullSpace, usefulSpace) =>{ 
	var obj = {
		data: []
	};
	obj.data.push({"propAddr" : propAddr, 
	"ownerAddr" : ownerAddr, 
	"fullSpace" : fullSpace, 
	"usefulSpace" : usefulSpace});

	var json = JSON.stringify(obj);
	fs.writeFileSync('./test.json', json, 'utf8');

	// data.push({"propAddr" : propAddr, 
	// "ownerAddr" : ownerAddr, 
	// "fullSpace" : fullSpace, 
	// "usefulSpace" : usefulSpace}); 
	// fs = require("fs"); 
	// fs.writeFileSync(filePath, txt = JSON.stringify(data), "utf8", ()=> {}); 
	// console.log(data[3].propAddr); 
};

// addToJSON('test', 'owner', 'space', 'usefulSpace');

// addToJSON('./test1.json', 44,44,4,4)

window.ShowTable2 = async(tableName, fileName) =>{
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


},{"fs":1}]},{},[2]);
