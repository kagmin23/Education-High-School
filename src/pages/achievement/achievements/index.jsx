import { BookOutlined, HeartOutlined, StarOutlined, TeamOutlined, TrophyOutlined } from '@ant-design/icons';
import { Card, Col, List, Row, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

const iconOptions = {
    StarOutlined: <StarOutlined />,
    TrophyOutlined: <TrophyOutlined />,
    TeamOutlined: <TeamOutlined />,
    BookOutlined: <BookOutlined />,
    HeartOutlined: <HeartOutlined />,
};

const SchoolAchievements = () => {
    const [achievements, setAchievements] = useState([]);

    // Load data from localStorage when the component mounts
    useEffect(() => {
        const storedData = localStorage.getItem("schoolAchievementsData");
        if (storedData) {
            setAchievements(JSON.parse(storedData));
        }
    }, []);

    return (
        <div className="container w-screen min-h-screen">
            <Typography.Title level={5} className="mb-4 text-center text-gray-800">
                Thành tích và Danh hiệu nổi bật
            </Typography.Title>
            <List
                bordered
                dataSource={achievements}
                renderItem={(item) => (
                    <List.Item key={item.id}>
                        <Card style={{ width: '100%', marginBottom: '16px', borderRadius: '8px' }}>
                            <Row gutter={16}>
                                <Col span={4} style={{ textAlign: 'center', fontSize: '24px' }}>
                                    {iconOptions[item.iconType]}
                                </Col>
                                <Col span={20}>
                                    <Typography.Title level={4} className="text-blue-600">{item.title}</Typography.Title>
                                    <p className="text-gray-700">{item.description}</p>
                                    <div>
                                        {item.tags.map((tag) => (
                                            <Tag key={tag} color="blue" className="mr-2">
                                                {tag}
                                            </Tag>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default SchoolAchievements;
