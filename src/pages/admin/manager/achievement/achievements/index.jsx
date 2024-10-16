import { BookOutlined, HeartOutlined, StarOutlined, TeamOutlined, TrophyOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, List, Row, Select, Tag, Typography, notification } from "antd";
import React, { useEffect, useState } from "react";

const iconOptions = {
    StarOutlined: <StarOutlined />,
    TrophyOutlined: <TrophyOutlined />,
    TeamOutlined: <TeamOutlined />,
    BookOutlined: <BookOutlined />,
    HeartOutlined: <HeartOutlined />,
};

const AchievementsManagement = () => {
    const [achievements, setAchievements] = useState([]);
    const [form] = Form.useForm();

    // Load data from localStorage when component mounts
    useEffect(() => {
        const storedData = localStorage.getItem("schoolAchievementsData");
        if (storedData) {
            setAchievements(JSON.parse(storedData));
        }
    }, []);

    // Save data to localStorage
    const saveDataToLocalStorage = (data) => {
        localStorage.setItem("schoolAchievementsData", JSON.stringify(data));
        setAchievements(data);
    };

    // Handle form submission
    const handleAddAchievement = (values) => {
        const newId = Math.max(0, ...achievements.map((a) => a.id)) + 1;
        const newAchievement = { ...values, id: newId };
        const updatedAchievements = [...achievements, newAchievement];
        saveDataToLocalStorage(updatedAchievements);
        form.resetFields();
        notification.success({ message: "Thêm thành công!" });
    };

    // Handle delete achievement
    const handleDelete = (id) => {
        const filteredAchievements = achievements.filter((achievement) => achievement.id !== id);
        saveDataToLocalStorage(filteredAchievements);
        notification.success({ message: "Xóa thành công!" });
    };

    return (
        <div className="min-h-screen p-5 mx-auto">
            <Typography.Title level={5} className="mb-4 text-center text-gray-800">
                Quản lý Thành tích và Danh hiệu
            </Typography.Title>

            <Form form={form} layout="vertical" onFinish={handleAddAchievement} className="mb-5">
                <Typography.Title level={5} className="mb-4">Thêm Danh hiệu mới</Typography.Title>
                <Form.Item name="title" label="Tên danh hiệu" rules={[{ required: true, message: "Vui lòng nhập tên danh hiệu" }]}>
                    <Input placeholder="Nhập tên danh hiệu"/>
                </Form.Item>
                <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}>
                    <Input.TextArea placeholder="Nhập mô tả danh hiệu" />
                </Form.Item>
                <Form.Item name="iconType" label="Biểu tượng" rules={[{ required: true, message: "Vui lòng chọn biểu tượng" }]}>
                    <Select placeholder="Lựa chọn biểu tượng danh hiệu">
                        {Object.keys(iconOptions).map((key) => (
                            <Select.Option key={key} value={key}>{key}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="tags" label="Tags">
                    <Select mode="tags" style={{ width: '100%' }} placeholder="Nhập các tags" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Thêm Danh hiệu
                    </Button>
                </Form.Item>
            </Form>

            <List
                bordered
                dataSource={achievements}
                renderItem={(item) => (
                    <List.Item key={item.id} actions={[
                        <Button onClick={() => handleDelete(item.id)} type="link" danger>Xóa</Button>
                    ]}>
                        <Card style={{ width: "100%", marginBottom: "16px", borderRadius: "8px" }}>
                            <Row gutter={16}>
                                <Col span={4} style={{ textAlign: "center", fontSize: "24px" }}>
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

export default AchievementsManagement;
