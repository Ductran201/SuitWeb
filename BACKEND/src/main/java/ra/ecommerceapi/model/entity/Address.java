package ra.ecommerceapi.model.entity;

import jakarta.persistence.*;
import lombok.*;
import ra.ecommerceapi.model.base.BaseObject;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Address extends BaseObject {
    private String fullAddress;
    private String nameReceiver;
    private String phoneReceiver;
    @Temporal(TemporalType.DATE)
    private Date updatedDate;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
}
