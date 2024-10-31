package ra.ecommerceapi.model.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ProductOverviewResponse {
    private String name;
    private String image;
    private Date createdDate;
    private BigDecimal price;
}

