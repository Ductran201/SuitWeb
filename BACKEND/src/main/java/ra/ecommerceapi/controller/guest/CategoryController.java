package ra.ecommerceapi.controller.guest;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
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
    public ResponseEntity<?> listPagination(
            @RequestParam(defaultValue = "") String search,
            @PageableDefault(size = 2) Pageable pageable,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "DESC") String sortDirection,
            @RequestParam(required = false) Boolean noPagination) {

        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortField);
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);

        // No pagination
        if (Boolean.TRUE.equals(noPagination)) {
            return ResponseEntity.ok().body(new ResponseWrapper<>(categoryService.findAll(), EHttpStatus.SUCCESS, 200));
        }
        return ResponseEntity.ok().body(new ResponseWrapper<>(categoryService.findAllPaginationUser(search, pageable), EHttpStatus.SUCCESS, 200));
    }

    @GetMapping("/{categoryId}/products")
    public ResponseEntity<?> listProductsByCategoryForGuest(@PathVariable Long categoryId,
                                                           @RequestParam(defaultValue = "") String search,
                                                           @PageableDefault(size = 2, sort = "id", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        categoryService.findById(categoryId);

        return ResponseEntity.ok().body(ResponseWrapper.builder()
                .data(productService.findAllProductByCategory(categoryId, search, pageable))
                .code(200)
                .status(EHttpStatus.SUCCESS)
                .build());
    }

    @GetMapping("/{categoryId}/products/related")
    public ResponseEntity<?> list5ProductRelatedByCategory(@PathVariable Long categoryId){
        categoryService.findById(categoryId);

        return ResponseEntity.ok().body(ResponseWrapper.builder()
                .data(productService.findTopProductNewestByCategory(categoryId))
                .code(200)
                .status(EHttpStatus.SUCCESS)
                .build());
    }

}
