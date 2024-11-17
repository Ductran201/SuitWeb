package ra.ecommerceapi.controller.all;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.constant.EHttpStatus;
import ra.ecommerceapi.model.dto.ResponseWrapper;
import ra.ecommerceapi.service.IImgProductDetailService;
import ra.ecommerceapi.service.IProductDetailService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api.com/v2/productDetails")
public class ProductDetailController {
//    private final IImgProductDetailService imgProductDetailService;
    private final IProductDetailService productDetailService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductDetailById(@PathVariable Long id) throws CustomException {

        return ResponseEntity.ok().body(ResponseWrapper.builder()
                        .data(productDetailService.getAllProductDetails(id))
                        .code(200)
                        .status(EHttpStatus.SUCCESS)
                .build());
    }

}
