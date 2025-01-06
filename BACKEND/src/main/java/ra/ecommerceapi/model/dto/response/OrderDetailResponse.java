package ra.ecommerceapi.model.dto.response;

import lombok.*;
import ra.ecommerceapi.model.entity.ImgProductDetail;
import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter@Getter
@Builder
public class OrderDetailResponse {
    private String name;
    private BigDecimal unitPrice;
    private Integer orderQuantity;
    private List<ImgProductDetail> listImgProductDetail;
}
