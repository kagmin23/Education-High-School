import { DoubleLeftOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Modal } from "antd";
import React, { useState } from "react";

const { Header, Content, Footer } = Layout;

const schoolActivities = [
    {
        id: 1,
        title: "Ngày Nhà giáo Việt Nam",
        time: "20/11",
        details:
            "Lễ kỷ niệm tôn vinh các thầy cô giáo, chương trình văn nghệ, thi đua và tặng quà.",
        image: "https://via.placeholder.com/300x200?text=Ngày+Nhà+giáo+Việt+Nam",
    },
    {
        id: 2,
        title: "Ngày Quốc tế Phụ nữ",
        time: "8/3",
        details:
            "Chương trình chào mừng, giao lưu thể thao, tặng quà cho giáo viên nữ.",
        image:
            "https://file.royal.edu.vn/data/files/images/389-royal_tieu-hoc/2023%20(3).jpg",
    },
    {
        id: 3,
        title: "Ngày Quốc khánh",
        time: "2/9",
        details: "Lễ chào cờ, thi tìm hiểu lịch sử, văn nghệ chào mừng.",
        image: "https://via.placeholder.com/300x200?text=Ngày+Quốc+khánh",
    },
    {
        id: 4,
        title: "Ngày Sách và Văn hóa đọc Việt Nam",
        time: "21/4",
        details: "Hội sách, cuộc thi viết và kể chuyện, giao lưu với tác giả.",
        image: "https://via.placeholder.com/300x200?text=Ngày+Sách",
    },
    {
        id: 5,
        title: "Ngày Giải phóng miền Nam và Quốc tế Lao động",
        time: "30/4 - 1/5",
        details: "Lễ kỷ niệm, hoạt động ngoại khóa, văn nghệ và biểu diễn.",
        image: "https://via.placeholder.com/300x200?text=30/4+-+1/5",
    },
    {
        id: 6,
        title: "Ngày truyền thống học sinh sinh viên",
        time: "9/1",
        details: "Buổi lễ tri ân, giao lưu thể thao, chương trình nghệ thuật.",
        image: "https://via.placeholder.com/300x200?text=Ngày+truyền+thống+HSSV",
    },
    {
        id: 7,
        title: "Tháng thanh niên",
        time: "Tháng 3",
        details: "Phong trào tình nguyện, hội thảo kỹ năng sống.",
        image: "https://via.placeholder.com/300x200?text=Tháng+thanh+niên",
    },
    {
        id: 8,
        title: "Tết Nguyên Đán",
        time: "Tháng 1 hoặc 2 (Âm lịch)",
        details: "Chương trình Tết, hội chợ Tết.",
        image: "https://via.placeholder.com/300x200?text=Tết+Nguyên+Đán",
    },
];

const SchoolActivity = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const showModal = (activity) => {
        setSelectedActivity(activity);
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <Layout className="min-h-screen">
            <Button
                icon={<DoubleLeftOutlined />}
                onClick={() => window.history.back()}
                className="text-xs text-white bg-slate-500"
                style={{
                    position: "fixed",
                    top: "16px",
                    left: "16px",
                    zIndex: 1000,
                }}
            >
                Back
            </Button>
            <Content className="p-8 bg-gradient-to-r from-blue-100 to-blue-200">
                <h2 className="mb-8 text-3xl font-bold text-center text-blue-800">
                    Các hoạt động của trường
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {schoolActivities.map((activity) => (
                        <Card
                            key={activity.id}
                            hoverable
                            cover={
                                <img
                                    alt={activity.title}
                                    src={activity.image}
                                    className="object-cover h-48"
                                />
                            }
                            className="overflow-hidden transition-shadow duration-300 shadow-md hover:shadow-xl"
                            onClick={() => showModal(activity)}
                        >
                            <Card.Meta
                                title={
                                    <span className="text-lg font-semibold text-blue-700">
                                        {activity.title}
                                    </span>
                                }
                                description={
                                    <span className="text-gray-600">{activity.time}</span>
                                }
                            />
                        </Card>
                    ))}
                </div>
            </Content>
            <Footer className="text-center text-white bg-blue-500">
                High School ©2024 Created by KagMin
            </Footer>
            <Modal
                title={
                    <span className="text-xl text-blue-700">
                        {selectedActivity?.title}
                    </span>
                }
                visible={modalVisible}
                onCancel={handleCancel}
                footer={null}
                width={700}
            >
                <img
                    src={selectedActivity?.image}
                    alt={selectedActivity?.title}
                    className="w-full mb-4 rounded-lg"
                />
                <p className="mb-2">
                    <strong>Thời gian:</strong> {selectedActivity?.time}
                </p>
                <p>
                    <strong>Chi tiết:</strong> {selectedActivity?.details}
                </p>
            </Modal>
        </Layout>
    );
};

export default SchoolActivity;
