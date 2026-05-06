import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ResultPanel = ({ result, processingTime, onClear }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      toast.success('Copied to clipboard!', {
        style: { background: '#12121f', color: '#f0eeff', border: '1px solid rgba(94,234,212,0.3)' },
        iconTheme: { primary: '#5eead4', secondary: '#080810' },
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{
      background: 'rgba(18,18,31,0.9)',
      border: '1px solid rgba(124,106,247,0.2)',
      borderRadius: '16px',
      overflow: 'hidden',
      animation: 'fadeIn 0.4s ease',
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(124,106,247,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#5eead4',
            boxShadow: '0 0 8px rgba(94,234,212,0.8)',
          }} />
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#f0eeff', letterSpacing: '0.05em' }}>
            AI RESULT
          </span>
          {processingTime && (
            <span style={{
              fontSize: '11px',
              color: '#4e4d68',
              fontFamily: 'DM Mono, monospace',
              background: 'rgba(255,255,255,0.04)',
              padding: '2px 8px',
              borderRadius: '4px',
            }}>
              {processingTime}ms
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleCopy}
            style={{
              padding: '6px 14px',
              background: copied ? 'rgba(94,234,212,0.15)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${copied ? 'rgba(94,234,212,0.4)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '6px',
              color: copied ? '#5eead4' : '#8b8aac',
              cursor: 'pointer',
              fontSize: '12px',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            {copied ? '✓ COPIED' : 'COPY'}
          </button>
          <button
            onClick={onClear}
            style={{
              padding: '6px 14px',
              background: 'rgba(248,113,113,0.05)',
              border: '1px solid rgba(248,113,113,0.2)',
              borderRadius: '6px',
              color: '#f87171',
              cursor: 'pointer',
              fontSize: '12px',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{
        padding: '24px',
        maxHeight: '450px',
        overflowY: 'auto',
      }}>
        <pre style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '13.5px',
          lineHeight: '1.8',
          color: '#d4d3f0',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}>
          {result}
        </pre>
      </div>
    </div>
  );
};

export default ResultPanel;
