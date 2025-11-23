import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Home } from '@/pages/Home';
import { Menu } from '@/pages/Menu';
import { Reservation } from '@/pages/Reservation';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { useAuthStore } from '@/store/authStore';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';

dayjs.locale('ru');

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <ConfigProvider locale={ruRU}>
      <BrowserRouter>
        <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <Layout.Content style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout.Content>
          <Footer />
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;

