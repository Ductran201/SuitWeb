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
import ra.ecommerceapi.model.dto.request.CategoryRequest;
import ra.ecommerceapi.service.ICategoryService;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api.com/v2/admin/categories")
public class ACategoryController {
    private final ICategoryService categoryService;

    /**
     * @param search   String
     * @param pageable Pageable
     * @apiNote handle get all categories with pagination and search for admin role
     */
//     /api/categories?search=someSearch&sortField=name&sortDirection=ASC&page=0&size=2
    @GetMapping("")
    public ResponseEntity<?> listPagination(
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "id") String sortField,   // Field to sort by (e.g., name, price)
            @RequestParam(defaultValue = "DESC") String sortDirection,  // Sorting direction (ASC or DESC)
            @PageableDefault(page = 0, size = 2) Pageable pageable,
            @RequestParam(required = false) Boolean noPagination) {

        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortField);
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);

        // Pagination or get all
        if (Boolean.TRUE.equals(noPagination)) {
            // Get all
            return ResponseEntity.ok().body(
                    ResponseWrapper.builder()
                            .data(categoryService.findAll())
                            .status(EHttpStatus.SUCCESS)
                            .code(200)
                            .build()
            );
        } else {
            // Pagination
            return ResponseEntity.ok().body(
                    ResponseWrapper.builder()
                            .data(categoryService.findAllPaginationAdmin(search, pageable))
                            .status(EHttpStatus.SUCCESS)
                            .code(200)
                            .build()
            );
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        return ResponseEntity.ok().body(
                ResponseWrapper.builder()
                        .data(categoryService.findById(id))
                        .status(EHttpStatus.SUCCESS)
                        .code(200)
                        .build()
        );
    }

    @PostMapping("")
    public ResponseEntity<?> add(@Valid @ModelAttribute CategoryRequest categoryRequest) throws CustomException {
        return new ResponseEntity<>(ResponseWrapper.builder()
                .data(categoryService.save(categoryRequest))
                .status(EHttpStatus.SUCCESS)
                .code(201)
                .build(), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> edit(@PathVariable Long id, @Valid @ModelAttribute CategoryRequest categoryRequest) throws CustomException {
        return new ResponseEntity<>(ResponseWrapper.builder()
                .data(categoryService.save(categoryRequest, id))
                .status(EHttpStatus.SUCCESS)
                .code(200)
                .build(), HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        findById(id);
        categoryService.delete(id);
        return new ResponseEntity<>(ResponseWrapper.builder()
                .data("Delete successfully")
                .status(EHttpStatus.SUCCESS)
                .code(200)
                .build(), HttpStatus.OK);
    }

    @PutMapping("/{id}/toggleStatus")
    public ResponseEntity<?> toggleStatus(@PathVariable Long id) {
        findById(id);
        categoryService.toggleStatus(id);
        return ResponseEntity.ok().body(new ResponseWrapper<>("Change status successfully!!", EHttpStatus.SUCCESS, 200));
    }

}
