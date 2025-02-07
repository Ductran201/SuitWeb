//package ra.ecommerceapi.websocket.controller;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.web.bind.annotation.RestController;
//import ra.ecommerceapi.model.dto.request.MessageRequest;
//import ra.ecommerceapi.model.entity.Message;
//import ra.ecommerceapi.model.entity.User;
//import ra.ecommerceapi.repository.IMessageRepo;
//import ra.ecommerceapi.service.IAuthService;
//import ra.ecommerceapi.service.IMessageService;
//
//import java.util.Date;
//
//@RestController
//@RequiredArgsConstructor
//public class ChatController {
//    private final IMessageService messageService;
//    private final IAuthService authService;
//    private final IMessageRepo messageRepo;
//
//    @MessageMapping("/send")
//    @SendTo("/topic/messages")
//    public Message sendMessage(@Payload MessageRequest messageRequest) {
//
//        User userCurrent = authService.getCurrentUser().getUser();
//        Message message = Message.builder()
//                .user(userCurrent)
//                .message(messageRequest.getMessage())
//                .build();
//        message.setStatus(true);
//        message.setCreatedDate(new Date());
//
//        // Lưu vào database
//        messageRepo.save(message);
//
//        return message;
//
////        return messageService.save(messageRequest);
////        message.setTimestamp(LocalDateTime.now());
////        chatMessageService.saveMessage(message); // Lưu vào database
////        return message;
//    }
//
//
//}
