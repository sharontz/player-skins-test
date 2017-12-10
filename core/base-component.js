// need to extract all of the components' repeating methods to base component

export class BaseComponent extends HTMLElement {

    constructor(){
        super();
    }

    connectedCallback() {
        if (!this.shadowRoot)
            this.initShadowDom();
        this._updateRendering();
    }

    initShadowDom() {
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = this.template;
    }

    _updateRendering() {
        this.shadowRoot.innerHTML = this.template;
    }

    static registerComponent(name, component){
        window.customElements.define(name, component);
    }
}

export default BaseComponent