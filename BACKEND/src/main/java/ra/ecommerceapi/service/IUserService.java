package ra.ecommerceapi.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.dto.request.UserRequest;
import ra.ecommerceapi.model.dto.response.UserResponse;
import ra.ecommerceapi.model.entity.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
//FOR ADMIN

    Page<User> findAllPaginationAdmin(String search, Pageable pageable);

    void addRoleForUser(Long userId, Long roleId) throws CustomException;

    void deleteRoleForUser(Long userId, Long roleId) throws CustomException;

    User save(User user);


    // FOR USER

    UserResponse save(UserRequest userRequest);

    UserResponse findById();

    // COMMON

    User findUserExceptAdminById(Long id);

    void toggleStatus(Long id);

    User findByEmail(String email);

    Boolean existsByEmail(String email);

    User findById(Long id);


}
