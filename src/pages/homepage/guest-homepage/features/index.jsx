import {
  BookOutlined,
  BulbOutlined,
  DownOutlined,
  LaptopOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Button, Card, Carousel, Col, Form, Input, Row } from 'antd';

const features = [
  {
    title: 'Học tập hiện đại',
    description: 'Truy cập vào các khóa học và tài liệu online.',
    icon: <LaptopOutlined />,
  },
  {
    title: 'Đối tượng đa dạng',
    description: 'Học từ nhiều chủ đề khác nhau.',
    icon: <BookOutlined />,
  },
  {
    title: 'Cộng đồng hỗ trợ',
    description: 'Tham gia cộng đồng sinh viên và nhà giáo dục.',
    icon: <TeamOutlined />,
  },
];

// Các hình ảnh banner
const banners = [
  {
    src: 'https://cdn.vectorstock.com/i/500p/03/25/education-typography-banner-vector-26430325.jpg',
    alt: 'Banner 1',
  },
  {
    src: 'https://cdn4.vectorstock.com/i/1000x1000/42/88/online-education-banner-with-button-vector-25104288.jpg',
    alt: 'Banner 2',
  },
  {
    src: 'https://c8.alamy.com/comp/J516T5/online-education-banner-concept-e-learning-thin-line-icons-vector-J516T5.jpg',
    alt: 'Banner 3',
  },
];

const Features = () => {
  // Hàm cuộn đến phần nội dung
  const handleScroll = () => {
    const element = document.getElementById('content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-10 text-center bg-gray-100">
        <h1 className="text-2xl font-bold">Giáo dục chất lượng cho tương lai</h1>
        <p className="mt-3 mb-6 text-base">Khám phá những cơ hội học tập mới và phát triển bản thân.</p>

        <Button
          type="primary"
          shape="circle"
          icon={<DownOutlined />}
          size="large"
          style={{
            margin: '20px 0', // Add some margin for spacing
          }}
          onClick={handleScroll}
        />
      </section>

      {/* Carousel Section */}
      <section className="my-12 bg-white shadow-md">
        <Carousel autoplay>
          {banners.map((banner, index) => (
            <div key={index}>
              <img src={banner.src} alt={banner.alt} className="object-cover w-full h-64" />
            </div>
          ))}
        </Carousel>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-100">
        <h2 className="mt-8 mb-8 text-2xl font-semibold text-center">
          <QuestionCircleOutlined />&nbsp;Tại sao nên lựa chọn ngôi trường này?
        </h2>
        <Row gutter={[16, 16]} justify="center">
          {features.map((feature, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <Card className="p-4 text-center transition-shadow duration-300 shadow-sm hover:shadow-lg">
                <div className="mb-4 text-5xl text-primary">{feature.icon}</div>
                <h3 className="text-xl font-bold text-blue-600">{feature.title}</h3>
                <p className="italic text-blue-500">{feature.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Hỏi đáp - Thắc mắc Section */}
      <section id="content" className="py-12 bg-gray-200">
        <h2 className="mb-8 text-2xl font-bold text-center mt-9">
          <BulbOutlined />&nbsp;Hỏi đáp - Thắc mắc
        </h2>
        <div className="max-w-lg mx-auto">
          <Form
            name="qa_form"
            layout="vertical"
            onFinish={(values) => {
              console.log('Submitted:', values);
              // Thực hiện hành động khi gửi form, như gửi API hoặc thông báo thành công
            }}
          >
            <Form.Item
              name="question"
              label="Nếu có câu hỏi hoặc liên hệ thắc mắc, vui lòng gửi cho chúng tôi!"
              rules={[{ required: true, message: 'Vui lòng nhập câu hỏi!' }]}
            >
              <Input.TextArea rows={4} placeholder="Bạn có câu hỏi gì không?" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Gửi
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </>
  );
};

export default Features;
