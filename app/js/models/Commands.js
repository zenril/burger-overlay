import path from 'path';

class Commands
{   
    constructor(index, obj) 
    {
    }

    static bool(input){
        if(!isNaN(input)){
            let i = parseInt(input);
            return !!i;
        }

        if(/on|yes|true/ig.test(input)){
            return true;
        }

        return false;
    }
}

export default Commands;