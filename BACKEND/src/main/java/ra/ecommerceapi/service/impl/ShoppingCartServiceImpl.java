package ra.ecommerceapi.service.impl;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.constant.OrderStatus;
import ra.ecommerceapi.model.dto.request.CartRequest;
import ra.ecommerceapi.model.dto.request.CheckoutRequest;
import ra.ecommerceapi.model.dto.response.CartResponse;
import ra.ecommerceapi.model.dto.response.OrderResponse;
import ra.ecommerceapi.model.entity.*;
import ra.ecommerceapi.repository.IAddressRepo;
import ra.ecommerceapi.repository.IOrderDetailRepo;
import ra.ecommerceapi.repository.IOrderRepo;
import ra.ecommerceapi.repository.IShoppingCartRepo;
import ra.ecommerceapi.service.IAuthService;
import ra.ecommerceapi.service.IImgProductDetailService;
import ra.ecommerceapi.service.IProductDetailService;
import ra.ecommerceapi.service.IShoppingCartService;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ShoppingCartServiceImpl implements IShoppingCartService {
    private final IShoppingCartRepo shoppingCartRepo;
    private final IOrderRepo orderRepo;
    private final IOrderDetailRepo orderDetailRepo;
    private final IAddressRepo addressRepo;
    private final IAuthService authService;
    private final IProductDetailService productDetailService;
    private final IImgProductDetailService imgProductDetailService;
    private final ModelMapper modelMapper;


    @Override
    public List<CartResponse> findAll() {
        User userCurrent = authService.getCurrentUser().getUser();

        return shoppingCartRepo.findAllByUser(userCurrent).stream().map(shoppingCart -> {
             return CartResponse.builder()
                    .id(shoppingCart.getId())
                    .productDetail(shoppingCart.getProductDetail())
                    .images(imgProductDetailService.findAllImagesByProductDetailId(shoppingCart.getProductDetail().getId()))
                    .totalPrice(shoppingCart.getProductDetail().getPrice())
                    .quantity(shoppingCart.getOrderQuantity())
                    .build();
        }).toList();
    }

    // Check cart by userCurrent
    @Override
    public ShoppingCart findByUserAndId(Long id) {

        User userCurrent = authService.getCurrentUser().getUser();

        return shoppingCartRepo.findByUserAndId(userCurrent, id).orElseThrow(() -> new NoSuchElementException("Not found this cart"));
    }

    @Override
    public CartResponse save(CartRequest cartRequest) throws CustomException {

        User userCurrent = authService.getCurrentUser().getUser();

        ProductDetail productDetail = productDetailService.findById(cartRequest.getProductDetailId());

//        Case 1: if the productDetail exists in cart ==> plus the new quantity
        if (shoppingCartRepo.existsByUserAndProductDetail(userCurrent, productDetail)) {
            ShoppingCart oldCartItem = shoppingCartRepo.findByUserAndProductDetail(userCurrent, productDetail);
            int newQuantity =oldCartItem.getOrderQuantity() + cartRequest.getQuantity();

            if (newQuantity > productDetail.getStockQuantity()) {
                throw new CustomException("Quantity exceeds available stock",HttpStatus.BAD_REQUEST);
            }

            oldCartItem.setOrderQuantity(newQuantity);

            shoppingCartRepo.save(oldCartItem);
            return CartResponse.builder()
                    .totalPrice(oldCartItem.getProductDetail().getPrice())
                    .quantity(oldCartItem.getOrderQuantity())
                    .productDetail(productDetail)
                    .build();
        }
//        Case 2: if the productDetail does not exist in cart ==> add new

        if (cartRequest.getQuantity() > productDetail.getStockQuantity()) {
            throw new CustomException("Quantity exceeds available stock",HttpStatus.BAD_REQUEST);
        }

        ShoppingCart newCart = ShoppingCart.builder()
                .orderQuantity(cartRequest.getQuantity())
                .productDetail(productDetail)
                .user(userCurrent)
                .build();
        newCart.setStatus(true);
        newCart.setCreatedDate(new Date());
        newCart.setUpdatedDate(new Date());

        shoppingCartRepo.save(newCart);

        return CartResponse.builder()
                .productDetail(productDetail)
                .totalPrice(newCart.getProductDetail().getPrice())
                .quantity(newCart.getOrderQuantity())
                .build();

    }

    @Override
    public CartResponse changeQuantityCart( Long cartId,Integer newQuantity) throws CustomException {
        // find cart by user and id cart
        ShoppingCart oldCart = findByUserAndId(cartId);

        if(newQuantity > oldCart.getProductDetail().getStockQuantity()){
            throw new CustomException("Quantity exceeds available stock",HttpStatus.BAD_REQUEST);
        }
        // change quantity
        oldCart.setOrderQuantity(newQuantity);
        oldCart.setUpdatedDate(new Date());

        ShoppingCart editCart = shoppingCartRepo.save(oldCart);

        return CartResponse.builder()
                .productDetail(editCart.getProductDetail())
                .quantity(editCart.getOrderQuantity())
                .totalPrice(editCart.getProductDetail().getPrice())
                .build();
    }

    @Override
    public void delete(Long id) {
        findByUserAndId(id);
        shoppingCartRepo.deleteById(id);
    }

    @Override
    public void clear() {
        User userCurrent = authService.getCurrentUser().getUser();
        shoppingCartRepo.deleteAllByUser(userCurrent);
    }

    @Override
    public OrderResponse checkout(CheckoutRequest checkoutRequest) throws CustomException {
        User userCurrent = authService.getCurrentUser().getUser();

        // Retrieve the shopping cart items for the user
        List<ShoppingCart> cartItems = shoppingCartRepo.findAllByUser(userCurrent);

        if (cartItems.isEmpty()) {
            throw new CustomException("Cart is empty", HttpStatus.NOT_FOUND);
        }

        Address address = addressRepo.findByUserAndId(userCurrent, checkoutRequest.getAddressId()).orElseThrow(() -> new NoSuchElementException("Not found this address"));

        // Calculate total price

        BigDecimal totalPrice = BigDecimal.ZERO;
        for (ShoppingCart cart : cartItems) {
            BigDecimal itemTotal = cart.getProductDetail().getPrice().multiply(BigDecimal.valueOf(cart.getOrderQuantity()));
            totalPrice = totalPrice.add(itemTotal);
        }

        // Create and save the order
        PurchaseOrder newOrder = PurchaseOrder.builder()
                .orderStatus(OrderStatus.WAITING)
                .totalPrice(totalPrice)
                .code(UUID.fromString(UUID.randomUUID().toString()))
                .note(checkoutRequest.getNote())
                .receiveName(address.getNameReceiver())
                .receiveAddress(address.getFullAddress())
                .receivePhone(address.getPhoneReceiver())
                .createdDate(new Date())
                .updatedDate(new Date())
                .user(userCurrent)
                .build();

        PurchaseOrder savedOrder = orderRepo.save(newOrder);

        // Create order details
//        Why need this?????
        List<OrderDetail> orderDetails = cartItems.stream().map(cartItem -> {
            OrderDetail orderDetail = OrderDetail.builder()
                    .unitPrice(cartItem.getProductDetail().getPrice())
                    .orderQuantity(cartItem.getOrderQuantity())
                    .name(cartItem.getProductDetail().getName())
                    .productDetail(cartItem.getProductDetail())
                    .purchaseOrder(savedOrder)
                    .build();
            orderDetail.setCreatedDate(new Date());
            orderDetail.setStatus(true);

            return orderDetailRepo.save(orderDetail);
        }).toList();

        // Clear the shopping cart by set status false
//        cartItems.forEach(cartItem -> {
//            cartItem.setStatus(false);  // Mark cart item as processed
//            shoppingCartRepo.save(cartItem);
//        });

        // Clear cart
        clear();

        return OrderResponse.builder()
                .id(savedOrder.getId())
                .email(savedOrder.getUser().getEmail())
                .code(savedOrder.getCode())
                .totalPrice(savedOrder.getTotalPrice())
                .note(savedOrder.getNote())
                .receiveAddress(savedOrder.getReceiveAddress())
                .receiveName(savedOrder.getReceiveName())
                .receivePhone(savedOrder.getReceivePhone())
                .createdDate(savedOrder.getCreatedDate())
                .build();
    }


}
