package ra.ecommerceapi.security.jwt;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import ra.ecommerceapi.security.principle.UserDetailsCustom;

import java.util.Date;

@Component
@Slf4j
public class JWTProvider {
    @Value("${jwt.secret-key}")
    private String secretKey;
    @Value("${jwt.expired-time}")
    private Long expiredTime;

    public String generateAccessToken(UserDetailsCustom userDetailsCustom){
        return Jwts.builder()
                .setSubject(userDetailsCustom.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + expiredTime))
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    public boolean validationToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (UnsupportedJwtException ex) {
            log.error("Invalid JWT token {}", ex.getMessage());
        } catch (SignatureException ex) {
            log.error("Signature exception {}", ex.getMessage());
        } catch (MalformedJwtException ex) {
            log.error("Malformed URL exception {}", ex.getMessage());
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token {}", ex.getMessage());
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty {}", ex.getMessage());
        }
        return false;
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }
}
