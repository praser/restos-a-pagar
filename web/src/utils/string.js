const getRegexGroups = result => {
  if (result) {
    const ignoredKeys = [0, 'index', 'input', 'groups'];
    return result.filter((item, index) => !ignoredKeys.includes(index));
  }

  return result;
};

export const splitDocumento = documento => {
  const regex = /^(?:\d{6})(?:\d{5})(\d{4})(NE)(\d*)$/;
  return getRegexGroups(regex.exec(documento));
};

export const parseNumeroContratoRepasse = str => {
  const regex = /^(?:(?:CR)|(?:TC))\.NR\.(\d*)(?:-.{2})?$/g;
  const cr = getRegexGroups(regex.exec(str));
  return cr ? parseInt(cr, 10) : cr;
};

export const parseConvenio = str => {
  const regex = /^(\d{6})$/;
  const convenio = getRegexGroups(regex.exec(str));
  return convenio ? parseInt(convenio, 10) : convenio;
};

export const formatNumeroLoteDesbloqueio = (sequencial, ano) =>
  `${`000${sequencial}`.substr(-3)}/${ano}`;

export const replaceAll = (str, find, replace) =>
  str.replace(new RegExp(find, 'g'), replace);
