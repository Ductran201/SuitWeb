package ra.ecommerceapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import ra.ecommerceapi.model.entity.ProductDetail;

import java.util.List;

@Transactional
public interface IProductDetailRepo extends JpaRepository<ProductDetail, Long> {
    //    FOR ADMIN
    Page<ProductDetail> findByNameContainsAndProductId(String name, Long id, Pageable pageable);

    @Modifying
    @Query("update ProductDetail pd set pd.status = (not pd.status) where pd.id = :id")
    void toggleStatus(Long id);

    Boolean existsByName(String name);

    //    FOR USER

    //    COMMON
    List<ProductDetail> findAllByProductId(Long id);

}

