operacaoPassivelBloqueioController = {
  index: function(context) {
    var anoExecucao = this.params['anoExecucao'];
    var siglaGestor = this.params['siglaGestor']
    var tipoInformacaoId = this.params['tipoInformacaoId']
    perfil = roles.rede.locations.includes(parseInt(user.physical_lotation_id)) ? user.physical_lotation_id : null;
    var unidadeId = $('#lista-unidades-rede').length ? $('#lista-unidades-rede').val() : perfil;

    apiRestosAPagar.operacoes.passiveisBloqueio.listar(anoExecucao, tipoInformacaoId, unidadeId, siglaGestor)
    .then(function(response) {
      waitingDialog.hide(function() {
        csv = '\ufeff'+Papa.unparse(response, {
          delimiter: ';'
        });
        blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
        url = window.URL.createObjectURL(blob);
        a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = 'operacoesPassiveisBloqueio.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      })
    })
    .catch(function(error) {
      waitingDialog.hide(function() {
        bootbox.alert({
          title: 'Ops...',
          message: 'Houve um erro ao obter os dados das operações passíveis de bloqueio. Por favor tente novamente.',
        })
      })
    })
  }
}