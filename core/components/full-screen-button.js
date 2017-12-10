class FullScreenButton extends HTMLElement {

    constructor() {
        super();
        this.attachListeners();
    }

    attachListeners() {
        this.addEventListener('click', e => {
            if (this.hasAttribute('full-screen')) {
                this.removeAttribute('full-screen');

            }
            else {
                this.setAttribute('full-screen', '');
                if (this.parentElement.player.adapter.enterFullscreen) {
                    this.parentElement.player.adapter.enterFullscreen();
                }
            }
        })
    }

    connectedCallback() {
        if (!this.shadowRoot)
            this.initShadowDom();
    }

    initShadowDom() {
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = this.template;
    }

    _updateRendering() {
        this.shadowRoot.innerHTML = this.template;
    }

    static get observedAttributes() {
        return ['full-screen'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'full-screen') {
            if (this.hasAttribute("full-screen"))
                this.isFullScreen = true;
            else this.isFullScreen = false;
            this._updateRendering();
        }
    }

    get template() {
        return `
        <div class="fullscreen-cell control-button-cell">
        <div class="fullscreen-button">
        ${this.isFullScreen ? exitFullScreenSvg : enterFullScreenSvg}
        </div>
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
        justify-content: center;
        padding-right:10px;
        flex: ${this.hasAttribute('flex') ? this.getAttribute('flex') : '1'};
        }
        :host svg {height:100%;}
        `
    }
}

window.customElements.define('full-screen-button', FullScreenButton);


const enterFullScreenSvg = `<div class="enter-fullscreen-icon"><svg width="40" class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 16"><path class="st0" d="M3,3h14v10H3V3z M5,11.1H15V4.9H5V11.1z"></path><polygon class="st0" points="19,0 15,0 15,1 19,1 19,5 20,5 20,0.9 20,0 "></polygon><polygon class="st0" points="19,11 19,15 15,15 15,16 19,16 20,16 20,15.1 20,11 "></polygon><polygon class="st0" points="5,0 0.9,0 0,0 0,0.9 0,5 1,5 1,1 5,1 "></polygon><polygon class="st0" points="1,15 1,11 0,11 0,16 0.9,16 5,16 5,15 "></polygon></svg> 
</div>`;

const exitFullScreenSvg = `<div class="exit-fullscreen-icon"><svg width="40" class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.6 21.8"><path d="M4.6,0H2.3v2.3H0v2.3h4.6V0z M4.6,17.2H23V4.6H4.6V17.2z M8.1,8h11.4v5.8H8.1V8z M25.3,2.3V0H23v4.6h4.6V2.3 H25.3z M23,21.8h2.3v-2.3h2.3v-2.3H23V21.8z M0,19.5h2.3v2.3h2.3v-4.6H0V19.5z"></path></svg>
</div>`;