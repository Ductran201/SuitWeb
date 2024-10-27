package ra.ecommerceapi.model.entity;

import jakarta.persistence.Entity;
import lombok.*;
import ra.ecommerceapi.model.base.BaseObject;
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Color extends BaseObject {
    private String name;
}