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
};

export default rules;
