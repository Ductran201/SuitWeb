package ra.ecommerceapi.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ra.ecommerceapi.model.dto.response.ProductResponse;
import ra.ecommerceapi.model.entity.History;
import ra.ecommerceapi.model.entity.User;

public interface IHistoryService {
    Page<ProductResponse> getUserHistory(User user, Pageable pageable);

    void createOrUpdateHistory(User user, Long productId);

    History findByProductId(Long productId);

}
