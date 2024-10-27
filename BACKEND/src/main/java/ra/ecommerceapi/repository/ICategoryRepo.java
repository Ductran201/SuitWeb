package ra.ecommerceapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import ra.ecommerceapi.model.entity.Category;

@Transactional
public interface ICategoryRepo extends JpaRepository<Category,Long> {
    // FOR ADMIN
    Page<Category> findAllByNameContains(String name, Pageable pageable);

    @Modifying
    @Query("update Category c set c.status = (not c.status)  where c.id = :id")
    void toggleStatus(Long id);

    // FOR USER
    Page<Category> findAllByNameContainsAndStatusTrue(String name, Pageable pageable);

    // COMMON

    Boolean existsByName(String name);

    @Query("select c.image from Category c where c.id= :id")
    String getImgById(@Param("id") Long id);
}
