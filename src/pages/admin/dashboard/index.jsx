import { Pie } from '@ant-design/charts';
import { PieChartOutlined, TeamOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Col, Progress, Row, Statistic } from 'antd';

const DashboardAdmin = () => {
  // Example data for charts (Pie Chart for evaluations)
  const data = [
    { type: 'Học sinh xuất sắc', value: 40 },
    { type: 'Học sinh giỏi', value: 30 },
    { type: 'Học sinh khá', value: 20 },
    { type: 'Học sinh trung bình', value: 10 },
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: { fontSize: 14, textAlign: 'center' },
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Dashboard Tổng quan</h1>

      {/* Tổng quan về số lượng */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng số Học sinh"
              value={1200}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng số Giáo viên"
              value={150}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng số Danh hiệu"
              value={45}
              prefix={<PieChartOutlined />}
              valueStyle={{ color: '#d48806' }}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng số Giải thưởng"
              value={25}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Sơ đồ đánh giá */}
      <div className="p-6 mt-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Sơ đồ đánh giá học sinh</h2>
        <Pie {...config} />
      </div>

      {/* Chi tiết bổ sung */}
      <Row gutter={16} className="mt-8">
        <Col span={12}>
          <Card title="Tiến độ hoàn thành các khóa học">
            <Progress percent={70} status="active" />
            <Progress percent={50} status="active" className="mt-4" />
            <Progress percent={90} status="active" className="mt-4" />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Thông tin đánh giá chi tiết">
            <p>- Học sinh xuất sắc: 40%</p>
            <p>- Học sinh giỏi: 30%</p>
            <p>- Học sinh khá: 20%</p>
            <p>- Học sinh trung bình: 10%</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardAdmin;
