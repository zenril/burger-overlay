import path from 'path';

class Sounds
{   
    constructor(index, obj) 
    {
        this.context = require.context("../../files", true, /^\.\/.*\.ogg$/);
        this.volume = 0;
        //this.setVolume(0);
        this.lib = {
            nom : new Audio(this.context("./nom.ogg")),
            bang : new Audio(this.context("./bang.ogg"))
        }
    }

    setVolume(v){
        v = Sounds.normaliseVolume(v);
        if(v === false) return;
        this.volume = v;
    }
    
    static normaliseVolume(v){
        if(isNaN(v)) return false;
        if(!isNaN(v) && v > 1) v = (v / 100);
        return Math.min(v, 1);
    }

    play(sound){
        let volume = this.volume;

        // v = Sounds.normaliseVolume(v);
        // if(v !== false){
        //     volume = v;
        // }

        // if(volume === 0){
        //     return;
        // }

        if(this.lib[sound]){
            this.lib[sound].volume=this.volume;
            this.lib[sound].play();
        }
    }
}



const singleton = new Sounds();
window.sss = singleton;
export default singleton;