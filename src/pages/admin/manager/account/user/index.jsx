import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import '../../main.css';

const UserAccount = () => {
    const [userAccounts, setUserAccounts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteConfirmModalVisible, setIsDeleteConfirmModalVisible] = useState(false);
    const [isStatusConfirmModalVisible, setIsStatusConfirmModalVisible] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [form] = Form.useForm();

    const addDefaultFields = (account) => ({
        ...account,
        timestamp: account.timestamp || Date.now(),
        status: account.status || 'Hoạt động',
        created_at: account.created_at || new Date().toISOString()
    });

    useEffect(() => {
        const loadAndSortAccounts = () => {
            try {
                const storedData = JSON.parse(localStorage.getItem('userAccountsData')) || [];

                // Thêm trường mặc định cho mỗi tài khoản
                const accountsWithDefaults = storedData.map(addDefaultFields);

                // Sắp xếp theo thời gian tạo mới nhất (ưu tiên created_at, sau đó đến timestamp)
                const sortedAccounts = accountsWithDefaults.sort((a, b) => {
                    const dateA = new Date(a.created_at || a.timestamp);
                    const dateB = new Date(b.created_at || b.timestamp);
                    return dateB - dateA;
                });

                // Cập nhật lại key sau khi sắp xếp
                const accountsWithKeys = sortedAccounts.map((account, index) => ({
                    ...account,
                    key: index + 1
                }));
                setUserAccounts(accountsWithKeys);

                // Lưu lại data đã được chuẩn hóa
                localStorage.setItem('userAccountsData', JSON.stringify(accountsWithKeys));
            } catch (error) {
                console.error('Error loading accounts:', error);
                setUserAccounts([]);
            }
        };
        loadAndSortAccounts();

        // Set up interval để tự động refresh data
        const intervalId = setInterval(loadAndSortAccounts, 5000); // Refresh mỗi 5 giây

        // Cleanup interval khi component unmount
        return () => clearInterval(intervalId);
    }, []);

    const handleAddOrUpdate = (values) => {
        const currentTime = new Date().toISOString();
        const accountData = {
            ...values,
            image: imageUrl,
            status: 'Hoạt động',
            timestamp: Date.now(),
            created_at: currentTime,
            key: 1
        };
        let updatedAccounts;

        if (editIndex !== null) {
            // Khi cập nhật, giữ nguyên timestamp và created_at
            const oldAccount = userAccounts[editIndex];
            updatedAccounts = userAccounts.map((account, index) =>
                index === editIndex
                    ? {
                        ...accountData,
                        status: oldAccount.status,
                        timestamp: oldAccount.timestamp,
                        created_at: oldAccount.created_at
                    }
                    : account
            );
        } else {
            // Thêm mới tài khoản
            updatedAccounts = [accountData, ...userAccounts];
        }

        // Cập nhật lại key cho tất cả các tài khoản
        updatedAccounts = updatedAccounts.map((account, index) => ({
            ...account,
            key: index + 1
        }));

        setUserAccounts(updatedAccounts);
        localStorage.setItem('userAccountsData', JSON.stringify(updatedAccounts));
        setIsModalVisible(false);
        setEditIndex(null);
        form.resetFields();
        setImageUrl(null);
    };

    const confirmDelete = () => {
        const updatedAccounts = userAccounts
            .filter((_, i) => i !== userAccounts.indexOf(selectedAccount))
            .map((account, index) => ({
                ...account,
                key: index + 1
            }));

        setUserAccounts(updatedAccounts);
        localStorage.setItem('userAccountsData', JSON.stringify(updatedAccounts));
        setIsDeleteConfirmModalVisible(false);
        setSelectedAccount(null);
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        form.setFieldsValue(userAccounts[index]);
        setImageUrl(userAccounts[index].image);
        setIsModalVisible(true);
    };

    const handleDelete = (index) => {
        setSelectedAccount(userAccounts[index]);
        setIsDeleteConfirmModalVisible(true);
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
        setSelectedAccount(userAccounts[index]);
        setIsStatusConfirmModalVisible(true);
    };

    const confirmStatusChange = (newStatus) => {
        const updatedAccounts = userAccounts.map((account, index) => {
            if (index === userAccounts.indexOf(selectedAccount)) {
                return { ...account, status: newStatus };
            }
            return account;
        });

        setUserAccounts(updatedAccounts);
        localStorage.setItem('userAccountsData', JSON.stringify(updatedAccounts));
        setIsStatusConfirmModalVisible(false);
        setSelectedAccount(null);
    };

    const columns = [
        { title: 'STT', dataIndex: 'key', width: 10, align: "center" },
        { title: 'Tài khoản', dataIndex: 'username', width: 150 },
        { title: 'Mật khẩu', dataIndex: 'password', width: 150 },
        { title: 'Họ và Tên', dataIndex: 'fullName', width: 150 },
        { title: 'Giới tính', dataIndex: 'gender', width: 90, align: "center" },
        { title: 'Chức vụ', dataIndex: 'role', width: 120, align: "center" },
        {
            title: 'Hình ảnh',
            align: "center",
            dataIndex: 'image',
            render: (image) => (
                <div className="flex items-center justify-center h-full">
                    {image ? (
                        <img src={image} alt="avatar" className="w-12 h-12 rounded-full" />
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
                <div>Tổng số tài khoản Người dùng: {userAccounts.length}</div>
                <Button type="primary" onClick={handleAdd} className="mb-4">
                    <PlusOutlined /> Thêm Tài khoản
                </Button>
            </div>
            <Table columns={columns} className="custom-table" dataSource={userAccounts} pagination={false} />

            {/* Modal Thêm/Cập nhật */}
            <Modal
                title={editIndex !== null ? 'Cập nhật Tài khoản' : 'Thêm Tài khoản'}
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
                    <Form.Item name="role" label="Chức vụ" rules={[{ required: true, message: 'Vui lòng chọn chức vụ!' }]}>
                        <Select placeholder="Lựa chọn chức vụ cho đăng nhập">
                            <Select.Option value="Học sinh">Học sinh</Select.Option>
                            <Select.Option value="Phụ huynh">Phụ huynh</Select.Option>
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
                            <img src={selectedAccount.image} alt="avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                        )}
                    </>
                )}
            </Modal>

            {/* Modal xác nhận thay đổi trạng thái */}
            <Modal
                title="Xác nhận thay đổi trạng thái!"
                visible={isStatusConfirmModalVisible}
                onCancel={() => setIsStatusConfirmModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsStatusConfirmModalVisible(false)}>
                        Hủy
                    </Button>,
                    <Button
                        key="confirm"
                        type="primary"
                        onClick={() =>
                            confirmStatusChange(
                                selectedAccount?.status === 'Hoạt động' ? 'Khoá' : 'Hoạt động'
                            )
                        }
                    >
                        Xác nhận
                    </Button>,
                ]}
            >
                <p>
                    {selectedAccount?.status === 'Hoạt động'
                        ? 'Bạn có chắc chắn muốn Khoá tài khoản này không?'
                        : 'Bạn có chắc chắn muốn mở Hoạt động cho tài khoản này không?'}
                </p>
                {selectedAccount && (
                    <>
                        <p>Trạng thái hiện tại: {selectedAccount.status}</p>
                        <p>Tài khoản: {selectedAccount.username}</p>
                        <p>Họ và Tên: {selectedAccount.fullName}</p>
                        <p>Hình ảnh:</p>
                        {selectedAccount.image && (
                            <img src={selectedAccount.image} alt="avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                        )}
                    </>
                )}
            </Modal>
        </div>
    );
};

export default UserAccount;
