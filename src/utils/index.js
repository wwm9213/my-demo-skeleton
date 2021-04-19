import { Promise } from "core-js";

// 生成唯一的uuid
export const createUUID = () => {
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now(); //use high-precision timer if available
  }
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
    c
  ) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

// 存储token
export const storage = {
  get() {
    return (
      (window.localStorage.getItem("tokenInfo") &&
        JSON.parse(window.localStorage.getItem("tokenInfo"))) ||
      false
    );
  },
  set(data) {
    window.localStorage.setItem("tokenInfo", JSON.stringify(data));
  },
  del() {
    return new Promise(res => {
      window.localStorage.removeItem("tokenInfo");
      res(true);
    });
  }
};
