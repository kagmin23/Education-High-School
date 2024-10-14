import { BookOutlined, HeartOutlined, StarOutlined, TeamOutlined, TrophyOutlined } from '@ant-design/icons';
import { Card, Col, List, Row, Tag, Typography } from 'antd';
import React from 'react';

const SchoolAchievements = () => {
    // Dữ liệu cho các danh hiệu và thành tích nổi bật
    const achievements = [
        {
            id: 1,
            title: "Danh hiệu 'Trường học kiểu mẫu'",
            description: "Trường thường xuyên được công nhận là trường học kiểu mẫu nhờ vào cơ sở vật chất hiện đại, môi trường học tập thân thiện và tích cực.",
            icon: <StarOutlined />,
            tags: ["Đặc biệt", "Xuất sắc"]
        },
        {
            id: 2,
            title: "Thành tích học tập",
            description: "Trường có tỷ lệ học sinh đỗ tốt nghiệp THPT cao, thường đứng trong top đầu của tỉnh. Nhiều học sinh đạt giải cao trong các kỳ thi học sinh giỏi cấp tỉnh và quốc gia ở các môn văn hóa.",
            icon: <TrophyOutlined />,
            tags: ["Giải thưởng", "Top đầu"]
        },
        {
            id: 3,
            title: "Đội ngũ giáo viên",
            description: "Trường có đội ngũ giáo viên dày dạn kinh nghiệm, nhiều thầy cô đã đạt danh hiệu giáo viên giỏi cấp tỉnh và quốc gia. Các giáo viên tích cực tham gia nghiên cứu khoa học và ứng dụng các phương pháp dạy học hiện đại.",
            icon: <TeamOutlined />,
            tags: ["Giỏi", "Kinh nghiệm"]
        },
        {
            id: 4,
            title: "Chương trình giáo dục",
            description: "Trường có nhiều chương trình giáo dục đặc biệt, như các lớp chuyên, lớp nâng cao và các hoạt động ngoại khóa giúp phát triển toàn diện cho học sinh. Chương trình giáo dục tại trường thường được đánh giá cao về chất lượng và tính hiệu quả.",
            icon: <BookOutlined />,
            tags: ["Chất lượng", "Nâng cao"]
        },
        {
            id: 5,
            title: "Hoạt động xã hội và tình nguyện",
            description: "Trường tổ chức nhiều hoạt động tình nguyện và xã hội, giúp học sinh phát triển tinh thần trách nhiệm và lòng yêu thương cộng đồng. Học sinh tham gia tích cực vào các phong trào, chiến dịch bảo vệ môi trường và hỗ trợ các hoạt động cộng đồng.",
            icon: <HeartOutlined />,
            tags: ["Tình nguyện", "Cộng đồng"]
        },
    ];

    return (
        <div className="min-h-screen p-5 mx-auto">
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
                                    {item.icon}
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
