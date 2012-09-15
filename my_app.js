var http = require('http');
var fs = require('fs');
var jsdom = require("jsdom");
var fileType = "";

var options = {
    host: '2ch.so', //or something else
    path: false
};

console.log("Loading images:");

jsdom.env("http://2ch.so/g/res/298668.html", [// the page
  'http://code.jquery.com/jquery-1.5.min.js'
],

function(errors, window) {
    window.$(".filesize").find("a").each(function(index,item){
	    
		fileType = item.href.substr(item.href.length-4,item.href.length);
		
	    if(fileType == ".jpg" || ".png" || ".gif"){// 
		    console.log(item.href);
			options.path = item.href;
			http.get(options, function(res){
			    var imagedata = '';
				res.setEncoding('binary');
				res.on('data', function(chunk){
					imagedata += chunk
				})

				res.on('end', function(){
					fs.writeFile("D:/my_app/images/"+item.href.substr(item.href.length-13,item.href.length), imagedata, 'binary', function(err){
						if (err) throw err;
					})
				})
				
			})
	    }
	}); 
});