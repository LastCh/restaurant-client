# Restaurant Client - Клиентский сайт ресторана

Клиентское веб-приложение для информационной системы ресторана, созданное с использованием React, TypeScript и Ant Design.

## Основные функции

- 🍽️ **Просмотр меню** - Просмотр блюд с фильтрацией по категориям и поиском
- 📅 **Бронирование столиков** - Онлайн бронирование столиков на удобное время
- 👤 **Регистрация и вход** - Регистрация новых пользователей и аутентификация
- 🔐 **Админ-панель** - Переход в админ-панель для администраторов
- 📱 **Адаптивный дизайн** - Удобный интерфейс для всех устройств

## Технологии

- **React 18** - UI библиотека
- **TypeScript** - Типизированный JavaScript
- **Vite** - Быстрый сборщик и dev-сервер
- **Ant Design** - UI компоненты
- **React Router** - Маршрутизация
- **Zustand** - Управление состоянием
- **Axios** - HTTP клиент
- **Day.js** - Работа с датами

## Установка и запуск

### Требования

- Node.js 18+ 
- npm или yarn
- Backend API должен быть запущен на `http://localhost:8080`

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу: `http://localhost:3000`

### Сборка для продакшена

```bash
npm run build
```

Собранные файлы будут в папке `dist`

### Предпросмотр продакшен сборки

```bash
npm run preview
```

## Структура проекта

```
restaurant-client/
├── src/
│   ├── api/              # API клиент
│   │   └── client.ts
│   ├── components/       # Переиспользуемые компоненты
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MenuCard.tsx
│   ├── pages/           # Страницы приложения
│   │   ├── Home.tsx
│   │   ├── Menu.tsx
│   │   ├── Reservation.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── store/           # Zustand stores
│   │   ├── authStore.ts
│   │   ├── menuStore.ts
│   │   └── reservationStore.ts
│   ├── types/           # TypeScript типы
│   │   └── api.ts
│   ├── App.tsx          # Главный компонент
│   ├── main.tsx         # Точка входа
│   └── index.css        # Глобальные стили
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## API Endpoints

Приложение использует следующие endpoints:

### Аутентификация
- `POST /api/auth/signup` - Регистрация
- `POST /api/auth/signin` - Вход
- `POST /api/auth/refresh` - Обновление токена

### Меню
- `GET /api/dishes` - Получить все блюда
- `GET /api/dishes/{id}` - Получить блюдо по ID
- `GET /api/dishes/available` - Получить доступные блюда
- `GET /api/dishes/category/{category}` - Получить блюда по категории

### Бронирования
- `POST /api/reservations` - Создать бронирование
- `GET /api/reservations/client/{clientId}` - Получить бронирования клиента
- `GET /api/reservations/{id}` - Получить бронирование по ID
- `GET /api/reservations/available` - Получить доступные слоты

## Настройка

### Изменение URL backend API

В файле `vite.config.ts` можно настроить proxy для API:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080', // Измените на ваш backend URL
      changeOrigin: true,
    },
  },
}
```

### Изменение URL админ-панели

В файле `src/components/Header.tsx` измените ссылку на админ-панель:

```typescript
<Button
  type="link"
  href="http://localhost:5174" // Измените на URL вашей админ-панели
  target="_blank"
>
  Админ-панель
</Button>
```

## Особенности

- ✅ Автоматическое сохранение токенов в localStorage
- ✅ Автоматический редирект на страницу входа при истечении токена
- ✅ Защищенные маршруты (требуется авторизация для бронирования)
- ✅ Адаптивный дизайн для мобильных устройств
- ✅ Русская локализация интерфейса
- ✅ Валидация форм
- ✅ Обработка ошибок

## Разработка

### Добавление новой страницы

1. Создайте компонент в `src/pages/`
2. Добавьте маршрут в `src/App.tsx`
3. При необходимости добавьте ссылку в `src/components/Header.tsx`

### Добавление нового API endpoint

1. Добавьте метод в `src/api/client.ts`
2. Добавьте соответствующий тип в `src/types/api.ts`
3. Используйте в store или компонентах

## Лицензия

MIT
