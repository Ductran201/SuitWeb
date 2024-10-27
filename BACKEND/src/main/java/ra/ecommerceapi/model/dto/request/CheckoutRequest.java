package ra.ecommerceapi.model.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class CheckoutRequest {
    private String note;
    @NotNull
    private Long addressId;
}
