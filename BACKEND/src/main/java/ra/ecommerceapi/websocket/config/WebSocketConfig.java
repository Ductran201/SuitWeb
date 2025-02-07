package ra.ecommerceapi.websocket.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Đăng ký endpoint WebSocket cho client kết nối
        registry.addEndpoint("/ws")
                .setAllowedOrigins("http://localhost:5173").withSockJS(); // Cho phép mọi nguồn

    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Kích hoạt một message broker đơn giản cho các client subscribe
        registry.enableSimpleBroker("/topic","/queue");
        // Định nghĩa prefix cho các message gửi lên server
        registry.setApplicationDestinationPrefixes("app");
    }
}


