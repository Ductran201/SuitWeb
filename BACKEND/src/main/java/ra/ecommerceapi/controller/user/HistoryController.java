package ra.ecommerceapi.controller.user;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ra.ecommerceapi.model.constant.EHttpStatus;
import ra.ecommerceapi.model.dto.ResponseWrapper;
import ra.ecommerceapi.model.entity.User;
import ra.ecommerceapi.service.IAuthService;
import ra.ecommerceapi.service.IHistoryService;

@RestController
@RequiredArgsConstructor
@RequestMapping("api.com/v2/user/history")
public class HistoryController {

    private final IHistoryService historyService;
    private final IAuthService authService;

    @GetMapping("")
    public ResponseEntity<?> getUserHistory(
            @PageableDefault(size = 5, sort = "viewTime", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        User userCurrent = authService.getCurrentUser().getUser();

        return ResponseEntity.ok().body(ResponseWrapper.builder()
                .data(historyService.getUserHistory(userCurrent, pageable))
                .code(200)
                .status(EHttpStatus.SUCCESS)
                .build());
    }

    @PostMapping("/products/{productId}")
    public ResponseEntity<?> createOrUpdateHistory(
            @PathVariable Long productId
    ) {
        User userCurrent = authService.getCurrentUser().getUser();
        historyService.createOrUpdateHistory(userCurrent, productId);
        return ResponseEntity.ok().body(ResponseWrapper.builder()
                .data("Lịch sử xem được tạo hoặc cập nhật thành công.")
                .code(200)
                .status(EHttpStatus.SUCCESS)
                .build());
    }
}
