const http=require('http');

http.createServer(

    function(req,res)
      {
        console.log('server started...');
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(`<h1>${req.url}</h1>`);
        res.end();
      }
).listen(3000);