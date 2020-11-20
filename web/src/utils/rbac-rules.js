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
      'judicialInjunction:list',
      'judicialInjunction:create',
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
      'dashboard:filter:gestor',
      'dashboard:filter:situacao',
    ],
  },

  visitor: {
    static: ['session:login'],
  },
};

export default rules;
