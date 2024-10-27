package ra.ecommerceapi.model.entity;

import jakarta.persistence.*;
import lombok.*;
import ra.ecommerceapi.model.base.BaseObject;

@AllArgsConstructor
@NoArgsConstructor
@Getter@Setter
@Builder
@Entity
public class Category extends BaseObject {
    @Column(unique = true)
    private String name;
    private String description;
    private String image;
}
