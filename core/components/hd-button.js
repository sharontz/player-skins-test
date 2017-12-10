class HDButton extends HTMLElement {

    get template() {
        return `<div class="hd-button-cell" style=""><div class="hd-button not-hd-video"><svg width="40" class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.4 9.8"><path d="M6.3,9.8V6.1H2.8v3.7H0V0h2.8v3.7h3.5V0h2.7v9.8H6.3z"></path><path d="M15.2,0c3.5,0,5.1,2.1,5.1,4.8s-1.6,5-5.1,5H11V0H15.2z M13.8,7.5h1.5c1.8,0,2.4-1.3,2.4-2.7 s-0.7-2.5-2.4-2.5h-1.5V7.5z"></path></svg> </div></div>
                 <style>
                    ${this.componentStyle}
                 </style>`
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

    get componentStyle(){
        return  `:host{width: auto;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center; 
        margin-right:10px;
        flex: ${this.hasAttribute('flex')?this.getAttribute('flex'):'1'};
        } :host svg { height:100%;}`
    }
}

window.customElements.define('hd-button', HDButton);
