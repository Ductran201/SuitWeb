package ra.ecommerceapi.controller.admin;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.constant.EHttpStatus;
import ra.ecommerceapi.model.dto.ResponseWrapper;
import ra.ecommerceapi.model.dto.request.ProductDetailRequest;
import ra.ecommerceapi.service.IProductDetailService;

@RestController
@RequestMapping("api.com/v2/admin/productDetails")
@RequiredArgsConstructor
public class AProductDetailController {
    private final IProductDetailService productDetailService;

    @GetMapping("/products/{productId}")
    public ResponseEntity<?> listPagination(@PathVariable Long productId,
                                            @PageableDefault(size = 2) Pageable pageable,
                                            @RequestParam(defaultValue = "") String search,
                                            @RequestParam(defaultValue = "id") String sortField,
                                            @RequestParam(defaultValue = "DESC") String sortDirection) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortField);
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
        return ResponseEntity.ok().body(new ResponseWrapper<>(productDetailService.findAllProductDetailByNameAdmin(search,productId ,pageable), EHttpStatus.SUCCESS, 200));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) throws CustomException {
        return ResponseEntity.ok().body(new ResponseWrapper<>(productDetailService.findById(id), EHttpStatus.SUCCESS, 200));
    }

    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody ProductDetailRequest productDetailRequest) throws CustomException {
        return ResponseEntity.ok().body(new ResponseWrapper<>(productDetailService.add(productDetailRequest), EHttpStatus.SUCCESS, 200));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> edit(@Valid @RequestBody ProductDetailRequest productDetailRequest, @PathVariable Long id) throws CustomException {
        findById(id);
        return ResponseEntity.ok().body(new ResponseWrapper<>(productDetailService.edit(productDetailRequest,id), EHttpStatus.SUCCESS, 200));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws CustomException {
        findById(id);
        productDetailService.delete(id);
        return ResponseEntity.ok().body(new ResponseWrapper<>("Delete successfully!!", EHttpStatus.SUCCESS, 200));
    }

    @PutMapping("/{id}/toggleStatus")
    public ResponseEntity<?> toggleStatus(@PathVariable Long id) throws CustomException {
        findById(id);
        productDetailService.toggleStatus(id);
        return ResponseEntity.ok().body(new ResponseWrapper<>("Change status successfully!!", EHttpStatus.SUCCESS, 200));
    }

}
