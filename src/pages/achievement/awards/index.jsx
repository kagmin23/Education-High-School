import { EnvironmentOutlined, FileTextOutlined, HeartOutlined, TeamOutlined, TrophyOutlined } from '@ant-design/icons';
import { Card, Col, Image, Row, Tag, Typography } from 'antd';
import React from 'react';

const SchoolAward = () => {
    // Dữ liệu cho các giải thưởng
    const awards = [
        {
            id: 1,
            name: "Giải nhất cuộc thi Toán",
            description: "Giải thưởng dành cho người đạt giải nhất ở cuộc thi Toán cấp tỉnh và quốc gia.",
            icon: <TrophyOutlined />,
            tags: ["Học sinh giỏi", "Toán học"],
            image: "https://example.com/image1.jpg" // Đường dẫn hình ảnh minh họa
        },
        {
            id: 2,
            name: "Giải nhì cuộc thi Văn",
            description: "Giải thưởng dành cho người đạt giải nhì trong cuộc thi Văn học.",
            icon: <FileTextOutlined />,
            tags: ["Học sinh giỏi", "Văn học"],
            image: "https://example.com/image2.jpg" // Đường dẫn hình ảnh minh họa
        },
        {
            id: 3,
            name: "Giải thể thao bóng đá",
            description: "Giải thưởng dành cho đội bóng đá của trường đạt giải nhất trong giải đấu liên trường.",
            icon: <TeamOutlined />,
            tags: ["Thể thao", "Bóng đá"],
            image: "https://example.com/image3.jpg" // Đường dẫn hình ảnh minh họa
        },
        {
            id: 4,
            name: "Giải nghiên cứu khoa học",
            description: "Giải thưởng dành cho dự án nghiên cứu khoa học xuất sắc nhất.",
            icon: <EnvironmentOutlined />,
            tags: ["Nghiên cứu", "Sáng tạo"],
            image: "https://example.com/image4.jpg" // Đường dẫn hình ảnh minh họa
        },
        {
            id: 5,
            name: "Giải thưởng hoạt động xã hội",
            description: "Giải thưởng dành cho các hoạt động tình nguyện và bảo vệ môi trường.",
            icon: <HeartOutlined />,
            tags: ["Hoạt động xã hội", "Tình nguyện"],
            image: "https://example.com/image5.jpg" // Đường dẫn hình ảnh minh họa
        },
    ];

    return (
        <div className="min-h-screen p-5 mx-auto ">
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
                                    alt={item.name}
                                    src={item.image}
                                    style={{ height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
                                />
                            }
                            style={{ marginBottom: '16px', borderRadius: '8px', overflow: 'hidden' }} // Ensure border radius is applied
                        >
                            <Card.Meta
                                title={
                                    <div className="flex items-center">
                                        <span className="text-xl">{item.icon}</span>
                                        <span className="ml-2">{item.name}</span>
                                    </div>
                                }
                                description={
                                    <div>
                                        <p>{item.description}</p>
                                        <div>
                                            {item.tags.map((tag) => (
                                                <Tag key={tag} color="blue" style={{ margin: '4px' }}>
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
