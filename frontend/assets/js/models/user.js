// Variável que armazena o usuário globalmente
var user = null;
var jwt = null;

// Variável que armazena as regras de acesso para cada perfil
var rules = {};

// Decodifica o token de autenticação devolvido pela API
function parseJwt (token) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
	
	return JSON.parse(jsonPayload);
};

// Seta os dados do usuário na variável global
function setUser() {
	var userKey = 'user';
	user = JSON.parse(sessionStorage.getItem(userKey));
	jwt = sessionStorage.getItem('jwt');
	rbac.setRole(getRole());
}

// Retorna o perfil de acesso do usuário que está acessando o app
function getRole() {
	if (user) {
		var userPhisicalLotationId = parseInt(user.physical_lotation_id);
		if (roles.administrador.locations.includes(userPhisicalLotationId)) return roles.administrador.name;
		if (roles.rede.locations.includes(userPhisicalLotationId)) return roles.rede.name;
		if (roles.gestor.locations.includes(userPhisicalLotationId)) return roles.gestor.name;
	}
	return roles.visitante.name;
}

// Perfis de usuário possíveis no sistema
var roles = {
	administrador: {
		name: 'administrador',
		locations: [5385]
	},
	gestor: {
		name: 'gestor',
		locations: [5916, 5469, 5382, 5054, 5669, 5381]
	},
	rede: {
		name: 'rede',
		locations: [6407, 6408, 6409, 6410, 6411, 6412, 6413, 6414, 6417, 6420, 6421, 6423, 6427, 7121, 7122, 7123, 7124, 7125, 7126, 7127, 7128, 7129, 7130, 7131, 7132, 7133, 7134, 7135, 7136, 7137, 7138, 7139, 7140, 7141, 7142, 7143, 7268, 7689, 7690, 7691, 7692, 7693, 7694, 7695, 7696, 7697, 7698, 7701, 7702, 7703, 7704, 7705, 7706, 7707, 7711, 7712, 7713, 7714, 7715, 7716, 7717, 7718, 7719, 7720, 7721, 7728, 7729, 7730, 7733, 7734, 7880, 7881, 7915],
	},
	visitante: {
		name: 'visitante',
	}
}

// Permissões para o perfil de administrador
rules[roles.administrador.name] = {
	permissions: [
		'logout',
		'cadastrar-ug',
		'apagar-ug',
		'editar-ug',
		'listar-ug',
		'nota-empenho-atualizar-saldo',
	],
	inherits: []
};

// Permissões para o perfil de gestor
rules[roles.gestor.name] = {
	permissions: [
		'logout'
	]
}

// Permissões para o perfil da rede de atendimento
rules[roles.rede.name] = {
	permissions: ['logout'],
	inherits: []
};

// Permissões para o perfil de visitante
rules[roles.visitante.name] = {
	permissions: ['login'],
	inherits: []
};

// Verifica se um usuÃ¡rio pode acessar uma url
function canAccess(path) {
	path = path.substring(path.indexOf('#')).replace(/\/\d{1,}/, '/:id');
	flattenRoutes = flattenObject(routes);
	routesRoles = eval('routes.' + getKeyByValue(flattenRoutes, path).replace('.path', '.roles'))
	return routesRoles.includes(getRole());
}	 

// Inicia o RBAC para fazer o controle de acesso
rbac.init({
	role: getRole(),
	rules: rules
});