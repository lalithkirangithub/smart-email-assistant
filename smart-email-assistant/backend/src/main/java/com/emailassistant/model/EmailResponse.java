package com.emailassistant.model;

public class EmailResponse {

    private boolean success;
    private String result;
    private String action;
    private String error;
    private long processingTimeMs;

    public EmailResponse() {}

    public EmailResponse(boolean success, String result, String action) {
        this.success = success;
        this.result = result;
        this.action = action;
    }

    public static EmailResponse success(String result, String action, long timeMs) {
        EmailResponse r = new EmailResponse(true, result, action);
        r.setProcessingTimeMs(timeMs);
        return r;
    }

    public static EmailResponse error(String errorMessage) {
        EmailResponse r = new EmailResponse();
        r.setSuccess(false);
        r.setError(errorMessage);
        return r;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getResult() { return result; }
    public void setResult(String result) { this.result = result; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getError() { return error; }
    public void setError(String error) { this.error = error; }

    public long getProcessingTimeMs() { return processingTimeMs; }
    public void setProcessingTimeMs(long processingTimeMs) { this.processingTimeMs = processingTimeMs; }
}
