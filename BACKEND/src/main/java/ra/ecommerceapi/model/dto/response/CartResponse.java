package ra.ecommerceapi.model.dto.response;

import lombok.*;
import ra.ecommerceapi.model.entity.ImgProductDetail;
import ra.ecommerceapi.model.entity.ProductDetail;

import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class CartResponse {
    private Long id;
    private ProductDetail productDetail;
    private List<ImgProductDetail> images;
    private BigDecimal totalPrice;
    private Integer quantity;
}
