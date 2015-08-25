var functions = {

  // ajax GET function
  ajaxGET: function(url, success, error) {
    
    var request = new XMLHttpRequest;
    request.open("GET", url);

    request.onload = function() {
      if (this.status === 200) {
        success(JSON.parse(this.responseText));
      } else {
        error(new Error(this.status));
      }
    };

    request.onerror = function() {
      error(this.status);
    };

    request.send();
  },

  // ajax POST function
  ajaxPOST: function(url, params, success, error) {
    
    var request = new XMLHttpRequest;
    request.open("POST", url);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    var data = "";
    for (var key in params) {
      if (data != "") {
        data += "&";
      }
      data += key + "=" + encodeURIComponent(params[key]);
    }

    request.onload = function() {
      if (this.status === 200) {
        success(JSON.parse(this.responseText));
      } else {
        error(new Error(this.status));
      }
    };

    request.onerror = function() {
      error(this.status);
    };

    request.send(data);
  },

  padNumber: function(n, size) {
    var s = n + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

};