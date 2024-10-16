import { EnvironmentOutlined, FileTextOutlined, HeartOutlined, TeamOutlined, TrophyOutlined } from '@ant-design/icons';
import { Card, Col, Image, Row, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

const iconOptions = {
    TrophyOutlined: <TrophyOutlined />,
    FileTextOutlined: <FileTextOutlined />,
    TeamOutlined: <TeamOutlined />,
    EnvironmentOutlined: <EnvironmentOutlined />,
    HeartOutlined: <HeartOutlined />,
};

const SchoolAward = () => {
    const [awards, setAwards] = useState([]);

    // Load data from localStorage when the component mounts
    useEffect(() => {
        const storedData = localStorage.getItem("schoolAwardsData");
        if (storedData) {
            setAwards(JSON.parse(storedData));
        }
    }, []);

    return (
        <div className="container w-screen min-h-screen">
            <Typography.Title level={5} className="mb-6 text-center">
                Thành tích và Giải thưởng nổi bật
            </Typography.Title>
            <Row gutter={20}>
                {awards.map((item) => (
                    <Col span={8} key={item.id}>
                        <Card
                            hoverable
                            cover={
                                <Image
                                    className="w-24 h-24"
                                    alt={item.name}
                                    src={item.imageUrl} // Use imageUrl field
                                    style={{ height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
                                />
                            }
                            style={{ marginBottom: '16px', borderRadius: '8px', overflow: 'hidden' }}
                        >
                            <Card.Meta
                                title={
                                    <div className="flex items-center">
                                        <span className="text-xl">
                                            {iconOptions[item.iconType]}
                                        </span>
                                        <span className="ml-2" style={{ flex: 1, whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                            {item.title}
                                        </span>
                                    </div>
                                }
                                description={
                                    <div>
                                        <p>{item.description}</p>
                                        <div>
                                            {item.tags.map((tag) => (
                                                <Tag key={tag} color="green" style={{ margin: '4px' }}>
                                                    {tag}
                                                </Tag>
                                            ))}
                                        </div>
                                    </div>
                                }
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default SchoolAward;
