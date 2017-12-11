import BaseComponent from "../base-component";

export class ControlBar extends BaseComponent {

    constructor() {
        super();
    }


    get tagName() {
        return 'control-bar';
    }

    static get observedAttributes() {
        return ['location', 'justify-content'];
    }

    get location() {
        return this.getAttribute('location');
    }

    set location(val) {
        this.setAttribute('location', val);
        this._updateRendering();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'location' && this.location !== oldValue) {
            this.location = newValue;
        }
        if (name === 'justify-content') {
            this.style['justifyContent'] = newValue;
        }
    }

    get template() {
        return `
             <slot></slot>
             <style>
            ${this.componentStyle}
            </style>
            `;
    }

    get componentStyle() {
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
        position:absolute;
        ${this.dynamicPosition}
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

    get dynamicPosition() {
        switch (this.location) {
            case 'bottom':
                return ` 
                 bottom:0;`;
                break;
            case 'top':
                return `top:0;`
                break;
            default:
                return ``;
        }

    }
}

