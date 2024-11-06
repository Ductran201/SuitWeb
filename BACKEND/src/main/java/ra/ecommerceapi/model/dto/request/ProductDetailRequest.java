package ra.ecommerceapi.model.dto.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;


import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ProductDetailRequest {
    @NotBlank
    private String name;
    @NotNull
    private BigDecimal price;
    @NotNull
    private Integer stockQuantity;
    @NotNull
    private Long colorId;
    @NotNull
    private Long sizeId;
    private Long productId;
    private List<MultipartFile> images;
}
