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
      'dashboardDownload:show',
    ],
  },

  manager: {
    static: ['dashboards:show'],
  },

  attendance: {
    static: ['dashboards:show'],
  },
};

export default rules;
