const fs = require("fs");

const readToDo = function () {
  const data = fs.readFileSync("ToDo.json", "utf-8");
  return JSON.parse(data);
};

console.log(readToDo());
