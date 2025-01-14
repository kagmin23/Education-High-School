import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import NotFound from '../../components/not-found';
import DasboardTeacher from './dashboard/teaching-schedule/index';
import Document from './document';
import HomeroomManager from './homeroom';
import LessonPlan from './lesson-plan';
import './main.css';
import OnlineTimeTable from './online-timetable';
import SidebarTeacher from './sidebar';
import TestExam from './test-exam';

const RouterTeacher = () => {
  return (
    <div className="teacher-layout">
      <SidebarTeacher /> {/* Sidebar nằm bên trái */}
      <div className="teacher-content"> {/* Nội dung bên phải sidebar */}
        <Routes>
          <Route path="/" element={<DasboardTeacher />} />
          <Route path="/teacher/dashboard" element={<DasboardTeacher />} />
          <Route path="/homeroom" element={<HomeroomManager />} />
          <Route path="/lesson-plan" element={<LessonPlan />} />
          <Route path="/document" element={<Document />} />
          <Route path="/test-exam" element={<TestExam />} />
          <Route path="/online-timetable" element={<OnlineTimeTable />} />
          {/* Thêm các route khác ở đây nếu cần */}
          <Route path="*" element={<NotFound />} /> {/* Route cho trang không tìm thấy */}
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default RouterTeacher;
