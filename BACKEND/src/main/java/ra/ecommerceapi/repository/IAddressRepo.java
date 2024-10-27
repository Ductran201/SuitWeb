package ra.ecommerceapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ra.ecommerceapi.model.entity.Address;
import ra.ecommerceapi.model.entity.User;

import java.util.List;
import java.util.Optional;

public interface IAddressRepo extends JpaRepository<Address,Long> {
    List<Address> findAllByUser(User user);

    Optional<Address> findByUserAndId(User user, Long id);
}
