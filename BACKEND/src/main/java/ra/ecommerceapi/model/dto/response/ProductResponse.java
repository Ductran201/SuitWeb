package ra.ecommerceapi.model.dto.response;

import lombok.*;
import ra.ecommerceapi.model.entity.Color;
import ra.ecommerceapi.model.entity.Product;
import ra.ecommerceapi.model.entity.Size;

import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ProductResponse {

    private String productName;
    private Set<Color> colorSet;
    private Set<Size> sizeSet;
    private List<ProductDetailAllResponse> productDetailAllResponse;


}

//public class ProductResponseDTO {
//    private String name;
//    private String description;
//    private String image;
//    private List<ProductDetailDTO> productDetails;
//
//    // Getters và Setters
//}
