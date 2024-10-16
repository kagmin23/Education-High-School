import { EnvironmentOutlined, FileTextOutlined, HeartOutlined, PlusOutlined, TeamOutlined, TrophyOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, List, Row, Select, Tag, Typography, Upload, notification } from "antd";
import React, { useEffect, useState } from "react";

const iconOptions = {
    StarOutlined: <EnvironmentOutlined />,
    TrophyOutlined: <TrophyOutlined />,
    TeamOutlined: <TeamOutlined />,
    BookOutlined: <FileTextOutlined />,
    HeartOutlined: <HeartOutlined />,
};

const AwardsManagement = () => {
    const [awards, setAwards] = useState([]);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);

    // Load data from localStorage when component mounts
    useEffect(() => {
        const storedData = localStorage.getItem("schoolAwardsData");
        if (storedData) {
            setAwards(JSON.parse(storedData));
        }
    }, []);

    // Save data to localStorage
    const saveDataToLocalStorage = (data) => {
        localStorage.setItem("schoolAwardsData", JSON.stringify(data));
        setAwards(data);
    };

    // Handle form submission
    const handleAddAward = (values) => {
        const newId = Math.max(0, ...awards.map((a) => a.id)) + 1;
        const newAward = { ...values, id: newId, imageUrl }; // Include the imageUrl field
        const updatedAwards = [...awards, newAward];
        saveDataToLocalStorage(updatedAwards);
        form.resetFields();
        setImageUrl(null); // Reset the imageUrl after adding the award
        notification.success({ message: "Award added successfully!" });
    };

    // Handle delete award
    const handleDelete = (id) => {
        const filteredAwards = awards.filter((award) => award.id !== id);
        saveDataToLocalStorage(filteredAwards);
        notification.success({ message: "Award deleted successfully!" });
    };

    const handleImageUpload = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result);
                resolve(reader.result);
            };
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    };

    return (
        <div className="min-h-screen p-5">
                        <Typography.Title level={5} className="mb-4 text-center text-gray-800">
                        Quản lý Thành tích và Giải thưởng
            </Typography.Title>
            {/* Form to Add Award */}
            <Form form={form} layout="vertical" onFinish={handleAddAward} className="mb-5">
            <Typography.Title level={5} className="mb-4">Thêm Giải thưởng mới</Typography.Title>
                <Form.Item name="title" label="Tên Giải thưởng" rules={[{ required: true, message: "Vui lòng nhập tên Giải thưởng" }]}>
                    <Input placeholder="Nhập tên Giải thưởng" className="rounded-md" />
                </Form.Item>
                <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}>
                    <Input.TextArea placeholder="Nhập mô tả Giải thưởng" className="rounded-md" />
                </Form.Item>
                <Form.Item name="iconType" label="Icon" rules={[{ required: true, message: "Please select an icon" }]}>
                    <Select placeholder="Select an award icon" className="rounded-md">
                        {Object.keys(iconOptions).map((key) => (
                            <Select.Option key={key} value={key}>{key}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="tags" label="Tags">
                    <Select mode="tags" style={{ width: '100%' }} placeholder="Nhập Tags" className="rounded-md" />
                </Form.Item>
                <Form.Item label="Hình ảnh" rules={[{ required: true, message: 'Vui lòng tải lên hình ảnh!' }]}>
                    <Upload
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={(file) => {
                            handleImageUpload(file);
                            return false;
                        }}
                    >
                        {imageUrl ? (
                            <img src={imageUrl} alt="award" style={{ width: '100%' }} />
                        ) : (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        Thêm Giải thưởng
                    </Button>
                </Form.Item>
            </Form>

            {/* List of Awards */}
            <List
                bordered
                dataSource={awards}
                renderItem={(item) => (
                    <List.Item key={item.id} className="p-0">
                        <Card
                            className="w-full mb-4 rounded-md shadow-lg"
                            bodyStyle={{ padding: "16px" }}
                            actions={[
                                <Button onClick={() => handleDelete(item.id)} type="link" danger>Xoá</Button>
                            ]}
                        >
                            <Row gutter={16}>
                                <Col span={4} className="flex items-center justify-center text-3xl text-blue-500">
                                    {iconOptions[item.iconType]}
                                </Col>
                                <Col span={16}>
                                    <Typography.Title level={4} className="text-blue-600">{item.title}</Typography.Title>
                                    <p className="text-gray-700">{item.description}</p>
                                    <div className="mt-2">
                                        {item.tags && item.tags.map((tag) => (
                                            <Tag key={tag} color="blue" className="mr-2">
                                                {tag}
                                            </Tag>
                                        ))}
                                    </div>
                                </Col>
                                <Col span={4} className="flex items-center justify-center">
                                    {item.imageUrl && (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            style={{
                                                width: "100%",
                                                maxWidth: "80px",
                                                borderRadius: "8px",
                                            }}
                                        />
                                    )}
                                </Col>
                            </Row>
                        </Card>
                    </List.Item>
                )}
            />

        </div>
    );
};

export default AwardsManagement;
