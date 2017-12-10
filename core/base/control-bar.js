class ControlBar extends HTMLElement {

    constructor() {
        super();
        if (!this.shadowRoot)
            this.initShadowDom();
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    }

    initShadowDom() {
        let shadowRoot = this.attachShadow({mode: 'open'});
    }

    static get observedAttributes() {
        return ['location', 'justify-content'];
    }

    get location() {
        return this.getAttribute('location');
    }

    set location(val) {
        this.setAttribute('location', val);
        if (val === 'bottom') {
            this.shadowRoot.appendChild(this.bottomStyling.cloneNode(true));
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'location' && this.location !== oldValue) {
            this.location = newValue;
        }
        if (name === 'justify-content') {
            this.style['justifyContent'] = newValue;
        }
    }

    get bottomStyling() {
        let bottomStyling = document.createElement('bottomStyling');
        bottomStyling.innerHTML = `
<style>
 :host {
       position:absolute;
       bottom:0;
    }
</style>
  `
        return bottomStyling;
    }

    get template() {
        let template = document.createElement('template');
        template.innerHTML = `
             <slot></slot>
             <style>
            ${this.componentStyle}
            </style>
            `
        return template;
    }

    get componentStyle(){
        return `:host {
        width: 100%;
        height: 5%;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-evenly;
        background-color:lightgray;
        /*display: grid;*/
        /*grid: repeat(1, 100%) / auto-flow auto;*/
    }
    
   :host > *:not(style){
        width: auto;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    :host > * svg{
        width: 100%;
    }`
    }
}

window.customElements.define('control-bar', ControlBar);

