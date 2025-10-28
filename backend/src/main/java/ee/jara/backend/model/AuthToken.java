package ee.jara.backend.model;

import lombok.Data;


@Data
public class AuthToken {
    private String token;
    private long expiration;

}
