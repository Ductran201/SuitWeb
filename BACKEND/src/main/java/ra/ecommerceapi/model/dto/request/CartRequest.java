package ra.ecommerceapi.model.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class CartRequest {
    @NotNull
    private Long productDetailId;
    @NotNull
    @Min(1)
    private Integer quantity;
}
