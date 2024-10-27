package ra.ecommerceapi.model.base;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter@Setter
@MappedSuperclass
public class BaseObject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Boolean status;
    @Temporal(TemporalType.DATE)
    private Date createdDate;
}
