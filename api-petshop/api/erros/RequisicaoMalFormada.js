class RequisicaoMalFormada extends Error{
  constructor(){
    super("Os dados não foram fornecidos adequadamente");
    this.name = 'RequisicaoMalFormada';
    this.idErro = 1;
  }
}

module.exports = RequisicaoMalFormada;