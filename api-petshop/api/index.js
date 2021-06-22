const  express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const NaoEncontrado = require('./erros/NaoEncontrado')

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const roteador = require('./routes/fornecedores');
app.use('/api/fornecedores/', roteador);

app.use((err, req, res, proximo)=>{
  if(err instanceof NaoEncontrado){
    res.status(404);
  } else {
    res.status(400);
  }
  res.send(JSON.stringify({
    msg: err.message,
    id:err.idErro
  }));
})
app.listen(config.get('api.porta'), ()=>console.log("a api esta funcionando"));
