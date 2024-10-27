package ra.ecommerceapi.model.dto.request;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import ra.ecommerceapi.model.constant.OrderStatus;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class OrderRequestStatus {
    @NotNull
    private OrderStatus status;
}
