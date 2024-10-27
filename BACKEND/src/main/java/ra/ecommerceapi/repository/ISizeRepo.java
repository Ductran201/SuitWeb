package ra.ecommerceapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import ra.ecommerceapi.model.entity.Size;

@Transactional
public interface ISizeRepo extends JpaRepository<Size, Long> {
    //    FOR ADMIN
    Page<Size> findByNameContains(String name, Pageable pageable);

    Boolean existsByName(String name);

    @Modifying
    @Query("update Size s set s.status =(not s.status) where s.id=:id")
    void toggleStatus(Long id);
//    FOR USER

//    FOR COMMON

}
