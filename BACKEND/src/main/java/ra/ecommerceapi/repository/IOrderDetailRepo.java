package ra.ecommerceapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ra.ecommerceapi.model.entity.OrderDetail;

import java.util.List;

public interface IOrderDetailRepo extends JpaRepository<OrderDetail,Long> {
    List<OrderDetail> findAllByPurchaseOrderId(Long id);
}
