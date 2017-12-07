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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseSkin = function () {
    function BaseSkin() {
        _classCallCheck(this, BaseSkin);

        this.videoContainer = vdb.getContext(Object.keys(vdb._getContexts())[0]).getPlayer().div;
    }

    _createClass(BaseSkin, [{
        key: "addToMainContainer",
        value: function addToMainContainer(el) {
            this.videoContainer.appendChild(el);
        }
    }, {
        key: "addToContainer",
        value: function addToContainer(container, el) {
            this.videoContainer.getElementsByClassName(container)[0].appendChild(el);
        }
    }, {
        key: "setTemplate",
        value: function setTemplate(template) {
            this.template = template;
        }
    }, {
        key: "render",
        value: function render() {
            var _this = this;

            this.template.childNodes.forEach(function (child) {
                _this.addToContainer('control-bar-wrapper', child);
            });
        }
    }]);

    return BaseSkin;
}();

var mySkin = new BaseSkin();

mySkin.controlBarWrapper = document.createElement("div");
mySkin.controlBarWrapper.classList.add("control-bar-wrapper");
mySkin.addToMainContainer(mySkin.controlBarWrapper);

var customSkin = "\n<full-screen-button></full-screen-button>\n<full-screen-button></full-screen-button>\n<full-screen-button></full-screen-button>\n";

mySkin.setTemplate(customSkin);

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map