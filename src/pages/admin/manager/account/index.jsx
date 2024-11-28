import { Tabs } from 'antd';
import React from 'react';
import AdminAccount from './admin';
import TeacherAccount from './teacher';
import UserAccount from './user';

const { TabPane } = Tabs;

const AccountsManagement = () => {
  return (
    <div className="p-5 mx-auto bg-white">
      <h1 className="mb-6 text-xl text-center">Quản lý Tài khoản</h1>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Người dùng" key="1">
          <UserAccount />
        </TabPane>
        <TabPane tab="Giáo viên" key="2">
          <TeacherAccount />
        </TabPane>
        <TabPane tab="ADMIN" key="3">
          <AdminAccount />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AccountsManagement;
