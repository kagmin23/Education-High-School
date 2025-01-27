import { Tabs } from 'antd';
import React from 'react';
import StudentClass from './class-student';
import StudentTotal from './total-student/index';

const { TabPane } = Tabs;

const StudentManagement = () => {
  return (
    <div className="p-5 mx-auto bg-white">
      <h1 className="mb-6 text-xl text-center">Quản lý Học Sinh</h1>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Danh sách Học sinh" key="1">
          <StudentTotal />
        </TabPane>
        <TabPane tab="Danh sách Học sinh theo Lớp" key="2">
          <StudentClass />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default StudentManagement;
