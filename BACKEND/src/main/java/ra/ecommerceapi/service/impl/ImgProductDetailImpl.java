package ra.ecommerceapi.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ra.ecommerceapi.model.entity.ImgProductDetail;
import ra.ecommerceapi.repository.IImgProductDetailRepo;
import ra.ecommerceapi.service.IImgProductDetailService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImgProductDetailImpl implements IImgProductDetailService {
    private final IImgProductDetailRepo imgProductDetailRepo;

    @Override
    public ImgProductDetail add(ImgProductDetail imgProductDetail) {
        return imgProductDetailRepo.save(imgProductDetail);
    }

    @Override
    public List<ImgProductDetail> findAllImagesByProductDetailId(Long productDetailId) {
        return imgProductDetailRepo.findAllByProductDetailId(productDetailId);
    }

    @Override
    public void deleteAllImagesByProductDetailId(Long productDetailId) {
        imgProductDetailRepo.deleteByProductDetailId(productDetailId);
    }

    @Override
    public void deleteImageById(Long imageId) {
        imgProductDetailRepo.deleteById(imageId);
    }
}
