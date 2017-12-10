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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// need to extract all of the components' repeating methods to base component

var BaseComponent = exports.BaseComponent = function (_HTMLElement) {
    _inherits(BaseComponent, _HTMLElement);

    function BaseComponent() {
        _classCallCheck(this, BaseComponent);

        return _possibleConstructorReturn(this, (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).call(this));
    }

    _createClass(BaseComponent, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            if (!this.shadowRoot) this.initShadowDom();
            this._updateRendering();
        }
    }, {
        key: 'initShadowDom',
        value: function initShadowDom() {
            var shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.innerHTML = this.template;
        }
    }, {
        key: '_updateRendering',
        value: function _updateRendering() {
            this.shadowRoot.innerHTML = this.template;
        }
    }], [{
        key: 'registerComponent',
        value: function registerComponent(name, component) {
            window.customElements.define(name, component);
        }
    }]);

    return BaseComponent;
}(HTMLElement);

exports.default = BaseComponent;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _skinNew = __webpack_require__(2);

var _controlBar = __webpack_require__(3);

var _playButton = __webpack_require__(4);

var _fullScreenButton = __webpack_require__(5);

var _hdButton = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomSkin = function (_BaseSkin) {
    _inherits(CustomSkin, _BaseSkin);

    function CustomSkin(template, player) {
        _classCallCheck(this, CustomSkin);

        _skinNew.BaseSkin.loadDeps([{ tagName: 'control-bar', func: _controlBar.ControlBar }, { tagName: 'play-button', func: _playButton.PlayButton }, { tagName: 'full-screen-button', func: _fullScreenButton.FullScreenButton }, { tagName: 'hd-button', func: _hdButton.HDButton }]);
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BaseSkin = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseComponent = __webpack_require__(0);

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
    }], [{
        key: 'loadDeps',
        value: function loadDeps(deps) {
            deps.forEach(function (dep) {
                _baseComponent.BaseComponent.registerComponent(dep.tagName, dep.func);
            });
        }
    }]);

    return BaseSkin;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ControlBar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseComponent = __webpack_require__(0);

var _baseComponent2 = _interopRequireDefault(_baseComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ControlBar = exports.ControlBar = function (_BaseComponent) {
    _inherits(ControlBar, _BaseComponent);

    function ControlBar() {
        _classCallCheck(this, ControlBar);

        var _this = _possibleConstructorReturn(this, (ControlBar.__proto__ || Object.getPrototypeOf(ControlBar)).call(this));

        _this.tagName = 'control-bar';
        return _this;
    }

    // get tagName(){
    //     return 'control-bar';
    // }

    _createClass(ControlBar, [{
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'location' && this.location !== oldValue) {
                this.location = newValue;
            }
            if (name === 'justify-content') {
                this.style['justifyContent'] = newValue;
            }
        }
    }, {
        key: 'location',
        get: function get() {
            return this.getAttribute('location');
        },
        set: function set(val) {
            this.setAttribute('location', val);
            if (val === 'bottom') {
                this.shadowRoot.appendChild(this.bottomStyling.cloneNode(true));
            }
        }
    }, {
        key: 'bottomStyling',
        get: function get() {
            var bottomStyling = document.createElement('bottomStyling');
            bottomStyling.innerHTML = '\n<style>\n :host {\n       position:absolute;\n       bottom:0;\n    }\n</style>\n  ';
            return bottomStyling;
        }
    }, {
        key: 'template',
        get: function get() {
            var template = document.createElement('template');
            template.innerHTML = '\n             <slot></slot>\n             <style>\n            ' + this.componentStyle + '\n            </style>\n            ';
            return template;
        }
    }, {
        key: 'componentStyle',
        get: function get() {
            return ':host {\n        width: 100%;\n        height: 5%;\n        overflow: hidden;\n        display: flex;\n        flex-direction: row;\n        flex-wrap: nowrap;\n        align-items: center;\n        justify-content: space-evenly;\n        background-color:lightgray;\n        /*display: grid;*/\n        /*grid: repeat(1, 100%) / auto-flow auto;*/\n    }\n    \n   :host > *:not(style){\n        width: auto;\n        height: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    :host > * svg{\n        width: 100%;\n    }';
        }
    }], [{
        key: 'observedAttributes',
        get: function get() {
            return ['location', 'justify-content'];
        }
    }]);

    return ControlBar;
}(_baseComponent2.default);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PlayButton = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseComponent = __webpack_require__(0);

