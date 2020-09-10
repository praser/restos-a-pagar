var filterBadgesVariants = ['success', 'warning']

function getActiveFilters(filterContainerId, customOptions) {
  defaltOptions = {
    filterSelector: 'select option:selected',
    valuesToIgnore: [],
  };

  options = $.extend({}, defaltOptions, customOptions);
  selector = [filterContainerId, options.filterSelector].join(' ');

  return $(selector).filter(function() {
    return !options.valuesToIgnore.includes($(this).val());
  });
}

function createFilterBadge(el, customVariant) {
  variant = customVariant ? customVariant : 'primary';
  return $('<span class="badge badge-pill badge-'+ variant +' ml-2">'+ el.text +'</span>');
}

function updateFilterBadges(filterBadgesContainerId, filterContainerId, customOptions) {
  badgesContainer = $(filterBadgesContainerId);
  badgesContainer.empty();

  filters = getActiveFilters(filterContainerId, customOptions);
  filters.map(function(i) {
    badgesContainer.append(createFilterBadge(this, filterBadgesVariants[i]));
  });
}