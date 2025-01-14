import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import subjects from '../../../../../models/typesSubAdd';
import '../../main.css';

const AdminAccount = () => {
    const [teacherAccounts, setTeacherAccounts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteConfirmModalVisible, setIsDeleteConfirmModalVisible] = useState(false);
    const [isStatusConfirmModalVisible, setIsStatusConfirmModalVisible] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('adminAccountsData')) || [];
        setTeacherAccounts(storedData);
    }, []);

    const handleAddOrUpdate = (values) => {
        const updatedAccounts = [...teacherAccounts];
        const accountData = { ...values, image: imageUrl };

        // Ensure password field is saved properly
        if (editIndex !== null) {
            updatedAccounts[editIndex] = { ...updatedAccounts[editIndex], ...accountData };
        } else {
            updatedAccounts.push({ key: updatedAccounts.length + 1, status: 'Hoạt động', ...accountData });
        }

        setTeacherAccounts(updatedAccounts);
        localStorage.setItem('adminAccountsData', JSON.stringify(updatedAccounts));
        setIsModalVisible(false);
        setEditIndex(null);
        form.resetFields();
        setImageUrl(null);
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        form.setFieldsValue(teacherAccounts[index]);
        setImageUrl(teacherAccounts[index].image);
        setIsModalVisible(true);
    };

    const handleDelete = (index) => {
        setSelectedAccount(teacherAccounts[index]);
        setIsDeleteConfirmModalVisible(true);
    };

    const confirmDelete = () => {
        const updatedAccounts = teacherAccounts.filter((_, i) => i !== teacherAccounts.indexOf(selectedAccount));
        setTeacherAccounts(updatedAccounts);
        localStorage.setItem('adminAccountsData', JSON.stringify(updatedAccounts));
        setIsDeleteConfirmModalVisible(false);
        setSelectedAccount(null);
    };

    const handleAdd = () => {
        setIsModalVisible(true);
        setEditIndex(null);
        setSelectedAccount(null);
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

    const handleStatusChange = (index) => {
        setSelectedAccount(teacherAccounts[index]);
        setIsStatusConfirmModalVisible(true);
    };

    const confirmStatusChange = (newStatus) => {
        const updatedAccounts = [...teacherAccounts];
        updatedAccounts[teacherAccounts.indexOf(selectedAccount)].status = newStatus;
        setTeacherAccounts(updatedAccounts);
        localStorage.setItem('adminAccountsData', JSON.stringify(updatedAccounts));
        setIsStatusConfirmModalVisible(false);
        setSelectedAccount(null);
    };

    const columns = [
        { title: 'STT', dataIndex: 'key', width: 10, align: "center" },
        { title: 'Tài khoản', dataIndex: 'username', width: 150 },
        { title: 'Mật khẩu', dataIndex: 'password', width: 150 },
        { title: 'Họ và Tên', dataIndex: 'fullName', width: 150 },
        { title: 'Giới tính', dataIndex: 'gender', width: 90, align: "center" },
        {
            title: 'Hình ảnh',
            align: "center",
            dataIndex: 'image',
            render: (image) => (
                <div className="flex items-center justify-center h-full">
                    {image ? (
                        <img src={image} alt="image" className="w-12 h-12 rounded-full" />
                    ) : (
                        'Đang cập nhật'
                    )}
                </div>
            ),
        },
        {
            title: 'Trạng thái',
            align: "center",
            dataIndex: 'status',
            render: (status, _, index) => (
                <Select
                    size="small"
                    value={status}
                    onChange={() => handleStatusChange(index)}
                >
                    <Select.Option value="Hoạt động">Hoạt động</Select.Option>
                    <Select.Option value="Khoá">Khoá</Select.Option>
                </Select>
            ),
        },
        {
            title: 'Actions',
            align: "center",
            render: (_, record, index) => (
                <div className="flex justify-center gap-2">
                    <Button type="link" size="small" icon={<EditOutlined />} onClick={() => handleEdit(index)}></Button>
                    <Button type="link" size="small" icon={<DeleteOutlined />} danger onClick={() => handleDelete(index)}></Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>Tổng số tài khoản Admin: {teacherAccounts.length}</div>
                <Button type="primary" onClick={handleAdd} className="mb-4">
                    <PlusOutlined /> Thêm Tài khoản
                </Button>
            </div>
            <Table columns={columns} className="custom-table" dataSource={teacherAccounts} pagination={false} />

            {/* Modal Thêm/Cập nhật */}
            <Modal
                title={editIndex !== null ? 'Cập nhật Tài khoản Admin' : 'Thêm Tài khoản Admin'}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleAddOrUpdate} layout="vertical">
                    <Form.Item name="username" label="Tài khoản" rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}>
                        <Input placeholder="Nhập tên tài khoản" />
                    </Form.Item>
                    <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>
                    <Form.Item name="fullName" label="Họ và Tên" rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}>
                        <Input placeholder="Nhập họ và tên" />
                    </Form.Item>
                    <Form.Item name="gender" label="Giới tính" rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}>
                        <Select placeholder="Chọn giới tính">
                            <Select.Option value="Nam">Nam</Select.Option>
                            <Select.Option value="Nữ">Nữ</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="subject" label="Bộ Môn" rules={[{ required: false, message: 'Vui lòng chọn bộ môn!' }]}>
                        <Select options={subjects} placeholder="Lựa chọn bộ môn Admin" />
                    </Form.Item>
                    <Form.Item label="Hình ảnh">
                        <Upload
                            listType="picture-card"
                            showUploadList={false}
                            beforeUpload={(file) => {
                                handleImageUpload(file);
                                return false;
                            }}
                        >
                            {imageUrl ? (
                                <img src={imageUrl} alt="image" style={{ width: '100%' }} />
                            ) : (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                    <Form.Item className="text-end">
                        <Button type="primary" htmlType="submit">
                            {editIndex !== null ? 'Cập nhật' : 'Thêm'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Modal xác nhận xóa tài khoản */}
            <Modal
                title="Xác nhận xóa tài khoản!"
                visible={isDeleteConfirmModalVisible}
                onCancel={() => setIsDeleteConfirmModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsDeleteConfirmModalVisible(false)}>
                        Hủy
                    </Button>,
                    <Button key="confirm" type="primary" danger onClick={confirmDelete}>
                        Xóa
                    </Button>,
                ]}
            >
                <p>Bạn có chắc chắn muốn xóa tài khoản này?</p>
                {selectedAccount && (
                    <>
                        <p>Trạng thái hiện tại: {selectedAccount.status}</p>
                        <p>Tài khoản: {selectedAccount.username}</p>
                        <p>Họ và Tên: {selectedAccount.fullName}</p>
                        <p>Hình ảnh:</p>
                        {selectedAccount.image && (
                            <img src={selectedAccount.image} alt="avatar" style={{ width: '100px' }} />
                        )}
                    </>
                )}
            </Modal>

            {/* Modal thay đổi trạng thái */}
            <Modal
                title="Xác nhận thay đổi trạng thái"
                visible={isStatusConfirmModalVisible}
                onCancel={() => setIsStatusConfirmModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsStatusConfirmModalVisible(false)}>
                        Hủy
                    </Button>,
                    <Button
                        key="confirm"
                        type="primary"
                        onClick={() => confirmStatusChange('Khoá')}
                    >
                        Khoá
                    </Button>,
                    <Button
                        key="confirm"
                        type="primary"
                        onClick={() => confirmStatusChange('Hoạt động')}
                    >
                        Hoạt động
                    </Button>,
                ]}
            >
                <p>Bạn có chắc chắn muốn thay đổi trạng thái của tài khoản này?</p>
                {selectedAccount && (
                    <>
                        <p>Tài khoản: {selectedAccount.username}</p>
                        <p>Trạng thái hiện tại: {selectedAccount.status}</p>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default AdminAccount;
