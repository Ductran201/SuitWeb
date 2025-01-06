package ra.ecommerceapi.controller.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.constant.EHttpStatus;
import ra.ecommerceapi.model.dto.ResponseWrapper;
import ra.ecommerceapi.service.IOrderDetailService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api.com/v2/user/orderDetails")
public class UOrderDetailController {

    private final IOrderDetailService orderDetailService;

    @GetMapping("/{orderId}")
    public ResponseEntity<?> findAllOrderDetailByOrderId(@PathVariable Long orderId) {

        return ResponseEntity.ok().body(ResponseWrapper.builder()
                .data(orderDetailService.findAllOrderDetail(orderId))
                .code(200)
                .status(EHttpStatus.SUCCESS)
                .build());
    }

   
}
