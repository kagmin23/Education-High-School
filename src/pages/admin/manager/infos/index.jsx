import { Button, Card, Form, Input, List, message } from 'antd';
import React, { useEffect, useState } from 'react';

const InfoManagement = () => {
    const [form] = Form.useForm();
    const [schoolData, setSchoolData] = useState(null);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const data = localStorage.getItem('schoolInfoData');
        if (data) {
            const parsedData = JSON.parse(data);
            setSchoolData(parsedData);
            form.setFieldsValue(parsedData);
            if (parsedData.activities) {
                setActivities(parsedData.activities);
            }
        }
    }, [form]);

    const addActivity = () => {
        setActivities([...activities, '']);
    };

    const updateActivity = (value, index) => {
        const newActivities = [...activities];
        newActivities[index] = value;
        setActivities(newActivities);
    };

    const removeActivity = (index) => {
        const newActivities = activities.filter((_, i) => i !== index);
        setActivities(newActivities);
    };

    const onFinish = (values) => {
        values.activities = activities; // Lưu trữ hoạt động dưới dạng mảng
        localStorage.setItem('schoolInfoData', JSON.stringify(values));
        message.success('Thông tin đã được lưu!');
    };

    return (
        <Card title="Quản lý thông tin trường học">
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="name"
                    label="Tên trường"
                    rules={[{ required: true, message: 'Vui lòng nhập tên trường!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="establishedYear"
                    label="Năm thành lập"
                    rules={[{ required: true, message: 'Vui lòng nhập năm thành lập!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="location"
                    label="Địa chỉ"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="introduction"
                    label="Giới thiệu chung"
                    rules={[{ required: true, message: 'Vui lòng nhập giới thiệu chung!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name="program"
                    label="Chương trình học"
                    rules={[{ required: true, message: 'Vui lòng nhập chương trình học!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                
                <Form.Item label="Hoạt động ngoại khóa">
                    <Button onClick={addActivity} type="dashed" style={{ marginBottom: 16 }}>
                        Thêm hoạt động
                    </Button>
                    <List
                        bordered
                        dataSource={activities}
                        renderItem={(item, index) => (
                            <List.Item
                                actions={[
                                    <Button onClick={() => removeActivity(index)} type="link">Xóa</Button>,
                                ]}
                            >
                                <Input
                                    value={item}
                                    onChange={(e) => updateActivity(e.target.value, index)}
                                    placeholder="Nhập hoạt động"
                                />
                            </List.Item>
                        )}
                    />
                </Form.Item>

                <Form.Item
                    name="memory"
                    label="Kỷ niệm đáng nhớ"
                    rules={[{ required: true, message: 'Vui lòng nhập kỷ niệm đáng nhớ!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name="future"
                    label="Triển vọng tương lai"
                    rules={[{ required: true, message: 'Vui lòng nhập triển vọng tương lai!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email liên hệ"
                    rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="website"
                    label="Website"
                    rules={[{ required: true, message: 'Vui lòng nhập website!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Lưu thông tin
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default InfoManagement;
