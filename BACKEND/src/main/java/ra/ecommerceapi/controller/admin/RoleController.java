package ra.ecommerceapi.controller.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ra.ecommerceapi.model.dto.response.ResponseDataSuccess;
import ra.ecommerceapi.service.IRoleService;

@Controller
@RequiredArgsConstructor
@RequestMapping("api.com/v2/admin/role")
public class RoleController {
    private final IRoleService roleService;
    @GetMapping("")
    public ResponseEntity<?> listRole() {
        return new ResponseEntity<>(new ResponseDataSuccess<>(roleService.findAll(), HttpStatus.OK), HttpStatus.OK);
    }

}
