let burgerID = 0;

export default class Burger
{   

    constructor() 
    {
        this.ingredients = [];
        this.name = "";
        this.bunner = "";
        this.namer = "";
        this.id = ++burgerID;
        this.type_map = {};
        this.width = 0;
        this.biggestRatio = 0;
        this.display = true;
    } 

    add(ingredient) {

        if((ingredient.index == 0 && ingredient.key == 'bun') ||
             ( ingredient.index > 0 )){
            this.ingredients.unshift(ingredient);
            if(!this.type_map[ingredient.key]){
                this.type_map[ingredient.key] = 0;
            }

            if(ingredient.key != 'bun'){
                ++this.type_map[ingredient.key];
            }

            if(ingredient.ratio > this.biggestRatio ){
                this.biggestRatio = ingredient.ratio;
            }

            return true;
        }

        return false;
    }

    undo(ingredient) {

        ingredients.splice(0, 1);
        
    }

    isFinished (){
        if(!this.ingredients.length || this.ingredients.length == 1){
            return false;
        }

        if(this.ingredients[0].key == 'bun' && this.ingredients[0].index > 0){
            return true;
        }

        return false;
    }

    getWidth (base){
        var height = base * this.biggestRatio;
        var nwidth = height * this.biggestRatio;

        return nwidth;
    }
}