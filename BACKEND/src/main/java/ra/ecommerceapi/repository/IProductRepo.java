package ra.ecommerceapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
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
    @Query("SELECT DISTINCT p FROM Product p " +
            "JOIN ProductDetail pd ON pd.product.id = p.id " +
            "WHERE p.category.id = :categoryId " +
            "AND (:search IS NULL OR p.name LIKE %:search%) " +
            "AND (:colorIds IS NULL OR pd.color.id IN :colorIds) " +
            "AND (:sizeIds IS NULL OR pd.size.id IN :sizeIds)")

    Page<Product> findAllFilteredProducts(@Param("categoryId") Long categoryId,
                                          @Param("search") String search,
                                          @Param("colorIds") List<Long> colorIds,
                                          @Param("sizeIds") List<Long> sizeIds,
                                          Pageable pageable);

    //    COMMON
    @Query("select p.image from Product p where p.id= :id")
    String getImgById(@Param("id") Long id);

    Boolean existsByName(String name);

    List<Product> findTop2ByCategoryIdAndStatusTrueOrderByIdDesc(Long categoryId);

}
