
// require('dotenv').config();
// const express = require('express');
// const sequelize = require('./config/connection');
// const publicRoutes = require('./routes/publicRoutes');
// const privateRoutes = require('./routes/privateRoutes');
// const app = express();

// const port = process.env.PORT || 3060;


// app.use(express.json());
// app.use('/v1', publicRoutes);
// app.use('/v1', privateRoutes);


// sequelize.sync().then(() => {
//     app.listen(port, () => {
//         console.log(`Servidor executando na porta ${port}`);
        
//     });
// }).catch((error) => {
//     console.error('Não é possível conectar ao banco de dados:', error);    
// });

const express = require('express');
const app = express();
const UserRoutes = require('./routes/UserRoutes');
const CategoryRoutes = require('./routes/categoryRoutes');
const ProductRoutes = require('./routes/ProductRoutes');
//const CategoryController = require('./controllers/categoryController');

app.use(express.json());
app.use('/v1',UserRoutes);
app.use('/v1',CategoryRoutes);
app.use('/v1',ProductRoutes)

const host = "locahost";
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://${host}:${PORT}/v1`);
});

