(function ($) {
	numeral.locale('pt-BR');
	bootbox.setDefaults({
		locale: 'br',
		closeButton: false,
	});
	$.extend(true, $.fn.dataTable.defaults, {
		language: {
			url: 'vendor/datatables/dataTables.pt-br.json'
		}
	});

	var app = $.sammy('#main', function(params) {
		this.use('Template');

		this.notFound = function(method, path) {
			this.setLocation(routes.erros.paginaNaoEncontrada.path);
		}

		this.around(function(callback) {
			var avatar = './assets/images/undraw_male_avatar_323b.svg';
			setUser();
			this.path.endsWith(routes.login.path) && !user || user ? callback() : this.redirect(routes.login.path);
			canAccess(this.path) ? callback : this.redirect(routes.erros.acessoNegado.path);
			if (user) {
				var userImage = 'http://api.sutre.mz.caixa/app/controller/index.php?site=siteSutre&pagina=userImage&matricula=' + user.id;
				$.get(userImage)
				.then(function(){
					$('#userDropdown img').prop('src', userImage);
				})
				.catch(function(){
					$('#userDropdown img').prop('src', avatar);
				})
				$('.only-logged').show();
				$('#user-name').text(firstLetterUp(user.name.split(' ')[0]));
			} else {
				$('#user-name').text('');
				$('.only-logged').hide()
				$('#userDropdown img').prop('src', avatar);
			}
		});

		// Login
		this.get(routes.login.path, sessionController.new);
		this.post(routes.login.path, sessionController.create);
		this.get(routes.logout.path, sessionController.destroy);

		// Dashboard
		this.get(routes.dashboard.path, dashboardController.index);

		// Erros
		this.get(routes.erros.acessoNegado.path, errosController.acessoNegado);
		this.get(routes.erros.paginaNaoEncontrada.path, errosController.paginaNaoEncontrada);

		// UG
		this.get(routes.ug.path,  ugController.index);
		this.get(routes.ug.novo.path, ugController.new);
		this.get(routes.ug.editar.path, ugController.edit);
		this.post(routes.ug.path, ugController.create);
		this.put(routes.ug.editar.path, ugController.update);
		this.get(routes.ug.deletar.path, ugController.destroy);
		
		// NE
		this.get(routes.notasEmpenho.saldo.novo.path , notaEmpenhoSaldoController.new);
		this.post(routes.notasEmpenho.saldo.novo.path, notaEmpenhoSaldoController.create);

		// OPERACOES
		this.get(routes.operacoes.passiveisBloqueioSaldo.path, operacaoPassivelBloqueioController.index);

		// Liminares
		this.get(routes.liminares.path, liminaresController.index);
	});

	$(function() {
		app.run(routes.login.path);
	});
})(jQuery);
