# Booking API

Простой API для бронирования мест на мероприятия, реализованный на Node.js, Express и PostgreSQL.

## Основные возможности

*   Бронирование места на событие.
*   Проверка на наличие свободных мест.
*   Защита от двойного бронирования одним пользователем.
*   Обработка ошибок и возврат корректных HTTP-статусов.

## Технологии

*   **Node.js** - среда выполнения JavaScript.
*   **Express** - веб-фреймворк для Node.js.
*   **PostgreSQL** - реляционная база данных.
*   **node-postgres (pg)** - драйвер для работы с PostgreSQL.
*   **dotenv** - для управления переменными окружения.

## Инструкция по установке и запуску

### 1. Клонирование репозитория

```bash
git clone <URL вашего репозитория>
cd booking-api
2. Установка зависимостей
code
Bash
npm install
3. Настройка базы данных
Убедитесь, что у вас установлен и запущен PostgreSQL.
Создайте базу данных с именем booking:
code
SQL
CREATE DATABASE booking;
Выполните скрипт для создания таблиц и добавления тестовых данных. Замените your_username на ваше имя пользователя в PostgreSQL.
code
Bash
psql -U your_username -d booking -f queries.sql
Альтернативно, можно выполнить содержимое файла queries.sql через pgAdmin или другой GUI-клиент.
4. Настройка переменных окружения
Создайте файл .env в корне проекта, скопировав содержимое из .env.example (если бы он был) или создав его с нуля.
Заполните файл вашими данными для подключения к БД:
code
Env
# PostgreSQL connection settings
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=booking
DB_PASSWORD=your_postgres_password
DB_PORT=5432

# Server port
PORT=3000
Важно: Замените your_postgres_password на ваш реальный пароль.
5. Запуск сервера
code
Bash
node server.js
Вы должны увидеть сообщение: Сервер запущен на порту 3000.
Тестирование через Postman
Отправьте POST запрос на http://localhost:3000/api/bookings/reserve.
Заголовки:
Content-Type: application/json
Тело запроса (Body -> raw -> JSON):
Успешное бронирование
code
JSON
{
  "event_id": 1,
  "user_id": "user123"
}
Ожидаемый ответ: 201 Created
Повторное бронирование (ошибка)
Отправьте тот же запрос еще раз.
Ожидаемый ответ: 409 Conflict с сообщением {"error":"Вы уже забронировали это событие"}
Нет свободных мест (ошибка)
Для события с id=3 доступно всего 2 места. После двух успешных бронирований разными пользователями, третья попытка вернет ошибку.
code
JSON
{
  "event_id": 3,
  "user_id": "some_other_user"
}
Ожидаемый ответ: 409 Conflict с сообщением {"error":"Нет свободных мест"}
code
Code
---

Теперь ваш проект полностью готов. Вы можете создавать репозиторий на GitHub, добавлять все файлы (`git add .`), делать коммит (`git commit -m "Initial commit"`) и отправлять их (`git push`).
Use Arrow Up and Arrow Down to select a turn, Enter to jump to it, and Escape to return to the chat.
