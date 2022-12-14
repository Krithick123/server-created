const http = require("http");

const port = 8081;
const toDoList=["do homework", "wash cars"];
http.createServer((req,res)=>{

// res.writeHead(200, {"content-Type":"text/html"});
// res.write("<h4>Hello, krithick new server</h4>");
// res.end();
const {method,url}=req;
if(url === "/todos")
{
    if(method === "GET")
    {
        res.writeHead(200, {"content-Type":"text/html"});
        res.write(toDoList.toString());
        res.end();
    }
    else if(method === "POST")
    {
        let body="";
        req.on("error",(err)=>{
            console.log(err);
        }).on("data",(chunk)=>{
            // body = body +chunk;
            // console.log(chunk);
            body += chunk;
        }).on("end",()=>{
            body = JSON.parse(body);
            let newToDo = toDoList;
            newToDo.push(body.item);
            console.log(newToDo);
        });
    }else if(method === "DELETE")
    {
        let body="";
        req.on("error",(err)=>{
            console.log(err);
        }).on("data",(chunk)=>{
            body += chunk;
        }).on("end",()=>{
            body=JSON.parse(body);
            for (let i = 0; i <toDoList.length; i++) {
                if(toDoList[i] === body.item){
                    toDoList.splice(i,1);
                }
            }
            res.writeHead(200)
        });
    }
    else{
        res.writeHead(501);
    }
}
else{
    res.writeHead(404);
}

res.end();

}).listen(port,()=>{
console.log(`My Node JS server started on port ${port}`);
});

//   http://localhost:8081/todos
// welcome to this 
//created branch 