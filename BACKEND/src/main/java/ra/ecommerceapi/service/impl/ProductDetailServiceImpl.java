package ra.ecommerceapi.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.dto.request.ProductDetailRequest;
import ra.ecommerceapi.model.entity.ProductDetail;
import ra.ecommerceapi.repository.IProductDetailRepo;
import ra.ecommerceapi.service.IColorService;
import ra.ecommerceapi.service.IProductDetailService;
import ra.ecommerceapi.service.IProductService;
import ra.ecommerceapi.service.ISizeService;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class ProductDetailServiceImpl implements IProductDetailService {
    private final IProductDetailRepo productDetailRepo;
    private final IProductService productService;
    private final ISizeService sizeService;
    private final IColorService colorService;

    @Override
    public Page<ProductDetail> findAllProductDetailByNameAdmin(String search, Long id, Pageable pageable) {
        return productDetailRepo.findByNameContainsAndProductId(search, id, pageable);
    }

    @Override
    public ProductDetail findById(Long id) throws CustomException {
        return productDetailRepo.findById(id).orElseThrow(() -> new CustomException("Not found this product detail", HttpStatus.NOT_FOUND));
    }

    @Override
    public ProductDetail add(ProductDetailRequest productDetailRequest) throws CustomException {
        if (productDetailRepo.existsByName(productDetailRequest.getName())) {
            throw new CustomException("This product has already exist", HttpStatus.CONFLICT);
        }

        ProductDetail productDetail = ProductDetail.builder()
                .name(productDetailRequest.getName())
                .price(productDetailRequest.getPrice())
                .stockQuantity(productDetailRequest.getStockQuantity())
                .updatedDate(new Date())
                .color(colorService.findById(productDetailRequest.getColorId()))
                .size(sizeService.findById(productDetailRequest.getSizeId()))
                .product(productService.findById(productDetailRequest.getProductId()))
                .build();
        productDetail.setCreatedDate(new Date());
        productDetail.setStatus(false);

        return productDetailRepo.save(productDetail);

    }

    //if (!productDetailRequest.getImages().isEmpty()){
//for (MultipartFile image : productDetailRequest.getImages()) {
//
//}
//}



    @Override
    public ProductDetail edit(ProductDetailRequest productDetailRequest, Long id) throws CustomException {

        ProductDetail oldProductDetail = findById(id);
        if (!oldProductDetail.getName().equals(productDetailRequest.getName())
                && productDetailRepo.existsByName(productDetailRequest.getName())) {
            throw new CustomException("This product has already exist", HttpStatus.CONFLICT);
        }

        oldProductDetail.setName(productDetailRequest.getName());
        oldProductDetail.setPrice(productDetailRequest.getPrice());
        oldProductDetail.setStockQuantity(productDetailRequest.getStockQuantity());
        oldProductDetail.setUpdatedDate(new Date());
        oldProductDetail.setColor(colorService.findById(productDetailRequest.getColorId()));
        oldProductDetail.setSize(sizeService.findById(productDetailRequest.getSizeId()));

        return productDetailRepo.save(oldProductDetail);
    }

    @Override
    public void delete(Long id) {
        productDetailRepo.deleteById(id);
    }

    @Override
    public void toggleStatus(Long id) {
        productDetailRepo.toggleStatus(id);
    }
}
