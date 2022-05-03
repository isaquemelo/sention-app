import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import AuthRoute from './components/AuthRoute'

import InjectLayoutElements from './components/InjectLayoutElements'
import DeviceSetup from './pages/DeviceSetup'

import Login from './pages/Login'
import Logout from './pages/Logout'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/" element={
          <AuthRoute>
            <InjectLayoutElements element={<h1>Dashboard</h1>} />
          </AuthRoute>
        } />

        <Route path="/setup-device" element={
          <AuthRoute>
            <InjectLayoutElements element={<DeviceSetup />} />
          </AuthRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
