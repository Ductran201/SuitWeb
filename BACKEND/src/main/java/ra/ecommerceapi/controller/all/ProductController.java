//package ra.ecommerceapi.controller.all;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Sort;
//import org.springframework.data.web.PageableDefault;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.*;
//import ra.ecommerceapi.model.constant.EHttpStatus;
//import ra.ecommerceapi.model.dto.ResponseWrapper;
//import ra.ecommerceapi.service.IProductService;
//
//@Controller
//@RequiredArgsConstructor
//@RequestMapping("api.com/v2/products")
//public class ProductController {
//    private final IProductService productService;
//
//    @GetMapping("")
//    public ResponseEntity<?> listPagination(@RequestParam(defaultValue = "") String search
//            , @PageableDefault(page = 0, size = 2, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
//        return ResponseEntity.ok().body(
//                ResponseWrapper.builder()
//                        .data(productService.findAllPaginationUser(search, pageable))
//                        .status(EHttpStatus.SUCCESS)
//                        .code(200)
//                        .build()
//        );
//    }
//
////    @GetMapping("/{id}")
////    public ResponseEntity<?> findById(@PathVariable Long id) {
////        return new ResponseEntity<>(new ResponseDataSuccess<>(productService.findById(id), HttpStatus.OK),HttpStatus.OK );
////    }
//
//    @GetMapping("/categories/{categoryId}")
//    public ResponseEntity<?> findByCategoryId(@PathVariable Long categoryId
//            , @PageableDefault(page = 0, size = 2, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
//        return ResponseEntity.ok().body(
//                ResponseWrapper.builder()
//                        .data(productService.findAllByCategoryIdAndStatusTrue(categoryId, pageable))
//                        .status(EHttpStatus.SUCCESS)
//                        .code(200)
//                        .build()
//        );
//    }
//
//
////    @PostMapping("")
////    public ResponseEntity<?> add(@Valid @ModelAttribute ProductRequest productRequest) throws CheckDuplicateName {
////        return new ResponseEntity<>(new ResponseDataSuccess<>(productService.save(productRequest), HttpStatus.CREATED),HttpStatus.CREATED );
////    }
//
////    @PutMapping("/{id}")
////    public ResponseEntity<?> edit(@PathVariable Long id,@Valid @ModelAttribute ProductRequest productRequest) throws CheckDuplicateName {
////        return new ResponseEntity<>(new ResponseDataSuccess<>(productService.save(productRequest,id), HttpStatus.OK),HttpStatus.OK );
////    }
//
//
////    @DeleteMapping("/{id}")
////    public ResponseEntity<?> delete(@PathVariable Long id) {
////        productService.findById(id);
////        productService.delete(id);
////        return new ResponseEntity<>(null,HttpStatus.NO_CONTENT);
////    }
//
//}
