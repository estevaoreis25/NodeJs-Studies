const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor');
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor

// View All Providers
roteador.get('/', async (req, res) => {
  const resultados = await TabelaFornecedor.listar();
  res.status(200);

  const serializador = new SerializadorFornecedor(
    res.getHeader('Content-Type')
  )
  res.send(
    serializador.serializar(resultados)
    );
})

// Create a Providers
roteador.post('/', async (req, res, proximo) => {
  try{
    const dados = req.body;
   
    const fornecedor = new Fornecedor(dados);
    
    await fornecedor.criar();
    res.status(201);
    const serializador = new SerializadorFornecedor(
      res.getHeader('Content-Type')
    )
    res.send(serializador.serializar(fornecedor));
  } catch(err){
      proximo(err);
  }
})

// Search a Provider
roteador.get('/:idFornecedor', async (req, res, proximo) => {
  try{
    const {idFornecedor} = req.params;
    const fornecedor = new Fornecedor({
      id: idFornecedor
    });
    await fornecedor.carregar();
    res.status(200);
    const serializador = new SerializadorFornecedor(
      res.getHeader('Content-Type')
    )
    res.send(serializador.serializar(fornecedor))
  } catch(err){
    proximo(err);
  }
})

// Update a Provider
roteador.put('/:idFornecedor', async (req, res, proximo)=>{
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
    proximo(err);
  }
})

//Delete a Provider
roteador.delete('/:idFornecedor', async (req, res, proximo)=>{
  try{
    const {idFornecedor} = req.params;
    const fornecedor = new Fornecedor({id:idFornecedor});
    await fornecedor.carregar();
    await fornecedor.remover();
    res.status(204);
    res.end();
  } catch(err){
      proximo(err);
  }
  
})
module.exports = roteador;