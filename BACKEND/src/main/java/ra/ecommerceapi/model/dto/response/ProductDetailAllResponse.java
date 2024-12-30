package ra.ecommerceapi.model.dto.response;

import lombok.*;
import ra.ecommerceapi.model.entity.ImgProductDetail;
import ra.ecommerceapi.model.entity.ProductDetail;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ProductDetailAllResponse {
    private ProductDetail productDetail;
    private List<ImgProductDetail> images;
}
