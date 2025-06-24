require('dotenv').config();
const express = require('express');
const sequelize = require('./config/connection');

const app = express();
const port = process.env.PORT || 3060;

//falta chamar os app.use aqui, mas penso em criar os models primeiro

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Servidor executando na porta ${port}`);
        
    });
}).catch((error) => {
    console.error('Não é possível conectar ao banco de dados:', error);    
});