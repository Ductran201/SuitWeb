package ra.ecommerceapi.controller.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.constant.EHttpStatus;
import ra.ecommerceapi.model.dto.ResponseWrapper;
import ra.ecommerceapi.model.entity.Comment;
import ra.ecommerceapi.model.entity.User;
import ra.ecommerceapi.service.IAuthService;
import ra.ecommerceapi.service.ICommentService;

@RestController
@RequiredArgsConstructor
@RequestMapping("api.com/v2/user/products/{productId}/comments")
public class UCommentController {
    private final IAuthService authService;
    private final ICommentService commentService;

    @PostMapping("")
    public ResponseEntity<?> addComment(@PathVariable Long productId,@RequestBody Comment comment) {
        User userCurrent = authService.getCurrentUser().getUser();
        return ResponseEntity.ok().body(ResponseWrapper.builder()
                        .data(commentService.addComment(userCurrent,productId, comment))
                        .code(201)
                        .status(EHttpStatus.SUCCESS)
                .build());
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<?> editComment(@PathVariable Long productId,@PathVariable Long commentId, @RequestBody Comment comment) throws CustomException {
        User userCurrent = authService.getCurrentUser().getUser();
        return ResponseEntity.ok().body(ResponseWrapper.builder()
                .data(commentService.updateComment(userCurrent, productId,comment,commentId))
                .code(201)
                .status(EHttpStatus.SUCCESS)
                .build());
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long productId, @PathVariable Long commentId) throws CustomException {
        User userCurrent = authService.getCurrentUser().getUser();
        commentService.deleteComment(userCurrent,productId,commentId);
        return new ResponseEntity<>(ResponseWrapper.builder()
                .data("Delete comment successfully")
                .status(EHttpStatus.SUCCESS)
                .code(200)
                .build(), HttpStatus.OK);
    }

}
