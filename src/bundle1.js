console.log("bundle1.js");

// http://localhost:8080
const ssEvent = new EventSource("http://localhost:8080/api/getSSE");
ssEvent.addEventListener(
  "open",
  (e) => {
    console.log("前端建立链接:::", e.data);
  },
  false
);

const webpackDom = document.querySelector(".webpack");
ssEvent.addEventListener("message", (e) => {
  console.log("前端收到消息:::", e.data);
  webpackDom.innerHTML += e.data;
});

ssEvent.addEventListener('close', (event) => {
  console.log('Stream finished:', event.data);
  ssEvent.close();  // 主动关闭连接
});
