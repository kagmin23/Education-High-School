import { Tabs } from 'antd';
import React from 'react';
import FeeList from './fee-list';
import ParentList from './parent-list';
import StudentList from './student-list';

const { TabPane } = Tabs;

const HomeroomManager = () => {
  return (
    <div className="container p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Lớp phụ trách Chủ nhiệm</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Học sinh" key="1">
          <StudentList />
        </TabPane>
        <TabPane tab="Phụ huynh" key="2">
          <ParentList />
        </TabPane>
        <TabPane tab="Tiền nộp" key="3">
          <FeeList />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default HomeroomManager;
