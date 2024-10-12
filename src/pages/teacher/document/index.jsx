import { Tabs } from 'antd';
import React from 'react';
import ClassTest from './class-test';
import Graduate from './graduate';
import Semester from './semester';

const { TabPane } = Tabs;

const Document = () => {
  return (
    <div className="container p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Tài Liệu Ôn Tập - Lịch kiểm tra</h1>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Kiểm tra Lớp" key="1">
          <ClassTest />
        </TabPane>
        <TabPane tab="Học Kỳ" key="2">
          <Semester />
        </TabPane>
        <TabPane tab="Tốt nghiệp" key="3">
          <Graduate />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Document;
