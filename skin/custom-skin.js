import {BaseSkin} from "./base-skin"
import {ControlBar} from "../core/base/control-bar";
import {PlayButton} from "../core/components/play-button";
import {FullScreenButton} from "../core/components/full-screen-button";
import {HDButton} from "../core/components/hd-button";

class CustomSkin extends BaseSkin {
    constructor(template, player) {
        BaseSkin.loadDeps(deps);
        super(template, player);
    }
}

const deps = [
    {tagName: 'control-bar', func: ControlBar},
    {tagName: 'play-button', func: PlayButton},
    {tagName: 'full-screen-button', func: FullScreenButton},
    {tagName: 'hd-button', func: HDButton}];

const html = `
    <control-bar location="bottom" justify-content="flex-end" style="height:40px;">
        <play-button flex="15"></play-button>
        <hd-button flex="1"></hd-button>
        <full-screen-button flex="1"></full-screen-button>
    </control-bar>
`

function loadSkin(player) {
    let mySkin = new CustomSkin(html, player);
    mySkin.render();
}

window.loadSkin = loadSkin;

loadSkin();