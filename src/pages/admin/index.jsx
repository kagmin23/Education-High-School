import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import NotFound from '../../components/not-found';
import DashboardAdmin from './dashboard';
import AccountsManagement from './manager/account';
import AchievementsManagement from './manager/achievement/achievements';
import AwardsManagement from './manager/achievement/awards';
import ActivitiesManagement from './manager/activities';
import BlogManagement from './manager/blogs';
import CertificateManagement from './manager/certificates';
import ClassManagement from './manager/class';
import EventManagement from './manager/events';
import InfoManagement from './manager/infos';
import StudentManagement from './manager/students';
import TeacherManagement from './manager/teachers';
import TimetableManagement from './manager/timetable';
import SidebarAdmin from './sidebar';

const { Header, Content, Footer } = Layout;

const RouterAdmin = () => {
  const location = useLocation();
  const [headerTitle, setHeaderTitle] = useState('Bảng điều khiển Admin');

  // Định nghĩa tiêu đề cho từng route
  const titles = {
    '/admin/dashboard': 'Bảng điều khiển Admin - Tổng quan hệ thống',
    '/admin/manager/class': 'Bảng điều khiển Admin - Quản lý Lớp',
    '/admin/manager/students': 'Bảng điều khiển Admin - Quản lý Học sinh',
    '/admin/manager/teachers': 'Bảng điều khiển Admin - Quản lý Giáo viên',
    '/admin/manager/infos': 'Bảng điều khiển Admin - Quản lý Thông tin',
    '/admin/manager/accounts': 'Bảng điều khiển Admin - Quản lý Tài Khoản',
    '/admin/manager/blogs': 'Bảng điều khiển Admin - Quản lý Blog',
    '/admin/manager/events': 'Bảng điều khiển Admin - Quản lý Sự kiện',
    '/admin/manager/activities': 'Bảng điều khiển Admin - Quản lý Hoạt động',
    '/admin/manager/achievements': 'Bảng điều khiển Admin - Quản lý Thành tích',
    '/admin/manager/awards': 'Bảng điều khiển Admin - Quản lý Giải thưởng',
    '/admin/manager/timetable': 'Bảng điều khiển Admin - Quản lý Thời khóa biểu',
    '/admin/manager/certificates': 'Bảng điều khiển Admin - Quản lý Chứng chỉ',
  };

  useEffect(() => {
    // Cập nhật tiêu đề khi đường dẫn thay đổi
    setHeaderTitle(titles[location.pathname] || 'Bảng điều khiển Admin');
  }, [location.pathname]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SidebarAdmin />
      <Layout className="site-layout">
        <Header className="bg-white shadow-md" style={{ padding: 0 }}>
          <div className="px-4 bg-gradient-to-t from-blue-100 to-blue-200">{headerTitle}</div>
        </Header>
        <Content className="p-4 bg-gray-100">
          <Routes>
            <Route path="/dashboard" element={<DashboardAdmin />} />
            <Route path="/manager/class" element={<ClassManagement />} />
            <Route path="/manager/students" element={<StudentManagement />} />
            <Route path="/manager/teachers" element={<TeacherManagement />} />
            <Route path="/manager/infos" element={<InfoManagement />} />
            <Route path="/manager/accounts" element={<AccountsManagement />} />
            <Route path="/manager/blogs" element={<BlogManagement />} />
            <Route path="/manager/events" element={<EventManagement />} />
            <Route path="/manager/activities" element={<ActivitiesManagement />} />
            <Route path="/manager/achievements" element={<AchievementsManagement />} />
            <Route path="/manager/awards" element={<AwardsManagement />} />
            <Route path="/manager/timetable" element={<TimetableManagement />} />
            <Route path="/manager/certificates" element={<CertificateManagement />} />

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
