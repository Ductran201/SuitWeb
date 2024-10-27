package ra.ecommerceapi.model.dto.response;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class CartResponse {
    private Long productId;
    private String productName;
    private Integer quantity;
    private Double price;
}
