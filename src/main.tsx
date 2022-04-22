import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'

import Header from './components/Header'
import SetupNewDevice from './pages/SetupNewDevice'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Header />
    <Router>
      <Routes>
        <Route path="/setup-new-device" element={<SetupNewDevice />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
