import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainLayout from '../components/layout/main-layout';
import ParentLayout from '../components/layout/parent-layout';
import StudentLayout from '../components/layout/student-layout';
import {
  DoTest,
  HomepageGuest,
  HomepageParent,
  HomepageStudent,
  LoginAdmin,
  LoginParent,
  LoginStudent,
  LoginTeacher,
  RoleSelectionPage,
  RouterAdmin,
  RouterTeacher,
  SchoolAchievement,
  SchoolActivity,
  SchoolBlog,
  SchoolEvent,
  SchoolInfo,
  StudentRegister,
  TimeTableStudent
} from '../pages';

function AppRouter() {
  return (
    <Router>

      {/* Guest */}
      <Routes>
        <Route path="/register" element={<StudentRegister />} />
        <Route path="/select-role-login" element={<RoleSelectionPage />} />
        <Route path="/login/teacher" element={<LoginTeacher />} />
        <Route path="/login/student" element={<LoginStudent />} />
        <Route path="/login/parent" element={<LoginParent />} />
        <Route path="/login/admin" element={<LoginAdmin />} />

        {/* Guest */}
        <Route path="/info" element={<SchoolInfo />} />
        <Route path="/blog" element={<SchoolBlog />} />
        <Route path="/event" element={<SchoolEvent />} />
        <Route path="/achievement" element={<SchoolAchievement />} />
        <Route path="/activity" element={<SchoolActivity />} />

        {/* Admin */}
        <Route path="/admin/*" element={<RouterAdmin />} />

        {/* Teacher */}
        <Route path="/teacher/*" element={<RouterTeacher />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomepageGuest />} />
        </Route>
      </Routes>

      {/* Student */}
      <Routes>
        <Route path="/student/info" element={<SchoolInfo />} />

        <Route element={<StudentLayout />}>
          <Route path="/student" element={<HomepageStudent />} />
          <Route path="/student/timetable-student" element={<TimeTableStudent />} />

        </Route>
      </Routes>
      <Routes>
        <Route path="/student/do-test" element={<DoTest />} />
      </Routes>

      {/* Parent */}
      <Routes>
        <Route element={<ParentLayout />}>
          <Route path="/parent" element={<HomepageParent />} />
        </Route>
      </Routes>

    </Router>
  );
}

export default AppRouter;
