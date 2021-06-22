const ModeloTabelaFornecedor = require('./ModeloTabelaFornecedor')
const modelo = require('./ModeloTabelaFornecedor')
module.exports = {
  listar() {
   return modelo.findAll()
  },
  
  inserir(fornecedor) {
    return modelo.create(fornecedor)
  }

}