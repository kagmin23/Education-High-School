import {
    BulbOutlined,
    DoubleLeftOutlined,
    FundViewOutlined,
    GlobalOutlined,
    MailOutlined,
    PhoneOutlined,
    UsergroupAddOutlined,
} from '@ant-design/icons';
import {
    Avatar,
    Button,
    Card,
    Col,
    Divider,
    Image,
    List,
    Row,
    Statistic,
    Typography
} from 'antd';
import React, { useEffect, useState } from 'react';

const { Title, Paragraph } = Typography;

const SchoolInfo = () => {
    const [schoolData, setSchoolData] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem('schoolInfoData');
        if (data) {
            setSchoolData(JSON.parse(data));
        }
    }, []);

    if (!schoolData) {
        return <div>Đang tải dữ liệu...</div>;
    }

    return (
        <div className="flex flex-col items-center p-4">
            <Button
                icon={<DoubleLeftOutlined />}
                onClick={() => window.history.back()}
                style={{
                    position: 'fixed',
                    top: '16px',
                    left: '16px',
                    zIndex: 1000,
                }}
            >
                Back
            </Button>

            <Card className="w-full rounded-lg shadow-lg">
                <Image
                    width="100%"
                    height={200}
                    src="https://display.hikvision.com/content/hikvision/display-europe/newsroom/blog/how-digital-education-solutions-can-help-students-achieve-their-full-learning-potential/_jcr_content/root/responsivegrid/image_copy_copy_copy.coreimg.100.1280.jpeg"
                    alt="School Image"
                    style={{ borderRadius: '8px' }}
                />
                <Title level={2} className="mt-3 text-center">{schoolData.name}</Title>
                <Divider />

                <Row gutter={16} className="mb-4">
                    <Col span={8}>
                        <Statistic
                            title="Thành lập"
                            value={schoolData.establishedYear}
                            prefix={<FundViewOutlined />}
                        />
                    </Col>
                    <Col span={8}>
                        <Statistic
                            title="Địa chỉ"
                            value={schoolData.location}
                            prefix={<UsergroupAddOutlined />}
                        />
                    </Col>
                    <Col span={8}>
                        <Statistic
                            title="Điện thoại"
                            value={schoolData.phone}
                            prefix={<PhoneOutlined />}
                        />
                    </Col>
                </Row>

                <Row gutter={16} className="mb-4">
                    <Col span={12}>
                        <Paragraph className="text-lg">
                            <strong>Giới thiệu chung</strong>: {schoolData.introduction}
                        </Paragraph>
                    </Col>
                    <Col span={12}>
                        <Paragraph className="text-lg">
                            <strong>Chương trình học</strong>: {schoolData.program}
                        </Paragraph>
                    </Col>
                </Row>

                <Title level={4}>Hoạt động ngoại khóa</Title>
                <List
                    bordered
                    dataSource={Array.isArray(schoolData.activities) ? schoolData.activities : []}
                    renderItem={(item) => (
                        <List.Item>
                            <BulbOutlined /> {item}
                        </List.Item>
                    )}
                />

                <Title className="mt-8" level={4}>Kỷ niệm đáng nhớ</Title>
                <Paragraph>{schoolData.memory}</Paragraph>

                <Title level={4}>Triển vọng tương lai</Title>
                <Paragraph>{schoolData.future}</Paragraph>

                <Divider />

                <Title level={4}>Liên hệ với chúng tôi</Title>
                <Paragraph>
                    <MailOutlined /> <strong>Email:</strong> <a href={`mailto:${schoolData.email}`}>{schoolData.email}</a>
                </Paragraph>
                <Paragraph>
                    <GlobalOutlined /> <strong>Website:</strong> <a href={schoolData.website} target="_blank" rel="noopener noreferrer">{schoolData.website}</a>
                </Paragraph>

                <Title level={4}>Theo dõi chúng tôi trên mạng xã hội</Title>
                <div className="flex space-x-4">
                    <Avatar src="https://via.placeholder.com/40" shape="square" />
                    <Avatar src="https://via.placeholder.com/40" shape="square" />
                    <Avatar src="https://via.placeholder.com/40" shape="square" />
                </div>
            </Card>
        </div>
    );
};

export default SchoolInfo;
