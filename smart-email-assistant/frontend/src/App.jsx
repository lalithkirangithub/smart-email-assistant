import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import ActionCard from './components/ActionCard.jsx'
import EmailForm from './components/EmailForm.jsx'
import ResultPanel from './components/ResultPanel.jsx'
import LoadingSpinner from './components/LoadingSpinner.jsx'
import { useEmailAssistant } from './hooks/useEmailAssistant.js'

const ACTIONS = [
  { id: 'compose',       label: 'Compose',       icon: '✍️',  description: 'Write a new email from scratch' },
  { id: 'reply',         label: 'Reply',         icon: '↩️',  description: 'Generate a smart reply' },
  { id: 'summarize',     label: 'Summarize',     icon: '📋',  description: 'Get key points instantly' },
  { id: 'improve',       label: 'Improve',       icon: '✨',  description: 'Polish grammar & clarity' },
  { id: 'subject',       label: 'Subject Lines', icon: '🎯',  description: 'Generate 5 subject options' },
  { id: 'tone_check',    label: 'Tone Check',    icon: '🎭',  description: 'Analyze tone & sentiment' },
  { id: 'translate',     label: 'Translate',     icon: '🌍',  description: 'Translate to any language' },
  { id: 'bullet_points', label: 'Key Points',    icon: '📌',  description: 'Extract actionable items' },
  { id: 'formal',        label: 'Make Formal',   icon: '🏛️',  description: 'Convert to formal style' },
  { id: 'casual',        label: 'Make Casual',   icon: '😊',  description: 'Make it friendly & warm' },
];

export default function App() {
  const [selectedAction, setSelectedAction] = useState(ACTIONS[0]);
  const { loading, result, error, processingTime, processEmail, clearResult } = useEmailAssistant();

  const handleActionSelect = (actionId) => {
    const action = ACTIONS.find(a => a.id === actionId);
    setSelectedAction(action);
    clearResult();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #080810 0%, #0d0d1f 50%, #080810 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background orbs */}
      <div style={{
        position: 'fixed',
        top: '-200px',
        left: '-100px',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,106,247,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed',
        bottom: '-150px',
        right: '-100px',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(94,234,212,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <Toaster position="top-right" />

      {/* Header */}
      <header style={{
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '0 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        backdropFilter: 'blur(20px)',
        background: 'rgba(8,8,16,0.6)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #7c6af7, #5eead4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}>
            ⚡
          </div>
          <div>
            <div style={{
              fontFamily: 'Instrument Serif, serif',
              fontSize: '20px',
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #c4b9ff, #5eead4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
            }}>
              MailMind
            </div>
            <div style={{
              fontSize: '10px',
              color: '#4e4d68',
              letterSpacing: '0.15em',
              fontFamily: 'DM Mono, monospace',
            }}>
              AI EMAIL ASSISTANT
            </div>
          </div>
        </div>


      </header>

      {/* Main layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        gap: '0',
        maxWidth: '1200px',
        margin: '0 auto',
        minHeight: 'calc(100vh - 64px)',
      }}>
        {/* Sidebar */}
        <aside style={{
          borderRight: '1px solid rgba(255,255,255,0.05)',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          overflowY: 'auto',
        }}>
          <div style={{
            fontSize: '10px',
            fontWeight: 700,
            color: '#4e4d68',
            letterSpacing: '0.15em',
            padding: '0 8px',
            marginBottom: '8px',
          }}>
            ACTIONS
          </div>
          {ACTIONS.map(action => (
            <ActionCard
              key={action.id}
              action={action}
              isSelected={selectedAction.id === action.id}
              onClick={handleActionSelect}
            />
          ))}


        </aside>

        {/* Main content */}
        <main style={{ padding: '32px 40px', overflowY: 'auto' }}>
          {/* Page title */}
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{
              fontFamily: 'Instrument Serif, serif',
              fontSize: '32px',
              fontStyle: 'italic',
              color: '#f0eeff',
              marginBottom: '6px',
            }}>
              {selectedAction.icon} {selectedAction.label}
            </h1>
            <p style={{ color: '#8b8aac', fontFamily: 'DM Mono, monospace', fontSize: '13px' }}>
              {selectedAction.description}
            </p>
          </div>

          {/* Form */}
          <div style={{
            background: 'rgba(12,12,22,0.8)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            padding: '28px',
            marginBottom: '24px',
            backdropFilter: 'blur(10px)',
          }}>
            <EmailForm
              selectedAction={selectedAction}
              onSubmit={processEmail}
              loading={loading}
            />
          </div>

          {/* Loading */}
          {loading && (
            <div style={{
              background: 'rgba(12,12,22,0.8)',
              border: '1px solid rgba(124,106,247,0.15)',
              borderRadius: '16px',
              marginBottom: '24px',
            }}>
              <LoadingSpinner />
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div style={{
              padding: '20px 24px',
              background: 'rgba(248,113,113,0.05)',
              border: '1px solid rgba(248,113,113,0.2)',
              borderRadius: '16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
            }}>
              <span style={{ fontSize: '18px' }}>⚠️</span>
              <div>
                <p style={{ color: '#f87171', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>
                  Error
                </p>
                <p style={{ color: '#8b8aac', fontSize: '13px', fontFamily: 'DM Mono, monospace' }}>
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Result */}
          {result && !loading && (
            <ResultPanel
              result={result}
              processingTime={processingTime}
              onClear={clearResult}
            />
          )}
        </main>
      </div>
    </div>
  );
}
