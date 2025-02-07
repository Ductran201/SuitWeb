package ra.ecommerceapi.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.*;
import ra.ecommerceapi.model.base.BaseObject;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Message extends BaseObject {
    private String message;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

}
