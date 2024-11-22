package ra.ecommerceapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ra.ecommerceapi.model.constant.OrderStatus;
import ra.ecommerceapi.model.entity.PurchaseOrder;
import ra.ecommerceapi.model.entity.User;

import java.util.Optional;
import java.util.UUID;

public interface IOrderRepo extends JpaRepository<PurchaseOrder, Long> {
    Page<PurchaseOrder> findAllByCodeContains(String code, Pageable pageable);

    Page<PurchaseOrder> findAllByUserAndCodeContains(User user, String code, Pageable pageable);

    Page<PurchaseOrder> findAllByOrderStatus(OrderStatus orderStatus, Pageable pageable);

    Page<PurchaseOrder> findAllByUserAndOrderStatus(User user, OrderStatus orderStatus, Pageable pageable);

    Optional<PurchaseOrder> findByUserAndCode(User user, UUID code);

    Optional<PurchaseOrder> findByUserAndId(User user, Long id);



}
