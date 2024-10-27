package ra.ecommerceapi.advice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.constant.EHttpStatus;
import ra.ecommerceapi.model.dto.ResponseWrapper;
import ra.ecommerceapi.model.dto.response.ResponseDataError;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class AdviceHandler {

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<?> handleNotFound(NoSuchElementException e) {
        return new ResponseEntity<>(new ResponseDataError<>(e.getMessage(), HttpStatus.NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleNotValid(MethodArgumentNotValidException e) {
        Map<String, String> errorMap = new HashMap<>();
        e.getFieldErrors().forEach(err -> errorMap.put(err.getField(), err.getDefaultMessage()));
        return new ResponseEntity<>(new ResponseDataError<>(errorMap, HttpStatus.BAD_REQUEST), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> handleCustomException(CustomException e){
        return new ResponseEntity<>(ResponseWrapper.builder()
                .data(e.getMessage())
                .status(EHttpStatus.FAILED)
                .code(e.getHttpStatus().value())
                .build(),e.getHttpStatus());
    }

}
