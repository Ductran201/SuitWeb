//package ra.ecommerceapi.controller.user;
//
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.*;
//import ra.ecommerceapi.exception.CustomException;
//import ra.ecommerceapi.model.constant.EHttpStatus;
//import ra.ecommerceapi.model.dto.ResponseWrapper;
//import ra.ecommerceapi.model.dto.request.CartRequest;
//import ra.ecommerceapi.model.dto.request.CheckoutRequest;
//import ra.ecommerceapi.service.IShoppingCartService;
//
//@Controller
//@RequiredArgsConstructor
//@RequestMapping("/api.com/v2/user/cart")
//public class ShoppingCartController {
//    private final IShoppingCartService shoppingCartService;
//
//    @GetMapping("/list")
//    public ResponseEntity<?> listPagination() {
//        return new ResponseEntity<>(new ResponseWrapper<>(shoppingCartService.findAll(), EHttpStatus.SUCCESS, 200), HttpStatus.OK);
//    }
//
//    @PostMapping("/add")
//    public ResponseEntity<?> add(@Valid @RequestBody CartRequest cartRequest) throws CustomException {
//        return new ResponseEntity<>(ResponseWrapper.builder()
//                .data(shoppingCartService.save(cartRequest))
//                .status(EHttpStatus.SUCCESS)
//                .code(201)
//                .build(), HttpStatus.CREATED);
//    }
//
//    @PutMapping("/items/{cartId}")
//    public ResponseEntity<?> editQuantity(@Valid @RequestBody CartRequest cartRequest, @PathVariable Long cartId) throws CustomException {
//        return new ResponseEntity<>(new ResponseWrapper<>(shoppingCartService.save(cartRequest, cartId), EHttpStatus.SUCCESS, 200), HttpStatus.OK);
//    }
//
//    @DeleteMapping("/items/{cartId}")
//    public ResponseEntity<?> delete(@PathVariable Long cartId) {
//        shoppingCartService.delete(cartId);
//        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
//    }
//
//    @DeleteMapping("/clear")
//    public ResponseEntity<?> deleteAllCart() {
//        shoppingCartService.clear();
//        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
//    }
//
//    @PostMapping("/checkout")
//    public ResponseEntity<?> checkout(@Valid @RequestBody CheckoutRequest checkoutRequest) throws CustomException {
//        return new ResponseEntity<>(new ResponseWrapper<>(shoppingCartService.checkout(checkoutRequest),EHttpStatus.SUCCESS,201), HttpStatus.CREATED);
//
//    }
//}
//
