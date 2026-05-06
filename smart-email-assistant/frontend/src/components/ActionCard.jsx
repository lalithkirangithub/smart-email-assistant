import React from 'react';

const ActionCard = ({ action, isSelected, onClick }) => {
  return (
    <button
      onClick={() => onClick(action.id)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 16px',
        background: isSelected
          ? 'linear-gradient(135deg, rgba(124,106,247,0.2), rgba(94,234,212,0.1))'
          : 'rgba(255,255,255,0.02)',
        border: `1px solid ${isSelected ? 'rgba(124,106,247,0.5)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: '10px',
        cursor: 'pointer',
        textAlign: 'left',
        color: isSelected ? '#f0eeff' : '#8b8aac',
        transition: 'all 0.2s ease',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
          e.currentTarget.style.color = '#f0eeff';
          e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        }
      }}
      onMouseLeave={e => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
          e.currentTarget.style.color = '#8b8aac';
          e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
        }
      }}
    >
      {isSelected && (
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '3px',
          background: 'linear-gradient(to bottom, #7c6af7, #5eead4)',
          borderRadius: '10px 0 0 10px',
        }} />
      )}
      <span style={{ fontSize: '18px' }}>{action.icon}</span>
      <div>
        <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.02em' }}>
          {action.label}
        </div>
        <div style={{ fontSize: '11px', marginTop: '2px', opacity: 0.7, fontFamily: 'DM Mono, monospace' }}>
          {action.description}
        </div>
      </div>
    </button>
  );
};

export default ActionCard;
