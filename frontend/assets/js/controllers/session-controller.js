var sessionController = {
  new: function(context) {
    path = routes.dashboard.path.replace(':anoExecucao', new Date().getFullYear());
    user ? context.redirect(path) : render(routes.login.template, context);
  },

  create: function(context) {
    apiAutenticacao.autenticar(context.params)
    .then(function(response) {
      sessionStorage.setItem('jwt', response.token);
      sessionStorage.setItem('user', JSON.stringify(parseJwt(response.token).user));
      waitingDialog.hide(function() {
        location.reload();
      });
    })
    .catch(function(error) {
      waitingDialog.hide(function() {
        bootbox.alert({
          title: 'Ops...',
          message: 'Houve um problema ao tentar realizar sua autenticação. Por favor cheque suas credenciais e tente novamente',
          callback: function() {
            location.reload();
          }
        })
      })
    })
    .done(function() {
      setUser();
    });
  },

  destroy: function(context) {
    bootbox.confirm({
      title: 'Já vai?',
      message: 'Você realmente gostaria de encerrar a sua sessão?',
      callback: function(result) {
        if (result) {
          sessionStorage.removeItem('jwt');
          sessionStorage.removeItem('user');
          setUser();
          context.redirect(routes.login.path);
        }
      }
    })
  }
}