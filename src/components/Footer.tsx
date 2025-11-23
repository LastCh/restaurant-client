import { Layout, Row, Col, Typography } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

export const Footer = () => {
  return (
    <AntFooter
      style={{
        background: '#001529',
        color: '#fff',
        padding: '48px 24px',
        marginTop: 'auto',
      }}
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={8}>
          <Text strong style={{ color: '#fff', fontSize: '16px', display: 'block', marginBottom: '16px' }}>
            О нас
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.65)' }}>
            Добро пожаловать в наш ресторан! Мы предлагаем изысканную кухню и уютную атмосферу.
          </Text>
        </Col>
        <Col xs={24} sm={8}>
          <Text strong style={{ color: '#fff', fontSize: '16px', display: 'block', marginBottom: '16px' }}>
            Контакты
          </Text>
          <div style={{ color: 'rgba(255,255,255,0.65)' }}>
            <div style={{ marginBottom: '8px' }}>
              <PhoneOutlined /> +7 (999) 123-45-67
            </div>
            <div style={{ marginBottom: '8px' }}>
              <MailOutlined /> info@restaurant.ru
            </div>
            <div>
              <EnvironmentOutlined /> г. Москва, ул. Примерная, д. 1
            </div>
          </div>
        </Col>
        <Col xs={24} sm={8}>
          <Text strong style={{ color: '#fff', fontSize: '16px', display: 'block', marginBottom: '16px' }}>
            Часы работы
          </Text>
          <div style={{ color: 'rgba(255,255,255,0.65)' }}>
            <div>Пн-Чт: 12:00 - 23:00</div>
            <div>Пт-Сб: 12:00 - 00:00</div>
            <div>Вс: 12:00 - 22:00</div>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: '32px', textAlign: 'center' }}>
        <Col span={24}>
          <Text style={{ color: 'rgba(255,255,255,0.65)' }}>
            © 2024 Ресторан. Все права защищены.
          </Text>
        </Col>
      </Row>
    </AntFooter>
  );
};

