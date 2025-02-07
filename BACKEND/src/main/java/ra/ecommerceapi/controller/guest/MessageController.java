package ra.ecommerceapi.controller.guest;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ra.ecommerceapi.model.constant.EHttpStatus;
import ra.ecommerceapi.model.dto.ResponseWrapper;
import ra.ecommerceapi.service.ICommentService;
import ra.ecommerceapi.service.IMessageService;

@RestController
@RequiredArgsConstructor
@RequestMapping("api.com/v2/chatroom")
public class MessageController {
    private final IMessageService messageService;

    @GetMapping("")
    public ResponseEntity<?> getAllMessage(@PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok().body(ResponseWrapper.builder()
                .data(messageService.findAllMessagesPaginationGuest(pageable))
                .code(200)
                .status(EHttpStatus.SUCCESS)
                .build());
    }
}
