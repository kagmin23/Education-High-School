import { DoubleLeftOutlined } from '@ant-design/icons';
import { Button, Card, List, Tabs, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

const { TabPane } = Tabs;

const SchoolEvent = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('schoolEventData')) || [];
        setEvents(storedEvents);
    }, []);

    const filterEventsByStatus = (status) => {
        return events.filter(event => event.status === status);
    };

    return (
        <div className="container p-5 mx-auto">
            <Button
                icon={<DoubleLeftOutlined />}
                onClick={() => window.history.back()}
                style={{
                    position: 'fixed',
                    top: '16px',
                    left: '16px',
                    zIndex: 1000,
                }}
            >
                Back
            </Button>
            <Card className="rounded-lg shadow-lg">
                <Typography.Title level={3} className="mb-4 text-center">
                    School Events
                </Typography.Title>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Sắp tới" key="1">
                        <EventList events={filterEventsByStatus('upcoming')} />
                    </TabPane>
                    <TabPane tab="Đang diễn ra" key="2">
                        <EventList events={filterEventsByStatus('ongoing')} />
                    </TabPane>
                    <TabPane tab="Đã diễn ra" key="3">
                        <EventList events={filterEventsByStatus('past')} />
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    );
};

const EventList = ({ events }) => {
    return (
        <List
            bordered
            dataSource={events}
            renderItem={(item) => (
                <List.Item key={item.id}>
                    <div className="flex items-center w-full space-x-4">
                        <img src={item.image} alt={item.title} className="object-cover w-32 h-32 rounded" />
                        <div className="flex flex-col justify-between flex-1">
                            <div>
                                <Typography.Title level={4}>{item.title}</Typography.Title>
                            </div>
                            <div>
                                <p>{item.description}</p>
                            </div>
                            <div>
                                <Typography.Text type="danger">{item.date}</Typography.Text>
                            </div>
                        </div>
                        <div className="ml-auto">
                            <Button type="primary">Quan tâm</Button>
                        </div>
                    </div>
                </List.Item>
            )}
        />
    );
};

export default SchoolEvent;
