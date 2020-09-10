var ugController = {
  index: function(context) {
    apiRestosAPagar.ug.listar()
    .then(function(response) {
      render(routes.ug.template, context)
      .then(function() {
        dataTable = $('#lista-ug').DataTable();
        $.each(response.ug, function(i, item) {
          btnEditar = '<a href="#/ug/editar/'+item.id+'" class="d-none d-sm-inline-block btn btn-sm btn-info shadow-sm"><i class="far fa-edit"></i> Editar</a>'
          btnRemover = '<a href="#/ug/deletar/'+item.id+'" class="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm"><i class="far fa-trash-alt"></i> Remover</a>'
          dataTable.row.add([item.codigo, item.nome, item.siglaGestor + ' - ' + item.nomeGestor, btnEditar + ' ' + btnRemover]);
        });
        dataTable.draw();
      });
    })
    .catch(function(error) {
      bootbox.alert({
        title: 'Ops...',
        message: 'Houve um erro obter a lista de UG. Por favor rente novamente e caso o erro persista contate a GEOTR.',
      })
    })
    .always(waitingDialog.hide)
  },

  new: function(context) {
    dados = {
      action: routes.ug.path,
      method: 'POST',
      ug: { codigo: '', nome: '', nomeGestor: '', siglaGestor: ''}
    };
    render(routes.ug.novo.template, context, dados);
  },

  edit: function(context) {
    apiRestosAPagar.ug.buscar(context.params['id'])
    .then(function(response) {
      waitingDialog.hide(function() {
        dados = {
          action: routes.ug.path + '/editar/' + response.id,
          method: 'PUT',
          ug: response
        }
        render(routes.ug.editar.template, context, dados);
      });
    })
    .catch(function(error) {
      waitingDialog.hide(function() {
        bootbox.alert({
          title: 'ops',
          message: 'Houve um erro ao recuperar os dados desta unidade gestores. Por favor tente novamente.',
          callback: function(){
            context.redirect(routes.ug.path, context);
          }
        })
      })
    });
  },
			
	create: function(context) {
    apiRestosAPagar.ug.criar(context.params)
    .then(function(response) {
      waitingDialog.hide(function() {
        bootbox.alert({
          title: 'Maravilha...',
          message: 'Esta unidade gestora foi cadastrada com sucesso!',
          callback: function(){
            context.redirect(routes.ug.path, context);
          },
        })
      })
    })
    .catch(function(error) {
      waitingDialog.hide(function() {
        bootbox({
          title: 'Ops...',
          message: 'Houve um erro ao salvar os dados da unidade gestora. Por favor tente novamente.',
        })
      });
    });
  },

  update: function(context) {
    apiRestosAPagar.ug.editar(context.params['id'], context.params)
    .then(function(response) {
      waitingDialog.hide(function() {
        bootbox.alert({
          title: 'Maravilha...',
          message: 'A unidade gostora foi alterada com sucesso!',
          callback: function() {
            context.redirect(routes.ug.path);
          },
        })
      })
    })
    .catch(function() {
      waitingDialog.hide(function() {
        bootbox.alert({
          title: 'Ops...',
          message: 'Houve um erro ao alterar os dados desta UG. Por favor tente novamente'
        })
      })
    });
  },

  destroy: function(context) {
    bootbox.confirm({
      title: 'Opa!',
      message: 'Tem certeza de que deseja apagar a UG?',
      callback: function(result) {
        if (result) {
          apiRestosAPagar.ug.deletar(context.params['id'])
          .then(function(response) {
            waitingDialog.hide(function() {
              bootbox.alert({
                title: 'Maravilha',
                message: 'A UG foi apagada com sucesso',
                callback: function() {
                  context.redirect(routes.ug.path)
                }
              })
            });
          })
          .catch(function() {
            waitingDialog.hide(function() {
              bootbox.alert({
                title: 'Ops...',
                message: 'Houve um erro ao apagar esta UG',
              })
            });
          });
        }
      }
    })
  }
}
