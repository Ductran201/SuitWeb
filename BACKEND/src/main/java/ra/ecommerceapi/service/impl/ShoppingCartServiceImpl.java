//package ra.ecommerceapi.service.impl;
//
//import lombok.RequiredArgsConstructor;
//import org.modelmapper.ModelMapper;
//import org.springframework.http.HttpStatus;
//import org.springframework.stereotype.Service;
//import ra.ecommerceapi.exception.CustomException;
//import ra.ecommerceapi.model.constant.OrderStatus;
//import ra.ecommerceapi.model.dto.request.CartRequest;
//import ra.ecommerceapi.model.dto.request.CheckoutRequest;
//import ra.ecommerceapi.model.dto.response.CartResponse;
//import ra.ecommerceapi.model.dto.response.OrderResponse;
//import ra.ecommerceapi.model.entity.*;
//import ra.ecommerceapi.repository.IAddressRepo;
//import ra.ecommerceapi.repository.IOrderDetailRepo;
//import ra.ecommerceapi.repository.IOrderRepo;
//import ra.ecommerceapi.repository.IShoppingCartRepo;
//import ra.ecommerceapi.service.IAuthService;
//import ra.ecommerceapi.service.IProductService;
//import ra.ecommerceapi.service.IShoppingCartService;
//
//import java.util.Date;
//import java.util.List;
//import java.util.NoSuchElementException;
//import java.util.UUID;
//
//@Service
//@RequiredArgsConstructor
//public class ShoppingCartServiceImpl implements IShoppingCartService {
//    private final IShoppingCartRepo shoppingCartRepo;
//    private final IProductService productService;
//    private final IOrderRepo orderRepo;
//    private final IOrderDetailRepo orderDetailRepo;
//    private final IAddressRepo addressRepo;
//    private final IAuthService authService;
//    private final ModelMapper modelMapper;
//
//
//    @Override
//    public List<CartResponse> findAll() {
//        User userCurrent = authService.getCurrentUser().getUser();
////        return shoppingCartRepo.findAllByUser(userCurrent).stream().map(c -> modelMapper.map(c, CartResponse.class)).toList();
////        return shoppingCartRepo.findAllByUser(userCurrent).stream().map(cart -> {
////            CartResponse cartResponse = CartResponse.builder()
////                    .productId(cart.getProduct().getId())
////                    .productName(cart.getProduct().getName())
////                    .quantity(cart.getOrderQuantity())
////                    .price(cart.getProduct().getPrice())  // Manually set the price
////                    .build();
////            return cartResponse;
////        }).toList();
//        return shoppingCartRepo.findAllByUser(userCurrent).stream().map(c->{
//            CartResponse cartResponse=CartResponse.builder()
//                    .productId(c.getProduct().getId())
//                    .productName(c.getProduct().getName())
//                    .price(c.getProduct().getPrice())
//                    .quantity(c.getOrderQuantity())
//                    .build();
//            return cartResponse;
//        }).toList();
//    }
//
//    // Check cart by userCurrent
//    @Override
//    public ShoppingCart findByUserAndId(Long id) {
//
//        User userCurrent = authService.getCurrentUser().getUser();
//
//        return shoppingCartRepo.findByUserAndId(userCurrent, id).orElseThrow(() -> new NoSuchElementException("Not found this cart"));
//    }
//
//    @Override
//    public CartResponse save(CartRequest cartRequest) throws CustomException {
//        User userCurrent = authService.getCurrentUser().getUser();
//
//        Product product = productService.findById(cartRequest.getProductId());
//        //check exist product in cart
//        if (shoppingCartRepo.existsByUserAndProduct(userCurrent, product)) {
//            throw new CustomException("This product already in cart", HttpStatus.BAD_REQUEST);
//        }
//
//        ShoppingCart newCart = ShoppingCart.builder()
//                .orderQuantity(cartRequest.getQuantity())
//                .product(product)
//                .user(userCurrent)
//                .build();
//        newCart.setStatus(true);
//        shoppingCartRepo.save(newCart);
//
//        return CartResponse.builder()
//                .productId(newCart.getProduct().getId())
//                .price(newCart.getProduct().getPrice())
//                .productName(newCart.getProduct().getName())
//                .quantity(newCart.getOrderQuantity())
//                .build();
//
//    }
//
//    @Override
//    public CartResponse save(CartRequest cartRequest, Long id) throws CustomException {
//        // find cart by user and id cart
//        ShoppingCart oldCart = findByUserAndId(id);
//
//        if (!oldCart.getProduct().getId().equals(cartRequest.getProductId())) {
//            throw new CustomException("Product ID does not match with the cart item",HttpStatus.CONFLICT);
//        }
//
//        // change quantity
//        oldCart.setOrderQuantity(oldCart.getOrderQuantity() + cartRequest.getQuantity());
//
//        ShoppingCart editCart = shoppingCartRepo.save(oldCart);
//        return CartResponse.builder()
//                .productId(editCart.getProduct().getId())
//                .productName(editCart.getProduct().getName())
//                .quantity(editCart.getOrderQuantity())
//                .price(editCart.getProduct().getPrice())
//                .build();
//    }
//
//    @Override
//    public void delete(Long id) {
//        findByUserAndId(id);
//        shoppingCartRepo.deleteById(id);
//    }
//
//    @Override
//    public void clear() {
//        User userCurrent = authService.getCurrentUser().getUser();
//        shoppingCartRepo.deleteAllByUser(userCurrent);
//    }
//
//    @Override
//    public OrderResponse checkout(CheckoutRequest checkoutRequest) throws CustomException {
//        User userCurrent = authService.getCurrentUser().getUser();
//
//        // Retrieve the shopping cart items for the user
//        List<ShoppingCart> cartItems = shoppingCartRepo.findAllByUser(userCurrent);
//        if (cartItems.isEmpty()) {
//            throw new CustomException("Cart is empty",HttpStatus.NOT_FOUND);
//        }
//
//        Address address= addressRepo.findByUserAndId(userCurrent, checkoutRequest.getAddressId()).orElseThrow(()-> new NoSuchElementException("Not found this address"));
//
//        // Calculate total price
////        Double totalPrice = cartItems.stream()
////                .mapToDouble(cartItem -> cartItem.getProduct().getPrice() * cartItem.getOrderQuantity())
////                .sum();
//
//        double totalPrice = 0.0;
//        for (ShoppingCart cart : cartItems) {
//            totalPrice += cart.getProduct().getPrice() * cart.getOrderQuantity();
//        }
//
//        // Create and save the order
//        Order newOrder = Order.builder()
//                .status(OrderStatus.WAITING)
//                .totalPrice(totalPrice)
//                .code(UUID.randomUUID().toString())
//                .note(checkoutRequest.getNote())
//                .receiveName(address.getNameReceiver())
//                .receiveAddress(address.getFullAddress())
//                .receivePhone(address.getPhoneReceiver())
//                .createdDate(new Date())
//                .user(userCurrent)
//                .build();
//
//        Order savedOrder = orderRepo.save(newOrder);
//
//        // Create order details (Can user for each)
//        List<OrderDetail> orderDetails = cartItems.stream().map(cartItem -> {
//            OrderDetail orderDetail = OrderDetail.builder()
//                    .unitPrice(cartItem.getProduct().getPrice())
//                    .orderQuantity(cartItem.getOrderQuantity())
//                    .name(cartItem.getProduct().getName())
//                    .product(cartItem.getProduct())
//                    .order(savedOrder)
//                    .build();
//            return orderDetailRepo.save(orderDetail);
//        }).toList();
//
//        // Clear the shopping cart by set status false
////        cartItems.forEach(cartItem -> {
////            cartItem.setStatus(false);  // Mark cart item as processed
////            shoppingCartRepo.save(cartItem);
////        });
//        // Clear cart
//
//        clear();
//
//        return OrderResponse.builder()
//                .id(savedOrder.getId())
//                .email(savedOrder.getUser().getEmail())
//                .code(savedOrder.getCode())
//                .totalPrice(savedOrder.getTotalPrice())
//                .note(savedOrder.getNote())
//                .receiveAddress(savedOrder.getReceiveAddress())
//                .receiveName(savedOrder.getReceiveName())
//                .receivePhone(savedOrder.getReceivePhone())
//                .createdDate(savedOrder.getCreatedDate())
//                .build();
//    }
//
//
//}
