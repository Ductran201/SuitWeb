package ra.ecommerceapi.websocket.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.dto.request.ColorRequest;
import ra.ecommerceapi.model.dto.request.ProductRequest;
import ra.ecommerceapi.model.entity.Color;
import ra.ecommerceapi.model.entity.Message;
import ra.ecommerceapi.model.entity.Product;
import ra.ecommerceapi.service.IColorService;
import ra.ecommerceapi.service.IProductService;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class MessageWebSocketController {

    private final IColorService colorService;

    @MessageMapping("/colors")
    @SendTo("/topic/color")
    public Color createProduct(ColorRequest colorRequest) throws CustomException {
        return colorService.add(colorRequest);
    }
//    private final IProductService productService;
//    @MessageMapping("/send-message") // client gửi tin đến endpoint này
//    @SendTo("/topic/messages") // gửi tin đến tất cả các client subscribe
//    public Message sendMessage(Message message) {
//        // Xử lý logic lưu vào database nếu cần
//        return message; // tin nhắn được gửi tới các client
//    }



//    @MessageMapping("/products")
//    @SendTo("/topic/product")
//    public Product createProduct(ProductRequest productRequest) throws CustomException {
//        return productService.save(productRequest);
//    }


}
