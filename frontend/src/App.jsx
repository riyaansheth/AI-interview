import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import StudentHome from './pages/StudentHome.jsx'
import InterviewSetup from './pages/InterviewSetup.jsx'
import InterviewSession from './pages/InterviewSession.jsx'
import InterviewResult from './pages/InterviewResult.jsx'
import InterviewHistory from './pages/InterviewHistory.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentHome />} />
        <Route path="/setup" element={<InterviewSetup />} />
        <Route path="/session" element={<InterviewSession />} />
        <Route path="/result" element={<InterviewResult />} />
        <Route path="/history" element={<InterviewHistory />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App