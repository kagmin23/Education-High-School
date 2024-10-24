import { Tabs } from 'antd';
import React from 'react';
import CertificateMeritManagement from './certificate-merit';
import GraduationManagement from './graduation';

const CertificateManagement = () => {
    return (
        <div className="container text-center">
            <h1 className="mb-2 text-xl">Quản lý Chứng nhận</h1>
            <Tabs defaultActiveKey="1" centered>
                <Tabs.TabPane tab="Giấy khen sơ bộ" key="1">
                    <CertificateMeritManagement />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tốt nghiệp tạm thời" key="2">
                    <GraduationManagement />
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
};

export default CertificateManagement;
