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

    static int(input){
        if(input.toString){
            input = input.toString();
        }

        if(input){
            input = input.replace(/[^0-9]/g, "");
        } else  {
            input = "0";
        }

        input = Number(input);

        if(isNaN(input)){
            input = 0;
        }

        return input;
    }
}

export default Commands;