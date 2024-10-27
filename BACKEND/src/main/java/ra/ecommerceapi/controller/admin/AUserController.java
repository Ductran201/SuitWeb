package ra.ecommerceapi.controller.admin;

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
import ra.ecommerceapi.service.IUserService;


@Controller
@RequiredArgsConstructor
@RequestMapping("api.com/v2/admin/users")
public class AUserController {
    private final IUserService userService;

    @GetMapping("")
    public ResponseEntity<?> listPagination(@RequestParam(defaultValue = "") String search
            , @PageableDefault(page = 0, size = 2) Pageable pageable,
                                            @RequestParam(defaultValue = "id") String sortField,
                                            @RequestParam(defaultValue = "DESC") String sortDirection) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortField);
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
        return ResponseEntity.ok().body(
                ResponseWrapper.builder()
                        .data(userService.findAllPaginationAdmin(search, pageable))
                        .status(EHttpStatus.SUCCESS)
                        .code(200)
                        .build());
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> toggleStatus(@PathVariable Long id) {
        userService.findUserExceptAdminById(id);
        userService.toggleStatus(id);
        return ResponseEntity.ok().body(
                ResponseWrapper.builder()
                        .data("Change status successfully")
                        .status(EHttpStatus.SUCCESS)
                        .code(200)
                        .build());
    }

    // Add role for user
    @PostMapping("/{userId}/role/{roleId}")
    public ResponseEntity<?> addRoleForUser(@PathVariable Long userId, @PathVariable Long roleId) throws CustomException {
        userService.addRoleForUser(userId, roleId);
        return new ResponseEntity<>(new ResponseWrapper<>("Add role successfully", EHttpStatus.SUCCESS, 201), HttpStatus.CREATED);

    }

    @DeleteMapping("/{userId}/role/{roleId}")
    public ResponseEntity<?> deleteRoleForUser(@PathVariable Long userId, @PathVariable Long roleId) throws CustomException {
        userService.deleteRoleForUser(userId, roleId);
//        return ResponseEntity.ok().body(
//                new ResponseWrapper<>("Delete role successfully",EHttpStatus.SUCCESS,200));
        return new ResponseEntity<>("Delete role successfully", HttpStatus.NO_CONTENT);
    }


}
