var AjaxWrapper = (function (Stuferred) {

  function ajaxPromise(url) {

    var defered = Stuferred.deferred();

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onload = function () {
      defered.resolve(xmlhttp.responseText);
    }
    xmlhttp.onerror = function () {
      defered.reject(xmlhttp.status + " -> " + xmlhttp.statusText);
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    return defered.promise();
  }

  return {
    ajax: ajaxPromise
  }
})(Stuferred);
