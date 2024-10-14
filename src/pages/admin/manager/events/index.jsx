import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Form, Input, List, Select, Typography, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

const EventManagement = () => {
    const [events, setEvents] = useState([]);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);

    // Hàm để lấy dữ liệu từ localStorage
    const getEventsFromStorage = () => {
        const storedEvents = localStorage.getItem('schoolEventData');
        return storedEvents ? JSON.parse(storedEvents) : [];
    };

    // Hàm để lưu dữ liệu vào localStorage
    const saveEventsToStorage = (eventsData) => {
        localStorage.setItem('schoolEventData', JSON.stringify(eventsData));
    };

    // Load các sự kiện từ localStorage khi component được tải
    useEffect(() => {
        const storedEvents = getEventsFromStorage();
        setEvents(storedEvents);
    }, []);

    const addEvent = (values) => {
        if (!imageUrl) {
            message.error('Vui lòng tải lên hình ảnh!');
            return;
        }

        const newEvent = {
            id: Date.now(),
            title: values.title,
            description: values.description,
            date: values.date.format('YYYY-MM-DD'),
            status: values.status,
            image: imageUrl,
        };

        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        saveEventsToStorage(updatedEvents);

        form.resetFields();
        setImageUrl(null);
        message.success('Thêm sự kiện thành công!');
    };

    const removeEvent = (id) => {
        const updatedEvents = events.filter(event => event.id !== id);
        setEvents(updatedEvents);
        saveEventsToStorage(updatedEvents);
        message.success('Xóa sự kiện thành công!');
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
        <div className="container p-5 mx-auto">
            <Card className="rounded-lg shadow-lg">
                <Typography.Title level={3} className="mb-4 text-center">
                    Quản lý Sự kiện
                </Typography.Title>
                <Form form={form} onFinish={addEvent} layout="vertical">
                    <Form.Item name="title" label="Tên sự kiện" rules={[{ required: true, message: 'Vui lòng nhập tên sự kiện!' }]}>
                        <Input placeholder="Nhập tên sự kiện" />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả sự kiện" rules={[{ required: true, message: 'Vui lòng nhập mô tả sự kiện!' }]}>
                        <Input.TextArea placeholder="Nhập mô tả sự kiện" rows={3} />
                    </Form.Item>
                    <Form.Item name="date" label="Ngày diễn ra" rules={[{ required: true, message: 'Vui lòng chọn ngày diễn ra!' }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="status" label="Trạng thái sự kiện" rules={[{ required: true, message: 'Vui lòng chọn trạng thái sự kiện!' }]}>
                        <Select placeholder="Chọn trạng thái">
                            <Option value="Sắp tới">Sắp tới</Option>
                            <Option value="Đang diễn ra">Đang diễn ra</Option>
                            <Option value="Đã diễn ra">Đã diễn ra</Option>
                        </Select>
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
                                <img src={imageUrl} alt="event" style={{ width: '100%' }} />
                            ) : (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Thêm Sự kiện</Button>
                    </Form.Item>
                </Form>
                <Typography.Title level={4} className="mt-5">Danh sách Sự kiện</Typography.Title>
                <List
                    bordered
                    dataSource={events}
                    renderItem={(item) => (
                        <List.Item
                            key={item.id}
                            actions={[
                                <Button type="link" onClick={() => removeEvent(item.id)}>Xóa</Button>
                            ]}
                        >
                            <List.Item.Meta
                                title={item.title}
                                description={`${item.date} - ${item.status}`}
                            />
                            <div className="mx-5">{item.description}</div>
                            {item.image && <img src={item.image} alt={item.title} style={{ width: '100px', height: 'auto' }} />}
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
};

export default EventManagement;