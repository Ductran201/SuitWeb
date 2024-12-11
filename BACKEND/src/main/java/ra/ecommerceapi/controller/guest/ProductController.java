package ra.ecommerceapi.controller.guest;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ra.ecommerceapi.model.constant.EHttpStatus;
import ra.ecommerceapi.model.dto.ResponseWrapper;
import ra.ecommerceapi.service.ICategoryService;
import ra.ecommerceapi.service.IProductService;

@Controller
@RequiredArgsConstructor
@RequestMapping("api.com/v2/products")
public class ProductController {
    private final IProductService productService;
    private final ICategoryService categoryService;


    @GetMapping("/{id}")
    public ResponseEntity<?> findProductResponseById(@PathVariable Long id) {

        return ResponseEntity.ok(ResponseWrapper.builder()
                        .status(EHttpStatus.SUCCESS)
                        .code(200)
                        .data(productService.findProductResponseByProductId(id))
                .build());
//        return ResponseEntity.ok().body(productService.findProductResponseByProductId(id));
    }

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

    @GetMapping("/newest/{categoryId}")
    public ResponseEntity<?> topProductNewest(@PathVariable Long categoryId) {
        categoryService.findById(categoryId);
        return ResponseEntity.ok().body(
                ResponseWrapper.builder()
                        .data(productService.findTopProductNewestByCategory(categoryId))
                        .status(EHttpStatus.SUCCESS)
                        .code(200)
                        .build()
        );
    }





}