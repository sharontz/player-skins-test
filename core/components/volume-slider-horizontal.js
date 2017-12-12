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
import {BaseComponent} from "../base-component";

const mutedIcon = ` <g class="muted-icon"><path d="M15,7.1h1v1h-1V7.1z"></path><path d="M14,6.1h1v1h-1V6.1z"></path><path d="M13,5.1h1v1h-1V5.1z"></path><path d="M14,8.1h1v1h-1V8.1z"></path><path d="M13,9.1h1v1h-1V9.1z"></path><path d="M16,6.1h1v1h-1V6.1z"></path><path d="M17,5.1h1v1h-1V5.1z"></path><path d="M16,8.1h1v1h-1V8.1z"></path><path d="M17,9.1h1v1h-1V9.1z"></path></g>`
const fullVolumeIcon = ` <path class="full-volume-icon" d="M16.9,0.1l-1.1,1.5c1.6,1.5,2.5,3.7,2.5,6c0,2.4-1,4.6-2.6,6.1l1.1,1.4c2-2,3.1-4.6,3.1-7.5 C20,4.7,18.8,2,16.9,0.1z"></path>`;
const halfVolumeIcon = ` <path class="half-volume-icon" d="M13.8,3.1L13,4.8c0.8,0.7,1.3,1.7,1.3,2.8c0,1.2-0.3,2.3-1.2,3l0.8,1.4c1.2-1.1,2-2.7,2-4.4 C15.9,5.8,15.1,4.2,13.8,3.1z"></path>`;

export class VolumeSliderHorizontal extends BaseComponent {
    constructor() {
        super();
    }

    connectedCallback() {
        if (this.player)
            this.attachPlayerEvents();
        this.onVolumeChange();
        this._updateRendering();
        this.attachSkinEvents();
    }


    attachPlayerEvents() {
        this.player.addEventListener(vdb.constants.PlayerEvent.AD_VOLUME_CHANGED, this.onVolumeChange.bind(this));
        this.player.addEventListener(vdb.constants.PlayerEvent.VIDEO_VOLUME_CHANGED, this.onVolumeChange.bind(this));
    };

    attachSkinEvents() {
        this.volumeButton = this.shadowRoot.getElementById('volume-button');
        this.volumeSlider = this.shadowRoot.getElementById('volume-slider');
        this.volumeButton.addEventListener("click", this.onVolumeButtonClick.bind(this));
        // if (isDesktop) {
            this.volumeSlider.addEventListener("click", this.onVolumeSliderClick.bind(this));
            this.volumeSlider.addEventListener("mousemove", this.onVolumeSliderMouseMoveOrOut.bind(this));
            this.volumeSlider.addEventListener("mouseleave", this.onVolumeSliderMouseMoveOrOut.bind(this));
            this.volumeSlider.addEventListener("mousedown", this.onVolumeSliderMouseDown.bind(this));
        // }
    };

    onVolumeChange() {
        let volume = this.player.getPlayerInfo().volume;
        switch (volume) {
            case 0: {
                this.volumeIcon = mutedIcon;
            }
            break;
            case 1:{
                this.volumeIcon = fullVolumeIcon + halfVolumeIcon;
            }
            break;
            default:{
                this.volumeIcon = halfVolumeIcon;
            }
        }
        this._updateRendering();
    };

    get template() {
        return `<div class="volume-cell control-button-cell">
        <div class="volume-button skin-control full-volume" id="volume-button">
        <svg width="30" class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15.1">
        <path d="M9.1,0l-5,4.3H0.8C0.4,4.3,0,4.6,0,5.1v5.2c0,0.5,0.4,0.9,0.8,0.9h3.7L9.1,15c0.3,0,0.8-0.1,1.1-0.3V0.3 C9.8,0.1,9.4,0,9.1,0z"></path>
        ${this.volumeIcon}
        </svg> 
        </div>
        <div class="volume-slider-container">
        <div class="volume-slider" id="volume-slider">
        <div class="volume-background">
        </div>
        <div class="volume-level" style="width: 100%;">
        <div class="volume-slider-thumb skin-control">
        </div>
        </div>
        </div>
        </div>
        </div>
        <style>${this.componentStyle}</style>`
    }

