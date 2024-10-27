package ra.ecommerceapi.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.dto.request.ColorRequest;
import ra.ecommerceapi.model.entity.Color;

import java.util.List;

public interface IColorService {
    //    FOR ADMIN
    Page<Color> findAllByNameAdmin(String search, Pageable pageable);

    List<Color> findAll();

    Boolean existByName(String name);

    Color findById(Long id) throws CustomException;

    Color add(ColorRequest colorRequest) throws CustomException;

    Color update(ColorRequest colorRequest,Long id) throws CustomException;

    void delete(Long id);

    void toggleStatus(Long id);
    //    FOR USER

    //    FOR COMMON
}
