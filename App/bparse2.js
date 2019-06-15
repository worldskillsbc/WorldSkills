(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
module.exports=[{"propAddr":0,"ownerAddr":0,"fullSpace":0,"usefulSpace":0},{"propAddr":0,"ownerAddr":0,"fullSpace":0,"usefulSpace":0},{"propAddr":256,"ownerAddr":111,"fullSpace":222,"usefulSpace":333},{"propAddr":"sobaka","ownerAddr":0,"fullSpace":0,"usefulSpace":0},{"propAddr":"sobaka","ownerAddr":0,"fullSpace":0,"usefulSpace":0},{"propAddr":"sobaka","ownerAddr":0,"fullSpace":0,"usefulSpace":0},{"propAddr":"sobaka","ownerAddr":0,"fullSpace":0,"usefulSpace":0},{"propAddr":4,"ownerAddr":4,"fullSpace":4,"usefulSpace":4},{"propAddr":44,"ownerAddr":44,"fullSpace":4,"usefulSpace":4}]
},{}],3:[function(require,module,exports){
var r = require('./test1.json');
var fs = require("fs"); 

window.Test = async()=>{
	for(let i in t1){
		console.log(t1[i]);
	}
};

window.addToJSON = async (filePath, propAddr, ownerAddr, fullSpace, usefulSpace) =>{ 
	file = require(filePath); 
	var data = file;

	data.push({"propAddr" : propAddr, 
	"ownerAddr" : ownerAddr, 
	"fullSpace" : fullSpace, 
	"usefulSpace" : usefulSpace}); 

	fs.writeFileSync(filePath, txt = JSON.stringify(data), "utf8", ()=> {}); 
	console.log(data[3].propAddr); 
};

// addToJSON('./test1.json', 44,44,4,4)

window.ShowTable = async(tableName, fileName) =>{
	var table = document.getElementById(tableName);
	// var file = require(fileName);
	for (let i in file){
		var tr = document.createElement('tr');
		var td_addr = document.createElement('td');
		var td_owner = document.createElement('td');
		var td_fullSpace = document.createElement('td');
		var td_usefulSpace = document.createElement('td');
		td_addr.innerHTML = file[i].propAddr;
		td_owner.innerHTML = file[i].ownerAddr;
		td_fullSpace.innerHTML = file[i].fullSpace;
		td_usefulSpace.innerHTML = file[i].usefulSpace;
		tr.appendChild(td_addr);
		tr.appendChild(td_owner);
		tr.appendChild(td_fullSpace);
		tr.appendChild(td_usefulSpace);
		table.appendChild(tr);
	}
};

},{"./test1.json":2,"fs":1}]},{},[3]);
