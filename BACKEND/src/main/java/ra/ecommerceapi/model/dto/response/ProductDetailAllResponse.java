package ra.ecommerceapi.model.dto.response;

import lombok.*;
import ra.ecommerceapi.model.entity.ImgProductDetail;
import ra.ecommerceapi.model.entity.ProductDetail;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ProductDetailAllResponse {
    private ProductDetail productDetail;
    private List<ImgProductDetail> images;
}


//public class ProductDetailDTO {
//    private String name;
//    private BigDecimal price;
//    private Integer stockQuantity;
//    private Date updatedDate;
//    private String color;
//    private String size;
//    private List<String> images;
//
//    // Getters và Setters
//}