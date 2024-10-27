package ra.ecommerceapi.service;

import org.hibernate.query.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.dto.request.OrderRequestStatus;
import ra.ecommerceapi.model.dto.response.OrderResponse;


public interface IOrderService {
    Page<OrderResponse> findAllPaginationAdmin(String search, Pageable pageable);

    Page<OrderResponse> findAllPaginationUser(String search, Pageable pageable);

    Page<OrderResponse> filterByStatus(String orderStatus, Pageable pageable) throws CustomException;

    Page<OrderResponse> filterByStatusByUser(String orderStatus, Pageable pageable) throws CustomException;

    OrderResponse findById(Long id);

    OrderResponse findByUSerAndCode(String code) throws CustomException;

    OrderResponse changeStatus(Long id, OrderRequestStatus orderRequestStatus);

    OrderResponse cancelOrderByUser(Long id) throws CustomException;


}
