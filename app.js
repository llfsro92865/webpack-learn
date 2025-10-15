// 后端服务
import express from "express";

const app = express();

app.get("/api/user", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/getSSE", (req, res) => {
  // 设置 SSE 相关的响应头
  res.writeHead(200, {
    // "Access-Control-Allow-Origin": " *",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*", // 添加 CORS 支持
  });

  const resArr = ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d", "!"];

  // 处理客户端断开连接
  req.on("close", () => {
    clearInterval(setTimeInterval);
  });

  let setTimeInterval = setInterval(() => {
    if (resArr.length > 0) {
      // 发送数据，注意格式必须是 data: + 内容 + \n\n
      res.write(`data: ${resArr.shift()}\n\n`);
    } else {
      // 发送结束事件
      res.write("event: close\ndata: Stream finished\n\n");
      clearInterval(setTimeInterval);
      // 延迟关闭连接，确保客户端收到结束事件
      // setTimeout(() => {
      //   res.end();
      // }, 100);
    }
  }, 300);

  // 错误处理
  res.on("error", (err) => {
    console.error("Stream error:", err);
  });
});

app.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});
