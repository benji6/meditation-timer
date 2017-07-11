/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lol__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__lol__);


var isRunning = false
var controls = document.querySelector('.js-controls')
var display = document.querySelector('.js-display')
var startButton = document.querySelector('.js-start-button')
var stopButton = document.querySelector('.js-stop-button')
var timeOutputEl = document.querySelector('.js-time-output')
var timeInput = document.querySelector('.js-time-input')

startButton.onclick = function () {
  var duration = Number(timeInput.value) * 1000 * 60
  var t0 = Date.now()
  var displayTime
  display.style.display = 'block'
  controls.style.display = 'none'
  isRunning = true

  requestAnimationFrame(function renderLoop () {
    if (!isRunning) return
    requestAnimationFrame(renderLoop)
    var newDisplayTime = Math.round((duration + t0 - Date.now()) / 1000)
    if (newDisplayTime === displayTime) return
    if (newDisplayTime === 0) isRunning = false
    displayTime = newDisplayTime
    timeOutputEl.innerText =
      ('0' + Math.floor(displayTime / 60)).slice(-2)
      + ':'
      + ('0' + displayTime % 60).slice(-2)
  })
}

stopButton.onclick = function () {
  isRunning = false
  display.style.display = 'none'
  controls.style.display = 'block'
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

console.log('lol')


/***/ })
/******/ ]);