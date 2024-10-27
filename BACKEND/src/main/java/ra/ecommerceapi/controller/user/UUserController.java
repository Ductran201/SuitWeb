package ra.ecommerceapi.controller.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ra.ecommerceapi.model.constant.EHttpStatus;
import ra.ecommerceapi.model.dto.ResponseWrapper;
import ra.ecommerceapi.model.dto.request.UserRequest;
import ra.ecommerceapi.service.IAuthService;
import ra.ecommerceapi.service.IUserService;

@Controller
@RequiredArgsConstructor
@RequestMapping("api.com/v2/user/account")
public class UUserController {
    private final IUserService userService;

    @GetMapping("")
    public ResponseEntity<?> getInformation() {
        return new ResponseEntity<>(new ResponseWrapper<>(userService.findById(), EHttpStatus.SUCCESS, 200), HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity<?> updateInformation(@ModelAttribute UserRequest userRequest) {
        return new ResponseEntity<>(new ResponseWrapper<>(userService.save(userRequest), EHttpStatus.SUCCESS, 200), HttpStatus.OK);
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword() {
        return null;
    }

}
