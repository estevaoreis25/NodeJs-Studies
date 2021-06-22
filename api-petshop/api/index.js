const  express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const RequisicaoMalFormada = require('./erros/RequisicaoMalFormada')

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const roteador = require('./routes/fornecedores');
app.use('/api/fornecedores/', roteador);

app.use((err, req, res, proximo)=>{
  let status = 500;
  if(err instanceof NaoEncontrado){
    status = 404;
  } else if(err instanceof CampoInvalido || err instanceof RequisicaoMalFormada){
    status = 400
  }
  res.status(status);
  res.send(JSON.stringify({
    msg: err.message,
    id:err.idErro
  }));
})
app.listen(config.get('api.porta'), ()=>console.log("a api esta funcionando"));
