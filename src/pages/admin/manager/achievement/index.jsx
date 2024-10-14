import { Card, Tabs, Typography } from 'antd';
import React from 'react';
import AwardList from './AwardList'; // Component cho Giải thưởng
import TitleList from './TitleList'; // Component cho Danh hiệu

const { TabPane } = Tabs;

const ManagementTabs = () => {
    return (
        <div className="container p-5 mx-auto">
            <Card className="rounded-lg shadow-lg">
                <Typography.Title level={3} className="mb-4 text-center">
                    Quản lý Danh hiệu và Giải thưởng
                </Typography.Title>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Danh hiệu" key="1">
                        <TitleList /> {/* Component cho Danh hiệu */}
                    </TabPane>
                    <TabPane tab="Giải thưởng" key="2">
                        <AwardList /> {/* Component cho Giải thưởng */}
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    );
};

export default ManagementTabs;
