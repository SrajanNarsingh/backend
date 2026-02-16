const http =require("http");
const fs = require("fs")

const users={
    "Name":"Srajan Narsingh",
    "Roll No":"65"
}

const server = http.createServer((req, res) => {
    const url=req.url;
    const method=req.method;
    if (url==="/users" && method==="GET"){
        res.writeHead(200,{"Content-Type":"application/json"});
        res.end(JSON.stringify(users));
    }
    else if (method === "POST" && url === "/users") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", ()=> {
        fs.writeFile("./file,txt", body, () => {
            res.writeHead(201, "written");
            res.end();
        })
    });
  }
});

server.listen(3000,() => {console.log("Server running on port 3000");
});
