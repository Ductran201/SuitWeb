package ra.ecommerceapi.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class MessageRequest {
    @NotBlank
    private String message;
}
