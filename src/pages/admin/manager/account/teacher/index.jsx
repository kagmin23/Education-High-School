import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import subjects from '../../../../../models/typesSubAdd';
import '../../main.css';

const TeacherAccount = () => {
    const [teacherAccounts, setTeacherAccounts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        // Load data from localStorage
        const storedData = JSON.parse(localStorage.getItem('teacherAccountsData')) || [];
        setTeacherAccounts(storedData);
    }, []);

    const handleAddOrUpdate = (values) => {
        const updatedAccounts = [...teacherAccounts];
        if (editIndex !== null) {
            // Update existing account
            updatedAccounts[editIndex] = { ...updatedAccounts[editIndex], ...values };
        } else {
            // Add new account
            updatedAccounts.push({ key: updatedAccounts.length + 1, ...values });
        }
        setTeacherAccounts(updatedAccounts);
        localStorage.setItem('teacherAccountsData', JSON.stringify(updatedAccounts));
        setIsModalVisible(false);
        setEditIndex(null);
        form.resetFields();
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        form.setFieldsValue(teacherAccounts[index]);
        setIsModalVisible(true);
    };

    const handleDelete = (index) => {
        Modal.confirm({
            title: 'Xóa tài khoản giáo viên',
            content: 'Bạn có chắc chắn muốn xóa tài khoản này?',
            onOk: () => {
                const updatedAccounts = teacherAccounts.filter((_, i) => i !== index);
                setTeacherAccounts(updatedAccounts);
                localStorage.setItem('teacherAccountsData', JSON.stringify(updatedAccounts));
            },
        });
    };

    const handleAdd = () => {
        setIsModalVisible(true);
        setEditIndex(null);
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

    const columns = [
        { title: 'STT', dataIndex: 'key', width: '10%' },
        { title: 'Tài khoản', dataIndex: 'username', width: '20%' },
        { title: 'Mật khẩu', dataIndex: 'password', width: '20%' },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            render: (text) => (
                <span>{text || 'Đang cập nhật'}</span>
            ),
        },
        { title: 'Họ và Tên', dataIndex: 'fullName', width: '20%' },
        { title: 'Giới tính', dataIndex: 'gender', width: '10%' },
        { title: 'Số điện thoại', dataIndex: 'phone', width: '10%' },
        { title: 'Bộ Môn', dataIndex: 'subject', width: '10%' },
        {
            title: 'Hành động',
            render: (_, record, index) => (
                <>
                    <Button type="link" onClick={() => handleEdit(index)}>Sửa</Button>
                    <Button type="link" danger onClick={() => handleDelete(index)}>Xóa</Button>
                </>
            ),
        },
    ];

    return (
        <div className="">
            <Button type="primary" onClick={handleAdd} className="mb-4">
                <PlusOutlined /> Thêm Tài khoản
            </Button>
            <Table columns={columns} className="custom-table" dataSource={teacherAccounts} pagination={false} />

            <Modal
                title={editIndex !== null ? 'Cập nhật Tài khoản' : 'Thêm Tài khoản'}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleAddOrUpdate} layout="vertical">
                    <Form.Item name="username" label="Tài khoản" rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}>
                        <Input placeholder="Nhập tài khoản"/>
                    </Form.Item>
                    <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                        <Input.Password placeholder="Nhập mật khẩu"/>
                    </Form.Item>
                    <Form.Item label="Hình ảnh" rules={[{ required: false, message: 'Vui lòng tải lên hình ảnh!' }]}>
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
                    <Form.Item name="fullName" label="Họ và Tên" rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}>
                        <Input placeholder="Nhập họ tên"/>
                    </Form.Item>
                    <Form.Item name="gender" label="Giới tính">
                        <Select placeholder="Chọn giới tính">
                            <Select.Option value="Male">Nam</Select.Option>
                            <Select.Option value="Female">Nữ</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                        <Input placeholder="Nhập số điện thoại"/>
                    </Form.Item>
                    <Form.Item name="subject" label="Bộ Môn" rules={[{ required: true, message: 'Vui lòng chọn bộ môn!' }]}>
                        <Select options={subjects} placeholder="Lựa chọn bộ môn Giáo viên"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editIndex !== null ? 'Cập nhật' : 'Thêm'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TeacherAccount;
