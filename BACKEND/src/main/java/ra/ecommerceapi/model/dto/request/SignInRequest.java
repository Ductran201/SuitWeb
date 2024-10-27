package ra.ecommerceapi.model.dto.request;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class SignInRequest {
    @NotBlank
    private String email;
    @NotBlank
    private String password;
}
