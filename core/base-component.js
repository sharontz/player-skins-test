// need to extract all of the components' repeating methods to base component

export class BaseComponent extends HTMLElement {

    constructor() {
        super();
        if (!this.shadowRoot)
            this.initShadowDom();
    }

    initShadowDom() {
        this.attachShadow({mode: 'open'});
    }

    _updateRendering() {
        this.shadowRoot.innerHTML = this.template;

    }

    static registerComponent(name, component) {
        window.customElements.define(name, component);
    }
}

export default BaseComponent