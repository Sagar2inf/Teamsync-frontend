import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UpdateProfile from "./pages/updateProfile.jsx";
import TeamDetails from "./components/TeamDetails.jsx";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element = {<Login/>}/>
        <Route path="/signup" element = {<SignUp/>}/>
        <Route path="/dashboard" element = {
          <ProtectedRoute>
            <UserProfile/>
          </ProtectedRoute>
        }/>
        <Route path="/UpdateProfile" element={<UpdateProfile/>} />
        <Route path="/teams/:id" element={<TeamDetails/>} />

      </Routes>
    </Router>
  )
}

export default App
