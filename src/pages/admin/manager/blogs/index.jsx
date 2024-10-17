import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, List, message, Upload } from 'antd';
import React, { useEffect, useState } from 'react';

const BlogManagement = () => {
    const [form] = Form.useForm();
    const [blogData, setBlogData] = useState([]);
    const [currentBlog, setCurrentBlog] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem('schoolBlogData');
        if (data) {
            setBlogData(JSON.parse(data));
        }
    }, []);

    const onFinish = (values) => {
        const newBlogData = currentBlog
            ? blogData.map((blog) =>
                blog.id === currentBlog.id
                    ? { ...currentBlog, ...values, image: imageUrl }
                    : blog
            )
            : [...blogData, { ...values, id: Date.now(), image: imageUrl }];

        setBlogData(newBlogData);
        localStorage.setItem('schoolBlogData', JSON.stringify(newBlogData));
        message.success('Thông tin đã được lưu!');
        form.resetFields();
        setCurrentBlog(null);
        setImageUrl(null);
    };

    const smoothScrollTo = (target) => {
        const scrollDuration = 500; // Thời gian cuộn (ms)
        const start = window.scrollY;
        const distance = target - start;
        let startTime = null;

        const animation = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / scrollDuration, 1);
            const ease = easeInOutQuad(progress); // Hàm easing

            window.scrollTo(0, start + distance * ease);
            if (timeElapsed < scrollDuration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    };

    const easeInOutQuad = (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // Hàm easing
    };

    const editBlog = (blog) => {
        setCurrentBlog(blog);
        form.setFieldsValue(blog);
        setImageUrl(blog.image || null);
        
        // Cuộn lên đầu trang khi chỉnh sửa blog
        smoothScrollTo(0);
    };

    const deleteBlog = (id) => {
        const updatedBlogData = blogData.filter(blog => blog.id !== id);
        setBlogData(updatedBlogData);
        localStorage.setItem('schoolBlogData', JSON.stringify(updatedBlogData));
        message.success('Blog đã được xóa!');
    };

    const handleImageUpload = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
        return false; // Prevent the default upload behavior
    };

    return (
        <div className="container mx-auto">
            <Card title="Quản lý Blog" style={{ marginBottom: 20 }}>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="title"
                        label="Tiêu đề"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                    >
                        <Input placeholder="Nhập tiêu đề" />
                    </Form.Item>
                    <Form.Item
                        name="content"
                        label="Nội dung"
                        rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Nhập nội dung" />
                    </Form.Item>
                    <Form.Item label="Hình ảnh">
                        <Upload
                            beforeUpload={handleImageUpload}
                            listType="picture-card"
                            showUploadList={false}
                        >
                            {imageUrl ? (
                                <img src={imageUrl} alt="blog" style={{ width: '100%' }} />
                            ) : (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {currentBlog ? 'Cập nhật' : 'Tạo Blog'}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <List
                bordered
                dataSource={blogData}
                renderItem={(blog) => (
                    <List.Item
                        actions={[
                            <Button type="link" onClick={() => editBlog(blog)}>Chỉnh sửa</Button>,
                            <Button type="link" danger onClick={() => deleteBlog(blog.id)}>Xóa</Button>,
                        ]}
                    >
                        <List.Item.Meta
                            title={blog.title}
                            description={blog.content}
                        />
                        <div className="ml-4">{blog.image && <img src={blog.image} alt="Blog" style={{ width: '100px', marginTop: '10px' }} />}</div>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default BlogManagement;
