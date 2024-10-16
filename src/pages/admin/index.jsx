import { Layout } from 'antd';
import { Outlet, Route, Routes } from 'react-router-dom';
import NotFound from '../../components/not-found';
import DashboardAdmin from './dashboard';
import AchievementsManagement from './manager/achievement/achievements';
import AwardsManagement from './manager/achievement/awards';
import ActivitiesManagement from './manager/activities';
import BlogManagement from './manager/blogs';
import ClassManagement from './manager/class';
import EventManagement from './manager/events';
import InfoManagement from './manager/infos';
import StudentManagement from './manager/students';
import TeacherManagement from './manager/teachers';
import TimetableManagement from './manager/timetable';
import SidebarAdmin from './sidebar';

const { Header, Content, Footer } = Layout;

const RouterAdmin = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SidebarAdmin />
      <Layout className="site-layout">
        <Header className="bg-white shadow-md" style={{ padding: 0 }}>
          <div className="px-4 bg-gradient-to-t from-blue-100 to-blue-200">Bảng điều khiển Admin</div>
        </Header>
        <Content className="p-4 bg-gray-100">
            <Routes>
                <Route path="/dashboard" element={<DashboardAdmin />} />
                <Route path="/manager/class" element={<ClassManagement />} />
                <Route path="/manager/students" element={<StudentManagement />} />
                <Route path="/manager/teachers" element={<TeacherManagement />} />
                <Route path="/manager/infos" element={<InfoManagement />} />
                <Route path="/manager/blogs" element={<BlogManagement />} />
                <Route path="/manager/events" element={<EventManagement />} />
                <Route path="/manager/activities" element={<ActivitiesManagement />} />
                <Route path="/manager/achievements" element={<AchievementsManagement />} />
                <Route path="/manager/awards" element={<AwardsManagement />} />
                <Route path="/manager/timetable" element={<TimetableManagement />} />

            <Route path="*" element={<NotFound />} /> {/* Route cho trang không tìm thấy */}
            </Routes>
            <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>High School ©2024 Created by KagMin</Footer>
      </Layout>
    </Layout>
  );
};

export default RouterAdmin;
