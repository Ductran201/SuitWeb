package ra.ecommerceapi.service;

import ra.ecommerceapi.model.dto.response.ProductResponse;

import java.util.Set;

public interface IWishListService {
    Set<ProductResponse> findAll();

    void toggleWishList(Long idProduct);

    void removeWishList(Long idProduct);
}
