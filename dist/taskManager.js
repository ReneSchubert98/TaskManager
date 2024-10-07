"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useCallback = _React.useCallback;

// API-URL
var API_URL = "http://localhost:5001/tasks";

// Utility functions
var getCurrentWeek = function getCurrentWeek() {
  var now = new Date();
  var onejan = new Date(now.getFullYear(), 0, 1);
  return Math.ceil(((now - onejan) / 86400000 + onejan.getDay() + 1) / 7);
};
var calculateProgress = function calculateProgress(tasks, currentWeek) {
  if (!tasks[currentWeek]) return 0;
  var totalItems = tasks[currentWeek].reduce(function (acc, task) {
    return acc + 1 + (task.subtasks ? task.subtasks.length : 0);
  }, 0);
  var completedItems = tasks[currentWeek].reduce(function (acc, task) {
    var completedSubtasks = task.subtasks ? task.subtasks.filter(function (st) {
      return st.status === 'Erledigt';
    }).length : 0;
    return acc + (task.status === 'Erledigt' ? 1 : 0) + completedSubtasks;
  }, 0);
  return totalItems > 0 ? completedItems / totalItems * 100 : 0;
};

// Custom hooks
var useLocalStorage = function useLocalStorage(key, initialValue) {
  var _useState = useState(function () {
      try {
        var item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    }),
    _useState2 = _slicedToArray(_useState, 2),
    storedValue = _useState2[0],
    setStoredValue = _useState2[1];
  var setValue = function setValue(value) {
    try {
      var valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};
var useNotification = function useNotification() {
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showNotification = _useState4[0],
    setShowNotification = _useState4[1];
  var _useState5 = useState(''),
    _useState6 = _slicedToArray(_useState5, 2),
    notificationMessage = _useState6[0],
    setNotificationMessage = _useState6[1];
  var notify = useCallback(function (message) {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(function () {
      return setShowNotification(false);
    }, 3000);
  }, []);
  return {
    showNotification: showNotification,
    notificationMessage: notificationMessage,
    notify: notify
  };
};
var getOpenTasksFromPreviousWeeks = function getOpenTasksFromPreviousWeeks(tasks, currentWeek) {
  var openTasks = [];
  var _loop = function _loop(week) {
    if (parseInt(week) < currentWeek) {
      tasks[week].forEach(function (task) {
        if (task.status === 'Offen') {
          openTasks.push(_objectSpread(_objectSpread({}, task), {}, {
            week: parseInt(week)
          }));
        }
      });
    }
  };
  for (var week in tasks) {
    _loop(week);
  }
  return openTasks;
};

// Main component
function TaskManager() {
  var _useLocalStorage = useLocalStorage('tasks', {}),
    _useLocalStorage2 = _slicedToArray(_useLocalStorage, 2),
    tasks = _useLocalStorage2[0],
    setTasks = _useLocalStorage2[1];
  var _useState7 = useState(getCurrentWeek()),
    _useState8 = _slicedToArray(_useState7, 2),
    currentWeek = _useState8[0],
    setCurrentWeek = _useState8[1];
  var _useState9 = useState({
      feature: '',
      description: '',
      priority: 'Niedrig',
      dueDate: ''
    }),
    _useState10 = _slicedToArray(_useState9, 2),
    newTask = _useState10[0],
    setNewTask = _useState10[1];
  var _useState11 = useState(''),
    _useState12 = _slicedToArray(_useState11, 2),
    quote = _useState12[0],
    setQuote = _useState12[1];
  var _useState13 = useState(''),
    _useState14 = _slicedToArray(_useState13, 2),
    searchTerm = _useState14[0],
    setSearchTerm = _useState14[1];
  var _useNotification = useNotification(),
    showNotification = _useNotification.showNotification,
    notificationMessage = _useNotification.notificationMessage,
    notify = _useNotification.notify;
  useEffect(function () {
    function fetchTasks() {
      return _fetchTasks.apply(this, arguments);
    }
    function _fetchTasks() {
      _fetchTasks = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var response, data;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch(API_URL);
            case 2:
              response = _context.sent;
              if (!response.ok) {
                _context.next = 10;
                break;
              }
              _context.next = 6;
              return response.json();
            case 6:
              data = _context.sent;
              setTasks(function (prevTasks) {
                return _objectSpread(_objectSpread({}, prevTasks), {}, _defineProperty({}, currentWeek, data));
              });
              _context.next = 11;
              break;
            case 10:
              console.error('Fehler beim Abrufen der Aufgaben:', response.statusText);
            case 11:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return _fetchTasks.apply(this, arguments);
    }
    fetchTasks();
    updateQuote();
  }, [currentWeek]);
  var addTask = useCallback(/*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
      var response, task;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            e.preventDefault();
            if (!(newTask.feature && newTask.description)) {
              _context2.next = 18;
              break;
            }
            _context2.next = 4;
            return fetch(API_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newTask)
            });
          case 4:
            response = _context2.sent;
            if (!response.ok) {
              _context2.next = 13;
              break;
            }
            _context2.next = 8;
            return response.json();
          case 8:
            task = _context2.sent;
            setTasks(function (prevTasks) {
              var updatedTasks = _objectSpread({}, prevTasks);
              if (!updatedTasks[currentWeek]) {
                updatedTasks[currentWeek] = [];
              }
              updatedTasks[currentWeek].push(task);
              return updatedTasks;
            });
            notify('Aufgabe erfolgreich hinzugefügt');
            _context2.next = 18;
            break;
          case 13:
            _context2.t0 = console;
            _context2.next = 16;
            return response.text();
          case 16:
            _context2.t1 = _context2.sent;
            _context2.t0.error.call(_context2.t0, 'Fehler beim Hinzufügen der Aufgabe:', _context2.t1);
          case 18:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), [newTask, currentWeek, notify]);
  var deleteTask = useCallback(/*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(taskId) {
      var response;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return fetch("".concat(API_URL, "/").concat(taskId), {
              method: 'DELETE'
            });
          case 2:
            response = _context3.sent;
            if (!response.ok) {
              _context3.next = 8;
              break;
            }
            setTasks(function (prevTasks) {
              var updatedTasks = _objectSpread({}, prevTasks);
              updatedTasks[currentWeek] = updatedTasks[currentWeek].filter(function (task) {
                return task._id !== taskId;
              });
              return updatedTasks;
            });
            notify('Aufgabe gelöscht');
            _context3.next = 13;
            break;
          case 8:
            _context3.t0 = console;
            _context3.next = 11;
            return response.text();
          case 11:
            _context3.t1 = _context3.sent;
            _context3.t0.error.call(_context3.t0, 'Fehler beim Löschen der Aufgabe:', _context3.t1);
          case 13:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }(), [currentWeek, notify]);
  var toggleStatus = useCallback(/*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(taskId) {
      var response, updatedTask;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return fetch("".concat(API_URL, "/").concat(taskId, "/toggle"), {
              method: 'PATCH'
            });
          case 2:
            response = _context4.sent;
            if (!response.ok) {
              _context4.next = 10;
              break;
            }
            _context4.next = 6;
            return response.json();
          case 6:
            updatedTask = _context4.sent;
            setTasks(function (prevTasks) {
              var updatedTasks = _objectSpread({}, prevTasks);
              var taskIndex = updatedTasks[currentWeek].findIndex(function (task) {
                return task._id === taskId;
              });
              if (taskIndex !== -1) {
                updatedTasks[currentWeek][taskIndex] = updatedTask;
              }
              return updatedTasks;
            });
            _context4.next = 15;
            break;
          case 10:
            _context4.t0 = console;
            _context4.next = 13;
            return response.text();
          case 13:
            _context4.t1 = _context4.sent;
            _context4.t0.error.call(_context4.t0, 'Fehler beim Umschalten des Status:', _context4.t1);
          case 15:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }(), [currentWeek]);
  var addSubtask = useCallback(/*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(taskId) {
      var subtaskDescription, response, updatedTask;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            subtaskDescription = prompt("Beschreibung der Unteraufgabe:");
            if (!subtaskDescription) {
              _context5.next = 18;
              break;
            }
            _context5.next = 4;
            return fetch("".concat(API_URL, "/").concat(taskId, "/subtasks"), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                description: subtaskDescription
              })
            });
          case 4:
            response = _context5.sent;
            if (!response.ok) {
              _context5.next = 13;
              break;
            }
            _context5.next = 8;
            return response.json();
          case 8:
            updatedTask = _context5.sent;
            setTasks(function (prevTasks) {
              var updatedTasks = _objectSpread({}, prevTasks);
              var taskIndex = updatedTasks[currentWeek].findIndex(function (task) {
                return task._id === taskId;
              });
              if (taskIndex !== -1) {
                updatedTasks[currentWeek][taskIndex] = updatedTask;
              }
              return updatedTasks;
            });
            notify('Unteraufgabe hinzugefügt');
            _context5.next = 18;
            break;
          case 13:
            _context5.t0 = console;
            _context5.next = 16;
            return response.text();
          case 16:
            _context5.t1 = _context5.sent;
            _context5.t0.error.call(_context5.t0, 'Fehler beim Hinzufügen der Unteraufgabe:', _context5.t1);
          case 18:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }(), [currentWeek, notify]);
  var toggleSubtaskStatus = useCallback(/*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(taskId, subtaskId) {
      var response, updatedTask, errorMessage;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            if (subtaskId) {
              _context6.next = 3;
              break;
            }
            console.error('Subtask ID ist undefined');
            return _context6.abrupt("return");
          case 3:
            _context6.next = 5;
            return fetch("".concat(API_URL, "/").concat(taskId, "/subtasks/").concat(subtaskId, "/toggle"), {
              method: 'PATCH'
            });
          case 5:
            response = _context6.sent;
            if (!response.ok) {
              _context6.next = 13;
              break;
            }
            _context6.next = 9;
            return response.json();
          case 9:
            updatedTask = _context6.sent;
            setTasks(function (prevTasks) {
              var updatedTasks = _objectSpread({}, prevTasks);
              var taskIndex = updatedTasks[currentWeek].findIndex(function (task) {
                return task._id === taskId;
              });
              if (taskIndex !== -1) {
                updatedTasks[currentWeek][taskIndex] = updatedTask;
              }
              return updatedTasks;
            });
            _context6.next = 17;
            break;
          case 13:
            _context6.next = 15;
            return response.text();
          case 15:
            errorMessage = _context6.sent;
            // Hole die Fehlermeldung
            console.error('Fehler beim Umschalten des Status der Unteraufgabe:', errorMessage);
          case 17:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    return function (_x5, _x6) {
      return _ref5.apply(this, arguments);
    };
  }(), [currentWeek]);
  var updateQuote = useCallback(function () {
    var quotes = ["Der beste Weg, die Zukunft vorherzusagen, ist, sie zu erschaffen.", "Erfolg ist nicht final, Misserfolg ist nicht fatal: Es ist der Mut weiterzumachen, der zählt.", "Die einzige Begrenzung zur Verwirklichung von morgen sind unsere Zweifel von heute.", "Der Weg zum Erfolg ist die Beharrlichkeit des Handelns.", "Glaube an dich selbst und alles ist möglich.", "Jeder Fortschritt beginnt mit der Entscheidung, es zu versuchen.", "Die Zukunft gehört denen, die an die Schönheit ihrer Träume glauben.", "Der einzige Weg, großartige Arbeit zu leisten, ist zu lieben, was man tut.", "Erfolg ist die Summe kleiner Anstrengungen, die täglich wiederholt werden.", "Wer aufhört, besser werden zu wollen, hört auf, gut zu sein."];
    setQuote(quotes[currentWeek % quotes.length]);
  }, [currentWeek]);
  var filteredTasks = tasks[currentWeek] ? tasks[currentWeek].filter(function (task) {
    return task.feature && task.feature.toLowerCase().includes(searchTerm.toLowerCase()) || task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase());
  }) : [];
  return /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto p-4"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl font-bold mb-4"
  }, "ReDIX Task Manager"), /*#__PURE__*/React.createElement("div", {
    className: "mb-4 flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setCurrentWeek(function (prev) {
        return prev - 1;
      });
    },
    className: "bg-blue-500 text-white px-4 py-2 rounded"
  }, "Vorherige Woche"), /*#__PURE__*/React.createElement("h2", {
    className: "text-xl font-semibold"
  }, "Kalenderwoche ", currentWeek), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setCurrentWeek(function (prev) {
        return prev + 1;
      });
    },
    className: "bg-blue-500 text-white px-4 py-2 rounded"
  }, "N\xE4chste Woche")), /*#__PURE__*/React.createElement("div", {
    className: "mb-4 p-4 bg-white rounded shadow"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-semibold mb-2"
  }, "Neue Aufgabe"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Feature-Nummer",
    value: newTask.feature,
    onChange: function onChange(e) {
      return setNewTask(_objectSpread(_objectSpread({}, newTask), {}, {
        feature: e.target.value
      }));
    },
    className: "w-full p-2 mb-2 border rounded"
  }), /*#__PURE__*/React.createElement("textarea", {
    placeholder: "Beschreibung",
    value: newTask.description,
    onChange: function onChange(e) {
      return setNewTask(_objectSpread(_objectSpread({}, newTask), {}, {
        description: e.target.value
      }));
    },
    className: "w-full p-2 mb-2 border rounded"
  }), /*#__PURE__*/React.createElement("select", {
    value: newTask.priority,
    onChange: function onChange(e) {
      return setNewTask(_objectSpread(_objectSpread({}, newTask), {}, {
        priority: e.target.value
      }));
    },
    className: "w-full p-2 mb-2 border rounded"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Niedrig"
  }, "Niedrig"), /*#__PURE__*/React.createElement("option", {
    value: "Mittel"
  }, "Mittel"), /*#__PURE__*/React.createElement("option", {
    value: "Hoch"
  }, "Hoch")), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: newTask.dueDate,
    onChange: function onChange(e) {
      return setNewTask(_objectSpread(_objectSpread({}, newTask), {}, {
        dueDate: e.target.value
      }));
    },
    className: "w-full p-2 mb-2 border rounded"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: addTask,
    className: "w-full bg-green-500 text-white px-4 py-2 rounded"
  }, "Aufgabe hinzuf\xFCgen")), /*#__PURE__*/React.createElement("div", {
    className: "mb-4 p-4 bg-white rounded shadow"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-semibold mb-2"
  }, "Fortschritt"), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-gray-200 rounded"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded",
    style: {
      width: "".concat(calculateProgress(tasks, currentWeek), "%")
    }
  }, calculateProgress(tasks, currentWeek).toFixed(1), "%"))), /*#__PURE__*/React.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Suche nach Aufgaben...",
    value: searchTerm,
    onChange: function onChange(e) {
      return setSearchTerm(e.target.value);
    },
    className: "w-full p-2 border rounded"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, filteredTasks.map(function (task) {
    return /*#__PURE__*/React.createElement("div", {
      key: task._id,
      className: "p-4 rounded shadow ".concat(task.status === 'Erledigt' ? 'bg-green-100' : 'bg-white')
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-lg font-semibold"
    }, task.feature, ": ", task.description), /*#__PURE__*/React.createElement("p", null, "Status: ", task.status), /*#__PURE__*/React.createElement("p", null, "Priorit\xE4t: ", task.priority), /*#__PURE__*/React.createElement("p", null, "F\xE4lligkeitsdatum: ", task.dueDate), /*#__PURE__*/React.createElement("div", {
      className: "mt-2 space-x-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return toggleStatus(task._id);
      },
      className: "bg-blue-500 text-white px-2 py-1 rounded"
    }, "Status umschalten"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return deleteTask(task._id);
      },
      className: "bg-red-500 text-white px-2 py-1 rounded"
    }, "L\xF6schen"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return addSubtask(task._id);
      },
      className: "bg-purple-500 text-white px-2 py-1 rounded"
    }, "Unteraufgabe hinzuf\xFCgen")), task.subtasks.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "mt-2"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "font-semibold"
    }, "Unteraufgaben:"), /*#__PURE__*/React.createElement("ul", {
      className: "list-disc list-inside"
    }, task.subtasks.map(function (subtask) {
      return /*#__PURE__*/React.createElement("li", {
        key: subtask._id,
        className: "flex items-center"
      }, /*#__PURE__*/React.createElement("span", {
        className: subtask.status === 'Erledigt' ? 'line-through' : ''
      }, subtask.description), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return toggleSubtaskStatus(task._id, subtask._id);
        },
        className: "ml-2 bg-gray-300 text-gray-800 px-2 py-1 rounded text-sm"
      }, subtask.status === 'Erledigt' ? 'Wiedereröffnen' : 'Erledigt'));
    }))));
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-8 p-4 bg-white rounded shadow"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-semibold mb-2"
  }, "Offene Aufgaben aus vorherigen Wochen"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, getOpenTasksFromPreviousWeeks(tasks, currentWeek).map(function (task) {
    return /*#__PURE__*/React.createElement("div", {
      key: task._id,
      className: "p-2 bg-yellow-100 rounded"
    }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Woche ", task.week, ":"), " ", task.feature, " - ", task.description));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 p-4 bg-gray-100 rounded"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-center italic"
  }, quote)), showNotification && /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg"
  }, notificationMessage));
}
ReactDOM.render(/*#__PURE__*/React.createElement(TaskManager, null), document.getElementById('root'));
