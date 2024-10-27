//package ra.ecommerceapi.service.impl;
//
//import lombok.RequiredArgsConstructor;
//import org.modelmapper.ModelMapper;
//import org.springframework.stereotype.Service;
//import ra.ecommerceapi.model.dto.response.ProductResponse;
//import ra.ecommerceapi.model.entity.Product;
//import ra.ecommerceapi.model.entity.User;
//import ra.ecommerceapi.service.IAuthService;
//import ra.ecommerceapi.service.IProductService;
//import ra.ecommerceapi.service.IUserService;
//import ra.ecommerceapi.service.IWishListService;
//
//import java.util.List;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//@Service
//@RequiredArgsConstructor
//public class WishListServiceImpl implements IWishListService {
//    private final IUserService userService;
//    private final IProductService productService;
//    private final IAuthService authService;
//    private final ModelMapper modelMapper;
//
//    @Override
//    public Set<ProductResponse> findAll() {
//        User userCurrent = authService.getCurrentUser().getUser();
//        return userCurrent.getWishList().stream().map(item -> modelMapper.map(item, ProductResponse.class)).collect(Collectors.toSet());
//    }
//
//    @Override
//    public void toggleWishList(Long idProduct) {
//
//        Product productWishList = productService.findById(idProduct);
//        User userCurrent = authService.getCurrentUser().getUser();
//        Set<Product> wishList = userCurrent.getWishList();
//        // check exist
//        if (wishList.stream().anyMatch(p -> p.getId().equals(idProduct))) {
//            boolean blRemove = wishList.removeIf(p -> p.getId().equals(idProduct));
//            System.out.println(blRemove);
//        } else {
//            wishList.add(productWishList);
//        }
//
//        userService.save(userCurrent);
//    }
//
//    @Override
//    public void removeWishList(Long idProduct) {
//        Product product = productService.findById(idProduct);
//        User userCurrent = authService.getCurrentUser().getUser();
//        userCurrent.getWishList().removeIf(p->p.getId().equals(idProduct));
//        userService.save(userCurrent);
//    }
//}
