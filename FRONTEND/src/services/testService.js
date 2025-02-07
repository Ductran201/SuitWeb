import SockJS from "sockjs-client";
import Stomp from "stompjs";

export class SocketService{
    stompClient : any;
    product: Product[] =[];

    constructor(private ProductService: ProductService){
        this.getAllProduct();
    } 

    getAllProduct(){
        this.ProductService.getAll().subcribe(products=>this.products = products)
    }

    connect() {
        const ws = new SockJS("http:localhost:9999/ws");
         this.stompClient = Stomp.over(ws);
    
        // this.stompClient.
        this.stompClient.connect({}, () => {
          this.stompClient.subscribe("/topic/products", (data) => {
            const jsonData = JSON.parse(data.body);
            this.products.push(jsonData);
          });
        });
      }
    
      disconnect() {
        if (this.stompClient != null) {
          this.stompClient.disconnect();
        }
      }
    
      createProductUsingSocket(product) {
        this.stompClient.send("/app/products",{},JSON.stringify(product))
      }
    
}