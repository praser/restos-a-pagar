function camelize(str) {
  _str = str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  return _str.replace(/\W+(.)/g, function(match, chr)
   {
        return chr.toUpperCase();
    });
}

function _getRegexGroups(result) {
  if (result) {
    ignoredKeys = [0, 'index', 'input', 'groups'];
    return $.grep(result, function(item, index) {
      return !ignoredKeys.includes(index);
    });
  }

  return result;
}

function splitNotaEmpenhoCcor(notaEmpenhoCcor) {
  regex = /^(?:\d{6})(?:\d{5})(\d{4})(NE)(\d*)$/;
  return _getRegexGroups(regex.exec(notaEmpenhoCcor));
}

function parseNumeroContratoRepasse(str) {
  regex = /^(?:(?:CR)|(?:TC))\.NR\.(\d*)(?:-.{2})?$/g;
  cr = _getRegexGroups(regex.exec(str));
  return cr ? parseInt(cr) : cr;
}

function parseNumeroConvenio(str) {
  regex = /^(\d{6})$/
  convenio = _getRegexGroups(regex.exec(str));
  return convenio ? parseInt(convenio) : convenio;
}

function ddmmyyyyToyyyymmdd(str, sepFrom = '/', sepTo='-') {
  parts = str.split(sepFrom);
  return [parts[2], parts[1], parts[0]].join(sepTo);
}

function createUUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

function firstLetterUp(word) {
  lowered = word.toLowerCase();
  letters = lowered.split('');
  letters[0] = letters[0].toUpperCase();
  return letters.join('');
}

function dateToString(date) {
  return date.toISOString().split('T')[0];
}

function monthName(month) {
  months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  return months[month-1];
}

function formatSiconv(proposta) {
  regex = new RegExp(/^(\d{1,7})(2\d{3})$/, 'ig');
  groups = regex.exec(proposta);
  
  if (groups !== null) {
    placeholder = '0000000'
    prop = placeholder + groups[1]
    prop = prop.substr(prop.length - placeholder.length, placeholder.length);
    return prop + '/' + groups[2];
  }

  return proposta;
}

function stringIsEmpty(str) {
  return str === "" || str === null;
}