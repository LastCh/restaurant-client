import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import type { SignInRequest } from '@/types/api';

const { Title, Text } = Typography;

export const Login = () => {
  const navigate = useNavigate();
  const { signIn, isLoading } = useAuthStore();
  const [form] = Form.useForm();

  const handleSubmit = async (values: SignInRequest) => {
    try {
      await signIn(values);
      message.success('Вход выполнен успешно!');
      navigate('/');
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Ошибка входа. Проверьте логин и пароль.');
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 200px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
      }}
    >
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
          Вход
        </Title>

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Пожалуйста, введите имя пользователя' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Имя пользователя"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Пароль"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" loading={isLoading} block>
              Войти
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Text>
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

