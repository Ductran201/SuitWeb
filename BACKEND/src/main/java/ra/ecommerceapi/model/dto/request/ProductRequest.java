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
//    @NotNull
//    @Min(0)
//    private Double price;
//    @NotNull
//    @Min(1)
//    private Integer stock;
//    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "dd/MM/yyyy")
    private Date createdDate;
//    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "dd/MM/yyyy")
    private Date updatedDate;
    @NotNull
    private Long categoryId;
}
