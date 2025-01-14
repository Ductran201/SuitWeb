package ra.ecommerceapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ra.ecommerceapi.model.constant.OrderStatus;
import ra.ecommerceapi.model.entity.PurchaseOrder;
import ra.ecommerceapi.model.entity.User;

import java.util.Optional;
import java.util.UUID;

public interface IOrderRepo extends JpaRepository<PurchaseOrder, Long> {

    @Query(value = "SELECT * FROM PurchaseOrder WHERE BIN_TO_UUID(code) LIKE %:code%", nativeQuery = true)
    Page<PurchaseOrder> findAllByCodeLike(@Param("code") String code, Pageable pageable);

    @Query(value = "select  * from PurchaseOrder where userId = :userId and BIN_TO_UUID(code) LIKE %:code%", nativeQuery = true)
    Page<PurchaseOrder> findAllByUserAndCodeContains(@Param("userId") Long userId, @Param("code") String code, Pageable pageable);

    Page<PurchaseOrder> findAllByOrderStatus(OrderStatus orderStatus, Pageable pageable);

    Page<PurchaseOrder> findAllByUserAndOrderStatus(User user, OrderStatus orderStatus, Pageable pageable);

    Optional<PurchaseOrder> findByUserAndId(User user, Long id);

}
