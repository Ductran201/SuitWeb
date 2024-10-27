//package ra.ecommerceapi.controller.user;
//
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Sort;
//import org.springframework.data.web.PageableDefault;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.*;
//import ra.ecommerceapi.exception.CustomException;
//import ra.ecommerceapi.model.constant.EHttpStatus;
//import ra.ecommerceapi.model.dto.ResponseWrapper;
//import ra.ecommerceapi.model.dto.request.OrderRequestStatus;
//import ra.ecommerceapi.service.IOrderService;
//
//@Controller
//@RequiredArgsConstructor
//@RequestMapping("/api.com/v2/user/orders")
//public class UOrderController {
//    private final IOrderService orderService;
//
//
//    @GetMapping("")
//    public ResponseEntity<?> listPagination(@RequestParam(defaultValue = "") String search
//            , @PageableDefault(page = 0, size = 2, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
//        return ResponseEntity.ok().body(
//                ResponseWrapper.builder()
//                        .data(orderService.findAllPaginationUser(search, pageable))
//                        .status(EHttpStatus.SUCCESS)
//                        .code(200)
//                        .build()
//        );
//    }
//
//    @GetMapping("/{orderCode}")
//    public ResponseEntity<?> getById(@PathVariable String orderCode) throws CustomException {
//        return ResponseEntity.ok().body(
//                ResponseWrapper.builder()
//                        .data(orderService.findByUSerAndCode(orderCode))
//                        .status(EHttpStatus.SUCCESS)
//                        .code(200)
//                        .build()
//        );
//    }
//
//
//    @GetMapping("/status/{orderStatus}")
//    public ResponseEntity<?> getAllByStatus(@PathVariable String orderStatus
//            , @PageableDefault(page = 0, size = 2, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) throws CustomException {
//        return ResponseEntity.ok().body(
//                ResponseWrapper.builder()
//                        .data(orderService.filterByStatus(orderStatus, pageable))
//                        .status(EHttpStatus.SUCCESS)
//                        .code(200)
//                        .build()
//        );
//    }
//
//    @PutMapping("/{orderId}/cancel")
//    public ResponseEntity<?> changeStatus(@PathVariable Long orderId) throws CustomException {
//        return ResponseEntity.ok().body(
//                ResponseWrapper.builder()
//                        .data(orderService.cancelOrderByUser(orderId))
//                        .status(EHttpStatus.SUCCESS)
//                        .code(200)
//                        .build()
//        );
//    }
//
//}
