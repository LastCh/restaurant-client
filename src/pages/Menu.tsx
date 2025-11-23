import { useEffect, useState } from 'react';
import { Typography, Row, Col, Tabs, Input, Spin, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useMenuStore } from '@/store/menuStore';
import { MenuCard } from '@/components/MenuCard';

const { Title } = Typography;
const { Search } = Input;

export const Menu = () => {
  const { dishes, categories, selectedCategory, isLoading, fetchDishes, fetchDishesByCategory, setSelectedCategory } =
    useMenuStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (selectedCategory) {
      fetchDishesByCategory(selectedCategory);
    } else {
      fetchDishes();
    }
  }, [selectedCategory, fetchDishes, fetchDishesByCategory]);

  const filteredDishes = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabItems = [
    {
      key: 'all',
      label: 'Все',
    },
    ...categories.map((category) => ({
      key: category,
      label: category,
    })),
  ];

  const handleTabChange = (key: string) => {
    if (key === 'all') {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(key);
    }
  };

  return (
    <div style={{ padding: '48px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={1} style={{ textAlign: 'center', marginBottom: '48px' }}>
        Наше меню
      </Title>

      <div style={{ marginBottom: '32px' }}>
        <Search
          placeholder="Поиск блюд..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '500px', margin: '0 auto', display: 'block' }}
        />
      </div>

      <Tabs
        activeKey={selectedCategory || 'all'}
        items={tabItems}
        onChange={handleTabChange}
        style={{ marginBottom: '32px' }}
      />

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '48px' }}>
          <Spin size="large" />
        </div>
      ) : filteredDishes.length > 0 ? (
        <Row gutter={[24, 24]}>
          {filteredDishes.map((dish) => (
            <Col xs={24} sm={12} lg={8} key={dish.id}>
              <MenuCard dish={dish} />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description="Блюда не найдены" />
      )}
    </div>
  );
};

