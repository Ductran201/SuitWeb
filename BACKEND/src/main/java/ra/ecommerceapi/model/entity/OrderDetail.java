package ra.ecommerceapi.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import ra.ecommerceapi.model.base.BaseObject;

import java.math.BigDecimal;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class OrderDetail extends BaseObject {
    private String name;
    private BigDecimal unitPrice;
    private Integer orderQuantity;
    @ManyToOne
    @JoinColumn(name = "productDetailId")
    private ProductDetail productDetail;
    @ManyToOne
    @JoinColumn(name = "orderId")
    private PurchaseOrder purchaseOrder;
}
