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
import ra.ecommerceapi.model.dto.request.ColorRequest;
import ra.ecommerceapi.service.IColorService;

@RestController
@RequestMapping("/api.com/v2/admin/colors")
@RequiredArgsConstructor
public class AColorController {
    private final IColorService colorService;

    @GetMapping("")
    public ResponseEntity<?> listPagination(@PageableDefault(size = 2) Pageable pageable,
                                            @RequestParam(defaultValue = "") String search,
                                            @RequestParam(defaultValue = "id") String sortField,
                                            @RequestParam(defaultValue = "DESC") String sortDirection,
                                            @RequestParam(required = false) Boolean noPagination) {
        if (Boolean.TRUE.equals(noPagination)) {
            // Get all
            return ResponseEntity.ok().body(ResponseWrapper.builder()
                    .data(colorService.findAll())
                    .status(EHttpStatus.SUCCESS)
                    .code(200)
                    .build());
        } else {
            // noPagination
            Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortField);
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);

            return ResponseEntity.ok().body(ResponseWrapper.builder()
                    .data(colorService.findAllByNameAdmin(search, pageable))
                    .status(EHttpStatus.SUCCESS)
                    .code(200)
                    .build());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable long id) throws CustomException {
        return ResponseEntity.ok().body(ResponseWrapper.builder()
                .data(colorService.findById(id))
                .status(EHttpStatus.SUCCESS)
                .code(200)
                .build());
    }



    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody ColorRequest colorRequest) throws CustomException {
        return ResponseEntity.ok().body(ResponseWrapper.builder()
                .data(colorService.add(colorRequest))
                .status(EHttpStatus.SUCCESS)
                .code(201)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody ColorRequest colorRequest,@PathVariable Long id) throws CustomException {
        findById(id);
        return ResponseEntity.ok().body(ResponseWrapper.builder()
                .data(colorService.update(colorRequest,id))
                .status(EHttpStatus.SUCCESS)
                .code(200)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id) throws CustomException {
        findById(id);
        colorService.delete(id);
        return ResponseEntity.ok().body(ResponseWrapper.builder()
                .data("Delete successfully!!")
                .status(EHttpStatus.SUCCESS)
                .code(200)
                .build());
    }

    @PutMapping("/{id}/toggleStatus")
    public ResponseEntity<?> toggleStatus(@PathVariable Long id) throws CustomException {
        findById(id);
        colorService.toggleStatus(id);
        return ResponseEntity.ok().body(new ResponseWrapper<>("Change status successfully!!", EHttpStatus.SUCCESS, 200));
    }
}
