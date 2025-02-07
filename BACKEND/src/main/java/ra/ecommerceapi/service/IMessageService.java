package ra.ecommerceapi.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ra.ecommerceapi.model.dto.request.MessageRequest;
import ra.ecommerceapi.model.entity.Message;

import java.util.List;

public interface IMessageService {

    Page<Message> findAllMessagesPaginationGuest(Pageable pageable);

    List<Message> findAllByUser();

    Message findByUserAndId(Long id);

    Message save(MessageRequest messageRequest);

    Message save(Message message,Long id);

    void delete(Long id);
}
