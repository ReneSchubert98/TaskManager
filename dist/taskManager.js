"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useCallback = _React.useCallback;

// Utility functions
var getCurrentWeek = function getCurrentWeek() {
  var now = new Date();
  var onejan = new Date(now.getFullYear(), 0, 1);
  return Math.ceil(((now - onejan) / 86400000 + onejan.getDay() + 1) / 7);
};
var calculateProgress = function calculateProgress(tasks, currentWeek) {
  if (!tasks[currentWeek]) return 0;
  var totalItems = tasks[currentWeek].reduce(function (acc, task) {
    return acc + 1 + task.subtasks.length;
  }, 0);
  var completedItems = tasks[currentWeek].reduce(function (acc, task) {
    var completedSubtasks = task.subtasks.filter(function (st) {
      return st.status === 'Erledigt';
    }).length;
    return acc + (task.status === 'Erledigt' ? 1 : 0) + completedSubtasks;
  }, 0);
  return totalItems > 0 ? completedItems / totalItems * 100 : 0;
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
  var _useState = useState({}),
    _useState2 = _slicedToArray(_useState, 2),
    tasks = _useState2[0],
    setTasks = _useState2[1];
  var _useState3 = useState(getCurrentWeek()),
    _useState4 = _slicedToArray(_useState3, 2),
    currentWeek = _useState4[0],
    setCurrentWeek = _useState4[1];
  var _useState5 = useState({
      feature: '',
      description: '',
      priority: 'Niedrig',
      dueDate: ''
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    newTask = _useState6[0],
    setNewTask = _useState6[1];
  var _useState7 = useState(''),
    _useState8 = _slicedToArray(_useState7, 2),
    quote = _useState8[0],
    setQuote = _useState8[1];
  var _useState9 = useState(''),
    _useState10 = _slicedToArray(_useState9, 2),
    searchTerm = _useState10[0],
    setSearchTerm = _useState10[1];
  useEffect(function () {
    updateQuote();
  }, [currentWeek]);
  var addTask = useCallback(function () {
    if (newTask.feature && newTask.description) {
      setTasks(function (prevTasks) {
        var updatedTasks = _objectSpread({}, prevTasks);
        if (!updatedTasks[currentWeek]) {
          updatedTasks[currentWeek] = [];
        }
        updatedTasks[currentWeek].push(_objectSpread(_objectSpread({}, newTask), {}, {
          id: Date.now(),
          status: 'Offen',
          subtasks: []
        }));
        return updatedTasks;
      });
      setNewTask({
        feature: '',
        description: '',
        priority: 'Niedrig',
        dueDate: ''
      });
    }
  }, [newTask, currentWeek]);
  var deleteTask = useCallback(function (taskId) {
    setTasks(function (prevTasks) {
      var updatedTasks = _objectSpread({}, prevTasks);
      updatedTasks[currentWeek] = updatedTasks[currentWeek].filter(function (task) {
        return task.id !== taskId;
      });
      return updatedTasks;
    });
  }, [currentWeek]);
  var toggleStatus = useCallback(function (taskId) {
    setTasks(function (prevTasks) {
      var updatedTasks = _objectSpread({}, prevTasks);
      var taskIndex = updatedTasks[currentWeek].findIndex(function (task) {
        return task.id === taskId;
      });
      if (taskIndex !== -1) {
        var task = updatedTasks[currentWeek][taskIndex];
        task.status = task.status === 'Offen' ? 'Erledigt' : 'Offen';
        if (task.status === 'Erledigt') {
          task.subtasks.forEach(function (subtask) {
            return subtask.status = 'Erledigt';
          });
        }
      }
      return updatedTasks;
    });
  }, [currentWeek]);
  var addSubtask = useCallback(function (taskId) {
    var subtaskDescription = prompt("Beschreibung der Unteraufgabe:");
    if (subtaskDescription) {
      setTasks(function (prevTasks) {
        var updatedTasks = _objectSpread({}, prevTasks);
        var taskIndex = updatedTasks[currentWeek].findIndex(function (task) {
          return task.id === taskId;
        });
        if (taskIndex !== -1) {
          updatedTasks[currentWeek][taskIndex].subtasks.push({
            id: Date.now(),
            description: subtaskDescription,
            status: 'Offen'
          });
        }
        return updatedTasks;
      });
    }
  }, [currentWeek]);
  var toggleSubtaskStatus = useCallback(function (taskId, subtaskId) {
    setTasks(function (prevTasks) {
      var updatedTasks = _objectSpread({}, prevTasks);
      var taskIndex = updatedTasks[currentWeek].findIndex(function (task) {
        return task.id === taskId;
      });
      if (taskIndex !== -1) {
        var subtaskIndex = updatedTasks[currentWeek][taskIndex].subtasks.findIndex(function (subtask) {
          return subtask.id === subtaskId;
        });
        if (subtaskIndex !== -1) {
          var subtask = updatedTasks[currentWeek][taskIndex].subtasks[subtaskIndex];
          subtask.status = subtask.status === 'Offen' ? 'Erledigt' : 'Offen';
          var allSubtasksCompleted = updatedTasks[currentWeek][taskIndex].subtasks.every(function (st) {
            return st.status === 'Erledigt';
          });
          updatedTasks[currentWeek][taskIndex].status = allSubtasksCompleted ? 'Erledigt' : 'Offen';
        }
      }
      return updatedTasks;
    });
  }, [currentWeek]);
  var updateQuote = useCallback(function () {
    var quotes = ["Der beste Weg, die Zukunft vorherzusagen, ist, sie zu erschaffen.", "Erfolg ist nicht final, Misserfolg ist nicht fatal: Es ist der Mut weiterzumachen, der zählt.", "Die einzige Begrenzung zur Verwirklichung von morgen sind unsere Zweifel von heute.", "Der Weg zum Erfolg ist die Beharrlichkeit des Handelns.", "Glaube an dich selbst und alles ist möglich."];
    setQuote(quotes[currentWeek % quotes.length]);
  }, [currentWeek]);
  var filteredTasks = tasks[currentWeek] ? tasks[currentWeek].filter(function (task) {
    return task.feature.toLowerCase().includes(searchTerm.toLowerCase()) || task.description.toLowerCase().includes(searchTerm.toLowerCase());
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
  }, "Vorherige Woche"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setCurrentWeek(function (prev) {
        return prev + 1;
      });
    },
    className: "bg-blue-500 text-white px-4 py-2 rounded"
  }, "N\xE4chste Woche")));
}
ReactDOM.render(/*#__PURE__*/React.createElement(TaskManager, null), document.getElementById('root'));
