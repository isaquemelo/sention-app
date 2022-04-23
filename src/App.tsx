import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import AuthRoute from './components/AuthRoute'

import InjectLayoutElements from './components/InjectLayoutElements'
import Login from './pages/Login'
import Logout from './pages/Logout'
import SetupNewDevice from './pages/SetupNewDevice'

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

        <Route path="/setup-new-device" element={
          <AuthRoute>
            <SetupNewDevice />
          </AuthRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
