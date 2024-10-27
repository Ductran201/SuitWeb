//package ra.ecommerceapi.repository;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.transaction.annotation.Transactional;
//import ra.ecommerceapi.model.entity.Product;
//import ra.ecommerceapi.model.entity.ShoppingCart;
//import ra.ecommerceapi.model.entity.User;
//
//import java.util.List;
//import java.util.Optional;
//
//@Transactional
//public interface IShoppingCartRepo extends JpaRepository<ShoppingCart,Long> {
////    Optional<ShoppingCart> findByUserAndStatusTrue(User user);
//
//    List<ShoppingCart> findAllByUser(User user);
//
//    Optional<ShoppingCart> findByUserAndId(User user,Long id);
//
//    Boolean existsByUserAndProduct(User user, Product product);
//
//    void deleteAllByUser(User user);
//
//}
