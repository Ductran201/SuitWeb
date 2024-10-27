package ra.ecommerceapi.service;

import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.dto.request.CartRequest;
import ra.ecommerceapi.model.dto.request.CheckoutRequest;
import ra.ecommerceapi.model.dto.response.CartResponse;
import ra.ecommerceapi.model.dto.response.OrderResponse;
import ra.ecommerceapi.model.entity.ShoppingCart;

import java.util.List;

public interface IShoppingCartService {
    List<CartResponse> findAll();

    ShoppingCart findByUserAndId(Long id);

    CartResponse save(CartRequest cartRequest) throws CustomException;

    CartResponse save(CartRequest cartRequest,Long id) throws CustomException;

    void delete(Long id);

    void clear();

    OrderResponse checkout(CheckoutRequest checkoutRequest) throws CustomException;

}
