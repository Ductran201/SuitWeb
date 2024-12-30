package ra.ecommerceapi.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.entity.Comment;
import ra.ecommerceapi.model.entity.User;
import ra.ecommerceapi.repository.ICommentRepo;
import ra.ecommerceapi.service.ICommentService;
import ra.ecommerceapi.service.IProductService;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements ICommentService {
    private final ICommentRepo commentRepo;
    private final IProductService productService;


    @Override
    public Page<Comment> findAllCommentsPaginationGuest(Long productId,Pageable pageable) {
        return commentRepo.findAllByProductId(productId, pageable);
    }

    @Override
    public Comment findById(Long id) throws CustomException {
        return commentRepo.findById(id).orElseThrow(() -> new CustomException("Not found this comment", HttpStatus.NOT_FOUND));
    }

    @Override
    public Comment addComment(User userCurrent, Long productId, Comment comment) {

        Comment newComment = Comment.builder()
                .content(comment.getContent())
                .user(userCurrent)
                .updatedDate(new Date())
                .product(productService.findById(productId))
                .build();
        newComment.setCreatedDate(new Date());
        newComment.setStatus(true);
        return commentRepo.save(newComment);
    }

    @Override
    public Comment updateComment(User userCurrent, Long productId, Comment comment,Long commentId) throws CustomException {
        Comment oldComment = findById(comment.getId());
        oldComment.setContent(comment.getContent());
        oldComment.setUser(userCurrent);
        oldComment.setUpdatedDate(new Date());
        return commentRepo.save(oldComment);
    }

    @Override
    public void deleteComment(User userCurrent, Long productId,Long commentId) throws CustomException {
        findById(commentId);
        commentRepo.deleteById(commentId);
    }
}
