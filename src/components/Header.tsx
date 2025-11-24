import { Layout, Menu, Button, Space, Avatar } from 'antd';
import { HomeOutlined, MenuOutlined, CalendarOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

const { Header: AntHeader } = Layout;

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, signOut } = useAuthStore();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const adminUrl = (import.meta as any).env?.VITE_ADMIN_URL || 'http://localhost:5173';

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Главная</Link>,
    },
    {
      key: '/menu',
      icon: <MenuOutlined />,
      label: <Link to="/menu">Меню</Link>,
    },
    {
      key: '/reservation',
      icon: <CalendarOutlined />,
      label: <Link to="/reservation">Бронирование</Link>,
    },
  ];

  // Добавляем кнопку управления в меню слева для сотрудников
  if (isAuthenticated && user && ['ADMIN', 'MANAGER', 'WAITER'].includes(user.role)) {
    menuItems.push({
      key: 'admin_panel',
      icon: <UserOutlined />,
      label: (
        <a href={`${adminUrl}/dashboard`} target="_blank" rel="noreferrer">Управление</a>
      ),
    });
  }

  return (
    <AntHeader
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '0 24px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
          Ресторан
        </Link>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ border: 'none', minWidth: '400px' }}
        />
      </div>

      <Space>
        {isAuthenticated ? (
          <>
            <Space>
              <Avatar icon={<UserOutlined />} />
              <span>{user?.username}</span>
            </Space>
            {/* admin button moved to left menu */}
            <Button icon={<LogoutOutlined />} onClick={handleSignOut}>
              Выход
            </Button>
          </>
        ) : (
          <Space>
            <Button onClick={() => navigate('/login')}>Вход</Button>
            <Button type="primary" onClick={() => navigate('/register')}>
              Регистрация
            </Button>
          </Space>
        )}
      </Space>
    </AntHeader>
  );
};

