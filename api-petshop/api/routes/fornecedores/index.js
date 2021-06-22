const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

roteador.get('/', async (req, res) => {
  const resultados = await TabelaFornecedor.listar()
  res.send(JSON.stringify(resultados));
})

roteador.post('/', async (req, res) => {
  try{
    const dados = req.body;
    const fornecedor = new Fornecedor(dados);
    await fornecedor.criar();
    res.send(fornecedor)
  } catch(err){
    res.send(JSON.stringify({msg:err.message}));
  }
})

roteador.get('/:idFornecedor', async (req, res) => {
  try{
    const {idFornecedor} = req.params;
    const fornecedor = new Fornecedor({
      id: idFornecedor
    });
    await fornecedor.carregar();
    res.send(JSON.stringify(fornecedor))
  } catch(err){
    res.send(
      JSON.stringify({
        msg:err.message
      })
    )
  }
})

roteador.put('/:idFornecedor', async (req, res)=>{
  try {
    const {idFornecedor} = req.params;
    const dadosRecebidos = req.body;
    const dados = Object.assign({}, dadosRecebidos, {id: idFornecedor});
    const fornecedor = new Fornecedor(dados);
    await fornecedor.atualizar();
    res.end();
  }
  catch(err){
    res.send(JSON.stringify({
      msg: err.message
    }));
  }
})

roteador.delete('/:idFornecedor', async (req, res)=>{
  try{
    const {idFornecedor} = req.params;
    const fornecedor = new Fornecedor({id:idFornecedor});
    await fornecedor.carregar();
    await fornecedor.remover();
    res.end();
  } catch(err){
    res.send(JSON.stringify({msg:err.message}));
  }
  
})
module.exports = roteador;