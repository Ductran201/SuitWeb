package ra.ecommerceapi.security.principle;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ra.ecommerceapi.model.entity.User;
import ra.ecommerceapi.repository.IUserRepo;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceCustom implements UserDetailsService {
    private final IUserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            User user = userRepo.findByEmail(username).orElseThrow(()-> new UsernameNotFoundException("User not found"));
            return UserDetailsCustom.builder()
                    .user(user)
                    .authorities(user.getRoleSet().stream()
                            .map(roles -> new SimpleGrantedAuthority(roles.getRoleName().name()))
                            .toList())
                    .build();
    }

}
