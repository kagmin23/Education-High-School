import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import subjects from '../../../../../models/typesSubAdd';
import '../../main.css';

const TeacherAccount = () => {
    const [teachers, setTeachers] = useState([]);  // Thêm state để lưu danh sách giáo viên
    const [teacherAccounts, setTeacherAccounts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteConfirmModalVisible, setIsDeleteConfirmModalVisible] = useState(false);
    const [isStatusConfirmModalVisible, setIsStatusConfirmModalVisible] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        // Lấy dữ liệu giáo viên từ localStorage
        const storedTeachers = JSON.parse(localStorage.getItem('teachers')) || [];
        setTeachers(storedTeachers);

        const storedTeacherAccounts = JSON.parse(localStorage.getItem('teacherAccountsData')) || [];
        setTeacherAccounts(storedTeacherAccounts);
    }, []);

    const handleAddOrUpdate = (values) => {
        const updatedAccounts = [...teacherAccounts];
        const accountData = { ...values, image: imageUrl };

        if (editIndex !== null) {
            updatedAccounts[editIndex] = { ...updatedAccounts[editIndex], ...accountData };
        } else {
            updatedAccounts.push({ key: updatedAccounts.length + 1, status: 'Hoạt động', ...accountData });
        }

        setTeacherAccounts(updatedAccounts);
        localStorage.setItem('teacherAccountsData', JSON.stringify(updatedAccounts));
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
        localStorage.setItem('teacherAccountsData', JSON.stringify(updatedAccounts));
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
        localStorage.setItem('teacherAccountsData', JSON.stringify(updatedAccounts));
        setIsStatusConfirmModalVisible(false);
        setSelectedAccount(null);
    };

    const columns = [
        { title: 'STT', dataIndex: 'key', width: 10, align: "center" },
        { title: 'Tài khoản', dataIndex: 'username', width: 150 },
        { title: 'Mật khẩu', dataIndex: 'password', width: 150 },
        { title: 'Giáo viên', dataIndex: 'teachers', width: 150 },
        { title: 'Giới tính', dataIndex: 'gender', width: 90, align: "center" },
        { title: 'Bộ môn', dataIndex: 'subject', width: 120, align: "center" },
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
                <div>Tổng số tài khoản Giáo viên: {teacherAccounts.length}</div>
                <Button type="primary" onClick={handleAdd} className="mb-4">
                    <PlusOutlined /> Thêm Tài khoản
                </Button>
            </div>
            <Table columns={columns} className="custom-table" dataSource={teacherAccounts} pagination={false} />

            {/* Modal Thêm/Cập nhật */}
            <Modal
                title={editIndex !== null ? 'Cập nhật Tài khoản Giáo viên' : 'Thêm Tài khoản Giáo viên'}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleAddOrUpdate} layout="vertical">
                    <Form.Item
                        name="teachers"
                        label="Giáo viên"
                        rules={[{ required: true, message: "Vui lòng chọn Giáo viên!" }]}
                    >
                        <Select placeholder="Lựa chọn Giáo viên">
                            {teachers.map((teacher, index) => (
                                <Select.Option key={index} value={teacher.name}>
                                    {teacher.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="subject" label="Bộ Môn" rules={[{ required: true, message: 'Vui lòng chọn bộ môn!' }]}>
                        <Select options={subjects} placeholder="Lựa chọn bộ môn Giáo viên" />
                    </Form.Item>
                    <Form.Item name="username" label="Tài khoản" rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}>
                        <Input placeholder="Nhập tên tài khoản" />
                    </Form.Item>
                    <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>
                    <Form.Item name="gender" label="Giới tính" rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}>
                        <Select placeholder="Chọn giới tính">
                            <Select.Option value="Nam">Nam</Select.Option>
                            <Select.Option value="Nữ">Nữ</Select.Option>
                        </Select>
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
                                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
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

            {/* Modal Xác nhận xóa */}
            <Modal
                title="Xác nhận xóa"
                visible={isDeleteConfirmModalVisible}
                onOk={confirmDelete}
                onCancel={() => setIsDeleteConfirmModalVisible(false)}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                <p>Bạn có chắc chắn muốn xóa tài khoản này không?</p>
            </Modal>

            {/* Modal Xác nhận trạng thái */}
            <Modal
                title="Xác nhận thay đổi trạng thái"
                visible={isStatusConfirmModalVisible}
                onOk={() => confirmStatusChange('Khoá')}
                onCancel={() => setIsStatusConfirmModalVisible(false)}
                okText="Khoá"
                cancelText="Hủy"
            >
                <p>Bạn có chắc chắn muốn thay đổi trạng thái tài khoản này?</p>
            </Modal>
        </div>
    );
};

export default TeacherAccount;
