const express = require('express');
const pool = require('./db'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.post('/api/bookings/reserve', async (req, res) => {
  const { event_id, user_id } = req.body;

 
  if (!event_id || !user_id) {
    return res.status(400).json({ error: 'event_id и user_id обязательны' });
  }

  const client = await pool.connect(); 

  try {
   
    await client.query('BEGIN');

   
    const eventQuery = `
      SELECT 
        e.total_seats, 
        (SELECT COUNT(*) FROM bookings WHERE event_id = e.id) AS booked_seats
      FROM events e 
      WHERE e.id = $1
      FOR UPDATE; 
    `;
   

    const eventResult = await client.query(eventQuery, [event_id]);

    if (eventResult.rows.length === 0) {
      throw new Error('Событие не найдено');
    }

    const { total_seats, booked_seats } = eventResult.rows[0];

    if (booked_seats >= total_seats) {
      throw new Error('Нет свободных мест');
    }

    const insertQuery = `
      INSERT INTO bookings (event_id, user_id) 
      VALUES ($1, $2) 
      RETURNING *;
    `;
    const bookingResult = await client.query(insertQuery, [event_id, user_id]);

  
    await client.query('COMMIT');

    res.status(201).json({
      message: 'Бронирование успешно создано!',
      booking: bookingResult.rows[0],
    });

  } catch (err) {
  
    await client.query('ROLLBACK');

   
    if (err.code === '23505') { 
      return res.status(409).json({ error: 'Вы уже забронировали это событие' });
    }
    if (err.message === 'Событие не найдено') {
      return res.status(404).json({ error: err.message });
    }
    if (err.message === 'Нет свободных мест') {
      return res.status(409).json({ error: err.message });
    }

   
    console.error('Ошибка транзакции:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });

  } finally {
   
    client.release();
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});