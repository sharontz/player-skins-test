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

function _CustomElement() {
    return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
}

;
Object.setPrototypeOf(_CustomElement.prototype, HTMLElement.prototype);
Object.setPrototypeOf(_CustomElement, HTMLElement);

// need to extract all of the components' repeating methods to base component

var BaseComponent = exports.BaseComponent = function (_CustomElement2) {
    _inherits(BaseComponent, _CustomElement2);

    function BaseComponent() {
        _classCallCheck(this, BaseComponent);

        var _this = _possibleConstructorReturn(this, (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).call(this));

        if (!_this.shadowRoot) _this.initShadowDom();
        return _this;
    }

    _createClass(BaseComponent, [{
        key: 'initShadowDom',
        value: function initShadowDom() {
            this.attachShadow({ mode: 'open' });
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
}(_CustomElement);

exports.default = BaseComponent;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _baseSkin = __webpack_require__(2);

var _controlBar = __webpack_require__(3);

var _playButton = __webpack_require__(4);

var _fullScreenButton = __webpack_require__(5);

var _hdButton = __webpack_require__(6);

var _volumeSliderHorizontal = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomSkin = function (_BaseSkin) {
    _inherits(CustomSkin, _BaseSkin);

    function CustomSkin(template, player) {
        _classCallCheck(this, CustomSkin);

        _baseSkin.BaseSkin.loadDeps(deps);
        return _possibleConstructorReturn(this, (CustomSkin.__proto__ || Object.getPrototypeOf(CustomSkin)).call(this, template, player));
    }

    return CustomSkin;
}(_baseSkin.BaseSkin);

var deps = [{ tagName: 'control-bar', func: _controlBar.ControlBar }, { tagName: 'play-button', func: _playButton.PlayButton }, { tagName: 'full-screen-button', func: _fullScreenButton.FullScreenButton }, { tagName: 'hd-button', func: _hdButton.HDButton }, { tagName: 'volume-slider', func: _volumeSliderHorizontal.VolumeSliderHorizontal }];

var html = "\n    <control-bar location=\"top\" justify-content=\"flex-end\" style=\"height:40px;\">\n        <play-button flex=\"15\"></play-button>\n        <volume-slider flex=\"3\"></volume-slider>\n        <hd-button flex=\"1\"></hd-button>\n        <full-screen-button flex=\"1\"></full-screen-button>\n    </control-bar>\n";

function loadSkin(player) {
    var mySkin = new CustomSkin(html, player);
    mySkin.render();
}

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
        _baseComponent.BaseComponent.prototype.player = this.player;
    }

    _createClass(BaseSkin, [{
        key: 'addToMainContainer',
        value: function addToMainContainer(el) {
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
                _this.addToMainContainer(child);
            });
        }
    }, {
        key: 'getPlayer',
        value: function getPlayer() {
            return this.player;
        }
    }], [{
        key: 'loadDeps',
        value: function loadDeps(deps) {
            this.deps = deps;
            this.deps.forEach(function (dep) {
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

        return _possibleConstructorReturn(this, (ControlBar.__proto__ || Object.getPrototypeOf(ControlBar)).call(this));
    }

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
        key: 'tagName',
        get: function get() {
            return 'control-bar';
        }
    }, {
        key: 'location',
        get: function get() {
            return this.getAttribute('location');
        },
        set: function set(val) {
            this.setAttribute('location', val);
            this._updateRendering();
        }
    }, {
        key: 'template',
        get: function get() {
            return '\n             <slot></slot>\n             <style>\n            ' + this.componentStyle + '\n            </style>\n            ';
        }
    }, {
        key: 'componentStyle',
        get: function get() {
            return ':host {\n        width: 100%;\n        height: 5%;\n        overflow: hidden;\n        display: flex;\n        flex-direction: row;\n        flex-wrap: nowrap;\n        align-items: center;\n        justify-content: space-evenly;\n        background-color:lightgray;\n        position:absolute;\n        ' + this.dynamicPosition + '\n    }\n    \n   :host > *:not(style){\n        width: auto;\n        height: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    :host > * svg{\n        width: 100%;\n    }';
        }
    }, {
        key: 'dynamicPosition',
        get: function get() {
            switch (this.location) {
                case 'bottom':
                    return ' \n                 bottom:0;';
                    break;
                case 'top':
                    return 'top:0;';
                    break;
                default:
                    return '';
            }
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
        _this.addEventListener('click', _this.clickHandler);
        return _this;
    }

    _createClass(PlayButton, [{
        key: 'attachListeners',
        value: function attachListeners() {
            this.player.addEventListener(vdb.constants.PlayerEvent.VIDEO_PLAY, this.handlePlay.bind(this));
            this.player.addEventListener(vdb.constants.PlayerEvent.VIDEO_PAUSE, this.handlePause.bind(this));
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
            if (this.player) this.attachListeners();
            if (this.player.getPlayerInfo().playerStatus === 'playing') this.isPlaying = true;
            this._updateRendering();
        }
    }, {
        key: 'clickHandler',
        value: function clickHandler(e) {
            if (this.hasAttribute('playing')) {
                this.player.pause();
            } else {
                this.player.play();
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

        _this.attachListeners();
        return _this;
    }

    _createClass(FullScreenButton, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            this._updateRendering();
        }
    }, {
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
        key: 'connectedCallback',
        value: function connectedCallback() {
            this._updateRendering();
        }
    }, {
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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VolumeSliderHorizontal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseComponent = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*var VolumeSliderHorizontal = document.registerElement('volume-slider', {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   prototype: Object.create(HTMLElement.prototype, {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       createdCallback: {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           value: function () {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       init: {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           value: function (controller, parent, options, addEffect) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               this.controller = controller;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               this.player = controller.getPlayer();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               this.parent = parent;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               this.options = options || {};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               this.addEffect = !!addEffect;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               buildControls.call(this);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               attachPlayerEvents.call(this);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               attachSkinEvents.call(this);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       setLeftBorderWidth: {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           value: function() {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               if (isDesktop) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   this.volumeSliderLeftBorderWidth = parseInt(getComputedStyle(this.volumeSlider).borderLeftWidth);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   }),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               var common = vdb.utils.Common;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               var utl = vdb.Utils;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               var isDesktop = !!utl.desktopOs();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               var ec = vdb.events.EventContext;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               var PlayerEvent = vdb.constants.PlayerEvent;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               var UserInteraction = vdb.enums.UserInteraction;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               var buildControls = function() {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   this.volumeCell = utl.createElement("div", {"class":["volume-cell", "control-button-cell"]}, this.parent);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   this.volumeButton = utl.createElement("div", {"class":["volume-button", "skin-control"]}, this.volumeCell, this.options.buttonIcon);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   if (isDesktop) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       this.volumeSliderContainer = utl.createElement("div", {"class":"volume-slider-container"}, this.volumeCell);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       this.volumeSlider = utl.createElement("div", {"class":"volume-slider"}, this.volumeSliderContainer);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       this.volumeBackground = utl.createElement("div", {"class":"volume-background"}, this.volumeSlider);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       this.volumeLevel = utl.createElement("div", {"class":"volume-level"}, this.volumeSlider);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       this.volumeSliderThumb = utl.createElement("div", {"class":["volume-slider-thumb", "skin-control"]}, this.volumeLevel);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       if (this.addEffect) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           this.volumeSliderEffect = utl.createElement("div", {"class":"volume-slider-effect"}, this.volumeCell);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           this.progressBarEffect = utl.createElement("div", {"class":"progress-bar-effect"}, this.volumeSliderEffect);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           this.bottomBorder = utl.createElement("div", {"class":"bottom-volume-border"}, this.volumeSliderEffect);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           this.rightBorder = utl.createElement("div", {"class":"right-volume-border"}, this.volumeSliderEffect);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           this.topBorder = utl.createElement("div", {"class":"top-volume-border"}, this.volumeSliderEffect);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           this.leftBorder = utl.createElement("div", {"class":"left-volume-border"}, this.volumeSliderEffect);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   onVolumeChange.call(this);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               };
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               var attachPlayerEvents = function() {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   this.player.addEventListener(PlayerEvent.AD_VOLUME_CHANGED, onVolumeChange.bind(this));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   this.player.addEventListener(PlayerEvent.VIDEO_VOLUME_CHANGED, onVolumeChange.bind(this));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               };
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               var attachSkinEvents = function() {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   this.volumeButton.addEventListener("click", onVolumeButtonClick.bind(this));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   if (isDesktop) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       this.volumeSlider.addEventListener("click", onVolumeSliderClick.bind(this));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       this.volumeSlider.addEventListener("mousemove", onVolumeSliderMouseMoveOrOut.bind(this));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       this.volumeSlider.addEventListener("mouseleave", onVolumeSliderMouseMoveOrOut.bind(this));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       this.volumeSlider.addEventListener("mousedown", onVolumeSliderMouseDown.bind(this));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               };
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               var dispatchUserInteractionEvent = function(interactionType) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   this.player.dispatchEvent(PlayerEvent.USER_INTERACTION, {"interactionType":interactionType});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               };
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               var onVolumeChange = function() {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   let volume;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   if (this.controller.isMuted()) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       utl.replaceClass(this.volumeButton, ["full-volume", "half-volume"], "muted");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       utl.setStyle(this.volumeLevel, {width:0});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       volume = this.controller.getVolume();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       utl.replaceClass(this.volumeButton, ["full-volume", "half-volume", "muted"], (volume > .5 ? "full" : "half") + "-volume");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       utl.setStyle(this.volumeLevel, {width:volume * 100 + "%"});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               };
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               var onVolumeButtonClick = function() {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   this.controller.toggleMute();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   dispatchUserInteractionEvent.call(this, this.controller.isMuted() ? UserInteraction.MUTE : UserInteraction.UNMUTE);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               };
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               var onVolumeSliderClick = function() {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   setVolume.call(this);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   dispatchUserInteractionEvent.call(this, UserInteraction.VOLUME);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               };
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               var onVolumeSliderMouseMoveOrOut = function(e) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   this.pageXPos = e.pageX;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   if (this.isVolumeSliderActive) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       setVolume.call(this);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               };
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               var onVolumeSliderMouseDown = function(e) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   ec.bindOnce(document, "mouseup", onDocumentMouseUp.bind(this));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   this.isVolumeSliderActive = true;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   e.stopPropagation();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               };
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               var onDocumentMouseUp = function() {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   this.isVolumeSliderActive = false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               };
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               var setVolume = function() {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   let volumeSliderOffset = Math.round(common.getOffset(this.volumeSlider).left) + this.volumeSliderLeftBorderWidth;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   let volumeSliderWidth = this.volumeSlider.clientWidth;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   if (this.pageXPos < volumeSliderOffset) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       this.controller.setVolume(0);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       if (this.pageXPos > volumeSliderOffset + volumeSliderWidth) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           this.controller.setVolume(1);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           let volumePoint = this.pageXPos - volumeSliderOffset;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           let volumePrct = volumePoint / volumeSliderWidth;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           this.controller.setVolume(volumePrct);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               };
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               export default VolumeSliderHorizontal;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


var mutedIcon = ' <g class="muted-icon"><path d="M15,7.1h1v1h-1V7.1z"></path><path d="M14,6.1h1v1h-1V6.1z"></path><path d="M13,5.1h1v1h-1V5.1z"></path><path d="M14,8.1h1v1h-1V8.1z"></path><path d="M13,9.1h1v1h-1V9.1z"></path><path d="M16,6.1h1v1h-1V6.1z"></path><path d="M17,5.1h1v1h-1V5.1z"></path><path d="M16,8.1h1v1h-1V8.1z"></path><path d="M17,9.1h1v1h-1V9.1z"></path></g>';
var fullVolumeIcon = ' <path class="full-volume-icon" d="M16.9,0.1l-1.1,1.5c1.6,1.5,2.5,3.7,2.5,6c0,2.4-1,4.6-2.6,6.1l1.1,1.4c2-2,3.1-4.6,3.1-7.5 C20,4.7,18.8,2,16.9,0.1z"></path>';
var halfVolumeIcon = ' <path class="half-volume-icon" d="M13.8,3.1L13,4.8c0.8,0.7,1.3,1.7,1.3,2.8c0,1.2-0.3,2.3-1.2,3l0.8,1.4c1.2-1.1,2-2.7,2-4.4 C15.9,5.8,15.1,4.2,13.8,3.1z"></path>';

var VolumeSliderHorizontal = exports.VolumeSliderHorizontal = function (_BaseComponent) {
    _inherits(VolumeSliderHorizontal, _BaseComponent);

    function VolumeSliderHorizontal() {
        _classCallCheck(this, VolumeSliderHorizontal);

        return _possibleConstructorReturn(this, (VolumeSliderHorizontal.__proto__ || Object.getPrototypeOf(VolumeSliderHorizontal)).call(this));
    }

    _createClass(VolumeSliderHorizontal, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            if (this.player) this.attachPlayerEvents();
            this.onVolumeChange();
            this._updateRendering();
            this.attachSkinEvents();
        }
    }, {
        key: 'attachPlayerEvents',
        value: function attachPlayerEvents() {
            this.player.addEventListener(vdb.constants.PlayerEvent.AD_VOLUME_CHANGED, this.onVolumeChange.bind(this));
            this.player.addEventListener(vdb.constants.PlayerEvent.VIDEO_VOLUME_CHANGED, this.onVolumeChange.bind(this));
        }
    }, {
        key: 'attachSkinEvents',
        value: function attachSkinEvents() {
            this.volumeButton = this.shadowRoot.getElementById('volume-button');
            this.volumeSlider = this.shadowRoot.getElementById('volume-slider');
            this.volumeButton.addEventListener("click", this.onVolumeButtonClick.bind(this));
            // if (isDesktop) {
            this.volumeSlider.addEventListener("click", this.onVolumeSliderClick.bind(this));
            this.volumeSlider.addEventListener("mousemove", this.onVolumeSliderMouseMoveOrOut.bind(this));
            this.volumeSlider.addEventListener("mouseleave", this.onVolumeSliderMouseMoveOrOut.bind(this));
            this.volumeSlider.addEventListener("mousedown", this.onVolumeSliderMouseDown.bind(this));
            // }
        }
    }, {
        key: 'onVolumeChange',
        value: function onVolumeChange() {
            var volume = this.player.getPlayerInfo().volume;
            switch (volume) {
                case 0:
                    {
                        this.volumeIcon = mutedIcon;
                    }
                    break;
                case 1:
                    {
                        this.volumeIcon = fullVolumeIcon + halfVolumeIcon;
                    }
                    break;
                default:
                    {
                        this.volumeIcon = halfVolumeIcon;
                    }
            }
            this._updateRendering();
        }
    }, {
        key: 'onVolumeButtonClick',
        value: function onVolumeButtonClick() {
            this.player.mute();
            // this.dispatchUserInteractionEvent.call(this, this.controller.isMuted() ? UserInteraction.MUTE : UserInteraction.UNMUTE);
        }
    }, {
        key: 'onVolumeSliderClick',
        value: function onVolumeSliderClick() {
            this.setVolume.call(this);
            // this.dispatchUserInteractionEvent.call(this, UserInteraction.VOLUME);
        }
    }, {
        key: 'onVolumeSliderMouseMoveOrOut',
        value: function onVolumeSliderMouseMoveOrOut(e) {
            this.pageXPos = e.pageX;
            if (this.isVolumeSliderActive) {
                this.setVolume.call(this);
            }
        }
    }, {
        key: 'onVolumeSliderMouseDown',
        value: function onVolumeSliderMouseDown(e) {
            document.addEventListener("mouseup", this.onDocumentMouseUp.bind(this));
            this.isVolumeSliderActive = true;
            e.stopPropagation();
        }
    }, {
        key: 'onDocumentMouseUp',
        value: function onDocumentMouseUp() {
            this.isVolumeSliderActive = false;
            document.removeEventListener("mouseup", this.onDocumentMouseUp.bind(this));
        }
    }, {
        key: 'setVolume',
        value: function setVolume() {
            // let volumeSliderOffset = Math.round(common.getOffset(this.volumeSlider).left) + this.volumeSliderLeftBorderWidth;
            var volumeSliderWidth = this.volumeSlider.clientWidth;
            if (this.pageXPos < volumeSliderOffset) {
                this.controller.setVolume(0);
            } else {
                if (this.pageXPos > volumeSliderOffset + volumeSliderWidth) {
                    this.controller.setVolume(1);
                } else {
                    var volumePoint = this.pageXPos - volumeSliderOffset;
                    var volumePrct = volumePoint / volumeSliderWidth;
                    this.controller.setVolume(volumePrct);
                }
            }
        }
    }, {
        key: 'template',
        get: function get() {
            return '<div class="volume-cell control-button-cell">\n        <div class="volume-button skin-control full-volume" id="volume-button">\n        <svg width="30" class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15.1">\n        <path d="M9.1,0l-5,4.3H0.8C0.4,4.3,0,4.6,0,5.1v5.2c0,0.5,0.4,0.9,0.8,0.9h3.7L9.1,15c0.3,0,0.8-0.1,1.1-0.3V0.3 C9.8,0.1,9.4,0,9.1,0z"></path>\n        ' + this.volumeIcon + '\n        </svg> \n        </div>\n        <div class="volume-slider-container">\n        <div class="volume-slider" id="volume-slider">\n        <div class="volume-background">\n        </div>\n        <div class="volume-level" style="width: 100%;">\n        <div class="volume-slider-thumb skin-control">\n        </div>\n        </div>\n        </div>\n        </div>\n        </div>\n        <style>' + this.componentStyle + '</style>';
        }
    }, {
        key: 'componentStyle',
        get: function get() {
            return ':host{width: auto;\n        height: 100%;\n        display: flex;\n        align-items: flex-start;\n        justify-content: flex-start;\n        padding-left:10px;\n        flex: ' + (this.hasAttribute('flex') ? this.getAttribute('flex') : '1') + ';\n        }\n        \n        :host svg {height:100%;}\n        \n        .volume-cell{\n            height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;}\n        \n.volume-slider-thumb {\n    width: 10px;\n    height: 10px;\n    border-radius: 100%;\n    position: absolute;\n    background-color: #ffffff;\n    box-shadow: 1px 1px 2px rgba(0, 0, 0, .46);\n}\n\n.video-playhead {\n    display: block;\n    top: -4px;\n    z-index: 3;\n    margin-left: 0;\n}\n\n.volume-slider-tooltip {\n    width: 40px;\n    height: 17px;\n    right: 31px;\n    margin-bottom: 32px;\n    display: block !important;\n    position: absolute;\n    opacity: 0;\n    background: rgba(34, 34, 34, .5);\n    border-radius: 2px;\n    -moz-transition: opacity .5s;\n    -webkit-transition: opacity .5s;\n    transition: opacity .5s;\n    pointer-events: none;\n    z-index: 5;\n}\n\n.volume-slider-tooltip:after {\n    border-left: 4px solid rgba(34, 34, 34, .5);\n    border-right: 4px solid transparent;\n    border-top: 4px solid transparent;\n    border-bottom: 4px solid transparent;\n    bottom: 4px;\n    right: -12px;\n    -moz-transform: translateX(-50%);\n    -webkit-transform: translateX(-50%);\n    transform: translateX(-50%);\n    content: "";\n    position: absolute;\n    width: 0;\n    height: 0;\n}\n\n.volume-slider-tooltip-text {\n    padding: 3px 5px;\n    position: relative;\n    text-align: center;\n    font: 11px Arial;\n    color: #fff;\n}\n\n.volume-slider-tooltip.active {\n    opacity: 1;\n}\n\n\n.volume-slider-container {\n    height: 100%;\n    width: 40px;\n    left: 22px;\n    z-index: 6;\n    opacity: 0;\n    -moz-transition: opacity .3s .2s ease-in-out;\n    -webkit-transition: opacity .3s .2s ease-in-out;\n    transition: opacity .3s .2s ease-in-out;\n    pointer-events: none;\n    display: flex;\n     align-items: center;\n    justify-content: flex-end;\n    padding-left: 10px;\n}\n\n.volume-cell:hover .volume-slider-container,\n.volume-slider-container.active {\n    -moz-transition: opacity .2s ease-in-out;\n    -webkit-transition: opacity .2s ease-in-out;\n    transition: opacity .2s ease-in-out;\n    opacity: 1;\n    pointer-events: auto;\n}\n\n\n.volume-slider {\n    border: 4px solid rgba(0, 0, 0, 0);\n    width: 40px;\n    height: 2px;\n    position: relative;\n    cursor: pointer;\n}\n\n.volume-background {\n    width: 40px;\n    height: 2px;\n    background-color: rgba(255, 255, 255, 0.2);\n}\n\n.volume-level {\n    position: absolute;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n    background-color: #customColor;\n}\n\n.volume-slider-thumb {\n    right: -5px;\n    top: -4px;\n    z-index: 6;\n}\n\n        ';
        }
    }]);

    return VolumeSliderHorizontal;
}(_baseComponent.BaseComponent);

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map