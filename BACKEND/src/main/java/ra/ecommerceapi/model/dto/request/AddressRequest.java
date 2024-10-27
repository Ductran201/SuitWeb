package ra.ecommerceapi.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class AddressRequest {
    @NotBlank
    private String fullAddress;
    @NotBlank
    private String nameReceiver;
    @NotBlank
    private String phoneReceiver;
}
