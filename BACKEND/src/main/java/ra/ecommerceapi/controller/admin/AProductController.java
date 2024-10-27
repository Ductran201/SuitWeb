package ra.ecommerceapi.controller.admin;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.constant.EHttpStatus;
import ra.ecommerceapi.model.dto.ResponseWrapper;
import ra.ecommerceapi.model.dto.request.ProductRequest;
import ra.ecommerceapi.service.IProductService;

@Controller
@RequiredArgsConstructor
@RequestMapping("api.com/v2/admin/products")
public class AProductController {
    private final IProductService productService;

    /**
     * @param search   String
     * @param pageable Pageable
     * @apiNote handle get all products with pagination and search for admin role
     */

    @GetMapping("")
    public ResponseEntity<?> listPagination(@RequestParam(defaultValue = "") String search
            , @PageableDefault(page = 0, size = 2) Pageable pageable
            , @RequestParam(defaultValue = "id") String sortField
            , @RequestParam(defaultValue = "DESC") String sortDirection) {
        // DESC have to transfer to string
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortField);
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
        return ResponseEntity.ok().body(
                ResponseWrapper.builder()
                        .data(productService.findAllPaginationAdmin(search, pageable))
                        .status(EHttpStatus.SUCCESS)
                        .code(200)
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        return ResponseEntity.ok().body(
                ResponseWrapper.builder()
                        .data(productService.findById(id))
                        .status(EHttpStatus.SUCCESS)
                        .code(200)
                        .build()
        );
    }

    @PostMapping("")
    public ResponseEntity<?> add(@Valid @ModelAttribute ProductRequest productRequest) throws CustomException {
        return new ResponseEntity<>(ResponseWrapper.builder()
                .data(productService.save(productRequest))
                .status(EHttpStatus.SUCCESS)
                .code(201)
                .build(), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> edit(@PathVariable Long id, @Valid @ModelAttribute ProductRequest productRequest) throws CustomException {
        return new ResponseEntity<>(ResponseWrapper.builder()
                .data(productService.save(productRequest, id))
                .status(EHttpStatus.SUCCESS)
                .code(200)
                .build(), HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        findById(id);
        productService.delete(id);
        return new ResponseEntity<>(ResponseWrapper.builder()
                .data("Delete successfully")
                .status(EHttpStatus.SUCCESS)
                .code(200)
                .build(), HttpStatus.OK);
    }

    @PutMapping("/{id}/toggleStatus")
    public ResponseEntity<?> toggleStatus(@PathVariable Long id) {
        findById(id);
        productService.toggleStatus(id);
        return ResponseEntity.ok().body(new ResponseWrapper<>("Change status successfully!!", EHttpStatus.SUCCESS, 200));
    }



}
