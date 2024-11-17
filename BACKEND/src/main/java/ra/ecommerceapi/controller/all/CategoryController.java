package ra.ecommerceapi.controller.all;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ra.ecommerceapi.model.constant.EHttpStatus;
import ra.ecommerceapi.model.dto.ResponseWrapper;

import ra.ecommerceapi.service.ICategoryService;
import ra.ecommerceapi.service.IProductService;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api.com/v2/categories")
public class CategoryController {
    private final ICategoryService categoryService;
    private final IProductService productService;

    @GetMapping("")
    public ResponseEntity<?> listPagination(@RequestParam(defaultValue = "") String search
            , @PageableDefault(page = 0, size = 2, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(new ResponseWrapper<>(categoryService.findAllPaginationUser(search, pageable), EHttpStatus.SUCCESS, 200));
    }

    @GetMapping("/{id}/products")
    public ResponseEntity<?> listProductsByCategoryForUser(@PathVariable Long id,
                                                           @RequestParam(defaultValue = "sh") String search,
                                                           @PageableDefault(size = 2, sort = "id", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        categoryService.findById(id);


        return ResponseEntity.ok().body(ResponseWrapper.builder()
                .data(productService.findAllPaginationUser(id, search, pageable))
                .code(200)
                .status(EHttpStatus.SUCCESS)
                .build());
    }

}
