package ra.ecommerceapi.model.entity;

import jakarta.persistence.*;
import lombok.*;
import ra.ecommerceapi.model.base.BaseObject;
import ra.ecommerceapi.model.constant.RoleName;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class Role extends BaseObject {
    @Enumerated(value = EnumType.STRING)
    private RoleName roleName;
}
