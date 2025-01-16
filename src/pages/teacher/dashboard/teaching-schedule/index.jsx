// DasboardTeacher.js
import { ScheduleOutlined } from '@ant-design/icons';
import { Calendar, Layout, Tabs } from 'antd';
import React from 'react';
import Timetable from '../timetable';

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

const DasboardTeacher = () => {
  const onSelect = (date) => {
    console.log(date.format('YYYY-MM-DD'));
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="flex items-center justify-center h-full">
            <h2 className="text-xl font-bold text-white"><ScheduleOutlined />&nbsp;&nbsp;Lịch Giáo Viên</h2>
          </div>
        </Header>
        <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Lịch" key="1">
              <div className="flex justify-center">
                <Calendar onSelect={onSelect} className="px-5 rounded-lg shadow-lg" />
              </div>
            </TabPane>
            <TabPane tab="Thời Khóa Biểu" key="2">
              <div className="flex justify-center">
                <Timetable /> {/* Hiển thị nội dung thời khóa biểu */}
              </div>
            </TabPane>
          </Tabs>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Created by KagMin © 2025</Footer>
      </Layout>
    </Layout>
  );
};

export default DasboardTeacher;
