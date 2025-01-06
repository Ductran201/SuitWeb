package ra.ecommerceapi.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.constant.OrderStatus;
import ra.ecommerceapi.model.dto.response.OrderHistoryResponse;
import ra.ecommerceapi.model.dto.response.OrderResponse;

import java.util.UUID;


public interface IOrderService {
    Page<OrderHistoryResponse> findAllPaginationAdminTest(String search, Pageable pageable);

    Page<OrderResponse> findAllPaginationUser(String search, Pageable pageable);

    Page<OrderResponse> filterByStatus(String orderStatus, Pageable pageable) throws CustomException;

    Page<OrderResponse> filterByStatusByUser(String orderStatus, Pageable pageable) throws CustomException;

    OrderHistoryResponse findById(Long id);

    OrderResponse findByUserAndCode(UUID code) throws CustomException;

    OrderResponse changeStatus(Long id, OrderStatus orderStatus) throws CustomException;

    OrderResponse cancelOrderByUser(Long id) throws CustomException;


}
