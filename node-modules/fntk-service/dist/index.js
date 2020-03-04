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
      localRequire.cache = {};

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
})({"data/app.js":[function(require,module,exports) {
/*
    App.js

    Provides a data structure for basic app behaivor.
*/
const {
  Let
} = require('@fntk/utils'); //
// App
//  * fn: The app logic
//  * sources: A list of functions that act as data sources and generate data
//  * layer: A list of functions that builds a pipeline and manipulate the
//           data before reaching the app logic (fn)
//
// App :: Function -> List(Function) -> List(Function) -> Nothing


const App = (fn = x => x, sources = [], layer = []) => ({
  // Here we add data sources. They can create data and feed in
  // the system.
  add: s => App(fn, sources.concat([s]), layer),
  // Here we add a middleware layer to manipulate the data on his way
  // trough the system, before it reaches it's final processing.
  use: l => App(fn, sources, layer.concat([l])),
  // Add the data processing. This is the main logic of the app.
  do: f => App(f, sources, layer),
  // Start the app
  start: () => Let({
    // Build the data pipeline. Incoming data is passed to all
    // layers of middleware in the order we defined it earlier
    // trough the .use() function.
    dataPipeline: layer // Add the program logic as last step, after the
    // middleware layer
    .concat(fn) // Build the pipeline using composition
    .reduce((f, g) => x => g(f(x)), x => x)
  }).In(({
    dataPipeline
  }) => // Hand the data processing pipeline to the data sources,
  // so that every source can pass new data to the app.
  sources.forEach(s => s(dataPipeline)))
});

module.exports = App;
},{}],"data/request.js":[function(require,module,exports) {
/*
    Request

    Provides a data structure that represents an incoming request.
*/
const {
  Type,
  Data,
  StringType
} = require('@fntk/types');

const RequestType = Data('Request', {
  path: String,
  payload: Object
});
RequestType.NLP = Type('NLP', v => RequestType.is(v) && StringType.is(v.payload.sentence), val => ({
  path: '/',
  payload: {
    sentence: StringType(val)
  }
})); // RequestType.NLP = RequestType.derive(val => ({
//     path: '/',
//     payload: { sentence: StringType(val) }
// }))
// const Request = Union('Request', {
//     Request: RequestType,
//     NLP: NLPRequestType
// })

module.exports = RequestType;
},{}],"data/response.js":[function(require,module,exports) {
/*
    Request

    Provides a data structure that represents an incoming request.
*/
const {
  Union,
  Result
} = require('@fntk/types');

const {
  Random
} = require('@fntk/utils');

const RandomOkType = Result.Ok.derive(val_list => Random(val_list));
const Response = Union('Response', {
  Success: Result.Ok,
  Error: Result.Err,
  Random: RandomOkType
});
module.exports = Response;
},{}],"gateways/http/web-service.js":[function(require,module,exports) {
// Express
const Express = require('express');

const Compression = require('compression');

const BodyParser = require('body-parser'); // Node


const Url = require('url');

const Http = require('http');

const {
  Data
} = require('@fntk/types');

const {
  Log
} = require('@fntk/utils');

const log = Log('WebService'); //
// -- Types
//

const HttpHeader = Data('HTTPHeader', {
  method: String,
  url: String,
  path: String,
  headers: Object
});
const HttpRequest = Data('HTTPRequest', {
  http: HttpHeader,
  data: Object
}); //
// -- Helper
//

const isObject = obj => obj !== null && typeof obj === 'object';

const toPromise = p => p.then ? p : Promise.resolve(p);

const toString = response => isObject(response) ? JSON.stringify(response, 0, 4) : response;

const isObjEmpty = obj => Boolean(Object.keys(obj).length); // app :: ()


const app = fn => Express().use(Compression()) // Compression support
.use(BodyParser.json()) // Automatic parsing of the response body
.use(BodyParser.urlencoded({
  extended: true
})) // Catch route
.all('*', (req, res, next) => {
  const url = Url.parse(req.url, true);
  log.debug('URL', url);
  const request = HttpRequest({
    http: HttpHeader({
      method: req.method,
      headers: req.headers,
      url: req.url,
      path: url.pathname
    }),
    data: isObjEmpty(url.query) ? url.query : req.body
  });
  log.debug('Request', request);

  const handler = r => toPromise(fn(r));

  return handler(request).then(toString).then(response => {
    log.debug('[WebService] Response: ', response);
    res.write(response);
    return res.end();
  });
}); // program :: { Int, [ Route ]}


const program = fn => {
  // Configuration
  const port = 8000;
  const prog = app(fn);
  Http.createServer(prog).listen(port, () => log.debug(`Listening on: 0.0.0.0:${port}`));
  return port;
};

module.exports = {
  program
};
},{}],"gateways/http/index.js":[function(require,module,exports) {
/*
    HttpListener

    Listen to http events and forward them back to the app for handling.
*/
const WebService = require('./web-service');

const Request = require('../../data/request');

const {
  Log
} = require('@fntk/utils');

const log = Log('HTTPGateway'); // Get http requests, send them to the system for processing and
// send the response after successfull handling.

module.exports = cfg => fn => WebService.program(request => {
  log.debug('HTTPRequest', request);
  const req = Request({
    path: request.http.path,
    payload: request.data
  });
  log.debug('Request', req);
  return fn(req);
});
},{"./web-service":"gateways/http/web-service.js","../../data/request":"data/request.js"}],"gateways/telegram/index.js":[function(require,module,exports) {
/*
    telegram.js

    Get updates from telegram.
*/
const Request = require('../../data/request');

const Response = require('../../data/response');

const TeleBot = require('telebot');

const {
  Union,
  StringType
} = require('@fntk/types');

const {
  Log,
  Pipe
} = require('@fntk/utils');

const log = Log('TelegramGateway'); //
// -- Helper --
//

const toPromise = p => p.then ? p : Promise.resolve(p); //
// -- Types --
//


const ParseMode = Union('TelegramParseMode', {
  Text: StringType.of('Text'),
  Markdown: StringType.of('Markdown'),
  HTML: StringType.of('HTML')
}); // On token:
// https://core.telegram.org/bots/api#authorizing-your-bot
//
// On parseMode:
// https://core.telegram.org/bots/api#formatting-options
//

const TelegramGateway = function ({
  token,
  parseMode = ParseMode.Text()
}) {
  log.debug('parseMode', parseMode);
  ParseMode.check(parseMode);
  log.debug('ParseMode', parseMode);
  return fn => {
    const bot = new TeleBot({
      token,
      polling: {
        interval: 1000
      }
    }); // eslint-disable-next-line fp/no-unused-expression

    bot.on('text', msg => // Create NLP Request and send it to the system to
    // produce a response.
    Pipe(Request.NLP(msg.text)).andThen(req => toPromise(fn(req))) // Get Response from the system guaranteed as Promise<Response>
    .value() // .. and handle it.
    .then(log.debug('Response')).then(response => Response.case(response, {
      Success: () => response.value,
      Error: () => response.error
    })).then(log.debug('Answer')).then(answer => bot.sendMessage(msg.from.id, answer, {
      parseMode,
      replyToMessage: msg.message_id
    })).catch(log.error('Error')).catch(e => bot.sendMessage(msg.from.id, 'Internal Error', {
      replyToMessage: msg.message_id
    })));
    return bot.start();
  };
};

TelegramGateway.ParseMode = ParseMode;
module.exports = TelegramGateway;
},{"../../data/request":"data/request.js","../../data/response":"data/response.js"}],"middleware/nlp.js":[function(require,module,exports) {
/*
    Route sentences to modules using nlp technics.
*/
// const Franc = require('franc') // Language detection
// const Tokenizer = require('./stem/tokenizer')
const Snowball = require('snowball');

const Natural = require('natural'); // sentence similarity


const NlpToolkit = require('nlp-toolkit');

const StopwordsIso = require('stopwords-iso');

const Fs = require('fs'); // const GerSnowball = require('./snowball-ger')


const Request = require('../data/request');

const Response = require('../data/response');

const {
  Log
} = require('@fntk/utils');

const log = Log('NLPMiddleware'); // Languages :: Languages

const Language = {
  de: 'German',
  en: 'English' // State :: State

};
const State = {
  lang: 'de',
  functions: [] //
  // -- Utils
  //
  // getSubDirs :: String => String[]

};

const getSubDirs = dir => Fs.readdirSync(dir) // Convert the filename to a full path, filter out all
// directories and look recursively for more nested dirs.
.map(file => `${dir}/${file}`).filter(file => Fs.statSync(file).isDirectory()).reduce((ret, d) => ret // Add found dirs to return value and look for
// more nested dirs.
.concat(d).concat(getSubDirs(d)), []); // getNlpFunctions :: String => NlpFunction[]


const getNlpFunctions = dir => getSubDirs(dir).reduce((ret, path) => {
  try {
    const cfg = require(`${path}/function.json`);

    if (cfg.sentences.de || cfg.sentences.en) {
      return ret.concat([{
        path: path.replace(dir, ''),
        sentences: cfg.sentences
      }]);
    }
  } catch (e) {// Not found, or something else..
    // console.error('NLPFunction:', e)
  }

  return ret;
}, []); // cleanStopwords :: String => Language => String


const cleanStopwords = (text, lang) => text // split sentence to an array of words
.split(' ') // Filter all stopwords
.filter(w => !StopwordsIso[lang].includes(w)) // create string again
.join(' ').trim(); // StemmSnowball :: String -> String


const StemmSnowball = text => {
  if (text.length > 5) {
    const stemmer = new Snowball(Language[State.lang]);
    const cleanedText = cleanStopwords(text.toLowerCase().trim(), State.lang);
    stemmer.setCurrent(cleanedText);
    stemmer.stem();
    return stemmer.getCurrent();
  }

  return text.toLowerCase();
}; // const GerStemmer = text => {
//     const cleanedText = cleanStopwords(text.toLowerCase().trim(), State.lang)
//     return GerSnowball(cleanedText)
// }
// Normalize :: String -> String


const Normalize = text => {
  const token = NlpToolkit.tokenizer(text);
  const stemmed = NlpToolkit.stemmer(token, {
    lang: State.lang
  });
  return cleanStopwords(stemmed.join(' ').trim(), State.lang);
}; // Normalize :: (String => String) -> String -> String -> { val: Number, msg: String }


const calcSimilarity = (stemmer, withStr, matchStr) => {
  const s1 = stemmer(matchStr.toLowerCase().trim());
  const s2 = stemmer(withStr.toLowerCase().trim());
  const value = Natural.JaroWinklerDistance(s1, s2);
  return [value, s1];
};

const getMatch = (stemmer, text, sentences) => sentences.map(s => calcSimilarity(stemmer, text, s)).sort(([val_a, s_a], [val_b, s_b]) => val_b - val_a) // .map(log.debug('#'))
.filter(([val, sentence]) => val >= 0.75).map(([value, txt]) => ({
  value,
  txt
})); // getPropability :: String -> FnStruct -> Number


const getPropability = (text, fn) => {
  // const match = getMatch(GerStemmer, text, fn.sentences.de)[0]
  const match = getMatch(StemmSnowball, text, fn.sentences.de)[0];
  return (match && match.value) !== undefined ? match.value : 0;
}; // getMatches :: fn[] -> fn


const getMatches = functions => line => functions.reduce((ret, fn) => ret.concat([{
  propability: getPropability(line, fn),
  // fn: fn.fn,
  sentences: fn.sentences,
  path: fn.path
}]), []).filter(fn => fn.propability > 0).sort((a, b) => b.propability - a.propability); // default :: Path => NlpRequest => Request


module.exports = ({
  path
}) => {
  // Load nlp functions
  log.debug('Path', path);
  State.functions = getNlpFunctions(path);
  log.debug('GetNlpFunctions', State.functions);
  const findModule = getMatches(State.functions);
  log.debug('getMatch', findModule);
  return request => {
    log.debug('request', request);

    if (Request.NLP.is(request)) {
      const sentence = request.payload.sentence;
      const matchTable = findModule(sentence);
      log.debug('MatchTable', matchTable);

      if (matchTable.length > 0) {
        const match = matchTable[0];
        const fnPath = match.path;
        const newRequest = Request({
          path: fnPath,
          payload: {
            sentence
          }
        });
        log.debug('NewRequest', newRequest);
        return newRequest;
      }
    }

    return request;
  };
}; //
// -- Cmdline interface
//
//
// const Readline = require('readline')
// const input = Readline.createInterface(process.stdin, process.stdout)
//
// log.debug('Loading..')
// State.functions = getNlpFunctions('../../modules/functions')
//
// log.debug('Test against:\n')
// State.functions
//     // print sentences
//     .map(f => f.sentences)
//     .map(trace('Function:\n'))
//
// input.setPrompt('\n\n> ')
// input.prompt()
// input
//     .on('line', line => {
//         if (line == 'exit') {
//             input.close()
//         }
//         log.debug('')
//
//         const stemmer = [/*StemmPorter2,*/ StemmSnowball, Normalize]
//         const matchTable = State.functions
//             .reduce(
//                 (ret, fn) =>
//                     ret.concat([
//                         {
//                             propability: getPropability(line, fn),
//                             fn: fn.fn,
//                             sentences: fn.sentences
//                         }
//                     ]),
//                 []
//             )
//             .filter(fn => fn.propability > 0)
//             .sort((a, b) => b.propability - a.propability)
//         log.debug('MatchTable:\n', matchTable)
//
//         if (matchTable.length > 0) {
//             const fn = matchTable[0]
//             fn.fn(line)
//         } else {
//             log.debug('No Match!')
//         }
//         input.prompt()
//     })
//     .on('close', () => {
//         process.exit(0)
//     })
//
},{"../data/request":"data/request.js","../data/response":"data/response.js"}],"index.js":[function(require,module,exports) {
// TODO: Modify node search path for modules
// See:
// https://gist.github.com/branneman/8048520
//global.include = path => require(`${__dirname}/${path}`)
//
// -- Imports --
//
const App = require('./data/app');

const Request = require('./data/request');

const Response = require('./data/response');

const HTTPGateway = require('./gateways/http');

const TelegramGateway = require('./gateways/telegram');

const NLPMiddleware = require('./middleware/nlp');

const Path = require('path'); //
// -- Config --
//


const path = Path.resolve(process.cwd()) + '/functions';
const port = 3000; //
// -- Logic --
//

const loadFunction = (req, path) => {
  const fn = require(path);

  return fn(req.payload);
};

const Router = ({
  path
}) => request => {
  if (Request.is(request)) {
    const fnPath = `${path}${request.path}`;

    try {
      console.log('[Router] Path:', fnPath);
      console.log('[Router] Request:', request);
      return loadFunction(request, fnPath);
    } catch (e) {
      console.log('Load Function: Error: ', e);
      return Response.Error("Can't find " + fnPath);
    }
  }

  return Response.Error('Invalid request: ' + request);
};

const Service = () => App() // Add data sources
.add(HTTPGateway({
  port
})) // Add data manipulation pipeline steps
.use(NLPMiddleware({
  path
})) // Add data processing
.do(Router({
  path
})); //
// -- Exports --
//


module.exports = {
  Service,
  App,
  Router: () => Router({
    path
  }),
  Request,
  Response,
  HTTPGateway,
  TelegramGateway,
  NLPMiddleware
};
},{"./data/app":"data/app.js","./data/request":"data/request.js","./data/response":"data/response.js","./gateways/http":"gateways/http/index.js","./gateways/telegram":"gateways/telegram/index.js","./middleware/nlp":"middleware/nlp.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.map