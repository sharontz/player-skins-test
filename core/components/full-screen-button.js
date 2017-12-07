
class FullScreenButton extends HTMLElement {

    get template() {
        return `
<div class="fullscreen-cell control-button-cell"><div class="fullscreen-button"><div class="enter-fullscreen-icon"><svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 16"><path class="st0" d="M3,3h14v10H3V3z M5,11.1H15V4.9H5V11.1z"></path><polygon class="st0" points="19,0 15,0 15,1 19,1 19,5 20,5 20,0.9 20,0 "></polygon><polygon class="st0" points="19,11 19,15 15,15 15,16 19,16 20,16 20,15.1 20,11 "></polygon><polygon class="st0" points="5,0 0.9,0 0,0 0,0.9 0,5 1,5 1,1 5,1 "></polygon><polygon class="st0" points="1,15 1,11 0,11 0,16 0.9,16 5,16 5,15 "></polygon></svg> </div><div class="exit-fullscreen-icon"><svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.6 21.8"><path d="M4.6,0H2.3v2.3H0v2.3h4.6V0z M4.6,17.2H23V4.6H4.6V17.2z M8.1,8h11.4v5.8H8.1V8z M25.3,2.3V0H23v4.6h4.6V2.3 H25.3z M23,21.8h2.3v-2.3h2.3v-2.3H23V21.8z M0,19.5h2.3v2.3h2.3v-4.6H0V19.5z"></path></svg></div></div></div>
    `;
    }

    connectedCallback() {
        this._updateRendering();
        this.initShadowDom();
    }

    initShadowDom() {
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = this.template;
    }

    _updateRendering() {
        this.innerHTML = this.template;
    }


}

window.customElements.define('full-screen-button', FullScreenButton);

