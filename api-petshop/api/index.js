const  express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const roteador = require('./routes/fornecedores');
app.use('/api/fornecedores/', roteador);
app.listen(config.get('api.porta'), ()=>console.log("a api esta funcionando"));
