package ra.ecommerceapi.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.entity.Comment;
import ra.ecommerceapi.model.entity.User;

public interface ICommentService {
    Page<Comment> findAllCommentsPaginationGuest(Long productId,Pageable pageable);

    Comment findById(Long id) throws CustomException;

    Comment addComment(User userCurrent,Long productId, Comment comment);
//maybe wrong because user A can update or delete comment of user B
    Comment updateComment(User userCurrent,Long productId,Comment comment,Long commentId) throws CustomException;

    void deleteComment(User userCurrent,Long productId,Long commentId) throws CustomException;
}
