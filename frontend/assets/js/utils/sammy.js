function render(template, context, data, replace = true, element=context.$element()) {
  renderContext = context.render(template, data);
  replace ? renderContext.replace(element) : renderContext.appendTo(element);
  renderContext.then(aplicarRBAC);
  return renderContext;
}