import { useEffect } from 'react';
import { Typography, Row, Col, Card, Button, Space } from 'antd';
import { MenuOutlined, CalendarOutlined, StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useMenuStore } from '@/store/menuStore';
import { MenuCard } from '@/components/MenuCard';

const { Title, Paragraph } = Typography;

export const Home = () => {
  const navigate = useNavigate();
  const { dishes, fetchAvailableDishes, isLoading } = useMenuStore();

  useEffect(() => {
    fetchAvailableDishes();
  }, [fetchAvailableDishes]);

  const featuredDishes = dishes.slice(0, 6);

  return (
    <div style={{ padding: '48px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <Row gutter={[24, 24]} style={{ marginBottom: '64px' }}>
        <Col xs={24} lg={12}>
          <Title level={1} style={{ fontSize: '48px', marginBottom: '24px' }}>
            Добро пожаловать в наш ресторан
          </Title>
          <Paragraph style={{ fontSize: '18px', color: '#666', marginBottom: '32px' }}>
            Мы предлагаем изысканную кухню, приготовленную из свежих ингредиентов,
            и уютную атмосферу для незабываемого вечера.
          </Paragraph>
          <Space size="large">
            <Button
              type="primary"
              size="large"
              icon={<MenuOutlined />}
              onClick={() => navigate('/menu')}
            >
              Посмотреть меню
            </Button>
            <Button
              size="large"
              icon={<CalendarOutlined />}
              onClick={() => navigate('/reservation')}
            >
              Забронировать столик
            </Button>
          </Space>
        </Col>
        <Col xs={24} lg={12}>
          <div
            style={{
              height: '400px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '24px',
            }}
          >
            Изображение ресторана
          </div>
        </Col>
      </Row>

      {/* Features */}
      <Row gutter={[24, 24]} style={{ marginBottom: '64px' }}>
        <Col xs={24} sm={8}>
          <Card>
            <StarOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '16px' }} />
            <Title level={4}>Высокое качество</Title>
            <Paragraph>
              Мы используем только свежие ингредиенты и проверенные рецепты
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <MenuOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '16px' }} />
            <Title level={4}>Богатое меню</Title>
            <Paragraph>
              Широкий выбор блюд на любой вкус и предпочтения
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <CalendarOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '16px' }} />
            <Title level={4}>Удобное бронирование</Title>
            <Paragraph>
              Забронируйте столик онлайн в любое удобное время
            </Paragraph>
          </Card>
        </Col>
      </Row>

      {/* Featured Dishes */}
      <div style={{ marginBottom: '64px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
          Популярные блюда
        </Title>
        <Row gutter={[24, 24]}>
          {isLoading ? (
            <Col span={24} style={{ textAlign: 'center', padding: '48px' }}>
              Загрузка...
            </Col>
          ) : featuredDishes.length > 0 ? (
            featuredDishes.map((dish) => (
              <Col xs={24} sm={12} lg={8} key={dish.id}>
                <MenuCard dish={dish} />
              </Col>
            ))
          ) : (
            <Col span={24} style={{ textAlign: 'center', padding: '48px' }}>
              <Paragraph>Нет доступных блюд</Paragraph>
            </Col>
          )}
        </Row>
        {featuredDishes.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Button type="primary" size="large" onClick={() => navigate('/menu')}>
              Посмотреть всё меню
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

