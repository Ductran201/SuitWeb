package ra.ecommerceapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ra.ecommerceapi.model.entity.Comment;

public interface ICommentRepo extends JpaRepository<Comment,Long> {
    Page<Comment> findAllByProductId(Long productId,Pageable pageable);
}
