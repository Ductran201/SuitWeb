package ra.ecommerceapi.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import ra.ecommerceapi.model.base.BaseObject;
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ShoppingCart extends BaseObject {
    @NotNull
    private Integer orderQuantity;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
    @ManyToOne
    @JoinColumn(name = "productDetailId")
    private ProductDetail productDetail;

}
