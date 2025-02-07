package ra.ecommerceapi.controller.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import ra.ecommerceapi.model.constant.EHttpStatus;
import ra.ecommerceapi.model.dto.ResponseWrapper;
import ra.ecommerceapi.model.dto.request.MessageRequest;
import ra.ecommerceapi.service.IMessageService;

@RestController
@RequiredArgsConstructor
@RequestMapping("api.com/v2/user/messages")
public class UMessageController {
    private final IMessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping("")
    public ResponseEntity<?> findAllByUser() {
        return ResponseEntity.ok().body(
                ResponseWrapper.builder()
                        .data(messageService.findAllByUser())
                        .status(EHttpStatus.SUCCESS)
                        .code(200)
                        .build()
        );
    }

    @PostMapping("")
    public ResponseEntity<?> sendMessage(@Valid @RequestBody MessageRequest messageRequest) {
        messagingTemplate.convertAndSend("/topic/chatRoom", messageRequest);
        return ResponseEntity.ok().body(ResponseWrapper.builder()
                .code(201)
                .data(messageService.save(messageRequest))
                .status(EHttpStatus.SUCCESS)
                .build());
    }
}
