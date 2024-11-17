package ra.ecommerceapi.service.impl;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.dto.request.ProductRequest;
import ra.ecommerceapi.model.dto.response.ProductDetailAllResponse;
import ra.ecommerceapi.model.dto.response.ProductOverviewResponse;
import ra.ecommerceapi.model.dto.response.ProductResponse;
import ra.ecommerceapi.model.entity.*;
import ra.ecommerceapi.repository.IProductDetailRepo;
import ra.ecommerceapi.repository.IProductRepo;
import ra.ecommerceapi.service.*;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {
    private final IProductRepo productRepo;
    private final IProductDetailRepo productDetailRepo;
    private final IImgProductDetailService imgProductDetailService;
    private final ICategoryService categoryService;
    private final UploadService uploadService;
    private final ModelMapper modelMapper;

    @Override
    public List<Product> findAll() {
        return productRepo.findAll();
    }

    @Override
    public List<ProductOverviewResponse> findTopProductNewest(Long id) {
        return productRepo.findTopProductNewest(id);
    }

    @Override
    public Page<ProductOverviewResponse> findAllPaginationUser(Long id, String search, Pageable pageable) {
        return productRepo.findAllByCategoryIdAndNameContainsAndStatusTrue(id, search, pageable);
    }

    @Override
    public ProductResponse findProductResponseByProductId(Long id) {
        findById(id);

        Set<Color> colorSet = new HashSet<>();
        Set<Size> sizeSet = new HashSet<>();
        List<ImgProductDetail> imgProductDetailList = new ArrayList<>();
        List<String> imageList = new ArrayList<>();


        List<ProductDetail> productDetailList = productDetailRepo.findAllByProductId(id);

        List<ProductDetailAllResponse> productDetailAllResponseList = new ArrayList<>();


        for (ProductDetail productDetail : productDetailList) {

            colorSet.add(productDetail.getColor());
            sizeSet.add(productDetail.getSize());

            imgProductDetailList = imgProductDetailService.findAllImagesByProductDetailId(productDetail.getId());
            productDetailAllResponseList.add(ProductDetailAllResponse.builder()
                    .productDetail(productDetail)
                    .images(imgProductDetailList)
                    .build());
            for (ImgProductDetail imgProductDetail : imgProductDetailList) {
                imageList.add(imgProductDetail.getImage());

            }

        }

        return ProductResponse.builder()
                .colorSet(colorSet)
                .sizeSet(sizeSet)
                .product(findById(id))
                .images(imageList)
                .productDetailAllResponse(productDetailAllResponseList)
                .build();
    }

    @Override
    public Product findById(Long id) {
        return productRepo.findById(id).orElseThrow(() -> new NoSuchElementException("Not found this product"));
    }

    @Override
    public Product save(ProductRequest productRequest) throws CustomException {

        if (productRepo.existsByName(productRequest.getName())) {
            throw new CustomException("This product already exist", HttpStatus.CONFLICT);
        }

        Product product = Product.builder()
                .name(productRequest.getName())
                .description(productRequest.getDescription())
                .updatedDate(new Date())
                .category(categoryService.findById(productRequest.getCategoryId()))
                .build();

        product.setStatus(false);
        product.setCreatedDate(new Date());

        if (productRequest.getFile() != null && productRequest.getFile().getSize() > 0) {
            product.setImage(uploadService.uploadFileToServer(productRequest.getFile()));
        } else {
            product.setImage(null);
        }

        return productRepo.save(product);
    }

    @Override
    public Product save(ProductRequest productRequest, Long id) throws CustomException {
        Product oldProduct = findById(id);

        if (!Objects.equals(productRequest.getName(), findById(id).getName()) && productRepo.existsByName(productRequest.getName())) {
            throw new CustomException("This product already exist", HttpStatus.CONFLICT);
        }

        // change manually by set each field or can be use modelMapper
        oldProduct.setName(productRequest.getName());
        oldProduct.setDescription(productRequest.getDescription());
        oldProduct.setCategory(categoryService.findById(productRequest.getCategoryId()));
        oldProduct.setUpdatedDate(new Date());

        if (productRequest.getFile() != null && productRequest.getFile().getSize() > 0) {
            oldProduct.setImage(uploadService.uploadFileToServer(productRequest.getFile()));
        } else if (productRequest.getFile() != null && productRequest.getFile().getSize() == 0) {
            oldProduct.setImage(null);
        }

        return productRepo.save(oldProduct);
    }

    @Override
    public void delete(Long id) {
        productRepo.deleteById(id);
    }

    @Override
    public void toggleStatus(Long id) {
        productRepo.toggleStatus(id);
    }

    @Override
    public Page<Product> findAllPaginationAdmin(String search, Pageable pageable) {
        return productRepo.findAllByNameContains(search, pageable);
    }


//    @Override
//    public Page<ProductResponse> findAllByCategoryIdAndStatusTrue(Long id, Pageable pageable) {
//
//        Page<ProductResponse> productUserDTOS= productRepo.findAllByCategoryIdAndStatusTrue(id,pageable).map(p->modelMapper.map(p, ProductResponse.class));
//        if (productUserDTOS.isEmpty()){
//            throw new NoSuchElementException("Not found the product of category");
//        }
//        return productUserDTOS;
//    }

}
