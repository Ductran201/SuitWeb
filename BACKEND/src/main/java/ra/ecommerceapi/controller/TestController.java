package ra.ecommerceapi.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ra.ecommerceapi.model.constant.EHttpStatus;
import ra.ecommerceapi.model.dto.ResponseWrapper;
import ra.ecommerceapi.model.entity.Person;
import ra.ecommerceapi.service.IProductService;

@RestController
@RequestMapping("api.com/v2/test")
@RequiredArgsConstructor
public class TestController {
    private final IProductService productService;

    @PostMapping("")
    public ResponseEntity<?> testController(@RequestBody Person person) {

        // Xử lý đăng nhập (giả sử token là JWT được tạo sau khi xác thực)
        String token = "contentcookie";

        // Tạo cookie
        ResponseCookie cookie = ResponseCookie.from("keyName", token)
                .httpOnly(true)         // Chỉ cho phép server truy cập cookie
//                .secure(false)           // Chỉ gửi qua HTTPS
                .path("/")              // Áp dụng cho toàn bộ domain
//                .maxAge(7 * 24 * 60 * 60) // Thời hạn sống 7 ngày (giây)
                .maxAge(60)
//                .sameSite("Lax")     // Ngăn CSRF
                .build();

        return ResponseEntity.ok()
                .header("set-cookie", cookie.toString())
                .body(ResponseWrapper.builder()
                        .code(200)
                        .status(EHttpStatus.SUCCESS)
                        .data("da nhan cookie" + cookie)
                .build());

    }

    @GetMapping("")
    public ResponseEntity<?> listPagination(@RequestParam(defaultValue = "") String search
            , @PageableDefault(page = 0, size = 5) Pageable pageable
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


}
