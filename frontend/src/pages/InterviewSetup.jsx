import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const JOB_ROLES = [
  { id: 'frontend', label: 'Frontend Developer', icon: '🖥️' },
  { id: 'backend', label: 'Backend Developer', icon: '⚙️' },
  { id: 'fullstack', label: 'Full Stack Developer', icon: '🔧' },
  { id: 'data_scientist', label: 'Data Scientist', icon: '📊' },
  { id: 'devops', label: 'DevOps Engineer', icon: '🚀' },
  { id: 'product_manager', label: 'Product Manager', icon: '📋' },
]

const DIFFICULTIES = [
  { id: 'easy', label: 'Easy', desc: 'Basic concepts, ideal for beginners', color: '#22c55e' },
  { id: 'medium', label: 'Medium', desc: 'Intermediate questions with depth', color: '#f59e0b' },
  { id: 'hard', label: 'Hard', desc: 'Advanced, senior-level questions', color: '#ef4444' },
]

function InterviewSetup() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)

  const canProceed = selectedRole && selectedDifficulty

  function handleStart() {
    if (!canProceed) return
    navigate('/session', {
      state: { role: selectedRole, difficulty: selectedDifficulty }
    })
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <button style={styles.backBtn} onClick={() => navigate('/')}>← Back</button>

        <h2 style={styles.title}>⚙️ Interview Setup</h2>
        <p style={styles.subtitle}>Choose your role and difficulty to begin</p>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Select Job Role</h3>
          <div style={styles.roleGrid}>
            {JOB_ROLES.map(role => (
              <button
                key={role.id}
                style={{
                  ...styles.roleCard,
                  ...(selectedRole?.id === role.id ? styles.roleCardActive : {})
                }}
                onClick={() => setSelectedRole(role)}
              >
                <span style={styles.roleIcon}>{role.icon}</span>
                <span style={styles.roleLabel}>{role.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Select Difficulty</h3>
          <div style={styles.difficultyList}>
            {DIFFICULTIES.map(diff => (
              <button
                key={diff.id}
                style={{
                  ...styles.diffCard,
                  ...(selectedDifficulty?.id === diff.id ? {
                    ...styles.diffCardActive,
                    borderColor: diff.color,
                    boxShadow: '0 0 0 1px ' + diff.color,
                  } : {})
                }}
                onClick={() => setSelectedDifficulty(diff)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ ...styles.diffDot, background: diff.color }} />
                  <div style={styles.diffLabel}>{diff.label}</div>
                </div>
                <div style={styles.diffDesc}>{diff.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {selectedRole && selectedDifficulty && (
          <div style={styles.summary}>
            ✅ <strong>{selectedRole.label}</strong> — <strong>{selectedDifficulty.label}</strong> difficulty
          </div>
        )}

        <button
          style={{ ...styles.startBtn, opacity: canProceed ? 1 : 0.4 }}
          onClick={handleStart}
          disabled={!canProceed}
        >
          Start Interview →
        </button>

      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    minHeight: '100vh', padding: '2rem',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  },
  card: {
    background: '#1e293b', border: '1px solid #334155', borderRadius: '1.5rem',
    padding: '2.5rem', maxWidth: '560px', width: '100%',
    boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
  },
  backBtn: {
    background: 'transparent', border: 'none', color: '#94a3b8',
    fontSize: '0.9rem', cursor: 'pointer', padding: '0',
    marginBottom: '1.5rem', display: 'block',
  },
  title: { fontSize: '1.8rem', fontWeight: '700', color: '#f1f5f9', marginBottom: '0.5rem' },
  subtitle: { color: '#94a3b8', fontSize: '0.95rem', marginBottom: '2rem' },
  section: { marginBottom: '2rem' },
  sectionTitle: {
    fontSize: '0.85rem', fontWeight: '600', color: '#64748b',
    textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem',
  },
  roleGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' },
  roleCard: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
    padding: '1rem', background: '#0f172a', border: '1px solid #334155',
    borderRadius: '0.75rem', cursor: 'pointer', color: '#cbd5e1',
    fontSize: '0.85rem', fontWeight: '500',
  },
  roleCardActive: {
    border: '1px solid #6366f1', background: '#1e1b4b',
    boxShadow: '0 0 0 1px #6366f1', color: '#a5b4fc',
  },
  roleIcon: { fontSize: '1.5rem' },
  roleLabel: { textAlign: 'center', lineHeight: '1.3' },
  difficultyList: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  diffCard: {
    padding: '1rem', background: '#0f172a', border: '1px solid #334155',
    borderRadius: '0.75rem', cursor: 'pointer', textAlign: 'left',
  },
  diffCardActive: { background: '#0f172a' },
  diffDot: { width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0 },
  diffLabel: { fontWeight: '600', color: '#f1f5f9', fontSize: '0.95rem' },
  diffDesc: { color: '#64748b', fontSize: '0.82rem', marginTop: '0.35rem', paddingLeft: '1.6rem' },
  summary: {
    background: '#0f172a', border: '1px solid #334155', borderRadius: '0.75rem',
    padding: '0.75rem 1rem', color: '#94a3b8', fontSize: '0.9rem',
    marginBottom: '1.5rem',
  },
  startBtn: {
    width: '100%', padding: '0.9rem',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff', fontSize: '1rem', fontWeight: '600',
    borderRadius: '0.75rem', border: 'none', cursor: 'pointer',
  },
}

export default InterviewSetup