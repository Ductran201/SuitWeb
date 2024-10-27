package ra.ecommerceapi.model.dto.response;

import lombok.*;

import java.util.Date;
import java.util.Set;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class JWTResponse {
    private String accessToken;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private Date dob;
    private String avatar;
    private Boolean status;
    private Set<String> roles;
}
