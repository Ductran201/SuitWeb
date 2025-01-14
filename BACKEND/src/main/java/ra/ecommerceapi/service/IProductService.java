package ra.ecommerceapi.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.dto.request.ProductRequest;
import ra.ecommerceapi.model.dto.response.ProductResponse;
import ra.ecommerceapi.model.entity.Product;

import java.util.List;

public interface IProductService {
    //    FOR ADMIN
    Page<Product> findAllPaginationAdmin(String search, Pageable pageable);

    Product findById(Long id);

    Product save(ProductRequest productRequest) throws CustomException;

    Product save(ProductRequest productRequest, Long id) throws CustomException;

    void delete(Long id);

    void toggleStatus(Long id);
    // FOR USER

    ProductResponse findProductResponseByProductId(Long id);

    // COMMON
    Page<ProductResponse> findAllProductByCategory(Long categoryId, String search,List<Long> colorIds, List<Long> sizeIds, Pageable pageable);

    List<Product> findAll();

    List<ProductResponse> findTopProductNewestByCategory(Long id);


}
