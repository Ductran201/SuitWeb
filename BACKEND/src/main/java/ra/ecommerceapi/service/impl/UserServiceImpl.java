package ra.ecommerceapi.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.dto.request.UserRequest;
import ra.ecommerceapi.model.dto.response.UserResponse;
import ra.ecommerceapi.model.entity.User;
import ra.ecommerceapi.repository.IUserRepo;
import ra.ecommerceapi.service.IAuthService;
import ra.ecommerceapi.service.IRoleService;
import ra.ecommerceapi.service.IUserService;
import ra.ecommerceapi.service.UploadService;

import java.util.Date;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {
    private final IUserRepo userRepo;
    private final IAuthService authService;
    private final IRoleService roleService;
    private final UploadService uploadService;

    @Override
    public Page<User> findAllPaginationAdmin(String search, Pageable pageable) {
        return userRepo.findAllByFullNameContainingExceptAdmin(search, pageable);
    }

    @Override
    public void addRoleForUser(Long userId, Long roleId) throws CustomException {
        User user = findUserExceptAdminById(userId);
        //check exist role
        if (user.getRoleSet().stream().anyMatch(r -> r.getId().equals(roleId))) {
            throw new CustomException("This user already has this role", HttpStatus.BAD_REQUEST);
        }
        user.getRoleSet().add(roleService.findById(roleId));
        userRepo.save(user);
    }

    @Override
    public void deleteRoleForUser(Long userId, Long roleId) throws CustomException {
        User user = findUserExceptAdminById(userId);
        //check exist role
        if (user.getRoleSet().stream().anyMatch(r -> r.getId().equals(roleId))) {
            user.getRoleSet().remove(roleService.findById(roleId));
            userRepo.save(user);
        } else {
            throw new CustomException("This user has no this role",HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public User findUserExceptAdminById(Long id) {
        return userRepo.findUserExceptAdminById(id).orElseThrow(() -> new NoSuchElementException("Not found this user"));
    }

    @Override
    public User save(User user) {
        return userRepo.save(user);
    }

    @Override
    public UserResponse save(UserRequest userRequest) {

        User oldUser= userRepo.findById(authService.getCurrentUser().getUser().getId()).orElseThrow(() -> new NoSuchElementException("Not found this user"));

//        oldUser.setEmail(userRequest.getEmail());
        oldUser.setFullName(userRequest.getFullName());
        oldUser.setPhone(userRequest.getPhone());
        oldUser.setGender(userRequest.getGender());
        oldUser.setDob(userRequest.getDob());
        oldUser.setUpdatedDate(new Date());

        if (userRequest.getFile() != null && userRequest.getFile().getSize() > 0) {
            oldUser.setAvatar(uploadService.uploadFileToServer(userRequest.getFile()));
        } else {
            oldUser.setAvatar(userRepo.getAvatarById(authService.getCurrentUser().getUser().getId()));
        }

        userRepo.save(oldUser);

        return UserResponse.builder()
                .email(oldUser.getEmail())
                .password(oldUser.getPassword())
                .fullName(oldUser.getFullName())
                .avatar(oldUser.getAvatar())
                .phone(oldUser.getPhone())
                .gender(oldUser.getGender())
                .createdDate(oldUser.getCreatedDate())
                .dob(oldUser.getDob())
                .build();

    }

    @Override
    public User findByEmail(String email) {
        return userRepo.findByEmail(email).orElseThrow(() -> new NoSuchElementException("Not found this user"));
    }

    @Override
    public Boolean existsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }

    @Override
    public void toggleStatus(Long id) {
        userRepo.toggleStatus(id);
    }

    @Override
    public UserResponse findById() {

        User user= userRepo.findById(authService.getCurrentUser().getUser().getId()).orElseThrow(() -> new NoSuchElementException("Not found this user"));

        return UserResponse.builder()
                .email(user.getEmail())
                .password(user.getPassword())
                .fullName(user.getFullName())
                .avatar(user.getAvatar())
                .phone(user.getPhone())
                .gender(user.getGender())
                .createdDate(user.getCreatedDate())
                .dob(user.getDob())
                .build();
    }

    @Override
    public User findById(Long id) {
        return userRepo.findById(id).orElseThrow(()->new NoSuchElementException("Not found this id"));
    }



}


