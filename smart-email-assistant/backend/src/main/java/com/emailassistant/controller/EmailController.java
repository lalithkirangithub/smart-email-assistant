package com.emailassistant.controller;

import com.emailassistant.model.EmailRequest;
import com.emailassistant.model.EmailResponse;
import com.emailassistant.service.EmailService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    private static final Logger logger = LoggerFactory.getLogger(EmailController.class);

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/process")
    public ResponseEntity<EmailResponse> processEmail(@Valid @RequestBody EmailRequest request) {
        long startTime = System.currentTimeMillis();
        logger.info("Received email processing request: action={}", request.getAction());

        try {
            String result = emailService.processEmailAction(request);
            long processingTime = System.currentTimeMillis() - startTime;
            logger.info("Email processed successfully in {}ms", processingTime);
            return ResponseEntity.ok(EmailResponse.success(result, request.getAction(), processingTime));
        } catch (IllegalArgumentException e) {
            logger.warn("Invalid action requested: {}", e.getMessage());
            return ResponseEntity.badRequest().body(EmailResponse.error(e.getMessage()));
        } catch (Exception e) {
            logger.error("Error processing email: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(EmailResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/actions")
    public ResponseEntity<Map<String, Object>> getAvailableActions() {
        return ResponseEntity.ok(Map.of(
                "actions", new String[]{
                        "compose", "reply", "summarize", "improve",
                        "subject", "tone_check", "translate",
                        "bullet_points", "formal", "casual"
                },
                "descriptions", Map.of(
                        "compose", "Compose a new email from scratch",
                        "reply", "Write a reply to an existing email",
                        "summarize", "Summarize the key points of an email",
                        "improve", "Improve grammar, clarity and professionalism",
                        "subject", "Generate compelling subject lines",
                        "tone_check", "Analyze the tone and sentiment",
                        "translate", "Translate email to another language",
                        "bullet_points", "Extract key bullet points",
                        "formal", "Convert to formal professional style",
                        "casual", "Convert to casual friendly style"
                )
        ));
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "Smart Email Assistant"));
    }
}
