import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import AuthRoute from './components/AuthRoute'

import InjectLayoutElements from './components/InjectLayoutElements'
import Actuators from './pages/Actuators'
import CreateSensor from './pages/CreateSensor'
import Device from './pages/Device'
import Devices from './pages/Devices'
import DeviceSetup from './pages/DeviceSetup'

import Login from './pages/Login'
import Logout from './pages/Logout'
import Sensors from './pages/Sensors'

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

        <Route path="/devices/setup-device" element={
          <AuthRoute>
            <InjectLayoutElements element={<DeviceSetup />} />
          </AuthRoute>
        } />

        <Route path="/devices" element={
          <AuthRoute>
            <InjectLayoutElements element={<Devices />} />
          </AuthRoute>
        } />

        <Route path="/devices/:deviceId" element={
          <AuthRoute>
            <InjectLayoutElements element={<Device />} />
          </AuthRoute>
        } />


        <Route path="/sensors" element={
          <AuthRoute>
            <InjectLayoutElements element={<Sensors />} />
          </AuthRoute>
        } />

        <Route path="/sensors/create/:deviceId" element={
          <AuthRoute>
            <InjectLayoutElements element={<CreateSensor />} />
          </AuthRoute>
        } />

        <Route path="/actuators" element={
          <AuthRoute>
            <InjectLayoutElements element={<Actuators />} />
          </AuthRoute>
        } />

      </Routes>
    </Router>
  )
}

export default App
