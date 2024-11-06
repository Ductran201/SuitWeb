package ra.ecommerceapi.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ra.ecommerceapi.model.entity.ImgProductDetail;
import ra.ecommerceapi.repository.IImgProductDetailRepo;
import ra.ecommerceapi.service.IImgProductDetailService;
@Service
@RequiredArgsConstructor
public class ImgProductDetailImpl implements IImgProductDetailService {
    private final IImgProductDetailRepo imgProductDetailRepo;

    @Override
    public ImgProductDetail add(ImgProductDetail imgProductDetail) {
        return imgProductDetailRepo.save(imgProductDetail);
    }
}
