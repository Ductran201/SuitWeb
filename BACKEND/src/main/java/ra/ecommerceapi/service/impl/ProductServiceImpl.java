package ra.ecommerceapi.service.impl;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.dto.request.ProductRequest;
import ra.ecommerceapi.model.dto.response.ProductDetailAllResponse;
import ra.ecommerceapi.model.dto.response.ProductResponse;
import ra.ecommerceapi.model.entity.*;
import ra.ecommerceapi.repository.IProductDetailRepo;
import ra.ecommerceapi.repository.IProductRepo;
import ra.ecommerceapi.service.*;

import java.util.*;

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
    public List<ProductResponse> findTopProductNewestByCategory(Long categoryId) {
// Lấy danh sách 2 sản phẩm mới nhất theo Id thuộc categoryId và status = true
        List<Product> products = productRepo.findTop2ByCategoryIdAndStatusTrueOrderByIdDesc(categoryId);

        List<ProductResponse> productResponseList = new ArrayList<>();

        for (Product product : products) {
            Set<Color> colorSet = new HashSet<>();
            Set<Size> sizeSet = new HashSet<>();
            List<ProductDetailAllResponse> productDetailAllResponseList = new ArrayList<>();

            // Lấy danh sách ProductDetail theo ProductId
            List<ProductDetail> productDetailList = productDetailRepo.findAllByProductId(product.getId());

            for (ProductDetail productDetail : productDetailList) {
                colorSet.add(productDetail.getColor());
                sizeSet.add(productDetail.getSize());

                // Lấy danh sách ảnh phụ cho từng ProductDetail
                List<ImgProductDetail> imgProductDetailList = imgProductDetailService.findAllImagesByProductDetailId(productDetail.getId());

                // Thêm vào danh sách ProductDetailAllResponse
                productDetailAllResponseList.add(ProductDetailAllResponse.builder()
                        .productDetail(productDetail)
                        .images(imgProductDetailList)
                        .build());
            }

            // Tạo ProductResponse cho sản phẩm hiện tại
            ProductResponse productResponse = ProductResponse.builder()
                    .productId(product.getId())
                    .productName(product.getName())
                    .colorSet(colorSet)
                    .sizeSet(sizeSet)
                    .productDetailAllResponse(productDetailAllResponseList)
                    .categoryId(product.getCategory().getId())
                    .build();

            productResponseList.add(productResponse);
        }

        return productResponseList;
    }

    @Override
    public Page<ProductResponse> findAllProductByCategory(Long categoryId, String search, List<Long> colorIds, List<Long> sizeIds, Pageable pageable) {
        Page<Product> products = productRepo.findAllByCategoryIdAndNameContainsAndStatusTrue(categoryId, search, pageable);

        System.out.println(products.getSize());

        List<ProductResponse> productResponseList = new ArrayList<>();

        for (Product product : products) {
            Set<Color> colorSet = new HashSet<>();
            Set<Size> sizeSet = new HashSet<>();
            List<ProductDetailAllResponse> productDetailAllResponseList = new ArrayList<>();

            // Lấy danh sách ProductDetail theo ProductId
            List<ProductDetail> productDetailList = productDetailRepo.findAllByProductId(product.getId());

            // Kiểm tra xem sản phẩm chính có ít nhất một ProductDetail thỏa mãn điều kiện không
            boolean hasMatchingDetail = false;

            for (ProductDetail productDetail : productDetailList) {
                // Luôn thêm vào colorSet và sizeSet
                colorSet.add(productDetail.getColor());
                sizeSet.add(productDetail.getSize());

                // Lấy danh sách ảnh phụ cho từng ProductDetail
                List<ImgProductDetail> imgProductDetailList = imgProductDetailService.findAllImagesByProductDetailId(productDetail.getId());

                // Kiểm tra ProductDetail có thỏa mãn bộ lọc hay không
                if ((colorIds == null || colorIds.isEmpty() || colorIds.contains(productDetail.getColor().getId())) &&
                        (sizeIds == null || sizeIds.isEmpty() || sizeIds.contains(productDetail.getSize().getId()))) {
                    hasMatchingDetail = true; // Đánh dấu sản phẩm có ProductDetail thỏa mãn điều kiện
                }

                // Thêm tất cả ProductDetail vào danh sách (không lọc)
                productDetailAllResponseList.add(ProductDetailAllResponse.builder()
                        .productDetail(productDetail)
                        .images(imgProductDetailList)
                        .build());
            }

            // Chỉ thêm ProductResponse nếu sản phẩm có ít nhất 1 ProductDetail thỏa mãn điều kiện
            if (hasMatchingDetail) {
                ProductResponse productResponse = ProductResponse.builder()
                        .productId(product.getId())
                        .productName(product.getName())
                        .colorSet(colorSet) // Danh sách toàn bộ màu
                        .sizeSet(sizeSet)   // Danh sách toàn bộ kích thước
                        .productDetailAllResponse(productDetailAllResponseList) // Tất cả ProductDetail
                        .categoryId(product.getCategory().getId())
                        .build();

                productResponseList.add(productResponse);
            }
        }

        // Chuyển đổi từ List sang Page
        return new PageImpl<>(productResponseList, pageable, products.getTotalElements());
    }



    @Override
    public ProductResponse findProductResponseByProductId(Long id) {
        findById(id);

        Set<Color> colorSet = new HashSet<>();
        Set<Size> sizeSet = new HashSet<>();
        List<ImgProductDetail> imgProductDetailList = new ArrayList<>();


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
        }

        return ProductResponse.builder()
                .colorSet(colorSet)
                .sizeSet(sizeSet)
                .productId(id)
                .productName(findById(id).getName())
                .productDetailAllResponse(productDetailAllResponseList)
                .categoryId(findById(id).getCategory().getId())
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
