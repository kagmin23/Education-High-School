import { Card, Tabs, Typography } from 'antd';
import React from 'react';
import StudentTimetable from './student-timetable';
import TeacherTimetable from './teacher-timetable';

const { TabPane } = Tabs;

const ManagementTabs = () => {
  return (
    <div className="mx-auto">
      <Card className="rounded-lg shadow-lg">
        <Typography.Title level={4} className="mb-4 text-center" style={{ fontWeight: 'normal' }}>
          Quản lý Thời Khoá Biểu
        </Typography.Title>
        <Tabs defaultActiveKey="1">
          <TabPane tab="TKB Học sinh" key="1">
            <StudentTimetable />
          </TabPane>
          <TabPane tab="TKB Giáo viên" key="2">
            <TeacherTimetable />
          </TabPane>
        </Tabs>
        <p className="mt-2 text-xs italic text-center text-red-500">* Vui lòng kiểm tra kĩ càng đồng bộ giữa TKB Học sinh và TKB Giáo viên phù hợp.</p>
      </Card>
    </div>
  );
};

export default ManagementTabs;
