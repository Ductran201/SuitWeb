package ra.ecommerceapi.service;

import ra.ecommerceapi.model.entity.ImgProductDetail;

import java.util.List;

public interface IImgProductDetailService {
    ImgProductDetail add(ImgProductDetail imgProductDetail);

    List<ImgProductDetail> findAllImagesByProductDetailId(Long productDetailId);

    void deleteAllImagesByProductDetailId(Long productDetailId);

    void deleteImageById(Long imageId);
}
