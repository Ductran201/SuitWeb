package ra.ecommerceapi.model.dto.response;

import ra.ecommerceapi.model.constant.OrderStatus;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class OrderAllResponse {
    private Long id;
    private UUID code;
    private BigDecimal totalPrice;
    private String note;
    private String receiveName;
    private String receiveAddress;
    private String receivePhone;
    private OrderStatus orderStatus;
    private Date createdDate;
    private Date receivedDate;
    private String email;
    private List<OrderDetailResponse> orderDetailResponses;
}
