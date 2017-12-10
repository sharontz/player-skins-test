class PlayButton extends HTMLElement {

    constructor() {
        super();
        this.isPlaying = false;
        this.attachListeners();
    }

    attachListeners() {
        this.addEventListener('click', this.clickHandler)
    }

    static get observedAttributes() {
        return ['playing'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'playing') {
            if (this.hasAttribute("playing"))
                this.isPlaying = true;
            else this.isPlaying = false;
            this._updateRendering();
        }
    }

    connectedCallback() {
        if (!this.shadowRoot)
            this.initShadowDom();
        if(this.parentElement.player.getPlayerInfo().playerStatus === 'playing')
            this.isPlaying = true;
    }

    initShadowDom() {
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = this.template;
    }

    _updateRendering() {
        this.shadowRoot.innerHTML = this.template;
    }

    clickHandler(e) {
        if (this.hasAttribute('playing')) {
            this.parentElement.player.pause();
            this.removeAttribute('playing');
        }
        else {
            this.parentElement.player.play();
            this.setAttribute('playing', '');
        }
    }

    get template() {
        return `
        <div class="play-button-state">
        ${this.isPlaying ? pauseIcon : playIcon}
        </div>
        <style>
            ${this.componentStyle}
        </style>
        `;
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
        
        :host svg {height:100%;}`;
    }
}

window.customElements.define('play-button', PlayButton);

const playIcon = ` <div class="play-icon can-animate">
 <svg width="25" class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 10"><path d="M0,9.5C0,9,0,0.9,0,0.6c0-0.4,0.3-0.7,0.7-0.5c0.3,0.2,5.6,4.1,6.1,4.4c0.3,0.2,0.3,0.7,0,1 C6.4,5.7,1.1,9.7,0.7,9.9C0.4,10.2,0,9.9,0,9.5z"></path></svg>
 </div>`;

const pauseIcon = `
<div class="pause-icon can-animate">
<svg width="25" class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 10"><rect width="3" height="10"></rect><rect x="6" width="3" height="10"></rect></svg>
</div>`;

