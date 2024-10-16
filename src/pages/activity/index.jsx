import { DoubleLeftOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Modal } from "antd";
import React, { useEffect, useState } from "react";

const { Header, Content, Footer } = Layout;

const SchoolActivity = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [activities, setActivities] = useState([]);

    // Lấy dữ liệu từ localStorage khi component được mount
    useEffect(() => {
        const storedActivities = JSON.parse(localStorage.getItem("schoolActivitiesData")) || [];
        setActivities(storedActivities);
    }, []);

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
                    Các hoạt động của Trường
                </h2>
                {activities.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {activities.map((activity) => (
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
                                        <span className="text-gray-600">{activity.date}</span>
                                    }
                                />
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Không có hoạt động nào được tìm thấy.</p>
                )}
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
                    <strong>Thời gian:</strong> {selectedActivity?.date}
                </p>
                <p>
                    <strong>Chi tiết:</strong> {selectedActivity?.details}
                </p>
            </Modal>
        </Layout>
    );
};

export default SchoolActivity;
