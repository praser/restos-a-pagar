function xhrRequest(url, method = 'GET', data = null, showLoading = true) {
  return $.ajax({
    url: url,
    method: method,
    data: data,
    headers: {
      'X-Token': jwt,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    beforeSend: function() {
      if (showLoading) {
        waitingDialog.show('Aguarde...');
      }
    },
  })
}