var _baseComponent2 = _interopRequireDefault(_baseComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayButton = exports.PlayButton = function (_BaseComponent) {
    _inherits(PlayButton, _BaseComponent);

    function PlayButton() {
        _classCallCheck(this, PlayButton);

        var _this = _possibleConstructorReturn(this, (PlayButton.__proto__ || Object.getPrototypeOf(PlayButton)).call(this));

        _this.isPlaying = false;
        return _this;
    }

    _createClass(PlayButton, [{
        key: 'attachListeners',
        value: function attachListeners() {
            this.addEventListener('click', this.clickHandler);
            this.parentElement.player.addEventListener(vdb.VIDEO_PLAY, this.handlePlay.bind(this));
            this.parentElement.player.addEventListener(vdb.VIDEO_PAUSE, this.handlePause.bind(this));
        }
    }, {
        key: 'handlePlay',
        value: function handlePlay() {
            this.setAttribute('playing', '');
            this.isPlaying = true;
        }
    }, {
        key: 'handlePause',
        value: function handlePause() {
            this.removeAttribute('playing');
            this.isPlaying = false;
        }
    }, {
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'playing') {
                if (this.hasAttribute("playing")) this.isPlaying = true;else this.isPlaying = false;
                this._updateRendering();
            }
        }
    }, {
        key: 'connectedCallback',
        value: function connectedCallback() {
            if (this.parentElement.player.getPlayerInfo().playerStatus === 'playing') this.isPlaying = true;
        }
    }, {
        key: 'clickHandler',
        value: function clickHandler(e) {
            if (this.hasAttribute('playing')) {
                this.parentElement.player.pause();
            } else {
                this.parentElement.player.play();
            }
        }
    }, {
        key: 'tagName',
        get: function get() {
            return 'play-button';
        }
    }, {
        key: 'template',
        get: function get() {
            return '\n        <div class="play-button-state">\n        ' + (this.isPlaying ? pauseIcon : playIcon) + '\n        </div>\n        <style>\n            ' + this.componentStyle + '\n        </style>\n        ';
        }
    }, {
        key: 'componentStyle',
        get: function get() {
            return ':host{width: auto;\n        height: 100%;\n        display: flex;\n        align-items: flex-start;\n        justify-content: flex-start;\n        padding-left:10px;\n        flex: ' + (this.hasAttribute('flex') ? this.getAttribute('flex') : '1') + ';\n        }\n        \n        :host svg {height:100%;}';
        }
    }], [{
        key: 'observedAttributes',
        get: function get() {
            return ['playing'];
        }
    }]);

    return PlayButton;
}(_baseComponent2.default);

var playIcon = ' <div class="play-icon can-animate">\n <svg width="25" class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 10"><path d="M0,9.5C0,9,0,0.9,0,0.6c0-0.4,0.3-0.7,0.7-0.5c0.3,0.2,5.6,4.1,6.1,4.4c0.3,0.2,0.3,0.7,0,1 C6.4,5.7,1.1,9.7,0.7,9.9C0.4,10.2,0,9.9,0,9.5z"></path></svg>\n </div>';

var pauseIcon = '\n<div class="pause-icon can-animate">\n<svg width="25" class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 10"><rect width="3" height="10"></rect><rect x="6" width="3" height="10"></rect></svg>\n</div>';

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FullScreenButton = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseComponent = __webpack_require__(0);

