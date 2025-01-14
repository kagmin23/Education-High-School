import { Table } from 'antd';
import React, { useEffect, useState } from 'react';

const TimeOnline = () => {
    const [events, setEvents] = useState([]);

    // Lấy dữ liệu từ localStorage khi component render
    useEffect(() => {
        const storedData = localStorage.getItem('onlineTimeTable');
        if (storedData) {
            setEvents(JSON.parse(storedData)); // Lưu trữ dữ liệu vào state
        }
    }, []);

    const columns = [
        { title: 'Sự kiện', dataIndex: 'name', key: 'name', width: '40%' },
        { title: 'Ngày', align: 'center', dataIndex: 'date', key: 'date' },
        { title: 'Giờ', align: 'center', dataIndex: 'time', key: 'time' },
        {
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            render: (text) => (
                text ? (
                    <a href={text} target="_blank" rel="noopener noreferrer">
                        {text}
                    </a>
                ) : 'Không có'
            ),
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={events} rowKey="key" />
        </div>
    );
};

export default TimeOnline;
