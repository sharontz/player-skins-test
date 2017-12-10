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


var _skinNew = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomSkin = function (_BaseSkin) {
    _inherits(CustomSkin, _BaseSkin);

    function CustomSkin(template, player) {
        _classCallCheck(this, CustomSkin);

        return _possibleConstructorReturn(this, (CustomSkin.__proto__ || Object.getPrototypeOf(CustomSkin)).call(this, template, player));
    }

    return CustomSkin;
}(_skinNew.BaseSkin);

var html = "\n    <control-bar location=\"bottom\" justify-content=\"flex-end\" style=\"height:40px;\">\n        <play-button flex=\"15\"></play-button>\n        <hd-button flex=\"1\"></hd-button>\n        <full-screen-button flex=\"1\"></full-screen-button>\n    </control-bar>\n";

function loadSkin(player) {
    var mySkin = new CustomSkin(html, player);
    mySkin.render();
}

window.loadSkin = loadSkin;

loadSkin();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseSkin = exports.BaseSkin = function () {
    function BaseSkin(template, player) {
        _classCallCheck(this, BaseSkin);

        this.setTemplate(template);
        if (!player) {
            this.player = vdb.getContext(Object.keys(vdb._getContexts())[0]).getPlayer();
            this.videoContainer = this.player.div;
        } else {
            this.player = player;
            this.videoContainer = player.div;
        }
    }

    _createClass(BaseSkin, [{
        key: 'addToMainContainer',
        value: function addToMainContainer(el) {
            el.player = this.player;
            this.videoContainer.appendChild(el);
        }
    }, {
        key: 'addToContainer',
        value: function addToContainer(container, el) {
            this.videoContainer.getElementsByClassName(container)[0].appendChild(el);
        }
    }, {
        key: 'setTemplate',
        value: function setTemplate(template) {
            if (typeof template === 'string') {
                this.template = document.createElement('custom-skin');
                this.template.innerHTML = template;
            } else {
                this.template = template;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            [].concat(_toConsumableArray(this.template.children)).forEach(function (child) {
                child.player = _this.player;
                _this.addToMainContainer(child);
            });
        }
    }]);

    return BaseSkin;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map