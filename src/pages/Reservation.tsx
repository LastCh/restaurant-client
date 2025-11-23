import { useState } from 'react';
import { Form, Input, DatePicker, TimePicker, InputNumber, Button, Card, Typography, message, Select } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useReservationStore } from '@/store/reservationStore';
import type { ReservationDTO } from '@/types/api';

const { Title, Text } = Typography;
const { TextArea } = Input;

export const Reservation = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { createReservation, isLoading } = useReservationStore();
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    if (!isAuthenticated || !user) {
      message.warning('Пожалуйста, войдите в систему для бронирования');
      navigate('/login');
      return;
    }

    try {
      const reservationTime = dayjs(values.date)
        .hour(values.time.hour())
        .minute(values.time.minute())
        .second(0)
        .millisecond(0)
        .toISOString();

      const reservationData: ReservationDTO = {
        clientId: user.id,
        tableId: values.tableId || 1, // В реальном приложении нужно получать доступные столики
        reservationTime,
        // Отправляем поля, которые ожидает backend
        partySize: values.partySize ?? values.numberOfGuests,
        durationMinutes: values.durationMinutes ?? 120,
        notes: values.notes || values.specialRequests,
      };

      await createReservation(reservationData);
      message.success('Бронирование успешно создано!');
      form.resetFields();
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Ошибка при создании бронирования');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '48px 24px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <Card>
          <Title level={2}>Вход required</Title>
          <Text>Для бронирования столика необходимо войти в систему</Text>
          <div style={{ marginTop: '24px' }}>
            <Button type="primary" onClick={() => navigate('/login')}>
              Войти
            </Button>
            <Button style={{ marginLeft: '16px' }} onClick={() => navigate('/register')}>
              Зарегистрироваться
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: '48px 24px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={1} style={{ textAlign: 'center', marginBottom: '48px' }}>
        <CalendarOutlined /> Бронирование столика
      </Title>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            partySize: 2,
            durationMinutes: 120,
            tableId: 1,
          }}
        >
          <Form.Item
            name="date"
            label="Дата"
            rules={[{ required: true, message: 'Пожалуйста, выберите дату' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="DD.MM.YYYY"
              disabledDate={(current) => current && current < dayjs().startOf('day')}
            />
          </Form.Item>

          <Form.Item
            name="time"
            label="Время"
            rules={[{ required: true, message: 'Пожалуйста, выберите время' }]}
          >
            <TimePicker
              style={{ width: '100%' }}
              format="HH:mm"
              minuteStep={30}
              showNow={false}
            />
          </Form.Item>

          <Form.Item
            name="partySize"
            label="Количество гостей"
            rules={[
              { required: true, message: 'Пожалуйста, укажите количество гостей' },
              { type: 'number', min: 1, max: 20, message: 'Количество гостей должно быть от 1 до 20' },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              max={20}
              placeholder="Количество гостей"
            />
          </Form.Item>

          <Form.Item
            name="durationMinutes"
            label="Длительность (минут)"
            rules={[{ required: true, message: 'Пожалуйста, укажите длительность бронирования' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={30}
              max={480}
              step={30}
              placeholder="Длительность в минутах"
            />
          </Form.Item>

          <Form.Item
            name="tableId"
            label="Номер столика"
            rules={[{ required: true, message: 'Пожалуйста, выберите столик' }]}
          >
            <Select placeholder="Выберите столик">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <Select.Option key={num} value={num}>
                  Столик {num}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="notes" label="Особые пожелания">
            <TextArea rows={4} placeholder="Укажите особые пожелания (аллергии, предпочтения и т.д.)" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" loading={isLoading} block>
              Забронировать
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

