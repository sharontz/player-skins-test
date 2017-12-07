"use strict";

var _volumeSliderHorizontal = require("../core/components/volume-slider-horizontal");

var _volumeSliderHorizontal2 = _interopRequireDefault(_volumeSliderHorizontal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

vdb.skins.BigPlayPause = vdb.EventBus.extend(function () {
    var utl = vdb.Utils;
    var HIDETIMEOUT = 1E3;
    var SWITCHTIMEOUT = 200;
    var STOPANIMATIONTIMEOUT = 250;
    var buildControls = function buildControls() {
        this.bigButtonWrapper = utl.createElement("div", { "class": ["big-button-wrapper"] }, this.parent);
        this.bigButton = utl.createElement("div", { "class": ["big-button"] }, this.bigButtonWrapper);
        this.bigButtonRing1 = utl.createElement("div", { "class": ["big-button-ring1"] }, this.bigButton, '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41"><path d="M20.5,2.065c10.139,0,18.434,8.295,18.434,18.435c0,10.139-8.295,18.434-18.434,18.434 c-10.139,0-18.434-8.295-18.434-18.434C2.065,10.362,10.361,2.065,20.5,2.065 M20.5,0C9.171,0,0,9.171,0,20.5S9.171,41,20.5,41 S41,31.829,41,20.5S31.829,0,20.5,0L20.5,0z"/></svg> ');
        this.bigButtonRing2 = utl.createElement("div", { "class": ["big-button-ring2"] }, this.bigButton, '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41"><path d="M20.5,2.065c10.139,0,18.434,8.295,18.434,18.435c0,10.139-8.295,18.434-18.434,18.434 c-10.139,0-18.434-8.295-18.434-18.434C2.065,10.362,10.361,2.065,20.5,2.065 M20.5,0C9.171,0,0,9.171,0,20.5S9.171,41,20.5,41 S41,31.829,41,20.5S31.829,0,20.5,0L20.5,0z"/></svg> ');
        this.bigButtonPlayIcon = utl.createElement("div", { "class": ["big-button-play-icon"] }, this.bigButton, '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 10"><path d="M0,9.5C0,9,0,0.9,0,0.6c0-0.4,0.3-0.7,0.7-0.5c0.3,0.2,5.6,4.1,6.1,4.4c0.3,0.2,0.3,0.7,0,1 C6.4,5.7,1.1,9.7,0.7,9.9C0.4,10.2,0,9.9,0,9.5z"/></svg>');
        this.bigButtonPauseIcon = utl.createElement("div", { "class": ["big-button-pause-icon"] }, this.bigButton, '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 10"><rect width="3" height="10"/><rect x="6" width="3" height="10"/></svg>');
        this.bigButtonPauseBackground = utl.createElement("div", { "class": "big-button-background" }, this.bigButton);
    };
    var hideIf360 = function hideIf360() {
        this.video360 = vdb.Utils360.checkIfVideo360(this.controller.getCurrentVideo());
        if (this.video360) {
            utl.setStyle(this.bigButtonWrapper, { display: "none" });
        } else {
            if (!this.shareScreen) {
                utl.setStyle(this.bigButtonWrapper, { display: "block" });
            }
        }
    };
    var attachPlayerEvents = function attachPlayerEvents() {
        this.bigButton.addEventListener("click", bigButtonClick.bind(this));
        this.player.addEventListener(vdb.constants.PlayerEvent.SHARE_SCREEN_OPENED, shareScreenOpened.bind(this));
        this.player.addEventListener(vdb.constants.PlayerEvent.SHARE_SCREEN_CLOSED, shareScreenClosed.bind(this));
        this.player.addEventListener(vdb.constants.PlayerEvent.VIDEO_PLAY, videoPlays.bind(this));
        this.player.addEventListener(vdb.constants.PlayerEvent.VIDEO_PAUSE, videoPaused.bind(this));
        this.player.addEventListener(vdb.constants.PlayerEvent.VIDEO_END, videoEnded.bind(this));
        this.player.addEventListener(vdb.constants.PlayerEvent.AD_START, adStart.bind(this));
        this.player.addEventListener(vdb.constants.PlayerEvent.AD_END, adEnd.bind(this));
        this.player.addEventListener(vdb.constants.PlayerEvent.AD_META, adMeta.bind(this));
    };
    var shareScreenOpened = function shareScreenOpened() {
        this.shareScreen = true;
        utl.setStyle(this.bigButtonWrapper, { display: "none" });
    };
    var shareScreenClosed = function shareScreenClosed() {
        this.shareScreen = false;
        utl.setStyle(this.bigButtonWrapper, { display: "block" });
    };
    var bigButtonClick = function bigButtonClick() {
        this.controller.togglePlay();
    };
    var adMeta = function adMeta() {
        this.ads = true;
    };
    var adStart = function adStart() {
        this.ads = true;
        hideBigButton.call(this);
        this.canShowButton = false;
    };
    var adEnd = function adEnd() {
        this.ads = false;
    };
    var videoPlays = function videoPlays() {
        hideIf360.call(this);
        if (!this.plays && !this.ads) {
            if (!this.firstTime) {
                showBigButton.call(this);
            }
            this.canShowButton = true;
            setTimeout(switchToPauseIcon.call(this), SWITCHTIMEOUT);
            hideBigButtonTimeout.call(this);
            this.plays = true;
            this.firstTime = false;
        }
    };
    var videoPaused = function videoPaused() {
        if (!this.ads) {
            this.plays = false;
            showBigButton.call(this);
            setTimeout(switchToPlayIcon.call(this), SWITCHTIMEOUT);
        }
    };
    var videoEnded = function videoEnded() {
        if (!this.ads) {
            this.canShowButton = false;
            hideBigButton.call(this);
            this.firstTime = true;
        }
    };
    var switchToPlayIcon = function switchToPlayIcon() {
        utl.removeClass(this.bigButton, "playState");
        utl.removeClass(this.bigButton, "pauseState");
        utl.removeClass(this.bigButton, "animate");
        utl.removeClass(this.bigButton, "animate180");
        utl.removeClass(this.bigButtonPauseIcon, "animate");
        utl.removeClass(this.bigButtonPlayIcon, "animate");
        utl.addClass(this.bigButton, "animate");
        utl.addClass(this.bigButtonPauseIcon, "animate");
        clearTimeout(this.stopAnimationTimeout);
        this.stopAnimationTimeout = setTimeout(stopAnimation.bind(this, "playState"), STOPANIMATIONTIMEOUT);
    };
    var switchToPauseIcon = function switchToPauseIcon() {
        utl.removeClass(this.bigButton, "playState");
        utl.removeClass(this.bigButton, "pauseState");
        utl.removeClass(this.bigButton, "animate");
        utl.removeClass(this.bigButton, "animate180");
        utl.removeClass(this.bigButtonPauseIcon, "animate");
        utl.removeClass(this.bigButtonPlayIcon, "animate");
        utl.addClass(this.bigButton, "animate180");
        utl.addClass(this.bigButtonPlayIcon, "animate");
        clearTimeout(this.stopAnimationTimeout);
        this.stopAnimationTimeout = setTimeout(stopAnimation.bind(this, "pauseState"), STOPANIMATIONTIMEOUT);
    };
    var stopAnimation = function stopAnimation(state) {
        utl.addClass(this.bigButton, state);
    };
    var showBigButton = function showBigButton() {
        utl.setStyle(this.bigButtonRing1, { opacity: 1 });
        utl.setStyle(this.bigButtonRing2, { opacity: 1 });
        utl.setStyle(this.bigButtonPlayIcon, { opacity: 1 });
        utl.setStyle(this.bigButtonPauseIcon, { opacity: 1 });
        utl.setStyle(this.bigButtonPauseBackground, { opacity: 1 });
        utl.setStyle(this.bigButton, { pointerEvents: "all" });
    };
    var hideBigButtonTimeout = function hideBigButtonTimeout() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(hideBigButton.bind(this), HIDETIMEOUT);
    };
    var hideBigButton = function hideBigButton() {
        utl.setStyle(this.bigButtonRing1, { opacity: 0 });
        utl.setStyle(this.bigButtonRing2, { opacity: 0 });
        utl.setStyle(this.bigButtonPlayIcon, { opacity: 0 });
        utl.setStyle(this.bigButtonPauseIcon, { opacity: 0 });
        utl.setStyle(this.bigButtonPauseBackground, { opacity: 0 });
        utl.setStyle(this.bigButton, { pointerEvents: "none" });
    };
    return { init: function init(controller, parent, container) {
            this.controller = controller;
            this.player = controller.getPlayer();
            this.parent = parent;
            this.container = container;
            this.plays = false;
            this.canShowButton = false;
            this.shareScreen = false;
            this.ads = false;
            this.firstTime = true;
            this.video360 = vdb.Utils360.checkIfVideo360(this.controller.getCurrentVideo());
            this.timeout = 0;
            buildControls.call(this);
            attachPlayerEvents.call(this);
        }, buildControls: buildControls, attachPlayerEvents: attachPlayerEvents };
}());
vdb.skins.CcMenu = vdb.core.Class.extend(function () {
    var LOGGER = vdb.log.getLogger("CcMenu");
    var isMobile = !!vdb.Utils.mobileOs();
    var hasTouchSupport = vdb.Utils.hasTouchSupport;
    var ec = vdb.events.EventContext;
    var settingsConstants = vdb.html5.subtitles.settingsConstants;
    var Settings = settingsConstants.Settings;
    var FontFamilies = settingsConstants.FontFamilies;
    var Colors = settingsConstants.Colors;
    var CharEdgeStyles = settingsConstants.CharEdgeStyles;
    var CapitalizationOptions = settingsConstants.CapitalizationOptions;
    var ScreenLocations = settingsConstants.ScreenLocations;
    var PlayerEvent = vdb.constants.PlayerEvent;
    var UserInteraction = vdb.enums.UserInteraction;
    var SupportedLanguages = settingsConstants.SupportedLanguages;
    var SubtitlesManagerEvent = vdb.html5.subtitles.SubtitlesManagerEvent;
    var setStyles = function setStyles() {
        vdb.dom.embedCssToHead('.cc-cell{position:relative}.cc-outer-container{display:none;position:absolute;padding-bottom:10px;right:-25px;z-index:5;color:#d0d0d0;-moz-transition:opacity .5s;-webkit-transition:opacity .5s;transition:opacity .5s;cursor:default}.fullscreen-mode .cc-outer-container{padding-bottom:14px}.cc-hover-mode,.cc-locked-mode{display:block}.cc-hover-mode{opacity:0;pointer-events:none}.hover-enabled .cc-cell:hover .cc-hover-mode{opacity:1;pointer-events:auto}.cc-inner-container{position:relative;letter-spacing:.5px;white-space:nowrap}.fullscreen-mode .cc-inner-container{letter-spacing:.8px}.cc-inner-container:after{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid rgba(34,34,34,0.85);bottom:-7px;right:28.5px;content:"";position:absolute;width:0;height:0}.cc-inner-container ul{list-style-type:none;margin:0;padding:0;vertical-align:top}.cc-inner-container li{display:block;font:12px/20px Arial;text-align:left;vertical-align:middle;cursor:pointer}.fullscreen-mode .cc-inner-container li{font:14px/26px Arial}.hover-enabled .cc-inner-container li:hover{background-color:rgba(255,255,255,0.15)}.cc-inner-container li span{vertical-align:middle}.cc-inner-container .cc-language-sub-list{border-top:1px solid #404040;margin-top:5px!important;padding:5px 0 0}.fullscreen-mode .cc-inner-container .cc-language-sub-list{margin-top:7px!important;padding:7px 0 0}.gear-icon{display:inline-block;width:16px;height:16px;margin-right:8px}.cc-language-menu{background-color:rgba(34,34,34,0.85);padding:10px 0;border-radius:2px}.fullscreen-mode .cc-language-menu{padding:14px 0;border-radius:3px}.cc-language-menu li{margin:0 2px;padding:0 13px}.fullscreen-mode .cc-language-menu li{margin:0 3px;padding:0 16px}.cc-language-list{padding:0}.cc-settings-menu,.cc-supported-languages-menu{background-color:rgba(34,34,34,0.85)}.cc-settings-menu li,.cc-supported-languages-list li{height:20px;margin-bottom:3px;padding:0 6px}.fullscreen-mode .cc-settings-menu li,.fullscreen-mode .cc-supported-languages-list li{height:26px;margin-bottom:5px;padding:0 8px}.cc-settings-menu li:last-child{margin-bottom:0}.cc-settings-list-outer-wrapper,.cc-setting-options-list-outer-wrapper{display:inline-block;height:181px;padding:14px 4px 14px 14px;vertical-align:top}.hover-enabled .cc-settings-list-outer-wrapper .scrollbar-track,.hover-enabled .cc-setting-options-list-outer-wrapper .scrollbar-track{opacity:0;-moz-transition:opacity .5s;-webkit-transition:opacity .5s;transition:opacity .5s}.hover-enabled .cc-settings-list-outer-wrapper:hover .scrollbar-track,.hover-enabled .cc-setting-options-list-outer-wrapper:hover .scrollbar-track{opacity:1}.cc-settings-list-outer-wrapper{border-right:1px solid #404040}.fullscreen-mode .cc-settings-list-outer-wrapper,.fullscreen-mode .cc-setting-options-list-outer-wrapper{height:auto;padding:17px 5px 17px 17px}.cc-settings-list-inner-wrapper,.cc-setting-options-list-inner-wrapper{position:relative;height:100%;padding-right:10px;overflow:hidden}.fullscreen-mode .cc-settings-list-inner-wrapper,.fullscreen-mode .cc-setting-options-list-inner-wrapper{padding-right:12px}.cc-inner-container .scrollbar-track{position:absolute;top:0;right:0;width:6px;height:100%;cursor:pointer}.fullscreen-mode .cc-inner-container .scrollbar-track{width:7px}.cc-inner-container .scrollbar-thumb{position:relative;height:33%;border-radius:6px;background-color:#808080;cursor:-webkit-grab;cursor:-moz-grab}.fullscreen-mode .cc-inner-container .scrollbar-thumb{border-radius:7px}.cc-inner-container .scrollbar-thumb:active{cursor:-webkit-grabbing;cursor:-moz-grabbing}.cc-settings-list,.cc-supported-languages-list{display:inline-block;position:relative}.cc-settings-list-inner-wrapper,.cc-setting-options-list-inner-wrapper{width:176px}.cc-supported-languages-menu .cc-settings-list-inner-wrapper{width:100px}.fullscreen-mode .cc-settings-list-inner-wrapper,.fullscreen-mode .cc-setting-options-list-inner-wrapper{width:210px}.cc-setting-options-list-scroll-wrapper{position:relative}.cc-settings-list,.cc-setting-options-list{width:100%}.cc-setting-options-list li{position:relative;padding-left:21px}.fullscreen-mode .cc-setting-options-list li{padding-left:25px}.cc-settings-menu-footer{background-color:rgba(0,0,0,0.85);border-radius:0 0 2px 2px;padding:0 8px 0 20px;font:12px Arial;text-align:right}.fullscreen-mode .cc-settings-menu-footer{border-radius:0 0 3px 3px;padding:0 10px 0 25px;font:14px Arial}.cc-settings-menu-footer-left-container,.cc-settings-menu-footer-right-container{display:inline-block;width:50%}.cc-settings-menu-footer-left-container{text-align:left}.cc-settings-menu-footer-right-container{text-align:right}.cc-settings-menu-footer span{vertical-align:middle}.cc-back-to-settings-list-link-wrapper{display:none;cursor:pointer}.cc-back-to-settings-list-arrow{margin-right:6px}.cc-back-to-settings-list-link{text-decoration:underline}.cc-settings-reset-link{line-height:36px;text-decoration:underline;cursor:pointer}.fullscreen-mode .cc-settings-reset-link{line-height:43px}.hover-enabled .cc-back-to-settings-list-link-wrapper:hover,.hover-enabled .cc-settings-reset-link:hover{color:#customColor}.cc-settings-close-button{display:inline-block;width:55px;line-height:20px;background-color:#f0f0f0;color:#121212;border-radius:2px;border:0;padding:0;margin:0;text-align:center;margin-left:12px;cursor:pointer}.hover-enabled .cc-settings-close-button:hover{background-color:#fff;color:#000}.fullscreen-mode .cc-settings-close-button{width:65px;line-height:23px;border-radius:3px;margin-left:15px}.cc-bullet{position:absolute;left:6px;font-size:24px;line-height:20px}.fullscreen-mode .cc-bullet{left:8px;line-height:26px}.cc-selected{color:#customColor}.cc-checkbox{display:inline-block;width:10px;height:10px;border:1px solid #8f918c;margin:-1px 10px 0 0}.fullscreen-mode .cc-checkbox{width:12px;height:12px;border:1px solid #d0d0d0;margin:-2px 14px 0 0}.cc-selected .cc-checkbox{border-color:#customColor}.cc-white{background-color:white}.cc-yellow{background-color:yellow}.cc-green{background-color:green}.cc-cyan{background-color:cyan}.cc-blue{background-color:blue}.cc-magenta{background-color:magenta}.cc-red{background-color:red}.cc-black{background-color:black}.cc-languages-view .cc-settings-menu,.cc-languages-view .cc-settings-menu-footer,.cc-font-family-view .cc-language-menu,.cc-font-color-view .cc-language-menu,.cc-font-size-view .cc-language-menu,.cc-bg-color-view .cc-language-menu,.cc-bg-opacity-view .cc-language-menu,.cc-window-color-view .cc-language-menu,.cc-window-opacity-view .cc-language-menu,.cc-char-edge-style-view .cc-language-menu,.cc-font-opacity-view .cc-language-menu,.cc-capitalization-view .cc-language-menu,.cc-location-on-screen-view .cc-language-menu,.cc-setting-options-list,.cc-supported-languages-menu{display:none}.cc-font-family-view .cc-font-family-list,.cc-font-color-view .cc-font-color-list,.cc-font-size-view .cc-font-size-list,.cc-bg-color-view .cc-bg-color-list,.cc-bg-opacity-view .cc-bg-opacity-list,.cc-window-color-view .cc-window-color-list,.cc-window-opacity-view .cc-window-opacity-list,.cc-char-edge-style-view .cc-char-edge-style-list,.cc-font-opacity-view .cc-font-opacity-list,.cc-capitalization-view .cc-capitalization-list,.cc-location-on-screen-view .cc-location-on-screen-list{display:inline-block}.cc-small-player-mode.cc-outer-container{bottom:0;right:0;padding-bottom:0;z-index:10}.cc-small-player-mode.cc-outer-container,.cc-small-player-mode .cc-inner-container:after{border:0}.cc-small-player-mode.cc-outer-container,.cc-small-player-mode .cc-inner-container,.cc-small-player-mode .cc-settings-menu,.cc-small-player-mode .cc-settings-list-outer-wrapper,.cc-small-player-mode .cc-settings-list-inner-wrapper,.cc-small-player-mode .cc-setting-options-list-outer-wrapper,.cc-small-player-mode .cc-setting-options-list-inner-wrapper,.cc-small-player-mode .cc-settings-only-view,.cc-small-player-mode .cc-font-family-view,.cc-small-player-mode .cc-font-color-view,.cc-small-player-mode .cc-font-size-view,.cc-small-player-mode .cc-bg-color-view,.cc-small-player-mode .cc-bg-opacity-view,.cc-small-player-mode .cc-window-color-view,.cc-small-player-mode .cc-window-opacity-view,.cc-small-player-mode .cc-char-edge-style-view,.cc-small-player-mode .cc-font-opacity-view,.cc-small-player-mode .cc-capitalization-view,.cc-small-player-mode .cc-location-on-screen-view,.cc-small-player-mode .cc-supported-languages-menu .cc-settings-list-outer-wrapper,.cc-small-player-mode .cc-supported-languages-menu .cc-settings-list-inner-wrapper{width:100%;height:100%;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}.cc-small-player-mode .cc-settings-menu,.cc-small-player-mode .cc-supported-languages-menu{height:calc(100% - 36px)}.cc-small-player-mode .cc-settings-list .cc-selected{color:inherit}.cc-small-player-mode .cc-settings-only-view .cc-language-menu,.cc-small-player-mode .cc-settings-only-view .cc-setting-options-list-outer-wrapper,.cc-small-player-mode .cc-font-family-view .cc-settings-list-outer-wrapper,.cc-small-player-mode .cc-font-color-view .cc-settings-list-outer-wrapper,.cc-small-player-mode .cc-font-size-view .cc-settings-list-outer-wrapper,.cc-small-player-mode .cc-bg-color-view .cc-settings-list-outer-wrapper,.cc-small-player-mode .cc-bg-opacity-view .cc-settings-list-outer-wrapper,.cc-small-player-mode .cc-window-color-view .cc-settings-list-outer-wrapper,.cc-small-player-mode .cc-window-opacity-view .cc-settings-list-outer-wrapper,.cc-small-player-mode .cc-char-edge-style-view .cc-settings-list-outer-wrapper,.cc-small-player-mode .cc-font-opacity-view .cc-settings-list-outer-wrapper,.cc-small-player-mode .cc-capitalization-view .cc-settings-list-outer-wrapper,.cc-small-player-mode .cc-location-on-screen-view .cc-settings-list-outer-wrapper{display:none}.cc-small-player-mode .cc-font-family-view .cc-back-to-settings-list-link-wrapper,.cc-small-player-mode .cc-font-color-view .cc-back-to-settings-list-link-wrapper,.cc-small-player-mode .cc-font-size-view .cc-back-to-settings-list-link-wrapper,.cc-small-player-mode .cc-bg-color-view .cc-back-to-settings-list-link-wrapper,.cc-small-player-mode .cc-bg-opacity-view .cc-back-to-settings-list-link-wrapper,.cc-small-player-mode .cc-window-color-view .cc-back-to-settings-list-link-wrapper,.cc-small-player-mode .cc-window-opacity-view .cc-back-to-settings-list-link-wrapper,.cc-small-player-mode .cc-char-edge-style-view .cc-back-to-settings-list-link-wrapper,.cc-small-player-mode .cc-font-opacity-view .cc-back-to-settings-list-link-wrapper,.cc-small-player-mode .cc-capitalization-view .cc-back-to-settings-list-link-wrapper,.cc-small-player-mode .cc-location-on-screen-view .cc-back-to-settings-list-link-wrapper{display:inline}.cc-supported-languages-view .cc-settings-menu,.cc-supported-languages-view .cc-language-menu{display:none}.cc-supported-languages-view .cc-supported-languages-menu{display:block}.cc-supported-languages-view .cc-settings-reset-link{display:none}.cc-supported-languages-view .cc-settings-list-outer-wrapper{height:auto;border:0}.cc-small-player-mode .cc-supported-languages-view{height:100%}.cc-supported-languages-view .cc-settings-menu-footer-right-container{width:auto;line-height:36px}.cc-supported-languages-view .cc-settings-menu-footer-left-container{width:auto}.cc-language-list li,.cc-supported-languages-list li{text-transform:capitalize}'.replace(/#customColor/g, this.subtitlesManager.player.getControlsCustomColor()));
        vdb.Utils.addClass(this.ccButton.parentNode, "cc-cell");
    };
    var buildTitle = function buildTitle() {};
    var buildSettingsMenu = function buildSettingsMenu() {
        var settingsMenu = vdb.Utils.createElement("div", { "class": "cc-settings-menu" }, this.menuWrapper);
        var settingsListOuterWrapper = vdb.Utils.createElement("div", { "class": "cc-settings-list-outer-wrapper" }, settingsMenu);
        var settingsListInnerWrapper = vdb.Utils.createElement("div", { "class": "cc-settings-list-inner-wrapper" }, settingsListOuterWrapper);
        var settingsList = buildGenericList.call(this, settingsListInnerWrapper, { "class": "cc-settings-list" }, getSettingsListItems(), onSettingClick.bind(this), true, 0);
        if (this.subtitlesManager.isSubscriptEnabled()) {
            var supportedLanguagesMenu = vdb.Utils.createElement("div", { "class": "cc-supported-languages-menu" }, this.menuWrapper);
            this.supportedLanguagesMenu = supportedLanguagesMenu;
            buildSupportedLanguagesColumn.call(this, supportedLanguagesMenu, getSupportedLanguagesList());
        }
        var settingOptionsListOuterWrapper = vdb.Utils.createElement("div", { "class": "cc-setting-options-list-outer-wrapper" }, settingsMenu);
        var settingOptionsListInnerWrapper = vdb.Utils.createElement("div", { "class": "cc-setting-options-list-inner-wrapper" }, settingOptionsListOuterWrapper);
        var settingOptionsListScrollWrapper = vdb.Utils.createElement("div", { "class": "cc-setting-options-list-scroll-wrapper" }, settingOptionsListInnerWrapper);
        var settingsMenuFooter = vdb.Utils.createElement("div", { "class": "cc-settings-menu-footer" }, this.menuWrapper);
        var settingsMenuFooterLeftContainer = vdb.Utils.createElement("div", { "class": "cc-settings-menu-footer-left-container" }, settingsMenuFooter);
        var settingsMenuFooterRightContainer = vdb.Utils.createElement("div", { "class": "cc-settings-menu-footer-right-container" }, settingsMenuFooter);
        var backToSettingsListLinkWrapper = vdb.Utils.createElement("span", { "class": "cc-back-to-settings-list-link-wrapper" }, settingsMenuFooterLeftContainer);
        var backToSettingsListArrow = vdb.Utils.createElement("span", { "class": "cc-back-to-settings-list-arrow" }, backToSettingsListLinkWrapper);
        var backToSettingsListLink = vdb.Utils.createElement("span", { "class": "cc-back-to-settings-list-link" }, backToSettingsListLinkWrapper);
        var settingsResetLink = vdb.Utils.createElement("span", { "class": "cc-settings-reset-link" }, settingsMenuFooterRightContainer);
        var settingsCloseButton = vdb.Utils.createElement("span", { "class": "cc-settings-close-button" }, settingsMenuFooterRightContainer);
        this.settingsList = settingsList;
        buildSettingOptionsList.call(this, settingOptionsListScrollWrapper, getFontFamilyListItems(), Settings.FONT_FAMILY);
        buildSettingOptionsList.call(this, settingOptionsListScrollWrapper, getColorListItems(), Settings.FONT_COLOR);
        buildSettingOptionsList.call(this, settingOptionsListScrollWrapper, getPercentListItems([50, 75, 100, 150, 200, 300, 400]), Settings.FONT_SIZE);
        buildSettingOptionsList.call(this, settingOptionsListScrollWrapper, getColorListItems(), Settings.BG_COLOR);
        buildSettingOptionsList.call(this, settingOptionsListScrollWrapper, getPercentListItems([0, 25, 50, 75, 100]), Settings.BG_OPACITY);
        buildSettingOptionsList.call(this, settingOptionsListScrollWrapper, getColorListItems(), Settings.WINDOW_COLOR);
        buildSettingOptionsList.call(this, settingOptionsListScrollWrapper, getPercentListItems([0, 25, 50, 75, 100]), Settings.WINDOW_OPACITY);
        buildSettingOptionsList.call(this, settingOptionsListScrollWrapper, getCharEdgeStyleListItems(), Settings.CHAR_EDGE_STYLE);
        buildSettingOptionsList.call(this, settingOptionsListScrollWrapper, getPercentListItems([25, 50, 75, 100]), Settings.FONT_OPACITY);
        buildSettingOptionsList.call(this, settingOptionsListScrollWrapper, getCapitalizationListItems(), Settings.CAPITALIZATION);
        buildSettingOptionsList.call(this, settingOptionsListScrollWrapper, getLocationOnScreenListItems(), Settings.LOCATION_ON_SCREEN);
        this.settingsListScrollbar = new vdb.html5.utils.scroll.ScrollBar(vdb.html5.utils.scroll.Orientation.VERTICAL, settingsList, settingsListInnerWrapper);
        this.settingOptionsListScrollbar = new vdb.html5.utils.scroll.ScrollBar(vdb.html5.utils.scroll.Orientation.VERTICAL, settingOptionsListScrollWrapper, settingOptionsListInnerWrapper);
        backToSettingsListArrow.innerHTML = "\u2B05";
        backToSettingsListLink.innerHTML = "Back";
        backToSettingsListLinkWrapper.onclick = backToSettingsList.bind(this);
        settingsResetLink.innerHTML = "Reset";
        settingsResetLink.onclick = resetSettings.bind(this);
        settingsCloseButton.innerHTML = "Close";
        settingsCloseButton.onclick = close.bind(this);
        if (hasTouchSupport) {
            backToSettingsListLinkWrapper.addEventListener("touchstart", backToSettingsList.bind(this));
            settingsResetLink.addEventListener("touchstart", resetSettings.bind(this));
            settingsCloseButton.addEventListener("touchstart", close.bind(this));
        }
    };
    var buildSupportedLanguagesColumn = function buildSupportedLanguagesColumn(supportedLanguagesMenu, supportedLanguagesSubList) {
        var supportedLanguagesOuterWrapper = vdb.Utils.createElement("div", { "class": "cc-settings-list-outer-wrapper" }, supportedLanguagesMenu);
        var supportedLanguagesInnerWrapper = vdb.Utils.createElement("div", { "class": "cc-settings-list-inner-wrapper" }, supportedLanguagesOuterWrapper);
        var supportedLanguagesList = buildGenericList.call(this, supportedLanguagesInnerWrapper, { "class": "cc-supported-languages-list" }, supportedLanguagesSubList, onSupportedLanguagesClick.bind(this));
        this.supportedLanguageListScrollbar = new vdb.html5.utils.scroll.ScrollBar(vdb.html5.utils.scroll.Orientation.VERTICAL, supportedLanguagesList, supportedLanguagesInnerWrapper);
    };
    var buildSubList = function buildSubList() {
        if (this.subtitlesManager.isSubscriptEnabled()) {
            buildGenericList.call(this, this.languageMenu, { "class": "cc-supported-language-list" }, getLanguageMenuItem(), openSupportedLanguagesMenu.bind(this));
        }
        buildGenericList.call(this, this.languageMenu, { "class": "cc-language-sub-list" }, getLanguageSubListItems(), openSettingsMenu.bind(this));
    };
    var buildLanguageList = function buildLanguageList() {
        this.languageList = buildGenericList.call(this, this.languageMenu, { "class": "cc-language-list" }, getLanguageListItems.call(this), onLanguageClick.bind(this), true, 0);
    };
    var buildMenu = function buildMenu() {
        var outerContainer = vdb.Utils.createElement("div", { "class": "cc-outer-container" + (isMobile ? "" : " cc-hover-mode") }, this.ccButton.parentNode);
        var innerContainer = vdb.Utils.createElement("div", { "class": "cc-inner-container" }, outerContainer);
        var menuWrapper = vdb.Utils.createElement("div", { "class": "cc-languages-view" }, innerContainer);
        var languageMenu = vdb.Utils.createElement("div", { "class": "cc-language-menu" }, menuWrapper);
        this.outerContainer = outerContainer;
        this.menuWrapper = menuWrapper;
        this.languageMenu = languageMenu;
        this.buildSettingsMenu();
        this.buildTitle();
        buildLanguageList.call(this);
        this.buildSubList();
    };
    var buildGenericList = function buildGenericList(parent, attributes, items, callback, markSelection, selectedIndex) {
        var ul = vdb.Utils.createElement("ul", attributes, parent);
        updateGenericList.call(this, ul, items, callback, markSelection, selectedIndex);
        return ul;
    };
    var updateGenericList = function updateGenericList(ul, items, callback, markSelection, selectedIndex) {
        var attrs;
        var i = -1;
        var itemsLength = items.length;
        var li;
        for (ul.innerHTML = ""; ++i < itemsLength;) {
            attrs = {};
            if (items[i].value !== undefined) {
                attrs["data-value"] = items[i].value;
            }
            if (i === selectedIndex) {
                attrs["class"] = "cc-selected";
            }
            li = vdb.Utils.createElement("li", attrs, ul);
            li.innerHTML = items[i].innerHTML;
            this.modifyListItem(li);
            li.addEventListener("click", callback);
            if (hasTouchSupport) {
                li.addEventListener("touchstart", callback);
            }
            if (markSelection) {
                addMarkSelectionEvent.call(this, ul, li);
            }
        }
    };
    var addMarkSelectionEvent = function addMarkSelectionEvent(ul, li) {
        var onClickAction = function onClickAction(e) {
            var target = e.currentTarget;
            vdb.Utils.removeClass(ul.children, "cc-selected");
            vdb.Utils.addClass(target, "cc-selected");
            vdb.Utils.addClass(this, "cc-selected");
        };
        addClickListener(li, onClickAction.bind(this));
    };
    var addClickListener = function addClickListener(elem, callback) {
        if (hasTouchSupport) {
            elem.addEventListener("touchstart", callback);
        }
        elem.addEventListener("click", callback);
    };
    var modifyListItem = function modifyListItem() {};
    var buildSettingOptionsList = function buildSettingOptionsList(parent, items, settingKey) {
        var attributes = { "class": ["cc-" + settingKey + "-list", "cc-setting-options-list"] };
        var ul = vdb.Utils.createElement("ul", attributes, parent);
        var subtitlesManager = this.subtitlesManager;
        var bullet = vdb.Utils.createElement("span", { "class": "cc-bullet" });
        var i = -1;
        var itemsLength = items.length;
        var li;
        var defaultItem;
        for (bullet.innerHTML = "\u2022"; ++i < itemsLength;) {
            li = vdb.Utils.createElement("li", { "data-value": items[i].value }, ul);
            li.innerHTML = items[i].innerHTML;
            var onClickAction = function onClickAction(e) {
                vdb.Utils.removeClass(ul.children, "cc-selected");
                vdb.Utils.addClass(this, "cc-selected");
                this.appendChild(bullet);
                subtitlesManager.updateSetting(settingKey, getSelectedValue(e));
            };
            li.addEventListener("click", onClickAction);
            if (hasTouchSupport) {
                li.addEventListener("touchstart", onClickAction);
            }
            if (items[i].value == subtitlesManager.userSettings[settingKey]) {
                vdb.Utils.addClass(li, "cc-selected");
                li.appendChild(bullet);
            }
            if (items[i].value == subtitlesManager.defaultSettings[settingKey]) {
                defaultItem = li;
            }
        }
        this.settingOptionsListsResets.push(function () {
            vdb.Utils.removeClass(ul.children, "cc-selected");
            vdb.Utils.addClass(defaultItem, "cc-selected");
            defaultItem.appendChild(bullet);
        });
        return ul;
    };
    var ListItem = function ListItem(innerHTML, value) {
        return { innerHTML: innerHTML, value: value };
    };
    var getLanguageListItems = function getLanguageListItems() {
        var subtitles = this.subtitlesManager.subtitles;
        var items = [new ListItem("Off", "")];
        for (var languageCode in subtitles) {
            if (Object.prototype.hasOwnProperty.call(subtitles, languageCode)) {
                items.push(new ListItem(subtitles[languageCode]["displayText"], languageCode));
            }
        }
        return items;
    };
    var getLanguageMenuItem = function getLanguageMenuItem() {
        return [new ListItem('<span class="gear-icon"><svg class="player-icon" version="1.1" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="14px" viewBox="0 0 14 14" enable-background="new 0 0 14 14" xml:space="preserve"><switch><foreignObject requiredExtensions="&ns_ai;" x="0" y="0" width="1" height="1"><i:pgfRef xlink:href="#adobe_illustrator_pgf"></i:pgfRef></foreignObject><g i:extraneous="self"><g><polygon fill-rule="evenodd" clip-rule="evenodd" fill="#D0D0D0" points="5.971,7.5 8.018,7.5 6.995,4.844 "/><path fill-rule="evenodd" clip-rule="evenodd" fill="#D0D0D0" d="M7-0.004c-3.867,0-7.002,3.135-7.002,7.002S3.133,14,7,14 s7.002-3.135,7.002-7.002S10.867-0.004,7-0.004z M9.373,11.5l-0.758-2H5.384l-0.758,2H3.005l3.448-9h1.093l3.447,9H9.373z"/></g></g></switch><i:pgf id="adobe_illustrator_pgf"><![CDATA[ eJzsvWuTJbeRJfidZvwPdz+0mdQ2TAUCQAChHVuzvPno0YzULZPU0702NkYrFVNUTdeDVixKq/31 6+e4w4GIe28y60G1dpoJsjKv3whE4OXwx3HH3/0fv/7tF9dfvfn9wxfxajp8/tnf/d3N24dn7968 /fmB5MMvXr787tt3b0H6yW9+egjL1YSrrn9Rv7Qr//vD229fvHn9c36n397j/p/84vXvn7396eEn PwXpdy/evXwQ4i+fvf766ts/ff1Tf5bce/vsnXwXpp/N5WfzFJZD/XmKh+tf8Zpnr//07NtvX/y/ uGKJNYJ4fPPd669evP76+Ob/+flhOnwRsnx34LP/y4vfPHy7/f5qXeuUilyWruTCfDVN8+GL6Sqt y7Qm3HT75vl3rx5ev/v12zfPH7799ubNyzdvv/354eYvz14ffvXsa/nm2eH/fnj58s2f5errX+Qv 71+8fJBWvnr27hBmNvr6F2H+8vjdi5df/eN3r37/IB2w1Jn0+CXr++dvpSKpE3+TXr78xSsh/fbh 3Tt5VXkc3/83/3Ac3wLNQ/nJ//jNw9cvOBLSYf/zp63mt2++efXs7b/J3cHbh7Zlu+B3D6++eSnd y54o8vUX+Kf90S6S1vCCL+a6Xi3TJHWluUoHSUfFKV+lsK6HFOJVLFOwm3qfPfzpxcOff374xzev H6x7rt+++62OWErTpP/aV7/57uXD239+/eKdvPJC2qr986s3Xz28lDt6Ffcvn7FbWEL/16743bO3 Xz+8k9F+8/K7d5yB1Z8iY/DLZ395wCAGe8g/ffPw+ndv/jtfFT1Vay6H5apMy5QP83KVplxlFs31 sGbpxarPW4v8g7lljw/9X3sU6kWt7XkFo/hrGdh/evvi6xevf/5FXOPhizgVG/R/ePviqz7mZT5U /YdNu6rD/2v731og/fHu3cPr1iSZbze/GmbPdPWr3+LZd6+/unnzCkPzLdeKzJvXMqVevvnavu0f +J1U8d031hgSvpSR/PXbF69R8eef/aN+V7/89cvv5Mt/ePvmu29+8foPbz7/7CfKIv77w3NhAzLc Xx3+6ff/Sz7ImufMPvzu7bPnUod89muunr345qffU6G08+3DQb+Ve/lRfv8Bv59y/+3DH2Rp9gqU evf6Tw8v33wzVOyUZ6+/OvzLs7ffPKXyX7989vrZ2wO/8Lp/+eJP8s0z6bJee6c9qVqZO99IJ/Em XrN7xCMXDF896VHP3v3xcHz58Pqrb712/bh7eSU+pcrf/uXV79+8fPHtK69wpPjfT3y7dw9vX//T a33Nt999+8fD7968edk7Qi+wr/ogv32n9/zNPMQvPvcA+fJvt/KbZy9fvvj67bNv/vji+bn6z3zv D7pw75Nm0XP2+rknbr/yh53e8bf0nDaJ7r56IczvwrJ+9Jrf/vnZu+d/FPby+7fP3r54+J61iOH9 w4vXX8mL/va7F+8e+ni9efUNJKLDb//47BuQceX9cGWvN38pG8S4AXzxxeNbg+yNx9fjJf/w9tlX L2TzEWHvH968/Orh9eE32APk/caPst2Vw/Grzz/7H59/Ng3/hfZfOvzdl0cRlP6zkPc/YVfmoUQr yUrm/60s+F9qXDaleKnTuinXQzlKubFyO5S76V5qvG9l82rjzzyUOJS0KVmL9AF+l7BIKfxdh7Ju ynU4ernxcgy3UtqnW6nxNtyRdhvuxzJ2H1+v/cShpKHkeUH5/DP9PZeh1HmVov9eD+Wo5fPP/q/z Y3ppVONmXNMwun2MpUiNbZzTMNo6uuMoVyn4jdGtm3Feh5GWf6VGHfM26kcfb/2N0b4bR13+1Z/p 7JiLNrAZ8Sjji98YYYz1wlI52mU30tdWtmOMMcXvO5bb3Wi2x0aOZR87FB2rNnKrjZmMk4ypjhXG 7MbKLcudlXuUtszQnN2YBo5Wsv6v7Ncj18w9e2hmDyxs48r23PKtg73lwtlzjbnCZ+NZc4wxxSUW UQDXeJRyG+9l2EOKKaWcSqppTdfpmG7TXbqX7pxzzCkvueQ1X+djvsl3WdapvJLI+Eta8rIsdVmX 6+W43Cy3y71MiiCdkUouS6llLcdyU27LvUyYUOeaaq5LLXWt1/VYb+tdvZeJI2O6xlUUSSl1Xdfj erPerfcyfcJ1vE7X+Xq5rtfr9fX1UcrN9e31HafULE1Ix3wsx3pc5avj8eZ4d7yXaSa9yU6PN+km 38gr3Kw31zfHm5ub25t7mXaBg5Fu8+1yK693W2/X2+Ptze3d7f3dJMMT79Ldclfu6t16Jw+7u7mT WXJ3d3ePqXEvnXaf76Wx9/L699dS5KH3cuv97odjOnFYnXY3lNuh3AzluCnXQ1lbkRpXeXwvZSjL puShpKHEochslBpnLyNn61x5Gl/+bvy53ZQbLdJl+H0cyvVQ1k2pQylDWYYiDP0ue0mbEocyDyUM ZRqLdvvnn9kAjA0Yf26GctTSlupmPLejuB27NmrbkdqOjoyI1JjGERlGYtv/21633t71MHtV+mvd 9an15KYPt/22661t/0h/bftF++TayspSrRQrC0u2kliiFZl3XIy2p+qu4EuhNU4f1n6OLNdWVpZq RRa7LP5ys1jJVhJLtKI8ue0BwleHMb3jOB45bpXjlDkuGIuJvX/L3r5m3xb2ZmLvBfbWHXvnyN6o 0rrCtqPFaOXEVt2yFdd878K3THwreReZNnfSpTfCzq6FrVVhb4swuSTMbhY+L28qU+pOOvtGmOG1 sMV6XYRBZmGUUfabIHvwvQz9rXTKcb0WdlrXIow1C4ONskMF2bHvZULcSmcdhQ2vVd5RWPIirDnV KEw6yN5+L1PlVrryWK6FiddShJ1nYetRmHsQWeBeJtGtdO9RWP8qW0CRjSDLhhBlWwiLvKNM6TsZ 7BvZNK5l86iyhSw5y2YSZVMJIl/cy8S7lSE5yoazysZT0iJbUJKtaJYNaZIlcCfT40Y2qWvZrOQd ZdtaYpYNLMpGFkSiuZfJeivDiG0WGy+24ixbH7bqME9B2e8gAtuVuLZdyWtlgenWD3EPAsJKAUIF ChEx2ty48FTWxDpaDf1+CCjzhl/cDzuBcopV5liW+RVkbp2bWfOwjXCXwo/uVIELFrtV5rJuO5bt WdixZFMSgaG9AvZG3xcXmXr1zM4YfWfEvniNZ7b7XcaIJsGWJmdQyrijnBFM0sgua1zvhwLdAhlv uvea5TNlwdtGwYLS5TTuo74Bt8vYIewMH6drijZ38WQGUMQMLj6pwKgilAqGNxTv7+QhwUR3bWYT xbvoTZWFtbW6ek2shx2l95/tJH//cTB1IDeCB4WOKDOkyEw5cs7sBI2xe7JtIY1ZjeyqT6vOskam RbblvX+GmW1Z2fcxMh+O3VL+JAv56PJ1K11jqhtdqph+pSVvdDDTy6TGaMxAf1Tm36jEW22v7Vau C7o2wSK9uNEibyihN80Dv9ddqbvSNVb9azFddizppMSTMp8p9iM1jj8nqiNW5yj7+e/bs0VYi8zC Gy9HL9cXynqx1KZhSo1lV5Ynlq695rFIjZvPbuHof5+WeKFwakiN8xPLuU4+U6TGp1355J+ztoKP +vl0NQ7ba/COVem3SfG3VlRua7aQZhuppns324mte1nVqqe31d7sMX0p7Nd2k33bWh5X79FWdbMi nK7d4laHxUp2m0S3S8Vxtbo145F1Kn+5LaTbxnZrs63OW25NzcYy2tiOZ9fmcWOZO12dzYazX611 Y+XrVqFmGTq3Xv3zxnaYT0raWBsvr8qt5Wpvszy3bh9bzbu1ylV94bv3X9GPruq/gTX46Wu8IPSO 6tWpgqVSy6mC1WSViQr7HSWS1RTMxWSS2dWr+0EqKRupZB5UrBtRsqhiff6ZKFlQs1TJgpo1UcVS JeuGVidVtKorWtEULahaN6JmHaloVdqwZDZS2QpcKPfUv2/xCKmgiqqlyhbUrVnVLSpct6ZwHalw VSpcULnAymTumNp1T10aipeqXlC+KpUvqF+J6lfgsrqnCnZDFQxKGNSwIo/FpaJpiYoWqYyJOkZ7 0B0VsltRyKCSQSmDWgbFrKRM1QzKWSTrmqig3ZsOf9QiHHylfAcJr1DKW3BDxE+ggNU5O8RgHZAu x6nsVqmeoSRy8JF3D1x7kMKaPVd/jzx5lKEoLwm/TSeykXPWDS/dSDYbrrnhkbJiRpkFZcftzvK5 R+SLM/LE07jGRW7yiVe1q6JaRgvZ+LM1Cg6mzq0dru25VDmCqbS9xE3Z2vzyriybIgLAxpJYNjbG Sh1rW6535bgvZtEcy+1JOf25Py1ttgmDHHfycKbMZ0s8W5oV8bTkC2W5WNyeLDWWXamPlvV7iogU G6v2+XJ8YiHHlxpvnlhun1akxlPquaF8cpEaL333gT9nttcPrskNRJNrrbM5UbQkK2pPbfbVYqXZ X1crZp2VGtVa234aq+hLqA1L47dNt25Sf7MUq91Y5jfNU1oWL83WXL2sVq69HM/wrFuYl0441jle 1f0I57nTwJc2fooNT7rAjS5xoZHzHGkPusx7HuE5Gx5jfIa2tMs85gxn+T6OIjU+ykeewEF2nIJe LucaH8wphtV/kU88kSuc8oFHVvXj5a+4qt/LbLsx3Ipgd6O2VDqKIYvFJGtQBMJlcBgfhTGo03gy tzEcx5mu4yqCZ3Mf38KBLJuOOpAjRVY4kWWPoSDbXMlwJt/RnawO5QgplE5l/MCxfE1RGc5lLCZ1 MMPFDPmTbubPP6OruUIqp7v5KOzp1p3Ok0iJkDjheE7ygpClC0X4VcT5azqhb4R93JkrerqWFSNC /0zhH05puKWX60K1YB3c03RQS8HEhLwYaKuMdFbDXQ3ZvdBpXUX1WOm6Vuf1DZkTFvo93diTc+HG fxvnbRy3c1rjscJvG3ftXLVx085HO/fsXLNzy5FH3pqF2rnihht2HriVyUZut+Vw0jHCyzpn2/Ky Hfc6Ixmd8qdR5jkv11ziOjupZCxS4yNc5Hu5xlN3/w9f1c0cDujXAKwOh1n+Wg51ukqydg4lXslq mXExcM1fPuXa47dn6rzKcmWeDjVcif64XK5wfyFruwpLWVOQbwMU47kBtXOtc5I/Sp7t6znkZT3g Aq1lvopTTv1xH12Tvs8kSm1e5LJJlv2CG0UzF9Wdla0pTysB5MIpU5Y/ZvwOQ2XxahJOM7zWJ6rQ 3m6ZhM+ishymXHhjFf6slYluWfUBs/BZVCbDl9dNZXma1vHtPk2FHzGWc7mqMa6oquayfuyA7qs7 N2ft5df1Svj8xQm7vQr1HG87irMBMS+AM//p7fM/vvgKuEz7SyqeR0jm1bKEAve1dH2cS1kaQFPW HHub12Au7Je03XloN2rght11sJtsBcv7i+I/NvED7rYufOqd6Le0XMWIWf8hj95W8J4d/9t/+wt6 Hb/k5tS6/D/7bnVve9Rsu1M2z2qxvejadp/b0U1uO0sygNcC3VclKNk6gkHYEuUKgA== ]]\x3e<![CDATA[ 2I6UJ+5pcVI5YqEEcU3Z4Y6bCiBskBVUTrimOfH2DIBTwZrNGaXmdDXLYwOfDO6qXuYGV6Wv2kF/ +RFY6LmfywDg0VieB5MP7ZEKAiEMxIEge4tkMUCIQkIMFEKb5J3BQm6ye5ofh7sMYJcnQV32vmIX poIhH0bsQ0c/3KjANCAgkgtIa0NB3PrAQSQ25CQE4dpQkxR/FTNZKfJC1IWgm6VHINzeyBycKNBm w0feFnfgay8bkKRDSTZgFLNXTu6JvaFFUi2QxSyNyXwWodvhnwwHehIUyMEL3f6uqIBZIVwG3bp1 uNa1gbSaPT4bGEtBWBMlrLsTP/+AlXW0rBpv1WEfXWHJVFoWKi6FykulNfqaKsyRFgwZPcqq91Rm ujqj6FeMo6o0qtR0tYaKjeFhFREL1QbKjXBzKjiVCk5TcW43as5O0TE1B3OhoWap6jRlR1bZVt3B LFkNSXtDaf3O8bQzlZ2Gqh2VnRsqO3eQcmXsVdmJg7JTTNE5UtG5paKjiNuu4qRBxYF64wqOKEK3 VHKainOq5GRTcqjmuIpzpJpDJceZlaEMDQ0+4DPpwTz9+87/3lLNdk//p1nyzUt61/2l7a/xt2PO x1gD9Qs0xHlwT0H0yIP+O25+J2PUDZ2ePR5BvRDCOBHwMUQktLiEYv+q/0L/VU9z//d64+24NeR6 i0sgdAl+7AG73pHr0bwpi2HXF/OVq9elxxrcaIzBgFfv66+vu0gMz37NceoQ63Mbz21zp1vQub+3 29PJPfSkjv6O4D6S0Vty6q099fgm97ns/cSnn8bf+79HWvZYih49ky4iTS7jUOLm70jkSvuUdj6k 0bN03qvev3cfu73jvk/C4PPuPdt7uY/E1iO0Qecez6Bzi+FyOyK3YXENhavbAAUCEQlk8z5SLLim laSSnSwmHjRXbTAhYeuwvXaHbSELM6etMK6Zq6i5bm/5erox6tbYNkffHn2DbFskMbPcJmWj/Pwz 2yrHzXLcLkfs7BY9u8XPOoL2889UXDIH7h5DewlF+wiOluJKg999EAAvOLs+RdAP5fsx9N0CbzZ5 ESGu3VK/x40Xt+5vseMDetzKgB2XGvf48dsNfvzy/Kzmy1i2s1RmdseOj8jxyefsvZmztHH6gKPP Xp2/K7dCzmKZ2TqTF26VfT5HQzYql1dvc5vbd9ZlNwMoQee5FJnZOtuLzfiFWgflGOXJ5O26h6jv WlfAHVcB14FDNs75D/cRI/ty3ks5n3gaTmJKzsaWbOMcTuJMZB6eRJvs4iDOx5ycxp1YfITUeC76 pOx8ysvO43w5BiUSwHw+DiU8soouraFbgLDPrqTj4OHqa2lcT8OqOrEdXq0ilMZMvRxyPwwtwj0q VPYpCAvLNMeIkl4XaO95nUMuG7uJXD0YGD9VhWprqsuyBpoPVhGdq9lu5KObh9S01k1Vy5VIWnV4 nw+uQt+gpCgsEUaxWGRXsJtDKKIsoJH4C62tSXjp0I68yK1hMJR+dE1mfatTjOzMHNdKi6NsxTX2 zBcFFcCup11s9axXOU8bU83HV/W+RpvvXr16eEu7jf5FA1y3lo2iYhPgRiFsDEctDkFs4MWjBxXf NZHfQM6Qg5tYnl30Li5g94DQFtg7CtA9iJf6osFKG9i0gU97eK4CVRW2elltzVRcKT4ztqUJ0Kq2 roMgfbTN7q4pr6K+EoJluFZWRAUW+z41TVni1CAJ4lJltim0x7aFGtNqjhOVDmfDlptGna3aLHIO VV5i0mjcqKb2arFtrAVbZd+w3QnecFCOjaWcoyV6yV76T/FSvVx7OfYiNd4MpYMDts6gEZ0aNiUO hd0nynjykjfl9KfuynqmiLxTrk/KzYVy+0hxlxZskxdc7NN7F05okWnnT1HOhjT3oObiYc3HvmbD NqKmcoUee4A21qWsQFVpN5E5XHP3g4ravdirRQTdDoaf1NYKzD2yXnR93NCFOXnwc7bw50pz3rXN 7DuadjCXIw2c2WYpDDtHzslbzsXmwZ45o7r3+preaxtHAkADdYhIw1sz5VRamGHKgViiZpzJzDiZ Rhz1Vq/uq741mzNY4kyJrxtxIBuubsahl5pmnMc81d1XvQ4mnBuGWcOsemfISPdSi6S89VMvlKY7 Pqj5q1VE7jigjv/pyB8OGNE+aYP2GXE+6wnKZ+O7HlA9jucxHWaL4GkS3B6nc4rPOcUG3gyowHNo nA0O5yImZyMfb2KxLyP+LsnpW1xOuoAKvIQIfLQ0dT9sI6Bb7HOLeW7Rzj3Sub1J1xVMDxgkfZXr t7HMPTa8SeNd8u5Ryy5TDzL0rWG7tlHKXTI+jU3umuVOqxy1SUNYbLXJ87aOE01yp0WaHmmou60m udUlt9rkVp+sZmgtvhHKKLlW2TXLplvOnudkGjTM+0HPvHN1woOshVe0h/ef1Uv10re1vklnL6kX qTEOpUfyhU0Z0dZbwMaoxHFQhUN2hnCzKceTcr0r535EKySP3ZazGzvtRpeLC0pSY75Q0nsXbm1M nvEJygdFwD8eA8/AUVmB29DR0zj4bQDpNhZ+jIY3B6HM7mXjJOxuwtuN9W9j+1OHobsMm9Pw2se5 2Dhpv8678I0bd5CtuyCO2O1/ZgG8KzIXyQCOXAqrOc4KxdjmRFVrYHejbh2pPbijUAqWmWMhHupQ nTdhHndkYNtgj5VSS3GrYTZZ3sM+RKYPtAW38A8NALkxe+I2DEQDQVRiauEgGhCiWgj9HSJHtdCQ e9NXlKEq2zvSBnltdsgWLDKGiyymeJhSE2VWUltqkbrhTJDgpTDBFlyyDRQWWc80tnUQVS8FC/eS zgUOe/jw6c9pPN+lCLIzkH8gNnfl7kPK9yHFiKSpW/jG+QsaOCRPVbRCgoZE+l0N25FhwgjdmOGm iz0q5QNuf08bwz+/fv3s1cNXh6+NdAiwN5yhjkidc3mXsqsoQ+6lcDngX1MH3Lewf5oJALTdg2y3 mRG28Fr1RKsX+noDqp2BFHJI7XriWevGknSiYLW3bykLehv2rTgyF9atmz+emufhEcCwzD9v1Xu9 9dHeuqdZGPt90/Pm/bw3c81J0oZHclOcBzlLX/eR2GZx+mGyw3yi3DDXwjl6bpgfPKfNj2+9feuN XT2mkidkHp6LGrqh3xdafa/UrnXmj/OM8xPUBS6qaZdJ6pVviB/Na6fpPLcVulSf9/x2NrAb1vsN URiRCImV6xpcKBKvsNKseifrV806lStWEViauU4GwBFYM/lkoVnydshV1xBYLbSgZ6orFlDAcIKG rfn8M0fXbJE1hqvZhBBkM8lsQwhGw8zdChNOM88ozmY25SeZoaYFFSymQjWlqusp7ceUMaplTUlr StvW39WjZDZh/z3Z5bbIBJhPSjxb0oWSt8WU0V6WJ5VyudB9er7UDysWA/60ckabPC0W2vEJy481 XrpikCqa/LY4V1GpbabkUDa5MmciogplBDUed+msImeVppFyyQzSwJgdM9JAvBj6z8KbHPPX8X4e 1CQqXMP6taCmbUiT8yBg/E6CmhTnt7hxWPiR8KjjENpknMkCnCYCk+dNmFP2UKdWmllDf6RGYzWt e7sRpZlWutmlx850M03YF4JueolnSrpQ8kkhd5Qal4vljH/lQulGq2rwifcpJxakbZEav+eK9y1P rvHJP1LjJ/7536PGRzgKdJI7g+NnaiHX6pzydG+L6Rwt5y74iel6wlFuqGWoA0oz7kLLu3fceN5k 21VXU0MQj26m8xyl8ZSGHD4TKHmWqzS+UpgMUrnL9YazqA1+z1s6f5nNotO5TDbTp+zWA6dpP326 bvnMBr+yR+o0jqNy1IbrXOI+84Wy40A7Y/RljvR9/MmL1PjItx9QHud6H1R+rPGvVeN7huY8+efR Grc46HhiZykb65BZhpiJM5q0NKSzHAONaA1Su0qTm5rDfTGrFuEqKjkxWLxFyVzTpnXv8lOicXp0 rt9TfooWM1PIRKAQEMihMI3PP6M7XUEYYC0wtau/FiCGSEd6NhwG2I765ODHVd4V3YmelTcJR9Gf Gwvdgqd3Mke6lrbm25g2BtbcYh2DR22LaXrvB81q1JxGbWirv+yl2+HH4NC3Z8ppphr1TE+Pltmy pD+tpKcUg8p+f1meWqTGJ1/7H6nGwUx2e5JE+CjTt9xlWYLIoHtr2dIWZkmbmB/tSJPXQnNXsHxo R5lv6lyDkQsmLpi34E6DK03daAqdv2XOMwXM55brjK4yTypdS4siE4miQeOfklB6n1Lak0p3QPzn n5mbq7m4mnsrGjA+uFPrdoDHXw8Zzbobiy4s4VHzJrPZ1nXVHFfdadVdVqPDKnZnleWzDGfyWe7d VHsn1QX31Oef7RxUl9xTG+fUY44pqfGCY+qcU+oJbiiNQ3pquXlKsdM5vr9cMmidFGbx/KTlf48a f+QoP3KUHznKjxzl09X4I0f5kaP8yFF+5CifrsaNm/3RIw8//Et678ucaljpTE9rYdqaLLMQlFKy OuPDhAiyM3/wz+WcI/+TVtt8+sjhE+Ihh6tJuN3Gs7/7yu+Qx8o3S7hCroNDTFdLGJJsPXLJroYi Fed5OczTVZzXcq6G/SW9hlLOgRFG+sfjEeYLeIQZeIQ44BE8z9vdDoB9uwNiXyxtt7u+PSk371e8 pj3gGj+PeX5OvFQett2hMZMB5G8dGH96cFc9jTcaLJjj2YRlwMiNp3uOJ3vuyt9sTWPWoBtPx9jt azZDfHS2o7YZcb/mHHbjumE3PIeOn7NkRxn5mU5DlpSe6acOOX6GDD+f5JotE4xLVSZVYsZh7sK2 psQsdzWFyIx2U+YB96d/XIAyfbo6LTw3T3NgdSKQab3w7ANiOoUlGZ7VkKxRGHCtqGB4oQ+rwJ7+ SVrz6fvn41nnecY5fxBs9s4AnGdOyXLIrME2eRwuwaZPAIuWE7DoOZjrDqxrQgYPfn30Cedbcx5C u2mXHf50a/jrD4COfi+YEfy4BVT8AIEbfIo8wcI2vucJ7wHK3D6jh4ac8p46ABO3HGT/zV8H2hjP roe4Xw8GrJt32X7HJFi6sdx5ht+e3zcPh/JpYrojs+pYPt8hPrJn8V08e++1xT36vKaTTWO6Zyqe mUpoMcjSSpfb0eK17wxq0OFLcYjEhhtOhIlF463hf0BU9Z1FUEcDUma648b41jG1na4DT7mzT7oz pt2ZiSyYiDdoqXfG5DtDAI4l4DkTguPnqbQAnNoCcD4hxPjCmnw6xPjMzH/ffBW75fEht+tuJjdO EzJQxBAiE3fqrcLflrqM2VLHB77PXR+9Cuv5ZVj3WUA9gV1LYTfm6W7wWRPb2nQ4yQveIL0duuKw Xr/nzsHA0wCI6Xe3++Wn3bNJEXljLu/INXY0J3e0teTPuXBy6oV8T3/Fe0ahGV0zRqTuMxydy3EU zuQ4svxGVIC6ytOiSzGeLZbUN7/NVe+RB8niSG83bOkaY2UHOrXYzhYZOPfIQH92fw== ]]\x3e<![CDATA[ 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 ]]\x3e<![CDATA[ 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 ]]\x3e<![CDATA[ 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 ]]\x3e<![CDATA[ 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 ]]\x3e<![CDATA[ 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 ]]\x3e<![CDATA[ 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 ]]\x3e<![CDATA[ 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 ]]\x3e<![CDATA[ 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 ]]\x3e<![CDATA[ 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 ]]\x3e<![CDATA[ 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 ]]\x3e<![CDATA[ cxOMzUTLYdUdQ2eRCkkuNtRpEayaWOynRzsMY7FHYE6Dij0iAL9CsZHq0Ut0ZzKguE9FiLW5eKL7 t0GxaWbgI6DYhWziMj4Sis2cBH3ujYoNs/JKQcUmgqv4dZBmg81tHhcHzNLKeURjsWFRfiuw2KVE Ff6Gxda6abSJxWYOnC5RYLFFgTDafekrAH9RzeOMxWbiWc3johPYJ1dzBg+/MRcbLgcbHG5Y7KFi 8IRigzWgTrRmYg9rwnYk9vAAnkRsGAQLNBB7GL2487BZPXzeE4c9gmkdlGtGL5kE3WjYhGKQXJ0b gsPJrq6Bw14yeSsPm+sKdRAxD5urun5PHDajqrfrOifTmrFV6rsDh82zO89Jw6Z/fo7zK3sqZxk0 bFrED+1R21JddrPisFnIotIz47B56Z2IeuOw07LhsLGnIQ/GYeNDZQA4cdhwwZpKdlYcNsyn2qj2 EFE6gJo4bHrtfFQbDptOHdmVgcMG6EKVf6Jhcws+ug2HzZM7z0nDLocrJZOGzSoYjsorDZtWDQSm YdNyuwEGixWPorDiTsOmS1pdl3BqKeLKpaRhw6LKjA2HzcX0ae6JxgmWBlZplnUaGFQoKNt42Fxe 16h3V5Tj9MgRPGylnPFPGw+b8Zhi7oWWGlhfcQgJIDahdByPNiA2QUGSVBuITSidWnwYiK0UTZOS cwKxKX7hvxuITcNp/PWtDnmXsdwrDxu5VD+HiFmUKEMNHja20W3beNiEXEbvCuVGkHRVpH4ECGs4 urMRsUkwo440N7yCjxlEbKw99SZtRGyGtYUDNhEbrqlck0BiIxqhQNuGxBZB6qkTiU0do77KmN5h oaR5Q2JLG3qfE4ktrNgEYnNHVZytQGzG5gOPTmjxVbxWCiA2l6LK6EwctsSg45w4bJ49E0+Bw0Zs TKUfGw4bZv9k8+rpimI447BpEbhixWHDbESJcNjcTnfDOGweXCPWisPm2ojclcBh48lLFGke9jRs QOzFbCI2fkJBmwBdMwwVOvcFW3OGS5gb1hjjg4i9WFYi9jQHEZurQokKTMTOd3dnYjM9PhYkNsEB FDgEEptJzepyxKn/pJnvSkCxmdXk2yQoNhOTjEpsUGyJ8vuYUGyWhjAoFVBsbsO180bFluK635OK PfuSBRWbEbDnud6o2MSpqmeFqdhMRbFFQ1Cx+TWG+GDtWqQ4fFKxYeAtTCo2Y2bsdLFRsRlxYnu1 wGLToolOWGwaJIpYsdh8DOp0NgLfd0Xja2OxEVdQoeuGxSZOrLkjo8p/kCpmKX1gsTEI6qvbsNjU olBDFVxsOJtu/mEuNgMxRLtsXGyYuYBPLjYtfFjBxaZF7RdXLjaPSEFRcLEZjlFB+ohrdW3TzsWm L8y0eXCxyeZjz8DgYjODoYaaKxd7moOLzTmQrQCDi80bx/4LGxcbZnfecQIKFmm9govNbajh2rjY NPOZBRdbqMNeJhibisj7DYtNnScr0AOLDc0Rx5rkYjM3VN2pZXKxGSMnqyC42KxqHivuGl5HVxvE lYs9jCNJazZXClRqGjYo9rSa+4X+R9G1nO/kp9XAn2Ddwft+XB87EvvkXS4fScTGwyZFK4HYt4ej nYd9O/ySOOzboemkYT/2NXYY9uPoYwKtXeQ/UdhPvIAbCftRb4VlN+GLE4P9uLhmx2A/kTAyBpvv y1WDgg21i/IjKwQ7mMQJwYYGjWNdcKWrxXwbAhtGQTdNwEYK6ngm/5rJrHG+4a/rHck8069hGO6S q+HxVt+BHX5NrDhWQWJfo9cJFWp5jiPW0iv6GvUadPiCfB0sqiRfn9EofANfQ/6FgHRgr6l+buek XgNVNXbk9XmF32ni9RmdnAN4zRTX8bzxrs8QuATuGkUQDF4H7vo0/mSjXcNIFzVg12coFwN2jbQY +3pvrGvUAo06SddIb2hh4FcJFTfsrLNxrtswWT0w1wwejnNSru9Qpm6Qa6SO2piIa0hmSNcLwvVt HeAOuL69KEi+NfZjID7w1jgw438b3frq8TgduL+iG2uwrS/PYTvaGu0OI5vBqBM0N70H7xYh/eA5 b1xrLNSUrBTWOhaBhlp3o2Z2pjXWjo7f043iWrIpO0BfGbvxLd2A1gjlZMEHa4qbtYmBs4ZcUFPm SrPGFd/u78qEKQU1lyL4DIRRKsLs18qydgFdkqwpanCCiWnY2wiQnWN9R9eXwFgnNyAo1ncACjeI NbvknFqAcGE6C7s9cZ4BLtgQ1tCgclIMgjWAykx4BsD6Ml9o41cTYIPYn/HVVzDBgl59hRR3g1fD yoL8YFeDasP4X6Cr8WslWdZ1fj8KHQW4Gj4dqRvBrWZGfXzs1GokTxj5C2g1mEH87IJZfVoutCOr z2zkaGI16lIEODWw+owU1QasTuRT8Kph0MTo5CAMjJRsuOoz+gMErRp0P44GAatOWPvGqkaFneow XZJ0WopuUnW9/fluoOoaKsLgVNdQUASmGs7H3d8g1dWeSEKqYWAQV4zqGn1TN0T1yxPQ4jQJ1S3e LwOqL45g73zqi+PkgqdmIcgt9S+XV5SUPBb1ZpruQunf0Wa5JYZTEo8DTY2gFZnIG5p6MC9bPpJM 3dwKLcHU3R2sdi715URDYqmL5+2gUltCu0OpVYpiKyY1iQmvj0RSP6TKvBOpgWhh44wAUj9eCAaO OmLzbzBq67eSRd2j+4RR1DWq73YU9W1gT5KorbFMEDWTD5841IzMRLkmPm5PWgmhxvtRXMk3IdSo jSOaIog6eLm9hNFHwxFRy6FJoD7tXgWAuoafEPxpFvYbvJ34adT/3SpFpUeF9RBfz2RP3+4N+sae tnw90NMXQw5lkqe1JGv1jTwtjUs/J3kaYdqLPRCCPE196hGW1GpRcxEbMg4Di/onBnr6s8v+7ZcF GJp7rMkDPd2c5UvydIDiEjx91dAJr9xpBCTE5jR2GuwQdZw2dfqKstgNOg2CCD2ZYE4DDaI0rJHT MHRvMRdIV4gfDJxGCpjiruBNI3Ea3YqmiueK0mPH6yGD5YhqijSaV0eiMVnTT4mst4zE+bZzkqZH UURiB03DygE2QNMwiLXrDBeYu6xA3zDTw1CcpEyjPE0hQm+Gf2DQZ2NMPy7nTMY0gcpPn+hokD44 DW2E6W4SRlpvV6MmYDoNG186rImX7p7rExoNkTLX0htcGuJihYhsfYo7jQktPf9cydJhTbB0D01Q cKV7QFc3rDQE1y1g05io+hX0ZEOlYYhmjIsvGz1nAindQ08VSLh+ObG6AaUB/GKsyTxp1FqpFt84 aXxHt/s1TqD0c9kRD540DfWeOGnGy4/rjSYN8BG/RsOknxbYbcGk2Yv+ut5Y0gBkKn1ulDRkpsGg Roj4MXxlB0knriw40onCDIz04693p0ijfKu4c2lUFrISLRnSMFRH7CdCekSEJwjSoGgdwYuuPI7c xo0fPdbWmfgCCeu+70mPRraHqY0NHg1AWnWb2ahD7apXMTr68SJ2J0c/4tslN3p4dZbYaBZSXudO jSYvnG3zDI3GSbHQN5jR45QgeWdGD0NZEhk9ojIoiNHrgSYw+olMcfCiHyfJEg4dw8NOi4aSl50w gxYNehupwMGA7tGncmNFQ6hAUmhYkVgfCyiaGvs+3jjRyGMxvmlMNP5mxZQp0f2IYvMVEo38WFSc i1N5GAgWiGik2liAvRGib4fXkxB9R9ldIKLTsDGip9WQ6NssqSQUY4XMqNOGiEa3A/VR9mCFQq8A Y3JUbC5c3BHR4HVdvplMymHhVO/Jh8aKSo0LVzw0lmXw4xIPjdWb6q1cYNYse9jh0JdVJMmGBtVJ TYuNhqakjKn8iYa+rfZKMjSXeS7+Yz04IbPO2k+5Df24UiYXOpbGyYXm4vnub1hoLLTJAIh73mpA EQyFblaa7kxocLvi3PnBRFYukdDvrtGXb+58/f8XCf010vMvHr99/PN/9fMf1sPjcL/7Pf/vr/+v v/1RP/P973749f/y43/xL1zHxz//qx//+m+/stv/8Nuffv2XP/7+hx9//sO6wy/9yl/+/sf/57c/ /vHXf/W7P/5dEK2jeuOXfuJ/++3rrP6nH3/7H//mD78MwY5tf/effv26Vf/j73/389+/8fc//oc/ /MO3xpW+7s1vf/y7f8yFfvnd384LRZX861v+r17o//7b3/zhb37xyf75669/8a/OX//5z7/xzjRc MPz6L37381++3r4/vF7A776z/V/++B9fV7j8y6/+7C/+E//t0b/9y9//57/7mzzWf/cXP/7xw399 lP/+V8fHv/jVnx0f/+6Pv/qz/4z/WLHfx8f//Pqv//tl++NH+/jXH//H/3l8/Oa1x7/7q1/92Xev tS8cw4erlPgrpATf03SFJvkX7U+Y4livv37GD/+vr/95jTzMxB1oE1r1H1jtokyhw0sHmOm1vHyt 8fAfrwH8poURQhQwvI4LynFDtRzFmei0pbOFTg7RtWmHsQtI9hAOdr1WDZvx4iqXI91uB5Tl9Rvb YSHxfznGH9s5hFFHQMEeIwzrxiDIIvy1HXYxbucw7csJz8Oul/bpPryO8B9wkzv6pwFo91r3w7Nj Ex9Mz4TDv9yhB1UjrwX3eZ0EYQ34X7i95fj417+Kxwn/mMUfcHl1j8Eye+2+2GG8VdP2QF56vaae N2OTL6HrW+yn0Bz7YV9zF16H/Rxs/GG+atu5/S2vO/6JxWKQC9Wrrad9rnafCVbIT+Fi5S5vRmQ3 88EudjgX9f7YD1ux/D4/9nOw8YdfOLc87X96o/++N7o9rRpp9zCU81rqjwPMtqM1vMwXW+2ilrc/ DS/1qUHEY8Y9lFp5v8OAgmJVsZ0G4tBcd60nPI371S32eSvmYZebNs9hv8Nwol+v0tvjEAHv7cFN 4/6U076+EnnY9dI+3Yf/9jHjO54Oe/a+316c+308+zngKpFF2M52GvdLW+zzPszDLndsnsN+e/Ej cMr3ZwENTn17gRfj/ojTvr4Pedj10j7dh2/1AmM0QmfB95ENoxGq/LaRLZJ728i2GLeRbbHPkW05 7BzZlnPYRrZ+SXC8b4zExv1+2Gncz2HalxOeh10u7dN9+CFGUcwz7SifbhGrgs6342BKafxkll9c jNvpLfZ5Lcth51Uv57DdIq6AEdTcNibSYrwddhr3c5j25YTnYZdL+3Qf8hbNu7dP6/NxL9P6fDGW aX0xbtP6Yp/T+nLYOa0v57BN6/Nxrxvni7Eedhr3c5j25YTnYZdL+3QfvvIW7bdoPu7lOPPFWH5x MW6nt9jntSyHnVe9nMN2i+bjXjfOF2M97DTu5zDtywnPwy6X9uk+/PDZXcHEg+4m7+5K2DcPhFCK /u7DsANI/+SuYAZFxmH3grqaT+2ugo3v7sqy8eKBzMMuxu0cpn054XnY9dI+3YdvMpnOOXq/vdOp WM5huh/L2S4OzHZpi33eh8UFmnds8RO227s4FcuzmO7H8tSmcX/EaV/fhzzsemmf7g== ]]\x3e<![CDATA[ w7eaTOc0vd/h6VcspzE9kOWEFx9mu7rFPm/F4gXNm7a4CtsdXvyK5XFMD2R5cNO4P+W0r69EHna9 tE/34Zu8wPO7wLfUz8/jQ9i3T/5xn/l90BgpAt/tSMMdfR8fukUO+7dp4/v4sGy8fPLzsItxO4dp X054Hna9tE/34dsvZ/Y7PL/l5TTmV7+c8DJubFe32OetWEaeedOWz3O7w8u3vDyO+dUvD24a96ec 9vWVyMOul/bpPnzj5cx+e+eHvJzD/OSXs10Gje3SFvu8D8uwM+/Y8m1ut3f5kJdnMT/55alN4/6I 076+D3nY9dI+3Yf0AR7WE3z2JB9XFm6+xFOlrti8jsW4uSiLffozy2Gn57Ocw+YmfT63jLQwJrkv D3jo820FxZPQ2mN624txc80X+/Tjl8NOj18/v60MtjPSef4bh3r//Off7IHef1AA+PwGAWDfwPco 8BLrxYv3S9bY/fvPR9xiwf/tYUo2vNN0i/X268WaM01VkNF2Tx5AknoZX67dyDV/u5aZxnYECHr7 2A7LUMJTP7ZzCOOcaUbv+8aPgSTbYRfjdg7TvpzwPOx6aZ/uw7ecabDB+x2mH3K+nQY9Fr7zywlP 4351i33einnY5abNc9jvsNyb+vY4ilR6+4Obxv0pp319JfKw66V9ug/faqZhocv77eW517cXmFd5 vr3A07hf2mKf92Eedrlj8xz224sfaff99iyKNRrbU5vG/RGnfX0f8rDrpX26D98ycAbNiwfZcywh D/aiTPt3GpprbzHsn/3NiGP1NXBm+6kSm/2wVTrQ/Rxq0se/049AvLlvbIHwfthp3M9h2pcTnodd Lu3TfdhCHpcc6O0Wcf693o7DqfYu+y8uxu30Fvu8luWw86qXc9huERyG5xlvG9+qrNsPO437OUz7 csLzsMulfboP32Y5lO9JJlYXk92E7dUJh2J7bGF8f3XWjfNtWA87je3Tm/ssWaj5sPI8F9M84Hx+ y0/Pe7ef57zR68b5SNbDTmP79PrkeX7LASF+8X1ACPt2p3gho70ZfdXvtzVu0X7YPQbqc/gUA9VT fYuB6gGuh53G/RymfTnhedjl0j7dh68MCPstmk9+Oc58SMsvLsbt9Bb7vJblsHsM1OfwKQaqF+ot Btreb9Fi3M9h2pcTnoddLu3Tffg2kz485fPz7UU6GcrI7RwI2zr6fraLcbu0xT7vw3LYPbnuc/iU XN/PbUuu9zvzCjlN4Pilrnafyf1c+6i7GLcherHP8Xw57Bz5l3PYponP5/bNhot0rcNZfF9ihH1b NXT3udrXHXYi35cY8noz2O2Vi/3j3b238X2JsWy8rBrmYRfjdg7TvpzwPOx6aZ/uwzcLdsuv3m/v XAgs5zCXDMvZLouO7dIW+7wPy7Jl3rHFt99u77IQWJ7FXDIsT20a90ec9vV9yMOul/bpPnzDYLdd 6/0Oz7XAchpz1bCc8LLu2K5usc9bsaxc5k1b3PvtDi9rgeVxzFXD8uCmcX/KaV9fiTzsemmf7sM3 C3bfEf57erk/jQ9h3z55ht7q2/jAON31fBofSAl8zn18YPjv7cuk6X1syA2Xj30ecDFuvz7ty6nO g64X9ekOfPvgw35v51e8nMb83pcTXkaM7eoW+7wVy5gTt2z5LJd7u3zB+RDml748rGncn2za19cg D7pe1Kc78I3DDvuNnR/vcg7zM1/Odhkotktb7PM+LENN3K/la1xu7PLh5hOYH/jypKZxf6xpX9+B POh6UZ/uwA//H2Ov/+bnn//6px9/89Hf467/uNBrO8FwQPEA/+OoxHB/19g+DXUu0/79mx3dge5b stvlML9gXo7ys0/y2yhzt1M91Dp+XgJcSdrlDMrYbTvu1wJPtut4LVRoLIdqAmRnZSftDfX/7/cg fvB7eauNHMbReB/G6wLux+dSgdl4fQm0syhSRjqT+l2wKmRkGZJ+FPVWX+IIZ/wmOqbahM7vukDU asn4+qh9BqypzP2P15fqM3i9hb7ykUdVFkJG3yFSOvJmsNzEd65e3pS18zoDVLT4tmHg1Zal1nkE 1pno3uDR+rTQLljGdt1xYUcYX8uE5Ragjbcv4TV0x7ZX9wHmTXh7DF/iCaEc+vShK5qL/xRmNkCn +XJ6QeZe/JMaB2QcIzau9/3xtePmL6L+uxz+p+O10PBPRksx2wuPTcaDjvP8M/xI2PhKwHYLB2F7 77HpUb0te7DooIxzfu0M5smB8sTHzUaA7YyTA9lJ1/ioQtZGlFnaOK4wHrHh0K2ObYdP+r5zf5TF yYay16+ewT/gWZGtRntB1W4+LGJ3vX2L59L0irNL2f381x8WG91Wf36vly3GQ9jb7Tf9tfTVBwj2 SQwcbPQMI6vG/KEQ+fUlj4CPQXZgUeKw8Qm3rlOG8YlhZxkBqiqDdQrIcdr25Gnduf9+DfPy0CSy +AkQ2/1T2o/rXuzfh52wIdlL04+iRbif+HM/PWwoCZex5Bj6+QfnWIkO2E/xP4GT9VPYC5AyOhRe DRtr8cfCAc5GFMDqOY74LqoRrd62d2/LJkMyoqLMxnJ48GCKPI/gB4sPBs89Nu5xj/BcvnoR66vU j8sj7pnTUq0qjZT56i1uNVudhR3ECRufuOzTo/anA88PxkQK3bpR4jdhP8uwvemWwoiKVT+yM2yX R5+uceLN+tS75t41jNcYH1/9/Tg1GPB60hM4DodxbG7+WhgDCqMnkNFLTdvtr4Kls1/yAKDX+QD8 rGQM7+U4lgMsJ5CnNn0XVF8Xz9kwVz8OFiimR1Ofy0/kalg82nj4fWHd4ifjOTyTfv65/CIAQS2n b9+JjNZPaT+eO+xd4+alyPZnY+1hzE8CzV7O26NxRc8KG3s4bfh8vnoK+XLdj8rR+U9s4vlT2Gs9 fSKEl8hod4Fv3PnYePkLwjcYJyd1WY8566ze9uXB130C+nwK69fG7jUaNcczvzbiI2PQjHGbPV1s POOrer26bQ6vOepy6esRVhMqezKPK7YdadzOYL1z+3X/9DVz+8oteg1u/z5vfr/Djtjr92l/uXC2 tyNuExGUMp71F2++Tg/EJdSG865ywvkp7SUcjOusHEcvN4uWset+wNjDQyEC50scgY0BvXEvsfFz +eeoKvzaKUwP5ZYcyNNBjScLehv6N/sNu8ILeNkfNH6WvRf+Jow1PhYCv7965HlLoCF/xrL9T2EP b8LV1jZeOY7qZbjQmCl/8Mr5EPY65tndsTF7ZOhEyhPGEp9yjKX+NYyTPjIHIBrbFYdN29s1zMsD we/oyw/+lPbw5VhjJttrMhrhAjwjjD19TyyNvsQBSBmyvd6xcVzIqE8N2xHjDDEtX37hzL7PGQSN gGJlRL/jp7CXo3gG6PIXaDxPu2aE1tioMYWgwrvGHGJiuY5cruGN233Hzz29fnz1HHbPMX4RfnkO QFxSTnfQxtoXD+8Xhg+bzzvcRlTx2ygPhwfI8eeX3Mb+pD9a0u/sPYxHiRFwv4L1c6Bzqslz5MWh 62DTTF3UauD7sNs5gP2JL+L2jfAxvnrg/E3woC9f9+vbDFfmacui9wFi5vu0H60vT8bHIARARnmN nw48L7OJe/bpMi/hIeRjaFEGW3rjRKTKWO6YbfgB5Vtd+uXXZryuOjYeNY9wxhHqEW8B6RNffuHU 1u+CFE2/1ee5fBfL287l8lc+gX//92y8Hfnf8kfREQ7/jCc6/ETp6vwUdsZnbB/69jBCnX4UHkZg JH7OX2mP7xE1K80vIolu2rb0Ererx/7Ej/GXSqw9sX+/z3gtNUedhwmV+q2zNBsJeJSxxe2mvUUU hCw7G0scgW+OjYhY+5G35RzmF/Zy8+KGXjUcj2ccMVTVo/jNDafGd19jLOyaKGkML/h6rq8/pdyf CnV94xp3ZRw+aG1HGg9vWHL23gc7NmOF8dA6kG4EAFKyObKDA5SWZ3BoyTcDazZGUO5ocQfYUFhG MElyf2KgHCC7/K3Dfk/3q9a4DQw8OhrWxicj+13lkb32YWhvXD6zl4/s66WPJaMoljzsNfdnDMzP gUMCT2vEjMHXKg4a+5vCGicQ63bwf/LK2DTeb26NQ3C56SkgTuu1MBrLhnlc8rr0RfQjr6HFW8NG O68RBU1h4C/moKaBBr1q5it6aKmIbcGM0WdSFKnElnc8dcYsfYQnJwXQ/jXhoAnd8OmeDt0Bvt9L jJZnejgD8Is4MMMSMtanxHPoih6C6nRc6cinFzHAATpjMsDcrUliACj3Ngyj3991+lGccp2Ajmq5 ahhn3pwugI+HC4VDwA+vV5wunBf/0hWn2/O588jlefzc7hGncJZ4/6/2PDYe91EWYx6BjHRf2xNz 7kD/t3il7AIOoALia/drCuO8CD5rH/haXv+7ytFDgw7EqjxqKkKMLWuMbfxCfQQQ0WPEInIRRrCw 4myPMMVXCfcgImSjKoAbjlwEoUaGHWH3y5eBET5Kv2R1flSjp1OKXoc9P6q4C79wUDmlOP+esUwc oMU3cV/36Y1nFoDrD2857pi+z/OeR5jBv1jNjlxfFVPFYGReMm5CKXlvNUH6dJ8IUINHVo4Ii2jl MDBQjRjHBsfo+rClQHh8+Ox03GeIBue34Yxw1DMiCsdrtusEhmmc3OmFCtulH+lQtQjXo6PkHY5W +JhonaygNZ6F1/oPCOuxYc2v7QGMPuYf6YpoJC7Ov6aw1XOJjOej9rjtzxUZA9hbG9643uF9RxQa veJzxLheq6V5hPAwMHTe09tkwy5t3usz7dcVz3m00hbv9Be8VlJ//RIpTIKDlJEDynmH8YjJ5UZ6 9UscgcO8JwcNlqBD5gQZ8T4aj7j1R8/bXIUJ86DW47MD7y8H11hIQzp5xmpilDOOTPSepxL1vNAR ejobrwmkxhHy44+41VNzggEYM+NWOMKZr7cGfWx7xeInPjwY21wEnnUegIsuHeAesTGv3wNF0XkV tcHwk675DhWhuzWjHpEEBB/0iqUP/S8YD7PJHHfk+fah0j0bc1Rh9V64k+N44ghHTr8abbH/eWaw qcXCrjuL5lH4iOdGSmW8ETGO90FqewtH2/un39nuY8zjhg+ihahs9FL8W3oX8EPpoDKPmAcgby8G hDpPjP3PtjEbv3bGwDZ6jVN7PbW4ZQi+ziPXK2aT0ThidkQaipdGHD5kjFl99Y9oP2/Pv+yP9H3Y w10vWmfA+HINevfy4uWg3jaGb8D+Z3nVXdx/z/i1euMjP2WOjTAC3TjCKfWiV3bi6z1JaD6IIq3t LeluO+ZZteXVvYa2Egun8E8AN00v/G7KHXd3CvJ0MJYD9FjVxnQPGHBu24vm8H4tmSsiKX2EFoFK 2B2eIvngyU/WjwhNm+NhstWQj3AqDWi/UiN8P9VMR+f7+MRcqucJ9GnzCNcTXwZXZzK28uRnpLGk ZzwvvpU8Amntnv1i5VG7u5nYC9X9BfX78KsT81x3ksIDfvo4sM/JEm/w92E/6xFLXg== ]]\x3e<![CDATA[ rMvTfmSo6L6V5O2+AB3keG4ba4+R4/XJZHQd7ZtjGtZ9Q59Zx5Q82n6n+HBbXdsMzpMkym0V2r/d fYCnZP8endiVFimuo/XutzCvnhqumEDRoj1vZEzjMNb86hUhQrvfIxzmcuaNvOd3UWLfZwZOnjjV Iyfvp+RJoXHevKn6nTNDRUWgdhiLMD0t9Sua2O6iDJ3snl8hA3riowzn6D7Uhc6PKtcBaGpQ48iv hxFe/M2Vdj4GPe8LANCQ0RT7YmjCW2KYfpypsb1nfEsxBhnDYx8OGLI/fUalntQVAP9vn7+8xjTd SjaQtuOWf7e8sFbnzrWmW+xkITZuOVM8emWw5fTKS5kHOCzRwa8763C/vvQc2PCcZLwd+LUvqadz pTvp1vHe9s5t0bbJRz3CIyoIZX3JA2SoiNhoGY8rYprlHGF8jSlxtXddAn7Pkfd7aCC+zIX14Doy CvjVkCHAbeEZcgkq41Xq+6WhvWJ6WRl9ob1nxvO+I1fB/uH+TIZtV2oblrXqdf6zHHIzG3Cqg+c2 HTErUt+iuLLHtS03veaa1O6QjTEVRFNPmZsHpaIl8nfMFc1Piicj4+3oeUEzkjwFTEIx+Tk5AOPM GFjK1Nw6UPe7RLaW9hFT1+j+IA/1LtfGt/yQy3opn0IuQtrqTz2XRhbgc68rna8moc+DYcXnRdK9 j/AgjhKOwam4RUP0JFeEt8U4z6Ieey0z8wh9iaTFNIIuGyPiSs5wICl2ZbqALrWPgI8q14OPHH80 3MjAEntCyZgLEoZhlwPkwrZFBo7q0+nC2tim/3ot+18jT+BY8n1Tg3Y+SnaiIU5Pnd814sC+55CV Hbm0RhudOx3hJxPhc+Fw2A1uaN+5Bg0yu/66/7FQvc5Ixb/cm5gmHTTAliViLOtbdim3I3ucLxy3 dE484jRSrWOhgzBnHmGuwfL5XNIF+i3TChp9Q44YuVs/8iraGkxzaArGjCoxMKHDTp+0Q2iVR+CI v3luL+Mdy6rztEyhqaWVTqGWNg9g9UFxq3hvPBPzcW/UCt62+a2hp+UZZ1AV+kAnoSNeqEMJ5+aO FXLkMnAIiPX1/pmsiYMzEspVdPp3d6lVhTz9zDIwgO4teWvaFFi97JT+2R56P8vkyuFCAhqvzEFR DeIfhLQnRkOG6r4P+/SHWN2U9hmhqtey9Qjn8bisDylxjVBR9h5awnJeNi4+FTpslVBQjuIMO77q 0FE9j5yBdoSmrKzpBtn7av9sfD3yfxsbX5GFGFbeNV5opCbuM4zs+qYtUQWYv8ZevrpiOEwyRnQW YXslEbFlhhoXQV870lE51BnrZTzHEgw7b6uq0H80xtQlunGOdCMzP1LPdSKimMfGnMbOdi5HmNEw hja/D7tVGuWINACN0tri0ZcwjYjVn3fOFyc0N+HXtKI8Pn6shpSSERJtaZ0nzmAu1WHP5Ugpmlxg nJHJSxPZ+axZnpGJa3T2mvptp13RKWDEjTisSUEvhhZ3gc0OfYQeuimOR/Lj3GtAR22astClID+W 685X8uxLVNBzALoJnOEQ8BWCEa35fMwjx0N0Vcg4OZP734e9t9Dj3tbnoHdvRgWakxMnVtlxgJ5B v5e5lHhxXp9d87ZzBmgOdZ3XIm2gCNhHaKHqKDNsiC5MLaKXzMN9J1VtRmFLma/eKVz/vJGpwm2l vw2X6NR05CRtjcxZ5TO0XDD5yKmE5JF9bm4IIOPdw3g9kd5jNsVHKEt6L0KE5xHC3MO9emVkO8T5 kvkI7ufur1Ce9ulcoW+mPM/zWHLY7Phl3cVYro6zXUpq2VfX5yzpxlAXIb/ALYxDWQeMXD3fKmx8 31FL4Bl1EeqOyG7DuAzgZ1lEuY8ubhXSY+O44qKkO4zsYKuL2I7w+p/Y2BNlHWp24sEobSOyjNSj 5wGOK6azVvN8nfijtlLBivrEGhwnW3OJVS1R0u1pmbhgz64Y8ENMhW5cPe7Za3StNp4aS6IgIY88 03FceMcRQjMeiSwYn5ycpnz4WfJjh9bP6MqZZ/D6znUGaFFYYzJFbNQH6JE4x7WdFv08WqPaeMdh a4nk/3p/sYaPBfNZ8+deB8uxr4UG+vVuleU9zSOwn48Hg0wLoN9oTT0RGgqlfX4cJ2J8afdEy+4N Ln15Oe0zm1u0CESzQyWO8Txu4Vi88R1HZh9RGTPeH3UOsLVYlsGr+hL7z+RL5NnYN/HJAdBvxK2T 8QIsJzO2T4zBx/NIvQQn29ZfaOIaXmErNUWkl6SSOm7oRdd8a34C6ESVi/lcileM7eFFRyIX2/aM iQ6L/y81x/Pw2+YBZt7m8JNv8rF1Bd3lC6eSyn5x5k08l6B+aEr/X/a+tr2JW2n4/tzr6n/wuXto oWCz0u5qd4G25IVQaCgcApS2p02NvSEujp3aDi3948/H+5kZaSStvU52TSB26vNC7LF2VjOSRvOm EV6gnNpFYVRruiacz7VQioHBgGI95UM5meJENJhyrJ7hPvSjbWyVLva24J3hqdMpTB+knsqaskLe rlVL0tim+Nr9jdKdmibvLvX2FfO80NEIs1YktzUqHym5WgPC67CcQI+Vh4GCH0ZGxqYtyQ4zkfQO MvfEiIs8oRtbJ5tKwWm8pBIoPnMiE0etdYQjXHDYR8b2gIqLOYaRVmAQrc0qiNyRK6EvgTVbdMCn q9xuxRqqDLxIHV3CZDCgm4hFXOYO0UnyGrIxbtQd6XtrhEkgQAyS0xJBPQ9d38xFsSyITIdjtleF ZKZL5dTvxENAFwLqLqC03LVEJ9JsQ2E2b5TN3JFWCskw8idPZjBQ1qM940EV/Iwx4o7Z4O3HEe8D Jj6CwNjqK0LY2a79d7RF+mmisbYjsc8Og8sDVyYRAE+PiNAAI3eaDOE6MkbHFSQTmEhOO2c7oOz8 iVnKERMRS0damrHR4KHNUu4Dn6DDlqFiYGotNRQyivsAynVkJA/nUWf6uikNVNr4JgzWfybNHW0a Hid2oCPjgQ6Mk0+3NYlViNgsr4j9mDRXnRYU6bgpwVGIWLQmfo8k4w3vDp6yfWpPgJk7NSN7SkQD VZKZxRF6p6nQRZMmzGLFGEwiF2KIjS6Gd/naUybuGCfuA4r5Zk8ZxRy58Ax9un5cMdMybyszgTjq Qsi7VsiaamR8pPh8atdAaLV7RJBwD+iiPbPB2iMgVj/D2BEDaaeyu7E0B5egZyYeyZeza8LiiDd5 qUPkdFIw9DQCUt/NIGesPVAR2sg/hnLaCTHJB0MpaquBJkeD5plV8VIesjDx9DMwXJgGq+CpgHtF MTSj5ir2q7gwC4KNAyR1NyJFpFdLHnddzSfylHB8WZKxvq/ihDtm47fSTBfdCeNrRttAR6WoEzpB DW0A14XYmpannCU0CiUiUbYXacRavAitnRVYPnrBRGkU/UgficiY6NCGPr1TiiHFUZnDJo6E9xVH LGP4JKyBJ8JO9ogtOyfnjIcIr0H2RIF1HCI8YemZpBG/zTjYSVgnfEbOnXgmxbNjMQjmBOuIeA2z FdbK+MQQmLElgdS4Lthjj3R0a5fhYcDykzKCGbEVc4Ee0VBw/CEwt8NazKG1OGVqjw9GbsFF9lRg pOzJo9T6t0OrcwTu+CailRatDqZjv6yw951BgtPH6fxTym9TMQ+xUWpLjyAauM6GxrbmzJfXONOO Iw1MdUY30RDaOWJdu9S1hAco0zmsOPWimB0b2lXLZ98sAroUwq1ZDeQ9xPjBGGgXQGhDeujvcIdY 2XEkW/agXGYOiKALRfIZ2kzE7nkregNjX6O/RqZ8PCeW7K+R9pCidHYI3u9phbpnFCI8S+z6scfk WXLKTCeCIEznzRHQuVtCVlQZXtq4tKWHodDY9ixJY2t3a6EaRqi3TPMxMr5/ksjOlxSZzCna4wPp fHiuxAAdo9TAJGDtTPKUjjleGfjnQNGRSFdqFnb+EAPKlmux4aTCzAd7yM/NaaXvmDYrO2b/pKsA AOsrMUCKFRkqbLiCbp+1U9JYwXi1bMqKHNm93DJgoItuYmNlT3zx9FHWqsNzxGaxJcAx9kbRWWzr ZCU7Rq8AIdgjazKcEAP7ABN3PC11pim6fxO7sbgRSkA6SN45Q63qoPfXGqeBOTCP180qu3/gErKI yYEU6RoGdicLU7sMU61PNsk77uR3GAv2ryt9DI2KGzhRYCrW6jcaLyD61+1BOXbsYUDBDqeXoxCi R6/AzaYOSSh7PjZVHIQxR6wJaN1cGEKxJzk5bwmBiqW6OYCAsR1gFc8SnMsWQ6b9X8U+ZNaW4TQY jA5FPK2jzEW2BScnITzKuIaFOy9oXNNU18JKqcB6yrAGRhxacR9w41DwwU4+cXhKFQ0T86HGsaU4 ZawmZontvPnono65pAUtBBdmC3hSJ1HIXTCRDgSaCigUwOPJR4FGi5nd1aYuxikYTO5DsfYCxhZ1 pi2V24i5XIc7f2oM5PklPJR2OuHLTEYjBj5TW9AhEFzDg5XG4uiEVv9OXWBc0o6kJ7Q0vQrZqRiY kg0WQaz4ZGxmXFyINYr8sdBApU9B0USwBg/A3UF0zhyKnJGXtowygQgEn1UmzcYh0BE9RGBiLRSo ZjaaQyNRpIttRHyc3sW0Q+YBbZK7DGfzHoWIxQvLIWGgTiDGCHrMPZOxF6+PbekJSluwiNnaTe2J 04huhY8YmIQWaDpMtoIL49sJaTQlRKosF3g+R1oLN7LfxVZjTLTgsTDciU3AHkVFyiA6lmaGJojd +zN3yFqnAWLbVHL/44gTJAKVMNDlTlEuBCOIzNlMzIWImN+83WKvFLM29GZNzKEMhCtpayPYg97G C1xaL0HDk5Tr+HCcEnM37OJTRgvGrBQrXGkdWwzOwuOM10hx2iC+zmTXYf4KL186a2bTWsyZE4Kn 3NYcZ6O3BRZBxpODPLMWA9kcunFsMbgtjQ+TlR6lN42NTYI7R8p7M8ITu6uxEMBD+mx+cAQqSjyL jRR/gzmxWx2avPx8lFkDMzSwTGcYGd3APm28/2wraaDxp9PwZJwkRafgDGXW2xWZq9+NcMwYQypt cYRYxx2pJR+gj1wcL0o5lQ4xBKbEEgATVtylieNF+AbW0vx0mdRqON5gpjqkrIGBYLRU1tasSA+B dFWelM0RSfk0BntCLNwEDDzlCXEonuk26yK1lXkoTJd6NEe21Idx2yFQskXMihqiZXvCuU2wB7ws 9QWahjtcAiMyJhhdT8+KhQxcfk7maUiUirXL8FhH+kkWZpykl9pid5ng3EFzxIPG3erBMbrC7TxJ 7GmM2E9KweMjGkZnwJg7oQE6ZdPZNQjWUSLEG5gcSsyitdqF5AzIuTU4FM+oJLaNY8HCELbNlIEW Q+bMf4CnEfcskdboiyVX0UrR2tTskRww9lwFAEytcShdbqbUQWmzNhObCeoqWRipFaM5a+0J4eeH JikvjMSUUEEMVlVUJkKCwJDt9NSaDnFo3WWuollsT6WTDqzn4ynlOOIkY93Y5J1TrQ== ]]\x3e<![CDATA[ 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 ]]\x3e<![CDATA[ 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 ]]\x3e<![CDATA[ mmUtGakA3yhbUjSagCdIsQcibQkRhdR7y4umEC14scLuR61MqNg1BFDaChGnRgXvCrIgdO8SERDn vxx6BLAsxPfaRjGMXCodaUBrpDJZYIDI4CNyndkEf1OVJI6TOC5xKB2/gQwL44HZ1bAoo8GKlYgl PRjGigBBBBMIARIHKYP+IO80pixI8XWtMIiVxpS1sixSBViIsy8E7DjQaZI1QtEKkwxYkABvlEoR wH0KpZTUTwuDvmdpGBlMMKE17wiG7JEEyPSIwEQRMQ4kNA1DGEHkE0xXkSmCRSEMFk6KWCUaUBgT BsBT0LdAhbGDhcASkeC7EhzguOFNCBhrJUI9TSLoUpRyMyQyC4Iwc4jcpPReh7OZOO01gy4Ikbh+ 4yQLYI75xOHyCYWMHQuayDklY8elZijduiMI9tMCmem4GOFZBYwQLRmoQKNQMGjIIZEhhyzN3E2c CNA6jpOGTOFh1YhaKkphNkkFqwj4rmCJRHHcgNUfhJHEJywICAlCejV0GtZJ6INgmYoskxJhqQCM KBckYoYJFPqdYekEqA8+/eQ5SjUQYF14UePqtcbLH0C87pfKMgAvKs3g0TJ5huAFJZruzEIyDR9d SKr5fPHl2pX9Esl2Zb++bLuyv5h0g+cWkm9X9ssknIbWl3H03IyUA2iJnLuyv5ikg+dKZB1hW0Da Ad8WkndX9heVeDCFFpN5er4vIvX0IltI7sGjZZIPwYvIPpgKtaXflf0S+QfjNisBr+wvJAOv7A9Q G766MRgOGplUWgRajRFwZFmYAduFzb1HxZBQAgNh/qg0I/nIIBjhLAq1aAApAWtNlML40V2tmML8 CUthKAIyLVT40RIQ8TDRioXpSAnIe5BGFodsFuT1YprO3VN2jRKeOKDPARi/Er44qPcyHNVZ3nhQ r/sOQSnQY4frVimw8HgJnxyw0KcSXvmzS7PpOQLBap0UrXSgqHFzczjsQ9sHInwCZm4+GtwboM/6 /kmva8xdeIkx3PxWfx0PR5NnbL2RVIO1mjUiWGYK5HEUw7InCmQktd1z82ne7uusfHyigC/b6/d0 aV6wuO6Pet3v8ncGczz79qdgho0nI8p78PqA5t7+p59kdnpY289YbGVG3ObJZDIc7A/fgnE5ZcN9 eYKM3Lbrcp5dFk2ZZUEDjEaQN0EgcNOmhZrSJzKo3EcQVFI3aepNRwYp7nD4JTFaYMNofrJBPyNK /RgqFBmKeuCyID2PPuzaV+sv2Bj2IPjCKOIGYUUlnt6zqz/gbxmYqOYB7JVHg1bdAuRGKODpI/oL gx2DpgAyXsWoKAT8CHwyPQqYaP6EbRPsCvQ+kLgvEBqFOxmhJrqF6Rl9wt9jmTTsw6BNNTQj+T1N jd72ODDmDvULvzIefI/GvmVIgYabr2jJPB+gB6HbeD1qd3s5TLrwGg14M8PBF95ZKNHYfE02Z4D/ QeUJOqXQkicAvDKFrb8BWwIY9UfFlnFpSymDxmanKs7NSjhFEhJOGrnNTZjRz3F5wFYVe1PZ49lR kZf8qTnnoz8ahXGyDG4yhwvDPDMH9PTY8idK2QeeWn03tHpkzTzk6WNnjz/o/mTwSO7MH31ZffSh FWiZBf4LHKloZvTD0pYSVKrp0Z+Pc3r0y3GiblgY/bn7gDi/fcDfUuInvb/y/pN8dJB3Jlrgaqxv rHCPGgrYCYr3Eu8QW6O825s0ttqj7hk7xIf09UlFAgFH3nw0S1BmZMtKvW0IBtAXxZsI2o6htlz0 V/gGKiZ/11YYfbIIzQdEDC+UpBrrD1qy8q/eQxqT2Vi8VxQ7YHrGnxiTR4kh0NtzQLOAR470hwQW MmhF0vwVGT4A/25p3sAnYo37uek91dSoqG1W6OXsV93LA26qKTjir8qMABlFBjd/oJcq+qvZ1tS9 8hv4TxqEW6YXbrCKXw+0CP84Ch3ocg2wd4RY4rW53Z7kO7283y1V4MyqjIWKaF1GoYhg8/Q+BEkc gZ4ObQKwycs+6GUKq7bqQk20dtRUZuODsaeZkti/iRlKQJrEoULhEEsVxfaYNSj6YGeABGklYSLj MlkBliu9JWnoaZiYHU/Zvzx3QTv9FNUD0yndCfxA1kLs/qrTNKH49L0QfsHtNG64XQn2nwS3q4C2 wADtrnhOE/wFd6pTsWyegQVs7MJuR5QdeaTih8jQGvm0L6j9ze8tdOVMmsMzaUaCzqI5LdJ8oqkk k6OJ3hqiGxVrZoD9IE6jXGWO9Kic9BQnDP4VqcKeJEwyKoP+L1nCdM4+sln+SDI1lPCjNCRJQ1Fg 6OC/8ixyQLTHi1Dk6VkiLLSQQXA6ZfMfLaMwNhTGhkIeKf576lQlCsP3pU9N0RdWp0+dQV/Is1Lw rBQ8GUPvwznOyrAwK5PiD1lUQlpYmJRTT5RQJA1B0tATGCr47/nOyXDuKgvnrbJw7iqbQ5EJIJs5 KBo8Lvz3POdgeOYaC+etsfDMNVZGX2CmoDTTTJp5F7i/5zj9gsJwRcUfMlFCVVAYraknZomRmhat jus5F/Cf8515wbyVFMxbScG8lVROivZl69klG2YwzJ/znHLB3CUUzFtCwdwlVEYKibIj+iuMhsF/ tbfb/D2XKaY1gJJxMUrVLDX8xMy40A+zxNAUi/VsivXcCvnPuU6xKVKiKVJKVssUKdFZpMSaFKPr msEwf85xin3oMXnuGUie8yFoZVIKYSNGGBETMbog0HIQOlkocophcYk5NVGwZYJoaWc7cjuZ3dmE /Ss9o1Q0No51X6KGs1PQPOJspcTaLEVbhY2YeUOQnGF8TO0BIikqykpPoRllh5Tq2bYySIxqXg3v jCY0B69I0oruuHO04tHKEAH/E7a033dJbfnR8Lg7/LM8FmOcbQFNsnpBGeGCMuRwjjHaF1OGwtEs aNeBmqoV0QcfllKwPiKXc5xQfkJkEJgWDEAXEwbtKcUkc6isR9oCMTkE2sUOu4MoDxsDvb6eCrPY +I2ZaWT7xQCd9EMvyhwippFBzATGO8077bArn9RXcT9IgiRT11yu5+bmRqdzcvR0OHFnmO3s0UKI e5q6IUMuBXGmLAwYqRslLUU/WIDXMwvzh9UB8VHilEYNH8zY2CFM3UgoNxssKnxS6jGMDJcyxoCo 0+lZtYXPzEw+BjEpjJZpVXYMHGXTPKrq08D/kzQXKkxFS4UKxVaYBYolq6AhdrLMfpAUZkgiiqPA B0lEaSGLaUKYeDTvqThoKRGk3mMkbeu+a7PKu2DLLb7Git/zmqZfzpXjhaz4xs3vh5OneWc46sJ4 mFjJXPbPSOitjQf3zRg+OxiOjri6ne4JyOTu8FW+v/Eg24eO7E3e9fN993bTbJElKCjjAmeTXMRD hoy26Rozkcfp6X/kQP4inVlIUwttZjUWJK+3RMuBs0t+WijMSI4zxYkvjU+DWYE1I9Km1/ScdT4t DjxBxKBZiTIjtStFQCtIi2TeCtZaUMwrOPSlhZi7gumpOLTSIvSlRc13bVZ5VxZOveYMaXH5V/gZ MfCpFe6bJxgNjVIMu6hQYNxTgUlCTuw4DZXAH9z/y4Kh2mjhVSbMKkPrmte7cCsvQOWWWvbLnto9 VTMxsyCoyrRlDKS3UjAYhf0TYPzI/FlelX+n1z8q0fR9ff9UJX8m+EZavggx6xfYgLqBDhuDAdeS KebuGdiuB8MPlAe8654tg3nPHhgjBFNXgywljVMqqSN/DENBGwmNQrRSzCcvAfGTpyhtkVmEUfki lGkLUwww51boNCnVSsKU8qngHZhEnYoUBKIIEkw1ge4FUoeoIuwq5myHcSuUkSx9VpJmFkp4NgIB GivtxsCs8BRD+HErkkk8571J0kqzOEa7WrWCUEqSxEkrUSKjzTMWYZDOeVYgZkluYNy8tBSv1GcQ uC2lYh1dDDKhbe8dPxHKF1bzdbhH7fEb/fHlV/jvCf5DJ8Vg8ua37Dea2E/bY33CbB/wgmC9rzeJ /G2Pzoi/a7z8HiE/2+Frkoeb/vkF0ydC9OS+PDylEYJ0Q/2/1JsQUYNcL9SnK9Sh7fakfQuWiUw/ /eTlg0/+573/8//+b+5//h/+Pv/n//u/j/P7nI6vf1///j/LMD9P//2s9fV+/0G5AFsySgWSaN9a 8QVQJ7y+r6DfZI2dk7//ftdA+VhUAa7skzR1msD+y+tG5xhNOLuIEe32Bm/y7rTO82DwNh9NZuFb /d7xMSgp0/Dt3hjVoa6nLYOePNs1LSYliuazNYmpwwbPZxWRmeMItDl8eaIpRE8l9vGx/vOaoLOq CR6zmVVOPKivijgM5dAChgONZlZD8aCeQqKPLUxpKQ7o6SlX9lFTQRpr6yqg/C6urYCa+x76Cp7r WVxjwQNYi+ssFXterrVc2d/RU0gbotrhNF9jseUJQAvZeNDYOJkMG3pt9/7OnYkza1c+fjXOR2/z 7j7o//u61bi4ftyhpcweWip45gMvGTYIE7TB4IOMg1R5HzBeFWHi9/TfuuffBRqXePoPPkiZmfQF DxhgIib8TQO9AtIopRRwoX9hwJbR2oMwcsBdDZQiivxHZQsGLfWwewDqg0FmgLIlcER3p4BhQl5+ Rg8f4ijR2HQvGELYhH0VwYyPXxPlHrV0W/QehHqxVcYzNmdsZKWZYIKkitxzR1NAjR4dSiL2uwAr hw79+Z2H5Z6pNC32Hv1fKvUJz1qw8JLQQ+9DbO8d0PW+ADTjatDbYbO98Iecu+uPuCXKPuoIN9h9 gB3xGZ5ptjYjaBIpUeSlD9TERiC3ozj0GBKh9IiSIjPjVpxmPt92CZgGQeJxGCBZEvgzwQNYVlqY x0kPRqRa1JYbtgc+I21ffU5akuyzjmyD3gdYTs5wzHASFwEe+Cxw0geaSd8SKa8yszCgI2k0taZw LcL2WuSkxKPliTeBAZKQ187h9yGWlw7oMdMHErkWveWI7UVBEnF/C5KIyXKSyJLOksgDOEk0zTXN TelxiZnpw4hWkEWwE3vsEPaIuuMkyCHYzqbEE0Z4wgJ7MalZhqm3wAsQ5qQHdJwsAJFUh5654Xrh cdJ212OkpYlhjmqN2//OXJzhlmYi7OSZmmKiDyMyY8AS+zxD1SZSRSkJu30YyKTAw7CFKZgeC0E3 iEAvc6h9ADPQwRz/fBiSaDEzD+zrPebZbnrMs7QwzFGrMfvfmXkzXNLMS0FmyLi4yfgwojD1pCrx IAW0QqUF5iUtGSZhgXcJ6BqJv42qVgp6YOww+wDmnYM53vkwpNBiZhbw2z3W2U56rLOUMMzRqhH7 35l1Mzwye7XQh9d91vkwIlAIt/nrxYuaaVrcUAQurajIO3x/6ItL7CBVHrCoPQDzzsEc73wYkmgx Mw/s6/1Fy930mGdpsQ9aag1m7zszb4ZLvI8YBYgqiqRJQWcEwyFKjSZB6lXWAs0idSojf/c1Rob5 CqN7zih9DrMB8Ot9dZGsMpUUtEUh2eAzqOFvlJhNit7PAE9VZJCvKbrnmAEWswPQ6w== ]]\x3e<![CDATA[ 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 ]]\x3e<![CDATA[ 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 ]]\x3e<![CDATA[ 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 XWbknf94TNAs/emL7xnLrxuOufia4miVj2/dwZgaCfca+a/7zC/oqmn/89fMqgJHdDv3VU8amj74 6tlOzKOmyrAQDfoTozS/Fr7i3KCxmTM9TpkbP/1r16fLzZdZftEP9JoyfmlyiRnMEY9qbFzKV5og HtWGh45p04TDQ+aFFkexO95q1QT//HXhrYhPv/Xl13rduCErDq1mH6LU7YEZZUvGrEx8DNeBP1Xp Xb+bscEGddl95qQhrr/UxHkzzY6+e0ivx9dbC01GGhZDsGYarWl8+zX1mD8RSUiIpvWL/xZ1wi83 nr34brBz94v8GdgBB9LfP7KNAeyer3d3fnv0462df33Zwm0tyF/dSlkDaP4b9JntN3d/+Oz5663e r/t373Xe/PG53ts8HSOePJlv7vi6yPUfyNxBa61o8VBXt183r32jdcInD6791216BXss+Ozuiy+u ZluHJ09/2v7uuz82fZI29/ONp4Ptx3f3fh29QuW2f/dIFF9znUyLW98H/f07zd92htO/3vzfaz+D ofri+F7nxrObm+qGbHqmpdh89Xo7//Let07lIgXq4UnmeGO0s/+mjz3rztcswH5FAw== ]]\x3e<![CDATA[ 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 ]]\x3e<![CDATA[ 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 ]]\x3e<![CDATA[ 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 ]]\x3e<![CDATA[ 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 ]]\x3e<![CDATA[ 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 F8COqgAV5/8D8Oh1xQ== ]]\x3e</i:pgf></svg> </span><span>Languages</span>')];
    };
    var getLanguageSubListItems = function getLanguageSubListItems() {
        return [new ListItem('<span class="gear-icon"><svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M14.7,9.6h-0.8c-0.1,0.5-0.3,1-0.6,1.4l0.8,0.8c0.5,0.5,0.5,1.3,0,1.8l-0.5,0.5c-0.5,0.5-1.3,0.5-1.8,0L11,13.3 c-0.4,0.2-0.9,0.4-1.4,0.6v0.8C9.6,15.4,9,16,8.3,16H7.7c-0.7,0-1.3-0.6-1.3-1.3v-0.8c-0.5-0.1-1-0.3-1.4-0.6l-0.8,0.8 c-0.5,0.5-1.3,0.5-1.8,0l-0.5-0.5c-0.5-0.5-0.5-1.3,0-1.8l0.8-0.8c-0.3-0.4-0.5-0.9-0.6-1.4H1.3C0.6,9.6,0,9.1,0,8.4V7.7 C0,7,0.6,6.4,1.3,6.4h0.8c0.1-0.5,0.3-1,0.6-1.4L1.9,4.3C1.4,3.8,1.4,3,1.9,2.5L2.4,2c0.5-0.5,1.3-0.5,1.8,0l0.7,0.7 c0.5-0.3,0.9-0.5,1.5-0.6V1.3C6.4,0.6,7,0,7.7,0h0.6C9,0,9.6,0.6,9.6,1.3v0.9c0.5,0.1,1,0.3,1.5,0.6L11.8,2c0.5-0.5,1.3-0.5,1.8,0 l0.5,0.5c0.5,0.5,0.5,1.3,0,1.8L13.3,5c0.2,0.4,0.4,0.9,0.6,1.4h0.8C15.4,6.4,16,7,16,7.7v0.6C16,9.1,15.4,9.6,14.7,9.6z M8,4.5 c-1.9,0-3.5,1.6-3.5,3.5c0,1.9,1.6,3.5,3.5,3.5c1.9,0,3.5-1.6,3.5-3.5C11.5,6.1,9.9,4.5,8,4.5z M8,9.6C7.1,9.6,6.4,8.9,6.4,8 c0-0.9,0.7-1.6,1.6-1.6S9.6,7.1,9.6,8C9.6,8.9,8.9,9.6,8,9.6z"/></svg></span><span>Settings</span>')];
    };
    var getSettingsListItems = function getSettingsListItems() {
        return [new ListItem("Font Family", Settings.FONT_FAMILY), new ListItem("Font Color", Settings.FONT_COLOR), new ListItem("Font Size", Settings.FONT_SIZE), new ListItem("Background Color", Settings.BG_COLOR), new ListItem("Background Opacity", Settings.BG_OPACITY), new ListItem("Window Color", Settings.WINDOW_COLOR), new ListItem("Window Opacity", Settings.WINDOW_OPACITY), new ListItem("Character Edge Style", Settings.CHAR_EDGE_STYLE), new ListItem("Font Opacity", Settings.FONT_OPACITY), new ListItem("Capitalization", Settings.CAPITALIZATION), new ListItem("Location On Screen", Settings.LOCATION_ON_SCREEN)];
    };
    var getFontFamilyListItems = function getFontFamilyListItems() {
        return [new ListItem("Arial, Sans Serif", FontFamilies.ARIAL), new ListItem("Georgia, Serif", FontFamilies.GEORGIA), new ListItem("Lucida Sans, Sans Serif", FontFamilies.LUCIDA_SANS), new ListItem("Tahoma, Serif", FontFamilies.TAHOMA), new ListItem("Times New Roman, Serif", FontFamilies.TIMES_NEW_ROMAN), new ListItem("Trebuchet, Sans Serif", FontFamilies.TREBUCHET), new ListItem("Verdana, Sans Serif", FontFamilies.VERDANA)];
    };
    var getSupportedLanguagesList = function getSupportedLanguagesList() {
        var i;
        var languages = [];
        for (i in SupportedLanguages) {
            if (Object.prototype.hasOwnProperty.call(SupportedLanguages, i)) {
                languages.push(new ListItem(SupportedLanguages[i], i));
            }
        }
        return languages;
    };
    var getColorListItems = function getColorListItems() {
        return [new ListItem('<span class="cc-checkbox cc-white"></span><span>White</span>', Colors.WHITE), new ListItem('<span class="cc-checkbox cc-yellow"></span><span>Yellow</span>', Colors.YELLOW), new ListItem('<span class="cc-checkbox cc-green"></span><span>Green</span>', Colors.GREEN), new ListItem('<span class="cc-checkbox cc-cyan"></span><span>Cyan</span>', Colors.CYAN), new ListItem('<span class="cc-checkbox cc-blue"></span><span>Blue</span>', Colors.BLUE), new ListItem('<span class="cc-checkbox cc-magenta"></span><span>Magenta</span>', Colors.MAGENTA), new ListItem('<span class="cc-checkbox cc-red"></span><span>Red</span>', Colors.RED), new ListItem('<span class="cc-checkbox cc-black"></span><span>Black</span>', Colors.BLACK)];
    };
    var getPercentListItems = function getPercentListItems(numArray) {
        var items = [];
        var i = -1;
        for (var len = numArray.length; ++i < len;) {
            items.push(new ListItem(numArray[i] + "%", numArray[i] / 100));
        }
        return items;
    };
    var getCharEdgeStyleListItems = function getCharEdgeStyleListItems() {
        return [new ListItem("None", CharEdgeStyles.NONE), new ListItem("Drop Shadow", CharEdgeStyles.DROP_SHADOW), new ListItem("Raised", CharEdgeStyles.RAISED), new ListItem("Depressed", CharEdgeStyles.DEPRESSED), new ListItem("Outline", CharEdgeStyles.OUTLINE)];
    };
    var getCapitalizationListItems = function getCapitalizationListItems() {
        return [new ListItem("Only When Needed", CapitalizationOptions.NONE), new ListItem("All Caps", CapitalizationOptions.UPPERCASE)];
    };
    var getLocationOnScreenListItems = function getLocationOnScreenListItems() {
        return [new ListItem("Bottom", ScreenLocations.BOTTOM), new ListItem("Top", ScreenLocations.TOP)];
    };
    var getSelectedValue = function getSelectedValue(e) {
        return e.currentTarget.getAttribute("data-value");
    };
    var onLanguageClick = function onLanguageClick(e) {
        var languageCode = getSelectedValue(e);
        this.subtitlesManager.dispatchEvent(SubtitlesManagerEvent.LANGUAGE_SELECTED, { languageCode: languageCode });
    };
    var setLanguage = function setLanguage(languageCode) {
        var isEnabled = this.subtitlesManager.isEnabled;
        if (languageCode) {
            if (languageCode !== this.subtitlesManager.currentLanguage) {
                this.subtitlesManager.disable();
                this.subtitlesManager.setLanguage(languageCode);
                if (!isEnabled) {
                    this.subtitlesManager.player.dispatchEvent(PlayerEvent.USER_INTERACTION, { "interactionType": UserInteraction.CC_ACTIVATED });
                }
            }
        } else {
            if (isEnabled) {
                this.subtitlesManager.off();
                this.subtitlesManager.player.dispatchEvent(PlayerEvent.USER_INTERACTION, { "interactionType": UserInteraction.CC_DEACTIVATED });
            }
        }
        if (isMobile) {
            this.close();
        }
    };
    var openSettingsMenu = function openSettingsMenu(e) {
        openSubMenu.call(this, e);
        this.settingsList.firstChild.click();
    };
    var openSupportedLanguagesMenu = function openSupportedLanguagesMenu(e) {
        openSubMenu.call(this, e);
        this.menuWrapper.className = "cc-supported-languages-view";
        this.supportedLanguageListScrollbar.resize();
    };
    var openSubMenu = function openSubMenu(e) {
        e.preventDefault();
        if (!isMobile) {
            vdb.Utils.replaceClass(this.outerContainer, "cc-hover-mode", "cc-locked-mode");
            this.isLocked = true;
        }
        this.settingsMenuOpen = true;
        toggleSmallPlayerMode.call(this);
    };
    var backToSettingsList = function backToSettingsList() {
        this.menuWrapper.className = "cc-settings-only-view";
        this.settingsListScrollbar.resize();
    };
    var resetSettings = function resetSettings() {
        var i = -1;
        for (var len = this.settingOptionsListsResets.length; ++i < len;) {
            this.settingOptionsListsResets[i]();
        }
        this.subtitlesManager.resetSettings();
    };
    var close = function close() {
        if (this.contextBindGroup) {
            this.contextBindGroup.unbind();
        }
        vdb.Utils.removeClass(this.outerContainer, ["cc-locked-mode", "cc-hover-mode"]);
        this.isLocked = false;
        this.menuWrapper.className = "cc-languages-view";
        if (!isMobile) {
            setTimeout(function () {
                vdb.Utils.addClass(this.outerContainer, "cc-hover-mode");
            }.bind(this), 500);
        }
        this.settingsMenuOpen = false;
        toggleSmallPlayerMode.call(this);
        if (this.wasVideoPlaying) {
            this.subtitlesManager.controller.resume();
        }
        this.wasVideoPlaying = null;
        this.subtitlesManager.player.dispatchEvent(vdb.skins.CcMenu.MENU_CLOSE);
    };
    var onSettingClick = function onSettingClick(e) {
        this.menuWrapper.className = "cc-" + getSelectedValue(e) + "-view";
        this.settingOptionsListScrollbar.resize();
    };
    var onSupportedLanguagesClick = function onSupportedLanguagesClick(e) {
        var languageCode = getSelectedValue(e);
        this.subtitlesManager.dispatchEvent(SubtitlesManagerEvent.LANGUAGE_SELECTED, { languageCode: languageCode });
        this.close();
    };
    var addSupportedLanguageToMainList = function addSupportedLanguageToMainList(languageCode, target) {
        if (this.subtitlesManager.isNativeLanguage(languageCode) || !target) {
            return;
        }
        var clone = target.cloneNode(true);
        var autoTranslatedClass = "cc-language-auto-translated";
        vdb.Utils.addClass(clone, autoTranslatedClass);
        vdb.Utils.removeFromParent(this.languageList.getElementsByClassName(autoTranslatedClass)[0]);
        addClickListener(clone, onLanguageClick.bind(this));
        this.languageList.appendChild(clone);
    };
    var onSubtitlesLoadError = function onSubtitlesLoadError() {
        this.subtitlesManager.dispatchEvent(SubtitlesManagerEvent.LANGUAGE_SELECTED, { languageCode: "" });
    };
    var onSubtitlesDisabled = function onSubtitlesDisabled() {
        vdb.Utils.removeClass(this.languageList.children, "cc-selected");
    };
    var onLanguageSelected = function onLanguageSelected(data) {
        var languageCode = data && data.languageCode;
        LOGGER.debug("onLanguageSelected:", languageCode);
        changeLanguage.call(this, languageCode);
    };
    var changeLanguage = function changeLanguage(languageCode) {
        LOGGER.debug("languageCode selected", languageCode);
        if (this.subtitlesManager.isSubscriptEnabled() && languageCode !== this.subtitlesManager.currentLanguage) {
            var supportedLanguageItem = this.supportedLanguagesMenu.querySelector("[data-value='" + languageCode + "']");
            selectSupportedLanguageItem.call(this, languageCode, supportedLanguageItem);
            addSupportedLanguageToMainList.call(this, languageCode, supportedLanguageItem);
        }
        setLanguage.call(this, languageCode);
        selectMainLanguageItem.call(this, languageCode);
    };
    var selectSupportedLanguageItem = function selectSupportedLanguageItem(languageCode, target) {
        vdb.Utils.removeClass(this.supportedLanguagesMenu.getElementsByTagName("li"), "cc-selected");
        if (target) {
            vdb.Utils.addClass(target, "cc-selected");
        }
    };
    var selectMainLanguageItem = function selectMainLanguageItem(languageCode) {
        vdb.Utils.removeClass(this.languageList.children, "cc-selected");
        var mainLanguageItem = this.languageList.querySelector("[data-value='" + languageCode + "']");
        if (mainLanguageItem) {
            vdb.Utils.addClass(mainLanguageItem, "cc-selected");
        }
    };
    var updateLanguageList = function updateLanguageList() {
        var items = getLanguageListItems.call(this);
        var currentLanguage = this.subtitlesManager.currentLanguage;
        var selectedIndex = 0;
        var i;
        var len;
        if (currentLanguage) {
            for (i = -1, len = items.length; ++i < len;) {
                if (items[i].value === currentLanguage) {
                    selectedIndex = i;
                    break;
                }
            }
        }
        updateGenericList.call(this, this.languageList, getLanguageListItems.call(this), onLanguageClick.bind(this), true, selectedIndex);
    };
    var onCcButtonTouchStart = function onCcButtonTouchStart(e) {
        if (this.isLocked) {
            this.close();
        } else {
            if (vdb.utils.Common.isTouchClick(e)) {
                vdb.Utils.replaceClass(this.outerContainer, "cc-hover-mode", "cc-locked-mode");
            } else {
                vdb.Utils.addClass(this.outerContainer, "cc-locked-mode");
            }
            this.isLocked = true;
            setTimeout(function () {
                this.contextBindGroup = new vdb.events.EventContextBindGroup(ec.bind(this.ccButton.parentNode, "touchstart", stopPropagation), ec.bind(this.ccButton.parentNode, "click", stopPropagation), ec.bindOnce(document, "touchstart", close.bind(this)), ec.bindOnce(document, "click", close.bind(this)), ec.bindOnce(parent.document, "touchstart", close.bind(this)), ec.bindOnce(parent.document, "click", close.bind(this)));
            }.bind(this), 0);
        }
    };
    var stopPropagation = function stopPropagation(e) {
        e.stopPropagation();
    };
    var toggleSmallPlayerMode = function toggleSmallPlayerMode() {
        var isSmallPlayer = this.videoContainer.clientWidth < 450 || this.videoContainer.clientHeight < 300;
        var isVideoPlaying;
        if (this.isSmallPlayerMode && (!isSmallPlayer || !this.settingsMenuOpen)) {
            this.ccButton.parentNode.appendChild(this.outerContainer);
            vdb.Utils.removeClass(this.outerContainer, "cc-small-player-mode");
            this.menuWrapper.className = this.settingsMenuOpen ? "cc-" + this.settingsList.getElementsByClassName("cc-selected")[0].getAttribute("data-value") + "-view" : this.menuWrapper.className;
            this.isSmallPlayerMode = false;
        } else {
            if (!this.isSmallPlayerMode && isSmallPlayer && this.settingsMenuOpen) {
                this.videoContainer.appendChild(this.outerContainer);
                vdb.Utils.addClass(this.outerContainer, "cc-small-player-mode");
                this.menuWrapper.className = "cc-settings-only-view";
                if (this.wasVideoPlaying === null) {
                    isVideoPlaying = this.subtitlesManager.controller.isPlaying();
                    if (isVideoPlaying) {
                        this.subtitlesManager.controller.pause();
                    }
                    this.wasVideoPlaying = isVideoPlaying;
                }
                this.isSmallPlayerMode = true;
            }
        }
        if (this.settingsMenuOpen) {
            this.settingsListScrollbar.resize();
            this.settingOptionsListScrollbar.resize();
        }
    };
    var addEvents = function addEvents() {
        this.subtitlesManager.player.addEventListener(PlayerEvent.AD_START, close.bind(this));
        this.subtitlesManager.player.addEventListener(PlayerEvent.SUBTITLES_READY, updateLanguageList.bind(this));
        this.subtitlesManager.player.addEventListener(PlayerEvent.SUBTITLES_DISABLED, onSubtitlesDisabled.bind(this));
        vdb.ctx.addEventListener(PlayerEvent.PLAYER_RESIZE, toggleSmallPlayerMode.bind(this));
        this.ccButton.addEventListener(this.clickEvent, onCcButtonTouchStart.bind(this));
        this.subtitlesManager.addEventListener(SubtitlesManagerEvent.LANGUAGE_SELECTED, onLanguageSelected.bind(this));
        this.subtitlesManager.addEventListener(SubtitlesManagerEvent.LOAD_ERROR, onSubtitlesLoadError.bind(this));
    };
    return { init: function init(subtitlesManager, ccButton, videoContainer) {
            this.subtitlesManager = subtitlesManager;
            this.ccButton = ccButton;
            this.videoContainer = videoContainer;
            setStyles.call(this);
            buildMenu.call(this);
            addEvents.call(this);
        }, buildSettingsMenu: buildSettingsMenu, buildTitle: buildTitle, buildSubList: buildSubList, modifyListItem: modifyListItem, close: close, settingOptionsListsResets: [], isLocked: false, isSmallPlayerMode: false, wasVideoPlaying: null, clickEvent: vdb.Utils.desktopOs() ? "click" : "touchstart" };
}());
(function (def) {
    def.MENU_CLOSE = "CcMenuCloseEvent";
})(vdb.skins.CcMenu);
vdb.skins.BaseSkin = vdb.core.Class.extend(function () {
    var utl = vdb.Utils;
    var urlUtils = vdb.utils.UrlUtils;
    var ec = vdb.events.EventContext;
    var PlayerEvent = vdb.constants.PlayerEvent;
    var Event360 = vdb.html5.events.Event360;
    var UserInteraction = vdb.enums.UserInteraction;
    var VideoPlayType = vdb.html5.enums.VideoPlayType;
    var controlsLocked = urlUtils.getParameterByName("qaptlockcontrols") === "1";
    var buildControls = function buildControls() {
        this.videosContainer = this.player.videosContainer;
    };
    var setStyles = function setStyles() {
        utl.setStyle(this.container, { "-webkit-touch-callout": "none", "-webkit-user-select": "none", "-moz-user-select": "none", "-ms-user-select": "none", "user-select": "none" });
        this.cssText = '.custom-logo{background:url("#customLogoUrl") no-repeat center / contain;display:inline-block;cursor:pointer;opacity:.8}.fs-outer-message{display:none;opacity:0;position:absolute;width:135px;bottom:41px;padding-bottom:10px;right:9px;z-index:5;-moz-transition:opacity .5s;-webkit-transition:opacity .5s;transition:opacity .5s;cursor:default}.fullscreen-button:hover ~ .fs-outer-message{display:block;opacity:1}.fs-inner-message{position:relative;line-height:16px;padding:10px 15px;background-color:rgba(34,34,34,0.85);color:#d0d0d0;font-size:12px;font-family:Arial;text-align:left;vertical-align:middle}.fs-inner-message:after{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid rgba(34,34,34,0.85);bottom:-7px;right:10px;content:"";position:absolute;width:0;height:0}.hover-enabled .custom-logo:hover{opacity:1}.absolute-wrapper{position:absolute;top:0;left:0;width:100%;height:100%}.absolute-wrapper,.control-bar-container{pointer-events:none}.absolute-wrapper>*:not(.control-bar-container){pointer-events:auto}' + this.cssText;
        vdb.dom.embedCssToHead(this.cssText.replace(/#customLogoUrl/g, this.logoUrl).replace(/#customColor/g, this.player.getControlsCustomColor()));
    };
    var renderSkin = function renderSkin() {
        buildControls.call(this);
        this.buildControls();
    };
    var setControlsSkinLocation = function setControlsSkinLocation() {
        vdb.html5.utils.Html5PlayerUtils.setContainerLocation(this.controlsBarContainer, vdb.ctx.playerAPI.controlsSkinLocation);
    };
    var isFadeOutEnabled = function isFadeOutEnabled() {
        var enabledMiniBar = this.miniBar && this.miniBar.enabled;
        var lockedCcMenu = this.ccMenu && this.ccMenu.isLocked;
        return this._isFullscreen || (vdb.ctx.playerAPI.uiTemplate["controlsChromeless"] || enabledMiniBar) && !this.isPaused && !this.isBuffering && !this.isSkinActive && !lockedCcMenu && !controlsLocked;
    };
    var setFadeOutSkinTimeout = function setFadeOutSkinTimeout() {
        clearTimeout(this.fadeOutSkinTimeout);
        if (isFadeOutEnabled.call(this)) {
            this.fadeOutSkinTimeout = setTimeout(function () {
                if (isFadeOutEnabled.call(this)) {
                    this.isSkinVisible = false;
                    utl.removeClass(this.container, "show-skin");
                    if (this.miniBar) {
                        this.miniBar.showMiniBar();
                    }
                }
            }.bind(this), this.skinTimeout);
        }
    };
    var fadeInSkin = function fadeInSkin() {
        clearTimeout(this.fadeOutSkinTimeout);
        if (!this.controlsDisabled) {
            utl.addClass(this.container, "show-skin");
            this.isSkinVisible = true;
            setFadeOutSkinTimeout.call(this);
        }
    };
    var setPlayheadPosition = function setPlayheadPosition(pos, restore) {
        var progressBarWidth = parseInt(getComputedStyle(this.progressBar).width);
        var scrubPoint = Math.max(Math.min(pos, progressBarWidth), 0);
        var scrubPrct = scrubPoint / progressBarWidth;
        var duration = Math.max(this.display.getDurationWithoutAds(), 0);
        var displayHours = duration >= 3600;
        var scrubTime = duration * scrubPrct;
        var fadeOut = utl.hasClass(this.videoProgressTime, "fade");
        var playheadMidpoint = this.videoPlayhead.clientWidth / 2;
        var playheadLeftOffset = scrubPoint - playheadMidpoint;
        if (!fadeOut || !restore) {
            this.videoProgressTime.innerHTML = vdb.utils.Common.formatTime(scrubTime, displayHours);
        }
        this.movePlayhead(playheadLeftOffset);
    };
    var updatePlayheadPosition = function updatePlayheadPosition() {
        var progressBarLeftOffset = vdb.utils.Common.getOffset(this.progressBar).left;
        setPlayheadPosition.call(this, this.pageXPos - progressBarLeftOffset);
    };
    var restorePlayheadPosition = function restorePlayheadPosition() {
        var progressBarWidth = parseInt(getComputedStyle(this.progressBar).width);
        var currentTime = this.display.getCurrentTime();
        var currentTimeWithoutAds = currentTime - this.getAdsPassedTime(currentTime);
        var duration = this.display.getDurationWithoutAds();
        var percent = duration ? currentTimeWithoutAds / duration : 0;
        setPlayheadPosition.call(this, progressBarWidth * percent, true);
    };
    var setCurrentTime = function setCurrentTime(newTime) {
        var progressBarWidth;
        var progressBarLeftOffset;
        var scrubPoint;
        var scrubPrct;
        var newTimeWithoutAds;
        var adsPassedTime;
        var newAdsPassedTime;
        if (!newTime) {
            progressBarWidth = parseInt(getComputedStyle(this.progressBar).width);
            progressBarLeftOffset = vdb.utils.Common.getOffset(this.progressBar).left;
            scrubPoint = Math.max(Math.min(this.pageXPos - progressBarLeftOffset, progressBarWidth), 0);
            scrubPrct = scrubPoint / progressBarWidth;
            newTimeWithoutAds = this.display.getDurationWithoutAds() * scrubPrct;
            adsPassedTime = this.getAdsPassedTime(newTimeWithoutAds);
            for (newTime = newTimeWithoutAds + adsPassedTime; (newAdsPassedTime = this.getAdsPassedTime(newTime)) > adsPassedTime;) {
                var adPassedTimeDiff = newAdsPassedTime - adsPassedTime;
                newTime += adPassedTimeDiff;
                adsPassedTime = newAdsPassedTime;
            }
        }
        if (!isNaN(newTime)) {
            this.controller.seekTo(newTime);
            this._seekingTo = newTime;
            utl.setStyle(this.videoProgress, { width: scrubPrct * 100 + "%" });
        }
    };
    var updateBufferProgress = function updateBufferProgress(percentBuffered) {
        if (percentBuffered && percentBuffered !== this.percentBuffered) {
            this.percentBuffered = percentBuffered;
            utl.setStyle(this.bufferProgress, { width: percentBuffered + "%" });
        }
    };
    var enableFullscreenButton = function enableFullscreenButton() {
        utl.removeClass(this.fullscreenButton, "disabled");
        utl.removeFromParent(this.fullscreenDisabledBox);
    };
    var disableFullscreenButton = function disableFullscreenButton() {
        var enabled = !utl.hasClass(this.fullscreenButton, "disabled");
        if (enabled) {
            utl.addClass(this.fullscreenButton, "disabled");
            var outerMessageBox = utl.createElement("div", { "class": "fs-outer-message" }, this.fullscreenButton.parentNode);
            var innerMessageBox = utl.createElement("div", { "class": "fs-inner-message" }, outerMessageBox);
            innerMessageBox.textContent = "Fullscreen is not supported on your browser";
            this.fullscreenDisabledBox = outerMessageBox;
        }
    };
    var _updateHDStatus = function _updateHDStatus(show) {
        if (!this.hdButton) {
            return;
        }
        var currentVideo = this.controller.getCurrentVideo();
        if (!currentVideo || show === false) {
            vdb.utils.Common.hide(this.hdButton.parentNode);
            return;
        }
        var videoWidth = this.display.getVideoWidth();
        var videoHeight = this.display.getVideoHeight();
        var isHD;
        if (videoWidth / videoHeight > 1) {
            isHD = videoWidth >= 1280 && videoHeight >= 720;
        } else {
            isHD = videoWidth >= 720 && videoHeight >= 1280;
        }
        vdb.utils.Common.show(this.hdButton.parentNode);
        if (isHD) {
            utl.removeClass(this.hdButton, "not-hd-video");
        } else {
            utl.addClass(this.hdButton, "not-hd-video");
        }
    };
    var displayProgressBar = function displayProgressBar(currentTime, duration) {
        currentTime -= this.getAdsPassedTime(currentTime);
        currentTime = Math.max(currentTime, 0);
        var progressPrct = duration ? currentTime / duration : 0;
        var displayHours = duration >= 3600;
        var progressBarWidth = parseInt(getComputedStyle(this.progressBar).width);
        var videoProgressLeftOffset = progressPrct * progressBarWidth;
        var playheadMidpoint = this.videoPlayhead.clientWidth / 2;
        var playheadLeftOffset = videoProgressLeftOffset - playheadMidpoint;
        var scrubMidpoint = this.videoScrub ? this.videoScrub.clientWidth / 2 : 0;
        var scrubLeftOffset = videoProgressLeftOffset - scrubMidpoint;
        utl.setStyle(this.videoProgress, { width: videoProgressLeftOffset + "px" });
        if (this.videoScrub) {
            utl.setStyle(this.videoScrub, { left: scrubLeftOffset + "px" });
        }
        this.updateCurrentTime(currentTime, displayHours);
        var fadeOut = this.videoProgressTime.className.indexOf("fade");
        if (!this.isScrubberActive) {
            if (fadeOut === -1) {
                this.videoProgressTime.innerHTML = vdb.utils.Common.formatTime(currentTime, displayHours);
            }
            this.movePlayhead(playheadLeftOffset);
        }
        if (!this.isBuffering) {
            utl.removeClass(this.playButtonRim, "buffering-state");
        }
    };
    var movePlayhead = function movePlayhead(playheadLeftOffset) {
        utl.setStyle(this.videoPlayhead, { left: playheadLeftOffset + "px" });
    };
    var isStereoscopicModeActive = function isStereoscopicModeActive() {
        return utl.hasClass(this.stereoscopicButton, "button-active");
    };
    var toggleStereoscopicMode = function toggleStereoscopicMode(value) {
        var isOn = isStereoscopicModeActive.call(this);
        if (value === isOn) {
            return;
        }
        if (typeof value === "undefined") {
            value = !isOn;
        }
        vdb.ctx.dispatchEvent(new Event360(Event360.TOGGLE_STEREOSCOPIC));
        if (value) {
            utl.addClass(this.stereoscopicButton, "button-active");
            if (!this._isFullscreen) {
                this.controller.toggleFullscreen();
            }
        } else {
            utl.removeClass(this.stereoscopicButton, "button-active");
        }
    };
    var turnOffStereoscopicMode = function turnOffStereoscopicMode() {
        toggleStereoscopicMode.call(this, false);
    };
    var dispatchUserInteractionEvent = function dispatchUserInteractionEvent(interactionType) {
        this.player.dispatchEvent(PlayerEvent.USER_INTERACTION, { "interactionType": interactionType });
    };
    var isFullscreenSupported = function isFullscreenSupported() {
        return vdb.utils.Fullscreen.enabled() || vdb.utils.Common.isWebkitFullscreenVideoSupported && utl.browser.isIos();
    };
    var is360Video = function is360Video() {
        var currentVideo = this.controller.getCurrentVideo();
        return !!(currentVideo && currentVideo.data360);
    };
    var toggleStereoButton = function toggleStereoButton(showHide) {
        if (this.stereoscopicButton && this.stereoscopicButton.parentNode) {
            vdb.utils.Common.toggle(this.stereoscopicButton.parentNode, showHide);
        }
    };
    var updateInfoDescriptionIfNeeded = function updateInfoDescriptionIfNeeded() {
        if (this.infoDescription) {
            var currentVideo = this.controller.getCurrentVideo();
            this.infoDescription.innerHTML = currentVideo && currentVideo.description || "";
            utl.truncateTextToFit(currentVideo && currentVideo.description || "", this.infoDescription);
        }
    };
    var updateInfoTitleIfNeeded = function updateInfoTitleIfNeeded() {
        if (this.infoTitle) {
            var currentVideoTitle = this.controller.getCurrentVideoTitle();
            this.infoTitle.innerHTML = currentVideoTitle || "";
            utl.truncateTextToFit(currentVideoTitle || "", this.infoTitle);
        }
    };
    var showStereoButtonIfNeeded = function showStereoButtonIfNeeded() {
        var isNeeded = is360Video.call(this) && this.stereoscopicButton && (utl.iPhoneOS() || utl.androidOS() && utl.isHandset() && vdb.utils.Fullscreen.enabled()) && vdb.ctx.getMacro(vdb.constants.PlayerMacros.VRSPLIT) !== "false";
        toggleStereoButton.call(this, isNeeded);
    };
    var updateFullscreenButton = function updateFullscreenButton() {
        if (isFullscreenSupported.call(this)) {
            enableFullscreenButton.call(this);
        } else {
            disableFullscreenButton.call(this);
        }
    };
    var _hideRelatedButton = function _hideRelatedButton(openCarousel) {
        if (this.relatedElement) {
            if (openCarousel) {
                this.player.dispatchEvent(PlayerEvent.RELATED_BUTTON_CLICK);
            }
            vdb.utils.Common.hide(this.relatedElement);
        }
    };
    var setRelatedButtonText = function setRelatedButtonText() {
        this.relatedElement.innerHTML = "RELATED";
    };
    var _showRelatedButton = function _showRelatedButton() {
        var that = this;
        if (this.relatedElement) {
            vdb.utils.Common.show(this.relatedElement);
            utl.removeClass(this.relatedElement, "hidden");
            setTimeout(function () {
                if (that.relatedElement.offsetParent == null) {
                    setRelatedButtonText.call(that);
                }
            }, 100);
        }
    };
    var liveOn = function liveOn() {
        this.liveIsOn = true;
        if (this.videoDuration) {
            vdb.utils.Common.hide(this.videoDuration);
        }
        if (this.videoProgressTime) {
            vdb.utils.Common.hide(this.videoProgressTime);
        }
        if (this.progressBar) {
            vdb.utils.Common.hide(this.progressBar, true);
            this.progressBarHidden = true;
        }
    };
    var liveOff = function liveOff() {
        this.liveIsOn = false;
        if (this.videoDuration) {
            vdb.utils.Common.show(this.videoDuration);
        }
        if (this.videoProgressTime) {
            vdb.utils.Common.show(this.videoProgressTime);
        }
        if (this.progressBar) {
            vdb.utils.Common.show(this.progressBar);
            this.progressBarHidden = false;
        }
    };
    var setUnmuteOverlay = function setUnmuteOverlay() {
        var initialSound = vdb.ctx.playerAPI.getInitialSound();
        var isAutoplay = this.controller.isAutoplay() || this.controller.getAdsConfig().isAutoplay() || this.controller.isAutoplayInView();
        if (isAutoplay && this.controller.isMuted() && initialSound !== vdb.enums.player.SoundMode.MUTED && utl.browser.restrictsAutoplayWithSound()) {
            this._unmuteOverlay = new vdb.html5.player.poster.UnmuteOverlay(this.controller);
            this.controlsDisabled = true;
        }
    };
    var loadPreview = function loadPreview() {
        new vdb.skins.video_time_preview.VideoTimePreviewManager(this.controller, this.progressBar, this.controlBarRow, this.videoPlayhead, this.controlsBarContainerWrapper);
    };
    var bindPlayButtonClick = function bindPlayButtonClick(isReplay) {
        if (isReplay) {
            this.playButton.removeEventListener(this.clickEvent, this.onPlayButtonClick);
            this.playButton.addEventListener(this.clickEvent, this.onReplayButtonClick);
        } else {
            this.playButton.removeEventListener(this.clickEvent, this.onReplayButtonClick);
            this.playButton.addEventListener(this.clickEvent, this.onPlayButtonClick);
        }
    };
    var onSkinActive = function onSkinActive() {
        this.isSkinActive = true;
        fadeInSkin.call(this);
    };
    var onSkinInactive = function onSkinInactive() {
        this.isSkinActive = false;
        setFadeOutSkinTimeout.call(this);
    };
    var bindContainerEvents = function bindContainerEvents() {
        this.containerEventsGroup = ec.empty();
        if (this.isMobile) {
            ec.bind(this.container, "touchstart", onSkinActive.bind(this)).link(this.containerEventsGroup);
            ec.bind(document, "touchend", onSkinInactive.bind(this)).link(this.containerEventsGroup);
        } else {
            ec.bind(this.container, "mousemove", fadeInSkin.bind(this), true).link(this.containerEventsGroup);
            ec.bind(document, "mouseout", onSkinInactive.bind(this), true).link(this.containerEventsGroup);
            ec.bind(this.container, "mouseover", fadeInSkin.bind(this), true).link(this.containerEventsGroup);
        }
    };
    var onShowControls = function onShowControls() {
        this.controlsDisabled = false;
        this.isSkinActive = false;
        fadeInSkin.call(this);
    };
    var onHideControls = function onHideControls() {
        this.controlsDisabled = true;
        this.isSkinActive = false;
        this.isSkinVisible = false;
        utl.removeClass(this.container, "show-skin");
    };
    var onPlayButtonClick = function onPlayButtonClick() {
        if (this.isBuffering) {
            return;
        }
        var isPlaying = this.controller.isPlaying();
        this.controller.togglePlay();
        dispatchUserInteractionEvent.call(this, !isPlaying ? UserInteraction.PLAY : UserInteraction.PAUSE);
    };
    var onReplayButtonClick = function onReplayButtonClick() {
        this.controller.setVideoPlayType(VideoPlayType.CLICK);
        this.controller.replay();
        utl.removeClass(this.container, "stopped-mode");
        bindPlayButtonClick.call(this);
        dispatchUserInteractionEvent.call(this, UserInteraction.REPLAY);
    };
    var onDockButtonClick = function onDockButtonClick() {
        vdb.ctx.dispatchEvent(PlayerEvent.DOCK_BUTTON_CLICK);
        dispatchUserInteractionEvent.call(this, UserInteraction.FLOATER_DOCK);
    };
    var onContextStarted = function onContextStarted() {
        if (!this.adController) {
            this.adController = this.controller.getAdController();
        }
    };
    var onPlayTriggered = function onPlayTriggered() {
        bindContainerEvents.call(this);
        utl.removeClass(this.container, "stopped-mode");
    };
    var onVideoSelected = function onVideoSelected() {
        updateInfoDescriptionIfNeeded.call(this);
        updateInfoTitleIfNeeded.call(this);
        showStereoButtonIfNeeded.call(this);
        updateFullscreenButton.call(this);
    };
    var onVideoMeta = function onVideoMeta(e) {
        this.videoDuration.innerHTML = vdb.utils.Common.formatTime(e.data["durationWithoutAds"]);
    };
    var onVideoStart = function onVideoStart() {
        updateInfoDescriptionIfNeeded.call(this);
        updateInfoTitleIfNeeded.call(this);
        bindPlayButtonClick.call(this);
        _updateHDStatus.call(this);
        if (this.adController && this.adController.isSsai()) {
            this.buildTimelineAdBreaks();
        }
    };
    var onPlay = function onPlay() {
        utl.addClass(this.playButtonState, "playing-state");
        this.isPaused = false;
        if (!this.liveIsOn) {
            fadeInSkin.call(this);
        }
    };
    var onPause = function onPause(event) {
        if (event && event.type === PlayerEvent.VIDEO_PAUSE && this._currentAdType === vdb.enums.AdType.MIDROLL) {
            return;
        }
        utl.removeClass(this.playButtonState, "playing-state");
        this.isPaused = true;
        fadeInSkin.call(this);
    };
    var onTimeUpdate = function onTimeUpdate() {
        if (this.isBuffering) {
            this.isBuffering = false;
            setFadeOutSkinTimeout.call(this);
        }
        utl.toggleClass(this.playButtonState, "playing-state", !this.isPaused);
        if (!this.isBuffering) {
            utl.removeClass(this.playButtonRim, "buffering-state");
        }
    };
    var onVideoEnd = function onVideoEnd(e) {
        if (this.ccButton) {
            vdb.utils.Common.hide(this.ccButton.parentNode);
        }
        if (e.data.stop) {
            utl.addClass(this.container, "stopped-mode");
            bindPlayButtonClick.call(this, true);
            this.containerEventsGroup.unbind();
            ec.bindOnce(this.player, PlayerEvent.PLAY_TRIGGERED, onPlayTriggered.bind(this));
        }
    };
    var onVideoTimeUpdate = function onVideoTimeUpdate(e) {
        onTimeUpdate.call(this);
        displayProgressBar.call(this, e.data.currentTime, e.data["durationWithoutAds"]);
        updateBufferProgress.call(this, e.data.percentBuffered);
    };
    var onWaiting = function onWaiting() {
        this.isBuffering = true;
        utl.addClass(this.playButtonRim, "buffering-state");
        if (this.liveIsOn && !this.isPaused) {
            return;
        }
        fadeInSkin.call(this);
    };
    var onVideoProgress = function onVideoProgress(e) {
        updateBufferProgress.call(this, e["data"]["percentBuffered"]);
    };
    var onProgressBarContainerTouchStart = function onProgressBarContainerTouchStart(e) {
        if (this.progressBarHidden) {
            return;
        }
        this.pageXPos = e.changedTouches[0].pageX;
        updatePlayheadPosition.call(this);
        this.onSeekStart();
    };
    var onProgressBarContainerTouchMove = function onProgressBarContainerTouchMove(e) {
        e.preventDefault();
        if (this.progressBarHidden) {
            return;
        }
        this.pageXPos = e.changedTouches[0].pageX;
        updatePlayheadPosition.call(this);
        setCurrentTime.call(this);
    };
    var onProgressBarContainerTouchEnd = function onProgressBarContainerTouchEnd() {
        if (this.progressBarHidden) {
            return;
        }
        setCurrentTime.call(this);
        this.onSeekEnd();
    };
    var onProgressBarContainerMouseDown = function onProgressBarContainerMouseDown() {
        if (this.progressBarHidden) {
            return;
        }
        this.onSeekStart();
    };
    var onProgressBarContainerMouseMove = function onProgressBarContainerMouseMove(e) {
        if (this.progressBarHidden) {
            return;
        }
        this.isScrubberActive = true;
        this.pageXPos = e.pageX;
        updatePlayheadPosition.call(this);
    };
    var onProgressBarContainerMouseUp = function onProgressBarContainerMouseUp() {
        if (this.progressBarHidden) {
            return;
        }
        setCurrentTime.call(this);
        this.onSeekEnd();
    };
    var onProgressBarContainerMouseOut = function onProgressBarContainerMouseOut(e) {
        if (!vdb.utils.Common.isDescendant(e.relatedTarget, e.currentTarget) && !this.progressBarHidden && !utl.hasClass(this.videoProgressTime, "fade")) {
            restorePlayheadPosition.call(this);
            this.isScrubberActive = false;
        }
    };
    var onControlBarRowMouseOver = function onControlBarRowMouseOver() {
        this.isSkinActive = true;
    };
    var onControlBarRowMouseOut = function onControlBarRowMouseOut() {
        this.isSkinActive = false;
    };
    var onControlBarRowTouchAction = function onControlBarRowTouchAction(e) {
        e.preventDefault();
    };
    var onSubtitlesEnabled = function onSubtitlesEnabled() {
        utl.addClass(this.ccButton, "button-active");
    };
    var onSubtitlesDisabled = function onSubtitlesDisabled() {
        utl.removeClass(this.ccButton, "button-active");
    };
    var onPlayerFloating = function onPlayerFloating() {
        utl.addClass(this.container, "floating-mode");
    };
    var onPlayerDocked = function onPlayerDocked() {
        utl.removeClass(this.container, "floating-mode");
    };
    var onEnterFullscreen = function onEnterFullscreen() {
        this._isFullscreen = true;
        if (this.floaterDockButton) {
            vdb.utils.Common.hide(this.floaterDockButtonCell);
        }
        dispatchUserInteractionEvent.call(this, UserInteraction.ENTER_FULLSCREEN);
        this.updateProgressBar();
    };
    var onExitFullscreen = function onExitFullscreen(e) {
        if (this.stereoscopicButton) {
            turnOffStereoscopicMode.call(this);
        }
        fadeInSkin.call(this);
        this._isFullscreen = false;
        if (this.floaterDockButton) {
            vdb.utils.Common.show(this.floaterDockButtonCell);
        }
        if (e["data"]["userInitiated"]) {
            dispatchUserInteractionEvent.call(this, UserInteraction.EXIT_FULLSCREEN);
        }
        this.updateProgressBar();
    };
    var onAdMeta = function onAdMeta() {
        if (this.ccButton) {
            this.adMeta = null;
            vdb.utils.Common.hide(this.ccButton.parentNode);
        }
    };
    var onAdBlockerComplete = function onAdBlockerComplete() {
        this._currentAdType = null;
        showStereoButtonIfNeeded.call(this);
        if (!this.adMeta) {
            this.adMeta = ec.bindOnce(this.player, PlayerEvent.AD_META, onAdMeta.bind(this));
        }
        this.removeTimelineAdBreaks();
    };
    var onSubtitlesReady = function onSubtitlesReady() {
        if (this.ccButton) {
            vdb.utils.Common.show(this.ccButton.parentNode);
            if (!this.ccMenu) {
                this.ccMenu = this.createSubtitlesMenu();
            }
        }
    };
    var onAdPlay = function onAdPlay(event) {
        this._currentAdType = event.data.type;
        onPlay.call(this);
        toggleStereoButton.call(this, false);
        _updateHDStatus.call(this, false);
    };
    var onRelatedElementClick = function onRelatedElementClick() {
        utl.addClass(this.relatedElement, "hidden");
        this.relatedElement.innerHTML = "";
        if (this.isIE9) {
            _hideRelatedButton.call(this, true);
        }
    };
    var bindPlayerEvents = function bindPlayerEvents() {
        this.player.addEventListener(PlayerEvent.HIDE_CONTROLS, onHideControls.bind(this));
        this.player.addEventListener(PlayerEvent.SHOW_CONTROLS, onShowControls.bind(this));
        this.player.addEventListener(PlayerEvent.CONTEXT_STARTED, onContextStarted.bind(this));
        this.player.addEventListener(PlayerEvent.AD_PLAY, onAdPlay.bind(this));
        this.player.addEventListener(PlayerEvent.AD_TIMEUPDATE, this.onAdTimeUpdate.bind(this));
        this.player.addEventListener(PlayerEvent.AD_PAUSED, onPause.bind(this));
        this.player.addEventListener(PlayerEvent.AD_WAITING, onWaiting.bind(this));
        this.player.addEventListener(PlayerEvent.AD_BLOCKER_COMPLETE, onAdBlockerComplete.bind(this));
        this.player.addEventListener(PlayerEvent.VIDEO_SELECTED, onVideoSelected.bind(this));
        if (this.videoDuration) {
            this.player.addEventListener(PlayerEvent.VIDEO_META, onVideoMeta.bind(this));
        }
        this.player.addEventListener(PlayerEvent.VIDEO_START, onVideoStart.bind(this));
        this.player.addEventListener(PlayerEvent.VIDEO_PLAY, onPlay.bind(this));
        this.player.addEventListener(PlayerEvent.VIDEO_PAUSE, onPause.bind(this));
        this.player.addEventListener(PlayerEvent.VIDEO_TIMEUPDATE, onVideoTimeUpdate.bind(this));
        this.player.addEventListener(PlayerEvent.VIDEO_PROGRESS, onVideoProgress.bind(this));
        this.player.addEventListener(PlayerEvent.VIDEO_WAITING, onWaiting.bind(this));
        this.player.addEventListener(PlayerEvent.VIDEO_END, onVideoEnd.bind(this));
        this.player.addEventListener(PlayerEvent.ENTER_FULLSCREEN, onEnterFullscreen.bind(this));
        this.player.addEventListener(PlayerEvent.EXIT_FULLSCREEN, onExitFullscreen.bind(this));
        this.player.addEventListener(PlayerEvent.SUBTITLES_READY, onSubtitlesReady.bind(this));
        this.player.addEventListener(PlayerEvent.SUBTITLES_ENABLED, onSubtitlesEnabled.bind(this));
        this.player.addEventListener(PlayerEvent.SUBTITLES_DISABLED, onSubtitlesDisabled.bind(this));
        this.player.addEventListener(vdb.skins.CcMenu.MENU_CLOSE, onSkinInactive.bind(this));
        this.player.addEventListener(PlayerEvent.SHARE_SCREEN_OPENED, function () {
            this.isShareScreenOpened = true;
        }.bind(this));
        this.player.addEventListener(PlayerEvent.SHARE_SCREEN_CLOSED, function () {
            this.isShareScreenOpened = false;
        }.bind(this));
        vdb.ctx.addEventListener(PlayerEvent.LEVEL_SWITCHED, _updateHDStatus.bind(this));
        vdb.ctx.addEventListener(PlayerEvent.PLAYER_FLOATING, onPlayerFloating.bind(this));
        vdb.ctx.addEventListener(PlayerEvent.PLAYER_DOCKED, onPlayerDocked.bind(this));
    };
    var bindSkinEvents = function bindSkinEvents() {
        bindPlayButtonClick.call(this);
        if (this.rewindButton) {
            this.rewindButton.addEventListener("click", this.rewindButtonClick.bind(this));
        }
        if (this.nextVideoButton) {
            this.nextVideoButton.addEventListener("click", this.nextVideoButtonClick.bind(this));
        }
        if (this.logoButton) {
            this.logoButton.addEventListener("click", this.onLogoClick.bind(this));
        }
        this.fullscreenButton.addEventListener(this.clickEvent, this.onFullscreenButtonClick.bind(this));
        updateFullscreenButton.call(this);
        if (this.stereoscopicButton) {
            this.stereoscopicButton.addEventListener(this.clickEvent, this.onStereoscopicButtonClick.bind(this));
        }
        if (this.isMobile) {
            this.progressBarContainer.addEventListener("touchstart", onProgressBarContainerTouchStart.bind(this));
            this.progressBarContainer.addEventListener("touchmove", onProgressBarContainerTouchMove.bind(this));
            this.progressBarContainer.addEventListener("touchend", onProgressBarContainerTouchEnd.bind(this));
            this.controlBarRow.addEventListener("touchstart", onControlBarRowTouchAction.bind(this));
            this.controlBarRow.addEventListener("touchend", onControlBarRowTouchAction.bind(this));
        } else {
            this.progressBarContainer.addEventListener("mouseup", onProgressBarContainerMouseUp.bind(this));
            this.progressBarContainer.addEventListener("mousemove", onProgressBarContainerMouseMove.bind(this));
            this.progressBarContainer.addEventListener("mousedown", onProgressBarContainerMouseDown.bind(this));
            this.progressBarContainer.addEventListener("mouseout", onProgressBarContainerMouseOut.bind(this));
            this.controlBarWrapper.addEventListener("mouseover", onControlBarRowMouseOver.bind(this));
            this.controlBarWrapper.addEventListener("mouseout", onControlBarRowMouseOut.bind(this));
        }
    };
    var bindEvents = function bindEvents() {
        bindPlayerEvents.call(this);
        bindSkinEvents.call(this);
        bindContainerEvents.call(this);
    };
    var buildRelatedButton = function buildRelatedButton() {
        var that = this;
        this.relatedElement = utl.createElement("div", { "class": "related-button" }, this.upperIconsContainer);
        this.relatedElement.addEventListener("click", onRelatedElementClick.bind(this));
        setRelatedButtonText.call(this);
        utl.addPrefixedEventListeners(this.relatedElement, "TransitionEnd", function (e) {
            if (e.propertyName === "width") {
                if (that.relatedElement.clientWidth === 0) {
                    _hideRelatedButton.call(that, true);
                } else {
                    setRelatedButtonText.call(that);
                }
            }
        });
        vdb.utils.Common.show(this.upperIconsContainer);
    };
    return { init: function init(controller) {
            this.isIE9 = utl.isIE && utl.browser["version"] === 9;
            this.controller = controller;
            this.displayProgressBar = displayProgressBar;
            this.player = controller.getPlayer();
            this.container = controller.getContainer();
            this.subtitlesManager = controller.getSubtitlesManager();
            this.display = vdb.html5.player.Display.getInstance();
            var controlsConfig = this.player.getControlsConfig();
            this.logoUrl = controlsConfig["logoUrl"] || "";
            this.logoClickUrl = controlsConfig["logoClickUrl"];
            this.onPlayButtonClick = onPlayButtonClick.bind(this);
            this.onReplayButtonClick = onReplayButtonClick.bind(this);
            this.liveIsOn = false;
            this.skinTimeout = 3E3;
            setStyles.call(this);
            renderSkin.call(this);
            setControlsSkinLocation.call(this);
            bindEvents.call(this);
            if (this.subtitlesManager.subtitles) {
                onSubtitlesReady.call(this);
            }
            if (controller.hasContextStarted()) {
                setUnmuteOverlay.call(this);
                onContextStarted.call(this);
                fadeInSkin.call(this);
            } else {
                ec.bindOnce(this.player, PlayerEvent.CONTEXT_STARTED, setUnmuteOverlay.bind(this));
            }
            this.videoProgressTime.addEventListener("need-to-update", function () {
                this.isScrubberActive = false;
                this.updateProgressBar();
            }.bind(this));
            this.display.addContentListener(vdb.html5.player.VIDEO_SEEKEND, function () {
                this._seekingTo = undefined;
            }.bind(this));
        }, cssText: "", isSkinVisible: false, isBuffering: false, isMobile: !!utl.mobileOs(), clickEvent: utl.mobileOs() ? "touchend" : "click", showResumeAdPoster: false, createTimelinePreview: function createTimelinePreview() {
            var shouldDisplay = !utl.mobileOs();
            var queryParam = urlUtils.getParameterByName("timelinepreview");
            if (queryParam.length > 0) {
                shouldDisplay = !!(+queryParam || vdb.Utils.parseBoolean(queryParam) || false);
            } else {
                if (this.controller.timeLinePreview !== undefined) {
                    shouldDisplay = this.controller.timeLinePreview;
                }
            }
            if (shouldDisplay) {
                vdb.events.EventContext.bindOnce(this.player, vdb.constants.PlayerEvent.VIDEO_PLAY, loadPreview.bind(this));
            }
        }, setSocialNetworks: function setSocialNetworks() {}, updateCurrentTime: function updateCurrentTime() {}, buildTimelineAdBreaks: function buildTimelineAdBreaks() {}, removeTimelineAdBreaks: function removeTimelineAdBreaks() {}, onAdTimeUpdate: function onAdTimeUpdate(e) {
            onTimeUpdate.call(this);
            if (this.controller.isBrandedWithControls()) {
                displayProgressBar.call(this, e.data["currentTime"], e.data["duration"]);
            } else {
                if (!this.isBuffering) {
                    utl.removeClass(this.playButtonRim, "buffering-state");
                }
            }
        }, displayProgressBar: displayProgressBar, onDockButtonCreated: function onDockButtonCreated() {
            this.floaterDockButton.addEventListener("click", onDockButtonClick.bind(this));
        }, onLogoClick: function onLogoClick() {
            if (this.logoClickUrl) {
                this.controller.pause();
                vdb.utils.Common.openLinkInNewTab(this.logoClickUrl);
                dispatchUserInteractionEvent.call(this, UserInteraction.LOGO_CLICK);
            }
        }, nextVideoButtonClick: function nextVideoButtonClick() {
            if (this.progressBarHidden) {
                return;
            }
            this.controller.moveToNextVideo();
        }, rewindButtonClick: function rewindButtonClick() {
            if (this.progressBarHidden) {
                return;
            }
            this.controller.seekTo(0);
            this.onSeekStart();
        }, onFullscreenButtonClick: function onFullscreenButtonClick() {
            if (isFullscreenSupported.call(this)) {
                this.controller.toggleFullscreen();
            }
        }, onStereoscopicButtonClick: function onStereoscopicButtonClick() {
            toggleStereoscopicMode.call(this);
        }, onSeekStart: function onSeekStart() {
            dispatchUserInteractionEvent.call(this, UserInteraction.SEEK_START);
        }, onSeekEnd: function onSeekEnd() {
            dispatchUserInteractionEvent.call(this, UserInteraction.SEEK_END);
        }, isAolOnLogo: function isAolOnLogo() {
            return this.logoUrl.indexOf("aolon.swf") !== -1;
        }, createControlsBarContainerWrapper: function createControlsBarContainerWrapper() {
            if (!vdb.ctx.playerAPI.absoluteVideoWrapper) {
                this.controlsBarContainerWrapper = utl.createElement("div", { "class": ["absolute-wrapper"] });
            }
        }, createLogoButton: function createLogoButton(parent) {
            return this.isAolOnLogo() ? utl.createElement("div", { "class": "aol-on-logo" }, parent, '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95.539 21.708"><path d="M69.516,20.004c-2.416,0-4.291-0.797-5.576-2.373c-1.293-1.586-1.947-3.867-1.947-6.785 c0-2.909,0.662-5.18,1.967-6.747c1.301-1.561,3.178-2.352,5.584-2.352c2.414,0,4.289,0.784,5.57,2.331 c1.289,1.556,1.941,3.833,1.941,6.769c0,2.945-0.654,5.236-1.943,6.806C73.832,19.213,71.949,20.004,69.516,20.004 M69.543,0 c-2.914,0-5.248,0.978-6.936,2.905c-1.682,1.921-2.533,4.584-2.533,7.914c0,3.338,0.844,6.014,2.512,7.955 c1.672,1.945,4.004,2.934,6.93,2.934c2.934,0,5.27-0.988,6.943-2.934c1.666-1.941,2.512-4.609,2.512-7.927 c0-3.327-0.84-5.993-2.496-7.926C74.809,0.982,72.477,0,69.543,0"/><path d="M90.115,5.353c-2.467,0-4.252,0.747-5.313,2.22L84.559,5.65h-1.514v15.773h1.746v-8.689 c0-2.037,0.418-3.523,1.24-4.42c0.82-0.892,2.141-1.343,3.928-1.343c1.316,0,2.297,0.337,2.914,1.002 c0.619,0.669,0.934,1.771,0.934,3.271v10.178h1.732V11.161C95.539,7.307,93.715,5.353,90.115,5.353"/><path d="M50.418,15.801c-1.574,0-2.856,1.279-2.856,2.859s1.282,2.859,2.856,2.859c1.58,0,2.859-1.279,2.859-2.859 S51.998,15.801,50.418,15.801"/><rect x="40.198" y="0.304" width="4.658" height="20.754"/><path d="M8.269,13.85l2.135-7.097h0.057h0.028l2.133,7.097H8.269z M8.356,0.304L0.023,21.059h5.696l1.095-3.002 h7.211l1.009,3.002h5.749L12.535,0.304H8.356z"/><path d="M29.372,17.188c-2.02,0-3.731-1.656-3.731-3.926c0-2.272,1.711-3.929,3.731-3.929 c2.021,0,3.731,1.657,3.731,3.929C33.103,15.531,31.392,17.188,29.372,17.188 M29.372,4.986c-5.665,0-8.388,4.459-8.388,8.276 c0,3.814,2.723,8.275,8.388,8.275c5.664,0,8.386-4.461,8.386-8.275C37.757,9.445,35.035,4.986,29.372,4.986"/></svg> ') : utl.createElement("div", { "class": "custom-logo" }, parent);
        }, showLogo: function showLogo() {
            return this.logoUrl && (utl.getFileExtension(this.logoUrl) !== "swf" || this.isAolOnLogo());
        }, setCcButton: function setCcButton(ccButton) {
            this.ccButton = ccButton;
        }, setHdButton: function setHdButton(hdButton) {
            this.hdButton = hdButton;
            _updateHDStatus.call(this);
        }, setStereoscopicButton: function setStereoscopicButton(stereoscopicButton) {
            this.stereoscopicButton = stereoscopicButton;
            showStereoButtonIfNeeded.call(this);
        }, setRelatedButton: function setRelatedButton() {
            buildRelatedButton.call(this);
        }, hideRelatedButton: function hideRelatedButton() {
            _hideRelatedButton.call(this);
        }, showRelatedButton: function showRelatedButton() {
            _showRelatedButton.call(this);
        }, createSubtitlesMenu: function createSubtitlesMenu() {
            return new vdb.skins.CcMenu(this.subtitlesManager, this.ccButton, this.container);
        }, buildLiveButton: function buildLiveButton(options, container) {
            var cont = container || this.controlBarRow;
            this.player.addEventListener(PlayerEvent.LIVE_IS_ON, liveOn.bind(this));
            this.player.addEventListener(PlayerEvent.LIVE_IS_OFF, liveOff.bind(this));
            this.liveButton = new vdb.skins.LiveButton(this.controller, cont, options).createLiveButton();
        }, getAdsPassedTime: function getAdsPassedTime(time) {
            return this.adController && this.adController.getAdsPassedTime(time) || 0;
        }, videoPlay: function videoPlay() {}, updateProgressBar: function updateProgressBar() {
            var playerState = this.controller.getPlayerState();
            var currentTime = this._seekingTo ? this._seekingTo : playerState["currentTime"];
            displayProgressBar.call(this, currentTime, playerState["videoLength"]);
        }, movePlayhead: movePlayhead };
}());
vdb.skins.shareScreen = {};
vdb.skins.shareScreen.BottomTimePanel = vdb.core.Class.extend(function () {
    function _toggleCheckBox() {
        this._isInvisible = this.checkBoxContainer.classList.toggle("invisible");
        if (!this._isInvisible) {
            this.shareScreen.getPlayer().removeEventListener(vdb.constants.PlayerEvent.VIDEO_TIMEUPDATE, this._udpateTimeFunction);
            this.time.value = this.shareScreen.getCurrentVideoTime();
        } else {
            this.shareScreen.getPlayer().addEventListener(vdb.constants.PlayerEvent.VIDEO_TIMEUPDATE, this._udpateTimeFunction);
        }
    }
    function addMobileStyle() {
        if (utl.mobileOs()) {
            utl.addClass(this.bottomContainer, "bottom-panel-mobile");
            utl.addClass(this.bottomText, "text-mobile");
            utl.addClass(this.time, "time-mobile");
            utl.addClass(this.checkBox, "check-box-mobile");
        }
    }
    function updateTime(e) {
        this.time.value = $.formatTime(e.data.currentTime);
    }
    function createBottomTimePanel(container) {
        this.bottomContainer = utl.createElement("div", { "class": "bottom-container" }, container);
        this.checkBoxWrapper = utl.createElement("div", { "class": "check-box-wrapper" }, this.bottomContainer);
        this.checkBox = utl.createElement("div", { "class": "check-box" }, this.checkBoxWrapper);
        this.checkBoxOuterContainer = utl.createElement("div", { "class": "check-box-outer-container" }, this.checkBox);
        this.checkBoxContainer = utl.createElement("div", { "class": "checkbox-container invisible" }, this.checkBoxOuterContainer);
        this.checkBoxContainer.innerHTML = '<svg class="player-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 12 9.022" enable-background="new 0 0 12 9.022" xml:space="preserve"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.862,1.642L4.489,8.745L4.359,8.876c-0.051,0.05-0.11,0.087-0.173,0.111 c-0.03,0.012-0.062,0.014-0.094,0.019c-0.03,0.005-0.059,0.016-0.089,0.016c-0.03,0-0.059-0.01-0.089-0.016 C3.883,9.001,3.85,8.999,3.82,8.987c-0.062-0.024-0.122-0.06-0.173-0.111l-0.13-0.131l-3.38-3.246 c-0.189-0.187-0.183-0.495,0.011-0.687l0.796-0.807c0.193-0.194,0.504-0.197,0.693-0.01l2.364,2.319l6.358-6.176 c0.189-0.187,0.5-0.184,0.693,0.01l0.797,0.808C12.045,1.147,12.051,1.455,11.862,1.642z"/></svg> ';
        this.textContainer = utl.createElement("div", { "class": "text-container" }, this.bottomContainer);
        this.textSecondContainer = utl.createElement("div", { "class": "text-second-inner-container" }, this.textContainer);
        this.bottomText = utl.createElement("div", { "class": "text" }, this.textSecondContainer, "Share from:");
        this.bottomTimeWraper = utl.createElement("div", { "class": "time-wrapper" }, this.bottomContainer);
        this.bottomTimeContainer = utl.createElement("div", { "class": "time-container" }, this.bottomTimeWraper);
        this.time = utl.createElement("input", { "type": "text", "class": "time", "size": "5", "value": this.shareScreen.getCurrentVideoTime() }, this.bottomTimeContainer);
    }
    function assignEvents() {
        this.checkBox.addEventListener("click", this.toggleCheckBox.bind(this));
        this._udpateTimeFunction = updateTime.bind(this);
        this.shareScreen.getPlayer().addEventListener(vdb.constants.PlayerEvent.VIDEO_TIMEUPDATE, this._udpateTimeFunction);
    }
    var utl = vdb.Utils;
    var $ = vdb.utils.Common;
    return { init: function init(shareScreen, container) {
            this._isInvisible = true;
            this.shareScreen = shareScreen;
            createBottomTimePanel.call(this, container);
            addMobileStyle.call(this);
            assignEvents.call(this);
        }, getTime: function getTime() {
            return this.time.value;
        }, getCheckBox: function getCheckBox() {
            return this.checkBox;
        }, toggleCheckBox: function toggleCheckBox() {
            _toggleCheckBox.call(this);
        }, checkCheckBox: function checkCheckBox() {
            utl.removeClass(this.checkBoxContainer, "invisible");
            this.shareScreen.getPlayer().removeEventListener(vdb.constants.PlayerEvent.VIDEO_TIMEUPDATE, this._udpateTimeFunction);
            this.time.value = this.shareScreen.getCurrentVideoTime();
        }, uncheckCheckBox: function uncheckCheckBox() {
            utl.addClass(this.checkBoxContainer, "invisible");
            this.shareScreen.getPlayer().addEventListener(vdb.constants.PlayerEvent.VIDEO_TIMEUPDATE, this._udpateTimeFunction);
        }, isCheckBoxChecked: function isCheckBoxChecked() {
            return !this._isInvisible;
        }, setCurrentTime: function setCurrentTime() {
            this.time.value = this.shareScreen.getCurrentTime();
        } };
}());
vdb.skins.shareScreen.ShareScreenModel = vdb.core.Class.extend(function () {
    return { init: function init(controller, settings, container, shareScreenButton) {
            this.player = controller.getPlayer();
            this.settings = settings;
            this.shareElements = [];
            this.socialNetworks = settings.socialNetworks;
            this.controller = controller;
            this.skin = settings.skin;
            this.container = container;
            this.shareScreenButton = shareScreenButton;
            this.skinType = controller.getSkinType();
        } };
}());
vdb.skins.shareScreen.ShareScreenStatesEnum = { SHARE_SCREEN_OPENED: "sharescreenopened", SHARE_SCREEN_CLOSED: "sharescreenclosed", EMAIL_SCREEN_OPENED: "emailscreenopened", EMAIL_SCREEN_CLOSED: "emailscreenclosed", EMBED_SCREEN_OPENED: "embedscreenopened", EMBED_SCREEN_CLOSED: "embedscreenclosed", LINK_SCREEN_OPENED: "linkscreenopened", LINK_SCREEN_CLOSED: "linkscreenclosed", COPIED_SCREEN_OPENED: "copiedscreenopened", COPIED_SCREEN_CLOSED: "copiedscreenclosed" };
vdb.skins.shareScreen.CopiedScreen = vdb.core.Class.extend(function () {
    function createCopiedScreen(container) {
        this.copiedScreenWrapper = utl.createElement("div", { "class": "copied-screen-wrapper fadeOut" }, container);
        this.copiedOuterContainer = utl.createElement("div", { "class": "copied-outer-container" }, this.copiedScreenWrapper);
        this.copiedContainer = utl.createElement("div", { "class": "copied-container" }, this.copiedOuterContainer);
        this.copiedInnerTableContainer = utl.createElement("div", { "class": "copied-inner-table-container" }, this.copiedContainer);
        this.copiedInnerContainer = utl.createElement("div", { "class": "copied-inner-container" }, this.copiedInnerTableContainer);
        this.copiedText = utl.createElement("div", { "class": "copied-text" }, this.copiedInnerContainer, "COPIED");
        this.copiedImageContainer = utl.createElement("div", { "class": "copied-image-container" }, this.copiedInnerContainer);
        this.copiedImage = utl.createElement("div", { "class": "copied-image" }, this.copiedImageContainer, '<svg class="player-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 12 9.022" enable-background="new 0 0 12 9.022" xml:space="preserve"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.862,1.642L4.489,8.745L4.359,8.876c-0.051,0.05-0.11,0.087-0.173,0.111 c-0.03,0.012-0.062,0.014-0.094,0.019c-0.03,0.005-0.059,0.016-0.089,0.016c-0.03,0-0.059-0.01-0.089-0.016 C3.883,9.001,3.85,8.999,3.82,8.987c-0.062-0.024-0.122-0.06-0.173-0.111l-0.13-0.131l-3.38-3.246 c-0.189-0.187-0.183-0.495,0.011-0.687l0.796-0.807c0.193-0.194,0.504-0.197,0.693-0.01l2.364,2.319l6.358-6.176 c0.189-0.187,0.5-0.184,0.693,0.01l0.797,0.808C12.045,1.147,12.051,1.455,11.862,1.642z"/></svg> ');
    }
    var utl = vdb.Utils;
    var state = vdb.skins.shareScreen.ShareScreenStatesEnum;
    return { init: function init(container, currentState) {
            createCopiedScreen.call(this, container);
            this.currentState = currentState;
        }, showCopiedContainer: function showCopiedContainer() {
            utl.replaceClass(this.copiedScreenWrapper, "fadeOut", "fadeIn");
        }, hideCopiedContainer: function hideCopiedContainer() {
            utl.replaceClass(this.copiedScreenWrapper, "fadeIn", "fadeOut");
            this.currentState.copiedScreen = state.COPIED_SCREEN_CLOSED;
        }, addFullScreenStyles: function addFullScreenStyles() {
            utl.addClass(this.copiedContainer, "copied-container-full-screen");
            utl.addClass(this.copiedText, "copied-text-full-screen");
            utl.addClass(this.copiedImage, "copied-image-full-screen");
        }, removeFullScreenStyles: function removeFullScreenStyles() {
            utl.removeClass(this.copiedContainer, "copied-container-full-screen");
            utl.removeClass(this.copiedText, "copied-text-full-screen");
            utl.removeClass(this.copiedImage, "copied-image-full-screen");
        } };
}());
vdb.skins.shareScreen.EmailScreen = vdb.core.Class.extend(function () {
    function setSendingImage() {
        var utl = vdb.Utils;
        utl.removeClass(this.emailSendingImage, "fadeOut hidden");
        utl.removeClass(this.emailSendingText, "fadeOut hidden");
        utl.addClass(this.emailSentImage, "hidden");
        utl.addClass(this.emailSentText, "hidden");
    }
    function setSentImage() {
        var utl = vdb.Utils;
        utl.addClass(this.emailSendingImage, "fadeOut hidden");
        utl.addClass(this.emailSendingText, "fadeOut hidden");
        utl.removeClass(this.emailSentImage, "hidden");
        utl.removeClass(this.emailSentText, "hidden");
    }
    function toggleEmailName(e) {
        var utl = vdb.Utils;
        if (this.emailFormText.value || e && (e.type === "click" || e.type === "focus")) {
            utl.addClass(this.emailFormName, "email-screen-filled-email");
            if (utl.mobileOs()) {
                utl.addClass(this.emailFormName, "filled-email-mobile");
            }
        } else {
            utl.removeClass(this.emailFormName, "email-screen-filled-email");
            if (utl.mobileOs()) {
                utl.removeClass(this.emailFormName, "filled-email-mobile");
            }
        }
    }
    function toggleMessageName(e) {
        var utl = vdb.Utils;
        if (this.emailFormInput.value || e && (e.type === "click" || e.type === "focus")) {
            utl.addClass(this.messageFormName, "email-screen-filled-email");
            utl.addClass(this.messageFormNameContainer, "email-message-container-filled");
            if (utl.mobileOs()) {
                utl.addClass(this.messageFormName, "filled-email-mobile");
            }
        } else {
            utl.removeClass(this.messageFormName, "email-screen-filled-email");
            utl.removeClass(this.messageFormNameContainer, "email-message-container-filled");
            if (utl.mobileOs()) {
                utl.removeClass(this.messageFormName, "filled-email-mobile");
            }
        }
    }
    function closeSendingScreen() {
        var utl = vdb.Utils;
        utl.addClass(this.emailSendingOuterContainer, "email-screen-sending-outer-container");
        utl.removeClass(this.emailSendingOuterContainer, "email-screen-sending-outer-container-active fadeIn");
        utl.removeClass(this.emailScreen, "fadeOut");
    }
    function fadeInAfterShareScreenFadeOut() {
        var transitions = ["transitionend", "oTransitionEnd", "transitionend", "webkitTransitionEnd"];
        var currentState;
        for (var i = 0; i < transitions.length; i++) {
            this.shareScreen.view.socialDock.addEventListener(transitions[i], function () {
                currentState = this.shareScreen.getCurrentState();
                if (currentState.shareScreen === state.SHARE_SCREEN_CLOSED && currentState.emailScreen === state.EMAIL_SCREEN_OPENED) {
                    this.bottomTimePanel.uncheckCheckBox();
                    var utl = vdb.Utils;
                    utl.removeClass(this.emailScreenWrapper, "fadeOut");
                    utl.removeClass(this.emailScreen, "fadeOut");
                    utl.addClass(this.emailScreenWrapper, "fadeIn");
                    utl.addClass(this.emailScreen, "fadeIn");
                    this.shareScreen.showBackButton();
                    utl.removeClass(this.emailFormLine, "email-screen-error");
                    utl.addClass(this.emailFormErrorMessage, "hidden");
                }
            }.bind(this));
        }
    }
    function createEmailScreen() {
        var utl = vdb.Utils;
        this.emailScreenWrapper = utl.createElement("div", { "class": "email-screen-wrapper fadeOut" }, this.shareScreen.getShareScreenContainer());
        this.emailScreenSendingContainerWrapper = utl.createElement("div", { "class": "email-screen-sending-container-wrapper" }, this.emailScreenWrapper);
        this.emailSendingOuterContainer = utl.createElement("div", { "class": "email-screen-sending-outer-container" }, this.emailScreenSendingContainerWrapper);
        this.emailScreen = utl.createElement("div", { "class": "email-screen-container" }, this.emailScreenWrapper);
        this.emailSendingContainer = utl.createElement("div", { "class": "email-screen-sending-container" }, this.emailSendingOuterContainer);
        this.emailSendingInnerTableContainer = utl.createElement("div", { "class": "email-screen-sending-inner-table-container" }, this.emailSendingContainer);
        this.emailSendingInnerContainer = utl.createElement("div", { "class": "email-screen-sending-inner-container" }, this.emailSendingInnerTableContainer);
        this.emailContainer = utl.createElement("div", { "class": "email-screen-email-container" }, this.emailScreen);
        this.emailForm = utl.createElement("form", { "class": "email-screen-email-form" }, this.emailContainer);
        this.emailFormInnerContainer = utl.createElement("div", { "class": "email-screen-inner-container" }, this.emailForm);
        this.emailFormInputsContainer = utl.createElement("div", { "class": "email-screen-inputs-container" }, this.emailFormInnerContainer);
        this.emailFormInputsContainerCol1 = utl.createElement("div", { "class": "email-screen-inputs-container-col-1" }, this.emailFormInputsContainer);
        this.emailFormInputsContainerCol2 = utl.createElement("div", { "class": "email-screen-inputs-container-col-2" }, this.emailFormInputsContainer);
        this.emailFirstLineContainer = utl.createElement("div", { "class": "email-screen-first-line-container" }, this.emailFormInputsContainerCol1);
        this.emailFormNameContainer = utl.createElement("div", { "class": "email-screen-name-container" }, this.emailFirstLineContainer);
        this.emailFormName = utl.createElement("div", { "class": "email-screen-name" }, this.emailFormNameContainer, "Email Address");
        this.emailFormText = utl.createElement("input", { "type": "text", "class": "email-screen-input", "maxlength": "35", "value": "" }, this.emailFirstLineContainer);
        this.emailFormExclamationMark = utl.createElement("div", { "class": "email-screen-exclamation-mark hidden" }, this.emailFirstLineContainer, '<svg class="player-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 11"><circle fill="#FF0013" cx="5.5" cy="5.5" r="5.5"/><path fill="#FFFFFF" d="M5.146,6.039L5.032,4.339C5.011,4.007,5,3.769,5,3.625c0-0.196,0.051-0.35,0.154-0.46 C5.257,3.055,5.393,3,5.561,3c0.204,0,0.34,0.07,0.408,0.211C6.038,3.352,6.072,3.555,6.072,3.82 c0,0.156-0.008,0.315-0.025,0.476l-0.153,1.75C5.878,6.255,5.843,6.414,5.788,6.526c-0.054,0.111-0.144,0.167-0.27,0.167 c-0.128,0-0.217-0.054-0.266-0.162C5.202,6.423,5.167,6.259,5.146,6.039z M5.54,8.376c-0.144,0-0.27-0.047-0.378-0.14 C5.054,8.142,5,8.011,5,7.843c0-0.147,0.051-0.272,0.154-0.375c0.103-0.103,0.229-0.154,0.378-0.154s0.276,0.051,0.382,0.154 C6.02,7.571,6.072,7.696,6.072,7.843c0,0.166-0.053,0.296-0.16,0.391C5.806,8.328,5.682,8.376,5.54,8.376z"/></svg> ');
        this.emailFormLine = utl.createElement("div", { "class": "email-screen-line first" }, this.emailFirstLineContainer);
        this.emailFormErrorMessage = utl.createElement("div", { "class": "email-screen-error-message hidden" }, this.emailFirstLineContainer, "The email is incorrect");
        this.emailSecondLineContainer = utl.createElement("div", { "class": "email-screen-second-line-container" }, this.emailFormInputsContainerCol1);
        this.messageFormNameContainer = utl.createElement("div", { "class": "email-screen-message-container" }, this.emailSecondLineContainer);
        this.messageFormName = utl.createElement("div", { "class": "email-screen-message" }, this.messageFormNameContainer, "Type Your Message Here");
        this.emailFormInput = utl.createElement("input", { "type": "text", "class": "email-screen-input-message", "maxlength": "60" }, this.emailSecondLineContainer);
        this.emailFormSecondLine = utl.createElement("div", { "class": "email-screen-line second" }, this.emailSecondLineContainer);
        this.emailFormInnerFieldsContainer = utl.createElement("div", { "class": "email-screen-inner-fields-container" }, this.emailFormInnerContainer);
        this.bottomTimePanel = new vdb.skins.shareScreen.BottomTimePanel(this.shareScreen, this.emailFormInnerFieldsContainer);
        this.emailSendingText = utl.createElement("div", { "class": "email-screen-sending-text" }, this.emailSendingInnerContainer, "SENDING");
        this.emailSentText = utl.createElement("div", { "class": "email-screen-sent-text hidden" }, this.emailSendingInnerContainer, "SENT");
        this.emailSendingImageContainer = utl.createElement("div", { "class": "email-screen-sending-image-container" }, this.emailSendingInnerContainer);
        this.emailSendingImage = utl.createElement("div", { "class": "email-screen-sending-image sending" }, this.emailSendingImageContainer, '<svg class="player-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 25 25" enable-background="new 0 0 25 25" xml:space="preserve"><g><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="-186.0661" y1="213.0815" x2="-197" y2="212" gradientTransform="matrix(0 1 1 0 -207.543 206.8626)"><stop offset="0" style="stop-color:#12ABE2"/><stop offset="0.0533" style="stop-color:#2AB3E5;stop-opacity:0.9455"/><stop offset="0.1922" style="stop-color:#61C7EC;stop-opacity:0.8033"/><stop offset="0.3319" style="stop-color:#92D8F2;stop-opacity:0.6604"/><stop offset="0.4694" style="stop-color:#B9E6F6;stop-opacity:0.5197"/><stop offset="0.6041" style="stop-color:#D8F1FA;stop-opacity:0.3818"/><stop offset="0.7354" style="stop-color:#EDF9FD;stop-opacity:0.2475"/><stop offset="0.8616" style="stop-color:#FBFDFE;stop-opacity:0.1183"/><stop offset="0.9773" style="stop-color:#FFFFFF;stop-opacity:0"/></linearGradient><path fill-rule="evenodd" clip-rule="evenodd" fill="url(#SVGID_1_)" d="M0.038,12.5c0,6.869,5.592,12.456,12.461,12.456 c6.87,0,12.462-5.587,12.462-12.456c0-6.868-5.592-12.456-12.462-12.456C5.631,0.044,0.038,5.632,0.038,12.5z M22.198,12.5 c0,5.351-4.35,9.704-9.698,9.704c-5.347,0-9.698-4.353-9.698-9.704c0-5.351,4.35-9.704,9.698-9.704 C17.848,2.796,22.198,7.149,22.198,12.5z"/><g><defs><path id="SVGID_5_" d="M0.044,12.5c0,6.87,5.591,12.459,12.459,12.459c6.868,0,12.459-5.589,12.459-12.459 c0-6.87-5.591-12.459-12.459-12.459C5.635,0.041,0.044,5.63,0.044,12.5z M22.197,12.5c0,5.351-4.348,9.704-9.694,9.704 c-5.345,0-9.694-4.353-9.694-9.704s4.348-9.704,9.694-9.704C17.848,2.796,22.197,7.149,22.197,12.5z"/></defs><clipPath id="SVGID_2_"><use xlink:href="#SVGID_5_" overflow="visible"/></clipPath><rect x="-4" y="-1" clip-path="url(#SVGID_2_)" fill-rule="evenodd" clip-rule="evenodd" fill="#12ABE2" width="17" height="23"/></g></g></svg> ');
        this.emailSentImage = utl.createElement("div", { "class": "email-screen-sent-image hidden" }, this.emailSendingImageContainer, '<svg class="player-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 12 9.022" enable-background="new 0 0 12 9.022" xml:space="preserve"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.862,1.642L4.489,8.745L4.359,8.876c-0.051,0.05-0.11,0.087-0.173,0.111 c-0.03,0.012-0.062,0.014-0.094,0.019c-0.03,0.005-0.059,0.016-0.089,0.016c-0.03,0-0.059-0.01-0.089-0.016 C3.883,9.001,3.85,8.999,3.82,8.987c-0.062-0.024-0.122-0.06-0.173-0.111l-0.13-0.131l-3.38-3.246 c-0.189-0.187-0.183-0.495,0.011-0.687l0.796-0.807c0.193-0.194,0.504-0.197,0.693-0.01l2.364,2.319l6.358-6.176 c0.189-0.187,0.5-0.184,0.693,0.01l0.797,0.808C12.045,1.147,12.051,1.455,11.862,1.642z"/></svg> ');
    }
    function assignEvents() {
        this.emailFormText.addEventListener("click", toggleEmailName.bind(this));
        this.emailFormText.addEventListener("blur", toggleEmailName.bind(this));
        this.emailFormText.addEventListener("focus", toggleEmailName.bind(this));
        this.emailFormInput.addEventListener("click", toggleMessageName.bind(this));
        this.emailFormInput.addEventListener("blur", toggleMessageName.bind(this));
        this.emailFormInput.addEventListener("focus", toggleMessageName.bind(this));
    }
    var state = vdb.skins.shareScreen.ShareScreenStatesEnum;
    return { validateEmail: function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }, sendEmail: function sendEmail(e) {
            e.preventDefault();
            if (this.validateEmail(this.emailFormText.value)) {
                vdb.Utils.addClass(this.emailSendingOuterContainer, "email-screen-sending-outer-container-active fadeIn");
                vdb.Utils.addClass(this.emailScreen, "fadeOut");
                window.addEventListener("beforeunload", function () {
                    setSentImage.call(this);
                }.bind(this));
                if (this.bottomTimePanel.isCheckBoxChecked()) {
                    this.shareScreen.getSocialNetwork("email").sendEmail(this.emailFormText.value, this.emailFormInput.value, this.bottomTimePanel.getTime());
                } else {
                    this.shareScreen.getSocialNetwork("email").sendEmail(this.emailFormText.value, this.emailFormInput.value);
                }
                if (vdb.Utils.mobileOs()) {
                    setTimeout(setSentImage.bind(this), 1500);
                }
                this.timer = setTimeout(function () {
                    this.shareScreen.close();
                }.bind(this), 2E3);
            }
            this.toggleEmailErrorMessage();
        }, toggleEmailErrorMessage: function toggleEmailErrorMessage() {
            var utl = vdb.Utils;
            if (this.validateEmail(this.emailFormText.value)) {
                utl.removeClass(this.emailFormLine, "email-screen-error");
                utl.addClass(this.emailFormErrorMessage, "hidden");
                utl.addClass(this.emailFormExclamationMark, "hidden");
            } else {
                utl.addClass(this.emailFormLine, "email-screen-error");
                utl.removeClass(this.emailFormErrorMessage, "hidden");
                utl.removeClass(this.emailFormExclamationMark, "hidden");
            }
        }, toggleFullScreenStyles: function toggleFullScreenStyles() {
            if (this.shareScreen.isFullScreen()) {
                vdb.Utils.toggleClass(this.emailFormScreenButton, "email-screen-button-full-screen", !vdb.Utils.hasClass(this.emailFormScreenButton, "email-screen-button-full-screen"));
                vdb.Utils.toggleClass(this.emailSendingContainer, "email-screen-sending-container-full-screen", !vdb.Utils.hasClass(this.emailSendingContainer, "email-screen-sending-container-full-screen"));
                vdb.Utils.toggleClass(this.emailSendingText, "email-screen-sending-text-full-screen", !vdb.Utils.hasClass(this.emailSendingText, "email-screen-sending-text-full-screen"));
                vdb.Utils.toggleClass(this.emailSentText, "email-screen-sent-text-full-screen", !vdb.Utils.hasClass(this.emailSentText, "email-screen-sent-text-full-screen"));
                vdb.Utils.toggleClass(this.emailSendingImage, "email-screen-sending-image-full-screen", !vdb.Utils.hasClass(this.emailSendingImage, "email-screen-sending-image-full-screen"));
                vdb.Utils.toggleClass(this.emailSentImage, "email-screen-sent-image-full-screen", !vdb.Utils.hasClass(this.emailSentImage, "email-screen-sent-image-full-screen"));
            }
        }, hideAbstractEmailScreen: function hideAbstractEmailScreen() {
            vdb.Utils.addClass(this.emailScreenWrapper, "fadeOut");
            this.shareScreen.hideBackButton();
            clearTimeout(this.timer);
            this.shareScreen.getCurrentState().emailScreen = state.EMAIL_SCREEN_CLOSED;
        }, hideSendingScreen: function hideSendingScreen() {
            closeSendingScreen.call(this);
            setSendingImage.call(this);
        }, init: function init(shareScreen) {
            var cssText = '[class^="email-screen"]{font-family:"Arial";position:relative}.email-screen-wrapper{width:100%;height:100%;position:absolute;top:0;left:0;opacity:0;z-index:2}.email-screen-container{width:100%;height:100%;position:absolute;top:0;left:0;opacity:1}.email-screen-email-container{width:100%;height:100%;display:table;text-align:left;opacity:1}.email-screen-email-form{display:table-cell;vertical-align:middle;text-align:center;height:100%}.email-screen-header{font-size:20px;font-weight:bold;color:#fff}.email-screen-input{color:#d0d0d0}.email-screen-line{box-sizing:border-box;width:100%;border:1px solid #d0d0d0}.email-screen-input{border:0;background:0;font-size:16px;color:#d0d0d0;width:100%}.email-screen-input-message{border:0;background:0;width:100%;font-size:16px;color:#d0d0d0}.email-screen-input:focus,.email-screen-input-message:focus{outline:0}.email-screen-sending-outer-container{opacity:0}.email-screen-sending-container-wrapper{display:table;width:100%;height:100%}.email-screen-sending-outer-container-active{display:table-cell;text-align:center;vertical-align:middle;opacity:0}.email-screen-sending-container{display:inline-block;width:95px;height:95px;box-sizing:border-box;cursor:pointer;background-color:rgba(38,38,38,0.85);border:3px solid #12abe2;border-radius:50%}.email-screen-sending-inner-table-container{display:table;width:100%;height:100%}.email-screen-sending-inner-container{display:table-cell;text-align:center;vertical-align:middle}.email-screen-sending-text,.email-screen-sent-text{font-size:14px;font-weight:bold;text-align:center;color:#12abe2}.email-screen-sending-image-container{display:inline-block}.email-screen-sending-image,.email-screen-sent-image{width:25px;height:25px}.email-screen-sending-image{margin:6px}.email-screen-sent-image{margin-top:14px}.email-screen-sending-image>svg,.email-screen-sent-image>svg{fill:#12abe2}.email-screen-name{color:#d0d0d0;font-size:18px;top:0;transition:.3s all ease-in-out;-webkit-transition:.3s all ease-in-out;-moz-transition:.3s all ease-in-out}.email-screen-name-container{margin:34px 0 -16px 0;height:18px}.email-screen-message{color:#d0d0d0;font-size:16px;top:0;transition:.3s all ease-in-out;-webkit-transition:.3s all ease-in-out;-moz-transition:.3s all ease-in-out}.email-screen-message-container{margin:0 0 -18px;height:18px;transition:.3s all ease-in-out;-webkit-transition:.3s all ease-in-out;-moz-transition:.3s all ease-in-out}.email-message-container-filled{margin:0 0 -16px}.email-screen-filled-email{font-size:12px;color:#999;top:-100%}.email-screen-error{border:2px solid #ff0013}.email-screen-error-message{font-size:12px;text-align:right;line-height:14px;color:#ff0013;position:absolute;margin-top:6px}.email-screen-inner-container{display:inline-block;width:50%;height:50%;max-height:240px;min-height:193px;max-width:500px;min-width:254px;margin-top:10px;text-align:left}.email-screen-inner-fields-container{width:50%;height:14%;min-width:200px;min-height:30px}.email-screen-inputs-container{width:100%;height:54%}.email-screen-second-line-container{position:absolute;bottom:0;width:100%}.email-screen-first-line-container{position:absolute;top:0;width:100%}.email-screen-exclamation-mark{right:0;width:11px;height:11px;position:absolute;top:35%}.email-screen-exclamation-mark>svg{height:11px;display:table-cell;vertical-align:middle}.hidden{display:none}.invisible{visibility:hidden}.empty{color:transparent}.email-screen-inputs-container-col-1{position:relative;width:74%;height:100%;float:left}.email-screen-inputs-container-col-2{height:100%;width:25%;right:0;float:right}@media(max-width:560px){.email-screen-header{font-size:18px}.email-screen-input{font-size:14px}.email-screen-input-message{font-size:14px}.email-screen-sending-text,.email-screen-sent-text{font-size:12px}.email-screen-name{font-size:16px}.email-screen-message{font-size:14px}.email-screen-filled-email{font-size:10px}.email-screen-error-message{font-size:10px}.email-message-container-filled{margin:40px 0 -20px 0}.email-screen-name-container{margin:34px 0 -20px 0}}';
            vdb.dom.embedCssToHead(cssText);
            this.shareScreen = shareScreen;
            createEmailScreen.call(this);
            assignEvents.call(this);
            toggleEmailName.call(this);
            toggleMessageName.call(this);
            fadeInAfterShareScreenFadeOut.call(this);
        } };
}());
vdb.skins.shareScreen.EmailScreenDesktop = vdb.skins.shareScreen.EmailScreen.extend(function () {
    function createEmailScreenDesktop() {
        this.emailFormHeader = vdb.Utils.createElement("div", { "class": "email-screen-header" }, null, "E-MAIL:");
        this.emailFormInnerContainer.insertBefore(this.emailFormHeader, this.emailFormInnerContainer.firstChild);
        this.emailFormScreenButton = vdb.Utils.createElement("input", { "type": "submit", "class": "email-screen-button", "value": "SEND" }, this.emailFormInputsContainerCol2);
    }
    function assignEvents() {
        this.emailFormScreenButton.addEventListener("click", this.sendEmail.bind(this));
        this.shareScreen.getPlayer().addEventListener(vdb.constants.PlayerEvent.ENTER_FULLSCREEN, this.toggleFullScreenStyles.bind(this));
        this.shareScreen.getPlayer().addEventListener(vdb.constants.PlayerEvent.EXIT_FULLSCREEN, this.toggleFullScreenStyles.bind(this));
        this.emailSendingContainer.addEventListener("click", this.hideSendingScreen.bind(this));
    }
    return { init: function init(shareScreen) {
            this._super(shareScreen);
            vdb.dom.embedCssToHead(".email-screen-button{font-size:12px;font-weight:bold;color:#12abe2;cursor:pointer;width:78%;height:34%;background-color:rgba(38,38,38,0.85);border:1px solid rgba(151,151,151,0.5);border-radius:2px;right:0;bottom:0;position:absolute;padding:5px}@media(max-width:560px){.email-screen-button{font-size:11px}}");
            createEmailScreenDesktop.call(this);
            this.toggleFullScreenStyles();
            assignEvents.call(this);
        }, hideEmailScreen: function hideEmailScreen() {
            this.hideAbstractEmailScreen();
            this.hideSendingScreen.call(this);
            clearInterval(this.timer);
        } };
}());
vdb.skins.shareScreen.EmailScreenMobile = vdb.skins.shareScreen.EmailScreen.extend(function () {
    function addMobileStyles() {
        vdb.Utils.addClass(this.emailFormName, "email-screen-name-mobile");
        vdb.Utils.addClass(this.emailFormText, "email-screen-input-mobile");
        vdb.Utils.addClass(this.emailFormLine, "email-screen-line-mobile");
        vdb.Utils.addClass(this.emailFormFieldsWrapper, "email-screen-first-line-inner-container-mobile");
        vdb.Utils.addClass(this.emailFormInnerContainer, "email-screen-inner-container-mobile");
        vdb.Utils.addClass(this.emailFormInnerFieldsContainer, "email-screen-inner-fields-container-mobile");
        vdb.Utils.addClass(this.emailFormSecondLine, "email-screen-line-mobile");
        vdb.Utils.addClass(this.emailFormInput, "email-screen-input-mobile");
        vdb.Utils.addClass(this.emailSecondLineContainer, "email-screen-second-line-container-mobile");
        vdb.Utils.addClass(this.emailFormSecondLine, "email-screen-second-line-mobile");
        vdb.Utils.addClass(this.emailScreen, "email-screen-container-mobile");
        vdb.Utils.addClass(this.emailFormExclamationMark, "email-screen-exclamation-mark-mobile");
        vdb.Utils.addClass(this.emailFormFieldsWrapperInputFiledContainer, "email-screen-first-line-inner-container-input-field-wrapper-mobile");
        vdb.Utils.addClass(this.emailScreenSecondLineInnerContainer, "email-screen-second-line-inner-container-mobile");
    }
    function firstEmailStep() {
        updateNextButtonStep.call(this);
        toggleFieldsOnFirstStep.call(this);
        toggleNextButtonIcon.call(this);
        vdb.Utils.addClass(this.mobileWordsCounterWidget, "hidden");
    }
    function secondEmailStep() {
        if (this.validateEmail(this.emailFormText.value)) {
            toggleFieldsOnFirstStep.call(this);
            toggleFilesOnSecondStep.call(this);
            toggleNextButtonIcon.call(this);
            vdb.Utils.removeClass(this.mobileWordsCounterWidget, "hidden");
            updateWordsCounter.call(this);
            if (strUtl.isEmpty(this.emailFormInput.value)) {
                vdb.Utils.addClass(this.mobileNextButton, "empty-mobile-next-button");
            }
        } else {
            this.toggleEmailErrorMessage();
        }
    }
    function updateNextButtonStep() {
        if (!vdb.Utils.hasClass(this.mobileNextButton, "secondMobileStep")) {
            if (this.validateEmail(this.emailFormText.value)) {
                vdb.Utils.removeClass(this.mobileNextButton, "empty-mobile-next-button");
            } else {
                vdb.Utils.addClass(this.mobileNextButton, "empty-mobile-next-button");
            }
        } else {
            if (!strUtl.isEmpty(this.emailFormInput.value)) {
                vdb.Utils.removeClass(this.mobileNextButton, "empty-mobile-next-button");
            }
        }
    }
    function toggleFieldsOnFirstStep() {
        vdb.Utils.addClass(this.emailSecondLineContainer, "hidden");
        vdb.Utils.removeClass(this.emailFirstLineContainer, "hidden");
    }
    function toggleFilesOnSecondStep() {
        vdb.Utils.addClass(this.emailFirstLineContainer, "hidden");
        vdb.Utils.removeClass(this.emailSecondLineContainer, "hidden");
    }
    function sendEmail(e) {
        if (!strUtl.isEmpty(this.emailFormInput.value) && !strUtl.isEmpty(this.emailFormText.value)) {
            this.sendEmail(e);
            firstEmailStep.call(this);
            toggleFilesOnSecondStep.call(this);
        }
    }
    function toggleNextButtonIcon() {
        if (vdb.Utils.hasClass(this.emailSecondLineContainer, "hidden")) {
            this.mobileNextButton.innerHTML = '<svg class="player-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 29.83 22.97" enable-background="new 0 0 29.83 22.97" xml:space="preserve"><path d="M0,11.485L10.332,0l2.294,2.494L6.169,9.672H29.83v3.626H6.169l6.457,7.178l-2.294,2.494L0,11.485z"/></svg> ';
            vdb.Utils.removeClass(this.mobileNextButton, "secondMobileStep");
        } else {
            this.mobileNextButton.innerHTML = '<svg class="player-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 12"><path d="M1.8,0C1.408,0,1.048,0.124,0.752,0.333L0.759,0.34l7.875,7.306c0.174,0.161,0.557,0.161,0.731,0L17.24,0.34l0.007-0.007 C16.952,0.124,16.592,0,16.2,0H1.8L1.8,0z M0.176,1.014C0.064,1.245,0,1.503,0,1.778v8.444c0,0.335,0.099,0.643,0.26,0.91 l5.569-4.868L0.176,1.014z M17.824,1.014l-5.653,5.25l5.569,4.868c0.162-0.267,0.26-0.575,0.26-0.91V1.778 C18,1.503,17.936,1.245,17.824,1.014z M6.49,6.875L0.9,11.757C1.165,11.908,1.47,12,1.8,12h14.4c0.33,0,0.635-0.091,0.9-0.243 l-5.59-4.882L9.984,8.292c-0.551,0.511-1.418,0.511-1.969,0L6.49,6.875L6.49,6.875z"/></svg> ';
            vdb.Utils.addClass(this.mobileNextButton, "secondMobileStep");
        }
    }
    function hideSendingScreenMobile() {
        this.hideSendingScreen();
        firstEmailStep.call(this);
    }
    function nextButtonClick(e) {
        if (vdb.Utils.hasClass(this.emailSecondLineContainer, "hidden")) {
            secondEmailStep.call(this);
        } else {
            sendEmail.call(this, e);
        }
    }
    function updateWordsCounter() {
        this.mobileWordsCounter.value = this.emailFormInput.value.length;
    }
    function createEmailScreenMobile() {
        this.mobileNextButton = vdb.Utils.createElement("div", { "class": "email-screen-next-button-mobile" }, this.emailFormInputsContainerCol2);
        this.mobileWordsCounterWidget = vdb.Utils.createElement("div", { "class": "email-screen-words-counter-widget" }, this.emailSecondLineContainer);
        this.mobileWordsCounter = vdb.Utils.createElement("input", { "class": "email-screen-mobile-counter", "type": "text", "size": "2", "value": "0" }, this.mobileWordsCounterWidget);
        this.mobileWordsCounterText = vdb.Utils.createElement("input", { "class": "email-screen-mobile-counter-text", "type": "text", "size": "7", "value": "/60 Char." }, this.mobileWordsCounterWidget);
    }
    function assignEvents() {
        this.emailFormText.addEventListener("input", updateNextButtonStep.bind(this));
        this.emailFormInput.addEventListener("input", updateNextButtonStep.bind(this));
        this.mobileNextButton.addEventListener("click", nextButtonClick.bind(this));
        this.emailSendingContainer.addEventListener("click", hideSendingScreenMobile.bind(this));
        this.emailFormInput.addEventListener("input", updateWordsCounter.bind(this));
    }
    var strUtl = vdb.utils.StringUtils;
    return { init: function init(shareScreen) {
            this._super(shareScreen);
            vdb.dom.embedCssToHead(".email-screen-container-mobile{height:calc(100% - 44px)}.email-screen-name-mobile{font-size:16px}.filled-email-mobile{font-size:11px;top:-100%}.email-screen-input-mobile{width:100%;margin-bottom:0;font-size:16px}.email-screen-line-mobile{width:90%}.email-screen-first-line-inner-container-mobile{display:table-cell;vertical-align:bottom}.email-screen-next-button-mobile{width:48px;height:48px;background-color:#06a99a;border-radius:100%;text-align:center;vertical-align:middle;display:table-cell;transform:rotate(180deg);-webkit-transform:rotate(180deg);-moz-transform:rotate(180deg);-ms-transform:rotate(180deg);top:22px;margin:auto;font-size:0}.email-screen-next-button-mobile>svg{width:21px;height:16px;vertical-align:middle}.secondMobileStep>svg{width:15px;height:12px}.empty-mobile-next-button{opacity:.55}.email-screen-inner-container-mobile{width:80%;height:50%;max-height:120px;min-height:0;max-width:480px;min-width:0}.email-screen-inner-fields-container-mobile{min-height:22px;min-width:136px;width:50%;height:28%;position:absolute;bottom:0}.secondMobileStep{transform:rotate(0deg);-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);top:20px}.email-screen-mobile-counter-text{font-family:Arial;font-size:10px;color:#999;text-align:right;border:0;background:transparent;padding:0;width:40px}.email-screen-second-line-container-mobile{display:table-cell;vertical-align:bottom;width:84%}.email-screen-second-line-inner-container{width:90%}.email-screen-second-line-mobile{width:100%}.email-screen-mobile-counter{font-family:Arial;font-size:10px;color:#12abe2;text-align:right;border:0;background:transparent;padding:0}.email-screen-words-counter-widget{display:inline-block;text-align:right;width:100%;top:15%}.email-screen-exclamation-mark-mobile{right:10%}.email-screen-first-line-inner-container-input-field-wrapper-mobile{height:0}.email-screen-second-line-inner-container-mobile{margin-bottom:-4px}.hidden{display:none}.email-screen-inner-container-mobile .email-screen-inputs-container{height:70%}.email-screen-inner-container-mobile .email-screen-inputs-container-col-1{width:86%}.email-screen-inner-container-mobile .email-screen-inputs-container-col-2{width:12%}.email-screen-inner-container-mobile .email-screen-first-line-container,.email-screen-inner-container-mobile .email-screen-second-line-container{height:100%}.email-screen-inner-container-mobile .bottom-container{margin-top:0}.email-screen-inner-container-mobile .email-screen-message-container,.email-screen-inner-container-mobile .email-screen-name-container{margin:34px 0 -16px 0}@media(max-width:560px){.email-screen-name-mobile,.email-screen-inner-container-mobile .email-screen-message,.email-screen-input-mobile,.email-screen-inner-container-mobile .text-second-inner-container{font-size:14px}.email-screen-inner-container-mobile .email-screen-message-container,.email-screen-inner-container-mobile .email-screen-name-container{margin:34px 0 -18px 0}}@media(max-width:480px){.email-screen-name-mobile,.email-screen-inner-container-mobile .email-screen-message,.email-screen-input-mobile,.email-screen-inner-container-mobile .text-second-inner-container,.email-screen-inner-fields-container-mobile .text,.email-screen-inner-fields-container-mobile .time{font-size:12px}.email-screen-inner-container-mobile .email-screen-message-container,.email-screen-inner-container-mobile .email-screen-name-container{margin:34px 0 -20px 0}.email-screen-next-button-mobile{width:38px;height:38px}.email-screen-next-button-mobile>svg{width:16px;height:11px}.email-screen-inner-container-mobile{height:56%}.email-screen-inner-container-mobile{min-height:100px}}@media(max-width:360px){.email-screen-next-button-mobile{width:38px;height:38px}.email-screen-next-button-mobile>svg{width:16px;height:11px}}@media(max-width:320px){.email-screen-next-button-mobile{width:30px;height:30px}}");
            addMobileStyles.call(this);
            createEmailScreenMobile.call(this);
            firstEmailStep.call(this);
            assignEvents.call(this);
        }, hideEmailScreen: function hideEmailScreen() {
            hideSendingScreenMobile.call(this);
            this.hideAbstractEmailScreen();
            firstEmailStep.call(this);
            clearInterval(this.timer);
        } };
}());
vdb.skins.shareScreen.EmbedScreen = vdb.core.Class.extend(function () {
    function getEmbedCode(socialNetworks) {
        var embed = socialNetworks.filter(function (socialNetwork) {
            return socialNetwork.getType() === "embed";
        })[0];
        if (embed) {
            embed.setControls(utl.createElement("div"), utl.createElement("div"), this.embedScreenInput, this.embedScreenButton);
            embed.share();
        }
    }
    function showCopiedContainer() {
        this.copiedScreen.showCopiedContainer();
    }
    function hideCopiedContainer() {
        this.copiedScreen.hideCopiedContainer();
    }
    function fadeInAfterShareScreen() {
        var transitions = ["transitionend", "oTransitionEnd", "transitionend", "webkitTransitionEnd"];
        for (var i = 0; i < transitions.length; i++) {
            this.shareScreen.view.socialDock.addEventListener(transitions[i], function () {
                this.currentState = this.shareScreen.getCurrentState();
                if (this.currentState.embedScreen === state.EMBED_SCREEN_OPENED) {
                    this.showEmbedScreen();
                    this.shareScreen.showBackButton();
                }
            }.bind(this));
            this.embedScreenOuterContainer.addEventListener(transitions[i], function () {
                if (this.currentState.copiedScreen === state.COPIED_SCREEN_OPENED) {
                    showCopiedContainer.call(this);
                }
            }.bind(this));
        }
    }
    function createEmbedScreen() {
        this.copiedScreen = this.shareScreen.getCopiedScreen();
        this.embedScreenOuterContainer = utl.createElement("div", { "class": "embed-screen-outer-container fadeOut" }, this.shareScreen.getShareScreenContainer());
        this.embedScreen = utl.createElement("div", { "class": "embed-screen" }, this.embedScreenOuterContainer);
        this.embedScreenContainer = utl.createElement("div", { "class": "embed-screen-container" }, this.embedScreen);
        this.embedScreenHeader = utl.createElement("div", { "class": "embed-screen-header" }, this.embedScreenContainer, this.embedScreenTitle);
        this.embedScreenInnerContainer = utl.createElement("div", { "class": "embed-screen-inner-container" }, this.embedScreenContainer);
        this.embedScreenFieldsWrapper = utl.createElement("div", { "class": "embed-screen-text-area-wrapper" }, this.embedScreenInnerContainer);
        this.embedScreenInput = utl.createElement("textarea", { "class": "embed-screen-input", "readonly": true }, this.embedScreenFieldsWrapper);
        this.embedScreenLine = utl.createElement("div", { "class": "embed-screen-line" }, this.embedScreenFieldsWrapper);
    }
    function assignEvents() {
        this.copiedScreen.copiedOuterContainer.addEventListener("click", this.hideEmbedScreen.bind(this));
    }
    var utl = vdb.Utils;
    var state = vdb.skins.shareScreen.ShareScreenStatesEnum;
    return { init: function init(shareScreen, settings) {
            var cssText = '[class^="embed-screen"]{position:relative}.embed-screen{display:table-cell;vertical-align:middle;width:100%;height:100%}.embed-screen-outer-container{width:100%;height:100%;display:table;z-index:2;opacity:1;position:absolute;top:0;left:0;text-align:center}.embed-screen-container{width:50%;height:30%;max-height:184px;min-height:80px;max-width:570px;min-width:254px;display:inline-block;text-align:left;position:relative}.embed-screen-inner-container{height:60%;width:100%;bottom:0;white-space:nowrap}.embed-screen-fields-wrapper{display:table-cell;height:100%;width:100%;vertical-align:bottom;text-align:left;position:absolute;top:0;left:0}.embed-screen-header{font-family:Arial;font-size:18px;font-weight:bold;color:#fff;margin-bottom:28px}.embed-screen-input{width:100%;font-family:monospace;font-size:13px;color:#d0d0d0;background:0;border:0;position:absolute;bottom:0;margin-bottom:3px;left:0;height:100%;word-break:break-all;overflow:hidden;resize:none}.embed-screen-input::selection{background:transparent}.embed-screen-input:focus{outline:0}.embed-screen-line{box-sizing:border-box;width:100%;border:1px solid #d0d0d0;bottom:0;position:absolute;left:0}.embed-screen-button{width:97%;height:51%;background-color:rgba(38,38,38,0.85);border:1px solid rgba(151,151,151,0.5);border-radius:2px;font-family:Arial;font-size:12px;font-weight:bold;line-height:18px;color:#12abe2;cursor:pointer;text-transform:uppercase;position:absolute;bottom:0;right:0}.embed-screen-back-button{top:8px;left:8px;width:30px;height:23px;cursor:pointer}.hidden{display:none}.embed-screen-copied-container{box-sizing:border-box;width:95px;height:95px;border:3px solid #12abe2;border-radius:50%;background-color:rgba(38,38,38,0.85);text-align:left;position:relative}.embed-screen-copied-text{width:59%;height:17%;font-family:Arial;font-size:14px;font-weight:bold;line-height:16px;color:#12abe2;top:29%;left:21%}.embed-screen-copied-image{width:19%;height:14%;top:61%;left:41%;position:absolute}.embed-screen-copied-image>svg{fill:#12abe2}.show-copied-container{display:inline-block}.embed-screen-text-area-wrapper{float:left;height:100%;width:76%}.embed-screen-button-wrapper{position:relative;float:right;height:100%;width:20%}@media(max-width:560px){.embed-screen-header{font-size:14px}.embed-screen-copied-text{font-size:10px}.embed-screen-input{font-size:9px}.embed-screen-button{font-size:8px}}';
            vdb.dom.embedCssToHead(cssText);
            this.shareScreen = shareScreen;
            this.currentState = this.shareScreen.getCurrentState();
            this.embedScreenTitle = settings.embedScreenTitle || "EMBED Code:";
            this.onCopyEmbedCodeSuccess = settings.onCopyEmbedCodeSuccess;
            createEmbedScreen.call(this);
            getEmbedCode.call(this, this.shareScreen.getSocialNetworks());
            assignEvents.call(this);
            if (this.currentState.embedScreen === state.EMBED_SCREEN_OPENED) {
                this.showEmbedScreen();
            } else {
                fadeInAfterShareScreen.call(this);
            }
        }, hideEmbedScreen: function hideEmbedScreen() {
            this.shareScreen.getCurrentState().embedScreen = state.EMBED_SCREEN_CLOSED;
            utl.removeClass(this.embedScreenOuterContainer, "fadeIn");
            utl.addClass(this.embedScreenOuterContainer, "fadeOut");
            hideCopiedContainer.call(this);
            this.shareScreen.fadeInShareScreen();
            clearTimeout(this.timer);
        }, close: function close() {
            utl.replaceClass(this.embedScreenOuterContainer, "fadeIn", "fadeOut");
            if (this.embedScreenButton) {
                this.embedScreenButton.value = "Copy";
            } else {
                if (this.embedScreenMobileButton) {
                    this.embedScreenMobileButton.innerHTML = "Copy";
                }
            }
        }, copyTag: function copyTag(e) {
            e.preventDefault();
            var isCopySucceeded = utl.copyToClipboard(this.embedScreenInput);
            if (isCopySucceeded) {
                if (this.onCopyEmbedCodeSuccess) {
                    this.onCopyEmbedCodeSuccess(this.embedScreenButton || this.embedScreenMobileButton);
                } else {
                    utl.replaceClass(this.embedScreenOuterContainer, "fadeIn", "fadeOut");
                    this.shareScreen.getCurrentState().copiedScreen = state.COPIED_SCREEN_OPENED;
                    this.timer = setTimeout(function () {
                        this.shareScreen.close();
                    }.bind(this), 2E3);
                }
            } else {
                this.shareScreen.showErrorMessage();
            }
        }, showEmbedScreen: function showEmbedScreen() {
            utl.replaceClass(this.embedScreenOuterContainer, "fadeOut", "fadeIn");
        } };
}());
vdb.skins.shareScreen.EmbedScreenDesktop = vdb.skins.shareScreen.EmbedScreen.extend(function () {
    function toggleFullScreenStyles(e) {
        if (this.shareScreen.isFullScreen()) {
            if (e === undefined || e.eventName === vdb.constants.PlayerEvent.ENTER_FULLSCREEN) {
                this.copiedScreen.addFullScreenStyles();
            } else {
                this.copiedScreen.removeFullScreenStyles();
            }
        }
    }
    function createEmbedScreenDesktop() {
        this.embedScreenButtonWrapper = utl.createElement("div", { "class": "embed-screen-button-wrapper" }, this.embedScreenInnerContainer);
        this.embedScreenButton = utl.createElement("input", { "class": "embed-screen-button", "type": "submit", "value": "Copy" }, this.embedScreenButtonWrapper);
    }
    function assignEvents() {
        this.shareScreen.getPlayer().addEventListener(vdb.constants.PlayerEvent.ENTER_FULLSCREEN, toggleFullScreenStyles.bind(this));
        this.shareScreen.getPlayer().addEventListener(vdb.constants.PlayerEvent.EXIT_FULLSCREEN, toggleFullScreenStyles.bind(this));
        this.embedScreenButton.addEventListener("click", this.copyTag.bind(this));
    }
    var utl = vdb.Utils;
    return { init: function init(shareScreen, settings) {
            this._super(shareScreen, settings);
            createEmbedScreenDesktop.call(this);
            toggleFullScreenStyles.call(this);
            assignEvents.call(this);
        } };
}());
vdb.skins.shareScreen.EmbedScreenMobile = vdb.skins.shareScreen.EmbedScreen.extend(function () {
    function setStyles() {
        utl.addClass(this.embedScreenHeader, "embed-screen-mobile-header");
        utl.addClass(this.embedScreenOuterContainer, "embed-screen-outer-container-mobile");
        utl.addClass(this.embedScreenContainer, "embed-screen-container-mobile");
    }
    function createEmbedScreenMobile() {
        this.embedScreenMobileButtonContainer = utl.createElement("div", { "class": "embed-screen-mobile-button-container" }, this.embedScreenInnerContainer);
        this.embedScreenMobileButton = utl.createElement("div", { "class": "embed-screen-mobile-button" }, this.embedScreenMobileButtonContainer, "Copy");
    }
    function assignEvents() {
        this.embedScreenMobileButton.addEventListener("click", this.copyTag.bind(this));
    }
    var utl = vdb.Utils;
    return { init: function init(shareScreen, settings) {
            this._super(shareScreen, settings);
            vdb.dom.embedCssToHead(".embed-screen-outer-container-mobile{height:calc(100% - 44px)}.embed-screen-mobile-button-container{width:48px;height:48px;position:absolute;right:0;display:table;top:0}.embed-screen-mobile-button{width:48px;height:48px;background-color:#56798a;border-radius:100%;text-align:center;display:table-cell;vertical-align:middle;font-size:9px;font-weight:bold;color:#fff;font-family:Arial;text-transform:uppercase}.embed-screen-mobile-header{font-size:11px;font-weight:normal;color:#999;margin-bottom:24px}");
            setStyles.call(this);
            createEmbedScreenMobile.call(this);
            assignEvents.call(this);
        } };
}());
vdb.skins.shareScreen.LinkScreen = vdb.core.Class.extend(function () {
    function getLink() {
        var playerInfo = this.shareScreen.getPlayerInfo();
        var time = this.bottomPanel.isCheckBoxChecked() ? this.bottomPanel.getTime() : undefined;
        return this.shareScreen.getSocialNetwork("link") && this.shareScreen.getSocialNetwork("link").getLink(playerInfo.videoId, playerInfo.bcid, time);
    }
    function updateLink() {
        this.linkScreenInput.value = getLink.call(this);
    }
    function fadeInAfterShareScreen() {
        var transitions = ["transitionend", "oTransitionEnd", "transitionend", "webkitTransitionEnd"];
        var currentState;
        for (var i = 0; i < transitions.length; i++) {
            this.shareScreen.view.socialDock.addEventListener(transitions[i], function () {
                currentState = this.shareScreen.getCurrentState();
                if (currentState.linkScreen === state.LINK_SCREEN_OPENED) {
                    this.bottomPanel.uncheckCheckBox();
                    utl.replaceClass(this.linkScreenOuterContainer, "fadeOut", "fadeIn");
                    this.shareScreen.showBackButton();
                    updateLink.call(this);
                }
            }.bind(this));
            this.linkScreenOuterContainer.addEventListener(transitions[i], function () {
                if (currentState.copiedScreen === state.COPIED_SCREEN_OPENED) {
                    this.copiedScreen.showCopiedContainer();
                }
            }.bind(this));
        }
    }
    function createLinkScreen() {
        this.linkScreenOuterContainer = utl.createElement("div", { "class": "link-screen-outer-container fadeOut" }, this.shareScreen.getShareScreenContainer());
        this.copiedScreen = this.shareScreen.getCopiedScreen();
        this.linkScreen = utl.createElement("div", { "class": "link-screen" }, this.linkScreenOuterContainer);
        this.linkScreenContainer = utl.createElement("div", { "class": "link-screen-container" }, this.linkScreen);
        this.linkScreenFieldsContainer = utl.createElement("div", { "class": "link-screen-fields-container" }, this.linkScreenContainer);
        this.linkScreenFieldsInnerContainer = utl.createElement("div", { "class": "link-screen-fields-inner-container" }, this.linkScreenFieldsContainer);
        this.bottomPanel = new vdb.skins.shareScreen.BottomTimePanel(this.shareScreen, this.linkScreenContainer);
        this.linkScreenInput = utl.createElement("input", { "class": "link-screen-input", "type": "text", "size": "40", "value": getLink.call(this) }, this.linkScreenFieldsInnerContainer);
        this.linkFormLine = utl.createElement("div", { "class": "link-screen-line" }, this.linkScreenFieldsInnerContainer);
    }
    function assignEvents() {
        this.copiedScreen.copiedOuterContainer.addEventListener("click", this.hideLinkPageScreen.bind(this));
        this.checkoBox.addEventListener("click", updateLink.bind(this));
    }
    var utl = vdb.Utils;
    var state = vdb.skins.shareScreen.ShareScreenStatesEnum;
    return { init: function init(shareScreen) {
            vdb.dom.embedCssToHead('[class^="link-screen"]{position:relative;font-family:Arial}.link-screen{display:table-cell;vertical-align:middle;width:100%;height:100%}.link-screen-container{width:47%;height:31.5%;text-align:left;position:relative;display:inline-block}.link-screen-header{font-size:18px;font-weight:bold;color:#fff;text-align:left;position:relative;margin-bottom:23px}.link-screen-input{width:70%;font-size:16px;color:#d0d0d0;background:0;border:0;position:absolute;bottom:0;margin-bottom:3px;left:0}.link-screen-input::selection{background:transparent}.link-screen-input:focus{outline:0}.link-screen-line{box-sizing:border-box;width:71%;border:1px solid #d0d0d0;bottom:0;position:absolute;left:0}.link-screen-button{width:24%;height:100%;background-color:rgba(38,38,38,0.85);border:1px solid rgba(151,151,151,0.5);border-radius:2px;font-size:16px;font-weight:bold;color:#12abe2;right:0;position:absolute;bottom:0;cursor:pointer;padding:5px}.link-screen-back-button{width:30px;height:23px;top:10px;left:10px;cursor:pointer}.link-screen-copied-container{box-sizing:border-box;width:95px;height:95px;border:3px solid #12abe2;border-radius:50%;background-color:rgba(38,38,38,0.85);position:relative}.link-screen-copied-text{font-size:14px;font-weight:bold;text-align:center;color:#12abe2;top:29%;left:21%;position:absolute}.link-screen-copied-image{width:18px;height:13.53px;top:61%;left:41%;position:absolute}.link-screen-copied-image>svg{fill:#12abe2}.invisible{visibility:hidden}.empty{color:transparent}.link-screen-fields-container{text-align:left;width:100%;height:35%;position:relative;display:table;margin-bottom:19px}.link-screen-fields-inner-container{position:absolute;display:table-cell;vertical-align:bottom;height:100%;width:100%}.link-screen-outer-container{width:100%;height:100%;display:table;z-index:2;position:absolute;top:0;left:0;text-align:center;opacity:1}.link-screen-copied-outer-container{display:inline-block}.link-screen-button-full-screen{width:160px;height:54px}.hidden{display:none}');
            this.shareScreen = shareScreen;
            createLinkScreen.call(this);
            this.checkoBox = this.bottomPanel.getCheckBox();
            assignEvents.call(this);
            fadeInAfterShareScreen.call(this);
        }, hideLinkPageScreen: function hideLinkPageScreen() {
            utl.replaceClass(this.linkScreenOuterContainer, "fadeIn", "fadeOut");
            this.copiedScreen.hideCopiedContainer();
            this.shareScreen.hideBackButton();
            clearTimeout(this.timer);
            this.shareScreen.getCurrentState().linkScreen = state.LINK_SCREEN_CLOSED;
        }, copyLink: function copyLink(e) {
            var isCopySucceeded = utl.copyToClipboard(this.linkScreenInput);
            e.preventDefault();
            if (isCopySucceeded) {
                utl.replaceClass(this.linkScreenOuterContainer, "fadeIn", "fadeOut");
                this.shareScreen.getCurrentState().copiedScreen = state.COPIED_SCREEN_OPENED;
                this.timer = setTimeout(function () {
                    this.shareScreen.close();
                }.bind(this), 2E3);
            } else {
                this.shareScreen.showErrorMessage();
            }
        } };
}());
vdb.skins.shareScreen.LinkScreenDesktop = vdb.skins.shareScreen.LinkScreen.extend(function () {
    function toggleFullScreenStyles(e) {
        if (this.shareScreen.isFullScreen()) {
            utl.toggleClass(this.linkFormScreenButton, "link-screen-button-full-screen", !utl.hasClass(this.linkFormScreenButton, "link-screen-button-full-screen"));
            if (e === undefined || e.eventName === vdb.constants.PlayerEvent.ENTER_FULLSCREEN) {
                this.copiedScreen.addFullScreenStyles();
            } else {
                this.copiedScreen.removeFullScreenStyles();
            }
        }
    }
    function createLinkScreenDesktop() {
        this.linkScreenHeader = utl.createElement("div", { "class": "link-screen-header" }, null, "COPY LINK:");
        this.linkScreenContainer.insertBefore(this.linkScreenHeader, this.linkScreenFieldsContainer);
        this.linkFormScreenButton = utl.createElement("input", { "type": "submit", "class": "link-screen-button", "value": "COPY" }, this.linkScreenFieldsInnerContainer);
        this.linkFormScreenButton.addEventListener("click", this.copyLink.bind(this));
    }
    function assignEvents() {
        this.shareScreen.getPlayer().addEventListener(vdb.constants.PlayerEvent.ENTER_FULLSCREEN, toggleFullScreenStyles.bind(this));
        this.shareScreen.getPlayer().addEventListener(vdb.constants.PlayerEvent.EXIT_FULLSCREEN, toggleFullScreenStyles.bind(this));
    }
    var utl = vdb.Utils;
    return { init: function init(shareScreen) {
            this._super(shareScreen);
            createLinkScreenDesktop.call(this);
            assignEvents.call(this);
            toggleFullScreenStyles.call(this);
        } };
}());
vdb.skins.shareScreen.LinkScreenMobile = vdb.skins.shareScreen.LinkScreen.extend(function () {
    function setStyles() {
        utl.addClass(this.linkScreenContainer, "link-screen-container-mobile");
        utl.addClass(this.linkFormLine, "link-screen-mobile-line");
        utl.addClass(this.linkScreenOuterContainer, "link-screen-outer-container-mobile");
        utl.addClass(this.linkScreenInput, "link-screen-input-mobile");
    }
    function createLinkScreenMobile() {
        this.linkScreenHeader = utl.createElement("div", { "class": "link-screen-mobile-header" }, null, "Copy Link:");
        this.linkScreenContainer.insertBefore(this.linkScreenHeader, this.linkScreenFieldsContainer);
        this.linkScreenMobileButtonContainer = utl.createElement("div", { "class": "link-screen-mobile-button-container" }, this.linkScreenFieldsContainer);
        this.linkScreenMobileButton = utl.createElement("div", { "class": "link-screen-mobile-button" }, this.linkScreenMobileButtonContainer, "COPY");
    }
    function assignEvents() {
        this.linkScreenMobileButton.addEventListener("click", this.copyLink.bind(this));
    }
    var utl = vdb.Utils;
    return { init: function init(shareScreen) {
            this._super(shareScreen);
            vdb.dom.embedCssToHead(".link-screen-outer-container-mobile{height:calc(100% - 44px)}.link-screen-mobile-button-container{width:48px;height:48px;position:absolute;right:0;display:table;top:0}.link-screen-mobile-button{width:48px;height:48px;background-color:#56798a;border-radius:100%;text-align:center;display:table-cell;vertical-align:middle;font-size:9px;font-weight:bold;color:#fff}.link-screen-mobile-header{font-size:11px;font-weight:normal;margin-bottom:23px;text-align:left;position:relative;color:#999}.link-screen-container-mobile{width:89%;height:37%;margin-top:11px}.link-screen-mobile-line{width:77%;border:0;height:1px;background:#d0d0d0;position:relative}.link-screen-input-mobile{bottom:1px;width:77%;padding:0;position:relative}");
            setStyles.call(this);
            createLinkScreenMobile.call(this);
            assignEvents.call(this);
        } };
}());
vdb.skins.shareScreen.ShareScreenTypesEnum = { SHARE_SCREEN_GENERAL: "shareScreenGeneral", SHARE_SCREEN_EMBED: "shareScreenEmbed", LINK_SCREEN: "linkScreen", COPIED_SCREEN: "copiedScreen", EMAIL_SCREEN: "emailScreen" };
vdb.skins.video_time_preview = {};
vdb.skins.video_time_preview.ThumbnailSize = vdb.core.Class.extend(function () {
    return { getSize: function getSize() {}, getClass: function getClass() {} };
}());
(function (def) {
    def.ThumbnailSize.getInstance = function (playerSize) {
        var size = Math.min(playerSize.width, playerSize.height);
        if (size <= 330) {
            return def.SMALL;
        } else {
            if (size > 330 && size <= 600) {
                return def.MEDIUM;
            }
        }
        return def.LARGE;
    };
})(vdb.skins.video_time_preview);
vdb.skins.video_time_preview.LargeThumbnailSize = vdb.skins.video_time_preview.ThumbnailSize.extend(function () {
    return { getSize: function getSize() {
            return 138;
        }, getClass: function getClass() {
            return "large";
        }, getBottomOffset: function getBottomOffset() {
            return 10;
        }, getTimeOffset: function getTimeOffset() {
            return 10;
        } };
}());
(function (def) {
    def.LARGE = new def.LargeThumbnailSize();
})(vdb.skins.video_time_preview);
vdb.skins.video_time_preview.MediumThumbnailSize = vdb.skins.video_time_preview.ThumbnailSize.extend(function () {
    return { getSize: function getSize() {
            return 116;
        }, getClass: function getClass() {
            return "medium";
        }, getBottomOffset: function getBottomOffset() {
            return 5;
        }, getTimeOffset: function getTimeOffset() {
            return 10;
        } };
}());
(function (def) {
    def.MEDIUM = new def.MediumThumbnailSize();
})(vdb.skins.video_time_preview);
vdb.skins.video_time_preview.SmallThumbnailSize = vdb.skins.video_time_preview.ThumbnailSize.extend(function () {
    return { getSize: function getSize() {
            return 96;
        }, getClass: function getClass() {
            return "small";
        }, getBottomOffset: function getBottomOffset() {
            return 5;
        }, getTimeOffset: function getTimeOffset() {
            return 5;
        } };
}());
(function (def) {
    def.SMALL = new def.SmallThumbnailSize();
})(vdb.skins.video_time_preview);
vdb.skins.video_time_preview.VideoTimePreviewLoader = vdb.core.Class.extend(function () {
    var LOGGER = vdb.log.getLogger("VideoTimePreviewLoader");
    var utl = vdb.Utils;
    return { init: function init(url, options) {
            LOGGER.debug("init");
            this.url = url + "?c=" + options.column + "&r=" + options.row + "&h=" + options.height;
            this._previewImages = utl.createElement("div", { "class": "time-line-preview" });
            var shape = vdb.ctx.getMacro(vdb.constants.PlayerMacros.TIMELINE_PREVIEW_SHAPE);
            if (shape && (shape === "rectangle" || shape === "square")) {
                vdb.Utils.addClass(this._previewImages, shape);
            }
            utl.createElement("div", { "class": "time-line-preview-helper" }, this._previewImages);
            utl.createElement("div", { "class": "time-line-preview-background" }, this._previewImages);
        }, getPreviewDiv: function getPreviewDiv() {
            return this._previewImages;
        }, loadImage: function loadImage() {
            var result = new vdb.Future();
            var myImage = new Image();
            myImage.onload = function () {
                this._previewImages.style.background = "url('" + myImage.src + "') no-repeat";
                result.resolve(myImage);
            }.bind(this);
            myImage.onerror = function (error) {
                result.reject(error);
            };
            myImage.src = this.url;
            return result.getPromise();
        } };
}());
vdb.skins.video_time_preview.VideoTimeThumbnail = vdb.core.Class.extend(function () {
    var DEFAULT_BORDER_WIDTH = 5;
    var LOGGER = vdb.log.getLogger("VideoTimePreviewThumbnail");
    var RECTANGLE_RATIO = .586;
    return { init: function init(videoObj, options) {
            LOGGER.debug("init");
            this.shape = vdb.ctx.getMacro(vdb.constants.PlayerMacros.TIMELINE_PREVIEW_SHAPE);
            var videoUrl = videoObj.getUrlByType("mp4");
            var videoPath = vdb.Utils.parseUrl(videoUrl).pathname;
            var width = (isNaN(options.ratio) ? 1 : options.ratio) * options.thumbnailSize.getSize();
            var height;
            if (this.shape === "rectangle") {
                height = Math.round(width * RECTANGLE_RATIO);
            } else {
                height = (isNaN(options.ratio) ? 1 : options.ratio) * options.thumbnailSize.getSize();
            }
            this._videoUrl = videoObj.isInternal() ? vdb.ctx.getStripServiceUrl() + "/" + vdb.utils.StringUtils.ltrim(videoPath, "/") : "";
            this._options = options;
            this._thumbnails = this._options.row * this._options.column;
            if (this._videoUrl) {
                this._videoTimePreviewLoader = new vdb.skins.video_time_preview.VideoTimePreviewLoader(this._videoUrl, { column: options.column, row: options.row, height: height, width: width });
                this._previewImages = this._videoTimePreviewLoader.getPreviewDiv();
                this._imagePromise = this._videoTimePreviewLoader.loadImage();
            }
        }, showThumbnail: function showThumbnail(videoDuration, time, playerWidth, playerHeight, containerWidth, scrubPoint, videoPlayHead) {
            var thumbnailShowTime = videoDuration / this._thumbnails;
            var thumbnailNumber = Math.floor(time / thumbnailShowTime) < 100 ? Math.floor(time / thumbnailShowTime) : 99;
            var row = Math.floor(thumbnailNumber / this._options.column);
            var column = thumbnailNumber - row * this._options.column;
            var borderMacro = vdb.ctx.getMacro(vdb.constants.PlayerMacros.TIMELINE_PREVIEW_BORDER);
            var imageWidth;
            var imageHeight;
            var xOffsetParam;
            var yOffsetParam;
            var xOffset;
            var yOffset;
            var previewImageSize;
            var playheadLeft;
            var videoPlayHeadMarginLeft;
            var left;
            this.borderSize = borderMacro || DEFAULT_BORDER_WIDTH;
            this._hidden = false;
            return this._imagePromise.then(function (image) {
                this._isNotEnoughtWidth = this._options.thumbnailSize.getSize() >= image.width / this._options.column;
                if (this._hidden || this._isNotEnoughtWidth) {
                    return;
                }
                imageHeight = image.height / this._options.row;
                if (this.shape === "rectangle") {
                    imageWidth = Math.round(imageHeight / RECTANGLE_RATIO);
                } else {
                    imageWidth = image.width / this._options.column;
                }
                if (this.shape === "rectangle") {
                    xOffsetParam = image.width / this._options.column - imageWidth;
                } else {
                    xOffsetParam = playerWidth > playerHeight ? Math.round((imageWidth - imageHeight) / 2) : 0;
                }
                yOffsetParam = playerWidth > playerHeight ? 0 : Math.round((imageHeight - imageWidth) / 2);
                xOffset = -column * imageWidth - xOffsetParam * column;
                yOffset = -row * imageHeight - yOffsetParam;
                previewImageSize = playerWidth > playerHeight ? imageHeight : imageWidth;
                playheadLeft = parseInt(videoPlayHead.style.left);
                videoPlayHeadMarginLeft = parseInt(this._previewImages.style.marginLeft);
                left = playheadLeft - previewImageSize / 2;
                if (this.shape === "rectangle") {
                    left = playheadLeft - imageWidth / 2;
                    previewImageSize = imageWidth;
                }
                if (left < -videoPlayHeadMarginLeft) {
                    left = -videoPlayHeadMarginLeft;
                }
                if (left > playerWidth - previewImageSize - videoPlayHeadMarginLeft - 2 * this.borderSize) {
                    left = playerWidth - previewImageSize - videoPlayHeadMarginLeft - 2 * this.borderSize;
                }
                vdb.Utils.setStyle(this._previewImages, { "backgroundPositionX": xOffset + "px", "backgroundPositionY": yOffset + "px", "left": left + "px", "border": "solid " + this.borderSize + "px #222222" });
                vdb.Utils.addClass([this._previewImages, this._previewImages.firstChild], "showThumbnail");
                vdb.Utils.removeClass([this._previewImages, this._previewImages.firstChild], "hideThumbnail");
            }.bind(this));
        }, getThumbnail: function getThumbnail() {
            return this._previewImages;
        }, hideThumbnail: function hideThumbnail() {
            this._hidden = true;
            vdb.Utils.removeClass([this._previewImages, this._previewImages.firstChild], "showThumbnail");
            vdb.Utils.addClass([this._previewImages, this._previewImages.firstChild], "hideThumbnail");
        }, isNotEnoughWidth: function isNotEnoughWidth() {
            return this._isNotEnoughtWidth;
        } };
}());
vdb.skins.video_time_preview.VideoTimePreviewManager = vdb.core.Class.extend(function () {
    var VIDEO_TIME_LIMIT = 600;
    var MINIMAL_SIZE = 250;
    var DEFAULT_BORDER_WIDTH = 5;
    var PlayerEvent = vdb.constants.PlayerEvent;
    var createPreview = function createPreview() {
        var borderWidth = vdb.ctx.getMacro(vdb.constants.PlayerMacros.TIMELINE_PREVIEW_BORDER);
        this.borderSize = borderWidth ? parseInt(borderWidth) : DEFAULT_BORDER_WIDTH;
        var currentSize = this._player.getSize();
        var minPlayerSize = Math.min(currentSize.width, currentSize.height);
        var currentVideo = this._controller.getCurrentVideo();
        var currentThumbnailSize = vdb.skins.video_time_preview.ThumbnailSize.getInstance(currentSize);
        var ratio = currentSize.height > currentSize.width ? Math.round(currentSize.height / currentSize.width) : undefined;
        var options = { column: 10, row: 10, thumbnailSize: currentThumbnailSize, ratio: ratio };
        this._playerWidth = currentSize.width;
        this._playerHeight = currentSize.height;
        removePreview.call(this);
        if (minPlayerSize > MINIMAL_SIZE) {
            this._firstTime = true;
            this._playerSize = currentSize;
            this._thumbnailSize = currentThumbnailSize;
            this._videoTimeThumbnail = new vdb.skins.video_time_preview.VideoTimeThumbnail(currentVideo, options);
            this._thumbnailDiv = this._videoTimeThumbnail.getThumbnail();
            applyThumbnailSize.call(this);
            this._videoPlayHead = this._progressBar.childNodes[2];
            if (this._wrapper && this._thumbnailDiv) {
                this._wrapper.insertBefore(this._thumbnailDiv, this._wrapper.firstChild);
                setPreviewDivPosition.call(this);
                assignEvents.call(this);
            }
        }
    };
    var applyThumbnailSize = function applyThumbnailSize() {
        var className = this._thumbnailSize.getClass();
        var shape = vdb.ctx.getMacro(vdb.constants.PlayerMacros.TIMELINE_PREVIEW_SHAPE);
        vdb.Utils.addClass(this._thumbnailDiv, className);
        if (shape && (shape === "rectangle" || shape === "square")) {
            vdb.Utils.addClass(this._thumbnailDiv, shape);
        }
    };
    var removePreview = function removePreview() {
        if (this._thumbnailDiv && this._thumbnailDiv.parentNode) {
            returnProgressTimeDivBack.call(this);
            this._thumbnailDiv.parentNode.removeChild(this._thumbnailDiv);
        }
    };
    var setPreviewDivPosition = function setPreviewDivPosition() {
        var parentDiv = this._progressBar.parentNode;
        var firstChild = parentDiv.firstChild;
        var bottomOffset = this._thumbnailSize.getBottomOffset() + 20;
        var fullscreenBottom = 0;
        var offsetLeft = this._progressBar.offsetLeft + this._progressBar.offsetParent.offsetLeft + DEFAULT_BORDER_WIDTH - this.borderSize;
        if (this._fullscreen) {
            fullscreenBottom = 20;
        }
        this._thumbnailDiv.style.cssText = "margin-left:" + offsetLeft + "px!important;";
        this._thumbnailDiv.style.bottom = firstChild.offsetHeight + bottomOffset + fullscreenBottom + this.borderSize + "px";
    };
    var appendProgressTimeDiv = function appendProgressTimeDiv() {
        this._thumbnailDiv.style["pointer-events"] = "all";
        this._progressTimeDiv = this._videoPlayHead.childNodes[0] || this._progressTimeDiv;
        if (this._progressTimeDiv) {
            this._progressTimeDiv.style.left = "calc(50% - 14px)";
            if (!this._thumbnailDiv.contains(this._progressTimeDiv)) {
                this._progressTimeDiv.className = "video-progress-time-preview";
                this._thumbnailDiv.appendChild(this._progressTimeDiv);
                this._progressTimeDiv.style.bottom = this._thumbnailSize.getTimeOffset() + "px";
                this._progressTimeDiv.style.top = "";
                this._progressTimeDiv.style.left = "";
                this._progressTimeDiv.style.right = "";
            }
        }
    };
    var returnProgressTimeDivBack = function returnProgressTimeDivBack() {
        if (this._progressTimeDiv) {
            var wasShown = vdb.Utils.hasClass(this._progressTimeDiv, "fade");
            if (wasShown) {
                this._progressTimeDiv.removeAttribute("style");
                this._progressTimeDiv.className = "video-progress-time";
                this._progressTimeDiv.style.display = "block";
                this._videoPlayHead.appendChild(this._progressTimeDiv);
                var event = document.createEvent("Events");
                event.initEvent("need-to-update", true, true);
                this._progressTimeDiv.dispatchEvent(event);
            }
        }
    };
    var isPlayerTooSmall = function isPlayerTooSmall() {
        var currentSize = this._player.getSize();
        var minPlayerSize = Math.min(currentSize.width, currentSize.height);
        return minPlayerSize <= MINIMAL_SIZE;
    };
    var onMouseMove = function onMouseMove(e) {
        if (!this._isVideoPlaying || isPlayerTooSmall.call(this)) {
            return;
        }
        var size = this._player.getSize();
        if (this._fullscreen && !this._thumbnailDiv || this._playerWidth !== size.width || this._playerHeight !== size.height) {
            createPreview.call(this);
        }
        var progressBarWidth = parseInt(getComputedStyle(this._progressBar).width);
        var xOffset = vdb.utils.Common.getOffset(this._progressBar).left;
        var scrubPoint = Math.max(Math.min(e.pageX - xOffset, progressBarWidth), 0);
        var scrubPrct = scrubPoint / progressBarWidth;
        var videoDuration = this._controller.getPlayerState()["videoLength"];
        var scrubTime = Math.round(videoDuration * scrubPrct);
        applyThumbnailSize.call(this);
        this._videoTimeThumbnail.showThumbnail(videoDuration, scrubTime, this._playerSize.width, this._playerSize.height, this._container.offsetWidth, scrubPoint, this._videoPlayHead).then(function () {
            if (this._firstTime) {
                addPreviewEventListener.call(this);
                this._firstTime = false;
            }
            appendProgressTimeDiv.call(this);
            if (!this._videoTimeThumbnail.isNotEnoughWidth()) {
                vdb.Utils.addClass(this._videoPlayHead, "video-playhead-preview");
                vdb.Utils.addClass(this._progressTimeDiv, "fade");
            }
        }.bind(this));
    };
    var addPreviewEventListener = function addPreviewEventListener() {
        this._thumbnailDiv.removeEventListener("mouseover", previewMouseOver.bind(this));
        this._thumbnailDiv.removeEventListener("mouseout", hidePreviewDeferred.bind(this));
        this._thumbnailDiv.addEventListener("mouseover", previewMouseOver.bind(this));
        this._thumbnailDiv.addEventListener("mouseout", hidePreviewDeferred.bind(this));
    };
    var previewMouseOver = function previewMouseOver() {
        var containerWidth = parseInt(getComputedStyle(this._thumbnailDiv).width);
        this._videoPlayhead.style.left = parseInt(this._thumbnailDiv.style.left) + containerWidth / 2 + "px";
    };
    var assignEvents = function assignEvents() {
        this._mouseMoveHandler = onMouseMove.bind(this);
        this._hidePreviewHandler = hidePreview.bind(this);
        this._hidePreviewDeferred = hidePreviewDeferred.bind(this);
        this._enterFullScreenHandler = function () {
            this._fullscreen = true;
            vdb.Utils.removeClass(this._videoPlayHead, "video-playhead-preview");
            vdb.Utils.removeClass(this._progressTimeDiv, "fade");
        }.bind(this);
        this._adPlayHadnler = function () {
            this._thumbnailDiv.className = "time-line-preview-is-ad";
        }.bind(this);
        this._exitFullScreenHandler = function () {
            removePreview.call(this);
            returnProgressTimeDivBack.call(this);
            this._fullscreen = false;
            vdb.Utils.removeClass(this._videoPlayHead, "video-playhead-preview");
            vdb.Utils.removeClass(this._progressTimeDiv, "fade");
        }.bind(this);
        this._videoPlayHandler = function () {
            this._thumbnailDiv.className = "time-line-preview";
        }.bind(this);
        this._videoSelectedHandler = function () {
            this._isVideoPlaying = false;
        }.bind(this);
        bindEvents.call(this);
    };
    var hidePreviewDeferred = function hidePreviewDeferred(event) {
        clearTimeout(this._hideTimeout);
        this._hideTimeout = setTimeout(hidePreview.bind(this, event), 200);
    };
    var hidePreview = function hidePreview(event) {
        var shouldPreviewForArr = [this._progressBar, this._progressBar.parentNode, this._thumbnailDiv];
        var stillShowPreview = false;
        if (event && event.relatedTarget) {
            stillShowPreview = shouldPreviewForArr.indexOf(event.relatedTarget) >= 0 || shouldPreviewForArr.indexOf(event.relatedTarget.parentNode) >= 0;
        }
        if (!stillShowPreview) {
            vdb.Utils.removeClass(this._videoPlayHead, "video-playhead-preview");
            returnProgressTimeDivBack.call(this);
            if (this._videoTimeThumbnail && this._thumbnailDiv) {
                this._videoTimeThumbnail.hideThumbnail();
                this._thumbnailDiv.style["pointer-events"] = "none";
            }
        }
    };
    var bindEvents = function bindEvents() {
        this._progressBar.parentNode.addEventListener("mousemove", this._mouseMoveHandler);
        this._progressBar.parentNode.addEventListener("mouseout", this._hidePreviewDeferred);
        this._player.addEventListener(PlayerEvent.ENTER_FULLSCREEN, this._enterFullScreenHandler);
        this._player.addEventListener(PlayerEvent.AD_PLAY, this._adPlayHadnler);
        this._player.addEventListener(PlayerEvent.EXIT_FULLSCREEN, this._exitFullScreenHandler);
        this._player.addEventListener(PlayerEvent.VIDEO_PLAY, this._videoPlayHandler);
        this._player.addEventListener(PlayerEvent.VIDEO_SELECTED, this._videoSelectedHandler);
        this._player.addEventListener(PlayerEvent.VIDEO_END, this._hidePreviewHandler);
    };
    var removeEvents = function removeEvents() {
        this._progressBar.parentNode.removeEventListener("mousemove", this._mouseMoveHandler);
        this._progressBar.parentNode.removeEventListener("mouseout", this._hidePreviewDeferred);
        this._player.removeEventListener(PlayerEvent.ENTER_FULLSCREEN, this._enterFullScreenHandler);
        this._player.removeEventListener(PlayerEvent.AD_PLAY, this._adPlayHadnler);
        this._player.removeEventListener(PlayerEvent.EXIT_FULLSCREEN, this._exitFullScreenHandler);
        this._player.removeEventListener(PlayerEvent.VIDEO_PLAY, this._videoPlayHandler);
        this._player.removeEventListener(PlayerEvent.VIDEO_SELECTED, this._videoSelectedHandler);
        this._player.removeEventListener(PlayerEvent.VIDEO_END, this._hidePreviewHandler);
    };
    var onVideoStart = function onVideoStart() {
        this._isVideoPlaying = true;
        removeEvents.call(this);
        if (this._controller.getPlayerState()["videoLength"] <= VIDEO_TIME_LIMIT) {
            createPreview.call(this);
        } else {
            removePreview.call(this);
        }
    };
    return { init: function init(controller, progressBar, container, videoplayhead, wrapper) {
            this._controller = controller;
            this._progressBar = progressBar;
            this._container = container;
            this._wrapper = wrapper;
            this._firstTime = true;
            this._videoPlayhead = videoplayhead;
            this._player = this._controller.getPlayer();
            this._isVideoPlaying = true;
            this._fullscreen = false;
            if (this._controller.getPlayerState()["videoLength"] <= VIDEO_TIME_LIMIT) {
                createPreview.call(this);
            }
            this._player.addEventListener(PlayerEvent.VIDEO_START, onVideoStart.bind(this));
        } };
}());
vdb.skins.VolumeSliderTwoButtons = vdb.EventBus.extend(function () {
    var $ = vdb.utils.Common;
    var utl = vdb.Utils;
    var ec = vdb.events.EventContext;
    var PlayerEvent = vdb.constants.PlayerEvent;
    var UserInteraction = vdb.enums.UserInteraction;
    var buildControls = function buildControls() {
        this.volumeCell = utl.createElement("div", { "class": ["volume-cell", "control-button-cell"] }, this.controlBarRow);
        this.volumeSliderContainer = utl.createElement("div", { "class": "volume-slider-container" }, this.volumeCell);
        this.volumeSlider = utl.createElement("div", { "class": "volume-slider" }, this.volumeSliderContainer);
        this.volumeScrub = utl.createElement("div", { "class": "volume-scrub" }, this.volumeSlider);
        this.volumeLevel = utl.createElement("div", { "class": "volume-level" }, this.volumeSlider);
        this.volumeSliderThumb = utl.createElement("div", { "class": ["volume-slider-thumb", "skin-control"] }, this.volumeLevel);
        this.muteButton = utl.createElement("div", { "class": ["mute", "skin-control"] }, this.volumeCell);
        this.muteAnimation = utl.createElement("div", { "class": ["mute-animation", "skin-control"] }, this.muteButton);
        this.unmuteButton = utl.createElement("div", { "class": ["unmute", "skin-control"] }, this.volumeCell);
        this.unmuteAnimation = utl.createElement("div", { "class": ["unmute-animation", "skin-control"] }, this.unmuteButton);
        if (this.addEffect) {
            this.volumeSliderEffect = utl.createElement("div", { "class": "volume-slider-effect" }, this.volumeSliderComponentContainer);
            this.topHorizontal = utl.createElement("div", { "class": "top-horizontal" }, this.volumeSliderEffect);
            this.rightVertical = utl.createElement("div", { "class": "right-vertical" }, this.volumeSliderEffect);
            this.bottomHorizontal = utl.createElement("div", { "class": "bottom-horizontal" }, this.volumeSliderEffect);
            this.leftVertical = utl.createElement("div", { "class": "left-vertical" }, this.volumeSliderEffect);
        }
        this.volumeSliderBackground = utl.createElement("div", { "class": "volume-slider-background" }, this.volumeCell);
        onVolumeChange.call(this);
    };
    var attachPlayerEvents = function attachPlayerEvents() {
        this.player.addEventListener(PlayerEvent.AD_VOLUME_CHANGED, onVolumeChange.bind(this));
        this.player.addEventListener(PlayerEvent.VIDEO_VOLUME_CHANGED, onVolumeChange.bind(this));
    };
    var attachSkinEvents = function attachSkinEvents() {
        this.muteButton.addEventListener("click", onMuteClick.bind(this));
        this.unmuteButton.addEventListener("click", onUnmuteClick.bind(this));
        this.volumeSlider.addEventListener("click", onVolumeSliderClick.bind(this));
        this.volumeSlider.addEventListener("mousemove", onVolumeSliderMouseMoveOrOut.bind(this));
        this.volumeSlider.addEventListener("mouseleave", onVolumeSliderMouseMoveOrOut.bind(this));
        this.volumeSlider.addEventListener("mousedown", onVolumeSliderMouseDown.bind(this));
    };
    var dispatchUserInteractionEvent = function dispatchUserInteractionEvent(interactionType) {
        this.player.dispatchEvent(PlayerEvent.USER_INTERACTION, { "interactionType": interactionType });
    };
    var onVolumeChange = function onVolumeChange() {
        var volume;
        var scrubMidpoint = this.volumeScrub.clientWidth / 2;
        var fullVolume = this.volumeSlider.clientWidth;
        if (this.controller.isMuted()) {
            utl.setStyle(this.volumeLevel, { width: 0 });
            utl.setStyle(this.volumeScrub, { left: 0 - scrubMidpoint + "px" });
        } else {
            volume = this.controller.getVolume();
            utl.setStyle(this.volumeLevel, { width: volume * 100 + "%" });
            utl.setStyle(this.volumeScrub, { left: fullVolume * volume - scrubMidpoint + "px" });
        }
    };
    var onMuteClick = function onMuteClick() {
        var scrubMidpoint = this.volumeScrub.clientWidth / 2;
        utl.setStyle(this.volumeLevel, { width: 0 });
        utl.setStyle(this.volumeScrub, { left: 0 - scrubMidpoint + "px" });
        this.controller.setVolume(0);
        dispatchUserInteractionEvent.call(this, UserInteraction.MUTE);
    };
    var onUnmuteClick = function onUnmuteClick() {
        var scrubMidpoint = this.volumeScrub.clientWidth / 2;
        var fullVolume = this.volumeSlider.clientWidth;
        utl.setStyle(this.volumeLevel, { width: 100 + "%" });
        utl.setStyle(this.volumeScrub, { left: fullVolume - scrubMidpoint + "px" });
        this.controller.setVolume(1);
        dispatchUserInteractionEvent.call(this, UserInteraction.UNMUTE);
    };
    var onVolumeSliderClick = function onVolumeSliderClick() {
        setVolume.call(this);
        dispatchUserInteractionEvent.call(this, UserInteraction.VOLUME);
    };
    var onVolumeSliderMouseMoveOrOut = function onVolumeSliderMouseMoveOrOut(e) {
        this.pageXPos = e.pageX;
        if (this.isVolumeSliderActive) {
            setVolume.call(this);
        }
    };
    var onVolumeSliderMouseDown = function onVolumeSliderMouseDown(e) {
        ec.bindOnce(document, "mouseup", onDocumentMouseUp.bind(this));
        this.isVolumeSliderActive = true;
        e.stopPropagation();
    };
    var onDocumentMouseUp = function onDocumentMouseUp() {
        this.isVolumeSliderActive = false;
    };
    var setVolume = function setVolume() {
        var volumeSliderOffset = Math.round($.getOffset(this.volumeSlider).left) + this.volumeSliderLeftBorderWidth;
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
    };
    return { init: function init(controller, controlBarRow, addEffect) {
            if (utl.desktopOs()) {
                this.controller = controller;
                this.player = controller.getPlayer();
                this.container = controller.getContainer();
                this.controlBarRow = controlBarRow;
                this.addEffect = !!addEffect;
                buildControls.call(this);
                attachPlayerEvents.call(this);
                attachSkinEvents.call(this);
            }
        }, setLeftBorderWidth: function setLeftBorderWidth() {
            if (utl.desktopOs()) {
                this.volumeSliderLeftBorderWidth = parseInt(getComputedStyle(this.volumeSlider).borderLeftWidth);
            }
        } };
}());
vdb.skins.VolumeSlider = vdb.EventBus.extend(function () {
    var $ = vdb.utils.Common;
    var utl = vdb.Utils;
    var isDesktop;
    var hasTouchSupport;
    var ec = vdb.events.EventContext;
    var PlayerEvent = vdb.constants.PlayerEvent;
    var UserInteraction = vdb.enums.UserInteraction;
    var buildControls = function buildControls() {
        this.volumeCell = utl.createElement("div", { "class": ["volume-cell", "control-button-cell"] }, this.parent);
        if (isDesktop) {
            this.volumeSliderContainer = utl.createElement("div", { "class": "volume-slider-container" }, this.volumeCell);
            this.volumeSlider = utl.createElement("div", { "class": "volume-slider" }, this.volumeSliderContainer);
            this.volumeLevelBackground = utl.createElement("div", { "class": "volume-slider-background" }, this.volumeSlider);
            this.volumeLevel = utl.createElement("div", { "class": "volume-level" }, this.volumeSlider);
            this.volumeSliderThumb = utl.createElement("div", { "class": ["volume-slider-thumb", "skin-control"] }, this.volumeLevel);
            this.volumeSliderTooltip = utl.createElement("div", { "class": ["volume-slider-tooltip", "skin-control"] }, this.volumeCell);
            this.volumeSliderTooltipText = utl.createElement("div", { "class": "volume-slider-tooltip-text" }, this.volumeSliderTooltip);
            this.volumeSliderTooltip.style.cssText = "display: none;";
        }
        this.volumeButton = utl.createElement("div", { "class": "volume-button" }, this.volumeCell);
        this.volumeIcon = utl.createElement("div", { "class": ["volume-icon", "skin-control"] }, this.volumeButton, this.options.buttonIcon);
        if (utl.iPadOS()) {
            $.hide(this.volumeButton);
        }
        onVolumeChange.call(this);
    };
    var attachPlayerEvents = function attachPlayerEvents() {
        this.player.addEventListener(PlayerEvent.AD_VOLUME_CHANGED, onVolumeChange.bind(this));
        this.player.addEventListener(PlayerEvent.VIDEO_VOLUME_CHANGED, onVolumeChange.bind(this));
    };
    var attachSkinEvents = function attachSkinEvents() {
        if (isDesktop) {
            this.volumeButton.addEventListener("click", onVolumeButtonClick.bind(this));
            this.volumeSlider.addEventListener("click", onVolumeSliderClick.bind(this));
            this.volumeSlider.addEventListener("mousemove", onVolumeSliderMouseMoveOrOut.bind(this));
            this.volumeSlider.addEventListener("mouseleave", onVolumeSliderMouseMoveOrOut.bind(this));
            this.volumeSlider.addEventListener("mousedown", onVolumeSliderMouseDown.bind(this));
            this.volumeSliderThumb.addEventListener("mouseover", onThumbMouseOver.bind(this));
            this.volumeSliderThumb.addEventListener("mouseout", onThumbMouseOut.bind(this));
        } else {
            this.volumeButton.addEventListener("touchstart", onVolumeButtonClick.bind(this));
        }
    };
    var onThumbMouseOver = function onThumbMouseOver() {
        showTooltip.call(this);
        moveTooltip.call(this);
    };
    var onThumbMouseOut = function onThumbMouseOut() {
        if (!this._isTouchClick) {
            hideTooltip.call(this);
        } else {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = setTimeout(function () {
                hideTooltip.call(this);
            }.bind(this), 3E3);
        }
    };
    var showTooltip = function showTooltip() {
        this.tooltipLocked = true;
        utl.addClass(this.volumeSliderTooltip, "active");
        utl.addClass(this.volumeSliderContainer, "active");
    };
    var hideTooltip = function hideTooltip() {
        this.tooltipLocked = false;
        this.contextBindGroup && this.contextBindGroup.unbind();
        utl.removeClass(this.volumeSliderTooltip, "active");
        utl.removeClass(this.volumeSliderContainer, "active");
    };
    var dispatchUserInteractionEvent = function dispatchUserInteractionEvent(interactionType) {
        this.player.dispatchEvent(PlayerEvent.USER_INTERACTION, { "interactionType": interactionType });
    };
    var onVolumeChange = function onVolumeChange() {
        if (this.controller.isMuted()) {
            utl.replaceClass(this.volumeButton, ["full-volume", "half-volume"], "muted");
            if (isDesktop) {
                utl.setStyle(this.volumeLevel, { height: 0 });
                this.volumeSliderTooltipText.innerHTML = 0 + "%";
            }
        } else {
            var volume = this.controller.getVolume();
            utl.replaceClass(this.volumeButton, ["full-volume", "half-volume", "muted"], (volume > .5 ? "full" : "half") + "-volume");
            if (isDesktop) {
                utl.setStyle(this.volumeLevel, { height: volume * 100 + "%" });
                moveTooltip.call(this);
                this.volumeSliderTooltipText.innerHTML = Math.round(volume * 100) + "%";
            }
        }
    };
    var moveTooltip = function moveTooltip() {
        var tooltipPosition = utl.getInnerHeight(this.volumeLevel) + utl.getInnerHeight(this.volumeSliderTooltip) / 2 + this.volumeSliderTopBorderWidth;
        utl.setStyle(this.volumeSliderTooltip, { bottom: tooltipPosition + "px" });
    };
    var onVolumeButtonClick = function onVolumeButtonClick(e) {
        this._isTouchClick = vdb.utils.Common.isTouchClick(e);
        if (!this._isTouchClick || this.tooltipLocked) {
            mute.call(this);
            return;
        }
        showTooltip.call(this);
        moveTooltip.call(this);
        setTimeout(function () {
            this.contextBindGroup = new vdb.events.EventContextBindGroup(ec.bind(this.volumeCell, "touchstart", stopPropagation), ec.bind(this.volumeCell, "click", stopPropagation), ec.bindOnce(document, "touchstart", hideTooltip.bind(this)), ec.bindOnce(document, "click", hideTooltip.bind(this)), ec.bindOnce(parent.document, "touchstart", hideTooltip.bind(this)), ec.bindOnce(parent.document, "click", hideTooltip.bind(this)));
        }.bind(this), 0);
    };
    var mute = function mute() {
        this.controller.toggleMute();
        dispatchUserInteractionEvent.call(this, this.controller.isMuted() ? UserInteraction.MUTE : UserInteraction.UNMUTE);
    };
    var stopPropagation = function stopPropagation(e) {
        e.stopPropagation();
    };
    var onVolumeSliderClick = function onVolumeSliderClick() {
        setVolume.call(this);
        dispatchUserInteractionEvent.call(this, UserInteraction.VOLUME);
    };
    var onVolumeSliderMouseMoveOrOut = function onVolumeSliderMouseMoveOrOut(e) {
        this.pageYPos = e.pageY || e.touches && e.touches[0] && e.touches[0].pageY || this.pageYPos;
        if (this.isVolumeSliderActive) {
            setVolume.call(this);
        }
    };
    var onVolumeSliderMouseDown = function onVolumeSliderMouseDown(e) {
        ec.bindOnce(document, "mouseup", onDocumentMouseUp.bind(this));
        if (hasTouchSupport) {
            ec.bindOnce(document, "touchend", onDocumentMouseUp.bind(this));
        }
        this.isVolumeSliderActive = true;
    };
    var onDocumentMouseUp = function onDocumentMouseUp() {
        this.isVolumeSliderActive = false;
    };
    var setVolume = function setVolume() {
        var volumeSliderTopOffset = Math.round($.getOffset(this.volumeSlider).top) + this.volumeSliderTopBorderWidth - vdb.$win.scrollY;
        var volumeSliderHeight = this.volumeSlider.clientHeight;
        if (this.pageYPos < volumeSliderTopOffset) {
            this.controller.setVolume(1);
        } else {
            if (this.pageYPos > volumeSliderTopOffset + volumeSliderHeight) {
                this.controller.setVolume(0);
            } else {
                var volumePoint = this.pageYPos - volumeSliderTopOffset;
                var volumePrct = (volumeSliderHeight - volumePoint) / volumeSliderHeight;
                this.controller.setVolume(volumePrct);
            }
        }
    };
    return { init: function init(controller, parent, options) {
            isDesktop = !!utl.desktopOs();
            hasTouchSupport = utl.hasTouchSupport;
            this.controller = controller;
            this.player = controller.getPlayer();
            this.parent = parent;
            this.options = options || {};
            buildControls.call(this);
            attachPlayerEvents.call(this);
            attachSkinEvents.call(this);
        }, setTopBorderWidth: function setTopBorderWidth() {
            if (isDesktop) {
                this.volumeSliderTopBorderWidth = parseInt(getComputedStyle(this.volumeSlider).borderTopWidth);
            }
        } };
}());
vdb.skins.MiniBar = vdb.EventBus.extend(function () {
    var utl = vdb.Utils;
    var ec = vdb.events.EventContext;
    var PlayerEvent = vdb.constants.PlayerEvent;
    var buildControls = function buildControls() {
        this.miniBarWrapper = utl.createElement("div", { "class": "mini-bar-wrapper" }, this.controlBarWrapper);
    };
    var hideMiniBar = function hideMiniBar() {
        this.active = false;
        utl.removeClass(this.miniBarWrapper, "show-mini-bar");
        utl.removeClass(this.player.container, ["mini-bar-wrapper-shown"]);
        utl.removeClass(this.controlBarWrapper, ["slide-down-mini-bar"]);
        this.player.dispatchEvent(PlayerEvent.PLAYER_CONTROLS_STATE_CHANGE, { visible: true, width: this.controlBarRow.clientWidth, height: this.controlBarRow.clientHeight });
    };
    var onMiniBarAction = function onMiniBarAction(e) {
        if (utl.mobileOs()) {
            e.preventDefault();
        }
        hideMiniBar.call(this);
    };
    var _showMiniBar = function _showMiniBar() {
        this.active = true;
        ec.bindOnce(this.controlBarWrapper, utl.desktopOs() ? "mouseover" : "touchend", onMiniBarAction.bind(this));
        utl.addClass(this.controlBarWrapper, ["slide-down-mini-bar"]);
        utl.addClass(this.player.container, ["mini-bar-wrapper-shown"]);
        clearTimeout(this.slideDownMiniBarTimeout);
        utl.addClass(this.miniBarWrapper, "show-mini-bar");
        this.player.dispatchEvent(PlayerEvent.PLAYER_CONTROLS_STATE_CHANGE, { visible: false, width: this.controlBarRow.clientWidth, height: this.controlBarRow.clientHeight });
    };
    var onAdEnd = function onAdEnd() {
        this.adMiniBar = false;
        this.enabled = false;
        hideMiniBar.call(this);
        clearTimeout(this.removeMiniBarModeTimeout);
        this.removeMiniBarModeTimeout = setTimeout(function () {
            utl.removeClass(this.controlBarWrapper, "mini-bar-mode");
        }.bind(this), 500);
    };
    var onAdStart = function onAdStart(event) {
        hideMiniBar.call(this);
        var eventData = event.data || {};
        this.adMiniBar = !!(eventData["parameters"] && eventData["parameters"]["minibar"]);
        if (this.forceMiniBar || this.adMiniBar) {
            this.enabled = true;
            utl.addClass(this.controlBarWrapper, "mini-bar-mode");
            _showMiniBar.call(this);
            ec.bindOnce(this.player, PlayerEvent.AD_END, onAdEnd.bind(this));
        }
    };
    var attachPlayerEventListeners = function attachPlayerEventListeners() {
        this.player.addEventListener(PlayerEvent.AD_START, onAdStart.bind(this));
    };
    return { init: function init(player, controlBarWrapper, forceMiniBar) {
            this.player = player;
            this.active = false;
            this.enabled = false;
            this.controlBarWrapper = controlBarWrapper;
            this.controlBarRow = controlBarWrapper.getElementsByClassName("control-bar-row")[0];
            this.forceMiniBar = forceMiniBar;
            buildControls.call(this);
            attachPlayerEventListeners.call(this);
        }, showMiniBar: function showMiniBar() {
            if (this.enabled && !this.active) {
                _showMiniBar.call(this);
            }
        } };
}());
vdb.share.shareScreen = {};
vdb.share.shareScreen.ShareScreenIcons = function () {
    var SocialNetworkEnum = vdb.share.SocialNetworkEnum;
    var shareIcons = {};
    shareIcons[SocialNetworkEnum.GOOGLE] = '<svg class="player-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 19.136 16.133" enable-background="new 0 0 19.136 16.133" xml:space="preserve"><path d="M5.302,16.133c-2.995,0-5.168-1.268-5.168-3.012c0-1.982,2.274-3.657,4.966-3.658c0.149,0,0.461-0.004,0.475-0.004 c-0.308-0.377-0.457-0.765-0.457-1.18c0-0.236,0.051-0.481,0.15-0.73C5.205,7.551,5.142,7.552,5.078,7.552 C2.826,7.552,1.19,6,1.19,3.863c0-1.947,2.105-3.72,4.417-3.72h4.885c0.072,0,0.135,0.045,0.158,0.113 c0.023,0.067-0.002,0.141-0.06,0.183L9.496,1.225C9.469,1.245,9.434,1.256,9.401,1.256h-0.93c0.696,0.541,1.12,1.511,1.12,2.638 c0,0.995-0.512,1.941-1.444,2.663C7.389,7.146,7.273,7.366,7.273,7.815c0,0.323,0.709,1.017,1.217,1.374 c1.296,0.91,1.778,1.801,1.778,3.285C10.268,14.292,8.562,16.133,5.302,16.133 M5.569,10.243c-1.78,0-3.341,1.102-3.341,2.357 c0,1.363,1.345,2.43,3.063,2.43c2.249,0,3.39-0.794,3.39-2.357c0-0.151-0.017-0.306-0.056-0.46 c-0.162-0.637-0.698-0.999-1.511-1.548l-0.376-0.255c-0.327-0.098-0.719-0.161-1.122-0.165L5.569,10.08V10.243z M4.945,1.157 c-0.45,0-0.848,0.182-1.15,0.525C3.352,2.184,3.162,2.968,3.278,3.832c0.206,1.562,1.333,2.861,2.513,2.897h0.004 c0.485,0,0.876-0.181,1.178-0.524C7.428,5.69,7.621,4.89,7.505,4.011C7.303,2.474,6.176,1.192,4.992,1.157L4.945,0.992V1.157z M14.303,8.582c-0.092,0-0.165-0.073-0.165-0.164V5.105h-3.336c-0.092,0-0.165-0.073-0.165-0.163V3.783 c0-0.091,0.074-0.164,0.165-0.164h3.336V0.307c0-0.09,0.074-0.164,0.165-0.164h1.167c0.09,0,0.165,0.073,0.165,0.164v3.312h3.336 c0.09,0,0.164,0.073,0.164,0.164v1.159c0,0.09-0.074,0.163-0.164,0.163h-3.336v3.313c0,0.091-0.076,0.164-0.165,0.164H14.303z"/></svg> ';
    shareIcons[SocialNetworkEnum.FACEBOOK] = '<svg class="player-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.983 20.016"><path d="M2.996,4.449V6.67H0v4.456h2.996v8.89H6.99v-8.89h4V6.67H6.99V5.563c0-0.694,0.657-1.114,0.998-1.114h2.994V0H7.626 C4.992,0,2.996,2.224,2.996,4.449z"/></svg> ';
    shareIcons[SocialNetworkEnum.TWITTER] = '<svg class="player-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-1 0 20 16"><path d="M18.671,1.938c-0.691,0.303-1.431,0.511-2.205,0.607c-0.003-0.015-0.009-0.028-0.015-0.043 c0.818-0.49,1.451-1.267,1.764-2.194c-0.238,0.147-1.383,0.802-2.502,1.016C14.987,0.51,13.938,0,12.769,0 c-2.464,0-3.983,2.059-3.983,4.058c0,0.153,0.072,0.799,0.086,0.832c-3.314-0.073-6.25-1.693-8.143-4.182 c-1.352,2.508,0.067,4.689,1.038,5.463C1.202,6.162,0.666,6.039,0.176,5.822c0.104,1.93,1.474,3.516,3.283,3.913 c-0.726,0.204-1.594,0.048-1.926-0.04c0.532,1.612,1.996,2.792,3.741,2.882C2.6,14.572-0.28,14.369-0.328,14.365 c1.694,1.032,3.676,1.642,5.792,1.627c7.762-0.048,11.746-7.057,11.273-12.088C17.589,3.5,18.274,2.802,18.671,1.938z"/></svg> ';
    shareIcons[SocialNetworkEnum.LINKEDIN] = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M2.127,0C0.949,0,0,0.935,0,2.084C0,3.236,0.949,4.17,2.127,4.17c1.173,0,2.125-0.935,2.125-2.086 C4.252,0.935,3.3,0,2.127,0z M0.291,17.316h3.67V5.75h-3.67V17.316z M13.3,5.463c-1.782,0-2.983,0.959-3.471,1.869H9.777V5.75 H6.263v11.57h3.664V11.6c0-1.513,0.291-2.974,2.199-2.974c1.883,0,1.906,1.724,1.906,3.065v5.625h3.665v-6.346 C17.697,7.859,17.014,5.463,13.3,5.463z"/></svg>';
    shareIcons[SocialNetworkEnum.EMBED] = '<svg class="player-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 34.678 21.784" enable-background="new 0 0 34.678 21.784" xml:space="preserve"><g><g><path d="M25.105,3.119L25.104,3.12l-2.892-2.835c-0.388-0.38-1.017-0.38-1.405,0c-0.388,0.381-0.388,0.998,0.001,1.378 l2.891,2.834l-2.891,2.833c-0.388,0.38-0.388,0.997-0.001,1.378c0.388,0.381,1.017,0.381,1.405,0l2.892-2.834l0.001,0.001 l1.404-1.379L25.105,3.119z M14.15,0.286c-0.384-0.381-1.006-0.381-1.39,0L9.897,3.12L9.896,3.119l-1.39,1.379l1.39,1.379 l0.001-0.001l2.862,2.834c0.384,0.38,1.007,0.38,1.39,0c0.384-0.381,0.384-0.998,0-1.378l-2.861-2.833l2.861-2.834 C14.533,1.284,14.534,0.667,14.15,0.286z"/></g></g><g><path d="M2.814,21.886c-0.881,0-1.57-0.257-2.068-0.771S0,19.892,0,18.99c0-0.927,0.23-1.654,0.691-2.185 c0.463-0.529,1.096-0.795,1.902-0.795c0.748,0,1.34,0.228,1.773,0.683c0.436,0.454,0.652,1.08,0.652,1.876v0.651H1.24 c0.018,0.551,0.166,0.974,0.447,1.269c0.279,0.296,0.674,0.443,1.184,0.443c0.334,0,0.646-0.031,0.936-0.095 c0.289-0.062,0.6-0.168,0.93-0.315v0.979c-0.293,0.141-0.59,0.239-0.891,0.298C3.545,21.857,3.201,21.886,2.814,21.886z M2.594,16.924c-0.383,0-0.689,0.121-0.92,0.364c-0.23,0.242-0.369,0.597-0.412,1.061h2.572 c-0.006-0.468-0.119-0.822-0.338-1.063S2.977,16.924,2.594,16.924z"/><path d="M11.377,21.784h-1.211v-3.496c0-0.435-0.082-0.759-0.246-0.972c-0.164-0.214-0.42-0.321-0.77-0.321 c-0.465,0-0.805,0.151-1.021,0.454s-0.326,0.806-0.326,1.51v2.825H6.598v-5.67h0.943l0.17,0.743h0.061 c0.158-0.271,0.387-0.479,0.686-0.626c0.299-0.146,0.627-0.221,0.986-0.221c0.871,0,1.449,0.298,1.732,0.893h0.082 c0.168-0.28,0.404-0.499,0.709-0.656c0.303-0.157,0.652-0.236,1.045-0.236c0.678,0,1.17,0.172,1.479,0.514 c0.311,0.342,0.465,0.862,0.465,1.563v3.696H13.75v-3.496c0-0.435-0.082-0.759-0.248-0.972c-0.166-0.214-0.424-0.321-0.771-0.321 c-0.469,0-0.811,0.146-1.029,0.438c-0.217,0.293-0.324,0.741-0.324,1.347V21.784z"/><path d="M19.744,16.01c0.707,0,1.258,0.257,1.652,0.77c0.396,0.513,0.594,1.232,0.594,2.158c0,0.93-0.201,1.653-0.6,2.172 c-0.4,0.518-0.957,0.776-1.668,0.776c-0.717,0-1.273-0.258-1.67-0.774h-0.082l-0.221,0.672h-0.902v-7.978h1.205v1.897 c0,0.14-0.008,0.348-0.021,0.625S18.008,16.782,18,16.857h0.053C18.436,16.293,18.998,16.01,19.744,16.01z M19.432,16.995 c-0.486,0-0.836,0.144-1.049,0.429s-0.324,0.763-0.33,1.433v0.082c0,0.69,0.109,1.19,0.328,1.5s0.574,0.464,1.07,0.464 c0.428,0,0.752-0.169,0.973-0.508c0.221-0.338,0.33-0.827,0.33-1.466C20.754,17.639,20.312,16.995,19.432,16.995z"/><path d="M26.076,21.886c-0.883,0-1.572-0.257-2.07-0.771c-0.496-0.515-0.744-1.223-0.744-2.125c0-0.927,0.23-1.654,0.691-2.185 c0.461-0.529,1.096-0.795,1.902-0.795c0.748,0,1.34,0.228,1.773,0.683c0.434,0.454,0.65,1.08,0.65,1.876v0.651h-3.777 c0.016,0.551,0.166,0.974,0.445,1.269c0.281,0.296,0.676,0.443,1.186,0.443c0.334,0,0.646-0.031,0.936-0.095 c0.287-0.062,0.598-0.168,0.93-0.315v0.979c-0.295,0.141-0.592,0.239-0.893,0.298C26.805,21.857,26.461,21.886,26.076,21.886z M25.855,16.924c-0.383,0-0.689,0.121-0.92,0.364c-0.232,0.242-0.369,0.597-0.414,1.061h2.574 c-0.008-0.468-0.119-0.822-0.338-1.063S26.238,16.924,25.855,16.924z"/><path d="M31.771,21.886c-0.707,0-1.26-0.257-1.656-0.769c-0.396-0.514-0.594-1.232-0.594-2.159c0-0.93,0.199-1.653,0.602-2.171 s0.957-0.777,1.668-0.777c0.746,0,1.312,0.275,1.703,0.826h0.061c-0.057-0.407-0.086-0.729-0.086-0.964v-2.066h1.209v7.978 h-0.943l-0.209-0.743h-0.057C33.082,21.604,32.516,21.886,31.771,21.886z M32.094,20.913c0.496,0,0.857-0.14,1.082-0.418 c0.227-0.279,0.342-0.73,0.35-1.356v-0.169c0-0.715-0.117-1.222-0.35-1.523c-0.232-0.3-0.596-0.451-1.092-0.451 c-0.424,0-0.75,0.172-0.979,0.516c-0.23,0.344-0.344,0.833-0.344,1.469c0,0.629,0.111,1.108,0.332,1.438 C31.316,20.748,31.65,20.913,32.094,20.913z"/></g></svg> ';
    shareIcons[SocialNetworkEnum.EMAIL] = '<svg class="player-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 12"><path d="M1.8,0C1.408,0,1.048,0.124,0.752,0.333L0.759,0.34l7.875,7.306c0.174,0.161,0.557,0.161,0.731,0L17.24,0.34l0.007-0.007 C16.952,0.124,16.592,0,16.2,0H1.8L1.8,0z M0.176,1.014C0.064,1.245,0,1.503,0,1.778v8.444c0,0.335,0.099,0.643,0.26,0.91 l5.569-4.868L0.176,1.014z M17.824,1.014l-5.653,5.25l5.569,4.868c0.162-0.267,0.26-0.575,0.26-0.91V1.778 C18,1.503,17.936,1.245,17.824,1.014z M6.49,6.875L0.9,11.757C1.165,11.908,1.47,12,1.8,12h14.4c0.33,0,0.635-0.091,0.9-0.243 l-5.59-4.882L9.984,8.292c-0.551,0.511-1.418,0.511-1.969,0L6.49,6.875L6.49,6.875z"/></svg> ';
    shareIcons[SocialNetworkEnum.LINK] = '<svg class="player-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><g><g><path d="M18.614,1.388c-1.839-1.839-4.861-1.839-6.7,0L7.128,6.173h0c-1.839,1.839-1.839,4.859,0,6.698 c0.167,0.167,0.324,0.312,0.508,0.448l1.974-1.974c-0.2-0.098-0.399-0.219-0.569-0.388c-0.812-0.812-0.812-2.059,0-2.87 l4.786-4.785c0.812-0.812,2.059-0.812,2.871,0c0.812,0.812,0.812,2.059,0,2.871l-1.615,1.615 c0.486,1.036,0.663,2.168,0.538,3.289l2.991-2.99C20.453,6.248,20.453,3.227,18.614,1.388z M12.871,7.129 c-0.167-0.167-0.324-0.312-0.508-0.449l-1.974,1.974c0.2,0.099,0.399,0.219,0.569,0.389c0.812,0.812,0.812,2.059,0,2.87 l-4.786,4.784c-0.812,0.812-2.059,0.812-2.871,0c-0.812-0.812-0.812-2.059,0-2.871l1.615-1.615 c-0.486-1.036-0.664-2.168-0.538-3.289l-2.991,2.99c-1.839,1.839-1.839,4.859,0,6.698c1.839,1.839,4.86,1.839,6.7,0l4.786-4.784 l0,0C14.71,11.989,14.71,8.968,12.871,7.129z"/></g></g></svg> ';
    shareIcons[SocialNetworkEnum.WEIBO] = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 40.5"><path d="M21.25,37.79c-8.28.82-15.42-2.92-16-8.36s5.74-10.5,14-11.32,15.42,2.92,16,8.36S29.53,37,21.25,37.79m16.56-18c-0.7-.21-1.19-0.35-0.82-1.28,0.8-2, .88-3.74,0-5-1.62-2.32-6.06-2.19-11.15-.06,0,0-1.6.7-1.19-.57,0.78-2.52.67-4.63-.55-5.84-2.76-2.76-10.11.1-16.4,6.4C3,18.13.25,23.13,0.25,27.46c0, 8.27,10.6,13.3,21,13.3,13.6,0,22.64-7.9,22.64-14.17,0-3.79-3.19-5.94-6.06-6.83" transform="translate(-0.25,-0.25)" /><path d="M46.84,4.62A13.23,13.23,0,0,0,34.24.54h0A1.91,1.91,0,0,0,35,4.28,9.41,9.41,0,0,1,46,16.39h0a1.92,1.92,0,0,0,3.64,1.18h0A13.23,13.23,0,0,0,46.84,4.62" transform="translate(-0.25,-0.25)"/><path d="M41.8,9.17a6.44,6.44,0,0,0-6.14-2,1.65,1.65,0,1,0,.69,3.22h0A3.15,3.15,0,0,1,40,14.46h0a1.65,1.65,0,1,0,3.14,1A6.44,6.44,0,0,0,41.8,9.17" transform="translate(-0.25,-0.25)"/><path d="M21.71,27.95a1.2,1.2,0,0,1-1.43.53,0.83,0.83,0,0,1-.37-1.24,1.18,1.18,0,0,1,1.4-.53,0.84,0.84,0,0,1,.4,1.24m-2.64,3.39a3.14,3.14,0,0,1-3.81, 1.25,2.2,2.2,0,0,1-.85-3.31A3.15,3.15,0,0,1,18.15,28a2.2,2.2,0,0,1,.92,3.32m3-9A9,9,0,0,0,12,26.7c-1.74,3.54-.06,7.47,3.92,8.75a8.94,8.94,0,0,0, 10.67-4.53c1.67-3.74-.41-7.58-4.49-8.63" transform="translate(-0.25,-0.25)"/></svg>';
    return shareIcons;
}();
vdb.skins.shareScreen.ShareScreenView = vdb.core.Class.extend(function () {
    function setShareScreenHeight(e) {
        utl.setStyle(this.player.container, { "height": "100%" });
        utl.setStyle(this.shareScreenOuterContainer, { "height": "100%" });
        if (utl.desktopOs()) {
            utl.setStyle(this.shareScreenContainer, { "height": "calc(100% - " + this.controlBarRow.clientHeight + "px)" });
            if (e && e.eventName === vdb.constants.PlayerEvent.EXIT_FULLSCREEN) {
                var height = parseInt(getComputedStyle(e.target.container).height) - this.controlBarRow.clientHeight;
                utl.setStyle(this.shareScreenContainer, { "height": height + "px" });
            }
        } else {
            utl.setStyle(this.shareScreenContainer, { "height": "100%" });
        }
    }
    function createAndDockShareItems(socialNetworks, embedScreenButtonEnabled) {
        var type;
        var outerContainer;
        var mobile = utl.mobileOs() ? "-mobile" : "";
        for (var i = 0; i < socialNetworks.length; i++) {
            type = socialNetworks[i].getType();
            if (!embedScreenButtonEnabled || embedScreenButtonEnabled && type !== "embed") {
                this.shareElements.push(utl.createElement("div", { "class": "share-element-container " + type + mobile }));
                outerContainer = utl.createElement("div", { "class": "share-screen-element-outer-container" }, this.shareElements[i]);
                utl.createElement("div", { "class": "share-screen-element" }, outerContainer, ShareIcons[type]);
            }
        }
        dockShareItems.call(this);
    }
    function dockShareItems() {
        var parent;
        parent = utl.createElement("div", { "class": "share-screen-element-containers-container" }, this.socialIconsContainer);
        var elementsPerLine = this.shareElements.length % 4 != 1 ? 4 : 3;
        for (var i = 0; i < this.shareElements.length; i++) {
            if (i === elementsPerLine) {
                parent = utl.createElement("div", { "class": "share-screen-element-containers-container" }, this.socialIconsContainer);
            }
            parent.appendChild(this.shareElements[i]);
        }
    }
    function setMobileStyles() {
        if (utl.mobileOs()) {
            for (var i = 0; i < this.shareElements.length; i++) {
                utl.addClass(this.shareElements[i], "share-element-container-mobile");
            }
            utl.addClass(this.backButton, "share-screen-back-button-mobile");
            utl.addClass(this.backButtonWrapper, "share-screen-back-button-wrapper-mobile");
        }
    }
    function toggleFullScreenStyle() {
        utl.toggleClass(this.container, "share-screen-elements-container-full-screen", !utl.hasClass(this.container, "share-screen-elements-container-full-screen"));
    }
    function getShareButtonContainer() {
        var nodes = Array.prototype.slice.call(this.shareScreenHtmlContainer.children);
        return nodes.filter(function (node) {
            return utl.hasClass(node, "share-screen-buttons-outer-container");
        })[0];
    }
    function hideControlBar() {
        if (utl.mobileOs()) {
            utl.addClass(this.controlsBarContainer, "hidden");
        }
    }
    function showControlBar() {
        utl.removeClass(this.controlsBarContainer, "hidden");
    }
    function setBackButtonImage() {
        this.backButton.innerHTML = '<svg class="player-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 21"><path d="M0.023,10.488L9.423,0l1.396,1.518L3.778,9.385h25.198v2.208H3.778l7.015,7.89L9.397,21L0.023,10.488z"/></svg> ';
    }
    function createShareScreen() {
        this.shareScreenOuterContainer = utl.createElement("div", { "class": "share-screen-outer-container fadeOut" }, this.shareScreenHtmlContainer);
        this.shareScreenContainer = utl.createElement("div", { "class": "share-screen-container" }, this.shareScreenOuterContainer);
        setShareScreenHeight.call(this);
        this.backButtonWrapper = utl.createElement("div", { "class": "share-screen-back-button-wrapper fadeOut" }, this.shareScreenContainer);
        this.backButtonOuterContainer = utl.createElement("div", { "class": "share-screen-back-button-outer-container" }, this.backButtonWrapper);
        this.backButton = utl.createElement("div", { "class": "share-screen-back-button" }, this.backButtonOuterContainer);
        this.socialDock = utl.createElement("div", { "class": "share-screen" }, this.shareScreenContainer);
        this.container = utl.createElement("div", { "class": "share-screen-elements-container" }, this.socialDock);
        utl.createElement("div", { "class": "share-screen-header" }, this.container, this.title);
        createURLContainer.call(this);
        this.socialIconsContainer = utl.createElement("div", { "class": "share-screen-social-icons-container" }, this.container);
        this.errorMessageContainer = utl.createElement("div", { "class": "error-message-container hidden" }, this.shareScreenOuterContainer);
        this.errorMessage = utl.createElement("div", { "class": "error-message" }, this.errorMessageContainer, "Your browser doesn't support copy to clipboard");
    }
    function assignEvents() {
        this.player.addEventListener(vdb.constants.PlayerEvent.EXIT_FULLSCREEN, function () {
            setShareScreenHeight.call(this);
            toggleFullScreenStyle.call(this);
        }.bind(this));
        this.player.addEventListener(vdb.constants.PlayerEvent.ENTER_FULLSCREEN, function () {
            setShareScreenHeight.call(this);
            toggleFullScreenStyle.call(this);
        }.bind(this));
        this.player.addEventListener(vdb.constants.PlayerEvent.PLAYER_RESIZE, setShareScreenHeight.bind(this));
        if (this.model.settings.copyURLEnabled) {
            this.copyURLButton.addEventListener("click", function () {
                utl.copyToClipboard.call(this, this.urlInput);
                this.copyURLButton.value = "Copied";
            }.bind(this));
        }
    }
    function createURLContainer() {
        if (this.model.settings.copyURLEnabled) {
            this.urlContainer = utl.createElement("div", { "class": "share-screen-url-container" }, this.container);
            this.urlInput = utl.createElement("input", { "class": "url-input", "type": "text", "value": window.location.href }, this.urlContainer);
            this.copyURLButton = utl.createElement("input", { "class": "copy-url-button", "type": "button", "value": "Copy URL" }, this.urlContainer);
        }
    }
    var utl = vdb.Utils;
    var ShareIcons = vdb.share.shareScreen.ShareScreenIcons;
    return { init: function init(model, title, embedScreenButtonEnabled) {
            this.model = model;
            this.player = this.model.player;
            this.shareElements = this.model.shareElements;
            this.socialNetworks = this.model.socialNetworks;
            this.controlBarRow = this.model.skin.controlBarRow;
            this.controlsBarContainer = this.model.skin.controlsBarContainer;
            this.shareScreenHtmlContainer = this.model.container;
            this.shareButtonsContainer = getShareButtonContainer.call(this);
            this.isShareScreenClosed = false;
            this.title = title;
            createShareScreen.call(this);
            createAndDockShareItems.call(this, this.socialNetworks, embedScreenButtonEnabled);
            assignEvents.call(this);
            setMobileStyles.call(this);
            hideControlBar.call(this);
            setBackButtonImage.call(this);
        }, hideBackButton: function hideBackButton() {
            utl.addClass(this.backButtonWrapper, "fadeOut");
            utl.removeClass(this.backButtonWrapper, "fadeIn");
        }, showBackButton: function showBackButton() {
            utl.removeClass(this.backButtonWrapper, "fadeOut");
            utl.addClass(this.backButtonWrapper, "fadeIn");
        }, hide: function hide() {
            utl.replaceClass(this.socialDock, "fadeIn", "fadeOut");
            this.showBackButton();
            showControlBar.call(this);
        }, show: function show() {
            utl.replaceClass(this.socialDock, "fadeOut", "fadeIn");
            this.hideBackButton();
            this.hideErrorMessage();
            hideControlBar.call(this);
            this.isShareScreenClosed = false;
        }, close: function close() {
            utl.addClass(this.socialDock, "fadeOut");
            this.hideBackButton();
            this.hideErrorMessage();
            showControlBar.call(this);
            this.isShareScreenClosed = true;
            if (this.copyURLButton) {
                this.copyURLButton.value = "Copy URL";
            }
        }, fadeOutShareScreen: function fadeOutShareScreen() {
            utl.addClass(this.socialDock, "fadeOut");
        }, fadeInShareScreen: function fadeInShareScreen() {
            utl.removeClass(this.socialDock, "fadeOut");
        }, toggleInvisible: function toggleInvisible() {
            utl.toggleClass(this.shareScreenOuterContainer, "fadeOut", !utl.hasClass(this.shareScreenOuterContainer, "fadeOut"));
        }, showErrorMessage: function showErrorMessage() {
            utl.removeClass(this.errorMessageContainer, "hidden");
        }, hideErrorMessage: function hideErrorMessage() {
            utl.addClass(this.errorMessageContainer, "hidden");
        } };
}());
vdb.skins.shareScreen.ShareScreen = vdb.core.Class.extend(function () {
    function emailScreenTransitionFunction() {
        if (this.currentState.emailScreen === ShareScreenStatesEnum.EMAIL_SCREEN_CLOSED && utl.hasClass(emailPage.emailScreenWrapper, "fadeOut") && !this.view.isShareScreenClosed) {
            this.show();
        }
    }
    function linkScreenTransitionFunction() {
        if (this.currentState.linkScreen === ShareScreenStatesEnum.LINK_SCREEN_CLOSED && utl.hasClass(linkPage.linkScreenOuterContainer, "fadeOut") && !this.view.isShareScreenClosed) {
            this.show();
        }
    }
    function embedScreenTransitionFunction() {
        if (this.currentState.embedScreen === ShareScreenStatesEnum.EMBED_SCREEN_CLOSED && utl.hasClass(embedScreen.embedScreenOuterContainer, "fadeOut") && !this.view.isShareScreenClosed) {
            this.show();
        }
    }
    function copiedScreenTransitionFunction() {
        if (utl.hasClass(this.copiedScreen.copiedScreenWrapper, "fadeOut") && !this.view.isShareScreenClosed) {
            this.show();
        }
    }
    function assignEvents() {
        for (var i = 0; i < this.view.shareElements.length; i++) {
            this.view.shareElements[i].addEventListener("click", function (e) {
                var shareElement = e.currentTarget.className.replace("share-element-container ", "").replace(" share-element-container-mobile", "").replace("-mobile", "");
                switch (shareElement) {
                    case "email":
                        this.hide();
                        this.currentState.emailScreen = ShareScreenStatesEnum.EMAIL_SCREEN_OPENED;
                        break;
                    case "link":
                        this.hide();
                        this.currentState.linkScreen = ShareScreenStatesEnum.LINK_SCREEN_OPENED;
                        break;
                    case "embed":
                        this.hide();
                        this.currentState.embedScreen = ShareScreenStatesEnum.EMBED_SCREEN_OPENED;
                        break;
                    default:
                        this.getSocialNetwork(shareElement).share(socialNetworkWindowSize[shareElement]);
                        break;
                }
            }.bind(this));
        }
        this.view.backButton.addEventListener("click", function () {
            closeChildScreens.call(this);
        }.bind(this));
        var transitions = ["transitionend", "oTransitionEnd", "transitionend", "webkitTransitionEnd"];
        for (i = 0; i < transitions.length; i++) {
            embedScreen.embedScreenOuterContainer.addEventListener(transitions[i], embedScreenTransitionFunction.bind(this));
            this.copiedScreen.copiedScreenWrapper.addEventListener(transitions[i], copiedScreenTransitionFunction.bind(this));
            if (emailPage && linkPage) {
                emailPage.emailScreenWrapper.addEventListener(transitions[i], emailScreenTransitionFunction.bind(this));
                linkPage.linkScreenOuterContainer.addEventListener(transitions[i], linkScreenTransitionFunction.bind(this));
            }
        }
    }
    function closeChildScreens() {
        if (emailPage && this.currentState.emailScreen === ShareScreenStatesEnum.EMAIL_SCREEN_OPENED) {
            emailPage.hideEmailScreen();
        }
        if (linkPage && this.currentState.linkScreen === ShareScreenStatesEnum.LINK_SCREEN_OPENED) {
            linkPage.hideLinkPageScreen();
        }
        if (embedScreen && this.currentState.embedScreen === ShareScreenStatesEnum.EMBED_SCREEN_OPENED) {
            embedScreen.hideEmbedScreen();
        }
        if (!utl.hasClass(this.view.socialDock, "fadeIn")) {
            this.view.fadeOutShareScreen();
        }
    }
    function fireOpenCloseScreenEvent(eventType) {
        switch (eventType) {
            case OpenCloseScreenEnum.OPEN_SCREEN:
                this.player.dispatchEvent(vdb.constants.PlayerEvent.SHARE_SCREEN_OPENED);
                break;
            case OpenCloseScreenEnum.CLOSE_SCREEN:
                this.player.dispatchEvent(vdb.constants.PlayerEvent.SHARE_SCREEN_CLOSED);
                break;
        }
    }
    function setShareScreenState(stateType) {
        this.currentState = { shareScreen: ShareScreenStatesEnum.SHARE_SCREEN_CLOSED, emailScreen: ShareScreenStatesEnum.EMAIL_SCREEN_CLOSED, embedScreen: ShareScreenStatesEnum.EMBED_SCREEN_CLOSED, linkScreen: ShareScreenStatesEnum.LINK_SCREEN_CLOSED, copiedScreen: ShareScreenStatesEnum.COPIED_SCREEN_CLOSED };
        switch (this.shareScreenType) {
            case ShareScreenTypesEnum.SHARE_SCREEN_GENERAL:
                this.currentState.shareScreen = stateType !== OpenCloseScreenEnum.CLOSE_SCREEN ? ShareScreenStatesEnum.SHARE_SCREEN_OPENED : ShareScreenStatesEnum.SHARE_SCREEN_CLOSED;
                break;
            case ShareScreenTypesEnum.SHARE_SCREEN_EMBED:
                this.currentState.embedScreen = stateType !== OpenCloseScreenEnum.CLOSE_SCREEN ? ShareScreenStatesEnum.EMBED_SCREEN_OPENED : ShareScreenStatesEnum.EMBED_SCREEN_CLOSED;
                break;
            case ShareScreenTypesEnum.LINK_SCREEN:
                this.currentState.linkScreen = stateType !== OpenCloseScreenEnum.CLOSE_SCREEN ? ShareScreenStatesEnum.LINK_SCREEN_OPENED : ShareScreenStatesEnum.LINK_SCREEN_CLOSED;
                break;
            case ShareScreenTypesEnum.COPIED_SCREEN:
                this.currentState.copiedScreen = stateType !== OpenCloseScreenEnum.CLOSE_SCREEN ? ShareScreenStatesEnum.COPIED_SCREEN_OPENED : ShareScreenStatesEnum.COPIED_SCREEN_CLOSED;
                break;
            case ShareScreenTypesEnum.EMAIL_SCREEN:
                this.currentState.emailScreen = stateType !== OpenCloseScreenEnum.CLOSE_SCREEN ? ShareScreenStatesEnum.EMAIL_SCREEN_OPENED : ShareScreenStatesEnum.EMAIL_SCREEN_CLOSED;
                break;
        }
    }
    function displayMobile(playerSize) {
        if (utl.mobileOs() || playerSize.width < 430 || playerSize.height < 241) {
            return true;
        }
        return false;
    }
    var utl = vdb.Utils;
    var emailPage;
    var linkPage;
    var embedScreen;
    var $ = vdb.utils.Common;
    var ShareScreenStatesEnum = vdb.skins.shareScreen.ShareScreenStatesEnum;
    var ShareScreenTypesEnum = vdb.skins.shareScreen.ShareScreenTypesEnum;
    var OpenCloseScreenEnum = { OPEN_SCREEN: "openScreen", CLOSE_SCREEN: "closeScreen" };
    var socialNetworkWindowSize = { "facebook": { width: 555, height: 400 }, "twitter": { width: 500, height: 258 }, "google": { width: 400, height: 254 }, "weibo": { width: 650, height: 332 } };
    var LOGGER = vdb.log.getLogger("ShareScreen");
    return { init: function init(controller, settings, container, shareScreenButton, shareScreenType) {
            this.shareScreenType = shareScreenType;
            setShareScreenState.call(this, OpenCloseScreenEnum.OPEN_SCREEN);
            this.model = new vdb.skins.shareScreen.ShareScreenModel(controller, settings, container, shareScreenButton);
            this.copiedScreen = new vdb.skins.shareScreen.CopiedScreen(this.model.container, this.currentState);
            this.view = new vdb.skins.shareScreen.ShareScreenView(this.model, settings.shareScreenViewTitle, settings.embedScreenButtonEnabled);
            this.player = this.model.player;
            fireOpenCloseScreenEvent.call(this, OpenCloseScreenEnum.OPEN_SCREEN);
            this.displayMobile = displayMobile(this.player.getSize());
            embedScreen = this.displayMobile ? new vdb.skins.shareScreen.EmbedScreenMobile(this, settings) : new vdb.skins.shareScreen.EmbedScreenDesktop(this, settings);
            emailPage = this.displayMobile ? new vdb.skins.shareScreen.EmailScreenMobile(this) : new vdb.skins.shareScreen.EmailScreenDesktop(this);
            linkPage = this.displayMobile ? new vdb.skins.shareScreen.LinkScreenMobile(this) : new vdb.skins.shareScreen.LinkScreenDesktop(this);
            assignEvents.call(this);
        }, hide: function hide() {
            this.view.hide();
            this.currentState.shareScreen = ShareScreenStatesEnum.SHARE_SCREEN_CLOSED;
        }, show: function show(shareScreenType) {
            shareScreenType = shareScreenType || ShareScreenTypesEnum.SHARE_SCREEN_GENERAL;
            setShareScreenState.call(this, OpenCloseScreenEnum.OPEN_SCREEN);
            fireOpenCloseScreenEvent.call(this, OpenCloseScreenEnum.OPEN_SCREEN);
            if (shareScreenType === ShareScreenTypesEnum.SHARE_SCREEN_GENERAL) {
                this.view.show();
            } else {
                if (shareScreenType === ShareScreenTypesEnum.SHARE_SCREEN_EMBED) {
                    embedScreen.showEmbedScreen();
                }
            }
        }, close: function close(shareScreenType) {
            shareScreenType = shareScreenType || ShareScreenTypesEnum.SHARE_SCREEN_GENERAL;
            if (shareScreenType === ShareScreenTypesEnum.SHARE_SCREEN_GENERAL) {
                closeChildScreens.call(this);
            } else {
                if (shareScreenType === ShareScreenTypesEnum.SHARE_SCREEN_EMBED) {
                    embedScreen.close();
                }
            }
            this.view.close();
            this.toggleInvisible();
            this.model.shareScreenButton.toggleButtonState();
            setShareScreenState.call(this, OpenCloseScreenEnum.CLOSE_SCREEN);
            fireOpenCloseScreenEvent.call(this, OpenCloseScreenEnum.CLOSE_SCREEN);
            if (this.model.shareScreenButton.resumePlayOnClose) {
                this.model.controller.resume();
            }
        }, getSocialNetwork: function getSocialNetwork(socialNetworkName) {
            return this.model.socialNetworks.filter(function (socialNetwork) {
                return socialNetwork.getType() === socialNetworkName;
            })[0];
        }, getCurrentVideoTime: function getCurrentVideoTime() {
            return $.formatTime(vdb.html5.player.Display.getInstance().getCurrentTime().toFixed());
        }, hideBackButton: function hideBackButton() {
            this.view.hideBackButton();
        }, showBackButton: function showBackButton() {
            this.view.showBackButton();
        }, getSocialNetworks: function getSocialNetworks() {
            return this.model.socialNetworks;
        }, getShareScreenContainer: function getShareScreenContainer() {
            return this.view.shareScreenContainer;
        }, getShareScreenBackButton: function getShareScreenBackButton() {
            return this.view.backButton;
        }, getPlayer: function getPlayer() {
            return this.model.player;
        }, isFullScreen: function isFullScreen() {
            return vdb.Utils.desktopOs() && vdb.utils.Fullscreen.enabled() ? vdb.utils.Fullscreen.isFullscreen() : false;
        }, getPlayerInfo: function getPlayerInfo() {
            return { videoId: this.model.controller.getCurrentVideoId(), bcid: vdb.ctx.buyerCompanyId };
        }, fadeOutShareScreen: function fadeOutShareScreen() {
            this.view.fadeOutShareScreen();
        }, fadeInShareScreen: function fadeInShareScreen() {
            this.view.fadeOutShareScreen();
        }, getCopiedScreen: function getCopiedScreen() {
            return this.copiedScreen;
        }, toggleInvisible: function toggleInvisible() {
            this.view.toggleInvisible();
        }, getCurrentState: function getCurrentState() {
            return this.currentState;
        }, showErrorMessage: function showErrorMessage() {
            this.view.showErrorMessage();
        }, hideErrorMessage: function hideErrorMessage() {
            this.view.hideErrorMessage();
        } };
}());
vdb.skins.shareScreen.ShareScreenButton = vdb.core.Class.extend(function () {
    function openShareScreen(settings, shareScreenType) {
        this.shareScreenType = shareScreenType;
        if (!this.shareScreen) {
            this.shareScreen = new vdb.skins.shareScreen.ShareScreen(this.controller, settings, this.shareScreenButtonHtmlContainer, this, shareScreenType);
            setTimeout(function () {
                this.shareScreen.show(shareScreenType);
            }.bind(this), 0);
        } else {
            this.shareScreen.show(shareScreenType);
        }
        this.resumePlayOnClose = this.controller.isPlaying();
        this.controller.pause();
        this.shareScreen.toggleInvisible();
        this.toggleButtonState();
    }
    function closeShareScreen() {
        this.shareScreen.close(this.shareScreenType);
        this.shareScreenType = null;
    }
    function assignEvents(settings) {
        this.closeButton.addEventListener("click", closeShareScreen.bind(this));
        this.shareButton.addEventListener("click", openShareScreen.bind(this, settings, ShareScreenTypesEnum.SHARE_SCREEN_GENERAL));
        if (settings.embedScreenButtonEnabled) {
            this.embedButton.addEventListener("click", openShareScreen.bind(this, settings, ShareScreenTypesEnum.SHARE_SCREEN_EMBED));
        }
    }
    function getShareScreenContainer() {
        var children = Array.prototype.slice.call(this.container.children);
        return children.filter(function (child) {
            return child.className === "absolute-wrapper";
        })[0];
    }
    function addMobileStyles() {
        if (utl.mobileOs() || this.container.clientWidth < 420) {
            utl.addClass(this.shareButtonContainer, "share-screen-buttons-container-mobile");
            utl.addClass(this.closeButtonContainer, "close-button-container-mobile");
            utl.addClass(this.shareButton, "share-screen-button-mobile");
            utl.addClass(this.closeButton, "share-screen-button-active-mobile");
            utl.addClass(this.shareScreenButtonsOuterContainer, "share-screen-buttons-outer-container-mobile");
            if (this.embedButton) {
                utl.addClass(this.embedButton, "embed-screen-button-mobile");
            }
        }
    }
    function embedCssFiles() {
        vdb.dom.embedCssToHead(".share-screen-buttons-container{position:relative;height:30px;display:table;opacity:1}.close-button-container{position:absolute;width:30px;height:100%;right:0;cursor:pointer;display:table;opacity:1;top:4px}.close-button.fadeIn{z-index:6}.close-button.fadeOut{z-index:1}.close-button-container-mobile{top:10px;right:0}.share-screen-buttons-outer-container{float:right;position:relative;z-index:2;height:30px;display:table;margin-right:10px;opacity:0;transition:.3s opacity ease-in-out;-webkit-transition:.3s opacity ease-in-out;-moz-transition:.3s opacity ease-in-out;pointer-events:none;left:0}.upper-icons-wrapper.left .share-screen-buttons-outer-container{float:left}.share-screen-buttons-outer-container-mobile{top:3.5%}div.share-screen-outer-container{position:absolute;width:100%;top:0;height:100%;background-color:rgba(0,0,0,0.55);z-index:2;left:0}.share-screen-container{text-align:center;position:absolute;width:100%;top:0;left:0}.share-screen-button{display:inline-block;background:rgba(34,34,34,0.5)}.share-screen-button>svg{vertical-align:middle;width:84px;height:30px}.share-screen-button-mobile{border-radius:100%;font-size:0;position:relative;width:34px;height:34px}.share-screen-button-mobile>svg{height:18px;width:18px;vertical-align:middle;position:absolute;top:8px;left:7px}.share-screen{position:absolute;width:100%;height:100%;z-index:4;top:0;opacity:0;transition:opacity .5s ease-in-out;-webkit-transition:opacity .5s ease-in-out;-moz-transition:opacity .5s ease-in-out;-ms-transition:opacity .5s ease-in-out;display:table;background-color:transparent;left:0}.share-screen-active{text-align:right}.share-screen-active>svg{height:23px;width:23px}.share-screen-header{font-family:Arial;font-size:18px;font-weight:bold;line-height:21px;color:#fff;text-align:center;margin-bottom:16px}.share-element-container{position:relative;display:inline-block;border-radius:50%;width:53px;height:53px;margin-left:15px;margin-bottom:3px}.share-screen-element-containers-container{text-align:center;cursor:pointer}.share-screen-element{position:relative;display:table-cell;vertical-align:middle;text-align:center;font-size:0}.google{background:#f75002}.weibo{background:blue}.twitter{background:#00bfe7}.linkedin{background:#0076b7}.facebook{background:#39579a}.twitter>div>div>svg{fill:white;position:relative;height:17px;width:20px;vertical-align:middle}.linkedin>div>div>svg{fill:white;position:relative;height:22px;width:21px;vertical-align:middle}.facebook>div>div>svg{fill:white;position:relative;height:19px;width:10px;vertical-align:middle}.google>div>div>svg{fill:white;position:relative;height:17px;width:20px;vertical-align:middle}.email>div>div>svg{fill:white;position:relative;height:18px;width:17px;vertical-align:middle}.embed>div>div>svg{fill:white;position:relative;height:23px;width:35px;vertical-align:middle}.weibo>div>div>svg{fill:white;position:relative;height:17px;width:20px;vertical-align:middle}.link>div>div>svg{fill:white;position:relative;height:20px;width:20px;vertical-align:middle}.email{background:#06a99a}.embed{background:#56798a}.link{background:#918f8f}.hide-background{background:0;right:1.2%}.close-button{position:relative;opacity:1;display:table-cell;vertical-align:middle;text-align:right;background:transparent!important}.close-button>svg{height:23px;width:23px}div.fadeIn{opacity:1;transition:opacity .3s ease-in-out,background .3s ease-in-out;-webkit-transition:opacity .3s ease-in-out,background .3s ease-in-out;-moz-transition:opacity .3s ease-in-out,background .3s ease-in-out}div.fadeOut{opacity:0;pointer-events:none;visibility:hidden;background-color:transparent;transition:opacity .3s ease-in-out,background .3s ease-in-out,visibility .3s ease-in-out;-webkit-transition:opacity .3s ease-in-out,background .3s ease-in-out,visibility .3s ease-in-out;-moz-transition:opacity .3s ease-in-out,background .3s ease-in-out,visibility .3s ease-in-out}.share-screen-back-button{cursor:pointer;z-index:3;position:absolute}.share-screen-back-button>svg{height:23px;width:32px}.share-screen-back-button-outer-container{display:table-cell;vertical-align:middle;position:relative}.share-screen-back-button-wrapper{display:table;left:1%;height:38px;margin-left:26px;top:0}.share-screen-back-button-wrapper-mobile{height:58px;margin-left:26px}.share-screen-header-container{display:table-row;text-align:center;vertical-align:middle}.share-screen-elements-container{display:table-cell;vertical-align:middle;position:relative}.share-screen-elements-container-full-screen{transform:translateY(-10%);-webkit-transform:translateY(-10%);-moz-transform:translateY(-10%);-ms-transform:translateY(-10%)}.share-element-container:first-child{margin-left:0}.click-through{pointer-events:none}.share-element-container-mobile{margin-left:22.5px;margin-bottom:12.5px;width:43px;height:43px}.share-screen-element-outer-container{display:table;width:100%;height:100%}.share-screen-back-button-mobile{left:5%}.share-screen-back-button-mobile>svg{height:17px;width:24px}.share-screen-buttons-container-mobile{border-radius:100%;width:33px;height:33px}.share-screen-button-active-mobile{text-align:center}.share-screen-button-active-mobile>svg{height:17px;width:17px}.close-button-active-mobile>svg{height:17px;vertical-align:middle}.google-mobile{background:#f75002}.weibo-mobile{background:blue}.twitter-mobile{background:#00bfe7}.facebook-mobile{background:#39579a}.email-mobile{background:#06a99a}.embed-mobile{background:#56798a}.link-mobile{background:#918f8f}.twitter-mobile>div>div>svg{fill:white;position:relative;height:13px;vertical-align:middle}.facebook-mobile>div>div>svg{fill:white;position:relative;height:15px;vertical-align:middle}.google-mobile>div>div>svg{fill:white;position:relative;height:13px;vertical-align:middle}.email-mobile>div>div>svg{fill:white;position:relative;height:11px;width:17px;vertical-align:middle}.embed-mobile>div>div>svg{fill:white;position:relative;height:16px;width:35px;vertical-align:middle}.weibo-mobile>div>div>svg{fill:white;position:relative;height:17px;vertical-align:middle}.link-mobile>div>div>svg{fill:white;position:relative;height:16px;vertical-align:middle}.share-buttons-inner-container{display:inline-block}.error-message-container{position:absolute;display:table;width:100%;text-align:center;top:0;left:0}.error-message{color:red;font-family:Arial;font-size:12px}.hidden{display:none;animation:none}.invisible{visibility:hidden}.bringToFront{z-index:3;cursor:pointer}.show-skin .share-screen-buttons-outer-container{opacity:1;pointer-events:auto}.close-button-container.left{left:5px}.ad-mode .share-screen-buttons-outer-container{display:none}.no-pointer-events{pointer-events:none}@media(max-width:380px){.share-screen-header{font-size:14px}.share-element-container{width:33px;height:33px}.twitter>div>div>svg{height:16px;width:14px}.facebook>div>div>svg{height:13px;width:8px}.linkedin>div>div>svg{height:16px;width:15px}.google>div>div>svg{height:12px;width:14px}.email>div>div>svg{height:10px;width:15px}.embed>div>div>svg{height:16px;width:24px}.weibo>div>div>svg{height:14px;width:18px}}");
        vdb.dom.embedCssToHead(".copied-screen-wrapper{display:table;width:100%;height:100%;position:absolute;top:0;left:0;z-index:3;opacity:0}.copied-outer-container{display:table-cell;text-align:center;vertical-align:middle;z-index:3}.copied-container{display:inline-block;width:95px;height:95px;box-sizing:border-box;cursor:pointer;background-color:rgba(38,38,38,0.85);border:3px solid #12abe2;border-radius:50%}.copied-inner-table-container{display:table;width:100%;height:100%}.copied-inner-container{display:table-cell;text-align:center;vertical-align:middle}.copied-text{font-size:14px;font-weight:bold;text-align:center;color:#12abe2;font-family:Arial}.copied-image-container{display:inline-block}.copied-image{width:25px;height:25px}.copied-image{margin-top:6px}.copied-image>svg{fill:#12abe2}.copied-container-full-screen{width:195px;height:195px}.copied-text-full-screen{font-size:24px}.copied-image-full-screen{width:35px;height:35px}");
        vdb.dom.embedCssToHead(".bottom-container{width:100%;height:100%;margin-top:19px}.checkbox-container{text-align:center;height:100%;position:relative}.checkbox-container>svg{vertical-align:middle;width:68%;height:68%;position:absolute;left:16%;top:16%}.check-box-wrapper{height:100%;width:14%;min-width:28px;float:left}.check-box{height:calc(100% - 2px);width:calc(100% - 2px);background-color:rgba(38,38,38,0.85);border:1px solid rgba(151,151,151,0.5);border-radius:2px;cursor:pointer}.text{font-size:16px;color:#d0d0d0;display:table-cell;vertical-align:middle;text-align:center;font-family:Arial;height:100%}.time-wrapper{height:100%;position:relative;width:26%;float:left}.time-container{height:100%}.time{border:1px solid rgba(151,151,151,0.5);text-align:center;font-size:16px;color:#d0d0d0;border-radius:2px;background:rgba(38,38,38,0.85);width:90%;font-family:Arial;padding:5.5px 5px 5.5px 5px;height:calc(100% - 13px)}.invisible{visibility:hidden}.empty{color:transparent}.text-container{float:left;text-align:center;height:100%;margin:0 14px}.text-second-inner-container{display:table;width:100%;height:100%;text-align:center}.check-box-outer-container{height:100%}.bottom-panel-mobile{margin-top:0}.text-mobile{font-size:14px}.bottom-panel-mobile .text-container{margin:0 8px}.time-mobile{font-size:14px}.bottom-panel-mobile .check-box-wrapper{width:14%}@media(max-width:560px){.text{font-size:14px}.time{font-size:14px}.text-container{margin:0 6px}}");
    }
    function setShareButtonPosition() {
        var container = this.skin.upperIconsContainer;
        var outerContainer = this.skin.upperIconsContainer.getElementsByClassName("share-screen-buttons-outer-container")[0];
        var closeButtonContainer = outerContainer.getElementsByClassName("close-button-container")[0];
        if (this.shareButtonPosition && this.shareButtonPosition["shareAlignment"] === "left") {
            utl.removeClass(container, "shift-on-side-related");
            utl.addClass(container, "left");
            utl.addClass(closeButtonContainer, "left");
        }
        if (this.shareButtonPosition && +this.shareButtonPosition["shareTopMargin"]) {
            outerContainer.style.top = DEFAULT_BUTTON_POSITION + this.shareButtonPosition["shareTopMargin"] + "px";
        } else {
            outerContainer.style.top = DEFAULT_BUTTON_POSITION + "px";
        }
    }
    function applySkinStyle(settings, skin) {
        this.skin = skin;
        this.shareButtonPosition = settings.shareButtonPosition;
        this.container = this.player.container;
        this.shareScreenButtonHtmlContainer = getShareScreenContainer.call(this);
        this.skin.createShareScreenButtons.call(this, settings.embedScreenButtonEnabled);
        setShareButtonPosition.call(this);
        assignEvents.call(this, settings);
        addMobileStyles.call(this);
    }
    var utl = vdb.Utils;
    var DEFAULT_BUTTON_POSITION = 10;
    var ShareScreenTypesEnum = vdb.skins.shareScreen.ShareScreenTypesEnum;
    return { init: function init(settings, controller) {
            embedCssFiles.call(this);
            this.controller = controller;
            this.player = controller.getPlayer();
            this.skinType = controller.getSkinType();
            this.shareButtonContainer = settings.shareButtonContainer;
            this.closeButtonContainer = settings.closeButtonContainer;
            controller.getSkin().then(applySkinStyle.bind(this, settings));
        }, toggleButtonState: function toggleButtonState() {
            if (utl.hasClass(this.closeButton, "fadeOut")) {
                utl.replaceClass(this.closeButton, "fadeOut", "fadeIn");
                utl.removeClass(this.closeButtonContainer, "no-pointer-events");
            } else {
                utl.replaceClass(this.closeButton, "fadeIn", "fadeOut");
                utl.addClass(this.closeButtonContainer, "no-pointer-events");
            }
            if (utl.hasClass(this.shareButton, "fadeOut")) {
                utl.replaceClass(this.shareButton, "fadeOut", "fadeIn");
                if (this.embedButton) {
                    utl.replaceClass(this.embedButton, "fadeOut", "fadeIn");
                }
                utl.removeClass(this.closeButtonContainer, "bringToFront");
                utl.addClass(this.shareButtonContainer, "bringToFront");
            } else {
                utl.replaceClass(this.shareButton, "fadeIn", "fadeOut");
                if (this.embedButton) {
                    utl.replaceClass(this.embedButton, "fadeIn", "fadeOut");
                }
                utl.removeClass(this.shareButtonContainer, "bringToFront");
                utl.addClass(this.closeButtonContainer, "bringToFront");
            }
        } };
}());
vdb.share.ShareIcons = function () {
    var SocialNetworkEnum = vdb.share.SocialNetworkEnum;
    var shareIcons = {};
    shareIcons[SocialNetworkEnum.LIKE] = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 15.2"><g class="liked"><path d="M8.8,9.7c0-3.1,2.5-5.6,5.6-5.6c0.9,0,1.8,0.2,2.5,0.6c-0.3-2.4-1.8-4.6-4.5-4.6c-2.9,0-4,2.7-4,2.7 s-1.2-2.7-4-2.7C1.6,0.1,0,2.7,0,5.3c0,4.4,8.5,9.8,8.5,9.8s0.8-0.5,2-1.4C9.5,12.7,8.8,11.3,8.8,9.7z"/><path d="M14.5,5.2c-2.5,0-4.5,2-4.5,4.5c0,2.5,2,4.5,4.5,4.5s4.5-2,4.5-4.5C19,7.2,17,5.2,14.5,5.2z M13.7,12.2L11.6,10 l1.1-1.2l1.1,1.2l2.5-2.6l1,1.1L13.7,12.2z"/></g><path class="not-liked" d="M8.7,2.7c0,0-1.2-2.7-4-2.7c-3,0-4.6,2.7-4.6,5.3c0,4.4,8.5,9.8,8.5,9.8S17,9.7,17,5.3c0-2.7-1.6-5.2-4.5-5.2 S8.7,2.7,8.7,2.7z" transform="translate(-.15,0)"/></svg>';
    shareIcons[SocialNetworkEnum.GOOGLE] = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.1 18"><path d="M5.7,17.9c-3.3,0-5.7-1.4-5.7-3.4c0-2.2,2.5-4.1,5.5-4.1c0.2,0,0.5,0,0.5,0c-0.3-0.4-0.5-0.9-0.5-1.3 c0-0.3,0.1-0.5,0.2-0.8c-0.1,0-0.1,0-0.2,0C3,8.3,1.2,6.6,1.2,4.2c0-2.2,2.3-4.2,4.9-4.2h5.4c0.1,0,0.2,0.1,0.2,0.1 c0,0.1,0,0.2-0.1,0.2l-1.2,0.9c0,0-0.1,0-0.1,0h-1c0.8,0.6,1.2,1.7,1.2,3c0,1.1-0.6,2.2-1.6,3c-0.8,0.7-1,0.9-1,1.4 c0,0.4,0.8,1.1,1.4,1.5c1.4,1,2,2,2,3.7C11.3,15.9,9.4,17.9,5.7,17.9 M6,11.4c-2,0-3.7,1.2-3.7,2.6c0,1.5,1.5,2.7,3.4,2.7 c2.5,0,3.8-0.9,3.8-2.6c0-0.2,0-0.3-0.1-0.5c-0.2-0.7-0.8-1.1-1.7-1.7l-0.4-0.3C7,11.4,6.5,11.4,6,11.4L6,11.4z M5.3,1.2 c-0.5,0-0.9,0.2-1.3,0.6C3.6,2.3,3.4,3.2,3.5,4.2C3.7,5.9,5,7.4,6.3,7.4h0c0.5,0,1-0.2,1.3-0.6c0.5-0.6,0.7-1.5,0.6-2.5 C8,2.7,6.7,1.2,5.3,1.2L5.3,1.2z M15.7,9.5c-0.1,0-0.2-0.1-0.2-0.2V5.6h-3.7c-0.1,0-0.2-0.1-0.2-0.2V4.1c0-0.1,0.1-0.2,0.2-0.2h3.7 V0.2c0-0.1,0.1-0.2,0.2-0.2H17c0.1,0,0.2,0.1,0.2,0.2v3.7h3.7c0.1,0,0.2,0.1,0.2,0.2v1.3c0,0.1-0.1,0.2-0.2,0.2h-3.7v3.7 c0,0.1-0.1,0.2-0.2,0.2H15.7z"/></svg>';
    shareIcons[SocialNetworkEnum.FACEBOOK] = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 16"><path d="M6.6,3.5H9V0H6.3C4.1,0,2.5,1.8,2.5,3.5v1.8H0v3.6h2.5V16h3.3V8.9h2.5V5.3H5.7V4.4C5.7,3.9,6.3,3.5,6.6,3.5"/></svg>';
    shareIcons[SocialNetworkEnum.LINKEDIN] = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M2.127,0C0.949,0,0,0.935,0,2.084C0,3.236,0.949,4.17,2.127,4.17c1.173,0,2.125-0.935,2.125-2.086 C4.252,0.935,3.3,0,2.127,0z M0.291,17.316h3.67V5.75h-3.67V17.316z M13.3,5.463c-1.782,0-2.983,0.959-3.471,1.869H9.777V5.75 H6.263v11.57h3.664V11.6c0-1.513,0.291-2.974,2.199-2.974c1.883,0,1.906,1.724,1.906,3.065v5.625h3.665v-6.346 C17.697,7.859,17.014,5.463,13.3,5.463z"/></svg>';
    shareIcons[SocialNetworkEnum.TWITTER] = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.9 13.4"><path d="M14.9,1.7c-0.5,0.3-1.1,0.4-1.7,0.5c0,0,0,0,0,0c0.6-0.4,1.1-1.1,1.4-1.8c-0.2,0.1-1.1,0.7-2,0.8 C12,0.5,11.2,0,10.3,0C8.3,0,7.1,1.8,7.1,3.4c0,0.1,0.1,0.7,0.1,0.7C4.6,4.1,2.3,2.7,0.8,0.6c-1.1,2.1,0,3.9,0.8,4.6 c-0.4,0-0.9-0.1-1.2-0.3C0.5,6.5,1.5,7.8,3,8.2c-0.6,0.2-1.2,0-1.5,0c0.4,1.3,1.6,2.3,2.9,2.4C2.3,12.2,0,12,0,12 c1.3,0.9,2.9,1.4,4.5,1.4c6.1,0,9.2-5.9,8.8-10.1C14,3,14.6,2.4,14.9,1.7z"/></svg> ';
    shareIcons[SocialNetworkEnum.WEIBO] = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 40.5"><path d="M21.25,37.79c-8.28.82-15.42-2.92-16-8.36s5.74-10.5,14-11.32,15.42,2.92,16,8.36S29.53,37,21.25,37.79m16.56-18c-0.7-.21-1.19-0.35-0.82-1.28,0.8-2, .88-3.74,0-5-1.62-2.32-6.06-2.19-11.15-.06,0,0-1.6.7-1.19-.57,0.78-2.52.67-4.63-.55-5.84-2.76-2.76-10.11.1-16.4,6.4C3,18.13.25,23.13,0.25,27.46c0, 8.27,10.6,13.3,21,13.3,13.6,0,22.64-7.9,22.64-14.17,0-3.79-3.19-5.94-6.06-6.83" transform="translate(-0.25,-0.25)" /><path d="M46.84,4.62A13.23,13.23,0,0,0,34.24.54h0A1.91,1.91,0,0,0,35,4.28,9.41,9.41,0,0,1,46,16.39h0a1.92,1.92,0,0,0,3.64,1.18h0A13.23,13.23,0,0,0,46.84,4.62" transform="translate(-0.25,-0.25)"/><path d="M41.8,9.17a6.44,6.44,0,0,0-6.14-2,1.65,1.65,0,1,0,.69,3.22h0A3.15,3.15,0,0,1,40,14.46h0a1.65,1.65,0,1,0,3.14,1A6.44,6.44,0,0,0,41.8,9.17" transform="translate(-0.25,-0.25)"/><path d="M21.71,27.95a1.2,1.2,0,0,1-1.43.53,0.83,0.83,0,0,1-.37-1.24,1.18,1.18,0,0,1,1.4-.53,0.84,0.84,0,0,1,.4,1.24m-2.64,3.39a3.14,3.14,0,0,1-3.81, 1.25,2.2,2.2,0,0,1-.85-3.31A3.15,3.15,0,0,1,18.15,28a2.2,2.2,0,0,1,.92,3.32m3-9A9,9,0,0,0,12,26.7c-1.74,3.54-.06,7.47,3.92,8.75a8.94,8.94,0,0,0, 10.67-4.53c1.67-3.74-.41-7.58-4.49-8.63" transform="translate(-0.25,-0.25)"/></svg>';
    shareIcons[SocialNetworkEnum.EMBED] = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 13.1"><path d="M8.1,0.5c-0.6-0.5-1.4-0.6-2,0L2,4.5l0,0l-2,2l2,2l0,0l4.1,4.1c0.6,0.5,1.4,0.5,2,0c0.6-0.5,0.6-1.4,0-2 L4,6.5l4.1-4.1C8.7,1.9,8.7,1,8.1,0.5z M21,4.5L21,4.5l-4.1-4.1c-0.6-0.5-1.4-0.5-2,0c-0.6,0.6-0.6,1.4,0,2L19,6.5l-4.1,4.1 c-0.6,0.5-0.6,1.4,0,2c0.6,0.5,1.4,0.6,2,0L21,8.5l0,0l2-2L21,4.5z"/></svg>';
    shareIcons[SocialNetworkEnum.EMAIL] = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 12"><path d="M11.3,5.3L17,12V0.6L11.3,5.3z M17,0H0l8.5,7L17,0z M8.5,7.7L6,5.7L0.6,12h15.8L11,5.7L8.5,7.7z M0,0.6V12 l5.3-6.7L0,0.6z"/></svg>';
    shareIcons[SocialNetworkEnum.SHARE] = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.1 10.4"><path d="M7,7.2c0,0.6-0.2,1.2-0.5,1.7C6.2,9.3,5.8,9.7,5.2,9.9c-0.6,0.3-1.3,0.4-2.1,0.4c-0.7,0-1.2,0-1.7-0.1 C1,10.1,0.5,9.9,0,9.7V7.3c0.5,0.3,1,0.5,1.6,0.6c0.6,0.1,1.1,0.2,1.5,0.2c0.4,0,0.7-0.1,0.9-0.2c0.2-0.1,0.3-0.3,0.3-0.5 c0-0.1,0-0.3-0.1-0.4C4.1,6.9,4,6.8,3.8,6.7C3.7,6.6,3.2,6.4,2.5,6.1C1.8,5.8,1.4,5.5,1,5.2c-0.3-0.3-0.6-0.6-0.7-1 C0.1,3.9,0.1,3.5,0.1,3c0-0.9,0.3-1.6,1-2.2s1.6-0.8,2.8-0.8c1,0,2.1,0.2,3.2,0.7L6.2,2.9C5.2,2.4,4.4,2.2,3.8,2.2 C3.4,2.2,3.1,2.3,3,2.4C2.8,2.5,2.7,2.7,2.7,2.9c0,0.2,0.1,0.4,0.3,0.5c0.2,0.2,0.8,0.4,1.7,0.8C5.6,4.6,6.2,5,6.5,5.5 C6.8,5.9,7,6.5,7,7.2z"/><path d="M17.7,10.2H15V6.1h-3.1v4.1H9.1v-10h2.7v3.7H15V0.2h2.7V10.2z"/><path d="M26.5,10.2L26,8.3h-3.2l-0.5,1.9h-3l3.3-10h3.6l3.3,10H26.5z M25.5,6.1L25,4.5c-0.1-0.4-0.2-0.8-0.4-1.4 c-0.1-0.6-0.2-1-0.3-1.2c0,0.2-0.1,0.6-0.2,1.1c-0.1,0.5-0.4,1.6-0.8,3.2H25.5z"/><path d="M33.8,6.6v3.6h-2.7v-10h3.3c2.7,0,4.1,1,4.1,3c0,1.2-0.6,2.1-1.7,2.7l2.9,4.4h-3.1l-2.1-3.6H33.8z M33.8,4.5 h0.5c0.9,0,1.4-0.4,1.4-1.2c0-0.7-0.5-1-1.4-1h-0.5V4.5z"/><path d="M47.1,10.2h-5.9v-10h5.9v2.2h-3.2v1.6h3v2.2h-3V8h3.2V10.2z"/></svg> ';
    return shareIcons;
}();
vdb.skins.skin6 = {};
vdb.skins["skin6"] = vdb.skins.BaseSkin.extend(function () {
    var utl = vdb.Utils;
    var isMobile = !!utl.mobileOs();
    var $ = vdb.utils.Common;
    var PlayerMacros = vdb.constants.PlayerMacros;
    var buildControls = function buildControls() {
        this.createControlsBarContainerWrapper();
        this.controlsBarContainer = utl.createElement("div", { "class": ["control-bar-container"] }, this.controlsBarContainerWrapper);
        this.controlBarWrapper = utl.createElement("div", { "class": ["control-bar-wrapper"] }, this.controlsBarContainer);
        this.buttonsWrapper = utl.createElement("div", { "class": ["buttons-wrapper", "shrink-on-side-related"] }, this.controlBarWrapper);
        this.controlBarTable = utl.createElement("div", { "class": "control-bar-table" }, this.controlBarWrapper);
        this.controlBarRow = utl.createElement("div", { "class": "control-bar-row" }, this.controlBarTable);
        this.playButtonCell = utl.createElement("div", { "class": "play-button-cell" }, isMobile ? this.buttonsWrapper : this.controlBarRow);
        this.playButton = utl.createElement("div", { "class": "play-button" }, this.playButtonCell);
        if (!isMobile) {
            this.playButtonRim = utl.createElement("div", { "class": "play-button-rim" }, this.playButton);
        }
        this.backgroundGradient = utl.createElement("div", { "class": ["background-gradient"] }, this.controlBarWrapper);
        this.bufferedIcon = utl.createElement("div", { "class": "buffered-icon" }, this.playButtonRim, '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41"><path d="M20.5,2.065c10.139,0,18.434,8.295,18.434,18.435c0,10.139-8.295,18.434-18.434,18.434 c-10.139,0-18.434-8.295-18.434-18.434C2.065,10.362,10.361,2.065,20.5,2.065 M20.5,0C9.171,0,0,9.171,0,20.5S9.171,41,20.5,41 S41,31.829,41,20.5S31.829,0,20.5,0L20.5,0z"/></svg> ');
        this.bufferingIcon = utl.createElement("div", { "class": "buffering-icon" }, this.playButtonRim, utl.setFuncIRIPrefix('<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 66 66"><linearGradient id="skin6-spinner-gradient" gradientUnits="userSpaceOnUse" x1="55.6484" y1="14.5625" x2="-28.5724" y2="85.2322" gradientTransform="matrix(0 1 1.5 .1 0 -2)"><stop offset="0" stop-color="currentColor" stop-opacity="1"/><stop offset="0.5" stop-color="currentColor" stop-opacity="0"/></linearGradient><path id="skin6-spinner-path" fill="url(@func-iri-prefix#skin6-spinner-gradient)" d="M-0.014,33c0,18.193,14.813,32.992,33.006,32.992 C51.188,65.992,66,51.193,66,33C66,14.809,51.188,0.008,32.992,0.008C14.799,0.008-0.014,14.809-0.014,33z M61.986,33 c0,15.996-13.006,29.01-28.992,29.01S4.002,48.996,4.002,33S17.008,3.99,32.994,3.99S61.986,17.004,61.986,33z"/><clipPath id="skin6-spinner-clip-path"><use xlink:href="@func-iri-prefix#skin6-spinner-path"/></clipPath><rect x="0" y="0" clip-path="url(@func-iri-prefix#skin6-spinner-clip-path)" fill="currentColor" width="33" height="66"/></svg> '));
        this.replayIcon = utl.createElement("div", { "class": "replay-icon" }, this.playButtonRim, '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53.1 49.2"><path d="M24.5,49.1C11,49.1,0,38.1,0,24.6C0,11.1,11,0.1,24.5,0.1c11,0,20.8,7.4,23.7,18.1l0.1,0.2l0.1,0.2h4.7L45,26.6 l-8.1-8.1h5.6l-0.3-0.8C39.3,10.5,32.4,6,24.7,6C14.3,6,5.9,14.4,5.9,24.7c0,10.3,8.4,18.7,18.7,18.7c7.2,0,13.8-4.1,16.9-10.6 l4.2,4.1C41.3,44.4,33.2,49.1,24.5,49.1z"/></svg>');
        this.playButtonState = utl.createElement("div", { "class": "play-button-state" }, this.playButton);
        this.playIcon = utl.createElement("div", { "class": "play-icon" }, this.playButtonState, '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 10"><path d="M0,9.5C0,9,0,0.9,0,0.6c0-0.4,0.3-0.7,0.7-0.5c0.3,0.2,5.6,4.1,6.1,4.4c0.3,0.2,0.3,0.7,0,1 C6.4,5.7,1.1,9.7,0.7,9.9C0.4,10.2,0,9.9,0,9.5z"/></svg>');
        this.pauseIcon = utl.createElement("div", { "class": "pause-icon" }, this.playButtonState, '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 10"><rect width="3" height="10"/><rect x="6" width="3" height="10"/></svg>');
        this.progressBarContainer = utl.createElement("div", { "class": "progress-bar-container" }, this.controlBarRow);
        this.progressBarTopFrame = utl.createElement("div", { "class": "progress-bar-top-frame" }, this.progressBarContainer);
        this.progressBar = utl.createElement("div", { "class": "progress-bar" }, this.progressBarContainer);
        this.bufferProgress = utl.createElement("div", { "class": "buffer-progress" }, this.progressBar);
        this.videoProgress = utl.createElement("div", { "class": "video-progress" }, this.progressBar);
        this.videoPlayhead = utl.createElement("div", { "class": "video-playhead" }, this.progressBar);
        this.videoProgressTime = utl.createElement("div", { "class": "video-progress-time" }, this.videoPlayhead, "00:00");
        this.spacer = utl.createElement("div", { "class": "spacer" }, this.buttonsWrapper);
        if (vdb.ctx.getMacro(PlayerMacros.BIG_PLAY_PAUSE_BUTTON) !== "false" && vdb.ctx.getMacro(PlayerMacros.BIG_PLAY_PAUSE_BUTTON) !== "0") {
            this.bigButtonComponent = new vdb.skins.BigPlayPause(this.controller, this.controlsBarContainer, this.container);
        }
        if (this.showLogo()) {
            this.logoButtonCell = utl.createElement("div", { "class": "logo-button-cell" }, this.buttonsWrapper);
            this.logoButton = this.createLogoButton(this.logoButtonCell);
        }
        this.videoDurationContainer = utl.createElement("div", { "class": "video-duration-container" }, this.buttonsWrapper);
        this.videoDuration = utl.createElement("div", { "class": "video-duration" }, this.videoDurationContainer);
        this.progressBarBottomFrame = utl.createElement("div", { "class": "progress-bar-bottom-frame" }, this.progressBarContainer);
        var volumeSliderIcons = { buttonIcon: '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15.1"><path d="M9.1,0l-5,4.3H0.8C0.4,4.3,0,4.6,0,5.1v5.2c0,0.5,0.4,0.9,0.8,0.9h3.7L9.1,15c0.3,0,0.8-0.1,1.1-0.3V0.3 C9.8,0.1,9.4,0,9.1,0z"/><g class="muted-icon"><path d="M15,7.1h1v1h-1V7.1z"/><path d="M14,6.1h1v1h-1V6.1z"/><path d="M13,5.1h1v1h-1V5.1z"/><path d="M14,8.1h1v1h-1V8.1z"/><path d="M13,9.1h1v1h-1V9.1z"/><path d="M16,6.1h1v1h-1V6.1z"/><path d="M17,5.1h1v1h-1V5.1z"/><path d="M16,8.1h1v1h-1V8.1z"/><path d="M17,9.1h1v1h-1V9.1z"/></g><path class="full-volume-icon" d="M16.9,0.1l-1.1,1.5c1.6,1.5,2.5,3.7,2.5,6c0,2.4-1,4.6-2.6,6.1l1.1,1.4c2-2,3.1-4.6,3.1-7.5 C20,4.7,18.8,2,16.9,0.1z"/><path class="half-volume-icon" d="M13.8,3.1L13,4.8c0.8,0.7,1.3,1.7,1.3,2.8c0,1.2-0.3,2.3-1.2,3l0.8,1.4c1.2-1.1,2-2.7,2-4.4 C15.9,5.8,15.1,4.2,13.8,3.1z"/></svg> ' };

        this.volumeSliderComponent = document.createElement('volume-slider');
        this.volumeSliderComponent.init(this.controller, this.buttonsWrapper, volumeSliderIcons);
        this.ccButtonCell = utl.createElement("div", { "class": "cc-button-cell", "style": "display: none;" }, this.buttonsWrapper);
        this.setCcButton(utl.createElement("div", { "class": "cc-button" }, this.ccButtonCell, '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 10"><path d="M8.9,8.3c-1.1,1-2.3,1.5-3.7,1.5C1.4,9.8,0,7.5,0,5c0-2.4,1.6-5,5.1-5c1.3,0,2.6,0.5,3.6,1.5 L7.1,3.1c-0.7-0.6-1.4-0.8-2-0.8C3.3,2.3,2.6,3.7,2.6,5c0,1.2,0.7,2.6,2.5,2.6c0.6,0,1.5-0.3,2.2-0.9L8.9,8.3z"/><path d="M18,8.3c-1.1,1-2.3,1.5-3.7,1.5c-3.7,0-5.1-2.3-5.1-4.8c0-2.4,1.6-5,5.1-5c1.3,0,2.6,0.5,3.6,1.5 l-1.6,1.6c-0.7-0.6-1.4-0.8-2-0.8c-1.8,0-2.5,1.5-2.5,2.7c0,1.2,0.7,2.6,2.5,2.6c0.6,0,1.5-0.3,2.2-0.9L18,8.3z"/></svg> '));
        this.hdButtonCell = utl.createElement("div", { "class": "hd-button-cell", "style": "display: none;" }, this.buttonsWrapper);
        this.setHdButton(utl.createElement("div", { "class": "hd-button" }, this.hdButtonCell, '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.4 9.8"><path d="M6.3,9.8V6.1H2.8v3.7H0V0h2.8v3.7h3.5V0h2.7v9.8H6.3z"/><path d="M15.2,0c3.5,0,5.1,2.1,5.1,4.8s-1.6,5-5.1,5H11V0H15.2z M13.8,7.5h1.5c1.8,0,2.4-1.3,2.4-2.7 s-0.7-2.5-2.4-2.5h-1.5V7.5z"/></svg> '));
        this.buildLiveButton.call(this, { buttonIcon: '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.297 11.836"><path d="M9.498,11.836c1.56-1.545,2.5-3.6,2.5-5.928c0-2.294-0.947-4.376-2.457-5.908l-0.84,1.165 c1.246,1.214,2.038,2.894,2.038,4.743c0,1.883-0.823,3.584-2.114,4.805L9.498,11.836z"/><path d="M7.108,9.401C8.098,8.547,8.72,7.292,8.72,5.908c0-1.412-0.639-2.675-1.652-3.536L6.397,3.698 C7.039,4.228,7.445,5.017,7.445,5.9c0,0.975-0.228,1.854-0.984,2.385L7.108,9.401z"/><path d="M2.5,3.218c1.38,0,2.5,1.119,2.5,2.5s-1.12,2.5-2.5,2.5C1.119,8.219,0,7.1,0,5.718S1.119,3.218,2.5,3.218z"/><path d="M16.864,0.918h2.515v7.635h4.375v2.365h-6.89V0.918z"/><path d="M27.879,0.918v10h-2.625v-10H27.879z"/><path d="M32.285,10.918l-3.406-10h3.008l2.092,6.213l2.239-6.213h2.86l-3.368,10H32.285z"/><path d="M47.867,6.866h-4.395v1.969h4.823v2.084h-7.459V0.92h7.252v2.009h-4.616v1.923h4.395V6.866z"/></svg> ' }, this.buttonsWrapper);
        this.fullscreenButtonCell = utl.createElement("div", { "class": ["fullscreen-cell", "control-button-cell"] }, this.buttonsWrapper);
        this.fullscreenButton = utl.createElement("div", { "class": "fullscreen-button" }, this.fullscreenButtonCell);
        this.enterFullscreenIcon = utl.createElement("div", { "class": "enter-fullscreen-icon" }, this.fullscreenButton, '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 16"><path class="st0" d="M3,3h14v10H3V3z M5,11.1H15V4.9H5V11.1z"/><polygon class="st0" points="19,0 15,0 15,1 19,1 19,5 20,5 20,0.9 20,0 "/><polygon class="st0" points="19,11 19,15 15,15 15,16 19,16 20,16 20,15.1 20,11 "/><polygon class="st0" points="5,0 0.9,0 0,0 0,0.9 0,5 1,5 1,1 5,1 "/><polygon class="st0" points="1,15 1,11 0,11 0,16 0.9,16 5,16 5,15 "/></svg> ');
        this.exitFullscreenIcon = utl.createElement("div", { "class": "exit-fullscreen-icon" }, this.fullscreenButton, '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.6 21.8"><path d="M4.6,0H2.3v2.3H0v2.3h4.6V0z M4.6,17.2H23V4.6H4.6V17.2z M8.1,8h11.4v5.8H8.1V8z M25.3,2.3V0H23v4.6h4.6V2.3 H25.3z M23,21.8h2.3v-2.3h2.3v-2.3H23V21.8z M0,19.5h2.3v2.3h2.3v-4.6H0V19.5z"/></svg>');
        this.upperIconsContainer = utl.createElement("div", { "class": ["upper-icons-wrapper", "shift-on-side-related"] });
        this.container.appendChild(this.upperIconsContainer);
        this.container.appendChild(this.controlsBarContainerWrapper || this.controlsBarContainer);
        this.volumeSliderComponent.setLeftBorderWidth();
        if (isMobile) {
            if (this.hdButtonCell.clientWidth > 0 && utl.browser.platform.name === "android" && utl.browser.platform.version >= 7) {
                utl.addClass(this.videoDurationContainer, "hd-on-mobile");
            }
        }
        this.miniBar = new vdb.skins.MiniBar(this.player, this.controlBarWrapper, this.forceMiniBar);
        this.miniBarIcon = utl.createElement("div", { "class": "mini-bar-icon" }, this.miniBar.miniBarWrapper, '<svg class="player-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.889 595.281"><path d="M1.496,488.746L421.331,70.715l419.062,418.031l-35.82,35.82L420.945,141.867L37.301,524.566L1.496,488.746z"/></svg> ');
    };
    var videoPlayheadUpdate = function videoPlayheadUpdate() {
        var rightLimit = this.progressBarContainer.clientWidth;
        var playheadPosition = parseInt(this.videoPlayhead.style.left, 10);
        var isPreview = this.videoPlayhead.className.indexOf("video-playhead-preview");
        if (isMobile) {
            if (playheadPosition < 10) {
                this.progressBarContainer.appendChild(this.videoProgressTime);
                this.videoProgressTime.style.left = "3px";
                this.videoProgressTime.style.top = "-14px";
                this.videoProgressTime.style.right = "";
            } else {
                if (playheadPosition > rightLimit - 28 && rightLimit > 0) {
                    this.progressBarContainer.appendChild(this.videoProgressTime);
                    this.videoProgressTime.style.right = "3px";
                    this.videoProgressTime.style.top = "-14px";
                    this.videoProgressTime.style.left = "";
                } else {
                    this.videoPlayhead.appendChild(this.videoProgressTime);
                    this.videoProgressTime.style.left = "-7px";
                    this.videoProgressTime.style.top = "-19px";
                    this.videoProgressTime.style.right = "";
                }
            }
        } else {
            if (parseInt(isPreview, 10) === -1) {
                if (playheadPosition < 6) {
                    this.progressBarContainer.appendChild(this.videoProgressTime);
                    this.videoProgressTime.style.left = "3px";
                    this.videoProgressTime.style.top = "-1px";
                    this.videoProgressTime.style.right = "";
                } else {
                    if (playheadPosition > rightLimit - 28) {
                        this.progressBarContainer.appendChild(this.videoProgressTime);
                        this.videoProgressTime.style.right = "3px";
                        this.videoProgressTime.style.top = "-1px";
                        this.videoProgressTime.style.left = "";
                    } else {
                        this.videoPlayhead.appendChild(this.videoProgressTime);
                        this.videoProgressTime.style.left = "-8px";
                        this.videoProgressTime.style.top = "-19px";
                        this.videoProgressTime.style.right = "";
                    }
                }
            }
        }
    };
    var smoothTimelineMove = function smoothTimelineMove() {
        var duration = this.display.getDurationWithoutAds();
        var currentTime = this.display.getCurrentTime();
        this.displayProgressBar.call(this, currentTime, duration);
    };
    var videoPlays = function videoPlays() {
        clearInterval(this.timeInterval);
        this.timeInterval = setInterval(smoothTimelineMove.bind(this), 100);
        clearTimeout(this.progressTimeTimeout);
        this.progressTimeTimeout = setTimeout(function () {
            utl.setStyle(this.videoProgressTime, { "opacity": 1 });
        }.bind(this), 200);
    };
    var videoStoped = function videoStoped() {
        clearInterval(this.timeInterval);
        videoPlayheadUpdate.call(this);
        if (!utl.hasClass(this.pauseIcon, "can-animate") && !isMobile) {
            utl.addClass(this.pauseIcon, "can-animate");
            utl.addClass(this.playIcon, "can-animate");
        }
    };
    var videoEnded = function videoEnded() {
        utl.setStyle(this.videoProgressTime, { "opacity": 0 });
        videoStoped.bind(this);
    };
    var adStarted = function adStarted(e) {
        var adsDuration = Math.max(this.display.getDuration(), 0);
        if (e && e.data.type !== "Overlay") {
            this.videoDuration.innerHTML = "Ad: " + $.formatTime(adsDuration);
        }
        if (!utl.hasClass(this.pauseIcon, "can-animate") && !isMobile) {
            utl.addClass(this.pauseIcon, "can-animate");
            utl.addClass(this.playIcon, "can-animate");
        }
        utl.setStyle(this.videoProgressTime, { "opacity": 0 });
    };
    var onAdTimeUpdate = function onAdTimeUpdate(e) {
        this.videoDuration.innerHTML = "Ad: " + $.formatTime(e.data["timeRemaining"]);
    };
    var onAdEnd = function onAdEnd() {
        this.videoDuration.innerHTML = "";
    };
    var movePlayhead = function movePlayhead(leftOffset) {
        this._super(leftOffset);
        videoPlayheadUpdate.call(this);
    };
    return { init: function init(controller) {
            if (vdb.ctx.getMacro(vdb.constants.PlayerMacros.ADMINIBAR_OPACITY)) {
                this.miniBarOpacity = vdb.ctx.getMacro(vdb.constants.PlayerMacros.ADMINIBAR_OPACITY) / 100;
            } else {
                this.miniBarOpacity = .5;
            }
            this.cssText = '.player-icon,.standard-color-path{fill:#d0d0d0}.dark-color-path{fill:#222}.control-bar-wrapper{width:100%;height:60px;position:absolute;bottom:0;pointer-events:auto;box-sizing:border-box}@keyframes spinner{from{-moz-transform:rotateY(0deg);-ms-transform:rotateY(0deg);transform:rotateY(0deg)}to{-moz-transform:rotateY(-180deg);-ms-transform:rotateY(-180deg);transform:rotateY(-180deg)}}@keyframes spinner180{from{-moz-transform:rotateY(-180deg);-ms-transform:rotateY(-180deg);transform:rotateY(-180deg)}to{-moz-transform:rotateY(-360deg);-ms-transform:rotateY(-360deg);transform:rotateY(-360deg)}}#videos-container{transform:translateZ(0px)}.big-button-wrapper{width:100%;height:100%;position:absolute;-webkit-perspective:300px;-moz-perspective:300px;perspective:300px;z-index:2;transform:translateZ(1px)}.mobile-mode .big-button{cursor:auto}.big-button.playState{-moz-transform:rotateY(180deg);-ms-transform:rotateY(180deg);transform:rotateY(180deg)}.big-button.animate{-webkit-animation-play-state:running;animation-play-state:running;-webkit-animation-name:spinner;animation-name:spinner;-webkit-animation-timing-function:ease-out;-webkit-animation-iteration-count:1;-webkit-animation-duration:.3s;animation-timing-function:ease-out;animation-iteration-count:1;animation-duration:.3s}.big-button.animate180{-webkit-animation-play-state:running;animation-play-state:running;-webkit-animation-name:spinner180;animation-name:spinner180;-webkit-animation-timing-function:ease-out;-webkit-animation-iteration-count:1;-webkit-animation-duration:.3s;animation-timing-function:ease-out;animation-iteration-count:1;animation-duration:.3s}.big-button{-webkit-transform-style:preserve-3d;-moz-transform-style:preserve-3d;transform-style:preserve-3d;position:absolute;cursor:pointer;top:50%;left:50%;margin:-40px -40px;z-index:1;width:79px;height:79px}.big-button-background{opacity:0;transition:opacity .2s ease-in-out;-webkit-transition:opacity .2s ease-in-out;-moz-transition:opacity .2s ease-in-out;position:absolute;width:100%;height:100%;background-color:rgba(34,34,34,0.5);border-radius:100%}.big-button-ring1{opacity:0;transition:opacity .2s ease-in-out;-webkit-transition:opacity .2s ease-in-out;-moz-transition:opacity .2s ease-in-out;position:absolute;top:4px;left:4px;width:71px;height:71px;transform:translateZ(1px)}.big-button-ring2{opacity:0;transition:opacity .2s ease-in-out;-webkit-transition:opacity .2s ease-in-out;-moz-transition:opacity .2s ease-in-out;position:absolute;top:4px;left:4px;width:71px;height:71px;transform:translateZ(-1px)}.big-button.playState .big-button-pause-icon{opacity:0!important}.big-button.pauseState .big-button-play-icon{opacity:0!important}.big-button-pause-icon.animate{opacity:0!important}.big-button-play-icon.animate{opacity:0!important}.big-button-play-icon{opacity:0;transition:opacity .2s ease-in-out;-webkit-transition:opacity .2s ease-in-out;-moz-transition:opacity .2s ease-in-out;position:absolute;top:29px;left:30px;width:14px;height:21px;transform:translateZ(-20px) scaleX(-1)}.big-button-pause-icon{opacity:0;transition:opacity .2s ease-in-out;-webkit-transition:opacity .2s ease-in-out;-moz-transition:opacity .2s ease-in-out;position:absolute;top:30px;left:31px;width:16px;height:21px;transform:translateZ(20px)}div.small,div.small:first-child{visibility:visible;width:96px;height:96px}div.medium,div.medium:first-child{visibility:visible;width:116px;height:116px}div.large,div.large:first-child{visibility:visible;width:138px;height:138px}div.rectangle.small:first-child{visibility:visible;width:96px;height:56px}div.rectangle.medium:first-child{visibility:visible;width:116px;height:68px}div.rectangle.large:first-child{visibility:visible;width:138px;height:81px}.progress-bar-container:hover .video-progress-time{left:-6px!important}.progress-bar-container:hover .video-playhead{transition:width .3s ease-in-out,height .3s ease-in-out,margin-left .3s ease-in-out,top .3s ease-in-out;-webkit-transition:width .3s ease-in-out,height .3s ease-in-out,margin-left .3s ease-in-out,top .3s ease-in-out;-moz-transition:width .3s ease-in-out,height .3s ease-in-out,margin-left .3s ease-in-out,top .3s ease-in-out;top:-7px;margin-left:-3px;width:16px!important;height:16px!important}.mobile-mode .progress-bar-container:hover .video-playhead{width:10px!important;height:10px!important;border-radius:100%;position:absolute;background-color:#fff;box-shadow:1px 1px 2px rgba(0,0,0,0.46);top:-4px;z-index:3;margin-left:0}.beyondLimit{position:fixed;right:0}.video-progress-time{opacity:1;transition:opacity .2s ease-in,left .5s ease-in;-webkit-transition:opacity .2s ease-in,left .5s ease-in;-moz-transition:opacity .2s ease-in,left .5s ease-in;top:-19px;left:8px;text-shadow:1px 1px 2px rgba(0,0,0,0.46);position:absolute}.mobile-mode .video-progress-time{left:3px}.video-progress-time-preview{position:absolute;font-family:Arial;font-size:11px;color:#fff;margin:auto;display:inline-block;left:40%;z-index:4}.time-line-preview{margin-left:53px;bottom:50px!important;border-radius:100%;position:absolute;text-align:center;visibility:hidden;pointer-events:none;z-index:5;border-color:#222!important;opacity:0;transition:opacity .1s ease-in;-webkit-transition:opacity .1s ease-in;-moz-transition:opacity .1s ease-in}.time-line-preview.rectangle,.time-line-preview.rectangle .time-line-preview-background,.time-line-preview.rectangle .time-line-preview-helper,.time-line-preview.square,.time-line-preview.square .time-line-preview-background,.time-line-preview.square .time-line-preview-helper{border-radius:0}.time-line-preview-background{width:100%;height:120%;border-radius:100% 100% 0 0;z-index:0}.time-line-preview-helper{z-index:1;width:100%;height:100%;border-radius:100%;position:absolute;text-align:center;box-shadow:0 1px 2px #222;background:linear-gradient(to bottom,rgba(34,34,34,0) 0,rgba(34,34,34,0) 50%,rgba(34,34,43,0.85) 100%);transition:opacity .1s ease-in;-webkit-transition:opacity .1s ease-in;-moz-transition:opacity .1s ease-in;pointer-events:none}.time-line-preview.hideThumbnail{opacity:0}.time-line-preview.showThumbnail{opacity:1}.time-line-preview-is-ad{display:none}.background-gradient{bottom:0;width:100%;height:88px;position:absolute;pointer-events:none;opacity:1;transition:opacity .7s ease-out;-webkit-transition:opacity .7s ease-out;-moz-transition:opacity .7s ease-out;z-index:1;background:linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0))}.ad-mode .control-bar-wrapper{opacity:0;pointer-events:none}.buttons-wrapper{display:table;width:100%;height:30px;bottom:0;opacity:1;position:absolute;pointer-events:auto;-moz-transition:bottom .7s ease-out;-webkit-transition:bottom .7s ease-out;transition:bottom .7s ease-out}.mobile-mode .buttons-wrapper{height:37px;bottom:0}.control-bar-wrapper,.ad-info-bar,.upper-icons-wrapper,.show-skin .upper-icons-wrapper.hide-upper-icons-wrapper,.embed-wrapper{opacity:0;-moz-transition:opacity .5s,transform .5s;-webkit-transition:opacity .5s,transform .5s;transition:opacity .5s,transform .5s;pointer-events:none}.stopped-mode .control-bar-wrapper{-moz-transition:none;-webkit-transition:none;transition:none}.show-skin .control-bar-wrapper,.show-skin .upper-icons-wrapper,.show-skin .ad-info-bar,.show-skin .embed-wrapper.show-embed-wrapper,.stopped-mode .control-bar-wrapper,.mini-bar-mode.control-bar-wrapper{opacity:1;pointer-events:auto}.mini-bar-mode.slide-down-mini-bar .control-bar-table{bottom:-60px}.mini-bar-mode.slide-down-mini-bar .background-gradient{opacity:0}.mini-bar-mode.slide-down-mini-bar .buttons-wrapper{bottom:-60px}.mini-bar-mode.slide-down-mini-bar{pointer-events:none}.mini-bar-wrapper-shown .ad-progress-bar{bottom:-60px}.show-mini-bar{opacity:#minibarColor!important}.mini-bar-mode.control-bar-wrapper .buffer-progress{display:none}.mini-bar-mode.control-bar-wrapper .video-playhead{display:none}.mini-bar-icon{fill:#fff;position:absolute;width:24px;left:14px;top:7px}.mini-bar-wrapper{z-index:2;opacity:0;-moz-transition:opacity .3s ease-in;-webkit-transition:opacity .3s ease-in;transition:opacity .3s ease-in;position:absolute;bottom:0;pointer-events:auto;background-color:black;width:52px;height:26px;left:50%;margin-left:-26px;border-radius:52px 52px 0 0}.mini-bar-wrapper-shown .subtitles-bottom-container{bottom:24px!important}.control-bar-table{display:table;width:100%;position:absolute;-moz-transition:bottom .7s ease-out;-webkit-transition:bottom .7s ease-out;transition:bottom .7s ease-out;bottom:0}.control-bar-row{width:100%;display:table-row;bottom:9px;position:absolute}.control-bar-row>div{display:table-cell;vertical-align:middle;width:1px}.play-button-cell{position:relative;border-radius:100%;left:7px;background-color:rgba(34,34,34,0.5);z-index:6}.mobile-mode .play-button-cell{left:0;position:absolute;background-color:rgba(34,34,34,0)}.mobile-mode .play-button{width:52px;height:37px;margin:0}.play-button{width:41px;height:41px;margin:3px;position:relative;z-index:6}.play-button>div{width:100%;height:100%;position:absolute;top:0;left:0}.play-button-state{z-index:2}.play-button-state .play-icon{position:absolute;width:8px;height:11px;left:18px;top:15px;opacity:0}.mobile-mode .playing-state .play-icon{opacity:0}.mobile-mode .play-icon{width:12px;left:21px;top:9px;opacity:1}.play-button-state .pause-icon{position:absolute;width:9px;height:10px;margin:0 auto;opacity:1;left:16px;top:15px}.mobile-mode .playing-state .pause-icon{width:12px;left:21px;top:11px;margin:0;opacity:1}.mobile-mode .pause-icon{opacity:0}.playing-state .play-icon.can-animate{-webkit-transition:top .2s ease-in-out,left .2s ease-in-out,width .2s ease-in-out,height .2s ease-in-out,opacity 0s .2s;-moz-transition:top .2s ease-in-out,left .2s ease-in-out,width .2s ease-in-out,height .2s ease-in-out,opacity 0s .2s;transition:top .2s ease-in-out,left .2s ease-in-out,width .2s ease-in-out,height .2s ease-in-out,opacity 0s .2s;left:22px;top:19px;width:1px;height:1px;opacity:0}.play-icon.can-animate{-webkit-transition:top .2s .2s ease-in-out,left .2s .2s ease-in-out,width .2s .2s ease-in-out,height .2s .2s ease-in-out,opacity 0s .2s;-moz-transition:top .2s .2s ease-in-out,left .2s .2s ease-in-out,width .2s .2s ease-in-out,height .2s .2s ease-in-out,opacity 0s .2s;transition:top .2s .2s ease-in-out,left .2s .2s ease-in-out,width .2s .2s ease-in-out,height .2s .2s ease-in-out,opacity 0s .2s;left:18px;top:15px;width:8px;height:11px;opacity:1}.pause-icon.can-animate{-webkit-transition:top .2s ease-in-out,left .2s ease-in-out,width .2s ease-in-out,height .2s ease-in-out,opacity 0s .2s;-moz-transition:top .2s ease-in-out,left .2s ease-in-out,width .2s ease-in-out,height .2s ease-in-out,opacity 0s .2s;transition:top .2s ease-in-out,left .2s ease-in-out,width .2s ease-in-out,height .2s ease-in-out,opacity 0s .2s;left:20px;top:19px;width:1px;height:1px;opacity:0}.playing-state .pause-icon.can-animate{-webkit-transition:top .2s .2s ease-in-out,left .2s .2s ease-in-out,width .2s .2s ease-in-out,height .2s .2s ease-in-out,opacity 0s .2s;-moz-transition:top .2s .2s ease-in-out,left .2s .2s ease-in-out,width .2s .2s ease-in-out,height .2s .2s ease-in-out,opacity 0s .2s;transition:top .2s .2s ease-in-out,left .2s .2s ease-in-out,width .2s .2s ease-in-out,height .2s .2s ease-in-out,opacity 0s .2s;left:16px;top:15px;width:9px;height:10px;opacity:1}.play-button-rim{z-index:1}.play-button-rim>div{width:100%;height:100%;position:absolute}.buffering-state .buffering-icon{color:#customColor;-moz-animation:rotate 1s linear infinite;-webkit-animation:rotate 1s linear infinite;animation:rotate 1s linear infinite}.progress-bar-container{padding:0 0 0 4px;position:relative;width:100%!important;cursor:pointer;z-index:6}.mobile-mode .progress-bar-container{position:absolute;bottom:24px;padding:0;height:20px}.mobile-mode .progress-bar{top:7px}.mobile-mode .progress-bar-top-frame{top:7px;left:0}.mobile-mode .progress-bar-bottom-frame{top:7px;left:0}.progress-bar-top-frame,.progress-bar-bottom-frame{height:2px;left:3px;position:relative;background-color:rgba(34,34,34,0.5)}.progress-bar{height:2px;background-color:rgba(255,255,255,0.2);position:relative}.ad-mode:not(.branded-player) .progress-bar-container,.stopped-mode .progress-bar-container{cursor:default;pointer-events:none}.buffer-progress{display:block;height:100%;position:absolute;width:0;background-color:#customColor;z-index:1}.video-progress{height:100%;position:absolute;width:0;background-color:#d0d0d0;z-index:2}.video-playhead,.volume-slider-thumb{width:10px;height:10px;border-radius:100%;position:absolute;background-color:#fff;box-shadow:1px 1px 2px rgba(0,0,0,0.46)}.video-playhead{display:block;top:-4px;z-index:3;margin-left:0}.volume-slider-tooltip{width:40px;height:17px;right:31px;margin-bottom:32px;display:block!important;position:absolute;opacity:0;background:rgba(34,34,34,0.5);border-radius:2px;-moz-transition:opacity .5s;-webkit-transition:opacity .5s;transition:opacity .5s;pointer-events:none;z-index:5}.volume-slider-tooltip:after{border-left:4px solid rgba(34,34,34,0.5);border-right:4px solid transparent;border-top:4px solid transparent;border-bottom:4px solid transparent;bottom:4px;right:-12px;-moz-transform:translateX(-50%);-webkit-transform:translateX(-50%);transform:translateX(-50%);content:"";position:absolute;width:0;height:0}.volume-slider-tooltip-text{padding:3px 5px;position:relative;text-align:center;font:11px Arial;color:#fff}.volume-slider-tooltip.active{opacity:1}.spacer{width:100%;display:table-cell}.video-duration-container{position:relative;height:26px;display:table-cell;padding:0 0 0 12px;vertical-align:middle}.mobile-mode .video-duration-container{top:-1px}.mobile-mode .video-duration-container.hd-on-mobile{top:4px}.video-duration,.video-progress-time{text-align:right;font:11px/12px Arial;color:#fff}.video-duration{display:block;white-space:nowrap;padding:0 7px 0 2px;position:relative;vertical-align:middle;z-index:6}.mobile-mode .video-duration{padding:0 8px 0 0}.control-button-cell{display:table-cell;padding:0 7px;width:40px;position:relative;height:10px}.volume-cell{display:block;overflow:hidden;top:4px;padding-right:3px;-moz-transition:padding-right .5s ease-in-out;-webkit-transition:padding-right .5s ease-in-out;transition:padding-right .5s ease-in-out}.volume-cell:hover{padding-right:52px}.control-button-cell:last-child{padding-right:9px}.aol-on-logo,.custom-logo{background-position-x:right;width:36px;height:20px}.logo-button-cell{display:table-cell;bottom:-1px;position:relative;vertical-align:middle;z-index:7}.mobile-mode .volume-cell{padding-right:0;top:6px}.mobile-mode .volume-button{top:5px}.volume-cell,.fullscreen-cell{width:20px;height:20px;position:relative;z-index:7}.mobile-mode .fullscreen-cell{padding:0 16px 0 8px}.volume-button{width:16px;height:13px;top:4px;position:relative}.volume-slider-container{position:relative;bottom:8px;height:11px;width:40px;left:22px;z-index:6;opacity:0;-moz-transition:opacity .3s .2s ease-in-out;-webkit-transition:opacity .3s .2s ease-in-out;transition:opacity .3s .2s ease-in-out;pointer-events:none}.volume-cell:hover .volume-slider-container,.volume-slider-container.active{-moz-transition:opacity .2s ease-in-out;-webkit-transition:opacity .2s ease-in-out;transition:opacity .2s ease-in-out;opacity:1;pointer-events:auto}.volume-cell:hover ~ .cc-cell .cc-locked-mode{opacity:.4}.not-hd-video{opacity:.3}.hd-button{width:21px;height:11px;position:relative}.hd-button-cell{display:table-cell;padding:0 7px;width:40px;vertical-align:middle;position:relative;z-index:7}.mobile-mode .cc-button-cell{top:0}.mobile-mode .live-button-cell{top:-1px}.mobile-mode .hd-button,.mobile-mode .cc-button,.mobile-mode .live-button{height:12px;position:relative}.cc-button-cell{display:table-cell;padding:0 7px;width:40px;position:relative;z-index:7;vertical-align:middle}.volume-slider{border:4px solid rgba(0,0,0,0);width:40px;height:2px;position:relative;cursor:pointer}.volume-background{width:40px;height:2px;background-color:rgba(255,255,255,0.2)}.volume-level{position:absolute;bottom:0;width:100%;height:100%;background-color:#customColor}.volume-slider-thumb{right:-5px;top:-4px;z-index:6}.cc-button{position:relative;width:19px;height:11px}.cc-outer-container{bottom:23px!important;right:-18px!important;padding-bottom:20px!important}.stereoscopic-button{width:32px;height:20px}.stereoscopic-outer-container{bottom:41px}.floater-dock-button{width:20px;height:17px}.fullscreen-button{width:20px;height:15px;top:6px;position:relative}.mobile-mode .fullscreen-button{top:9px}.fullscreen-button.disabled{opacity:.6}.fullscreen-tooltip-container{position:relative}.fullscreen-tooltip{position:absolute;background-color:rgba(34,34,34,0.5);border-radius:2px;color:#fff;font:11px Arial;padding:3px 5px;margin-bottom:7px;opacity:0;width:49px;bottom:41px;right:-4px;-moz-transition:opacity .5s;-webkit-transition:opacity .5s;transition:opacity .5s;pointer-events:none;text-align:center;z-index:5}.fullscreen-tooltip:after{border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid rgba(34,34,34,0.5);bottom:-4px;left:50%;-moz-transform:translateX(-50%);-webkit-transform:translateX(-50%);transform:translateX(-50%);content:"";position:absolute;width:0;height:0}.fullscreen-button:not(.disabled):hover ~ .fullscreen-tooltip{opacity:1}.upper-icons-wrapper{position:absolute;top:0;right:0;width:100%;height:0;z-index:5}.ad-info-bar{bottom:32px;z-index:7;right:0;width:calc(100% - 51px);pointer-events:none;-moz-transform:none!important;-webkit-transform:none!important;transform:none!important}.ad-icons-layer{top:-19px}.ad-info-bar.mobile{bottom:42px;width:100%}.ad-progress-bar{height:2px;position:relative;bottom:0;-moz-transition:bottom .7s ease-out;-webkit-transition:bottom .7s ease-out;transition:bottom .7s ease-out;background-color:rgba(34,34,34,0)}.ad-progress{background-color:#d0d0d0}.top-ad-container{top:0}.ad-mode .ad-info-bar.expand-ad-info-bar ~ .upper-icons-wrapper,.ad-mode .ad-info-bar.expand-ad-info-bar ~ .embed-wrapper{top:45px}.upper-icons-wrapper>div{display:inline-block;height:37px;vertical-align:middle}.upper-icons-wrapper>div:nth-child(n+2){margin-left:20px}.live-button{width:53px;height:13px;position:relative}.live-button-active .player-icon{fill:#db3642}.live-button-cell{width:20px;height:20px;display:table-cell;position:relative;z-index:7;padding:0 7px;vertical-align:middle}.share-button,.reaction{display:inline-block;position:relative;border-radius:50%;width:37px;height:37px;background-color:rgba(34,34,34,0.5)}.share-button{margin-left:10px}.reaction{margin-bottom:3px;background:no-repeat center;background-size:cover;-webkit-backface-visibility:hidden;-webkit-filter:grayscale(0%)}.share-button:first-child{margin-left:0}.share-tooltip,.reaction-tooltip{background-color:rgba(34,34,34,0.5);border-radius:2px;color:#fff;font:11px Arial;padding:3px 5px;opacity:0;-moz-transition:opacity .5s;-webkit-transition:opacity .5s;transition:opacity .5s;pointer-events:none;position:absolute;text-align:center;z-index:5}.share-tooltip{bottom:-30px;left:50%;-moz-transform:translateX(-50%);-webkit-transform:translateX(-50%);transform:translateX(-50%)}.share-button>:not(.share-tooltip){display:block;position:relative}.share-button>.reactions-container{position:absolute;top:0;text-align:center;pointer-events:none}.share-like .player-icon{width:19px;height:15px;left:calc(50% - 9px);top:calc(50% - 7.5px)}.share-facebook .player-icon{width:9px;height:16px;left:calc(50% - 5px);top:calc(50% - 9px)}.share-linkedin .player-icon{width:15px;height:16px;left:calc(50% - 8px);top:calc(50% - 9px)}.share-twitter .player-icon{width:15px;height:14px;left:calc(50% - 7px);top:calc(50% - 7px)}.share-google .player-icon{width:17px;height:17px;left:calc(50% - 7px);top:calc(50% - 8.5px)}.share-weibo .player-icon{width:19px;height:15px;left:calc(50% - 9.5px);top:calc(50% - 8.5px)}.share-embed .player-icon{width:18px;height:13px;left:calc(50% - 9px);top:calc(50% - 6.5px)}.share-email .player-icon{width:17px;height:12px;left:calc(50% - 8.5px);top:calc(50% - 7px)}.reaction-tooltip{right:100%;top:50%;-moz-transform:translate(-15px,-50%);-webkit-transform:translate(-15px,-50%);transform:translate(-15px,-50%)}.share-tooltip:first-letter ,.reaction-tooltip:first-letter {text-transform:capitalize}.share-tooltip:after,.reaction-tooltip:after{content:"";position:absolute;width:0;height:0}.share-tooltip:after{border-left:4px solid transparent;border-right:4px solid transparent;border-bottom:4px solid rgba(34,34,34,0.5);top:-4px;left:50%;-moz-transform:translateX(-50%);-webkit-transform:translateX(-50%);transform:translateX(-50%)}.reaction-tooltip:after{border-top:4px solid transparent;border-bottom:4px solid transparent;border-left:4px solid rgba(34,34,34,0.5);right:-4px;top:50%;-moz-transform:translateY(-50%);-webkit-transform:translateY(-50%);transform:translateY(-50%)}.hover-enabled .social-dock>div:hover>.share-tooltip,.reactions-container:not(.collapse) .reaction-container:hover .reaction-tooltip{opacity:1;pointer-events:auto}.social-dock .share-reactions{background:0}.reaction-container:first-child,.reactions-container:not(.collapse):hover{pointer-events:auto}.reactions-container:not(:hover) .reaction,.reactions-container.collapse .reaction{-webkit-filter:grayscale(100%);filter:gray;filter:grayscale(100%)}.reaction-container{position:relative}.reaction-container:not(:first-child) .reaction{-moz-transform:scale(0,0);-webkit-transform:scale(0,0);transform:scale(0,0);margin-top:2px}.reaction-container:first-child .reaction{-moz-transition:filter .1s ease-out;-webkit-transition:.1s -webkit-filter ease-out,filter .1s ease-out;transition:.1s -webkit-filter ease-out,filter .1s ease-out}.reactions-container.allow-transition:not(.collapse):hover .reaction-container:nth-child(2) .reaction,.reactions-container.allow-transition .reaction-container:nth-child(5) .reaction{-moz-transition:-moz-transform .2s ease-out,width .2s ease-out,height .2s ease-out,margin .2s ease-out,filter .1s ease-out;-webkit-transition:-webkit-transform .2s ease-out,width .2s ease-out,height .2s ease-out,margin .2s ease-out,0.1s -webkit-filter ease-out;transition:transform .2s ease-out,width .2s ease-out,height .2s ease-out,margin .2s ease-out,filter .1s ease-out,0.1s -webkit-filter ease-out}.reactions-container.allow-transition:not(.collapse):hover .reaction-container:nth-child(3) .reaction,.reactions-container.allow-transition .reaction-container:nth-child(4) .reaction{-moz-transition:-moz-transform .2s ease-out .1s,width .2s ease-out,height .2s ease-out,margin .2s ease-out,filter .1s ease-out;-webkit-transition:-webkit-transform .2s ease-out .1s,width .2s ease-out,height .2s ease-out,margin .2s ease-out,0.1s -webkit-filter ease-out;transition:transform .2s ease-out .1s,width .2s ease-out,height .2s ease-out,margin .2s ease-out,filter .1s ease-out,0.1s -webkit-filter ease-out}.reactions-container.allow-transition:not(.collapse):hover .reaction-container:nth-child(4) .reaction,.reactions-container.allow-transition .reaction-container:nth-child(3) .reaction{-moz-transition:-moz-transform .2s ease-out .2s,width .2s ease-out,height .2s ease-out,margin .2s ease-out,filter .1s ease-out;-webkit-transition:-webkit-transform .2s ease-out .2s,width .2s ease-out,height .2s ease-out,margin .2s ease-out,0.1s -webkit-filter ease-out;transition:transform .2s ease-out .2s,width .2s ease-out,height .2s ease-out,margin .2s ease-out,filter .1s ease-out,0.1s -webkit-filter ease-out}.reactions-container.allow-transition:not(.collapse):hover .reaction-container:nth-child(5) .reaction,.reactions-container.allow-transition .reaction-container:nth-child(2) .reaction{-moz-transition:-moz-transform .2s ease-out .3s,width .2s ease-out,height .2s ease-out,margin .2s ease-out,filter .1s;-webkit-transition:-webkit-transform .2s ease-out .3s,width .2s ease-out,height .2s ease-out,margin .2s ease-out,0.1s -webkit-filter ease-out;transition:transform .2s ease-out .3s,width .2s ease-out,height .2s ease-out,margin .2s ease-out,filter .1s ease-out,0.1s -webkit-filter ease-out}.reactions-container:not(.collapse):hover .reaction-container:not(:first-child) .reaction{-moz-transform:scale(1,1);-webkit-transform:scale(1,1);transform:scale(1,1)}.reactions-container:not(.collapse) .reaction-container:not(:first-child):hover .reaction{width:50px;height:50px;margin:0 -6.5px 1px}.embed-wrapper{position:absolute;top:10px;right:10px;font-size:12px;z-index:5;max-width:400px;width:calc(100% - 20px);border-radius:10px;padding:10px;display:table;background:rgba(34,34,34,0.5);box-sizing:border-box;font-family:Arial;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal}.embed-wrapper-row{position:relative;display:table-row}.embed-wrapper-row:before{position:absolute;top:100%;left:50%;margin:10px 0 0 -5px;width:0;border-bottom:5px solid rgba(34,34,34,0.5);border-right:5px solid transparent;border-left:5px solid transparent;content:"";font-size:0;line-height:0}.embed-wrapper-row:after{position:absolute;top:100%;left:50%;width:50px;padding:6px;margin:15px 0 0 -31px;background-color:rgba(34,34,34,0.5);color:#fff;content:attr(data-tooltip);text-align:center;font-size:10px;border-radius:5px}.embed-wrapper-row:before,.embed-wrapper-row:after{opacity:0;-webkit-transition:opacity .3s;-moz-transition:opacity .3s;transition:opacity .3s}.embed-wrapper-row.show-tooltip:before,.embed-wrapper-row.show-tooltip:after{opacity:1}.embed-wrapper input{display:table-cell;width:100%;resize:none;vertical-align:middle;box-sizing:border-box;line-height:30px;height:30px;padding:0 5px;border-radius:3px;border:0}.embed-copy-btn{display:table-cell;color:blue;vertical-align:middle;text-align:center;color:#d0d0d0;cursor:pointer;width:1px;padding-left:8px;font-weight:700}.hover-enabled .embed-copy-btn:hover{color:#customColor}.embed-disabled-copy-btn,.hover-enabled .embed-disabled-copy-btn:hover{color:#808080;cursor:default}.embed-close-btn{position:absolute;top:4px;right:6px;color:#fff;opacity:.8;cursor:pointer;width:7px;height:7px;background-color:transparent}.related-button{position:relative;float:right;width:96px;padding:10px;margin:10px;box-sizing:border-box;border-radius:40px;background-color:rgba(34,34,34,0.5);font-family:Arial;font-weight:bolder;font-size:15px;letter-spacing:.8px;color:#d0d0d0;opacity:1;cursor:pointer;-webkit-transition:opacity .3s,width .3s;-moz-transition:opacity .3s,width .3s;transition:opacity .3s,width .3s}.hover-enabled .related-button:hover{color:white}.related-button.hidden{opacity:0;width:0;padding:0;margin-left:0}.subtitles-bottom-container{-webkit-transition:bottom .3s;-moz-transition:bottom .3s;transition:bottom .3s}.show-skin .subtitles-bottom-container{bottom:53px!important}.ad-break{position:absolute;width:1px;height:4px;top:0;border-top:19px solid rgba(208,208,208,0.3);border-bottom:18px solid rgba(208,208,208,0.3)}.ad-break:after{content:"";width:5px;height:5px;background:#d0d0d0;position:absolute;top:18px;left:-2px;border-radius:50%}:not(.ad-mode) .social-dock>div:not(.allow-on-content),.ad-mode .social-dock>div:not(.allow-on-ad),.social-dock>div.share-reactions.force-hide,.ad-mode:not(.branded-player) .progress-bar *,.stopped-mode .progress-bar *,.ad-mode .upper-icons-wrapper:not(.showOnAd),.ad-mode .ad-break,.stopped-mode .upper-icons-wrapper,.stopped-mode .buffered-icon,.stopped-mode .play-button-state,.buffering-icon,.buffering-state .buffered-icon,.replay-icon,.buffering-state ~ .play-button-state,.full-volume .muted-icon,.half-volume .full-volume-icon,.half-volume .muted-icon,.muted .full-volume-icon,.muted .half-volume-icon,.floating .float-icon,.dock-icon,.fullscreen-mode .enter-fullscreen-icon,.exit-fullscreen-icon,.liked-state .not-liked,.liked{display:none}.pause-icon{-webkit-animation-name:none;animation-name:none}.buffering-state .buffering-icon,.playing-state .pause-icon,.floating .dock-icon,.fullscreen-mode .exit-fullscreen-icon,.liked-state .liked{display:block}.hover-enabled .play-button-state,.hover-enabled .replay-icon,.hover-enabled .aol-on-logo,.hover-enabled .volume-button,.hover-enabled .live-button,.hover-enabled .stereoscopic-button,.hover-enabled .floater-dock-button,.hover-enabled .fullscreen-button:not(.disabled),.hover-enabled .share-button,.hover-enabled .reaction,.hover-enabled .tooltip-icon,.hover-enabled .embed-close-btn{cursor:pointer}.hover-enabled .play-button-state:hover .player-icon,.hover-enabled .replay-icon:hover .player-icon,.hover-enabled .aol-on-logo:hover .player-icon,.hover-enabled .volume-button:hover .player-icon,.hover-enabled .stereoscopic-button:hover .player-icon,.hover-enabled .floater-dock-button:hover .player-icon,.hover-enabled .fullscreen-button:not(.disabled):hover .player-icon,.hover-enabled .share-button:hover .player-icon,.hover-enabled .tooltip-icon:hover .player-icon,.hover-enabled .embed-close-btn:hover .player-icon,.button-active .player-icon{fill:#customColor}#SVGobject{stroke:#customColor}.enter-fullscreen-icon,.exit-fullscreen-icon,.live-button-icon,.float-icon,.dock-icon{height:100%}'.replace(/#minibarColor/g, this.miniBarOpacity);
            this.player = controller.getPlayer();
            this.forceMiniBar = !controller.isAol || vdb.ctx.getMacro(PlayerMacros.ADMINIBAR);
            this.buildControls = buildControls.bind(this);
            this._super(controller);
            this.display = vdb.html5.player.Display.getInstance();
            this.timeInterval = 0;
            this.player.addEventListener(vdb.constants.PlayerEvent.VIDEO_PLAY, videoPlays.bind(this));
            this.player.addEventListener(vdb.constants.PlayerEvent.VIDEO_PAUSE, videoStoped.bind(this));
            this.player.addEventListener(vdb.constants.PlayerEvent.VIDEO_END, videoEnded.bind(this));
            this.player.addEventListener(vdb.constants.PlayerEvent.AD_START, adStarted.bind(this));
            this.player.addEventListener(vdb.constants.PlayerEvent.AD_END, onAdEnd.bind(this));
            this.player.addEventListener(vdb.constants.PlayerEvent.AD_TIMEUPDATE, onAdTimeUpdate.bind(this));
            this.createTimelinePreview(controller);
            this.skinTimeout = 1E3;
        }, movePlayhead: movePlayhead, setSocialNetworks: function setSocialNetworks(socialNetworks, showOnAd, likePosition, shareButtonPosition) {
            if (!this._shareButton && socialNetworks.length > 0) {
                this._shareButton = new vdb.skins.shareScreen.ShareScreenButton({ socialNetworks: socialNetworks, shownOnAd: showOnAd, skin: this, shareButtonPosition: shareButtonPosition, shareScreenViewTitle: "SHARE", shareButtonContainer: this.shareButtonContainer, closeButtonContainer: this.closeButtonContainer }, this.controller);
            }
        }, createShareScreenButtons: function createShareScreenButtons() {
            var buttonText = utl.mobileOs() || this.player.container.clientWidth < 420 ? '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.889 595.281"><path d="M620.281,389.884c-25.49,0-48.813,9.265-66.799,24.604L333.591,307.393c0.266-3.016,0.409-6.066,0.409-9.15 s-0.144-6.134-0.409-9.149L553.484,182c17.984,15.338,41.308,24.603,66.798,24.603c56.886,0,103-46.114,103-103 c0-56.885-46.114-103-103-103c-55.505,0-100.747,43.905-102.911,98.879L286.905,211.726c-16.102-10.425-35.294-16.482-55.904-16.482 c-56.885,0-103,46.115-103,103c0,56.886,46.115,103,103,103c20.609,0,39.802-6.057,55.903-16.481L517.37,497.005 c2.165,54.975,47.406,98.879,102.911,98.879c56.886,0,103-46.114,103-103C723.281,435.999,677.167,389.884,620.281,389.884z"/></svg> ' : '<svg class="player-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 30"><path d="M11.201,12.991c-1.155,0-2.093,0.9-2.093,2.008c0,1.11,0.938,2.009,2.093,2.009c0.553,0,1.037-0.208,1.423-0.529l4.286,3.102c-0.017,0.08-0.017,0.161-0.017,0.241c0,0.884,0.753,1.606,1.674,1.606c0.921,0,1.674-0.722,1.674-1.606c0-0.885-0.753-1.608-1.674-1.608c-0.402,0-0.786,0.146-1.072,0.37l-4.285-3.086c0.051-0.16,0.067-0.32,0.067-0.498c0-0.176-0.033-0.337-0.067-0.498l4.269-3.085c0.284,0.241,0.67,0.37,1.071,0.37c0.921,0,1.674-0.724,1.674-1.607c0-0.884-0.753-1.607-1.674-1.607c-0.92,0-1.674,0.723-1.674,1.607c0,0.08,0.017,0.161,0.017,0.241l-4.285,3.101C12.239,13.184,11.737,12.991,11.201,12.991"/><path d="M30.722,16.81c0.561,0.616,1.415,1.078,2.312,1.078c0.841,0,1.429-0.519,1.429-1.232c0-1.261-1.82-1.415-3.138-2.186c-0.771-0.448-1.387-1.12-1.387-2.227c0-1.751,1.611-2.76,3.236-2.76c0.994,0,1.919,0.238,2.843,0.925l-0.98,1.4c-0.392-0.364-1.05-0.645-1.694-0.645c-0.715,0-1.513,0.309-1.513,1.064c0,1.583,4.524,1.093,4.524,4.398c0,1.737-1.556,2.941-3.32,2.941c-1.316,0-2.535-0.546-3.544-1.471L30.722,16.81z"/><path d="M44.753,15.017h-4.902v4.412H37.96V9.623h1.891v3.712h4.902V9.623h1.892v9.806h-1.892V15.017z"/><path d="M47.759,19.429l4.202-9.806h1.331l4.202,9.806H55.52l-0.925-2.171h-3.937l-0.924,2.171H47.759z M51.373,15.576h2.493 l-1.246-2.899L51.373,15.576z"/><path d="M60.501,15.086v4.343H58.61V9.623h3.572c1.009,0,1.652,0.28,2.144,0.729c0.532,0.505,0.868,1.219,0.868,2.003 c0,0.785-0.336,1.499-0.868,2.004c-0.267,0.252-0.589,0.448-0.981,0.574l3.671,4.496h-2.34l-3.487-4.343H60.501z M62.07,13.405 c0.547,0,0.784-0.112,0.953-0.294c0.168-0.183,0.279-0.462,0.279-0.742c0-0.294-0.111-0.574-0.279-0.757 c-0.169-0.182-0.406-0.308-0.953-0.308h-1.568v2.101H62.07z"/><path d="M69.881,11.305v2.03h3.012v1.682h-3.012v2.731h4.132v1.681H67.99V9.623h5.884v1.682H69.881z"/></svg> ';
            this.shareScreenButtonsOuterContainer = utl.createElement("div", { "class": "share-screen-buttons-outer-container" }, this.skin.upperIconsContainer);
            this.shareButtonContainer = utl.createElement("div", { "class": "share-screen-buttons-container bringToFront" }, this.shareScreenButtonsOuterContainer);
            this.closeButtonContainer = utl.createElement("div", { "class": "close-button-container" }, this.shareScreenButtonsOuterContainer);
            this.shareButtonInnerContainer = utl.createElement("div", { "class": "share-buttons-inner-container" }, this.shareButtonContainer);
            this.shareButton = utl.createElement("div", { "class": "share-screen-button fadeIn" }, this.shareButtonInnerContainer, buttonText);
            this.closeButtonInnerContainer = utl.createElement("div", { "class": "share-buttons-inner-container" }, this.closeButtonContainer);
            this.closeButton = utl.createElement("div", { "class": "close-button fadeOut" }, this.closeButtonInnerContainer, '<svg class="player-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.335 21"><polygon fill-rule="evenodd" clip-rule="evenodd" points="20.335,1.704 18.679,0 10.185,8.811 1.656,0 0,1.704 8.531,10.516 0,19.296 1.655,21 10.167,12.207 18.68,21 20.335,19.296 11.82,10.5"/></svg> ');
        } };
}());

