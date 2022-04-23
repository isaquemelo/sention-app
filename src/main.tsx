import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'

import Header from './components/Header'
import InjectLayoutElements from './components/InjectLayoutElements'
import LoginPage from './pages/Login'
import SetupNewDevice from './pages/SetupNewDevice'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/setup-new-device" element={<InjectLayoutElements element={<SetupNewDevice />} />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
