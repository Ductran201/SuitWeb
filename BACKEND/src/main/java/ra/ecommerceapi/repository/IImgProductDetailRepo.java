package ra.ecommerceapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ra.ecommerceapi.model.entity.ImgProductDetail;

import java.util.List;

public interface IImgProductDetailRepo extends JpaRepository<ImgProductDetail, Long> {
        List<ImgProductDetail> findAllByProductDetailId(Long productDetailId);

        void deleteByProductDetailId(Long productDetailId);
}
