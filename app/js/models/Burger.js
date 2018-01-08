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
    }

    add(ingredient) {
        if((ingredient.index == 0 && ingredient.key == 'bun') ||
             ( ingredient.index > 0 )){
            this.ingredients.unshift(ingredient);
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
}