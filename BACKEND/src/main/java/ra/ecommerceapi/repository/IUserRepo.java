package ra.ecommerceapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import ra.ecommerceapi.model.entity.User;

import java.util.Optional;

@Transactional
public interface IUserRepo extends JpaRepository<User, Long> {
    //FOR ADMIN
    @Query("SELECT u FROM User u " +
            "WHERE 'ROLE_ADMIN' NOT IN (SELECT r.roleName FROM u.roleSet r) " +
            "AND u.fullName LIKE CONCAT('%', :fullName, '%')")
    Page<User> findAllByFullNameContainingExceptAdmin(String fullName, Pageable pageable);

    @Query("update User u set u.status = (not u.status) where u.id = :id")
    @Modifying
    void toggleStatus(@Param("id") Long id);

    Optional<User> findByEmail(String email);

    //FOR USER

    // COMMON
    @Query(value = "SELECT u.* " +
            "FROM user u " +
            "WHERE u.id = :id " +
            "AND u.id NOT IN ( " +
            "    SELECT ur.user_id " +
            "    FROM user_role ur " +
            "             JOIN role r ON ur.role_id = r.id " +
            "    WHERE r.roleName = 'ROLE_ADMIN' " +
            ");", nativeQuery = true)
    Optional<User> findUserExceptAdminById(Long id);

    @Query("select u.avatar from User u where u.id= :id")
    String getAvatarById(Long id);

    Boolean existsByEmail(String email);

}
