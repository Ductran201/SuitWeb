package ra.ecommerceapi.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class CustomException extends Exception {
    private final HttpStatus httpStatus;

    public CustomException(String message,HttpStatus httpStatus) {
        super(message);
        this.httpStatus=httpStatus;
    }

}
