package ra.ecommerceapi.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.dto.request.CategoryRequest;
import ra.ecommerceapi.model.entity.Category;

import java.util.List;

public interface ICategoryService {
    // ADMIN
    Page<Category> findAllPaginationAdmin(String search, Pageable pageable);

    void toggleStatus(Long id);

    //USER
    Page<Category> findAllPaginationUser(String search, Pageable pageable);

    Category save(CategoryRequest categoryRequest) throws CustomException;

    Category save(CategoryRequest categoryRequest, Long id) throws CustomException;

    void delete(Long id);

    // COMMON
    List<Category> findAll();

    Category findById(Long id);


}
