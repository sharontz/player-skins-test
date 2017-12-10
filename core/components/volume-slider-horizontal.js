/*var VolumeSliderHorizontal = document.registerElement('volume-slider', {
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

/*
class VolumeSliderHorizontal extends HTMLElement {
    constructor(controller, parent, options, addEffect) {
        super();
        this.controller = controller;
        this.player = controller.getPlayer();
        this.parent = parent;
        this.options = options || {};
        this.addEffect = !!addEffect;
        this.buildControls.call(this);
        this.attachPlayerEvents.call(this);
        this.attachSkinEvents.call(this);
    }

    static get observedAttributes() {
        return ["country"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // name will always be "country" due to observedAttributes
        this._countryCode = newValue;
        this._updateRendering();
    }

    connectedCallback() {
        this._updateRendering();
    }

    _updateRendering() {
        // Left as an exercise for the reader. But, you'll probably want to
        // check this.ownerDocument.defaultView to see if we've been
        // inserted into a document with a browsing context, and avoid
        // doing any work if not.
    }

    buildControls() {
        this.volumeCell = utl.createElement("div", {"class": ["volume-cell", "control-button-cell"]}, this.parent);
        this.volumeButton = utl.createElement("div", {"class": ["volume-button", "skin-control"]}, this.volumeCell, this.options.buttonIcon);
        if (isDesktop) {
            this.volumeSliderContainer = utl.createElement("div", {"class": "volume-slider-container"}, this.volumeCell);
            this.volumeSlider = utl.createElement("div", {"class": "volume-slider"}, this.volumeSliderContainer);
            this.volumeBackground = utl.createElement("div", {"class": "volume-background"}, this.volumeSlider);
            this.volumeLevel = utl.createElement("div", {"class": "volume-level"}, this.volumeSlider);
            this.volumeSliderThumb = utl.createElement("div", {"class": ["volume-slider-thumb", "skin-control"]}, this.volumeLevel);
            if (this.addEffect) {
                this.volumeSliderEffect = utl.createElement("div", {"class": "volume-slider-effect"}, this.volumeCell);
                this.progressBarEffect = utl.createElement("div", {"class": "progress-bar-effect"}, this.volumeSliderEffect);
                this.bottomBorder = utl.createElement("div", {"class": "bottom-volume-border"}, this.volumeSliderEffect);
                this.rightBorder = utl.createElement("div", {"class": "right-volume-border"}, this.volumeSliderEffect);
                this.topBorder = utl.createElement("div", {"class": "top-volume-border"}, this.volumeSliderEffect);
                this.leftBorder = utl.createElement("div", {"class": "left-volume-border"}, this.volumeSliderEffect);
            }
        }
        this.onVolumeChange.call(this);
    };

    attachPlayerEvents() {
        this.player.addEventListener(PlayerEvent.AD_VOLUME_CHANGED, this.onVolumeChange.bind(this));
        this.player.addEventListener(PlayerEvent.VIDEO_VOLUME_CHANGED, this.onVolumeChange.bind(this));
    };

    attachSkinEvents() {
        this.volumeButton.addEventListener("click", this.onVolumeButtonClick.bind(this));
        if (isDesktop) {
            this.volumeSlider.addEventListener("click", this.onVolumeSliderClick.bind(this));
            this.volumeSlider.addEventListener("mousemove", this.onVolumeSliderMouseMoveOrOut.bind(this));
            this.volumeSlider.addEventListener("mouseleave", this.onVolumeSliderMouseMoveOrOut.bind(this));
            this.volumeSlider.addEventListener("mousedown", this.onVolumeSliderMouseDown.bind(this));
        }
    };

    dispatchUserInteractionEvent(interactionType) {
        this.player.dispatchEvent(PlayerEvent.USER_INTERACTION, {"interactionType": interactionType});
    };

    onVolumeChange() {
        volume;
        if (this.controller.isMuted()) {
            utl.replaceClass(this.volumeButton, ["full-volume", "half-volume"], "muted");
            utl.setStyle(this.volumeLevel, {width: 0});
        } else {
            volume = this.controller.getVolume();
            utl.replaceClass(this.volumeButton, ["full-volume", "half-volume", "muted"], (volume > .5 ? "full" : "half") + "-volume");
            utl.setStyle(this.volumeLevel, {width: volume * 100 + "%"});
        }
    };

    onVolumeButtonClick() {
        this.controller.toggleMute();
        this.dispatchUserInteractionEvent.call(this, this.controller.isMuted() ? UserInteraction.MUTE : UserInteraction.UNMUTE);
    };

    onVolumeSliderClick() {
        this.setVolume.call(this);
        this.dispatchUserInteractionEvent.call(this, UserInteraction.VOLUME);
    };

    onVolumeSliderMouseMoveOrOut(e) {
        this.pageXPos = e.pageX;
        if (this.isVolumeSliderActive) {
            this.setVolume.call(this);
        }
    };

    onVolumeSliderMouseDown(e) {
        ec.bindOnce(document, "mouseup", this.onDocumentMouseUp.bind(this));
        this.isVolumeSliderActive = true;
        e.stopPropagation();
    };

    onDocumentMouseUp() {
        this.isVolumeSliderActive = false;
    };

    setVolume() {
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
}*/


