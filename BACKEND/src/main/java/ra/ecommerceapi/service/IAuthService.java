package ra.ecommerceapi.service;

import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.dto.request.SignInRequest;
import ra.ecommerceapi.model.dto.request.SignUpRequest;
import ra.ecommerceapi.model.dto.response.JWTResponse;
import ra.ecommerceapi.security.principle.UserDetailsCustom;

public interface IAuthService{
    Boolean signUp(SignUpRequest signUpRequest) throws CustomException;

    JWTResponse signIn(SignInRequest signInRequest) throws CustomException;

    UserDetailsCustom getCurrentUser();
}
