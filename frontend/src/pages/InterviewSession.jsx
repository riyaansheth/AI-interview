import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function InterviewSession() {
  const navigate = useNavigate()
  const location = useLocation()
  const { role, difficulty } = location.state || {}

  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const [camError, setCamError] = useState(null)
  const [camReady, setCamReady] = useState(false)

  useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [])

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setCamReady(true)
    } catch (err) {
      setCamError('Could not access camera or microphone. Please allow permissions and refresh.')
      console.error(err)
    }
  }

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
    }
  }

  function handleEndInterview() {
    stopCamera()
    navigate('/')
  }

  if (!role || !difficulty) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>⚠️ No Interview Data</h2>
          <p style={styles.subtitle}>Please start from the setup page.</p>
          <button style={styles.btn} onClick={() => navigate('/setup')}>Go to Setup</button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>

      <div style={styles.topBar}>
        <div style={styles.topBarLeft}>
          <span style={styles.roleBadge}>{role.icon} {role.label}</span>
          <span style={styles.diffBadge}>{difficulty.label}</span>
        </div>
        <button style={styles.endBtn} onClick={handleEndInterview}>
          End Interview
        </button>
      </div>

      <div style={styles.mainLayout}>

        <div style={styles.videoSection}>
          <div style={styles.videoWrapper}>
            {camError ? (
              <div style={styles.camError}>
                <span style={{ fontSize: '2rem' }}>📷</span>
                <p>{camError}</p>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  style={styles.video}
                />
                {!camReady && (
                  <div style={styles.camLoading}>
                    <p>Starting camera...</p>
                  </div>
                )}
              </>
            )}
            <div style={styles.videoLabel}>You</div>
            {camReady && <div style={styles.liveIndicator}><span style={styles.liveDot} />LIVE</div>}
          </div>
        </div>

        <div style={styles.rightPanel}>

          <div style={styles.botCard}>
            <div style={styles.botAvatar}>🤖</div>
            <div style={styles.botName}>AI Interviewer</div>
            <div style={styles.botStatus}>Ready</div>
          </div>

          <div style={styles.questionCard}>
            <div style={styles.questionLabel}>Question</div>
            <p style={styles.questionText}>
              Questions will appear here once the interview begins.
            </p>
          </div>

          <div style={styles.controlsCard}>
            <div style={styles.statusRow}>
              <div style={styles.statusItem}>
                <div style={{ ...styles.statusDot, background: camReady ? '#22c55e' : '#64748b' }} />
                <span>Camera</span>
              </div>
              <div style={styles.statusItem}>
                <div style={{ ...styles.statusDot, background: camReady ? '#22c55e' : '#64748b' }} />
                <span>Microphone</span>
              </div>
            </div>

            <button style={styles.recordBtn} disabled={!camReady}>
              🎙️ Hold to Answer
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}

const styles = {
  container: {
    display: 'flex', flexDirection: 'column',
    minHeight: '100vh', background: '#0f172a', color: '#f1f5f9',
  },
  topBar: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '1rem 2rem', background: '#1e293b', borderBottom: '1px solid #334155',
  },
  topBarLeft: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  roleBadge: {
    background: '#1e1b4b', border: '1px solid #6366f1', color: '#a5b4fc',
    padding: '0.35rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '600',
  },
  diffBadge: {
    background: '#0f172a', border: '1px solid #334155', color: '#94a3b8',
    padding: '0.35rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem',
  },
  endBtn: {
    background: '#7f1d1d', border: '1px solid #ef4444', color: '#fca5a5',
    padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontSize: '0.9rem',
    cursor: 'pointer', fontWeight: '600',
  },
  mainLayout: {
    display: 'flex', flex: 1, gap: '1.5rem', padding: '1.5rem',
    flexWrap: 'wrap',
  },
  videoSection: { flex: 2, minWidth: '300px' },
  videoWrapper: {
    position: 'relative', background: '#000', borderRadius: '1rem',
    overflow: 'hidden', aspectRatio: '16/9',
    border: '1px solid #334155',
  },
  video: { width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: 'scaleX(-1)' },
  camError: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', height: '100%', gap: '1rem',
    color: '#94a3b8', padding: '2rem', textAlign: 'center', minHeight: '200px',
  },
  camLoading: {
    position: 'absolute', inset: 0, display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    background: '#000', color: '#94a3b8',
  },
  videoLabel: {
    position: 'absolute', bottom: '0.75rem', left: '0.75rem',
    background: 'rgba(0,0,0,0.6)', color: '#fff',
    padding: '0.25rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.8rem',
  },
  liveIndicator: {
    position: 'absolute', top: '0.75rem', right: '0.75rem',
    background: 'rgba(0,0,0,0.6)', color: '#f1f5f9',
    padding: '0.25rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.75rem',
    display: 'flex', alignItems: 'center', gap: '0.4rem',
  },
  liveDot: {
    width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444',
    display: 'inline-block', animation: 'pulse 1.5s infinite',
  },
  rightPanel: { flex: 1, minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '1rem' },
  botCard: {
    background: '#1e293b', border: '1px solid #334155', borderRadius: '1rem',
    padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem',
  },
  botAvatar: {
    fontSize: '2rem', background: '#0f172a', border: '1px solid #334155',
    borderRadius: '50%', width: '52px', height: '52px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  botName: { fontWeight: '700', fontSize: '1rem', color: '#f1f5f9' },
  botStatus: { fontSize: '0.8rem', color: '#22c55e', marginTop: '0.2rem' },
  questionCard: {
    background: '#1e293b', border: '1px solid #334155', borderRadius: '1rem',
    padding: '1.25rem', flex: 1,
  },
  questionLabel: {
    fontSize: '0.75rem', fontWeight: '600', color: '#64748b',
    textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem',
  },
  questionText: { color: '#cbd5e1', lineHeight: '1.6', fontSize: '0.95rem' },
  controlsCard: {
    background: '#1e293b', border: '1px solid #334155', borderRadius: '1rem', padding: '1.25rem',
  },
  statusRow: { display: 'flex', gap: '1.5rem', marginBottom: '1rem' },
  statusItem: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8' },
  statusDot: { width: '8px', height: '8px', borderRadius: '50%' },
  recordBtn: {
    width: '100%', padding: '0.85rem',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff', fontSize: '0.95rem', fontWeight: '600',
    borderRadius: '0.75rem', border: 'none', cursor: 'pointer',
    opacity: 1,
  },
  card: {
    background: '#1e293b', border: '1px solid #334155', borderRadius: '1.5rem',
    padding: '3rem 2.5rem', maxWidth: '480px', width: '100%', textAlign: 'center',
    margin: 'auto',
  },
  title: { fontSize: '1.8rem', color: '#f1f5f9', marginBottom: '1rem' },
  subtitle: { color: '#94a3b8', marginBottom: '2rem' },
  btn: {
    padding: '0.75rem 1.5rem', background: '#334155', color: '#f1f5f9',
    borderRadius: '0.75rem', fontSize: '0.95rem', border: 'none', cursor: 'pointer',
  },
}

export default InterviewSession