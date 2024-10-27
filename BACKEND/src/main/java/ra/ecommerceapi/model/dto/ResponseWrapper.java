package ra.ecommerceapi.model.dto;

import lombok.*;
import ra.ecommerceapi.model.constant.EHttpStatus;

@NoArgsConstructor
@AllArgsConstructor
@Getter@Setter
@Builder
public class ResponseWrapper<T> {
    private T data;
    private EHttpStatus status;
    private Integer code;

}
