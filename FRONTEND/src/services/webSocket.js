// import SockJS from "sockjs-client";
// import Stomp from "stompjs";
// import colorService from "./colorService"

// export class SocketService {
//   stompClient;
//   colors;

//   constructor(colorService) {

//   }

//   connect() {
//     const ws = new SockJS("http:localhost:9999/ws");
//     this.stompClient = Stomp.over(ws);
//     this.stompClient.connect({}, () => {
//       this.stompClient.subscribe("/topic/colors", (data) => {
//         const jsonData = JSON.parse(data.body);
//         this.colors.push(jsonData);
//       });
//     });
//   }

//   getAllProduct(){
//     this.colorService
//   }
// }

// ===============================================

// import { Client } from '@stomp/stompjs';
import SockJS from "sockjs-client";
import Stomp from "stompjs";

class SocketService {
  constructor() {
    this.stompClient = null;
    this.products = [];
  }

  connect() {
    const ws = new SockJS("http:localhost:9999/ws");
    const stompClient = Stomp.over(ws);

    // this.stompClient.
    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/products", (data) => {
        const jsonData = JSON.parse(data.body);
        this.products.push(jsonData);
      });
    });
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }

  createProductUsingSocket(product) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: "/app/products",
        body: JSON.stringify(product),
      });
    }
  }
}

export default new SocketService();
