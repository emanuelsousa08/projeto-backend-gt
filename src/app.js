const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(userRoutes);

const host = "locahost";
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://${host}:${PORT}`);
});
