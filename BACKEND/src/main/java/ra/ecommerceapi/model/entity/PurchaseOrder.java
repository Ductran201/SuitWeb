package ra.ecommerceapi.model.entity;

import jakarta.persistence.*;
import lombok.*;
import ra.ecommerceapi.model.base.BaseObject;
import ra.ecommerceapi.model.constant.OrderStatus;

import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PurchaseOrder extends BaseObject {
    //    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;
    private UUID code;
    private BigDecimal totalPrice;
    private String note;
    private String receiveName;
    private String receiveAddress;
    private String receivePhone;
    //    @Temporal(TemporalType.DATE)
//    private Date createdDate;
    @Temporal(TemporalType.DATE)
    private Date updatedDate;
    @Temporal(TemporalType.DATE)
    private Date receivedDate;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

}
