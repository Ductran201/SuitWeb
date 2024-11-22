package ra.ecommerceapi.controller.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ra.ecommerceapi.model.constant.EHttpStatus;
import ra.ecommerceapi.model.dto.ResponseWrapper;
import ra.ecommerceapi.model.dto.response.ProductResponse;
import ra.ecommerceapi.service.IWishListService;

import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("api.com/v2/user/wish-list")
public class WishListController {
    private final IWishListService wishListService;

    @GetMapping("")
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok().body(new ResponseWrapper<>(wishListService.findAll(),EHttpStatus.SUCCESS,200));
    }

    @PostMapping("/{idProduct}")
    public ResponseEntity<?> toggleWishList(@PathVariable Long idProduct){
        wishListService.toggleWishList(idProduct);
        return ResponseEntity.ok().body(new ResponseWrapper<>("Toggle successfully", EHttpStatus.SUCCESS,200));
    }

    @DeleteMapping("/{idProduct}")
    public ResponseEntity<?> removeWishList(@PathVariable Long idProduct){
        wishListService.removeWishList(idProduct);
        return ResponseEntity.ok().body(new ResponseWrapper<>("Remove product from wish list successfully",EHttpStatus.SUCCESS,200));
    }

}
