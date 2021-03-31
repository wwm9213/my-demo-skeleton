const Ws = require("ws");

const server = new Ws.Server({ port: 8000 });
const msgList = [];
server.on("open", e => {
  console.log("open", e);
});

server.on("close", conn => {
  console.log("close", conn);
});

server.on("connection", conn => {
  conn.on("message", e => {
    const data = JSON.parse(e);
    msgList.push(data);
    const num = getPeopleNum(msgList);
    const newData = { ...data, peopleNum: num };
    server.clients.forEach(el => {
      el.send(JSON.stringify(newData));
    });
  });
});

server.on("error", () => {
  console.log("error");
});

function getPeopleNum(arr) {
  let obj = {};
  arr.forEach(el => {
    if (el.type === "TYPE_ENTER") {
      obj[el.id] = true;
    } else if (el.type === "TYPE_LEAVE") {
      obj[el.id] = false;
    }
  });

  const numArr = [];
  for (const key in obj) {
    if (obj[key]) {
      numArr.push(obj[key]);
    }
  }
  console.log(numArr.length);
  return numArr.length;
}
