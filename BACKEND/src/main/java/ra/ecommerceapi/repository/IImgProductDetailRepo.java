package ra.ecommerceapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ra.ecommerceapi.model.entity.ImgProductDetail;

public interface IImgProductDetailRepo extends JpaRepository<ImgProductDetail, Long> {

}
