errosController = {
  acessoNegado: function(context) {
    render(routes.erros.acessoNegado.template, context);
  },

  paginaNaoEncontrada: function (context) {
    render(routes.erros.paginaNaoEncontrada.template, context);
  }
}