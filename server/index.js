const express = require('express');
const path = require('path');
const cors = require('cors');
const  sequelize  = require('./config/db');
const reviewRoutes = require('./routes/revroute');

require('./models/rev');
require('./models/comments');
require('./models/reply'); 
require('./models/assoc');


const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/reviews', reviewRoutes);


app.use('/uploads', express.static(path.join(__dirname, 'public')));


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    return sequelize.sync({ alter: true });
  })
  .then(() => console.log('Tables synced'))
  .catch(err => console.error('DB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
