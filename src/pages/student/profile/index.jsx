import { Layout } from 'antd';
import { Outlet, Route, Routes } from 'react-router-dom';
import NotFound from '../../../components/not-found';
import ExercisesStudent from './exercises';
import OnlineStudent from './online-timetable';
import StudentProfile from './profile';
import RegisterParent from './register-parent';
import Settings from './setting';
import ProfileStudentSidebar from './sidebar';

const { Content } = Layout;

function ProfileStudent() {
    return (
        <Layout>
            <ProfileStudentSidebar />
            <Content className="p-4 bg-gray-100">
                {/* Sử dụng Outlet để hiển thị nội dung của các trang con */}
                <Routes>
                    <Route path="profile" element={<StudentProfile />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="register-parent" element={<RegisterParent />} />
                    <Route path="online-timetable/profile" element={<OnlineStudent />} />
                    <Route path="online-timetable/exercises" element={<ExercisesStudent />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Outlet />
            </Content>
        </Layout>
    );
}

export default ProfileStudent;
