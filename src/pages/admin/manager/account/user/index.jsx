import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import '../../main.css';

const UserAccount = () => {
    const [userAccounts, setUserAccounts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        // Load data from localStorage
        const storedData = JSON.parse(localStorage.getItem('userAccountsData')) || [];
        setUserAccounts(storedData);
    }, []);

    const handleAddOrUpdate = (values) => {
        const updatedAccounts = [...userAccounts];
        if (editIndex !== null) {
            // Update existing account
            updatedAccounts[editIndex] = { ...updatedAccounts[editIndex], ...values };
        } else {
            // Add new account
            updatedAccounts.push({ key: updatedAccounts.length + 1, ...values });
        }
        setUserAccounts(updatedAccounts);
        localStorage.setItem('userAccountsData', JSON.stringify(updatedAccounts));
        setIsModalVisible(false);
        setEditIndex(null);
        form.resetFields();
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        form.setFieldsValue(userAccounts[index]);
        setIsModalVisible(true);
    };

    const handleDelete = (index) => {
        Modal.confirm({
            title: 'Xóa tài khoản người dùng',
            content: 'Bạn có chắc chắn muốn xóa tài khoản này?',
            onOk: () => {
                const updatedAccounts = userAccounts.filter((_, i) => i !== index);
                setUserAccounts(updatedAccounts);
                localStorage.setItem('userAccountsData', JSON.stringify(updatedAccounts));
            },
        });
    };

    const handleLock = (index) => {
        Modal.confirm({
            title: 'Khóa tài khoản người dùng',
            content: 'Bạn có chắc chắn muốn khóa tài khoản này?',
            onOk: () => {
                const updatedAccounts = [...userAccounts];
                updatedAccounts[index].isLocked = true;
                setUserAccounts(updatedAccounts);
                localStorage.setItem('userAccountsData', JSON.stringify(updatedAccounts));
            },
        });
    };

    const handleAdd = () => {
        setIsModalVisible(true);
        setEditIndex(null);
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
        { title: 'Chức vụ', dataIndex: 'role', width: '10%' },
        {
            title: 'Hành động',
            render: (_, record, index) => (
                <>
                    <Button type="link" onClick={() => handleEdit(index)}>Sửa</Button>
                    <Button type="link" danger onClick={() => handleDelete(index)}>Xóa</Button>
                    <Button type="link" onClick={() => handleLock(index)} disabled={record.isLocked}>
                        {record.isLocked ? 'Đã khóa' : 'Khóa'}
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div className="">
            <Button type="primary" onClick={handleAdd} className="mb-4">
                <PlusOutlined /> Thêm Tài khoản
            </Button>
            <Table columns={columns} className="custom-table" dataSource={userAccounts} pagination={false} />

            <Modal
                title={editIndex !== null ? 'Cập nhật Tài khoản' : 'Thêm Tài khoản'}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleAddOrUpdate} layout="vertical">
                    <Form.Item name="username" label="Tài khoản" rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="image" label="Hình ảnh">
                        <Upload>
                            <Button>Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item name="fullName" label="Họ và Tên" rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="gender" label="Giới tính">
                        <Select>
                            <Select.Option value="Male">Nam</Select.Option>
                            <Select.Option value="Female">Nữ</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="role" label="Chức vụ" rules={[{ required: true, message: 'Vui lòng chọn chức vụ!' }]}>
                        <Select>
                            <Select.Option value="Student">Học sinh</Select.Option>
                            <Select.Option value="Parent">Phụ huynh</Select.Option>
                        </Select>
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

export default UserAccount;
