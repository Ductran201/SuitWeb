//package ra.ecommerceapi.controller.admin;
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
//import ra.ecommerceapi.model.constant.OrderStatus;
//import ra.ecommerceapi.model.dto.ResponseWrapper;
//import ra.ecommerceapi.model.dto.request.OrderRequestStatus;
//import ra.ecommerceapi.service.IOrderService;
//
//@Controller
//@RequiredArgsConstructor
//@RequestMapping("/api.com/v2/admin/orders")
//public class AOrderController {
//    private final IOrderService orderService;
//
//    @GetMapping("")
//    public ResponseEntity<?> listPagination(@RequestParam(defaultValue = "") String search
//            ,@PageableDefault(page = 0,size = 2,sort = "id",direction = Sort.Direction.DESC) Pageable pageable){
//        return ResponseEntity.ok().body(
//                ResponseWrapper.builder()
//                        .data(orderService.findAllPaginationAdmin(search,pageable))
//                        .status(EHttpStatus.SUCCESS)
//                        .code(200)
//                        .build()
//        );
//    }
//
//    @GetMapping("/status/{orderStatus}")
//    public ResponseEntity<?> getAllByStatus(@PathVariable String orderStatus
//            ,@PageableDefault(page = 0,size = 2,sort = "id",direction = Sort.Direction.DESC) Pageable pageable) throws CustomException {
//        return ResponseEntity.ok().body(
//                ResponseWrapper.builder()
//                        .data(orderService.filterByStatus(orderStatus,pageable))
//                        .status(EHttpStatus.SUCCESS)
//                        .code(200)
//                        .build()
//        );
//    }
//
//    @GetMapping("/{orderId}")
//    public ResponseEntity<?> getById(@PathVariable Long orderId){
//        return ResponseEntity.ok().body(
//                ResponseWrapper.builder()
//                        .data(orderService.findById(orderId))
//                        .status(EHttpStatus.SUCCESS)
//                        .code(200)
//                        .build()
//        );
//    }
//
//    @PutMapping("/{orderId}/status")
//    public ResponseEntity<?> changeStatus(@PathVariable Long orderId,@Valid @RequestBody OrderRequestStatus orderRequestStatus){
//        return ResponseEntity.ok().body(
//                ResponseWrapper.builder()
//                        .data(orderService.changeStatus(orderId, orderRequestStatus))
//                        .status(EHttpStatus.SUCCESS)
//                        .code(200)
//                        .build()
//        );
//    }
//
//}
