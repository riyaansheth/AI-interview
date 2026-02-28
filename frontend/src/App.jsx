import React from 'react'

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#0f172a',
      color: '#f1f5f9',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        🎙️ AI Video Interview Bot
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>
        Step 1 is working. React is rendering correctly.
      </p>
    </div>
  )
}

export default App