//package ra.ecommerceapi.websocket.controller;
//
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@CrossOrigin("*")
//public class WebSocketController {
//    // Client gửi tin nhắn đến /app/hello
//    @MessageMapping("/test")
//    // Server gửi tin nhắn đến /topic/greetings
//    @SendTo("/topic/greetingsssss")
//    public String handleMessage(String message) {
//        return "Hello, " + message + "!";
//    }
//}
