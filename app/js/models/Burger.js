export default class Burger
{   

    constructor() 
    {
        this.ingredients = [];
        this.name = "";
        this.bunner = "";
        this.namer = "";
    }

    add(ingredient) {
        if((ingredient.index == 0 && ingredient.key == 'bun') ||
             ( ingredient.index > 0 )){
            this.ingredients.unshift(ingredient);
        }
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
}