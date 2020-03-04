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
})({"whhW":[function(require,module,exports) {
var define;
parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"39eF":[function(require,module,exports) {
var n=function(){return function(n,t){if(Array.isArray(n))return n;if(Symbol.iterator in Object(n))return function(n,t){var r=[],e=!0,u=!1,o=void 0;try{for(var i,c=n[Symbol.iterator]();!(e=(i=c.next()).done)&&(r.push(i.value),!t||r.length!==t);e=!0);}catch(n){u=!0,o=n}finally{try{!e&&c.return&&c.return()}finally{if(u)throw o}}return r}(n,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n};function r(n,t,r){return t in n?Object.defineProperty(n,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[t]=r,n}var e=function(n){return null!=n&&NaN!==n},u=function(n){return function(r){return e(r)&&(void 0===r?"undefined":t(r))===n}},o=u("function"),i=u("object"),c=u("string"),f=u("number"),a=u("boolean"),l=Array.isArray,s=function(n){throw new TypeError(n)},y=function n(t){return{andThen:function(r){return n(r(t))},value:function(){return t}}},p=function(n,t){return!(!i(t)||!l(n))&&0===n.filter(function(n){return!t.hasOwnProperty(n)}).length},b=function(t,r){var e=n(r,2),u=e[0],o=e[1];return t[u]=o,t},v=function(n){return function(t){return e(t)&&Object.setPrototypeOf(t,n),t}},d=function n(t,u){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(n){return n},i=r({},t,function(n){return y(o(n)).andThen(function(r){return u(r)?r:s("Value '"+n+"' is not of expected type '"+t+"'")}).andThen(v({constructor:i[t]})).value()});return i[t].is=function(n){return e(n)&&n.prototype&&n.prototype.constructor?n.prototype.constuctor===i[t]:u(n)},i[t].check=function(n){return i[t].is(n)?n:s("Check: Failed: Expect type '"+t+"'")},i[t].of=function(r){return n(t,function(n){return i[t].is(n)&&n===r},function(){return r})},i[t].derive=function(r){return n(t,i[t].is,function(n){return o(r(n))})},i[t].toString=function(){return t+"(x)"},i[t]},h=d("String",c,String),m=d("Object",i,Object),O=d("Number",f,Number),j=d("Boolean",a,Boolean),g=d("Boolean",Array.isArray,Array),T={};T[String]=h,T[Object]=m,T[Number]=O,T[Boolean]=j,T[Array]=g;var A=function(n){return void 0!==T[n]?T[n]:n},S=function t(r){return Object.entries(r).map(function(r){var e=n(r,2),u=e[0],o=e[1];return[u,i(o)?t(o):A(o)]}).reduce(b,{})},k=i,N=function(t){return function(r){return i(r)&&p(Object.keys(t),r)&&0===Object.entries(t).filter(function(t){var e=n(t,2),u=e[0];return!e[1].is(r[u])}).length}},E=function(t){return function(r){return Object.entries(t).map(function(t){var e=n(t,2),u=e[0];return[u,(0,e[1])(r[u])]}).reduce(b,{})}},w=function(n,t){return k(t)?y(S(t)).andThen(function(t){return d(n,N(t),E(t))}).value():s("Data: Type definition must consist only of functions and objects containing functions")},x=function(n){return 0===Object.values(n).filter(function(n){return!o(n)}).length},B=function(t,r){return function(e){var u=Object.entries(t).filter(function(t){var e=n(t,2);e[0];return e[1].is(r)}).map(function(t){var r=n(t,2),e=r[0];r[1];return e})[0],o=e[u];return o?o(r):s(u+" is not in the object!")}},P=function(t,r){return x(r)?y(S(r)).andThen(function(r){return Object.entries(r).map(function(t){var r=n(t,2),e=r[0],u=r[1];return[e,d(e,u.is,u)]}).reduce(b,Object.create({toString:function(){return t},is:function(n){return Object.values(r).filter(function(t){return t.is(n)}).length>0},check:function(n){return this.is(n)?n:s("Check: Failed: Expect type '"+t+"'")},case:function(n,t){return B(r,n)(t)}}))}).value():s("Union: Type definition must consist only of functions")},z=d("Any",function(n){return e(n)}),C=d("Nothing",function(n){return!e(n)},function(n){}),D=P("Maybe",{Just:z,Nothing:C}),F=d("Ok",function(n){return i(n)&&!0===n.ok&&z.is(n.value)},function(n){return{ok:!0,value:z(n)}}),M=d("Error",function(n){return i(n)&&!1===n.ok&&h.is(n.error)},function(n){return{ok:!1,error:h(n)}}),R=P("Result",{Ok:F,Err:M}),U=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,Z=d("Email",function(n){return h.is(n)&&U.test(n)},h);module.exports={Type:d,Data:w,Union:P,Maybe:D,Result:R,StringType:h,ObjectType:m,NumberType:O,BooleanType:j,ArrayType:g,AnyType:z,NothingType:C,EmailType:Z};
},{}]},{},["39eF"], null)
//# sourceMappingURL=/types.map
},{}],"LxSS":[function(require,module,exports) {
var define;
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
            return x.then ? Pipe(x.then(fn)) : Pipe(fn(x));
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
            return doLog('Debug', '[' + msg + '] [' + txt + ']', x);
        }),
        error: curry(function (txt, x) {
            return doLog('Error', '[' + msg + '] [' + txt + ']', x);
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
},{}],"FowP":[function(require,module,exports) {
module.exports = {
    status: { code: 200, msg: true },
    data: [{
        id: 'QW5sYWdldmVybcO2Z2Vu',
        name: 'Anlageverm\xF6gen',
        description: {
            html: '<p>Hierzu geh\xF6ren alle Verm\xF6gensbestandteile, die langfristig an das Unternehmen gebunden sind.</p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0JMWg', 'UldTX1BSSw', 'UldTX0lVSQ', 'UldTX0dVVg']
    }, {
        id: 'RWlnZW5rYXBpdGFs',
        name: 'Eigenkapital',
        description: {
            html: '<p>Das Eigenkapital, auch Reinverm\xF6gen, bezeichnet jenen Teil des Kapitals eines Unternehmens, das sich aus der Differenz aus Gesamtverm\xF6gen und Schulden (Fremdkapital) ergibt. Das Eigenkapital steht dem Unternehmen ohne zeitliche Befristung zur Verf\xFCgung, kann sich jedoch durch Gewinne oder Verluste vergr\xF6\xDFern beziehungsweise verkleinern.</p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0VJTg', 'UldTX1BSSw', 'UldTX0lVSQ', 'UldTX0JMWg', 'UldTX0dVVg']
    }, {
        id: 'QmlsYW56',
        name: 'Bilanz',
        description: {
            html: '<p>Die Bilanz ist eine in Kontenform dargestellte Kurzfassung des Inventars. Sie bildet das Verm\xF6gen und die Schulden eines Unternehmens zu einem bestimmten Zeitpunkt ab. Es handelt sich also um eine zusammengefasste wertm\xE4\xDFige Gegen\xFCberstellung aller Verm\xF6gens- und Kapitalteile einer Unternehmung.</p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0VJTg', 'UldTX0JMWg', 'UldTX0lVSQ', 'UldTX0dVVg']
    }, {
        id: 'SW52ZW50dXI',
        name: 'Inventur',
        description: {
            html: '<p>Inventur bezeichnet den Vorgang der kompletten Bestandsaufnahme von Menge und Wert aller im Unternehmen vorhandenen Verm\xF6gensgegenst\xE4nde, sowie den Schulden des Unternehmens.</p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0VJTg', 'UldTX0lVSQ', 'UldTX0JMWg']
    }, {
        id: 'QnVjaGhhbHR1bmc',
        name: 'Buchhaltung',
        description: {
            html: '<p><span>Die Buchhaltung kann als Pflicht, als Prozess sowie als Organisationseinheit verstanden werden, die alle Gesch\xE4ftsvorg\xE4nge zahlenm\xE4\xDFig nach einem bestimmten Schema erfasst und dokumentiert.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ', 'UldTX0JMWg']
    }, {
        id: 'RnJlbWRrYXBpdGFs',
        name: 'Fremdkapital',
        description: {
            html: '<p><span>Das Fremdkapital bezeichnet jenen Teil des Kapitals eines Unternehmens, der dem Unternehmen nach schuldrechtlichen Regeln \xFCberlassen wurde. </span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ', 'UldTX0JMWg', 'UldTX1BSSw']
    }, {
        id: 'SW52ZW50YXI',
        name: 'Inventar',
        description: {
            html: '<p><span>Das Inventar (lateinisch inventarium, \u201EGesamtheit des Gefundenen\u201C) ist ein ausf\xFChrliches geordnetes Verzeichnis, das alle Verm\xF6gensgegenst\xE4nde und Schulden eines Unternehmens zu einem bestimmten Zeitpunkt nach Art, Menge und Wert ausweist.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ', 'UldTX0JMWg']
    }, {
        id: 'UmVpbnZlcm3Dtmdlbg',
        name: 'Reinverm\xF6gen',
        description: {
            html: '<p><span>Das Reinverm\xF6gen, auch Eigenkapital, bezeichnet jenen Teil des Kapitals eines Unternehmens, dass sich aus der Differenz aus Gesamtverm\xF6gen und Schulden ergibt. Das Reinverm\xF6gen steht dem Unternehmen ohne zeitliche Befristung zur Verf\xFCgung, kann sich jedoch durch Gewinne oder Verluste vergr\xF6\xDFern beziehungsweise verkleinern.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ', 'UldTX0JMWg']
    }, {
        id: 'U2NodWxkZW4',
        name: 'Schulden',
        description: {
            html: '<p><span>Schulden werden auch als Verbindlichkeiten bezeichnet und stellen das Fremdkapital eines Unternehmens dar. Es kann in kurzfristige und langfristige Schulden unterschieden werden.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ', 'UldTX0JMWg']
    }, {
        id: 'VW1sYXVmdmVybcO2Z2Vu',
        name: 'Umlaufverm\xF6gen',
        description: {
            html: '<p><span>Das Umlaufverm\xF6gen eines Unternehmen beschreibt alle Verm\xF6gensgegenst\xE4nde, die im Rahmen des Betriebsprozesses zur kurzfristigen Ver\xE4u\xDFerung, zum Verbrauch, zur Verarbeitung oder zur R\xFCckzahlung bestimmt sind.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ', 'UldTX0JMWg', 'UldTX0dVVg']
    }, {
        id: 'VmVyYmluZGxpY2hrZWl0ZW4',
        name: 'Verbindlichkeiten',
        description: {
            html: '<p><span>Als Verbindlichkeiten werden die Schulden eines Unternehmens bezeichnet. Sie stellen das Fremdkapital eines Unternehmens dar. Es kann in kurzfristige und langfristige Verbindlichkeiten unterschieden werden.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ', 'UldTX0JMWg', 'UldTX0dVVg']
    }, {
        id: 'VmVybcO2Z2Vu',
        name: 'Verm\xF6gen',
        description: {
            html: '<p><span>Das Verm\xF6gen umfasst die Gesamtheit aller im Unternehmen eingesetzten Werte.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ', 'UldTX0JMWg', 'UldTX0dVVg']
    }, {
        id: 'QWt0aXZh',
        name: 'Aktiva',
        description: {
            html: '<p><span>Die Verm\xF6genswerte auf der linken Seite der Bilanz werden Aktiva genannt. Diese Seite zeigt, in welcher Form die Mittel im Unternehmen verwendet werden, also die Verm\xF6gensformen.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0JMWg']
    }, {
        id: 'QWt0aXZrb250bw',
        name: 'Aktivkonto',
        description: {
            html: '<p><span>Als Aktivkonten werden all jene Bestandskonten bezeichnet, die alle Bilanzposten auf der Aktivseite der Bilanz betreffen.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0JMWg']
    }, {
        id: 'QWt0aXZ0YXVzY2g',
        name: 'Aktivtausch',
        description: {
            html: '<p><span>Die Bilanz ver\xE4ndert sich im laufenden Gesch\xE4ftsjahr durch so genannte Gesch\xE4ftsvorf\xE4lle. Beim Aktivtausch handelt es sich um eine von vier Formen der Wertever\xE4nderungen einer Bilanz. Es \xE4ndern sich nur Werte auf der Aktivseite der Bilanz. Dabei wird</span> <span>der Wert einer Position gr\xF6\xDFer, w\xE4hrend der Wert einer anderen Position kleiner wird. Die Bilanzsumme \xE4ndert sich nicht.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0JMWg']
    }, {
        id: 'QWt0aXYtUGFzc2l2LU1laHJ1bmc',
        name: 'Aktiv-Passiv-Mehrung',
        description: {
            html: '<p><span>Die Bilanz ver\xE4ndert sich im laufenden Gesch\xE4ftsjahr durch sogenannte Gesch\xE4ftsvorf\xE4lle. Bei der Aktiv-Passiv-Mehrung handelt es sich um eine von vier Formen der Wertever\xE4nderungen einer Bilanz. Es wird ein Aktivposten und ein Passivposten gr\xF6\xDFer. Beide m\xFCssen um den gleichen Wert gr\xF6\xDFer werden. Die Bilanzsumme wird dadurch ebenfalls um den gleichen Betrag gr\xF6\xDFer.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0JMWg']
    }, {
        id: 'QWt0aXYtUGFzc2l2LU1pbmRlcnVuZw',
        name: 'Aktiv-Passiv-Minderung',
        description: {
            html: '<p><span>Die Bilanz ver\xE4ndert sich im laufenden Gesch\xE4ftsjahr durch sogenannte Gesch\xE4ftsvorf\xE4lle. Bei der Aktiv-Passiv-Minderung handelt es sich um eine von vier Formen der Wertever\xE4nderungen einer Bilanz. Die Bilanzsumme wird geringer. Es wird ein Aktivposten und ein Passivposten geringer. Beide Posten verringern sich um denselben Betrag.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0JMWg']
    }, {
        id: 'QmVzdGFuZHNrb250bw',
        name: 'Bestandskonto',
        description: {
            html: '<p><span>Alle Bilanzposten werden in Kontoform gef\xFChrt. Die Konten, die aus der Bilanz abgeleitet werden, hei\xDFen Bestandskonten. Sie lassen sich in aktive und passive Bestandskonten unterscheiden.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0JMWg', 'UldTX0dVVg']
    }, {
        id: 'QmlsYW56aWVydW5nc3BmbGljaHQ',
        name: 'Bilanzierungspflicht',
        description: {
            html: '<p><span>Der Gesetzgeber verpflichtet den Kaufmann bzw. die Kauffrau zur Aufstellung einer Bilanz zu Beginn seines Gewerbes sowie f\xFCr den Schluss eines jeden Gesch\xE4ftsjahres (\xA7\xA7242 ff HGB).</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0JMWg']
    }, {
        id: 'QmlsYW56Z2xlaWNoZ2V3aWNodA',
        name: 'Bilanzgleichgewicht',
        description: {
            html: '<p><span>Das Bilanzgleichgewicht besagt, dass Verm\xF6gen (Aktiva) und Kapital (Passiva) einer Bilanz immer zwingend gleich gro\xDF sind. Das Bilanzgleichgewicht bleibt gewahrt. Das hei\xDFt, bei allen in der Praxis vorkommenden Gesch\xE4ftsvorf\xE4llen gilt immer folgende Regel: Durch einen Gesch\xE4ftsvorfall werden immer mindestens zwei Werte in der Bilanz ver\xE4ndert.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0JMWg']
    }, {
        id: 'QnVjaHVuZ3NzYXR6',
        name: 'Buchungssatz',
        description: {
            html: '<p><span>Vereinfacht gesagt ist ein Buchungssatz eine Anweisung. Sie bestimmt, auf welchen Konten \u2013 und auf welcher Kontoseite (Soll oder Haben) \u2013 bei einem Gesch\xE4ftsvorgang gebucht werden soll. Ein Buchungssatz nennt zuerst das Konto, das auf der Sollseite anzusprechen ist, gefolgt von dem Wort \u201Ean\u201C und danach das Konto, das auf der Habenseite anzusprechen ist.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0JMWg', 'UldTX0dVVg']
    }, {
        id: 'R2VzY2jDpGZ0c3ZvcmZhbGw',
        name: 'Gesch\xE4ftsvorfall',
        description: {
            html: '<p><span>Gesch\xE4ftsvorf\xE4lle sind wirtschaftlich relevante Vorg\xE4nge, die nach den Grunds\xE4tzen ordnungsgem\xE4\xDFer Buchf\xFChrung in der Buchf\xFChrung erfasst werden m\xFCssen und dabei die Bilanz (theoretisch) \xE4ndern.</span></p>'
        },
        synonyms: ['Gesch\xE4ftsfall', 'Gesch\xE4ftsvorf\xE4lle', 'Gesch\xE4ftsf\xE4lle'],
        references: [],
        modules: ['UldTX0JMWg']
    }, {
        id: 'Sm91cm5hbA',
        name: 'Journal',
        description: {
            html: '<p><span>Das Journal, auch Buchungsjournal, stellt das Grundbuch der Buchhaltung dar, eine Art Tagebuch, in dem jeder Gesch\xE4ftsvorfall schriftlich festgehalten wird, unter Angabe einer fortlaufenden Nummer, des Datums, der betroffenen Soll- und Habenkonten und einer Erl\xE4uterung sowie unter Verweis auf den zugrundeliegenden Beleg.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0JMWg']
    }, {
        id: 'UGFzc2l2YQ',
        name: 'Passiva',
        description: {
            html: '<p><span>Die Verm\xF6genswerte auf der rechten Seite der Bilanz werden Passiva genannt. Die Passiva zeigen die Schulden und das Reinverm\xF6gen und somit die Art der Finanzierung, also der Mittelherkunft beziehungsweise Verm\xF6gensquellen.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0JMWg']
    }, {
        id: 'UGFzc2l2a29udG8',
        name: 'Passivkonto',
        description: {
            html: '<p><span>Als Passivkonten werden all jene Bestandskonten bezeichnet, die alle Bilanzposten auf der Passivseite der Bilanz betreffen.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0JMWg']
    }, {
        id: 'UGFzc2l2dGF1c2No',
        name: 'Passivtausch',
        description: {
            html: '<p><span>Die Bilanz ver\xE4ndert sich im laufenden Gesch\xE4ftsjahr durch sogenannte Gesch\xE4ftsvorf\xE4lle. Beim Passivtausch handelt es sich um eine von vier Formen der Wertever\xE4nderungen einer Bilanz. Es \xE4ndern sich nur Werte auf der Passivseite der Bilanz. Die Bilanzsumme \xE4ndert sich nicht. Der Wert einer Position wird gr\xF6\xDFer, der Wert einer anderen Position wird kleiner.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0JMWg']
    }, {
        id: 'U2FsZGllcnVuZw',
        name: 'Saldierung',
        description: {
            html: '<p><span>Die Saldierung beschreibt den Vorgang oder Prozess der Ermittlung des Saldos.</span></p>'
        },
        synonyms: [],
        references: ['U2FsZG8'],
        modules: ['UldTX0JMWg', 'UldTX0dVVg']
    }, {
        id: 'U2FsZG8',
        name: 'Saldo',
        description: {
            html: '<p><span>Der Saldo ergibt sich als Differenzbetrag der Sollwerte und der Habenwerte eines Kontos.</span></p>'
        },
        synonyms: [],
        references: ['U2FsZGllcnVuZw'],
        modules: ['UldTX0JMWg', 'UldTX0dVVg', 'UldTX1BSSw']
    }]
};
},{}],"T5LE":[function(require,module,exports) {
module.exports = {
    status: { code: 200, msg: true },
    data: [{
        id: 'RWlnZW5rYXBpdGFs',
        name: 'Eigenkapital',
        description: {
            html: '<p>Das Eigenkapital, auch Reinverm\xF6gen, bezeichnet jenen Teil des Kapitals eines Unternehmens, das sich aus der Differenz aus Gesamtverm\xF6gen und Schulden (Fremdkapital) ergibt. Das Eigenkapital steht dem Unternehmen ohne zeitliche Befristung zur Verf\xFCgung, kann sich jedoch durch Gewinne oder Verluste vergr\xF6\xDFern beziehungsweise verkleinern.</p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0VJTg', 'UldTX1BSSw', 'UldTX0lVSQ', 'UldTX0JMWg', 'UldTX0dVVg']
    }, {
        id: 'QmlsYW56',
        name: 'Bilanz',
        description: {
            html: '<p>Die Bilanz ist eine in Kontenform dargestellte Kurzfassung des Inventars. Sie bildet das Verm\xF6gen und die Schulden eines Unternehmens zu einem bestimmten Zeitpunkt ab. Es handelt sich also um eine zusammengefasste wertm\xE4\xDFige Gegen\xFCberstellung aller Verm\xF6gens- und Kapitalteile einer Unternehmung.</p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0VJTg', 'UldTX0JMWg', 'UldTX0lVSQ', 'UldTX0dVVg']
    }, {
        id: 'RXJmb2xnc2tvbnRv',
        name: 'Erfolgskonto',
        description: {
            html: '<p>Auf Erfolgskonten werden Gesch\xE4ftsvorf\xE4lle festgehalten, die den Erfolg (Gewinn und Verlust) eines Unternehmens betreffen. Daher ihr Name Erfolgskonten. Ihre Schlusswerte flie\xDFen nicht direkt in die Bilanz ein, sondern \xFCber den Umweg des Gewinn-und Verlustkontos (GuV-Konto). Es gibt f\xFCr jede Aufwandsart und Ertragsart ein eigenes Erfolgskonto. Sie haben keinen Anfangsbestand zu Gesch\xE4ftsjahresbeginn, sondern starten jeweils bei Null.</p>'
        },
        synonyms: ['Erfolgskonten'],
        references: [],
        modules: ['UldTX0VJTg', 'UldTX0dVVg']
    }, {
        id: 'SW52ZW50dXI',
        name: 'Inventur',
        description: {
            html: '<p>Inventur bezeichnet den Vorgang der kompletten Bestandsaufnahme von Menge und Wert aller im Unternehmen vorhandenen Verm\xF6gensgegenst\xE4nde, sowie den Schulden des Unternehmens.</p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0VJTg', 'UldTX0lVSQ', 'UldTX0JMWg']
    }]
};
},{}],"3riB":[function(require,module,exports) {
module.exports = {
    status: { code: 200, msg: true },
    data: [{
        id: 'QXVmd2FuZA',
        name: 'Aufwand',
        description: {
            html: '<p><span>Ein Aufwand in dem gegebenen Kontext tritt immer dann auf, wenn ein Unternehmen eine Leistung oder eine Nutzung in Anspruch nimmt oder Materialien kauft, die zum baldigen Verbrauch oder Verkauf bestimmt sind. Durch Aufwendungen werden Werte verbraucht \u2013 man spricht von einem Werteverzehr oder einer Wertminderung.</span></p>'
        },
        synonyms: ['Aufwendungen'],
        references: [],
        modules: ['UldTX0dVVg', 'UldTX1BSSw']
    }, {
        id: 'QW5sYWdldmVybcO2Z2Vu',
        name: 'Anlageverm\xF6gen',
        description: {
            html: '<p>Hierzu geh\xF6ren alle Verm\xF6gensbestandteile, die langfristig an das Unternehmen gebunden sind.</p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0JMWg', 'UldTX1BSSw', 'UldTX0lVSQ', 'UldTX0dVVg']
    }, {
        id: 'RWlnZW5rYXBpdGFs',
        name: 'Eigenkapital',
        description: {
            html: '<p>Das Eigenkapital, auch Reinverm\xF6gen, bezeichnet jenen Teil des Kapitals eines Unternehmens, das sich aus der Differenz aus Gesamtverm\xF6gen und Schulden (Fremdkapital) ergibt. Das Eigenkapital steht dem Unternehmen ohne zeitliche Befristung zur Verf\xFCgung, kann sich jedoch durch Gewinne oder Verluste vergr\xF6\xDFern beziehungsweise verkleinern.</p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0VJTg', 'UldTX1BSSw', 'UldTX0lVSQ', 'UldTX0JMWg', 'UldTX0dVVg']
    }, {
        id: 'QmlsYW56',
        name: 'Bilanz',
        description: {
            html: '<p>Die Bilanz ist eine in Kontenform dargestellte Kurzfassung des Inventars. Sie bildet das Verm\xF6gen und die Schulden eines Unternehmens zu einem bestimmten Zeitpunkt ab. Es handelt sich also um eine zusammengefasste wertm\xE4\xDFige Gegen\xFCberstellung aller Verm\xF6gens- und Kapitalteile einer Unternehmung.</p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0VJTg', 'UldTX0JMWg', 'UldTX0lVSQ', 'UldTX0dVVg']
    }, {
        id: 'RXJmb2xnc2tvbnRv',
        name: 'Erfolgskonto',
        description: {
            html: '<p>Auf Erfolgskonten werden Gesch\xE4ftsvorf\xE4lle festgehalten, die den Erfolg (Gewinn und Verlust) eines Unternehmens betreffen. Daher ihr Name Erfolgskonten. Ihre Schlusswerte flie\xDFen nicht direkt in die Bilanz ein, sondern \xFCber den Umweg des Gewinn-und Verlustkontos (GuV-Konto). Es gibt f\xFCr jede Aufwandsart und Ertragsart ein eigenes Erfolgskonto. Sie haben keinen Anfangsbestand zu Gesch\xE4ftsjahresbeginn, sondern starten jeweils bei Null.</p>'
        },
        synonyms: ['Erfolgskonten'],
        references: [],
        modules: ['UldTX0VJTg', 'UldTX0dVVg']
    }, {
        id: 'VW1sYXVmdmVybcO2Z2Vu',
        name: 'Umlaufverm\xF6gen',
        description: {
            html: '<p><span>Das Umlaufverm\xF6gen eines Unternehmen beschreibt alle Verm\xF6gensgegenst\xE4nde, die im Rahmen des Betriebsprozesses zur kurzfristigen Ver\xE4u\xDFerung, zum Verbrauch, zur Verarbeitung oder zur R\xFCckzahlung bestimmt sind.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ', 'UldTX0JMWg', 'UldTX0dVVg']
    }, {
        id: 'VmVyYmluZGxpY2hrZWl0ZW4',
        name: 'Verbindlichkeiten',
        description: {
            html: '<p><span>Als Verbindlichkeiten werden die Schulden eines Unternehmens bezeichnet. Sie stellen das Fremdkapital eines Unternehmens dar. Es kann in kurzfristige und langfristige Verbindlichkeiten unterschieden werden.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ', 'UldTX0JMWg', 'UldTX0dVVg']
    }, {
        id: 'VmVybcO2Z2Vu',
        name: 'Verm\xF6gen',
        description: {
            html: '<p><span>Das Verm\xF6gen umfasst die Gesamtheit aller im Unternehmen eingesetzten Werte.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ', 'UldTX0JMWg', 'UldTX0dVVg']
    }, {
        id: 'QmVzdGFuZHNrb250bw',
        name: 'Bestandskonto',
        description: {
            html: '<p><span>Alle Bilanzposten werden in Kontoform gef\xFChrt. Die Konten, die aus der Bilanz abgeleitet werden, hei\xDFen Bestandskonten. Sie lassen sich in aktive und passive Bestandskonten unterscheiden.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0JMWg', 'UldTX0dVVg']
    }, {
        id: 'QnVjaHVuZ3NzYXR6',
        name: 'Buchungssatz',
        description: {
            html: '<p><span>Vereinfacht gesagt ist ein Buchungssatz eine Anweisung. Sie bestimmt, auf welchen Konten \u2013 und auf welcher Kontoseite (Soll oder Haben) \u2013 bei einem Gesch\xE4ftsvorgang gebucht werden soll. Ein Buchungssatz nennt zuerst das Konto, das auf der Sollseite anzusprechen ist, gefolgt von dem Wort \u201Ean\u201C und danach das Konto, das auf der Habenseite anzusprechen ist.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0JMWg', 'UldTX0dVVg']
    }, {
        id: 'U2FsZGllcnVuZw',
        name: 'Saldierung',
        description: {
            html: '<p><span>Die Saldierung beschreibt den Vorgang oder Prozess der Ermittlung des Saldos.</span></p>'
        },
        synonyms: [],
        references: ['U2FsZG8'],
        modules: ['UldTX0JMWg', 'UldTX0dVVg']
    }, {
        id: 'U2FsZG8',
        name: 'Saldo',
        description: {
            html: '<p><span>Der Saldo ergibt sich als Differenzbetrag der Sollwerte und der Habenwerte eines Kontos.</span></p>'
        },
        synonyms: [],
        references: ['U2FsZGllcnVuZw'],
        modules: ['UldTX0JMWg', 'UldTX0dVVg', 'UldTX1BSSw']
    }, {
        id: 'QXVmd2FuZHNrb250bw',
        name: 'Aufwandskonto',
        description: {
            html: '<p><span>Auf Aufwandskonten werden Gesch\xE4ftsvorf\xE4lle festgehalten, die einen Aufwand darstellen. Es gibt f\xFCr jede Aufwandsart ein eigenes Aufwandskonto (siehe auch Erfolgskonto).</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0dVVg']
    }, {
        id: 'RXJ0cmFn',
        name: 'Ertrag',
        description: {
            html: '<p><span>Ertr\xE4ge entstehen immer dann, wenn Leistungen und Produkte, die Sie anbieten, von Dritten k\xE4uflich erworben werden, so dass auf Ihrer eigenen Seite eine Wertsch\xF6pfung (Geldeinnahme) entsteht.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0dVVg']
    }, {
        id: 'RXJ0cmFnc2tvbnRv',
        name: 'Ertragskonto',
        description: {
            html: '<p><span>Auf Ertragskonten werden Gesch\xE4ftsvorf\xE4lle festgehalten, die einen Ertrag darstellen. Es gibt f\xFCr jede Ertragsart ein eigenes Ertragskonto (siehe auch Erfolgskonto).</span></p>'
        },
        synonyms: [],
        references: ['RXJ0cmFn'],
        modules: ['UldTX0dVVg']
    }, {
        id: 'R2V3aW5uLXVuZC1WZXJsdXN0LUtvbnRv',
        name: 'Gewinn-und-Verlust-Konto',
        description: {
            html: '<p><span>Beim Abschluss der Ertragskonten wird vor das Eigenkapital das Konto \u201EGuV\u201C (Gewinn und Verlust) eingerichtet (im Sinne der \xDCbersichtlichkeit). In diesem Konto GuV werden alle Aufwendungen und Ertr\xE4ge abgeschlossen. Das Konto GuV wird anschlie\xDFend \xFCber das Konto Eigenkapital abgeschlossen. Steht der Saldo des GuV-Kontos im Soll, dann liegt ein Gewinn (Mehrung) vor. Steht der Saldo des GuV-Kontos hingegen im Haben, handelt es sich um einen Verlust (Minderung).</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0dVVg']
    }, {
        id: 'R2V3aW5uLXVuZC1WZXJsdXN0LVJlY2hudW5n',
        name: 'Gewinn-und-Verlust-Rechnung',
        description: {
            html: '<p><span>Die GuV stellt die Aufwendungen und Ertr\xE4ge eines Gesch\xE4ftsjahres unter Ausweisung der Quellen gegen\xFCber, um das Unternehmensergebnis zu ermitteln, d. h. ob ein Gewinn oder ein Verlust erwirtschaftet wurde. Die GuV wird im GuV-Konto vorgenommen. Sie ist Pflichtbestandteil des Jahresabschlusses von Kaufleuten (\xA7 242 III HGB).</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0dVVg']
    }, {
        id: 'S29udG9mb3Jt',
        name: 'Kontoform',
        description: {
            html: '<p><span>Beim Aufbau der GuV in Kontoform wird das Ergebnis als Saldo entweder auf der Soll-Seite bei Gewinn oder auf der Haben-Seite bei Verlust gezeigt.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0dVVg']
    }, {
        id: 'U3RhZmZlbGZvcm0',
        name: 'Staffelform',
        description: {
            html: '<p><span>Der staffelf\xF6rmige Aufbau einer GuV macht klar ersichtlich, durch welche Gesch\xE4ftsbereiche ein Gewinn oder Verlust verursacht wurde. Die Gegen\xFCberstellung der Aufwendungen und Ertr\xE4ge erfolgt geordnet nach der jeweiligen Quelle. Dieses Schema erh\xF6ht gegen\xFCber der GuV in Kontoform die Einfachheit, \xDCbersichtlichkeit und Aussagekraft. F\xFCr Kapitalgesellschaften ist die Staffelform zwingend vorgeschrieben (\xA7 275 I HGB).</span></p>'
        },
        synonyms: [],
        references: ['S29udG9mb3Jt'],
        modules: ['UldTX0dVVg']
    }]
};
},{}],"KPtA":[function(require,module,exports) {
module.exports = {
    status: { code: 200, msg: true },
    data: [{
        id: 'QW5sYWdldmVybcO2Z2Vu',
        name: 'Anlageverm\xF6gen',
        description: {
            html: '<p>Hierzu geh\xF6ren alle Verm\xF6gensbestandteile, die langfristig an das Unternehmen gebunden sind.</p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0JMWg', 'UldTX1BSSw', 'UldTX0lVSQ', 'UldTX0dVVg']
    }, {
        id: 'RWlnZW5rYXBpdGFs',
        name: 'Eigenkapital',
        description: {
            html: '<p>Das Eigenkapital, auch Reinverm\xF6gen, bezeichnet jenen Teil des Kapitals eines Unternehmens, das sich aus der Differenz aus Gesamtverm\xF6gen und Schulden (Fremdkapital) ergibt. Das Eigenkapital steht dem Unternehmen ohne zeitliche Befristung zur Verf\xFCgung, kann sich jedoch durch Gewinne oder Verluste vergr\xF6\xDFern beziehungsweise verkleinern.</p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0VJTg', 'UldTX1BSSw', 'UldTX0lVSQ', 'UldTX0JMWg', 'UldTX0dVVg']
    }, {
        id: 'QmlsYW56',
        name: 'Bilanz',
        description: {
            html: '<p>Die Bilanz ist eine in Kontenform dargestellte Kurzfassung des Inventars. Sie bildet das Verm\xF6gen und die Schulden eines Unternehmens zu einem bestimmten Zeitpunkt ab. Es handelt sich also um eine zusammengefasste wertm\xE4\xDFige Gegen\xFCberstellung aller Verm\xF6gens- und Kapitalteile einer Unternehmung.</p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0VJTg', 'UldTX0JMWg', 'UldTX0lVSQ', 'UldTX0dVVg']
    }, {
        id: 'SW52ZW50dXI',
        name: 'Inventur',
        description: {
            html: '<p>Inventur bezeichnet den Vorgang der kompletten Bestandsaufnahme von Menge und Wert aller im Unternehmen vorhandenen Verm\xF6gensgegenst\xE4nde, sowie den Schulden des Unternehmens.</p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0VJTg', 'UldTX0lVSQ', 'UldTX0JMWg']
    }, {
        id: 'QmVzdGFuZHNhdWZuYWhtZQ',
        name: 'Bestandsaufnahme',
        description: {
            html: '<p><span>Die Bestandsaufnahme bezeichnet hier die dokumentierte Erfassung aller im Unternehmen vorhandenen Verm\xF6gensgegenst\xE4nde (siehe auch Inventur).</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ']
    }, {
        id: 'QmlsYW56c3RpY2h0YWc',
        name: 'Bilanzstichtag',
        description: {
            html: '<p><span>Der Bilanzstichtag bezeichnet den letzten Tag eines Gesch\xE4ftsjahres, der zur Erstellung der Bilanz herangezogen wird.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ']
    }, {
        id: 'QnVjaGhhbHR1bmc',
        name: 'Buchhaltung',
        description: {
            html: '<p><span>Die Buchhaltung kann als Pflicht, als Prozess sowie als Organisationseinheit verstanden werden, die alle Gesch\xE4ftsvorg\xE4nge zahlenm\xE4\xDFig nach einem bestimmten Schema erfasst und dokumentiert.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ', 'UldTX0JMWg']
    }, {
        id: 'QnVjaGludmVudHVy',
        name: 'Buchinventur',
        description: {
            html: '<p><span>Die Buchinventur oder die belegm\xE4\xDFige Aufnahme erfasst jene Bestandswerte, die nicht materiell greifbar sind.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ']
    }, {
        id: 'RWluemVsZXJmYXNzdW5n',
        name: 'Einzelerfassung',
        description: {
            html: '<p><span>Bei der Einzelerfassung handelt es sich um den Inventurgrundsatz, der besagt, dass Verm\xF6gensgegenst\xE4nde und Schulden einzeln erfasst und bewertet werden m\xFCssen.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ']
    }, {
        id: 'RnJlbWRrYXBpdGFs',
        name: 'Fremdkapital',
        description: {
            html: '<p><span>Das Fremdkapital bezeichnet jenen Teil des Kapitals eines Unternehmens, der dem Unternehmen nach schuldrechtlichen Regeln \xFCberlassen wurde. </span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ', 'UldTX0JMWg', 'UldTX1BSSw']
    }, {
        id: 'SW52ZW50YXI',
        name: 'Inventar',
        description: {
            html: '<p><span>Das Inventar (lateinisch inventarium, \u201EGesamtheit des Gefundenen\u201C) ist ein ausf\xFChrliches geordnetes Verzeichnis, das alle Verm\xF6gensgegenst\xE4nde und Schulden eines Unternehmens zu einem bestimmten Zeitpunkt nach Art, Menge und Wert ausweist.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ', 'UldTX0JMWg']
    }, {
        id: 'SW52ZW50dXJncnVuZHPDpHR6ZQ',
        name: 'Inventurgrunds\xE4tze',
        description: {
            html: '<p><span>Die Inventur hat den folgenden vier Grunds\xE4tzen zu folgen: Grundsatz der Vollst\xE4ndigkeit, Grundsatz der Richtigkeit und Willk\xFCrfreiheit, Grundsatz der Nachpr\xFCfbarkeit und Dokumentation, sowie der Grundsatz der Einzelerfassung.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ']
    }, {
        id: 'SW52ZW50dXJ2ZXJmYWhyZW4',
        name: 'Inventurverfahren',
        description: {
            html: '<p><span>Es gibt verschiedene Anwendungs- oder Inventurverfahren f\xFCr die k\xF6rperliche Inventur: Stichtagsinventur; Zeitversetzte/ verlegte Inventur; Stichprobeninventur; Permanente Inventur.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ']
    }, {
        id: 'S8O2cnBlcmxpY2hlIEludmVudHVy',
        name: 'K\xF6rperliche Inventur',
        description: {
            html: '<p><span>Die k\xF6rperliche Inventur erfasst alle gegenst\xE4ndlichen Bestandswerte mengenm\xE4\xDFig durch z\xE4hlen, sch\xE4tzen, messen und wiegen erfasst. Im Nachhinein werden die erfassten Mengen in Geldeinheiten bewertet.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ']
    }, {
        id: 'TmFjaHByw7xmYmFya2VpdA',
        name: 'Nachpr\xFCfbarkeit',
        description: {
            html: '<p><span>Bei der Nachpr\xFCfbarkeit handelt es sich um jenen Inventurgrundsatz, der besagt, dass die Inventur auf eine Art und Weise erstellt sein muss, dass ein sachverst\xE4ndiger Dritter den Bilanzansatz \xFCberpr\xFCfen kann.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ']
    }, {
        id: 'UGVybWFuZW50ZSBJbnZlbnR1cg',
        name: 'Permanente Inventur',
        description: {
            html: '<p><span>Die permanente Inventur z\xE4hlt zu einem der vier Inventurverfahren der k\xF6rperlichen Inventur. Sie beschreibt die fortlaufende Bestandsaufnahme \xFCber das Jahr hinweg bis zum Stichtag der Bilanz. Die gesetzliche Grundlage f\xFCr die permanente Inventur ist der \xA7 241 (2) Handelsgesetzbuch (HGB).</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ']
    }, {
        id: 'UmVpbnZlcm3Dtmdlbg',
        name: 'Reinverm\xF6gen',
        description: {
            html: '<p><span>Das Reinverm\xF6gen, auch Eigenkapital, bezeichnet jenen Teil des Kapitals eines Unternehmens, dass sich aus der Differenz aus Gesamtverm\xF6gen und Schulden ergibt. Das Reinverm\xF6gen steht dem Unternehmen ohne zeitliche Befristung zur Verf\xFCgung, kann sich jedoch durch Gewinne oder Verluste vergr\xF6\xDFern beziehungsweise verkleinern.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ', 'UldTX0JMWg']
    }, {
        id: 'U2NodWxkZW4',
        name: 'Schulden',
        description: {
            html: '<p><span>Schulden werden auch als Verbindlichkeiten bezeichnet und stellen das Fremdkapital eines Unternehmens dar. Es kann in kurzfristige und langfristige Schulden unterschieden werden.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ', 'UldTX0JMWg']
    }, {
        id: 'U3RpY2h0YWdzaW52ZW50dXI',
        name: 'Stichtagsinventur',
        description: {
            html: '<p><span>Die Stichtagsinventur z\xE4hlt zu einem der vier Inventurverfahren der k\xF6rperlichen Inventur. Die Stichtagsinventur ist eine Ma\xDFnahme, die zu einem festgesetzten Termin das gesamte Unternehmen erfasst. Der Begriff Stichtagsinventur umfasst auch Inventuren, die mehrere Tage in Anspruch nehmen. In der Regel werden f\xFCr die umfassende Inventur bis zu zehn Tage der Zeit vor oder nach dem Stichtag f\xFCr die Bilanz angesetzt.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ']
    }, {
        id: 'U3RpY2hwcm9iZW5pbnZlbnR1cg',
        name: 'Stichprobeninventur',
        description: {
            html: '<p><span>Die Stichprobeninventur z\xE4hlt zu einem der vier Inventurverfahren der k\xF6rperlichen Inventur. Bei der Stichprobeninventur wird eine so genannte Teilerhebung durchgef\xFChrt. Aus der Erfassung der Stichproben werden dabei die Werte durch eine Hochrechnung nach streng vorgegebenen Prinzipien ermittelt. Eine solche Teilhebung nach dem Prinzip der Bestandsaufnahme \xFCber Stichproben muss nach gesetzlich festgelegten Grunds\xE4tzen vorgenommen werden. Die gesetzliche Grundlage bildet der \xA7 241 Absatz 1 im HGB (Handelsgesetzbuch). </span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ']
    }, {
        id: 'VW1sYXVmdmVybcO2Z2Vu',
        name: 'Umlaufverm\xF6gen',
        description: {
            html: '<p><span>Das Umlaufverm\xF6gen eines Unternehmen beschreibt alle Verm\xF6gensgegenst\xE4nde, die im Rahmen des Betriebsprozesses zur kurzfristigen Ver\xE4u\xDFerung, zum Verbrauch, zur Verarbeitung oder zur R\xFCckzahlung bestimmt sind.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ', 'UldTX0JMWg', 'UldTX0dVVg']
    }, {
        id: 'VmVyYmluZGxpY2hrZWl0ZW4',
        name: 'Verbindlichkeiten',
        description: {
            html: '<p><span>Als Verbindlichkeiten werden die Schulden eines Unternehmens bezeichnet. Sie stellen das Fremdkapital eines Unternehmens dar. Es kann in kurzfristige und langfristige Verbindlichkeiten unterschieden werden.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ', 'UldTX0JMWg', 'UldTX0dVVg']
    }, {
        id: 'VmVybcO2Z2Vu',
        name: 'Verm\xF6gen',
        description: {
            html: '<p><span>Das Verm\xF6gen umfasst die Gesamtheit aller im Unternehmen eingesetzten Werte.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ', 'UldTX0JMWg', 'UldTX0dVVg']
    }, {
        id: 'VmVybcO2Z2Vuc2FydGVu',
        name: 'Verm\xF6gensarten',
        description: {
            html: '<p><span>Das Verm\xF6gen eines Unternehmens l\xE4sst sich in zwei Verm\xF6gensarten unterteilen - in Anlageverm\xF6gen und in Umlaufverm\xF6gen.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ']
    }, {
        id: 'Vm9sbHN0w6RuZGlna2VpdA',
        name: 'Vollst\xE4ndigkeit',
        description: {
            html: '<p><span>Bei der Vollst\xE4ndigkeit handelt es sich um jenen Inventurgrundsatz, der besagt, dass s\xE4mtliche Verm\xF6gensgegenst\xE4nde/Schulden im Inventar zu verzeichnen sind.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ']
    }, {
        id: 'V2VydGZvcnRzY2hyZWlidW5n',
        name: 'Wertfortschreibung',
        description: {
            html: '<p><span>Bei der zeitversetzten Inventur muss eine Wertberichtigung in Form einer Wertfortschreibung beziehungsweise einer Wertr\xFCckrechnung zum Stichtag der Bilanz gemacht werden. Die Wertfortschreibung wird vorgenommen, wenn die Inventur in der Zeit vor dem Bilanzstichtag stattfindet.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ']
    }, {
        id: 'V2VydHLDvGNrcmVjaG51bmc',
        name: 'Wertr\xFCckrechnung',
        description: {
            html: '<p><span>Bei der zeitversetzten Inventur muss eine Wertberichtigung in Form einer Wertfortschreibung beziehungsweise einer Wertr\xFCckrechnung zum Stichtag der Bilanz gemacht werden. Die Wertr\xFCckrechnung wird vorgenommen, \xA0wenn die Inventur in der Zeit nach dem Bilanzstichtag stattfindet.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ']
    }, {
        id: 'V2lsbGvDvHJmcmVpaGVpdA',
        name: 'Willk\xFCrfreiheit',
        description: {
            html: '<p><span>Bei der Willk\xFCrfreiheit handelt es sich um jenen Inventurgrundsatz, der besagt, dass eine nachpr\xFCfbare Richtigkeit der Inventur gefordert ist, wobei der Aufwand f\xFCr die Feststellung von Mengen und Preisen wirtschaftlich vertretbar sein muss.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ']
    }, {
        id: 'WmVpdHZlcnNldHp0ZSBJbnZlbnR1cg',
        name: 'Zeitversetzte Inventur',
        description: {
            html: '<p><span>Die zeitversetzte (auch verlegte) Inventur z\xE4hlt zu einem der vier Inventurverfahren der k\xF6rperlichen Inventur. Von einer zeitversetzten Inventur wird gesprochen, wenn sich der Zeitraum f\xFCr die Durchf\xFChrung der Inventur um bis zu drei Monate vor oder bis zu zwei Monate nach dem Bilanzstichtag verschiebt.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ']
    }]
};
},{}],"czse":[function(require,module,exports) {
module.exports = {
    status: { code: 200, msg: true },
    data: [{
        id: 'QXVmd2FuZA',
        name: 'Aufwand',
        description: {
            html: '<p><span>Ein Aufwand in dem gegebenen Kontext tritt immer dann auf, wenn ein Unternehmen eine Leistung oder eine Nutzung in Anspruch nimmt oder Materialien kauft, die zum baldigen Verbrauch oder Verkauf bestimmt sind. Durch Aufwendungen werden Werte verbraucht \u2013 man spricht von einem Werteverzehr oder einer Wertminderung.</span></p>'
        },
        synonyms: ['Aufwendungen'],
        references: [],
        modules: ['UldTX0dVVg', 'UldTX1BSSw']
    }, {
        id: 'QW5sYWdldmVybcO2Z2Vu',
        name: 'Anlageverm\xF6gen',
        description: {
            html: '<p>Hierzu geh\xF6ren alle Verm\xF6gensbestandteile, die langfristig an das Unternehmen gebunden sind.</p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0JMWg', 'UldTX1BSSw', 'UldTX0lVSQ', 'UldTX0dVVg']
    }, {
        id: 'RWlnZW5rYXBpdGFs',
        name: 'Eigenkapital',
        description: {
            html: '<p>Das Eigenkapital, auch Reinverm\xF6gen, bezeichnet jenen Teil des Kapitals eines Unternehmens, das sich aus der Differenz aus Gesamtverm\xF6gen und Schulden (Fremdkapital) ergibt. Das Eigenkapital steht dem Unternehmen ohne zeitliche Befristung zur Verf\xFCgung, kann sich jedoch durch Gewinne oder Verluste vergr\xF6\xDFern beziehungsweise verkleinern.</p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0VJTg', 'UldTX1BSSw', 'UldTX0lVSQ', 'UldTX0JMWg', 'UldTX0dVVg']
    }, {
        id: 'RnJlbWRrYXBpdGFs',
        name: 'Fremdkapital',
        description: {
            html: '<p><span>Das Fremdkapital bezeichnet jenen Teil des Kapitals eines Unternehmens, der dem Unternehmen nach schuldrechtlichen Regeln \xFCberlassen wurde. </span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX0lVSQ', 'UldTX0JMWg', 'UldTX1BSSw']
    }, {
        id: 'U2FsZG8',
        name: 'Saldo',
        description: {
            html: '<p><span>Der Saldo ergibt sich als Differenzbetrag der Sollwerte und der Habenwerte eines Kontos.</span></p>'
        },
        synonyms: [],
        references: ['U2FsZGllcnVuZw'],
        modules: ['UldTX0JMWg', 'UldTX0dVVg', 'UldTX1BSSw']
    }, {
        id: 'RW50bmFobWVu',
        name: 'Entnahmen',
        description: { html: '<p>siehe Privatentnahme</p>' },
        synonyms: [],
        references: [],
        modules: ['UldTX1BSSw']
    }, {
        id: 'R2V3aW5ucsO8Y2tsYWdlbg',
        name: 'Gewinnr\xFCcklagen',
        description: {
            html: '<p><span>Zu Gewinnr\xFCcklagen z\xE4hlen finanzielle Reserven, die aus dem j\xE4hrlichen Gewinn einbehalten werden.</span></p>'
        },
        synonyms: [],
        references: ['R2V3aW5uLXVuZC1WZXJsdXN0LVJlY2hudW5n', 'R2V3aW5uLXVuZC1WZXJsdXN0LUtvbnRv'],
        modules: ['UldTX1BSSw']
    }, {
        id: 'R2V3aW5udm9ydHJhZw',
        name: 'Gewinnvortrag',
        description: {
            html: '<p><span>Der Gewinnvortrag wird aus dem Rest des Vorjahresgewinnes gebildet, der nach der Gewinnverwendung \xFCbrig bleibt.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX1BSSw']
    }, {
        id: 'R2V6ZWljaG5ldGVzIEthcGl0YWw',
        name: 'Gezeichnetes Kapital',
        description: {
            html: '<p><span>Kapitalgesellschaften sind bei ihrer Gr\xFCndung zu einer Kapitaleinlage verpflichtet, die auch als Stammeinlage oder Grundkapital bezeichnet wird. Das gezeichnete Kapital setzt sich aus dieser Einlage sowie etwaigen sp\xE4teren Kapitalerh\xF6hungen zusammen.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX1BSSw']
    }, {
        id: 'SmFocmVzZmVobGJldHJhZw',
        name: 'Jahresfehlbetrag',
        description: {
            html: '<p><span>Als Jahresfehlbetrag wird der Verlust nach Abzug aller Steuern bezeichnet.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX1BSSw']
    }, {
        id: 'SmFocmVzw7xiZXJzY2h1c3M',
        name: 'Jahres\xFCberschuss',
        description: {
            html: '<p><span>Als Jahres\xFCberschuss wird der Gewinn nach Abzug aller Steuern bezeichnet.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX1BSSw']
    }, {
        id: 'S2FwaXRhbHLDvGNrbGFnZW4',
        name: 'Kapitalr\xFCcklagen',
        description: {
            html: '<p><span>Kapitalr\xFCcklagen z\xE4hlen wie die Gewinnr\xFCcklagen zu den offenen R\xFCcklagen. Sie sind f\xFCr Kapitalgesellschaften zur Bildung finanzieller Reserven verpflichtend vorgeschrieben. Gebildet werden sie beispielsweise aus Agiobetr\xE4gen bei der Ausgabe von Aktien.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX1BSSw']
    }, {
        id: 'UHJpdmF0ZWlubGFnZQ',
        name: 'Privateinlage',
        description: {
            html: '<p><span>Als Privateinlage wird die Zuf\xFChrung von privaten Verm\xF6gensgegenst\xE4nden an das Unternehmen bezeichnet. Dort werden sie f\xFCr unternehmerische, also f\xFCr Firmenzwecke, benutzt. Privateinlagen k\xF6nnen sowohl Geld- als auch Verm\xF6genseinlagen in Form von Sachen und G\xFCtern sein.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX1BSSw']
    }, {
        id: 'UHJpdmF0ZW50bmFobWU',
        name: 'Privatentnahme',
        description: {
            html: '<p><span>Um Privatentnahmen handelt es sich, wenn im Laufe eines Wirtschaftsjahres Wirtschaftsg\xFCter aus dem Betrieb f\xFCr den eigenen Haushalt und f\xFCr andere betriebsfremde Zwecke entnommen werden.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX1BSSw']
    }, {
        id: 'UHJpdmF0a29udG8',
        name: 'Privatkonto',
        description: {
            html: '<p><span>Privatkonten sind Unterkonten des Eigenkapitals. Sie dienen der Buchung von Privateinlagen sowie Privatentnahmen und werden am Jahresende \xFCber letzteres abgeschlossen.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX1BSSw']
    }, {
        id: 'U2FjaGVudG5haG1lbg',
        name: 'Sachentnahmen',
        description: {
            html: '<p><span>Sachentnahmen stellen jene Form der Privatentnahme dar, bei denen Waren aus dem eigenen Sortiment f\xFCr private Zwecke entnommen werden.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX1BSSw']
    }, {
        id: 'VmVybHVzdHZvcnRyYWc',
        name: 'Verlustvortrag',
        description: {
            html: '<p><span>Der Verlustvortrag wird aus dem Teil des Vorjahresverlustes gebildet, der nicht von anderen Eigenkapitalposten ausgeglichen wird.</span></p>'
        },
        synonyms: [],
        references: [],
        modules: ['UldTX1BSSw']
    }]
};
},{}],"Focm":[function(require,module,exports) {
/*
    index.js

    Library to make life with the beuth middleware easier.
*/

// eslint-disable-next-line fp/no-unused-expression
// require('isomorphic-fetch') // fetch polyfill for browser and node

var _require = require('@fntk/types'),
    Data = _require.Data;

var _require2 = require('@fntk/utils'),
    Log = _require2.Log,
    Pipe = _require2.Pipe;
// const LCMS = require('./lcms')

var log = Log('LCMS');

var BeuthConfig = Data('Beuth', {
    token: String,
    baseUrl: String
});

// getModuleGlossary :: String -> HTTPHeaders -> Number -> Promise
// const getModuleGlossary = (baseUrl, headers, id) =>
//     Pipe(
//         `${baseUrl}/beuth/vfh/openStudio/middleware/repository/glossary/modules/${id}`
//     )
//         .andThen(log.debug('URL'))
//         .andThen(url =>
//             fetch(url, {
//                 method: 'GET', // *GET, POST, PUT, DELETE, etc.
//                 // credentials: 'same-origin',
//                 headers
//             })
//         )
//         .andThen(response => response.text())
//         .value()

var Glossary = {
    UldTX0JMWg: require('./glossary/UldTX0JMWg'),
    UldTX0VJTg: require('./glossary/UldTX0VJTg'),
    UldTX0dVVg: require('./glossary/UldTX0dVVg'),
    UldTX0lVSQ: require('./glossary/UldTX0lVSQ'),
    UldTX1BSSw: require('./glossary/UldTX1BSSw')
};

var _getModuleGlossary = function _getModuleGlossary(baseUrl, headers, id) {
    try {
        var res = Glossary[id];
        return Promise.resolve(res.data);
    } catch (e) {
        log.error('getModuleGlossary', e);
    }
    return Promise.reject('Module not found');
};

module.exports = function (_ref) {
    var token = _ref.token,
        _ref$baseUrl = _ref.baseUrl,
        baseUrl = _ref$baseUrl === undefined ? 'https://vfh143.beuth-hochschule.de' : _ref$baseUrl;

    var cfg = BeuthConfig({ token: token, baseUrl: baseUrl });
    log.debug('BeuthConfig', cfg);
    return {
        getModuleGlossary: function getModuleGlossary(moduleId) {
            return _getModuleGlossary(baseUrl, {}, moduleId);
        }

        // LCMS: LCMS({
        //     token: cfg.token,
        //     baseUrl: cfg.baseUrl,
        //     route: '',
        //     // tpAuth: ''
        //     tpAuth: ''
        // })
    };
};

/*

var Beuth = require('./src')
var Api = Beuth({ token: '' })
var ModuleId = 'UldTX0lVSQ'

Api.getModuleGlossary(ModuleId).then(res => console.log("Res:", res)).catch(e => console.log("Error", e))


*/
},{"@fntk/types":"whhW","@fntk/utils":"LxSS","./glossary/UldTX0JMWg":"FowP","./glossary/UldTX0VJTg":"T5LE","./glossary/UldTX0dVVg":"3riB","./glossary/UldTX0lVSQ":"KPtA","./glossary/UldTX1BSSw":"czse"}]},{},["Focm"], null)
//# sourceMappingURL=/index.map