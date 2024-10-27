package ra.ecommerceapi.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.dto.request.ProductDetailRequest;
import ra.ecommerceapi.model.entity.ProductDetail;

public interface IProductDetailService {
    //FOR ADMIN
    Page<ProductDetail> findAllProductDetailByNameAdmin(String search, Long id,Pageable pageable);

    ProductDetail add(ProductDetailRequest productDetailRequest) throws CustomException;

    ProductDetail edit(ProductDetailRequest productDetailRequest,Long id) throws CustomException;

    ProductDetail findById(Long id) throws CustomException;

    void delete(Long id);

    void toggleStatus(Long id);
    //FOR USER

    //COMMON


}
