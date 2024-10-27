package ra.ecommerceapi.controller.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ra.ecommerceapi.model.constant.EHttpStatus;
import ra.ecommerceapi.model.dto.ResponseWrapper;
import ra.ecommerceapi.model.dto.request.AddressRequest;
import ra.ecommerceapi.service.IAddressService;

@Controller
@RequiredArgsConstructor
@RequestMapping("api.com/v2/user/addresses")
public class AddressController {
    private final IAddressService addressService;

    @GetMapping("")
    public ResponseEntity<?> findAllByUser() {
        return ResponseEntity.ok().body(
                ResponseWrapper.builder()
                        .data(addressService.findAllByUser())
                        .status(EHttpStatus.SUCCESS)
                        .code(200)
                        .build()
        );
    }

    @GetMapping("/{addressId}")
    public ResponseEntity<?> findById(@PathVariable Long addressId) {
        return ResponseEntity.ok().body(new ResponseWrapper<>(addressService.findByUserAndId(addressId),EHttpStatus.SUCCESS,200));
    }

    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody AddressRequest addressRequest) {
        return new ResponseEntity<>(new ResponseWrapper<>(addressService.save(addressRequest),EHttpStatus.SUCCESS,201),HttpStatus.CREATED);
    }

    @PutMapping("/{addressId}")
    public ResponseEntity<?> edit(@Valid @RequestBody AddressRequest addressRequest,@PathVariable Long addressId) {
        return new ResponseEntity<>(new ResponseWrapper<>(addressService.save(addressRequest,addressId),EHttpStatus.SUCCESS,200),HttpStatus.OK);
    }

    @DeleteMapping("/{addressId}")
    public ResponseEntity<?> delete(@PathVariable Long addressId) {
        addressService.delete(addressId);
        return new ResponseEntity<>(null,HttpStatus.NO_CONTENT);
    }



}
