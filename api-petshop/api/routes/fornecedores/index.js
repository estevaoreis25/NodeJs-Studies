const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

roteador.get('/', async (req, res)=>{
  const resultados  = await TabelaFornecedor.listar()
  res.send(JSON.stringify(resultados));
})

roteador.post('/', async (req, res)=>{
  const dados = req.body;
  console.log("DADOOOOOOOOOOOS", dados);
  const fornecedor = new Fornecedor(dados);
  await fornecedor.criar();
  res.send(fornecedor)
})

module.exports = roteador;