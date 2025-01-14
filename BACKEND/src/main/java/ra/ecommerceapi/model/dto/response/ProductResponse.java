package ra.ecommerceapi.model.dto.response;

import lombok.*;
import ra.ecommerceapi.model.entity.Color;
import ra.ecommerceapi.model.entity.Size;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ProductResponse {
    private Long productId;
    private Long categoryId;
    private String productName;
    private Set<Color> colorSet;
    private Set<Size> sizeSet;
    private List<ProductDetailAllResponse> productDetailAllResponse;
    private LocalDateTime viewTime;
}

