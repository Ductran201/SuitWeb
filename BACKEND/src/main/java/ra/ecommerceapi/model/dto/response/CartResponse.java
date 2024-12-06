package ra.ecommerceapi.model.dto.response;

import lombok.*;
import ra.ecommerceapi.model.entity.ProductDetail;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class CartResponse {
    private Long id;
    private ProductDetail productDetail;
    private BigDecimal totalPrice;
    private Integer quantity;
}
