package ra.ecommerceapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ra.ecommerceapi.model.entity.OrderDetail;

public interface IOrderDetailRepo extends JpaRepository<OrderDetail,Long> {
}