    get componentStyle() {
        return `:host{width: auto;
        height: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        padding-left:10px;
        flex: ${this.hasAttribute('flex') ? this.getAttribute('flex') : '1'};
        }
        
        :host svg {height:100%;}
        
        .volume-cell{
            height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;}
        
.volume-slider-thumb {
    width: 10px;
    height: 10px;
    border-radius: 100%;
    position: absolute;
    background-color: #ffffff;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, .46);
}

.video-playhead {
    display: block;
    top: -4px;
    z-index: 3;
    margin-left: 0;
}

.volume-slider-tooltip {
    width: 40px;
    height: 17px;
    right: 31px;
    margin-bottom: 32px;
    display: block !important;
    position: absolute;
    opacity: 0;
    background: rgba(34, 34, 34, .5);
    border-radius: 2px;
    -moz-transition: opacity .5s;
    -webkit-transition: opacity .5s;
    transition: opacity .5s;
    pointer-events: none;
    z-index: 5;
}

.volume-slider-tooltip:after {
    border-left: 4px solid rgba(34, 34, 34, .5);
    border-right: 4px solid transparent;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    bottom: 4px;
    right: -12px;
    -moz-transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    content: "";
    position: absolute;
    width: 0;
    height: 0;
}

.volume-slider-tooltip-text {
    padding: 3px 5px;
    position: relative;
    text-align: center;
    font: 11px Arial;
    color: #fff;
}

.volume-slider-tooltip.active {
    opacity: 1;
}


.volume-slider-container {
    height: 100%;
    width: 40px;
    left: 22px;
    z-index: 6;
    opacity: 0;
    -moz-transition: opacity .3s .2s ease-in-out;
    -webkit-transition: opacity .3s .2s ease-in-out;
    transition: opacity .3s .2s ease-in-out;
    pointer-events: none;
    display: flex;
     align-items: center;
    justify-content: flex-end;
    padding-left: 10px;
}

.volume-cell:hover .volume-slider-container,
.volume-slider-container.active {
    -moz-transition: opacity .2s ease-in-out;
    -webkit-transition: opacity .2s ease-in-out;
    transition: opacity .2s ease-in-out;
    opacity: 1;
    pointer-events: auto;
}


.volume-slider {
    border: 4px solid rgba(0, 0, 0, 0);
    width: 40px;
    height: 2px;
    position: relative;
    cursor: pointer;
}

.volume-background {
    width: 40px;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.2);
}

.volume-level {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: #customColor;
}

.volume-slider-thumb {
    right: -5px;
    top: -4px;
    z-index: 6;
}

        `;
    }

    onVolumeButtonClick() {
        this.player.mute();
        // this.dispatchUserInteractionEvent.call(this, this.controller.isMuted() ? UserInteraction.MUTE : UserInteraction.UNMUTE);
    };

    onVolumeSliderClick() {
        this.setVolume.call(this);
        // this.dispatchUserInteractionEvent.call(this, UserInteraction.VOLUME);
    };

    onVolumeSliderMouseMoveOrOut(e) {
        this.pageXPos = e.pageX;
        if (this.isVolumeSliderActive) {
            this.setVolume.call(this);
        }
    };

    onVolumeSliderMouseDown(e) {
        document.addEventListener("mouseup", this.onDocumentMouseUp.bind(this));
        this.isVolumeSliderActive = true;
        e.stopPropagation();
    };

    onDocumentMouseUp() {
        this.isVolumeSliderActive = false;
        document.removeEventListener("mouseup",this.onDocumentMouseUp.bind(this));
    };

    setVolume() {
        // let volumeSliderOffset = Math.round(common.getOffset(this.volumeSlider).left) + this.volumeSliderLeftBorderWidth;
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
}