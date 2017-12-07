vdb.skins.video_time_preview = {};
vdb.skins.video_time_preview.ThumbnailSize = vdb.core.Class.extend(function() {
    return{getSize:function() {
    }, getClass:function() {
    }};
}());
(function(def) {
    def.ThumbnailSize.getInstance = function(playerSize) {
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
vdb.skins.video_time_preview.LargeThumbnailSize = vdb.skins.video_time_preview.ThumbnailSize.extend(function() {
    return{getSize:function() {
        return 138;
    }, getClass:function() {
        return "large";
    }, getBottomOffset:function() {
        return 10;
    }, getTimeOffset:function() {
        return 10;
    }};
}());
(function(def) {
    def.LARGE = new def.LargeThumbnailSize;
})(vdb.skins.video_time_preview);
vdb.skins.video_time_preview.MediumThumbnailSize = vdb.skins.video_time_preview.ThumbnailSize.extend(function() {
    return{getSize:function() {
        return 116;
    }, getClass:function() {
        return "medium";
    }, getBottomOffset:function() {
        return 5;
    }, getTimeOffset:function() {
        return 10;
    }};
}());
(function(def) {
    def.MEDIUM = new def.MediumThumbnailSize;
})(vdb.skins.video_time_preview);
vdb.skins.video_time_preview.SmallThumbnailSize = vdb.skins.video_time_preview.ThumbnailSize.extend(function() {
    return{getSize:function() {
        return 96;
    }, getClass:function() {
        return "small";
    }, getBottomOffset:function() {
        return 5;
    }, getTimeOffset:function() {
        return 5;
    }};
}());
(function(def) {
    def.SMALL = new def.SmallThumbnailSize;
})(vdb.skins.video_time_preview);
vdb.skins.video_time_preview.VideoTimePreviewLoader = vdb.core.Class.extend(function() {
    var LOGGER = vdb.log.getLogger("VideoTimePreviewLoader");
    var utl = vdb.Utils;
    return{init:function(url, options) {
        LOGGER.debug("init");
        this.url = url + "?c=" + options.column + "&r=" + options.row + "&h=" + options.height;
        this._previewImages = utl.createElement("div", {"class":"time-line-preview"});
        var shape = vdb.ctx.getMacro(vdb.constants.PlayerMacros.TIMELINE_PREVIEW_SHAPE);
        if (shape && (shape === "rectangle" || shape === "square")) {
            vdb.Utils.addClass(this._previewImages, shape);
        }
        utl.createElement("div", {"class":"time-line-preview-helper"}, this._previewImages);
        utl.createElement("div", {"class":"time-line-preview-background"}, this._previewImages);
    }, getPreviewDiv:function() {
        return this._previewImages;
    }, loadImage:function() {
        var result = new vdb.Future;
        var myImage = new Image;
        myImage.onload = function() {
            this._previewImages.style.background = "url('" + myImage.src + "') no-repeat";
            result.resolve(myImage);
        }.bind(this);
        myImage.onerror = function(error) {
            result.reject(error);
        };
        myImage.src = this.url;
        return result.getPromise();
    }};
}());
vdb.skins.video_time_preview.VideoTimeThumbnail = vdb.core.Class.extend(function() {
    var DEFAULT_BORDER_WIDTH = 5;
    var LOGGER = vdb.log.getLogger("VideoTimePreviewThumbnail");
    var RECTANGLE_RATIO = .586;
    return{init:function(videoObj, options) {
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
            this._videoTimePreviewLoader = new vdb.skins.video_time_preview.VideoTimePreviewLoader(this._videoUrl, {column:options.column, row:options.row, height:height, width:width});
            this._previewImages = this._videoTimePreviewLoader.getPreviewDiv();
            this._imagePromise = this._videoTimePreviewLoader.loadImage();
        }
    }, showThumbnail:function(videoDuration, time, playerWidth, playerHeight, containerWidth, scrubPoint, videoPlayHead) {
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
        return this._imagePromise.then(function(image) {
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
            vdb.Utils.setStyle(this._previewImages, {"backgroundPositionX":xOffset + "px", "backgroundPositionY":yOffset + "px", "left":left + "px", "border":"solid " + this.borderSize + "px #222222"});
            vdb.Utils.addClass([this._previewImages, this._previewImages.firstChild], "showThumbnail");
            vdb.Utils.removeClass([this._previewImages, this._previewImages.firstChild], "hideThumbnail");
        }.bind(this));
    }, getThumbnail:function() {
        return this._previewImages;
    }, hideThumbnail:function() {
        this._hidden = true;
        vdb.Utils.removeClass([this._previewImages, this._previewImages.firstChild], "showThumbnail");
        vdb.Utils.addClass([this._previewImages, this._previewImages.firstChild], "hideThumbnail");
    }, isNotEnoughWidth:function() {
        return this._isNotEnoughtWidth;
    }};
}());
vdb.skins.video_time_preview.VideoTimePreviewManager = vdb.core.Class.extend(function() {
    var VIDEO_TIME_LIMIT = 600;
    var MINIMAL_SIZE = 250;
    var DEFAULT_BORDER_WIDTH = 5;
    var PlayerEvent = vdb.constants.PlayerEvent;
    var createPreview = function() {
        var borderWidth = vdb.ctx.getMacro(vdb.constants.PlayerMacros.TIMELINE_PREVIEW_BORDER);
        this.borderSize = borderWidth ? parseInt(borderWidth) : DEFAULT_BORDER_WIDTH;
        var currentSize = this._player.getSize();
        var minPlayerSize = Math.min(currentSize.width, currentSize.height);
        var currentVideo = this._controller.getCurrentVideo();
        var currentThumbnailSize = vdb.skins.video_time_preview.ThumbnailSize.getInstance(currentSize);
        var ratio = currentSize.height > currentSize.width ? Math.round(currentSize.height / currentSize.width) : undefined;
        var options = {column:10, row:10, thumbnailSize:currentThumbnailSize, ratio:ratio};
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
    var applyThumbnailSize = function() {
        var className = this._thumbnailSize.getClass();
        var shape = vdb.ctx.getMacro(vdb.constants.PlayerMacros.TIMELINE_PREVIEW_SHAPE);
        vdb.Utils.addClass(this._thumbnailDiv, className);
        if (shape && (shape === "rectangle" || shape === "square")) {
            vdb.Utils.addClass(this._thumbnailDiv, shape);
        }
    };
    var removePreview = function() {
        if (this._thumbnailDiv && this._thumbnailDiv.parentNode) {
            returnProgressTimeDivBack.call(this);
            this._thumbnailDiv.parentNode.removeChild(this._thumbnailDiv);
        }
    };
    var setPreviewDivPosition = function() {
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
    var appendProgressTimeDiv = function() {
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
    var returnProgressTimeDivBack = function() {
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
    var isPlayerTooSmall = function() {
        var currentSize = this._player.getSize();
        var minPlayerSize = Math.min(currentSize.width, currentSize.height);
        return minPlayerSize <= MINIMAL_SIZE;
    };
    var onMouseMove = function(e) {
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
        this._videoTimeThumbnail.showThumbnail(videoDuration, scrubTime, this._playerSize.width, this._playerSize.height, this._container.offsetWidth, scrubPoint, this._videoPlayHead).then(function() {
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
    var addPreviewEventListener = function() {
        this._thumbnailDiv.removeEventListener("mouseover", previewMouseOver.bind(this));
        this._thumbnailDiv.removeEventListener("mouseout", hidePreviewDeferred.bind(this));
        this._thumbnailDiv.addEventListener("mouseover", previewMouseOver.bind(this));
        this._thumbnailDiv.addEventListener("mouseout", hidePreviewDeferred.bind(this));
    };
    var previewMouseOver = function() {
        var containerWidth = parseInt(getComputedStyle(this._thumbnailDiv).width);
        this._videoPlayhead.style.left = parseInt(this._thumbnailDiv.style.left) + containerWidth / 2 + "px";
    };
    var assignEvents = function() {
        this._mouseMoveHandler = onMouseMove.bind(this);
        this._hidePreviewHandler = hidePreview.bind(this);
        this._hidePreviewDeferred = hidePreviewDeferred.bind(this);
        this._enterFullScreenHandler = function() {
            this._fullscreen = true;
            vdb.Utils.removeClass(this._videoPlayHead, "video-playhead-preview");
            vdb.Utils.removeClass(this._progressTimeDiv, "fade");
        }.bind(this);
        this._adPlayHadnler = function() {
            this._thumbnailDiv.className = "time-line-preview-is-ad";
        }.bind(this);
        this._exitFullScreenHandler = function() {
            removePreview.call(this);
            returnProgressTimeDivBack.call(this);
            this._fullscreen = false;
            vdb.Utils.removeClass(this._videoPlayHead, "video-playhead-preview");
            vdb.Utils.removeClass(this._progressTimeDiv, "fade");
        }.bind(this);
        this._videoPlayHandler = function() {
            this._thumbnailDiv.className = "time-line-preview";
        }.bind(this);
        this._videoSelectedHandler = function() {
            this._isVideoPlaying = false;
        }.bind(this);
        bindEvents.call(this);
    };
    var hidePreviewDeferred = function(event) {
        clearTimeout(this._hideTimeout);
        this._hideTimeout = setTimeout(hidePreview.bind(this, event), 200);
    };
    var hidePreview = function(event) {
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
    var bindEvents = function() {
        this._progressBar.parentNode.addEventListener("mousemove", this._mouseMoveHandler);
        this._progressBar.parentNode.addEventListener("mouseout", this._hidePreviewDeferred);
        this._player.addEventListener(PlayerEvent.ENTER_FULLSCREEN, this._enterFullScreenHandler);
        this._player.addEventListener(PlayerEvent.AD_PLAY, this._adPlayHadnler);
        this._player.addEventListener(PlayerEvent.EXIT_FULLSCREEN, this._exitFullScreenHandler);
        this._player.addEventListener(PlayerEvent.VIDEO_PLAY, this._videoPlayHandler);
        this._player.addEventListener(PlayerEvent.VIDEO_SELECTED, this._videoSelectedHandler);
        this._player.addEventListener(PlayerEvent.VIDEO_END, this._hidePreviewHandler);
    };
    var removeEvents = function() {
        this._progressBar.parentNode.removeEventListener("mousemove", this._mouseMoveHandler);
        this._progressBar.parentNode.removeEventListener("mouseout", this._hidePreviewDeferred);
        this._player.removeEventListener(PlayerEvent.ENTER_FULLSCREEN, this._enterFullScreenHandler);
        this._player.removeEventListener(PlayerEvent.AD_PLAY, this._adPlayHadnler);
        this._player.removeEventListener(PlayerEvent.EXIT_FULLSCREEN, this._exitFullScreenHandler);
        this._player.removeEventListener(PlayerEvent.VIDEO_PLAY, this._videoPlayHandler);
        this._player.removeEventListener(PlayerEvent.VIDEO_SELECTED, this._videoSelectedHandler);
        this._player.removeEventListener(PlayerEvent.VIDEO_END, this._hidePreviewHandler);
    };
    var onVideoStart = function() {
        this._isVideoPlaying = true;
        removeEvents.call(this);
        if (this._controller.getPlayerState()["videoLength"] <= VIDEO_TIME_LIMIT) {
            createPreview.call(this);
        } else {
            removePreview.call(this);
        }
    };
    return{init:function(controller, progressBar, container, videoplayhead, wrapper) {
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
    }};
}());