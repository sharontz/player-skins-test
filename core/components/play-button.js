class PlayButton extends HTMLElement {

    constructor() {
        super();
        this.isPlaying = false;
    }

    connectedCallback() {
        this._updateRendering();
        if (!this.shadowRoot)
            this.initShadowDom();
    }

    initShadowDom() {
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = this.template;
    }

    _updateRendering() {
        this.innerHTML = this.template;
    }

    get template() {
        return `
        <div class="play-button-state">
        ${this.isPlaying ? pauseIcon : playIcon}
        </div>
        <style>
            ${this.style}
        </style>
        `;
    }

    get style(){
        return `:host{width: auto;
        height: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-right:10px;}
        
        :host svg {height:100%;}`;
    }
}

window.customElements.define('play-button', PlayButton);

const playIcon = ` <div class="play-icon can-animate">
 <svg width="50" class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 10"><path d="M0,9.5C0,9,0,0.9,0,0.6c0-0.4,0.3-0.7,0.7-0.5c0.3,0.2,5.6,4.1,6.1,4.4c0.3,0.2,0.3,0.7,0,1 C6.4,5.7,1.1,9.7,0.7,9.9C0.4,10.2,0,9.9,0,9.5z"></path></svg>
 </div>`;

const pauseIcon = `
<div class="pause-icon can-animate">
<svg width="50" class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 10"><rect width="3" height="10"></rect><rect x="6" width="3" height="10"></rect></svg>
</div>`;

