package ra.ecommerceapi.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ra.ecommerceapi.model.dto.response.ProductDetailAllResponse;
import ra.ecommerceapi.model.dto.response.ProductResponse;
import ra.ecommerceapi.model.entity.*;
import ra.ecommerceapi.repository.IHistoryRepo;
import ra.ecommerceapi.repository.IProductDetailRepo;
import ra.ecommerceapi.service.*;

import java.util.*;

@Service
@RequiredArgsConstructor
public class HistoryServiceImpl implements IHistoryService {
    private final IHistoryRepo historyRepo;
    private final IProductService productService;
    private final IAuthService authService;
    private final IProductDetailRepo productDetailRepo;
    private final IImgProductDetailService imgProductDetailService;

    @Override
    public Page<ProductResponse> getUserHistory(User user, Pageable pageable) {
        // Lấy danh sách lịch sử của người dùng
        Page<History> historyList = historyRepo.findAllByUserOrderByViewTimeDesc(user, pageable);

        // Chuyển đổi thành danh sách HistoryResponse
        return historyList.map(history -> {
            Product product = history.getProduct();
            Set<Color> colorSet = new HashSet<>();
            Set<Size> sizeSet = new HashSet<>();
            List<ProductDetailAllResponse> productDetailAllResponseList = new ArrayList<>();

            // Lấy danh sách ProductDetail theo ProductId
            List<ProductDetail> productDetailList = productDetailRepo.findAllByProductId(product.getId());

            // Lấy các thông tin cần thiết (Màu sắc, kích thước, ảnh phụ)
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

            // Return ProductResponse cho sản phẩm hiện tại
            return ProductResponse.builder()
                    .productId(product.getId())
                    .categoryId(product.getCategory().getId())
                    .productName(product.getName())
                    .colorSet(colorSet)
                    .sizeSet(sizeSet)
                    .productDetailAllResponse(productDetailAllResponseList)
                    .viewTime(history.getViewTime())
                    .build();

        });
    }

    @Override
    public void createOrUpdateHistory(User user, Long productId) {

        Product product = productService.findById(productId);

        Boolean isExist = historyRepo.existsByUserAndProductId(user, productId);

        if (isExist) {
            // if exist --> update the viewDate
            History history = findByProductId(productId);
            history.setViewTime(new Date());
            historyRepo.save(history);
        } else {
            // if not --> create new
            History newHistory = History.builder()
                    .user(user)
                    .product(product)
                    .viewTime(new Date())
                    .build();
            historyRepo.save(newHistory);
        }
    }

    @Override
    public History findByProductId(Long productId) {
        User userCurrent = authService.getCurrentUser().getUser();
        return historyRepo.findByUserAndProductId(userCurrent, productId);
    }
}
