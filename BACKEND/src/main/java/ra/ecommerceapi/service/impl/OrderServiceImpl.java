//package ra.ecommerceapi.service.impl;
//
//import lombok.RequiredArgsConstructor;
//import org.modelmapper.ModelMapper;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.http.HttpStatus;
//import org.springframework.stereotype.Service;
//import ra.ecommerceapi.exception.CustomException;
//import ra.ecommerceapi.model.constant.OrderStatus;
//import ra.ecommerceapi.model.dto.request.OrderRequestStatus;
//import ra.ecommerceapi.model.dto.response.OrderResponse;
//import ra.ecommerceapi.model.entity.Order;
//import ra.ecommerceapi.model.entity.User;
//import ra.ecommerceapi.repository.IOrderRepo;
//import ra.ecommerceapi.service.IAuthService;
//import ra.ecommerceapi.service.IOrderService;
//
//import java.util.NoSuchElementException;
//
//@Service
//@RequiredArgsConstructor
//public class OrderServiceImpl implements IOrderService {
//    private final IOrderRepo orderRepo;
//    private final ModelMapper modelMapper;
//    private final IAuthService authService;
//
//    @Override
//    public Page<OrderResponse> findAllPaginationAdmin(String search, Pageable pageable) {
//        return orderRepo.findAllByCodeContains(search, pageable).map(or -> modelMapper.map(or, OrderResponse.class));
////        return orderRepo.findAllByCode(search,pageable).map(o -> {
////            OrderResponse orderResponse = OrderResponse.builder()
////                    .id(o.getId())
////                    .email(o.getUser().getEmail())
////                    .code(o.getCode())
////                    .totalPrice(o.getTotalPrice())
////                    .note(o.getNote())
////                    .receivePhone(o.getReceivePhone())
////                    .receiveName(o.getReceiveName())
////                    .receiveAddress(o.getReceiveAddress())
////                    .createdDate(o.getCreatedDate())
////                    .receivedDate(o.getReceivedDate())
////                    .build();
////            return orderResponse;
////        });
//    }
//
//    @Override
//    public Page<OrderResponse> findAllPaginationUser(String search, Pageable pageable) {
//        User userCurrent = authService.getCurrentUser().getUser();
//        return orderRepo.findAllByUserAndCodeContains(userCurrent, search, pageable).map(or -> modelMapper.map(or, OrderResponse.class));
//    }
//
//    @Override
//    public Page<OrderResponse> filterByStatus(String orderStatus, Pageable pageable) throws CustomException {
////        return orderRepo.findAllByStatus(orderStatus,pageable).map(or->modelMapper.map(or, OrderResponse.class));
//        OrderStatus s;
//        try {
//            s = OrderStatus.valueOf(orderStatus);
//        } catch (Exception e) {
//            throw new CustomException("Status Not Found", HttpStatus.NOT_FOUND);
//        }
//        return orderRepo.findAllByStatus(s, pageable).map(o -> modelMapper.map(o, OrderResponse.class));
//
//    }
//
//    @Override
//    public Page<OrderResponse> filterByStatusByUser(String orderStatus, Pageable pageable) throws CustomException {
//        User userCurrent = authService.getCurrentUser().getUser();
//
//        OrderStatus s;
//        try {
//            s = OrderStatus.valueOf(orderStatus);
//        } catch (Exception e) {
//            throw new CustomException("Status Not Found", HttpStatus.NOT_FOUND);
//        }
//        return orderRepo.findAllByUserAndStatus(userCurrent, s, pageable).map(o -> modelMapper.map(o, OrderResponse.class));
//    }
//
//    @Override
//    public OrderResponse findById(Long id) {
//        Order order = orderRepo.findById(id).orElseThrow(() -> new NoSuchElementException("Not found this order"));
//        return OrderResponse.builder()
//                .id(order.getId())
//                .code(order.getCode())
//                .note(order.getNote())
//                .receiveAddress(order.getReceiveAddress())
//                .receivePhone(order.getReceivePhone())
//                .receiveName(order.getReceiveName())
//                .createdDate(order.getCreatedDate())
//                .receivedDate(order.getReceivedDate())
//                .orderStatus(order.getStatus())
//                .totalPrice(order.getTotalPrice())
//                .build();
//    }
//
//    @Override
//    public OrderResponse findByUSerAndCode(String code) throws CustomException {
//        User userCurrent = authService.getCurrentUser().getUser();
//        Order oldOrder = orderRepo.findByUserAndCode(userCurrent, code).orElseThrow(() -> new CustomException("Not found this order", HttpStatus.NOT_FOUND));
//        return OrderResponse.builder()
//                .id(oldOrder.getId())
//                .code(oldOrder.getCode())
//                .note(oldOrder.getNote())
//                .receiveAddress(oldOrder.getReceiveAddress())
//                .receivePhone(oldOrder.getReceivePhone())
//                .receiveName(oldOrder.getReceiveName())
//                .createdDate(oldOrder.getCreatedDate())
//                .receivedDate(oldOrder.getReceivedDate())
//                .orderStatus(oldOrder.getStatus())
//                .totalPrice(oldOrder.getTotalPrice())
//                .build();
//    }
//
//    @Override
//    public OrderResponse changeStatus(Long id, OrderRequestStatus orderRequestStatus) {
//        Order oldOrder = orderRepo.findById(id).orElseThrow(() -> new NoSuchElementException("Not found this order"));
//
//        oldOrder.setStatus(orderRequestStatus.getStatus());
//
//        orderRepo.save(oldOrder);
//
//        return OrderResponse.builder()
//                .id(oldOrder.getId())
//                .code(oldOrder.getCode())
//                .note(oldOrder.getNote())
//                .receiveAddress(oldOrder.getReceiveAddress())
//                .receivePhone(oldOrder.getReceivePhone())
//                .receiveName(oldOrder.getReceiveName())
//                .createdDate(oldOrder.getCreatedDate())
//                .receivedDate(oldOrder.getReceivedDate())
//                .orderStatus(oldOrder.getStatus())
//                .totalPrice(oldOrder.getTotalPrice())
//                .build();
//    }
//
//    @Override
//    public OrderResponse cancelOrderByUser(Long id) throws CustomException {
//        User userCurrent = authService.getCurrentUser().getUser();
//        Order oldOrder = orderRepo.findByUserAndId(userCurrent, id).orElseThrow(() -> new CustomException("Not found this order", HttpStatus.NOT_FOUND));
//
//        if (oldOrder.getStatus().equals(OrderStatus.WAITING)) {
//            oldOrder.setStatus(OrderStatus.CANCEL);
//        }else {
//            throw new CustomException("Can not cancel this order",HttpStatus.CONFLICT);
//        }
//
//        orderRepo.save(oldOrder);
//
//        return OrderResponse.builder()
//                .id(oldOrder.getId())
//                .code(oldOrder.getCode())
//                .note(oldOrder.getNote())
//                .receiveAddress(oldOrder.getReceiveAddress())
//                .receivePhone(oldOrder.getReceivePhone())
//                .receiveName(oldOrder.getReceiveName())
//                .createdDate(oldOrder.getCreatedDate())
//                .receivedDate(oldOrder.getReceivedDate())
//                .orderStatus(oldOrder.getStatus())
//                .totalPrice(oldOrder.getTotalPrice())
//                .build();
//    }
//
//
//}
