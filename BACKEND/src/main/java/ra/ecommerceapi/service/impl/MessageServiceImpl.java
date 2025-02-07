package ra.ecommerceapi.service.impl;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import ra.ecommerceapi.model.dto.request.MessageRequest;
import ra.ecommerceapi.model.entity.Message;
import ra.ecommerceapi.model.entity.User;
import ra.ecommerceapi.repository.IMessageRepo;
import ra.ecommerceapi.service.IAuthService;
import ra.ecommerceapi.service.IMessageService;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements IMessageService {
    private final IMessageRepo messageRepo;
    private final IAuthService authService;
    private final SimpMessagingTemplate messagingTemplate;
//    private final ModelMapper modelMapper;

    @Override
    public Page<Message> findAllMessagesPaginationGuest(Pageable pageable) {
        return messageRepo.findAllBy(pageable);
    }

    @Override
    public List<Message> findAllByUser() {
        User userCurrent = authService.getCurrentUser().getUser();
        return messageRepo.findAllByUser(userCurrent);
    }

    @Override
    public Message findByUserAndId(Long id) {
        return null;
    }

    @Override
    public Message save(MessageRequest messageRequest) {
        User userCurrent = authService.getCurrentUser().getUser();

        Message newMessage = Message.builder()
                .user(userCurrent)
                .message(messageRequest.getMessage())
                .build();
        newMessage.setStatus(true);
        newMessage.setCreatedDate(new Date());

        // save to database
        Message saveMessage = messageRepo.save(newMessage);

        // Gửi tin nhắn qua WebSocket đến tất cả các client trong topic "/topic/chat"
        messagingTemplate.convertAndSend("/topic/chat", saveMessage);

        return saveMessage;
    }

    @Override
    public Message save(Message message, Long id) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }
}
