package com.emailassistant.model;

import jakarta.validation.constraints.NotBlank;

public class EmailRequest {

    @NotBlank(message = "Action type is required")
    private String action;

    private String emailContent;
    private String subject;
    private String recipient;
    private String sender;
    private String tone;
    private String additionalContext;
    private String replyTo;
    private String originalEmail;

    public EmailRequest() {}

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getEmailContent() { return emailContent; }
    public void setEmailContent(String emailContent) { this.emailContent = emailContent; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getRecipient() { return recipient; }
    public void setRecipient(String recipient) { this.recipient = recipient; }

    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }

    public String getTone() { return tone; }
    public void setTone(String tone) { this.tone = tone; }

    public String getAdditionalContext() { return additionalContext; }
    public void setAdditionalContext(String additionalContext) { this.additionalContext = additionalContext; }

    public String getReplyTo() { return replyTo; }
    public void setReplyTo(String replyTo) { this.replyTo = replyTo; }

    public String getOriginalEmail() { return originalEmail; }
    public void setOriginalEmail(String originalEmail) { this.originalEmail = originalEmail; }
}
