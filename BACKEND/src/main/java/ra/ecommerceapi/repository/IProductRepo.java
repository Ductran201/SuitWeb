package ra.ecommerceapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import ra.ecommerceapi.model.entity.Category;
import ra.ecommerceapi.model.entity.Product;

import java.util.List;

@Transactional
public interface IProductRepo extends JpaRepository<Product, Long> {
    //    FOR ADMIN
    Page<Product> findAllByNameContains(String name, Pageable pageable);
    @Modifying
    @Query("update Product p set p.status = (not p.status) where p.id =:id")
    void toggleStatus(Long id);

    //    FOR USER
    Page<Product> findAllByNameContainsAndStatusTrueOrDescriptionContainsAndStatusTrue(String name, String description, Pageable pageable);

    Page<Product> findAllByCategoryIdAndStatusTrue(Long id, Pageable pageable);
    //    COMMON
    @Query("select p.image from Product p where p.id= :id")
    String getImgById(@Param("id") Long id);

    Boolean existsByName(String name);

//    @Query("SELECT new com.example.ProductOverviewDTO(p.name, p.description, pd.price, p.createdDate) " +
//            "FROM Product p JOIN p.productDetails pd " +
//            "ORDER BY p.createdDate DESC")
//    List<ProductOverviewDTO> findTop8NewestProducts(Pageable pageable);

//    @Query("SELECT p FROM Product p JOIN FETCH p.productDetails pd WHERE pd IS NOT NULL ORDER BY p.createdDate DESC")
//    List<Product> findTop8NewestProducts(Pageable pageable);
}
