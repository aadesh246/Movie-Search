var express = require("express");
var app = express();
var request = require("request");

app.get('/',function(req,res)
	   {
	  res.render("search.ejs");
})
app.get("/results",function(req,res)
	   {
	       var arr=[];
	
	
	     var url = "http://omdbapi.com/?apikey=thewdb&s=" + req.query.search;

	 request(url,function(error,response,body)
			{  var data = JSON.parse(body);
		 if(!error&&response.statusCode==200&&data.Response!="False")
		 {    var arr=[];console.log(data);
		  for(var i=0;i <data["Search"].length;i++)
			  {
				  var u ="http://omdbapi.com/?apikey=thewdb&i="+data["Search"][i].imdbID;
				  request(u,function(error,response,body)
						 {
					  var c = JSON.parse(body);
					  arr.push(c);
				  });
				  setTimeout(function()
							{} ,1000);
			  }
		  setTimeout(function(){
			  
			res.render("results.ejs",{data:data,movies:arr});},1000);
	 }else{
		 res.render("error.ejs");
	 }
			}
			);
	
});







app.listen(3000,function()
		{
	console.log("Server has started");
});