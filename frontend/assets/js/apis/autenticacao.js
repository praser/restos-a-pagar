var apiAutenticacao = {
	url: 'http://api.sudep.mz.caixa/api/api-autenticacao/',
	autenticar: function(data) {
		return xhrRequest( apiAutenticacao.url + 'autenticar', 'POST', JSON.stringify({ credenciais: data }))
	}
};
