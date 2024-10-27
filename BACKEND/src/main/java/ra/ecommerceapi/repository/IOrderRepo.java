//package ra.ecommerceapi.repository;
//
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.repository.JpaRepository;
//import ra.ecommerceapi.model.constant.OrderStatus;
//import ra.ecommerceapi.model.entity.Order;
//import ra.ecommerceapi.model.entity.User;
//
//import java.util.Optional;
//
//public interface IOrderRepo extends JpaRepository<Order, Long> {
//    Page<Order> findAllByCodeContains(String code, Pageable pageable);
//
//    Page<Order> findAllByUserAndCodeContains(User user, String code, Pageable pageable);
//
//    Page<Order> findAllByStatus(OrderStatus orderStatus, Pageable pageable);
//
//    Page<Order> findAllByUserAndStatus(User user, OrderStatus orderStatus, Pageable pageable);
//
//    Optional<Order> findByUserAndCode(User user, String code);
//
//    Optional<Order> findByUserAndId(User user, Long id);
//
//
//
//}
