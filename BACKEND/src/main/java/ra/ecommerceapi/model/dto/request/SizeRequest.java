package ra.ecommerceapi.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter@Setter
@Builder
public class SizeRequest {
    @NotBlank
    private String name;
}
