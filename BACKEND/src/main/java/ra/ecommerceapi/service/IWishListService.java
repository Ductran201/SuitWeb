package ra.ecommerceapi.service;

import org.springframework.stereotype.Service;
import ra.ecommerceapi.model.dto.response.ProductResponse;
import ra.ecommerceapi.model.entity.Product;

import java.util.Set;

public interface IWishListService {
    Set<Product> findAll();

    void toggleWishList(Long idProduct);

    void removeWishList(Long idProduct);
}
