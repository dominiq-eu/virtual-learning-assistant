// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({1:[function(require,module,exports) {
/*
    utils.js


*/

//
// -- Helper --
//

// RandomBetween :: Int -> Int -> Int
var RandomBetween = function RandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Random :: List a -> a | Int
var Random = function Random() {
    var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return list.length > 0 ? Let({ index: RandomBetween(0, list.length - 1) }).In(function (_ref) {
        var index = _ref.index;
        return list[index];
    }) : randomBetween(1, 100);
};

//
// -- Structures --
//

var Pipe = function Pipe(x) {
    return {
        andThen: function andThen(fn) {
            return Pipe(fn(x));
        },
        value: function value() {
            return x;
        }
    };
};

var Let = function Let(vars) {
    return {
        In: function In(f) {
            return f(vars);
        }
    };
};

//
// -- Logging --
//

var curry = function curry(f) {
    return function (a, b) {
        return b === undefined ? function (b) {
            return f(a, b);
        } : f(a, b);
    };
};
var doLog = function doLog(name, msg, x) {
    var cat = name.toLowerCase();
    console[cat]('[' + name + '] ' + msg, x); // eslint-disable-line
    return x;
};
var Log = function Log(msg) {
    return {
        debug: curry(function (txt, x) {
            return doLog('Debug', '[' + msg + '] [' + txt + '] Value:', x);
        }),
        error: curry(function (txt, x) {
            return doLog('Error', '[' + msg + '] [' + txt + '] Value:', x);
        })
    };
};

// Module Api
module.exports = {
    // Helper
    Random: Random,
    RandomBetween: RandomBetween,

    // Structures
    Pipe: Pipe,
    Let: Let,
    Log: Log
};
},{}]},{},[1], null)
//# sourceMappingURL=/utils.map