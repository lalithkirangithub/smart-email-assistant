import React from 'react';

const LoadingSpinner = ({ message = 'Processing with Groq AI...' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px',
      gap: '20px',
    }}>
      <div style={{ position: 'relative', width: '52px', height: '52px' }}>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes pulse-ring {
            0% { transform: scale(0.8); opacity: 1; }
            100% { transform: scale(1.6); opacity: 0; }
          }
        `}</style>
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '2px solid rgba(124,106,247,0.15)',
          animation: 'pulse-ring 1.5s ease-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: '#7c6af7',
          borderRightColor: '#5eead4',
          animation: 'spin 0.9s linear infinite',
        }} />
        <div style={{
          position: 'absolute',
          inset: '8px',
          borderRadius: '50%',
          border: '1.5px solid transparent',
          borderTopColor: 'rgba(94,234,212,0.4)',
          animation: 'spin 1.4s linear infinite reverse',
        }} />
      </div>

      <div style={{ textAlign: 'center' }}>
        <p style={{
          color: '#8b8aac',
          fontSize: '13px',
          fontFamily: 'DM Mono, monospace',
          letterSpacing: '0.08em',
        }}>
          {message}
        </p>
        
      </div>
    </div>
  );
};

export default LoadingSpinner;
