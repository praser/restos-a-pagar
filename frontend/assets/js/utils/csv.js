function splitLines(csv) {
  return csv.split(/\r\n|\n/);
}

function splitColumns(line, separator = ';') {
  return line.split(separator);
}

function parseCsvToObject(csv) {
  var lines = splitLines(csv);
  var headers = splitColumns(lines.shift());
  var result = [];
  for(var i=0; i<lines.length; i++) {
    var columns = splitColumns(lines[i])
    var line = {};
    for(var j=0; j<columns.length; j++) {
      line[camelize(headers[j])] = columns[j];
    }
    result.push(line)
  }
  return result;
}