var _baseComponent2 = _interopRequireDefault(_baseComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FullScreenButton = exports.FullScreenButton = function (_BaseComponent) {
    _inherits(FullScreenButton, _BaseComponent);

    function FullScreenButton() {
        _classCallCheck(this, FullScreenButton);

        var _this = _possibleConstructorReturn(this, (FullScreenButton.__proto__ || Object.getPrototypeOf(FullScreenButton)).call(this));

        _this.registerComponent('full-screen-button');
        _this.attachListeners();
        return _this;
    }

    _createClass(FullScreenButton, [{
        key: 'attachListeners',
        value: function attachListeners() {
            var _this2 = this;

            this.addEventListener('click', function (e) {
                if (_this2.hasAttribute('full-screen')) {
                    _this2.removeAttribute('full-screen');
                } else {
                    _this2.setAttribute('full-screen', '');
                    if (_this2.parentElement.player.adapter.enterFullscreen) {
                        _this2.parentElement.player.adapter.enterFullscreen();
                    }
                }
            });
        }
    }, {
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'full-screen') {
                if (this.hasAttribute("full-screen")) this.isFullScreen = true;else this.isFullScreen = false;
                this._updateRendering();
            }
        }
    }, {
        key: 'template',
        get: function get() {
            return '\n        <div class="fullscreen-cell control-button-cell">\n        <div class="fullscreen-button">\n        ' + (this.isFullScreen ? exitFullScreenSvg : enterFullScreenSvg) + '\n        </div>\n        </div>\n        <style>\n        ' + this.componentStyle + '\n        </style>\n        ';
        }
    }, {
        key: 'componentStyle',
        get: function get() {
            return ':host{width: auto;\n        height: 100%;\n        display: flex;\n        align-items: flex-start;\n        justify-content: center;\n        padding-right:10px;\n        flex: ' + (this.hasAttribute('flex') ? this.getAttribute('flex') : '1') + ';\n        }\n        :host svg {height:100%;}\n        ';
        }
    }], [{
        key: 'observedAttributes',
        get: function get() {
            return ['full-screen'];
        }
    }]);

    return FullScreenButton;
}(_baseComponent2.default);

// window.customElements.define('full-screen-button', FullScreenButton);


var enterFullScreenSvg = '<div class="enter-fullscreen-icon"><svg width="40" class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 16"><path class="st0" d="M3,3h14v10H3V3z M5,11.1H15V4.9H5V11.1z"></path><polygon class="st0" points="19,0 15,0 15,1 19,1 19,5 20,5 20,0.9 20,0 "></polygon><polygon class="st0" points="19,11 19,15 15,15 15,16 19,16 20,16 20,15.1 20,11 "></polygon><polygon class="st0" points="5,0 0.9,0 0,0 0,0.9 0,5 1,5 1,1 5,1 "></polygon><polygon class="st0" points="1,15 1,11 0,11 0,16 0.9,16 5,16 5,15 "></polygon></svg> \n</div>';

var exitFullScreenSvg = '<div class="exit-fullscreen-icon"><svg width="40" class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.6 21.8"><path d="M4.6,0H2.3v2.3H0v2.3h4.6V0z M4.6,17.2H23V4.6H4.6V17.2z M8.1,8h11.4v5.8H8.1V8z M25.3,2.3V0H23v4.6h4.6V2.3 H25.3z M23,21.8h2.3v-2.3h2.3v-2.3H23V21.8z M0,19.5h2.3v2.3h2.3v-4.6H0V19.5z"></path></svg>\n</div>';

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HDButton = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseComponent = __webpack_require__(0);

var _baseComponent2 = _interopRequireDefault(_baseComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HDButton = exports.HDButton = function (_BaseComponent) {
    _inherits(HDButton, _BaseComponent);

    function HDButton() {
        _classCallCheck(this, HDButton);

        return _possibleConstructorReturn(this, (HDButton.__proto__ || Object.getPrototypeOf(HDButton)).call(this));
    }

    _createClass(HDButton, [{
        key: 'tagName',
        get: function get() {
            return 'hd-button';
        }
    }, {
        key: 'template',
        get: function get() {
            return '<div class="hd-button-cell" style=""><div class="hd-button not-hd-video"><svg width="40" class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.4 9.8"><path d="M6.3,9.8V6.1H2.8v3.7H0V0h2.8v3.7h3.5V0h2.7v9.8H6.3z"></path><path d="M15.2,0c3.5,0,5.1,2.1,5.1,4.8s-1.6,5-5.1,5H11V0H15.2z M13.8,7.5h1.5c1.8,0,2.4-1.3,2.4-2.7 s-0.7-2.5-2.4-2.5h-1.5V7.5z"></path></svg> </div></div>\n                 <style>\n                    ' + this.componentStyle + '\n                 </style>';
        }
    }, {
        key: 'componentStyle',
        get: function get() {
            return ':host{width: auto;\n        height: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: center; \n        margin-right:10px;\n        flex: ' + (this.hasAttribute('flex') ? this.getAttribute('flex') : '1') + ';\n        } :host svg { height:100%;}';
        }
    }]);

    return HDButton;
}(_baseComponent2.default);

// window.customElements.define('hd-button', HDButton);

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map