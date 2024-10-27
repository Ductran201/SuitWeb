package ra.ecommerceapi.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ra.ecommerceapi.model.constant.RoleName;
import ra.ecommerceapi.model.entity.Role;
import ra.ecommerceapi.repository.IRoleRepo;
import ra.ecommerceapi.service.IRoleService;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements IRoleService {
    private final IRoleRepo roleRepo;

    @Override
    public Role findByRoleName(RoleName roleName) {
        return roleRepo.findByRoleName(roleName).orElseThrow(()-> new NoSuchElementException("role not found"));
    }

    @Override
    public Role findById(Long id) {
        return roleRepo.findById(id).orElseThrow(()-> new NoSuchElementException("Not found the role"));
    }

    @Override
    public List<Role> findAll() {
        return roleRepo.findAll();
    }

}
