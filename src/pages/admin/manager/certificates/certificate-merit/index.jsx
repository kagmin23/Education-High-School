import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Select, Upload, message } from 'antd';
import { toPng } from 'html-to-image';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

const CertificateMeritManagement = () => {
    const [classes, setClasses] = useState({});
    const [students, setStudents] = useState([]);
    const [className, setClassName] = useState('');
    const [studentName, setStudentName] = useState('');
    const [certificateImg, setCertificateImg] = useState('');
    const [imageWatermark, setImageWatermark] = useState('');

    // Load classes from localStorage on component mount
    useEffect(() => {
        const storedClasses = JSON.parse(localStorage.getItem('classes'));
        if (storedClasses) {
            setClasses(storedClasses);
        }
    }, []);

    // Handle class selection
    const handleClassSelect = (selectedClass) => {
        setClassName(selectedClass);
        setStudents(classes[selectedClass] || []); // Load students for the selected class
        setStudentName(''); // Clear the previously selected student name
    };

    // Handle form submission and create watermark
    const handleSubmit = () => {
        if (!certificateImg) {
            message.error('Please upload the certificate image!');
            return;
        }
        const element = document.getElementById('certificate-preview');
        if (element) {
            toPng(element)
                .then((dataUrl) => {
                    setImageWatermark(dataUrl);
                    localStorage.setItem('certificateWatermarkData', dataUrl);
                    message.success('Certificate saved with watermark!');
                })
                .catch(() => {
                    message.error('Failed to generate certificate with watermark');
                });
        }
    };

    // Handle image upload
    const handleImageUpload = (info) => {
        if (info.file.status === 'done') {
            const reader = new FileReader();
            reader.onload = () => setCertificateImg(reader.result);
            reader.readAsDataURL(info.file.originFileObj);
            message.success(`${info.file.name} uploaded successfully`);
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Giấy khen sơ bộ</h2>
            <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Chọn lớp" required>
                    <Select
                        placeholder="Chọn lớp"
                        onChange={handleClassSelect}
                        value={className}
                        required
                    >
                        {Object.keys(classes).map((classKey) => (
                            <Option key={classKey} value={classKey}>
                                {classKey}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                
                {students.length > 0 && (
                    <Form.Item label="Chọn học sinh" required>
                        <Select
                            placeholder="Chọn học sinh"
                            onChange={(value) => setStudentName(value)}
                            value={studentName}
                            required
                        >
                            {students.map((student) => (
                                <Option key={student} value={student}>
                                    {student}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}

                <Form.Item label="Tải lên hình ảnh giấy khen sơ bộ" required>
                    <Upload
                        accept="image/*"
                        showUploadList={false}
                        customRequest={handleImageUpload} // Manually handle the upload
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh giấy khen</Button>
                    </Upload>
                </Form.Item>

                {certificateImg && (
                    <div>
                        <h3 className="mt-4 font-semibold">Xem trước:</h3>
                        <div
                            id="certificate-preview"
                            className="relative p-4 bg-gray-100 border rounded-lg"
                        >
                            <img src={certificateImg} alt="Giấy khen" className="w-full rounded-lg" />
                            {/* Watermark - Signature */}
                            <span
                                className="absolute text-sm font-bold text-gray-700 bottom-4 right-4"
                            >
                                Ký tên sơ bộ
                            </span>
                        </div>
                    </div>
                )}

                <Form.Item className="mt-4">
                    <Button type="primary" htmlType="submit">Lưu giấy khen Sơ bộ</Button>
                </Form.Item>
            </Form>

            {/* Display the image with watermark if it's generated */}
            {imageWatermark && (
                <div>
                    <h3 className="mt-4 font-semibold">Hình ảnh đã lưu:</h3>
                    <img src={imageWatermark} alt="Giấy khen có watermark" className="w-full rounded-lg" />
                </div>
            )}
        </div>
    );
};

export default CertificateMeritManagement;
