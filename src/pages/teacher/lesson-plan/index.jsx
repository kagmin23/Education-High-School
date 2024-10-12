import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, List, Modal, Select, Typography, notification } from 'antd';
import React, { useState } from 'react';

const { Footer } = Layout;
const { Option } = Select;

const LessonPlan = () => {
  const [chapters, setChapters] = useState(() => {
    const savedChapters = localStorage.getItem('chapters');
    return savedChapters ? JSON.parse(savedChapters) : [
      {
        title: 'Chương 1',
        subject: 'Toán',
        lessons: [
          { id: 1, name: 'Bài học 1.1', content: 'Nội dung giáo án bài 1.1' },
          { id: 2, name: 'Bài học 1.2', content: 'Nội dung giáo án bài 1.2' },
        ],
      },
      {
        title: 'Chương 2',
        subject: 'Ngữ Văn',
        lessons: [],
      },
    ];
  });

  const [isChapterModalVisible, setIsChapterModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isContentModalVisible, setIsContentModalVisible] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);

  const showChapterModal = (chapter) => {
    setCurrentChapter(chapter);
    setIsChapterModalVisible(true);
  };

  const showModal = (chapterIndex, lesson) => {
    setCurrentChapterIndex(chapterIndex);
    setCurrentLesson(lesson);
    setIsModalVisible(true);
  };

  const showContentModal = (lesson, chapter) => {
    setCurrentLesson({ ...lesson, subject: chapter.subject });
    setIsContentModalVisible(true);
  };

  const handleChapterOk = (values) => {
    const newChapters = [...chapters];
    if (currentChapter) {
      const chapterIndex = newChapters.findIndex(chapter => chapter.title === currentChapter.title);
      newChapters[chapterIndex].title = values.chapterTitle;
      newChapters[chapterIndex].subject = values.subject;
    } else {
      newChapters.push({
        title: values.chapterTitle,
        subject: values.subject,
        lessons: [],
      });
    }
    setChapters(newChapters);
    setIsChapterModalVisible(false);
    setCurrentChapter(null);
    localStorage.setItem('chapters', JSON.stringify(newChapters));
  };

  const handleOk = (values) => {
    const newChapters = [...chapters];
    if (currentLesson) {
      const lessonIndex = newChapters[currentChapterIndex].lessons.findIndex(lesson => lesson.id === currentLesson.id);
      newChapters[currentChapterIndex].lessons[lessonIndex].name = values.lessonName;
      newChapters[currentChapterIndex].lessons[lessonIndex].content = values.lessonContent;
    } else {
      newChapters[currentChapterIndex].lessons.push({
        id: Date.now(),
        name: values.lessonName,
        content: values.lessonContent,
      });
    }
    setChapters(newChapters);
    setIsModalVisible(false);
    setCurrentLesson(null);
    localStorage.setItem('chapters', JSON.stringify(newChapters));
  };

  const handleDelete = (chapterIndex, lessonId) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa bài học này?',
      okText: 'Có',
      cancelText: 'Không',
      onOk: () => {
        const newChapters = [...chapters];
        newChapters[chapterIndex].lessons = newChapters[chapterIndex].lessons.filter(lesson => lesson.id !== lessonId);
        setChapters(newChapters);
        localStorage.setItem('chapters', JSON.stringify(newChapters));
        notification.success({
          message: 'Thành công!',
          description: 'Bài học đã được xóa thành công.',
        });
      },
      onCancel: () => {
        notification.info({
          message: 'Thông báo',
          description: 'Xóa bài học đã bị hủy.',
        });
      },
    });
  };

  const handleChapterDelete = (title) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa chương này?',
      okText: 'Có',
      cancelText: 'Không',
      onOk: () => {
        const newChapters = chapters.filter(chapter => chapter.title !== title);
        setChapters(newChapters);
        localStorage.setItem('chapters', JSON.stringify(newChapters));
        notification.success({
          message: 'Thành công!',
          description: 'Chương đã được xóa thành công.',
        });
      },
      onCancel: () => {
        notification.info({
          message: 'Thông báo',
          description: 'Xóa chương đã bị hủy.',
        });
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentLesson(null);
  };

  const handleContentCancel = () => {
    setIsContentModalVisible(false);
    setCurrentLesson(null);
  };

  const handleChapterCancel = () => {
    setIsChapterModalVisible(false);
    setCurrentChapter(null);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <Typography.Title level={2} className="mb-6 text-lg text-center">Giáo án Soạn thảo</Typography.Title>
      
      <div className="mb-4 text-right">
        <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => showChapterModal(null)}>
          Thêm Chương Mới
        </Button>
      </div>

      <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
        {chapters.map((chapter, chapterIndex) => (
          <div key={chapter.title} className="p-4 mb-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <Typography.Title level={4} className="text-sm text-blue-600">{chapter.title}</Typography.Title>
                <Typography.Text type="danger">Môn học: {chapter.subject}</Typography.Text>
              </div>
              <div>
                <Button type="link" icon={<EditOutlined />} onClick={() => showChapterModal(chapter)} />
                <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleChapterDelete(chapter.title)} />
              </div>
            </div>
            <div className="lesson-list">
              <List
                bordered
                dataSource={chapter.lessons}
                renderItem={(lesson) => (
                  <List.Item
                    className="flex items-center justify-between"
                    actions={[
                      <Button type="link" icon={<EditOutlined />} onClick={() => showModal(chapterIndex, lesson)} />,
                      <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(chapterIndex, lesson.id)} />,
                      <Button type="link" icon={<EyeOutlined />} onClick={() => showContentModal(lesson, chapter)} />                    ]}
                  >
                    <span className="text-sm">{lesson.name}</span>
                  </List.Item>
                )}
              />
            </div>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={() => showModal(chapterIndex, null)}
              className="w-full mt-2"
            >
              Thêm bài học
            </Button>
          </div>
        ))}
      </div>

      <Modal
        title={currentChapter ? 'Chỉnh sửa Chương' : 'Thêm Chương Mới'}
        visible={isChapterModalVisible}
        onCancel={handleChapterCancel}
        footer={null}
      >
        <Form onFinish={handleChapterOk} layout="vertical" initialValues={currentChapter}>
          <Form.Item
            name="subject"
            label="Môn học"
            rules={[{ required: true, message: 'Vui lòng chọn Môn học!' }]}
          >
            <Select placeholder="Chọn Môn học">
              <Option value="Toán">Toán</Option>
              <Option value="Ngữ Văn">Ngữ Văn</Option>
              <Option value="Tiếng Anh">Tiếng Anh</Option>
              <Option value="Lịch Sử">Lịch Sử</Option>
              <Option value="Địa lý">Địa lý</Option>
              <Option value="GDCD">GDCD</Option>
              <Option value="Vật Lý">Vật Lý</Option>
              <Option value="Sinh học">Sinh học</Option>
              <Option value="Hoá học">Hoá học</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="chapterTitle"
            label="Tên Chương"
            rules={[{ required: true, message: 'Vui lòng nhập tên chương!' }]}
          >
            <Input className="text-sm border border-gray-300 rounded" />
          </Form.Item>
          <Form.Item>
            <div className="text-right">
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={currentLesson ? 'Chỉnh sửa bài học' : 'Thêm bài học'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleOk} layout="vertical" initialValues={currentLesson}>
          <Form.Item
            name="lessonName"
            label="Tên Bài Học"
            rules={[{ required: true, message: 'Vui lòng nhập tên bài học!' }]}
          >
            <Input className="text-sm border border-gray-300 rounded" />
          </Form.Item>
          <Form.Item
            name="lessonContent"
            label="Nội Dung Bài Học"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung bài học!' }]}
          >
            <Input.TextArea className="text-sm border border-gray-300 rounded" rows={4} />
          </Form.Item>
          <Form.Item>
            <div className="text-right">
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Nội Dung Bài Học"
        visible={isContentModalVisible}
        onCancel={handleContentCancel}
        footer={null}
        >
        <Typography.Text type="warning" className="block mb-1">Môn học: {currentLesson?.subject}</Typography.Text>
        <Typography.Title level={4} className="text-center">{currentLesson?.name}</Typography.Title>
        <Typography.Paragraph>{currentLesson?.content}</Typography.Paragraph>
        </Modal>

      <Footer className="mt-auto text-center">Bản quyền © 2024</Footer>
    </div>
  );
};

export default LessonPlan;