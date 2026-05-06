import React, { useState } from 'react';

const TONES = ['Professional', 'Friendly', 'Formal', 'Casual', 'Assertive', 'Empathetic', 'Concise'];
const LANGUAGES = ['Spanish', 'French', 'German', 'Portuguese', 'Italian', 'Japanese', 'Chinese', 'Arabic', 'Hindi'];

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px',
  color: '#f0eeff',
  fontSize: '13px',
  fontFamily: 'DM Mono, monospace',
  resize: 'vertical',
};

const labelStyle = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  color: '#4e4d68',
  marginBottom: '8px',
  textTransform: 'uppercase',
};

const EmailForm = ({ selectedAction, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    emailContent: '',
    originalEmail: '',
    subject: '',
    recipient: '',
    sender: '',
    tone: 'Professional',
    additionalContext: '',
    translateTo: 'Spanish',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const payload = { action: selectedAction.id };

    switch (selectedAction.id) {
      case 'compose':
        payload.subject = formData.subject;
        payload.recipient = formData.recipient;
        payload.sender = formData.sender;
        payload.tone = formData.tone;
        payload.additionalContext = formData.additionalContext;
        break;
      case 'reply':
        payload.originalEmail = formData.originalEmail;
        payload.tone = formData.tone;
        payload.additionalContext = formData.additionalContext;
        break;
      case 'translate':
        payload.emailContent = formData.emailContent;
        payload.additionalContext = formData.translateTo;
        break;
      default:
        payload.emailContent = formData.emailContent;
        payload.additionalContext = formData.additionalContext;
    }

    onSubmit(payload);
  };

  const isValid = () => {
    if (selectedAction.id === 'compose') {
      return formData.additionalContext.trim().length > 0;
    }
    if (selectedAction.id === 'reply') {
      return formData.originalEmail.trim().length > 0;
    }
    return formData.emailContent.trim().length > 0;
  };

  const renderFields = () => {
    switch (selectedAction.id) {
      case 'compose':
        return (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Recipient</label>
                <input
                  type="text"
                  placeholder="e.g. John Smith, Manager"
                  value={formData.recipient}
                  onChange={e => handleChange('recipient', e.target.value)}
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>
              <div>
                <label style={labelStyle}>Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Jane Doe"
                  value={formData.sender}
                  onChange={e => handleChange('sender', e.target.value)}
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Subject</label>
              <input
                type="text"
                placeholder="Email subject (optional - AI will suggest one)"
                value={formData.subject}
                onChange={e => handleChange('subject', e.target.value)}
                style={{ ...inputStyle, resize: 'none' }}
              />
            </div>
            <div>
              <label style={labelStyle}>Tone</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {TONES.map(tone => (
                  <button
                    key={tone}
                    onClick={() => handleChange('tone', tone)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      border: `1px solid ${formData.tone === tone ? 'rgba(124,106,247,0.6)' : 'rgba(255,255,255,0.08)'}`,
                      background: formData.tone === tone ? 'rgba(124,106,247,0.15)' : 'transparent',
                      color: formData.tone === tone ? '#c4b9ff' : '#8b8aac',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 600,
                    }}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={labelStyle}>Purpose / Content *</label>
              <textarea
                rows={5}
                placeholder="Describe what the email should be about. E.g: Request a meeting to discuss Q4 targets, mention availability next Tuesday or Wednesday afternoon."
                value={formData.additionalContext}
                onChange={e => handleChange('additionalContext', e.target.value)}
                style={inputStyle}
              />
            </div>
          </>
        );

      case 'reply':
        return (
          <>
            <div>
              <label style={labelStyle}>Original Email *</label>
              <textarea
                rows={6}
                placeholder="Paste the email you want to reply to..."
                value={formData.originalEmail}
                onChange={e => handleChange('originalEmail', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Reply Tone</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {TONES.map(tone => (
                  <button
                    key={tone}
                    onClick={() => handleChange('tone', tone)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      border: `1px solid ${formData.tone === tone ? 'rgba(124,106,247,0.6)' : 'rgba(255,255,255,0.08)'}`,
                      background: formData.tone === tone ? 'rgba(124,106,247,0.15)' : 'transparent',
                      color: formData.tone === tone ? '#c4b9ff' : '#8b8aac',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 600,
                    }}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={labelStyle}>Additional Instructions</label>
              <textarea
                rows={3}
                placeholder="Any specific points to include or avoid in the reply..."
                value={formData.additionalContext}
                onChange={e => handleChange('additionalContext', e.target.value)}
                style={inputStyle}
              />
            </div>
          </>
        );

      case 'translate':
        return (
          <>
            <div>
              <label style={labelStyle}>Email Content *</label>
              <textarea
                rows={6}
                placeholder="Paste the email to translate..."
                value={formData.emailContent}
                onChange={e => handleChange('emailContent', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Translate To</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {LANGUAGES.map(lang => (
                  <button
                    key={lang}
                    onClick={() => handleChange('translateTo', lang)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      border: `1px solid ${formData.translateTo === lang ? 'rgba(94,234,212,0.6)' : 'rgba(255,255,255,0.08)'}`,
                      background: formData.translateTo === lang ? 'rgba(94,234,212,0.1)' : 'transparent',
                      color: formData.translateTo === lang ? '#5eead4' : '#8b8aac',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 600,
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </>
        );

      default:
        return (
          <>
            <div>
              <label style={labelStyle}>Email Content *</label>
              <textarea
                rows={8}
                placeholder={`Paste the email you want to ${selectedAction.label.toLowerCase()}...`}
                value={formData.emailContent}
                onChange={e => handleChange('emailContent', e.target.value)}
                style={inputStyle}
              />
            </div>
            {['improve', 'tone_check'].includes(selectedAction.id) && (
              <div>
                <label style={labelStyle}>Additional Instructions (optional)</label>
                <textarea
                  rows={3}
                  placeholder="Any specific requirements or focus areas..."
                  value={formData.additionalContext}
                  onChange={e => handleChange('additionalContext', e.target.value)}
                  style={inputStyle}
                />
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Action Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 18px',
        background: 'rgba(124,106,247,0.07)',
        border: '1px solid rgba(124,106,247,0.2)',
        borderRadius: '12px',
      }}>
        <span style={{ fontSize: '20px' }}>{selectedAction.icon}</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: '15px', color: '#f0eeff' }}>
            {selectedAction.label}
          </div>
          <div style={{ fontSize: '12px', color: '#8b8aac', fontFamily: 'DM Mono, monospace' }}>
            {selectedAction.description}
          </div>
        </div>
      </div>

      {renderFields()}

      <button
        onClick={handleSubmit}
        disabled={!isValid() || loading}
        style={{
          padding: '14px 24px',
          background: isValid() && !loading
            ? 'linear-gradient(135deg, #7c6af7, #5eead4)'
            : 'rgba(255,255,255,0.05)',
          border: 'none',
          borderRadius: '10px',
          color: isValid() && !loading ? '#080810' : '#4e4d68',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: '13px',
          letterSpacing: '0.1em',
          cursor: isValid() && !loading ? 'pointer' : 'not-allowed',
          transition: 'all 0.3s ease',
          textTransform: 'uppercase',
        }}
      >
        {loading ? 'PROCESSING...' : `RUN ${selectedAction.label.toUpperCase()}`}
      </button>
    </div>
  );
};

export default EmailForm;
