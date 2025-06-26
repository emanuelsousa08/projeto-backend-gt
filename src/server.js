require('dotenv').config();
const express = require('express');
const sequelize = require('./config/connection');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

const port = process.env.PORT || 3060;

app.use(express.json());
app.use('/v1', categoryRoutes);
app.use('/v1', productRoutes);
app.use('/v1', userRoutes);

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Servidor executando na porta ${port}`);
        
    });
}).catch((error) => {
    console.error('Não é possível conectar ao banco de dados:', error);    
});


