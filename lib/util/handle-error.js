"use strict";

function handleError (done) {
  return function (next) {
    return function (err) {
      if (err) return done(err);
      var len = arguments.length,
          args = Array(len > 1 ? len - 1 : 0),
          i = 1;
      for (; i < len; i++) args[i - 1] = arguments[i];
      next.apply(undefined, args);
    };
  };
}

module.exports = handleError;