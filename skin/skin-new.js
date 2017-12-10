import {BaseComponent} from "../core/base-component";

export class BaseSkin {
    constructor(template, player) {
        this.setTemplate(template);
        if (!player) {
            this.player = vdb.getContext(Object.keys(vdb._getContexts())[0]).getPlayer();
            this.videoContainer = this.player.div;
        }
        else {
            this.player = player;
            this.videoContainer = player.div;
        }
    }

    addToMainContainer(el) {
        el.player = this.player;
        this.videoContainer.appendChild(el);
    }

    addToContainer(container, el) {
        this.videoContainer.getElementsByClassName(container)[0].appendChild(el);
    }

    setTemplate(template) {
        if(typeof template === 'string'){
            this.template =  document.createElement('custom-skin');
            this.template.innerHTML = template;
        }
        else {
            this.template = template;
        }
    }

    render() {
        [...this.template.children].forEach((child) => {
            child.player = this.player;
            this.addToMainContainer(child);
        })
    }

    static loadDeps(deps){
        deps.forEach((dep)=>{
            BaseComponent.registerComponent(dep.tagName, dep.func);
        })
    }
}