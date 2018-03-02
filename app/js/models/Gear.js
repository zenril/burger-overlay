let gearID = 0;

export default class Gear
{   
    constructor(obj) 
    {
        this.id = ++gearID;
        this.word = obj.word;
        this.verb = obj.verb;
        this.key = obj.key;
        this.img = null;
        this.reversed = Math.random() > 0.49;
    }
}

export default Gear;