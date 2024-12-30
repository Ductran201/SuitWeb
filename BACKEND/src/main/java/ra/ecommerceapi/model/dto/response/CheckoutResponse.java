package ra.ecommerceapi.model.dto.response;

import lombok.*;
import ra.ecommerceapi.model.constant.OrderStatus;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class CheckoutResponse {
    private Long id;
    private String code;
    private OrderStatus status;
    private Double totalPrice;
    private String note;
    private String receiveName;
    private String receiveAddress;
    private String receivePhone;
    private Date createdDate;
    private Date receivedDate;

}
