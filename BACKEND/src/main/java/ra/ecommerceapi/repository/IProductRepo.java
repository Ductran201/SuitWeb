package ra.ecommerceapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import ra.ecommerceapi.model.dto.response.ProductOverviewResponse;
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
    @Query("select new ra.ecommerceapi.model.dto.response.ProductOverviewResponse(p.name,p.image,p.createdDate,pd.price) " +
            "from Product p " +
            "join ProductDetail pd on pd.product=p " +
            "where p.category.id = :id and p.name like %:name% and p.status = true")
    Page<ProductOverviewResponse> findAllByCategoryIdAndNameContainsAndStatusTrue(Long id,String name, Pageable pageable);

    //    COMMON
    @Query("select p.image from Product p where p.id= :id")
    String getImgById(@Param("id") Long id);

    Boolean existsByName(String name);

    @Query("select new ra.ecommerceapi.model.dto.response.ProductOverviewResponse(p.name,p.image,p.createdDate,pd.price) " +
            "from Product p " +
            "join ProductDetail pd on pd.product=p where p.category.id=:id order by pd.price asc limit 1")
    List<ProductOverviewResponse> findTopProductNewest(Long id);
// This for if limit doesnt work
//    @Query("select new ra.ecommerceapi.model.dto.response.ProductOverviewResponse(p.name, pd.price) " +
//            "from Product p " +
//            "join ProductDetail pb on pb.product = p " +
//            "order by pb.price desc")
//    List<ProductOverviewResponse> findTopByPrice(Pageable pageable);

//    List<ProductOverviewResponse> topProducts = productRepo.findTopByPrice(PageRequest.of(0, 1));


}
