import React from 'react'
import { useNavigate } from 'react-router-dom'

function InterviewSetup() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>⚙️ Interview Setup</h2>
        <p style={styles.subtitle}>This page will have role and difficulty selection.</p>
        <button style={styles.btn} onClick={() => navigate('/')}>← Back to Home</button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    minHeight: '100vh', background: '#0f172a',
  },
  card: {
    background: '#1e293b', border: '1px solid #334155', borderRadius: '1.5rem',
    padding: '3rem 2.5rem', maxWidth: '480px', width: '100%', textAlign: 'center',
  },
  title: { fontSize: '1.8rem', color: '#f1f5f9', marginBottom: '1rem' },
  subtitle: { color: '#94a3b8', marginBottom: '2rem' },
  btn: {
    padding: '0.75rem 1.5rem', background: '#334155', color: '#f1f5f9',
    borderRadius: '0.75rem', fontSize: '0.95rem',
  },
}

export default InterviewSetup