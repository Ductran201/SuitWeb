package ra.ecommerceapi.model.dto.response;

import lombok.*;
import ra.ecommerceapi.model.constant.OrderStatus;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class OrderResponse {
    private Long id;
    private String code;
    private Double totalPrice;
    private String note;
    private String receiveName;
    private String receiveAddress;
    private String receivePhone;
    private OrderStatus orderStatus;
    private Date createdDate;
    private Date receivedDate;
    private String email;
}
