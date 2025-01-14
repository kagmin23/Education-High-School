import {
    Button,
    DatePicker,
    Form,
    Input,
    Layout,
    Modal,
    Popconfirm,
    Table,
    TimePicker,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
  
  const { Header, Content } = Layout;
  
  const OnlineTimeTable = () => {
    const [questions, setQuestions] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingEvent, setEditingEvent] = useState(null);
  
    // Load data from localStorage on component mount
    useEffect(() => {
      const storedData = localStorage.getItem('onlineTimeTable');
      if (storedData) {
        setQuestions(JSON.parse(storedData)); // Load data if available
      }
    }, []); // Empty dependency array to run only on mount
  
    // Save data to localStorage whenever questions change
    useEffect(() => {
      if (questions.length > 0) {
        localStorage.setItem('onlineTimeTable', JSON.stringify(questions)); // Save questions to localStorage
      }
    }, [questions]); // Save to localStorage whenever questions change
  
    const showModal = (event = null) => {
      if (event) {
        setEditingEvent(event);
        form.setFieldsValue({
          name: event.name,
          date: moment(event.date, 'YYYY-MM-DD'),
          time: moment(event.time, 'HH:mm'),
          link: event.link || '', // Load link if exists
        });
      } else {
        setEditingEvent(null);
        form.resetFields();
      }
      setIsModalVisible(true);
    };
  
    const handleOk = async () => {
      try {
        const values = await form.validateFields();
        const formattedEvent = {
          ...values,
          date: values.date.format('YYYY-MM-DD'),
          time: values.time.format('HH:mm'),
          key: editingEvent ? editingEvent.key : Date.now(),
        };
  
        if (editingEvent) {
          setQuestions((prev) =>
            prev.map((item) => (item.key === editingEvent.key ? formattedEvent : item))
          );
        } else {
          setQuestions((prev) => [...prev, formattedEvent]);
        }
  
        setIsModalVisible(false);
      } catch (errorInfo) {
        console.log('Validation Failed:', errorInfo);
      }
    };
  
    const handleDelete = (key) => {
      setQuestions((prev) => prev.filter((item) => item.key !== key));
    };
  
    const columns = [
      { title: 'Tên sự kiện', dataIndex: 'name', key: 'name' },
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
      {
        title: 'Thao tác',
        key: 'action',
        align: 'center',
        render: (_, record) => (
          <>
            <Button type="link" onClick={() => showModal(record)}>
              Sửa
            </Button>
            <Popconfirm
              title="Bạn có chắc muốn xóa sự kiện này?"
              onConfirm={() => handleDelete(record.key)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button type="link" danger>
                Xóa
              </Button>
            </Popconfirm>
          </>
        ),
      },
    ];
  
    return (
      <Layout className="min-h-screen">
        <Header className="py-4 text-xl text-center text-white bg-blue-600">
          Lịch trực tuyến
        </Header>
        <Content className="p-4">
          <Button className="mb-4" type="primary" onClick={() => showModal()}>
            Thêm sự kiện
          </Button>
          <Table columns={columns} dataSource={questions} rowKey="key" />
  
          <Modal
            title={editingEvent ? 'Chỉnh sửa sự kiện' : 'Thêm sự kiện'}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={() => setIsModalVisible(false)}
          >
            <Form form={form} name="online_timetable" layout="vertical">
              <Form.Item
                label="Tên sự kiện"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập tên sự kiện!' }]}
              >
                <Input placeholder="Nhập tên sự kiện" />
              </Form.Item>
              <Form.Item
                label="Ngày"
                name="date"
                rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                label="Giờ"
                name="time"
                rules={[{ required: true, message: 'Vui lòng chọn giờ!' }]}
              >
                <TimePicker format="HH:mm" style={{ width: '100%' }} minuteStep={1} />
              </Form.Item>
              <Form.Item
                label="Đường dẫn"
                name="link"
                rules={[
                  { required: false },
                  { type: 'url', message: 'Vui lòng nhập URL hợp lệ!' },
                ]}
              >
                <Input placeholder="Nhập đường dẫn... (nếu có)" />
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    );
  };
  
  export default OnlineTimeTable;
  