const  express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const NaoEncontrado = require('./erros/NaoEncontrado');
const CampoInvalido = require('./erros/CampoInvalido');
const RequisicaoMalFormada = require('./erros/RequisicaoMalFormada');
const ValorNaoSuportado = require('./erros/ValorNaoSuportado');
const formatosAceitos = require('./Serializador').formatosAceitos;
const SerializadorErro = require('./Serializador').SerializadorErro;

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use((req, res, proximo)=>{
  let formatoRequisitado = req.header('Accept');
  if(formatoRequisitado==='*/*'){
    formatoRequisitado = 'application/json';
  }
  if(formatosAceitos.indexOf(formatoRequisitado)===-1){
    res.status(406);
    res.end();
    return
  }
  res.setHeader('Content-Type', formatoRequisitado);
  proximo();
})

const roteador = require('./routes/fornecedores');
app.use('/api/fornecedores/', roteador);

app.use((err, req, res, proximo)=>{
  let status = 500;
  if(err instanceof NaoEncontrado){
    status = 404;
  } else if(err instanceof CampoInvalido || err instanceof RequisicaoMalFormada){
    status = 400;
  } else if(err instanceof ValorNaoSuportado){
    status = 406;
  }

  const serializador = new SerializadorErro(res.getHeader('Content-Type'))
  res.status(status);
  res.send(serializador.serializar({
    msg: err.message,
    id:err.idErro
   })
  );
})
app.listen(config.get('api.porta'), ()=>console.log("a api esta funcionando"));
