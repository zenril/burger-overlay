let entityID = 0;

export default class Entity
{   
    constructor() 
    {
        this.gear = {};
        this.name = "";
        this.namer = "";
        this.id = ++entityID;
    }

    add(item) {
        this.gear[item.type] = item;
        return false;
    }
}

export default Entity;