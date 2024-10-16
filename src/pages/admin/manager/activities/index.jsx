import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Form, Input, Layout, List, Modal, Typography, Upload, message } from "antd";
import React, { useState } from "react";

const { Content } = Layout;

// Custom hook để quản lý state và tương tác với localStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

const ActivitiesManagement = () => {
    const [activities, setActivities] = useLocalStorage("schoolActivitiesData", []);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);

    // Handle form submission for adding a new activity
    const handleSubmit = (values) => {
        const formattedDate = values.date.format('DD/MM/YYYY');
        const newActivity = { ...values, id: Date.now(), image: imageUrl, date: formattedDate };
        setActivities([...activities, newActivity]);
        message.success("Hoạt động mới đã được thêm thành công!");
        form.resetFields();
        setImageUrl(null);
    };

    // Delete an activity
    const handleDelete = (id) => {
        setActivities(activities.filter((activity) => activity.id !== id));
        message.success("Hoạt động đã được xóa!");
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

    // Show activity details in modal
    const showActivityDetails = (activity) => {
        setSelectedActivity(activity);
        setModalVisible(true);
    };

    return (
        <div className="container p-5 mx-auto">
            <Card title="Quản lý Hoạt động" style={{ marginBottom: 20 }}>
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        label="Tên hoạt động"
                        name="title"
                        rules={[{ required: true, message: "Vui lòng nhập tên hoạt động!" }]}
                    >
                        <Input placeholder="Nhập tên hoạt động" />
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
                    <Form.Item
                        name="date"
                        label="Thời gian hoạt động"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày diễn ra!' }]}
                    >
                        <DatePicker 
                            style={{ width: '100%' }} 
                            format="DD/MM/YYYY"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Chi tiết"
                        name="details"
                        rules={[{ required: true, message: "Vui lòng nhập chi tiết!" }]}
                    >
                        <Input.TextArea placeholder="Nhập mô tả hoạt động" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Thêm Hoạt động
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card className="rounded-lg shadow-lg">
                <Typography.Title level={3} className="mb-4 text-center">
                    Danh sách Hoạt động
                </Typography.Title>
                <List
                    bordered
                    dataSource={activities}
                    renderItem={(item) => (
                        <List.Item
                            key={item.id}
                            actions={[
                                <Button
                                    type="link"
                                    danger
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Xóa
                                </Button>,
                            ]}
                        >
                            <List.Item.Meta
                                title={<a onClick={() => showActivityDetails(item)}>{item.title}</a>}
                                description={`Thời gian: ${item.date}`}
                            />
                        </List.Item>
                    )}
                />
            </Card>
            <Modal
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                {selectedActivity && (
                    <div>
                        <h2 className="flex flex-row mb-3 text-base"><p>Hoạt động:&nbsp;</p><p className="font-bold">{selectedActivity.title}</p></h2>
                        <p className="italic text-yellow-600">Thời gian: {selectedActivity.date}</p>
                        <p>Chi tiết: {selectedActivity.details}</p>
                        {selectedActivity.image && (
                            <img src={selectedActivity.image} alt="Hình ảnh hoạt động" style={{ maxWidth: '100%', marginTop: '10px' }} />
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ActivitiesManagement;