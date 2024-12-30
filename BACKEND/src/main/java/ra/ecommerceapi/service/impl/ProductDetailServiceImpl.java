package ra.ecommerceapi.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.dto.request.ProductDetailRequest;
import ra.ecommerceapi.model.dto.response.ProductDetailAllResponse;
import ra.ecommerceapi.model.entity.ImgProductDetail;
import ra.ecommerceapi.model.entity.ProductDetail;
import ra.ecommerceapi.repository.IProductDetailRepo;
import ra.ecommerceapi.service.*;


import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductDetailServiceImpl implements IProductDetailService {
    private final IProductDetailRepo productDetailRepo;
    private final IProductService productService;
    private final UploadService uploadService;
    private final IImgProductDetailService imgProductDetailService;
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

        if (!productDetailRequest.getImages().isEmpty()) {
            for (MultipartFile file : productDetailRequest.getImages()) {
                ImgProductDetail imgProductDetail = ImgProductDetail.builder()
                        .image(uploadService.uploadFileToServer(file))
                        .productDetail(productDetail)
                        .build();
                imgProductDetail.setStatus(true);
                imgProductDetail.setCreatedDate(new Date());
                imgProductDetailService.add(imgProductDetail);
            }
        }
        return productDetailRepo.save(productDetail);

    }


    @Override
    public ProductDetail edit(ProductDetailRequest productDetailRequest, Long id) throws CustomException {

        ProductDetail oldProductDetail = findById(id);
        if (!oldProductDetail.getName().equals(productDetailRequest.getName())
                && productDetailRepo.existsByName(productDetailRequest.getName())) {
            throw new CustomException("This product has already exist", HttpStatus.CONFLICT);
        }

        List<Long> existingImageIdsToKeep = productDetailRequest.getExistingImageIdsToKeep();

        List<ImgProductDetail> currentImages = imgProductDetailService.findAllImagesByProductDetailId(id);
        if (existingImageIdsToKeep != null) {
            currentImages.stream()
                    .filter(image -> !existingImageIdsToKeep.contains(image.getId()))
                    .forEach(image -> imgProductDetailService.deleteImageById(image.getId()));
        }else{
            imgProductDetailService.deleteAllImagesByProductDetailId(id);
        }

        oldProductDetail.setName(productDetailRequest.getName());
        oldProductDetail.setPrice(productDetailRequest.getPrice());
        oldProductDetail.setStockQuantity(productDetailRequest.getStockQuantity());
        oldProductDetail.setUpdatedDate(new Date());
        oldProductDetail.setColor(colorService.findById(productDetailRequest.getColorId()));
        oldProductDetail.setSize(sizeService.findById(productDetailRequest.getSizeId()));

        if (productDetailRequest.getImages() != null && !productDetailRequest.getImages().isEmpty()) {
            for (MultipartFile file : productDetailRequest.getImages()) {
                ImgProductDetail imgProductDetail = ImgProductDetail.builder()
                        .image(uploadService.uploadFileToServer(file))
                        .productDetail(oldProductDetail)
                        .build();
                imgProductDetail.setStatus(true);
                imgProductDetail.setCreatedDate(new Date());
                imgProductDetailService.add(imgProductDetail);
            }
        }

        return productDetailRepo.save(oldProductDetail);
    }


    @Override
    public void delete(Long id) {
        productDetailRepo.deleteById(id);
        imgProductDetailService.deleteAllImagesByProductDetailId(id);
    }

    @Override
    public void toggleStatus(Long id) {
        productDetailRepo.toggleStatus(id);
    }

    @Override
    public ProductDetailAllResponse getAllProductDetails(Long productDetailId) throws CustomException {

        List<ImgProductDetail> listImages = imgProductDetailService.findAllImagesByProductDetailId(productDetailId);

        return ProductDetailAllResponse.builder()
                .productDetail(findById(productDetailId))
                .images(listImages)
                .build();

    }

    @Override
    public List<ProductDetail> findAllByProductId(Long id) {
        productService.findById(id);

        return productDetailRepo.findAllByProductId(id);
    }
}
