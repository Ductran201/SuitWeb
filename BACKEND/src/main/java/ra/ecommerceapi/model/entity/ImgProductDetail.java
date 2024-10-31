package ra.ecommerceapi.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import ra.ecommerceapi.model.base.BaseObject;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class ImgProductDetail extends BaseObject {
    private String image;
    @ManyToOne
    @JoinColumn(name = "productDetailId")
    private ProductDetail productDetail;

}
