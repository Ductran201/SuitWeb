package ra.ecommerceapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import ra.ecommerceapi.model.entity.Color;

public interface IColorRepo extends JpaRepository<Color,Long> {
    //    FOR ADMIN
    Page<Color> findByNameContains(String name, Pageable pageable);

    Boolean existsByName(String name);

    @Modifying
    @Query("update Color c set c.status =(not c.status) where c.id=:id")
    void toggleStatus(Long id);
//    FOR USER

//    FOR COMMON
}
