package ra.ecommerceapi.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ra.ecommerceapi.model.dto.response.CartResponse;
import ra.ecommerceapi.model.dto.response.OrderDetailResponse;
import ra.ecommerceapi.model.entity.OrderDetail;
import ra.ecommerceapi.model.entity.User;
import ra.ecommerceapi.repository.IOrderDetailRepo;
import ra.ecommerceapi.service.IImgProductDetailService;
import ra.ecommerceapi.service.IOrderDetailService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderDetailServiceImpl implements IOrderDetailService {
    private final IOrderDetailRepo orderDetailRepo;
    private final IImgProductDetailService imgProductDetailService;

    @Override
    public List<OrderDetailResponse> findAllOrderDetail(Long orderId) {
        List<OrderDetail> orderDetailList = orderDetailRepo.findAllByPurchaseOrderId(orderId);

        return orderDetailList.stream().map((orderDetail) -> {
            return OrderDetailResponse.builder()
                    .name(orderDetail.getName())
                    .unitPrice(orderDetail.getUnitPrice())
                    .orderQuantity(orderDetail.getOrderQuantity())
                    .listImgProductDetail(imgProductDetailService.findAllImagesByProductDetailId(orderDetail.getProductDetail().getId()))
                    .build();
        }).toList();


    }
}
