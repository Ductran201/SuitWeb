package ra.ecommerceapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import ra.ecommerceapi.model.entity.ProductDetail;
import ra.ecommerceapi.model.entity.ShoppingCart;
import ra.ecommerceapi.model.entity.User;

import java.util.List;
import java.util.Optional;

@Transactional
public interface IShoppingCartRepo extends JpaRepository<ShoppingCart,Long> {

    List<ShoppingCart> findAllByUser(User user);

    Optional<ShoppingCart> findByUserAndId(User user,Long id);

    Boolean existsByUserAndProductDetail(User user, ProductDetail productDetail);

    ShoppingCart findByUserAndProductDetail(User user, ProductDetail productDetail);

    void deleteAllByUser(User user);

}
