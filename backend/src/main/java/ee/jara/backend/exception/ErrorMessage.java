package ee.jara.backend.exception;

import lombok.Data;

import java.util.Date;

@Data
public class ErrorMessage {
    private String message;
    private int code;
    private Date timestamp;
}
