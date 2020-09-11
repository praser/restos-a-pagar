var apiAutenticacao = {
	url: 'http://localhost:3001/',
	autenticar: function(data) {
		return xhrRequest( apiAutenticacao.url + 'authenticate', 'POST', JSON.stringify({ credentials: data }))
	}
};
