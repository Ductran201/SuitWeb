package ra.ecommerceapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ra.ecommerceapi.model.entity.History;
import ra.ecommerceapi.model.entity.User;


public interface IHistoryRepo extends JpaRepository<History,Long> {
    Page<History> findAllByUserOrderByViewTimeDesc(User user, Pageable pageable);

    History findByUserAndProductId(User user, Long productId);

    Boolean existsByUserAndProductId(User user, Long productId);
}
