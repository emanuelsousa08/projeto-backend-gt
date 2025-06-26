require('dotenv').config();
const express = require('express');
const sequelize = require('./config/connection');
const publicRoutes = require('./routes/publicRoutes');
const privateRoutes = require('./routes/privateRoutes');
const app = express();

const port = process.env.PORT || 3060;

app.use(express.json());
app.use('/v1', publicRoutes);
app.use('/v1', privateRoutes);



sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Servidor executando na porta ${port}`);
        
    });
}).catch((error) => {
    console.error('Não é possível conectar ao banco de dados:', error);    
});


