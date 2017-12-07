class BaseSkin {

    constructor(){
        this.videoContainer = vdb.getContext(Object.keys(vdb._getContexts())[0]).getPlayer().div;
    }

    addToMainContainer(el){
      this.videoContainer.appendChild(el);
    }

    addToContainer(container, el){
        this.videoContainer.getElementsByClassName(container)[0].appendChild(el);
    }

    setTemplate(template){
        this.template = template;
    }

    render(){
        [...this.template.children].forEach((child)=>{
            this.addToContainer('control-bar-wrapper', child)
        })
    }
}

let mySkin = new BaseSkin();

mySkin.controlBarWrapper = document.createElement("div");
mySkin.controlBarWrapper.classList.add("control-bar-wrapper");
mySkin.addToMainContainer(mySkin.controlBarWrapper);

mySkin.setTemplate(document.getElementsByClassName("custom-skin")[0]);