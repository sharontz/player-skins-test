import {BaseSkin} from "./skin-new"

class CustomSkin extends BaseSkin {
    constructor(template, player) {
        super(template,player);
    }
}

const html = `
    <control-bar location="bottom" justify-content="flex-end" style="height:40px;">
        <play-button flex="15"></play-button>
        <hd-button flex="1"></hd-button>
        <full-screen-button flex="1"></full-screen-button>
    </control-bar>
`

function loadSkin (player){
    let mySkin = new CustomSkin(html, player);
    mySkin.render();
}

window.loadSkin = loadSkin;

loadSkin();