package com.emailassistant.service;

import com.emailassistant.model.EmailRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    private final GroqService groqService;

    public EmailService(GroqService groqService) {
        this.groqService = groqService;
    }

    public String processEmailAction(EmailRequest request) {
        logger.info("Processing email action: {}", request.getAction());

        return switch (request.getAction().toLowerCase()) {
            case "compose"        -> composeEmail(request);
            case "reply"          -> replyToEmail(request);
            case "summarize"      -> summarizeEmail(request);
            case "improve"        -> improveEmail(request);
            case "subject"        -> generateSubject(request);
            case "tone_check"     -> checkTone(request);
            case "translate"      -> translateEmail(request);
            case "bullet_points"  -> extractBulletPoints(request);
            case "formal"         -> makeFormal(request);
            case "casual"         -> makeCasual(request);
            default               -> throw new IllegalArgumentException("Unknown action: " + request.getAction());
        };
    }

    private String composeEmail(EmailRequest request) {
        String systemPrompt = """
                You are an expert email writer. Compose professional, clear, and effective emails.
                Always structure your response as a complete email with:
                - Subject line (if not provided)
                - Greeting
                - Body paragraphs
                - Professional closing
                - Signature placeholder
                Adapt the tone based on the user's requirements.
                """;

        StringBuilder userPrompt = new StringBuilder("Compose an email with the following details:\n");
        if (request.getSubject() != null && !request.getSubject().isBlank())
            userPrompt.append("Subject: ").append(request.getSubject()).append("\n");
        if (request.getRecipient() != null && !request.getRecipient().isBlank())
            userPrompt.append("To: ").append(request.getRecipient()).append("\n");
        if (request.getSender() != null && !request.getSender().isBlank())
            userPrompt.append("From: ").append(request.getSender()).append("\n");
        if (request.getTone() != null && !request.getTone().isBlank())
            userPrompt.append("Tone: ").append(request.getTone()).append("\n");
        if (request.getAdditionalContext() != null && !request.getAdditionalContext().isBlank())
            userPrompt.append("Content/Purpose: ").append(request.getAdditionalContext()).append("\n");

        return groqService.callGroqApi(systemPrompt, userPrompt.toString());
    }

    private String replyToEmail(EmailRequest request) {
        String systemPrompt = """
                You are an expert email writer specializing in crafting thoughtful, professional replies.
                When given an original email, compose a well-structured reply that:
                - Acknowledges the original message
                - Addresses all points raised
                - Maintains appropriate tone
                - Is concise yet complete
                Format as a complete ready-to-send email reply.
                """;

        StringBuilder userPrompt = new StringBuilder("Write a reply to the following email:\n\n");
        if (request.getOriginalEmail() != null && !request.getOriginalEmail().isBlank())
            userPrompt.append("Original Email:\n").append(request.getOriginalEmail()).append("\n\n");
        if (request.getTone() != null && !request.getTone().isBlank())
            userPrompt.append("Reply tone: ").append(request.getTone()).append("\n");
        if (request.getAdditionalContext() != null && !request.getAdditionalContext().isBlank())
            userPrompt.append("Additional instructions: ").append(request.getAdditionalContext()).append("\n");

        return groqService.callGroqApi(systemPrompt, userPrompt.toString());
    }

    private String summarizeEmail(EmailRequest request) {
        String systemPrompt = """
                You are an expert at summarizing email content clearly and concisely.
                Provide a structured summary that includes:
                1. Key Points (bullet points)
                2. Action Items (if any)
                3. Important Dates/Deadlines (if any)
                4. Overall Sentiment
                Keep the summary brief but comprehensive.
                """;

        String userPrompt = "Summarize the following email:\n\n" + request.getEmailContent();
        return groqService.callGroqApi(systemPrompt, userPrompt);
    }

    private String improveEmail(EmailRequest request) {
        String systemPrompt = """
                You are a professional editor specializing in business communication.
                Improve the given email by:
                - Enhancing clarity and conciseness
                - Fixing grammar and spelling errors
                - Improving sentence structure
                - Making it more professional and impactful
                - Ensuring proper email etiquette
                Return the improved version of the complete email.
                """;

        StringBuilder userPrompt = new StringBuilder("Improve the following email:\n\n");
        userPrompt.append(request.getEmailContent());
        if (request.getAdditionalContext() != null && !request.getAdditionalContext().isBlank())
            userPrompt.append("\n\nSpecific improvements needed: ").append(request.getAdditionalContext());

        return groqService.callGroqApi(systemPrompt, userPrompt.toString());
    }

    private String generateSubject(EmailRequest request) {
        String systemPrompt = """
                You are an expert at writing compelling email subject lines.
                Generate 5 different subject line options that are:
                - Clear and descriptive
                - Attention-grabbing but not clickbait
                - Appropriate length (under 60 characters each)
                - Relevant to the email content
                Format as a numbered list with brief explanation for each.
                """;

        String userPrompt = "Generate subject lines for this email:\n\n" + request.getEmailContent();
        return groqService.callGroqApi(systemPrompt, userPrompt);
    }

    private String checkTone(EmailRequest request) {
        String systemPrompt = """
                You are an expert in professional communication and tone analysis.
                Analyze the tone of the given email and provide:
                1. Overall tone assessment
                2. Specific phrases that set the tone (positive and negative)
                3. Emotional indicators
                4. Professionalism rating (1-10)
                5. Recommendations to improve tone
                Be specific and constructive in your analysis.
                """;

        String userPrompt = "Analyze the tone of this email:\n\n" + request.getEmailContent();
        return groqService.callGroqApi(systemPrompt, userPrompt);
    }

    private String translateEmail(EmailRequest request) {
        String targetLanguage = request.getAdditionalContext() != null ? request.getAdditionalContext() : "Spanish";
        String systemPrompt = """
                You are a professional translator specializing in business communication.
                Translate the given email accurately while:
                - Preserving the original meaning and tone
                - Adapting cultural nuances appropriately
                - Maintaining professional business language
                - Keeping proper email formatting
                Provide only the translated email, preserving all formatting.
                """;

        String userPrompt = String.format("Translate the following email to %s:\n\n%s",
                targetLanguage, request.getEmailContent());
        return groqService.callGroqApi(systemPrompt, userPrompt);
    }

    private String extractBulletPoints(EmailRequest request) {
        String systemPrompt = """
                You are an expert at extracting and organizing key information.
                Extract and organize the main points from the email into:
                - Key Information
                - Action Required
                - Decisions Needed
                - Follow-up Items
                - Important Dates
                Use clear, concise bullet points. Skip sections that don't apply.
                """;

        String userPrompt = "Extract key bullet points from this email:\n\n" + request.getEmailContent();
        return groqService.callGroqApi(systemPrompt, userPrompt);
    }

    private String makeFormal(EmailRequest request) {
        String systemPrompt = """
                You are an expert at transforming casual communication into formal business language.
                Convert the email to formal style by:
                - Using formal salutations and closings
                - Replacing casual language with professional alternatives
                - Maintaining proper grammar and punctuation
                - Structuring sentences formally
                - Removing contractions and slang
                Return the complete formally written email.
                """;

        String userPrompt = "Convert this email to formal style:\n\n" + request.getEmailContent();
        return groqService.callGroqApi(systemPrompt, userPrompt);
    }

    private String makeCasual(EmailRequest request) {
        String systemPrompt = """
                You are an expert at making professional emails more friendly and casual.
                Make the email more casual and approachable by:
                - Using friendly, conversational language
                - Adding warmth while remaining professional
                - Using contractions naturally
                - Making the tone more personal
                - Keeping it genuine and not overly casual
                Return the complete casually rewritten email.
                """;

        String userPrompt = "Make this email more casual and friendly:\n\n" + request.getEmailContent();
        return groqService.callGroqApi(systemPrompt, userPrompt);
    }
}
