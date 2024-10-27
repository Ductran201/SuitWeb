package ra.ecommerceapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ra.ecommerceapi.model.constant.RoleName;
import ra.ecommerceapi.model.entity.Role;

import java.util.Optional;

public interface IRoleRepo extends JpaRepository<Role,Long> {
    Optional<Role> findByRoleName(RoleName roleName);

}
