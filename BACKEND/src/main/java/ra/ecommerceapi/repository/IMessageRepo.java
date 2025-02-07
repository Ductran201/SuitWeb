package ra.ecommerceapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ra.ecommerceapi.model.entity.Comment;
import ra.ecommerceapi.model.entity.Message;
import ra.ecommerceapi.model.entity.User;

import java.util.List;

public interface IMessageRepo extends JpaRepository<Message, Integer> {
    Page<Message> findAllBy(Pageable pageable);


    List<Message> findAllByUser(User user);

}
