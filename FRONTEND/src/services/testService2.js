import SockJS from "sockjs-client";
import Stomp from "stompjs";

const SOCKET_URL = "http://localhost:9999/ws"; // URL Backend

let stompClient;

export const connectWebSocket = (callback) => {
  const socket = new SockJS(SOCKET_URL); // Kết nối SockJS
  stompClient = Stomp.over(socket); // Sử dụng Stomp.js với SockJS

  stompClient.connect(
    {},
    () => {
      console.log("Connected to WebSocket");
      // Đăng ký subscribe
      stompClient.subscribe("/topic/color", (message) => {
        const colorData = JSON.parse(message.body);
        callback(colorData); // Hàm callback xử lý dữ liệu nhận được
      });
    },
    (error) => {
      console.error("WebSocket error:", error);
    }
  );
};

export const sendWebSocketMessage = (colorRequest) => {
  if (stompClient && stompClient.connected) {
    stompClient.send(
      "/app/colors", // Destination
      {}, // Headers (nếu có)
      JSON.stringify(colorRequest) // Body
    );
  }
};
