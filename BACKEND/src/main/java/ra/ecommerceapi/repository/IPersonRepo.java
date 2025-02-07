package ra.ecommerceapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ra.ecommerceapi.model.entity.Person;

public interface IPersonRepo extends JpaRepository<Person, Integer> {

}
