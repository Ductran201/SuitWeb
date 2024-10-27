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
import ra.ecommerceapi.model.dto.request.SizeRequest;
import ra.ecommerceapi.service.ISizeService;

@RestController
@RequestMapping("/api.com/v2/admin/sizes")
@RequiredArgsConstructor
public class ASizeController {
    private final ISizeService sizeService;

    @GetMapping("")
    public ResponseEntity<?> listPagination(@PageableDefault(size = 2) Pageable pageable,
                                            @RequestParam(defaultValue = "") String search,
                                            @RequestParam(defaultValue = "id") String sortField,
                                            @RequestParam(defaultValue = "DESC") String sortDirection,
                                            @RequestParam(required = false) Boolean noPagination) {
        if (Boolean.TRUE.equals(noPagination)) {
            // Get all
            return ResponseEntity.ok().body(ResponseWrapper.builder()
                    .data(sizeService.findAll())
                    .status(EHttpStatus.SUCCESS)
                    .code(200)
                    .build());
        } else {
            // noPagination
            Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortField);
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);

            return ResponseEntity.ok().body(ResponseWrapper.builder()
                    .data(sizeService.findAllByNameAdmin(search, pageable))
                    .status(EHttpStatus.SUCCESS)
                    .code(200)
                    .build());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable long id) throws CustomException {
        return ResponseEntity.ok().body(ResponseWrapper.builder()
                .data(sizeService.findById(id))
                .status(EHttpStatus.SUCCESS)
                .code(200)
                .build());
    }

    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody SizeRequest sizeRequest) throws CustomException {
        return ResponseEntity.ok().body(ResponseWrapper.builder()
                .data(sizeService.add(sizeRequest))
                .status(EHttpStatus.SUCCESS)
                .code(201)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody SizeRequest sizeRequest,@PathVariable Long id) throws CustomException {
        findById(id);
        return ResponseEntity.ok().body(ResponseWrapper.builder()
                .data(sizeService.update(sizeRequest,id))
                .status(EHttpStatus.SUCCESS)
                .code(200)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id) throws CustomException {
        findById(id);
        sizeService.delete(id);
        return ResponseEntity.ok().body(ResponseWrapper.builder()
                .data("Delete successfully!!")
                .status(EHttpStatus.SUCCESS)
                .code(200)
                .build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> toggleStatus(@PathVariable Long id) throws CustomException {
        findById(id);
        sizeService.toggleStatus(id);
        return ResponseEntity.ok().body(new ResponseWrapper<>("Change status successfully!!", EHttpStatus.SUCCESS, 200));
    }

}
