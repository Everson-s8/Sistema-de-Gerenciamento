package secretaria.servidor.exception;

import java.time.LocalDateTime;
import java.util.Map;

public class ValidationErrorDetails {
    private LocalDateTime timestamp;
    private String message;
    private Map<String, String> fieldErrors;

    public ValidationErrorDetails(LocalDateTime timestamp, String message, Map<String, String> fieldErrors) {
        this.timestamp = timestamp;
        this.message = message;
        this.fieldErrors = fieldErrors;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    public String getMessage() {
        return message;
    }
    public Map<String, String> getFieldErrors() {
        return fieldErrors;
    }
}
