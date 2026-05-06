package com.emailassistant.service;

import com.emailassistant.model.GroqRequest;
import com.emailassistant.model.GroqResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class GroqService {

    private static final Logger logger = LoggerFactory.getLogger(GroqService.class);

    @Value("${groq.api.url}")
    private String groqApiUrl;

    @Value("${groq.api.key}")
    private String groqApiKey;

    @Value("${groq.api.model}")
    private String groqModel;

    private final RestTemplate restTemplate;

    public GroqService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String callGroqApi(String systemPrompt, String userPrompt) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + groqApiKey);

            List<GroqRequest.Message> messages = List.of(
                    new GroqRequest.Message("system", systemPrompt),
                    new GroqRequest.Message("user", userPrompt)
            );

            GroqRequest request = new GroqRequest(groqModel, messages, 1500, 0.7);
            HttpEntity<GroqRequest> entity = new HttpEntity<>(request, headers);

            logger.debug("Sending request to Groq API: model={}", groqModel);

            ResponseEntity<GroqResponse> response = restTemplate.exchange(
                    groqApiUrl,
                    HttpMethod.POST,
                    entity,
                    GroqResponse.class
            );

            if (response.getBody() != null) {
                String content = response.getBody().getFirstChoiceContent();
                logger.debug("Received response from Groq API successfully");
                return content;
            }

            throw new RuntimeException("Empty response from Groq API");

        } catch (HttpClientErrorException e) {
            logger.error("Groq API client error: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
            if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                throw new RuntimeException("Invalid Groq API key. Please check your configuration.");
            } else if (e.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS) {
                throw new RuntimeException("Groq API rate limit exceeded. Please try again later.");
            }
            throw new RuntimeException("Groq API error: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Error calling Groq API: {}", e.getMessage());
            throw new RuntimeException("Failed to communicate with Groq API: " + e.getMessage());
        }
    }
}
