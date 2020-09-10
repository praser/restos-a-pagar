var notaEmpenhoSaldoController = {
  new: function(context) {
    data = {
      method: 'POST',
      action: routes.notasEmpenho.saldo.novo.path
    }
    render(routes.notasEmpenho.saldo.novo.template, context, data);
  },

  create: function(context) {
    waitingDialog.show('Preparamos os dados para serem enviados');
    file = document.getElementById('arquivo').files[0];
    reader = new FileReader;
    reader.readAsText(file);
    reader.onload = function(event) {
      var csv = event.target.result;
      var data = {
        user: user.id,
        position: ddmmyyyyToyyyymmdd($('#posicao-saldo').val()),
        balances: parseCsvToObject(csv)
      };
      waitingDialog.message('Enviando os dados para o servidor...')
      apiRestosAPagar.notaEmpenhoSaldo.criar(data)
      .then(function(response) {
        waitingDialog.hide(function() {
          bootbox.alert({
            title: 'Maravilha...',
            message: 'O arquivo foi enviado com sucesso. Você será avisado por e-mail quando os dados forem processados.',
            callback: function() {
              path = routes.dashboard.path.replace(':anoExecucao', new Date().getFullYear());
              context.redirect(path);
            }
          })
        })
      })
      .catch(function(error) {
        waitingDialog.hide(function() {
          bootnox.alert({
            title: 'Ops...',
            message: 'Houve um erro ao salvar o arquivo de saldos',
          })
        })
      })
    }
  },
}