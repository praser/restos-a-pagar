const rules = {
  admin: {
    static: [
      'commitment:create',
      'ugs:list',
      'ugs:create',
      'ugs:update',
      'ugs:destroy',
      'error:show',
      'dashboards:show',
      'dashboard:download',
      'dashboard:filter',
      'dashboard:filter:unidade',
      'dashboard:filter:gestor',
      'dashboard:filter:situacao',
      'unlock:create',
      'unlock:download',
      'unlock:list',
      'unlock:show',
      'judicialInjunction:list',
      'judicialInjunction:create',
      'judicialInjunction:check',
    ],
  },

  manager: {
    static: [
      'dashboards:show',
      'dashboard:download',
      'dashboard:filter',
      'dashboard:filter:unidade',
      'dashboard:filter:gestor',
      'dashboard:filter:situacao',
    ],
  },

  attendance: {
    static: [
      'dashboards:show',
      'dashboard:download',
      'dashboard:filter',
      'dashboard:filter:unidade',
      'dashboard:filter:gestor',
      'dashboard:filter:situacao',
      'judicialInjunction:create',
      'judicialInjunction:list',
    ],
  },

  financial: {
    static: [
      'ugs:list',
      'error:show',
      'dashboards:show',
      'dashboard:download',
      'dashboard:filter',
      'dashboard:filter:unidade',
      'dashboard:filter:gestor',
      'dashboard:filter:situacao',
      'unlock:download',
      'unlock:list',
      'unlock:show',
    ],
  },

  visitor: {
    static: ['session:login'],
  },
};

export default rules;
