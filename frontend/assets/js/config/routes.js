var routes = {
  logout: {
    path:'#/logout',
    roles: [
      roles.administrador.name,
      roles.gestor.name,
      roles.rede.name,
      roles.visitante.name,
    ]
  },
  login: {
    path: '#/login',
    roles: [
      roles.administrador.name,
      roles.gestor.name,
      roles.rede.name,
      roles.visitante.name
    ],
    template: 'templates/session/form.template',
  },
  dashboard: {
    path: '#/dashboard/:anoExecucao',
    roles: [
      roles.administrador.name,
      roles.gestor.name,
      roles.rede.name,
    ],
    template: 'templates/dashboard/index.template',
  },
  erros: {
    acessoNegado: {
      path: '#/erros/acesso-negado',
      roles: [
        roles.administrador.name,
        roles.gestor.name,
        roles.rede.name,
        roles.visitante.name
      ],
      template: 'templates/erros/401.template',
    },
    paginaNaoEncontrada: {
      path: '#/erros/pagina-nao-encontrada',
      roles: [
        roles.administrador.name,
        roles.gestor,
        roles.rede.name,
        roles.visitante.name
      ],
      template: 'templates/erros/404.template'
    }
  },
  ug: {
    path: '#/ug',
    roles: [roles.administrador.name],
    template: 'templates/ug/index.template',
    novo: {
      path: '#/ug/novo',
      roles: [roles.administrador.name],
      template: 'templates/ug/form.template'
    },
    editar: {
      path: '#/ug/editar/:id',
      roles: [roles.administrador.name],
      template: 'templates/ug/form.template'
    },
    deletar: {
      path: '#/ug/deletar/:id',
      roles: [roles.administrador.name],
    }
  },
  notasEmpenho: {
    saldo: {
      novo: {
        path: '#/notas-empenho/saldo/novo',
        roles: [roles.administrador.name],
        template: 'templates/notas-empenho/saldo/form.template'
      }
    }
  },
  operacoes: {
    passiveisBloqueioSaldo: {
      path: '#/operacoes/passiveis-bloqueio/:anoExecucao',
      roles: [
        roles.administrador.name,
        roles.rede.name,
      ],
    }
  },
  liminares: {
    path: '#/liminares/:anoExecucao',
    roles: [
      roles.administrador.name,
      roles.gestor.name,
      roles.rede.name,
    ],
    template: 'templates/liminares/index.template',
  }
}
