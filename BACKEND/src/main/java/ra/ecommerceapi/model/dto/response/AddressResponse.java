package ra.ecommerceapi.model.dto.response;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class AddressResponse {
    private Long id;
    private String fullAddress;
    private String nameReceiver;
    private String phoneReceiver;
    private Long userId;
}
