package ra.ecommerceapi.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.dto.request.SizeRequest;
import ra.ecommerceapi.model.entity.Size;

import java.util.List;

public interface ISizeService {
    //    FOR ADMIN
    Page<Size> findAllByNameAdmin(String search, Pageable pageable);

    List<Size> findAll();

    Boolean existByName(String name);

    Size findById(Long id) throws CustomException;

    Size add(SizeRequest sizeRequest) throws CustomException;

    Size update(SizeRequest sizeRequest,Long id) throws CustomException;

    void delete(Long id);

    void toggleStatus(Long id);
    //    FOR USER

    //    FOR COMMON

}

