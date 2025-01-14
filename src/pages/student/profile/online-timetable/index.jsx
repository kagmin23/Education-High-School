import { Tabs } from 'antd';
import React, { useState } from 'react';
import TestOnline from './test-online';
import TimeOnline from './time-online';

const { TabPane } = Tabs;

const OnlineStudent = () => {
  const [activeTab, setActiveTab] = useState('1');

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div className="p-4">
      <h2>Quản lý Tab</h2>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Lịch kiểm tra trực tuyến" key="1">
          <TestOnline />
        </TabPane>
        <TabPane tab="Lịch trao đổi, hoạt động trực tuyến" key="2">
          <TimeOnline />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default OnlineStudent;
