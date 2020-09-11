var graficoEvolucaoSaldo, graficoSaldoPorGestor

/**
 * Preenche os dados dos boxes que contém o sumário dos grandes números do painel
 * @param {object} data 
 */
function preencherSumario(data) {
  const [maisRecente] = data.estatisticas.slice(-1)
  $('#sumario_quantidade_operacoes').text(numeral(maisRecente.quantidade_operacoes).format('0,0'));
  $('#sumario_quantidade_notas_empenho').text(numeral(maisRecente.quantidade_notas_empenho).format('0,0'));
  $('#sumario_saldo_notas_empenho').text(numeral(maisRecente.saldo_notas_empenho).format('$ 0.00 a'));
  $('#sumario_dias_ate_bloqueio').text(numeral(data.parametros.diasAteBloqueio).format('0,0'));
  $('#dias-progress').css({'width': percentualDiasDecorridos(new Date(data.parametros.anoExecucao, 0, 1), new Date(data.parametros.dataBloqueio), data.parametros.diasAteBloqueio) + '%'})
}

/**
 * Preenche a data do bloqueio dos saldos das notas de empenho
 * @param {object} data 
 */
function preencherDataBloqueio(data) {
  date = new Date(data.dataBloqueio);
  $('#data-bloqueio').text(date.format('dd/mm/yyyy'));
}

/**
 * Preenche o gréfico da evolução do saldos das notas de empenho
 * @param {object} data 
 */
function preencherEvolucaoSaldo(data) {
  labels = $.map(data, function(estatistica) {
    d = new Date(estatistica.data);
    month = d.getMonth() + 1;
    return monthName(month);
  });

  data = $.map(data, function(estatistica) {
    return estatistica.saldo_notas_empenho;
  });

  if (!graficoEvolucaoSaldo) {
    graficoEvolucaoSaldo = areaChart(document.getElementById('chart-evolucao-saldo'), labels, 'Saldo', data);
  } else {
    updateChart(graficoEvolucaoSaldo, labels, data)
  }

  return graficoEvolucaoSaldo;
}

/**
 * Preenche o gráfico da distribuição do saldo das notas de empenho entre os gestores
 * @param {object} data 
 */
function preencherSaldoPorGestor(data) {
  sortedData = data.sort((a, b) => a.saldo_notas_empenho < b.saldo_notas_empenho ? 1 : -1);
  labels = $.map(sortedData, function(estatistica) {
    return estatistica.siglaGestor;
  });

  data = $.map(sortedData, function(estatistica) {
    return estatistica.saldo_notas_empenho;
  });

  if (!graficoSaldoPorGestor) {
    graficoSaldoPorGestor = barChart(document.getElementById('chart-saldo-gestor'), labels, 'Saldo passível de bloqueio', data);
  } else {
    updateChart(graficoSaldoPorGestor, labels, data);
  }

  return graficoSaldoPorGestor;
}

/**
 * Preenche a tabela de dados analíticos
 * @param {object} data 
 * @param {string} selector 
 */
function preencherDadosAnaliticos(data, selector) {
  if ($.fn.DataTable.isDataTable(selector)) {
    $('.datatable-column-filter').remove();
    $(selector).DataTable().clear();
    $(selector).DataTable().destroy();
  }

  dataTable = $(selector).DataTable({
    columnDefs: [
      {
        targets: [10, 11],
        render: function(data, type, full, meta) {
          return type === 'sort' || type === 'type' || type === 'filter' ? data : numeral(data).format('$0,0.00');
        }
      },
      {
        targets: [19, 20],
        render: function(data, type, full, meta) {
          return type === 'sort' || type === 'type' || type === 'filter' ? data : numeral(data/100).format('0.00%');
        }
      },
      {
        targets: [21, 22, 23, 24],
        render: {
          display: $.fn.dataTable.render.moment('DD/MM/YYYY'),
        }
      },
      {
        targets: [3, 4, 5, 6],
        className: 'text-center'
      }
    ],
    initComplete: function () {
      dt = this;
      dt.api().columns().every( function () {
        var column = this;
        var select = $('<select id="my-select" class="datatable-column-filter form-control" name=""><option></option></select>')
          .appendTo( $(column.header()) )
          .on('click', function(e) {
            e.stopPropagation();
          })
          .on( 'change', function () {
            var val = $(this).val();
            column
              .search(val, false, false, true)
              .draw();
          });
          
          column.data().unique().sort().each( function ( d, j ) {
            select.append( '<option value="'+d+'">'+d+'</option>' )
          });
      } );
    },
    ordering: true,
    fixedHeader: false,
    scrollX: true,
    fixedColumns: {
      leftColumns: 3
    }
  });
  $.each(data, function(i, item) {
    var vrpl;
    if (item.enquadramentoLegislacao.toUpperCase() === 'PAC') {
      vrpl = 'N/A';
    } else {
      vrpl = item.dataVRPL ? '<i class="far fa-thumbs-up text-primary"></i>' : '<i class="far fa-thumbs-down text-danger"></i>';
    }
    dataTable.row.add([
      item.operacao + '-' + item.dv,
      formatSiconv(item.proposta),
      item.convenio,
      item.situacaoContratoComplemento.toUpperCase().indexOf('SUSPENSIVA') === -1 ? '<i class="far fa-thumbs-up text-primary"></i>' : '<i class="far fa-thumbs-down text-danger"></i>',
      vrpl,
      item.dataAIO ? '<i class="far fa-thumbs-up text-primary"></i>' : '<i class="far fa-thumbs-down text-danger"></i>',
      item.percentualFisicoAferido > 0 ? '<i class="far fa-thumbs-up text-primary"></i>' : '<i class="far fa-thumbs-down text-danger"></i>',
      item.anoOrcamentario,
      item.gigovId,
      item.gigovNome,
      item.valorRepasse,
      item.valorDesembolsado,
      item.proponente,
      item.uf,
      item.siglaGestor + ' - ' + item.nomeGestor,
      item.enquadramentoLegislacao,
      item.enquadramentoLegislacaoComplemento,
      item.situacaoContrato,
      item.situacaoContratoComplemento,
      item.percentualFisicoAferido,
      item.percentualFinanceiroDesbloqueado,
      item.dataVigencia ? item.dataVigencia.split(' ')[0] : item.dataVigencia,
      item.dataSPA ? item.dataSPA.split(' ')[0] : item.dataSPA,
      item.dataVRPL ? item.dataVRPL.split(' ')[0] : item.dataVRPL,
      item.dataAIO ? item.dataAIO.split(' ')[0] : item.dataAIO,
      item.objeto
    ]);
  });
  dataTable.draw();
}

