package ra.ecommerceapi.model.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UserRequest {
    private String password;
    private String fullName;
    private MultipartFile file;
    private String phone;
    private Boolean gender;
    private Date dob;
}
