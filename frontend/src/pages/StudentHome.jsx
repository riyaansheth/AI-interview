import React from 'react'
import { useNavigate } from 'react-router-dom'

function StudentHome() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconRow}>🎙️</div>
        <h1 style={styles.title}>AI Video Interview Bot</h1>
        <p style={styles.subtitle}>
          Practice mock interviews with an AI-powered voice bot.
          Get real-time scoring and feedback on your answers.
        </p>
        <div style={styles.featureList}>
          <div style={styles.feature}>🎥 Live webcam session</div>
          <div style={styles.feature}>🤖 AI voice questions</div>
          <div style={styles.feature}>📊 Instant scoring & feedback</div>
          <div style={styles.feature}>📁 Interview history</div>
        </div>
        <button style={styles.primaryBtn} onClick={() => navigate('/setup')}>
          Start Interview
        </button>
        <button style={styles.secondaryBtn} onClick={() => navigate('/history')}>
          View History
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '2rem',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  },
  card: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '1.5rem',
    padding: '3rem 2.5rem',
    maxWidth: '480px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
  },
  iconRow: {
    fontSize: '3.5rem',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#94a3b8',
    lineHeight: '1.6',
    marginBottom: '2rem',
  },
  featureList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginBottom: '2rem',
    textAlign: 'left',
  },
  feature: {
    background: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '0.5rem',
    padding: '0.75rem 1rem',
    fontSize: '0.95rem',
    color: '#cbd5e1',
  },
  primaryBtn: {
    width: '100%',
    padding: '0.9rem',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '0.75rem',
    marginBottom: '0.75rem',
    transition: 'opacity 0.2s',
  },
  secondaryBtn: {
    width: '100%',
    padding: '0.9rem',
    background: 'transparent',
    color: '#94a3b8',
    fontSize: '1rem',
    fontWeight: '500',
    borderRadius: '0.75rem',
    border: '1px solid #334155',
    transition: 'border-color 0.2s',
  },
}

export default StudentHome