/**
 * Faz as requisições XHR para obter os dados que serão exibidos no painel
 * @param {int} anoExecucao 
 */
function obterDadosDashboard(anoExecucao) {
  tipoInformacaoId = stringIsEmpty($('#set-operacoes').val()) ? 3: $('#set-operacoes').val();
  perfil = roles.rede.locations.includes(parseInt(user.physicalLotationId)) ? user.physicalLotationId : null;
  unidadeId = $('#lista-unidades-rede').length ? $('#lista-unidades-rede').val() : perfil;
  siglaGestor = stringIsEmpty($('#lista-gestores').val()) ? null: $('#lista-gestores').val();

  return $.when(
    apiRestosAPagar.estatisticas.listar(anoExecucao, tipoInformacaoId, unidadeId, siglaGestor, false),
    apiRestosAPagar.operacoes.passiveisBloqueio.listar(anoExecucao, tipoInformacaoId, unidadeId, siglaGestor, false),
  )
}

/**
 * Preenche os dados do painel
 * @param {object} estatisticas 
 * @param {object} analitico 
 */
function preencherDashboard(estatisticas, analitico) {
  preencherDataBloqueio(estatisticas[0].parametros);
  preencherSumario(estatisticas[0]);
  preencherEvolucaoSaldo(estatisticas[0].estatisticas);
  preencherSaldoPorGestor(estatisticas[0].estatisticasPorGestor);
  preencherDadosAnaliticos(analitico[0], '#dados-analiticos');
}

/**
 * Cria options com dados dentro de um elemento html do tipo select
 * @param {element} select 
 * @param {object} data 
 * @param {object} customOptions 
 */
function preencherSelect(select, data, customOptions) {
  options = Object.assign({
    defaultIndex: -1,
    valueKey: 'id',
    labelKey: 'nome',
  }, customOptions);

  if(select.children().length <=1 ) {
    $.each(data, function(i, item) {
      option = $('<option>').val(item[options.valueKey]).text(item[options.labelKey]);
      if (i === options.defaultIndex) option.attr('selected', true);
      select.append(option);
    });
  }
}

/**
 * Preenche o filtro de unidades com os dados obtidos via XHR
 * @param {object} data 
 */
function preencherUnidades(data) {
 select = $('#lista-unidades-rede');
 preencherSelect(select, data);
  $.fn.selectpicker.Constructor.BootstrapVersion = '4';
  select.selectpicker({
    liveSearch: true,
    showTick: true,
    style: '',
    styleBase: 'form-control'
  });
}

/**
 * Preencher o filtro de gestores com os dados obtidos via XHR
 * @param {object} data 
 */
function preencherGestores(data) {
  select = $('#lista-gestores');
  preencherSelect(select, data, {
    valueKey: 'siglaGestor',
    labelKey: 'nomeGestor',
  });
}

/**
 * Preenche o filtro de tipo de informação com os dados obitidos via XHR
 * @param {object} data 
 */
function preencherTipoInformacoes(data) {
  select = $('#set-operacoes');
  preencherSelect(select, data, {
    valueKey: 'tipoInformacaoId',
    labelKey: 'tipoInformacaoDescricao',
    defaultIndex: 2,
  });
}

/**
 * Faz as requisições XHR para obter os dados que serão exibidos nos filtros
 * @param {int} anoExecucao 
 */
function obterDadosFiltros(anoExecucao) {
  var unidades;
  switch (getRole()) {
    case 'rede':
      unidades = $.noop;
      unidadeId = user.physicalLotationId;
      break;
  
    default:
      unidades = apiRestosAPagar.unidades.listar;
      break;
  }

  return $.when(
    unidades(false),
    apiRestosAPagar.ug.listarGestores(false),
    apiRestosAPagar.tipoInformacao.listar(anoExecucao, false),
  )
}

/**
 * Preenche os dados dos filtros do painel
 * @param {object} unidades 
 * @param {object} gestores 
 * @param {object} tiposInformacoes 
 */
function preencherFiltros(unidades, gestores, tiposInformacoes) {
  if(unidades) preencherUnidades(unidades[0]);
  preencherGestores(gestores[0]);
  preencherTipoInformacoes(tiposInformacoes[0]);
}