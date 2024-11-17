package ra.ecommerceapi.model.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;
import ra.ecommerceapi.model.entity.Category;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ProductRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String description;
    private MultipartFile file;
    private Boolean status;
    private Date createdDate;
    private Date updatedDate;
    @NotNull
    private Long categoryId;
}
//    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "dd/MM/yyyy")
