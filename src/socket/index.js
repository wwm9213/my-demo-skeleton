const Ws = require("ws");
// const utils = require("../utils");
// const moment = require("moment");

// export const TYPE_ENTER = "TYPE_ENTER";
// export const TYPE_MSG = "TYPE_MSG";
// export const TYPE_LEAVE = "TYPE_LEAVE";

const server = new Ws.Server({ port: 8000 });

server.on("open", e => {
  console.log("open", e);
});

server.on("close", conn => {
  console.log("close", conn);
});

server.on("connection", conn => {
  conn.on("message", e => {
    server.clients.forEach(el => {
      el.send(e);
    });
  });
});

server.on("error", () => {
  console.log("error");
});
