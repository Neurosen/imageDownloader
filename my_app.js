var http = require('http'),
    fs = require('fs'),
    jsdom = require("jsdom"),
    fileType = "",
    options = {
        host: '2ch.so', //or something else
        path: false
    };

console.log("Loading images:");

jsdom.env("http://2ch.so/g/res/298668.html", [// the page
  'http://code.jquery.com/jquery-1.5.min.js'
],

function(errors, window) {
    window.$(".filesize").find("a").each(function(index,item){
	        var linkLength = item.href.length;
		fileType = item.href.substr(linkLength-4, linkLength);
		
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
					fs.writeFile("D:/my_app/images/"+item.href.substr(linkLength-13, linkLength), imagedata, 'binary', function(err){
						if (err) throw err;
					})
				})
				
			})
	    }
	}); 
});