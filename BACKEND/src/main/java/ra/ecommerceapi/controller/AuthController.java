package ra.ecommerceapi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.dto.request.SignInRequest;
import ra.ecommerceapi.model.dto.request.SignUpRequest;
import ra.ecommerceapi.model.dto.response.ResponseDataSuccess;
import ra.ecommerceapi.service.IAuthService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api.com/v2/auth")
public class AuthController {
    private final IAuthService authService;

    @PostMapping("/signUp")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequest signUpRequest) throws CustomException {
//        authService.signUp(signUpRequest);
        return new ResponseEntity<>(new ResponseDataSuccess<>(authService.signUp(signUpRequest), HttpStatus.CREATED),HttpStatus.CREATED);
    }

    @PostMapping("/signIn")
    public ResponseEntity<?> signIn(@Valid @RequestBody SignInRequest signInRequest) throws CustomException {
        return new ResponseEntity<>(new ResponseDataSuccess<>(authService.signIn(signInRequest), HttpStatus.OK),HttpStatus.OK );
    }
}
