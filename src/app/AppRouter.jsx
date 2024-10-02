import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainLayout from '../components/layout/main-layout';
// import Homepage from './pages/Homepage';
// import Courses from './pages/Courses';
// import Profile from './pages/Profile';
import Homepage from '../pages/homepage/index';
import RoleSelection from '../pages/login/role-login';

function App() {
  return (
    <Router>
      <Routes>

      <Route path="/select-role-login" element={<RoleSelection />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/courses" element={<Courses />} />
          <Route path="/profile" element={<Profile />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
