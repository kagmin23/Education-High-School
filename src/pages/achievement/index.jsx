import { DoubleLeftOutlined } from '@ant-design/icons';
import { Button, Card, Layout, Tabs, Typography } from 'antd';
import React from 'react';
import SchoolAchievements from './achievements';
import SchoolAward from './awards';

const { TabPane } = Tabs;
const { Footer } = Layout;

const SchoolAchievement = () => {
    return (
        <Layout className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-300">
            <div className="flex-grow p-3 mx-auto">
                <Button
                    icon={<DoubleLeftOutlined />}
                    onClick={() => window.history.back()}
                    className="text-xs text-white bg-slate-500"
                    style={{
                        position: 'fixed',
                        top: '16px',
                        left: '16px',
                        zIndex: 1000,
                    }}
                >
                    Back
                </Button>
                <Card
                    className="rounded-lg shadow-lg bg-gradient-to-r from-blue-100 to-blue-200"
                    style={{ padding: '16px' }} // Optional: Padding inside the card
                >
                    <Typography.Title level={3} className="mb-4 text-center">
                        Danh hiệu và Giải thưởng
                    </Typography.Title>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Danh hiệu" key="1">
                            <SchoolAchievements /> {/* Component cho Danh hiệu */}
                        </TabPane>
                        <TabPane tab="Giải thưởng" key="2">
                            <SchoolAward /> {/* Component cho Giải thưởng */}
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
            <Footer className="text-center text-white bg-blue-500">
                High School ©2024 Created by KagMin
            </Footer>
        </Layout>
    );
};

export default SchoolAchievement;