/*
vdb.skins.VolumeSliderHorizontal = vdb.EventBus.extend(function() {
     common = vdb.utils.Common;
     utl = vdb.Utils;
     isDesktop = !!utl.desktopOs();
     ec = vdb.events.EventContext;
     PlayerEvent = vdb.constants.PlayerEvent;
     UserInteraction = vdb.enums.UserInteraction;
     buildControls = function() {
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
     attachPlayerEvents = function() {
        this.player.addEventListener(PlayerEvent.AD_VOLUME_CHANGED, onVolumeChange.bind(this));
        this.player.addEventListener(PlayerEvent.VIDEO_VOLUME_CHANGED, onVolumeChange.bind(this));
    };
     attachSkinEvents = function() {
        this.volumeButton.addEventListener("click", onVolumeButtonClick.bind(this));
        if (isDesktop) {
            this.volumeSlider.addEventListener("click", onVolumeSliderClick.bind(this));
            this.volumeSlider.addEventListener("mousemove", onVolumeSliderMouseMoveOrOut.bind(this));
            this.volumeSlider.addEventListener("mouseleave", onVolumeSliderMouseMoveOrOut.bind(this));
            this.volumeSlider.addEventListener("mousedown", onVolumeSliderMouseDown.bind(this));
        }
    };
     dispatchUserInteractionEvent = function(interactionType) {
        this.player.dispatchEvent(PlayerEvent.USER_INTERACTION, {"interactionType":interactionType});
    };
     onVolumeChange = function() {
         volume;
        if (this.controller.isMuted()) {
            utl.replaceClass(this.volumeButton, ["full-volume", "half-volume"], "muted");
            utl.setStyle(this.volumeLevel, {width:0});
        } else {
            volume = this.controller.getVolume();
            utl.replaceClass(this.volumeButton, ["full-volume", "half-volume", "muted"], (volume > .5 ? "full" : "half") + "-volume");
            utl.setStyle(this.volumeLevel, {width:volume * 100 + "%"});
        }
    };
     onVolumeButtonClick = function() {
        this.controller.toggleMute();
        dispatchUserInteractionEvent.call(this, this.controller.isMuted() ? UserInteraction.MUTE : UserInteraction.UNMUTE);
    };
     onVolumeSliderClick = function() {
        setVolume.call(this);
        dispatchUserInteractionEvent.call(this, UserInteraction.VOLUME);
    };
     onVolumeSliderMouseMoveOrOut = function(e) {
        this.pageXPos = e.pageX;
        if (this.isVolumeSliderActive) {
            setVolume.call(this);
        }
    };
     onVolumeSliderMouseDown = function(e) {
        ec.bindOnce(document, "mouseup", onDocumentMouseUp.bind(this));
        this.isVolumeSliderActive = true;
        e.stopPropagation();
    };
     onDocumentMouseUp = function() {
        this.isVolumeSliderActive = false;
    };
     setVolume = function() {
         volumeSliderOffset = Math.round(common.getOffset(this.volumeSlider).left) + this.volumeSliderLeftBorderWidth;
         volumeSliderWidth = this.volumeSlider.clientWidth;
        if (this.pageXPos < volumeSliderOffset) {
            this.controller.setVolume(0);
        } else {
            if (this.pageXPos > volumeSliderOffset + volumeSliderWidth) {
                this.controller.setVolume(1);
            } else {
                 volumePoint = this.pageXPos - volumeSliderOffset;
                 volumePrct = volumePoint / volumeSliderWidth;
                this.controller.setVolume(volumePrct);
            }
        }
    };
    return{init:function(controller, parent, options, addEffect) {
        this.controller = controller;
        this.player = controller.getPlayer();
        this.parent = parent;
        this.options = options || {};
        this.addEffect = !!addEffect;
        buildControls.call(this);
        attachPlayerEvents.call(this);
        attachSkinEvents.call(this);
    }, setLeftBorderWidth:function() {
        if (isDesktop) {
            this.volumeSliderLeftBorderWidth = parseInt(getComputedStyle(this.volumeSlider).borderLeftWidth);
        }
    }};
}());*/
