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
      notify('Aufgabe erfolgreich hinzugefügt');
    }
  }, [newTask, currentWeek, notify]);
  var deleteTask = useCallback(function (taskId) {
    setTasks(function (prevTasks) {
      var updatedTasks = _objectSpread({}, prevTasks);
      updatedTasks[currentWeek] = updatedTasks[currentWeek].filter(function (task) {
        return task.id !== taskId;
      });
      return updatedTasks;
    });
    notify('Aufgabe gelöscht');
  }, [currentWeek, notify]);
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
      notify('Unteraufgabe hinzugefügt');
    }
  }, [currentWeek, notify]);
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
    var quotes = ["Der beste Weg, die Zukunft vorherzusagen, ist, sie zu erschaffen.", "Erfolg ist nicht final, Misserfolg ist nicht fatal: Es ist der Mut weiterzumachen, der zählt.", "Die einzige Begrenzung zur Verwirklichung von morgen sind unsere Zweifel von heute.", "Der Weg zum Erfolg ist die Beharrlichkeit des Handelns.", "Glaube an dich selbst und alles ist möglich.", "Jeder Fortschritt beginnt mit der Entscheidung, es zu versuchen.", "Die Zukunft gehört denen, die an die Schönheit ihrer Träume glauben.", "Der einzige Weg, großartige Arbeit zu leisten, ist zu lieben, was man tut.", "Erfolg ist die Summe kleiner Anstrengungen, die täglich wiederholt werden.", "Wer aufhört, besser werden zu wollen, hört auf, gut zu sein."];
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
      key: task.id,
      className: "p-4 rounded shadow ".concat(task.status === 'Erledigt' ? 'bg-green-100' : 'bg-white')
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-lg font-semibold"
    }, task.feature, ": ", task.description), /*#__PURE__*/React.createElement("p", null, "Status: ", task.status), /*#__PURE__*/React.createElement("p", null, "Priorit\xE4t: ", task.priority), /*#__PURE__*/React.createElement("p", null, "F\xE4lligkeitsdatum: ", task.dueDate), /*#__PURE__*/React.createElement("div", {
      className: "mt-2 space-x-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return toggleStatus(task.id);
      },
      className: "bg-blue-500 text-white px-2 py-1 rounded"
    }, "Status umschalten"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return deleteTask(task.id);
      },
      className: "bg-red-500 text-white px-2 py-1 rounded"
    }, "L\xF6schen"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return addSubtask(task.id);
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
        key: subtask.id,
        className: "flex items-center"
      }, /*#__PURE__*/React.createElement("span", {
        className: subtask.status === 'Erledigt' ? 'line-through' : ''
      }, subtask.description), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return toggleSubtaskStatus(task.id, subtask.id);
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
      key: task.id,
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
