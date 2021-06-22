const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')


// View All Providers
roteador.get('/', async (req, res) => {
  const resultados = await TabelaFornecedor.listar();
  res.status(200);
  res.send(JSON.stringify(resultados));
})

// Create a Providers
roteador.post('/', async (req, res) => {
  try{
    const dados = req.body;
    const fornecedor = new Fornecedor(dados);
    await fornecedor.criar();
    res.status(201);
    res.send(fornecedor);
  } catch(err){
    res.status(400);
    res.send(JSON.stringify({msg:err.message}));
  }
})

// Search a Provider
roteador.get('/:idFornecedor', async (req, res) => {
  try{
    const {idFornecedor} = req.params;
    const fornecedor = new Fornecedor({
      id: idFornecedor
    });
    await fornecedor.carregar();
    res.status(200);
    res.send(JSON.stringify(fornecedor))
  } catch(err){
    res.status(404);
    res.send(
      JSON.stringify({
        msg:err.message
      })
    )
  }
})

// Update a Provider
roteador.put('/:idFornecedor', async (req, res)=>{
  try {
    const {idFornecedor} = req.params;
    const dadosRecebidos = req.body;
    const dados = Object.assign({}, dadosRecebidos, {id: idFornecedor});
    const fornecedor = new Fornecedor(dados);
    await fornecedor.atualizar();
    res.status(204);
    res.end();
  }
  catch(err){
    res.status(400);
    res.send(JSON.stringify({
      msg: err.message
    }));
  }
})

//Delete a Provider
roteador.delete('/:idFornecedor', async (req, res)=>{
  try{
    const {idFornecedor} = req.params;
    const fornecedor = new Fornecedor({id:idFornecedor});
    await fornecedor.carregar();
    await fornecedor.remover();
    res.status(204);
    res.end();
  } catch(err){
    res.status(404);
    res.send(JSON.stringify({msg:err.message}));
  }
  
})
module.exports = roteador;