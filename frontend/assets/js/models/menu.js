function menuInit() {
  apiRestosAPagar.parametros.listar()
  .then(function(response) {
    var menu = []
    $.each(response.parametros, function(i, el) {
      menu.push(mountMenu(el));
    })
    
    return menu;
  })
  .then(function(menu) {
    $("#safra-navigation").empty().append(menu);
  })
  .catch(function(error) {
    console.error(error)
  })
}

function mountMenu(params) {
  return $(`<li class="nav-item">
  <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseSafra${params.anoOrcamentario}" aria-expanded="true" aria-controls="collapseSafra${params.anoOrcamentario}">
  <i class="fas fa-file-signature"></i>
  <span>Safra ${params.anoOrcamentario}</span>
  </a>
  
  <div id="collapseSafra${params.anoOrcamentario}" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
  <div class="bg-white py-2 collapse-inner rounded">
  ${mountMenuItem(params).join('')}
  </div>
  </div>
  </li>`);
}

function mountMenuItem(params) {
  var items = [];
  
  items.push(`<a class="collapse-item" href="#/dashboard/${params.anoExecucao}">Prévia do bloqueio</a>`)
  items.push(`<a class="collapse-item" href="#/liminares/${params.anoExecucao}">Liminares judiciais</a>`);
  
  if (new Date(params.dataBloqueio) <= new Date()) {
    items.push(`<a class="collapse-item" href="#/dashboard/${params.anoExecucao}">Empenhos bloqueados</a>`);
  }
  
  if (new Date(params.dataCancelamento) <= new Date()) {
    items.push(`<a class="collapse-item" href="#/dashboard/${params.anoExecucao}">Empenhos cancelados</a>`);
  }
  
  return items;
}

(function($) {
  $(document).ready(menuInit);
})(jQuery);