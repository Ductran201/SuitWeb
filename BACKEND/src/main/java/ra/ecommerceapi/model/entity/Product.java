package ra.ecommerceapi.model.entity;

import jakarta.persistence.*;
import lombok.*;
import ra.ecommerceapi.model.base.BaseObject;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class Product extends BaseObject {
    @Column(unique = true)
    private String name;
    private String description;
    private String image; // maybe have many image because product just diff in size
    @Temporal(TemporalType.DATE)
    private Date updatedDate;
    @ManyToOne
    @JoinColumn(name = "categoryId")
    private Category category;

}
