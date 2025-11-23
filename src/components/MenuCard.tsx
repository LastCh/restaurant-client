import { Card, Typography, Tag, Image } from 'antd';
import type { DishDTO } from '@/types/api';

const { Title, Text } = Typography;

interface MenuCardProps {
  dish: DishDTO;
}

export const MenuCard = ({ dish }: MenuCardProps) => {
  return (
    <Card
      hoverable
      style={{ height: '100%' }}
      cover={
        dish.imageUrl ? (
          <Image
            alt={dish.name}
            src={dish.imageUrl}
            height={200}
            style={{ objectFit: 'cover' }}
            fallback="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4="
          />
        ) : (
          <div
            style={{
              height: 200,
              background: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999',
            }}
          >
            Нет изображения
          </div>
        )
      }
    >
      <Card.Meta
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <Title level={5} style={{ margin: 0, flex: 1 }}>
              {dish.name}
            </Title>
            <Tag color={dish.available ? 'green' : 'red'}>
              {dish.available ? 'В наличии' : 'Нет в наличии'}
            </Tag>
          </div>
        }
        description={
          <>
            <Text type="secondary" style={{ display: 'block', marginBottom: '8px' }}>
              {dish.description}
            </Text>
            <Text strong style={{ fontSize: '18px', color: '#1890ff' }}>
              {dish.price.toLocaleString('ru-RU')} ₽
            </Text>
          </>
        }
      />
    </Card>
  );
};

