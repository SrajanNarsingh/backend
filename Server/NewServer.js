const http = require("http");
const fs = require("fs");

const FILE_NAME = "notes.json";

if (!fs.existsSync(FILE_NAME)) {
    fs.writeFileSync(FILE_NAME, "[]");
}

const server = http.createServer((req, res) => {

    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    if (req.method === "GET" && pathname === "/notes") {

        fs.readFile(FILE_NAME, "utf8", (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end("Error reading notes");
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(data);
        });
    }

    else if (req.method === "POST" && pathname === "/notes") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {

            let newNote;

            try {
                newNote = JSON.parse(body);
            } catch {
                res.writeHead(400);
                return res.end("Invalid JSON");
            }

            fs.readFile(FILE_NAME, "utf8", (err, data) => {

                if (err) {
                    res.writeHead(500);
                    return res.end("Error reading file");
                }

                let notes;

                try {
                    notes = JSON.parse(data);
                } catch {
                    notes = [];
                }

                notes.push(newNote);

                fs.writeFile(FILE_NAME, JSON.stringify(notes, null, 2), (err) => {

                    if (err) {
                        res.writeHead(500);
                        return res.end("Error saving note");
                    }

                    res.writeHead(201, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Note added successfully" }));
                });
            });
        });
    }

    else {
        res.writeHead(404);
        res.end("Route not found");
    }
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
