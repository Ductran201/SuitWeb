package ra.ecommerceapi.service.impl;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.constant.OrderStatus;
import ra.ecommerceapi.model.dto.response.OrderHistoryResponse;
import ra.ecommerceapi.model.dto.response.OrderResponse;
import ra.ecommerceapi.model.entity.PurchaseOrder;
import ra.ecommerceapi.model.entity.User;
import ra.ecommerceapi.repository.IOrderRepo;
import ra.ecommerceapi.service.IAuthService;
import ra.ecommerceapi.service.IOrderDetailService;
import ra.ecommerceapi.service.IOrderService;

import java.util.*;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements IOrderService {
    private final IOrderRepo orderRepo;
    private final IOrderDetailService orderDetailService;
    private final ModelMapper modelMapper;
    private final IAuthService authService;

    private void validateStatusTransition(OrderStatus currentStatus, OrderStatus newStatus) throws CustomException {
        // Define allowed transitions
        Map<OrderStatus, List<OrderStatus>> allowedTransitions = new HashMap<>();
        allowedTransitions.put(OrderStatus.WAITING, List.of(OrderStatus.CONFIRM));
        allowedTransitions.put(OrderStatus.CONFIRM, List.of(OrderStatus.DELIVERY));
        allowedTransitions.put(OrderStatus.DELIVERY, List.of(OrderStatus.SUCCESS, OrderStatus.CANCEL));
        allowedTransitions.put(OrderStatus.SUCCESS, List.of()); // No further transitions
        allowedTransitions.put(OrderStatus.CANCEL, List.of()); // No further transitions
        allowedTransitions.put(OrderStatus.DENIED, List.of()); // No further transitions

        // Check if the new status is valid for the current status
        if (!allowedTransitions.containsKey(currentStatus) ||
                !allowedTransitions.get(currentStatus).contains(newStatus)) {
            throw new CustomException("Cannot change status from " + currentStatus + " to " + newStatus,HttpStatus.BAD_REQUEST);
        }
    }


    @Override
    public Page<OrderHistoryResponse> findAllPaginationAdmin(String search, Pageable pageable) {
        return orderRepo.findAllByCodeLike(search, pageable).map((or) -> {

            return OrderHistoryResponse.builder()
                    .id(or.getId())
                    .code(or.getCode())
                    .totalPrice(or.getTotalPrice())
                    .note(or.getNote())
                    .receiveName(or.getReceiveName())
                    .receiveAddress(or.getReceiveAddress())
                    .receivePhone(or.getReceivePhone())
                    .orderStatus(or.getOrderStatus())
                    .createdDate(or.getCreatedDate())
                    .receivedDate(or.getReceivedDate())
                    .email(or.getUser().getEmail())
                    .orderDetailResponses(orderDetailService.findAllOrderDetail(or.getId()))
                    .build();
        });
    }

    @Override
    public Page<OrderHistoryResponse> findAllPaginationUser(String search, Pageable pageable) {
        User userCurrent = authService.getCurrentUser().getUser();

        return orderRepo.findAllByUserAndCodeContains(userCurrent.getId(), search, pageable).map((or) -> {
            return OrderHistoryResponse.builder()
                    .id(or.getId())
                    .code(or.getCode())
                    .totalPrice(or.getTotalPrice())
                    .note(or.getNote())
                    .receiveName(or.getReceiveName())
                    .receiveAddress(or.getReceiveAddress())
                    .receivePhone(or.getReceivePhone())
                    .orderStatus(or.getOrderStatus())
                    .createdDate(or.getCreatedDate())
                    .receivedDate(or.getReceivedDate())
                    .email(or.getUser().getEmail())
                    .orderDetailResponses(orderDetailService.findAllOrderDetail(or.getId()))
                    .build();
        });

    }

    @Override
    public Page<OrderResponse> filterByStatus(String orderStatus, Pageable pageable) throws CustomException {
//        return orderRepo.findAllByStatus(orderStatus,pageable).map(or->modelMapper.map(or, OrderResponse.class));
        OrderStatus s;
        try {
            s = OrderStatus.valueOf(orderStatus);
        } catch (Exception e) {
            throw new CustomException("Status Not Found", HttpStatus.NOT_FOUND);
        }
        return orderRepo.findAllByOrderStatus(s, pageable).map(o -> modelMapper.map(o, OrderResponse.class));

    }

    @Override
    public Page<OrderResponse> filterByStatusByUser(String orderStatus, Pageable pageable) throws CustomException {
        User userCurrent = authService.getCurrentUser().getUser();

        OrderStatus s;
        try {
            s = OrderStatus.valueOf(orderStatus);
        } catch (Exception e) {
            throw new CustomException("Status Not Found", HttpStatus.NOT_FOUND);
        }
        return orderRepo.findAllByUserAndOrderStatus(userCurrent, s, pageable).map(o -> modelMapper.map(o, OrderResponse.class));
    }

    @Override
    public OrderHistoryResponse findById(Long id) {
        PurchaseOrder order = orderRepo.findById(id).orElseThrow(() -> new NoSuchElementException("Not found this order"));
        return OrderHistoryResponse.builder()
                .id(order.getId())
                .code(order.getCode())
                .totalPrice(order.getTotalPrice())
                .note(order.getNote())
                .receiveName(order.getReceiveName())
                .receiveAddress(order.getReceiveAddress())
                .receivePhone(order.getReceivePhone())
                .orderStatus(order.getOrderStatus())
                .createdDate(order.getCreatedDate())
                .receivedDate(order.getReceivedDate())
                .email(order.getUser().getEmail())
                .orderDetailResponses(orderDetailService.findAllOrderDetail(order.getId()))
                .build();
    }

    @Override
    public OrderHistoryResponse findByIdAndUser(Long id) throws CustomException {

        User userCurrent = authService.getCurrentUser().getUser();
        PurchaseOrder oldOrder = orderRepo.findByUserAndId(userCurrent, id).orElseThrow(() -> new CustomException("Not found this order", HttpStatus.NOT_FOUND));

        return OrderHistoryResponse.builder()
                .id(oldOrder.getId())
                .code(oldOrder.getCode())
                .totalPrice(oldOrder.getTotalPrice())
                .note(oldOrder.getNote())
                .receiveName(oldOrder.getReceiveName())
                .receiveAddress(oldOrder.getReceiveAddress())
                .receivePhone(oldOrder.getReceivePhone())
                .orderStatus(oldOrder.getOrderStatus())
                .createdDate(oldOrder.getCreatedDate())
                .receivedDate(oldOrder.getReceivedDate())
                .email(oldOrder.getUser().getEmail())
                .orderDetailResponses(orderDetailService.findAllOrderDetail(oldOrder.getId()))
                .build();
    }


    @Override
    public OrderResponse changeStatus(Long id, OrderStatus newStatus) throws CustomException {
        PurchaseOrder oldOrder = orderRepo.findById(id).orElseThrow(() -> new NoSuchElementException("Not found this order"));

        OrderStatus currentStatus = oldOrder.getOrderStatus();

        // Validate status transition
        validateStatusTransition(currentStatus, newStatus);

        oldOrder.setOrderStatus(newStatus);
        orderRepo.save(oldOrder);

        return OrderResponse.builder()
                .id(oldOrder.getId())
                .code(oldOrder.getCode())
                .note(oldOrder.getNote())
                .receiveAddress(oldOrder.getReceiveAddress())
                .receivePhone(oldOrder.getReceivePhone())
                .receiveName(oldOrder.getReceiveName())
                .createdDate(oldOrder.getCreatedDate())
                .receivedDate(oldOrder.getReceivedDate())
                .orderStatus(oldOrder.getOrderStatus())
                .totalPrice(oldOrder.getTotalPrice())
                .build();
    }

    @Override
    public OrderResponse cancelOrderByUser(Long id) throws CustomException {
        User userCurrent = authService.getCurrentUser().getUser();
        PurchaseOrder oldOrder = orderRepo.findByUserAndId(userCurrent, id).orElseThrow(() -> new CustomException("Not found this order", HttpStatus.NOT_FOUND));

        if (oldOrder.getOrderStatus().equals(OrderStatus.WAITING)) {
            oldOrder.setOrderStatus(OrderStatus.CANCEL);
        } else {
            throw new CustomException("Can not cancel this order", HttpStatus.CONFLICT);
        }

        orderRepo.save(oldOrder);

        return OrderResponse.builder()
                .id(oldOrder.getId())
                .code(oldOrder.getCode())
                .note(oldOrder.getNote())
                .receiveAddress(oldOrder.getReceiveAddress())
                .receivePhone(oldOrder.getReceivePhone())
                .receiveName(oldOrder.getReceiveName())
                .createdDate(oldOrder.getCreatedDate())
                .receivedDate(oldOrder.getReceivedDate())
                .orderStatus(oldOrder.getOrderStatus())
                .totalPrice(oldOrder.getTotalPrice())
                .build();
    }
}
