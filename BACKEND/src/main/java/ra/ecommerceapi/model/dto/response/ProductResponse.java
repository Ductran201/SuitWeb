package ra.ecommerceapi.model.dto.response;

import jakarta.persistence.*;
import lombok.*;
import ra.ecommerceapi.model.entity.Category;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ProductResponse {

    private String name;
    private String description;
    private String image;
    private String categoryName;

}
