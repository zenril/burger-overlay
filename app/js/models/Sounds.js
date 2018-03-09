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
    
    // JS volume supports a range of 0.0 - 1.0.
    // This function normalises any value to within this range
    static normaliseVolume(v){
        if(isNaN(v)) return false;
        
        // divide the value by 100 to bring it into range
        v = (v / 100);
        
        // pass the value out, if its greater than 1.0 pass out 1.0
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
