Stuferred = (function () {
  function Deferred() {
    var currentState = "pending";
    var promiseResult = null;
    var errorMessage = null;
    var doneCallbacks = [];
    var failCallbacks = [];


    function addDoneCallback(callback) {
      if (currentState == "pending") {
        doneCallbacks.push(callback);
      } else if (currentState == "resolved") {
        callback(promiseResult);
      }
    }

    function addFailCallback(callback) {
      if (currentState == "pending") {
        failCallbacks.push(callback);
      } else if (currentState == "rejected") {
        callback(errorMessage);
      }
    }

    function rejectWith(error) {
      if (currentState == "pending") {
        currentState = "rejected";
        errorMessage = error;
        for (var i = 0; i < failCallbacks.length; i++) {
          failCallbacks[i](errorMessage);
        }
      }
    }

    function resolveWith(result) {
      if (currentState == "pending") {
        currentState = "resolved";
        promiseResult = result;
        for (var i = 0; i < doneCallbacks.length; i++) {
          doneCallbacks[i](promiseResult);
        }
      }
    }

    function promise() {
      return {
        done: addDoneCallback,
        fail: addFailCallback,
      }
    }

    var deferred = promise();
    deferred.reject = rejectWith;
    deferred.resolve = resolveWith;
    deferred.promise = promise;
    return deferred;
  }

  return {
    deferred: Deferred
  }
})();
