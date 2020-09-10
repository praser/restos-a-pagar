dashboardController = {
  index: function(context) {
    anoExecucao = this.params['anoExecucao'];

    render(routes.dashboard.template, context)
    .then (function() {
      waitingDialog.show('Carregando...');
      
      obterDadosDashboard(anoExecucao)
      .then(function(estatisticas, analitico) {
        preencherDashboard(estatisticas, analitico)
      })
      .fail(function(error) {
        bootbox.alert({
          title: 'Ops...',
          message: 'Houve em arro ao obter os dados do painel. Por favor rente novamente e caso o erro persista contate a GEOTR.',
        })
      })
      .always(function() {
        waitingDialog.hide();
      })

      obterDadosFiltros(anoExecucao)
      .then(function(unidades, gestores, tiposInformacoes) {
        preencherFiltros(unidades, gestores, tiposInformacoes);
      })
      .fail(function(error){
        bootbox.alert({
          title: 'Ops...',
          message: 'Houve em arro ao obter os dados dos filtros painel. Por favor rente novamente e caso o erro persista contate a GEOTR.',
        })
      })
      .always(function() {
        updateFilterBadges('#filter-badges-list', '#filtros-lista');
      })

      $('#btn-filtrar').on('click', function() {
        $('#filter-modal > div > div > div.modal-header > button').click();
      })
    });
  }
}