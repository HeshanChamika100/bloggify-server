const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');
const authorRoutes = require('./routes/author.routes');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/authors', authorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;

// Sync database and start server
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => console.error('DB Sync Error:', err));