import Images from './Images.js';

export default class Ingredient
{   

    static getTypes(){
        return [
            { 
                words :["bread","bun"], 
                key : () => ("bun"),
                offset : { pHeight:9 },
                max : 1
            },
            { 
                words :["tomatoes","tomato"],         
                key : () => ("tomato"),
                offset : { pHeight:3.28 }
            },
            { 
                words :["meat"], 
                key : (found) => (found.verb + "meat"),
                offset : { pHeight:6.92 }
            },
            { 
                words :["egg"], 
                key : (found) => ("egg"),
                offset : {pHeight:7.66}
            },
            { 
                words :["cheese"],
                verb :["american","swiss","chedder"],
                key : (found) => (found.verb + "cheese"),
                offset : {bottom: -12, oHeight:-4}
            },
            { 
                words :["cucumber"], 
                key : () => ("cucumber"),
                offset : {pHeight:5.35}
            },
            { 
                words :["salami", "pepperoni", "chorizo", "sausage"], 
                key : () => ("salami") ,
                offset : { pHeight:4.44 }
            },
            { 
                words :["bacon"], 
                verb: ["canadian", "burnt", "american", "good", "raw"],
                key : () => ("bacon"),
                offset : {bottom: -8,pHeight:4.42}
            },
            { 
                words :["beetroot", "beets"], 
                key : () => ("beetroot") 
            },
            { 
                words :["lettuce", "romaine"], 
                verb: ["iceburg"],
                key : () => ("lettuce"),
                offset : {pHeight:7.66}
            },
            { 
                words :["onion"],
                verb :["red","white","fried","caramelized", "caramelised"],
                key : (found) => (found.verb + "onion"),
                offset : { pHeight:4.44 }
            },
            {
                words :["mustard"],
                verb:  ["american", "british", "good"],
                key : (found) => (found.verb + "mustard"),
                offset : {pHeight:1.375}
            },
            {
                words :["mayo", "mayonaise", "aioli", "ranch"],
                key : (found) => (found.verb + "mayo"),
                offset : {pHeight:1.375}
            },
            {
                words :["ketchup"],
                key : (found) => (found.verb + "ketchup"),
                offset : {pHeight:1.375}
            },   
            {
                words :["sauce"],
                verb:["bbq", "white", "red"],
                key : (found) => (found.verb + "sauce"),
                offset : {pHeight:1.375}
            },   
            { 
                words :["pickles","pickle"], 
                key : () => ("pickles"),
                offset : { pHeight:4.44 } 
            },
            { 
                words :["pineapple"], 
                key : () => ("pineapple"),
                offset : { pHeight:5.59 }
            }
        ];
    }


    //bread    tomatoes    meat    egg    cheese    cucumber    salami    bacon    beetroot    lettuce    onion    mustard    mayo    ketchup    sauce    pickles    pineapple
    getImgSrc(){
        var key = [];
        
        if(this.key == 'bun' && this.index == 0){
            key.push('bottom_bun');
        }

        if(this.key == 'bun' && this.index != 0){
            key.push('top_bun');
        }

        
        key.push(this.verb);
        key.push(this.key);
        key.push(this.word);

        for (var index = 0; index < key.length; index++) {
            var element = key[index];
            var i = Images.ingredient(element);
            if(i){
                return i;
            }
        }

    }

    constructor(index, obj, find = true) 
    {
        var self = this;
        this.baseURL = "/app/img/";
        this.index = index;
        this.word = obj.word;
        this.verb = obj.verb;
        this.key = obj.key;
        this.img = null;
        this.reversed = Math.random() > 0.49;
        var base = {x:0, y:0, top: 0, bottom: 0, left: 0, right: 0, pHeight: 8.66666666667, oHeight:0};
        //console.log(obj.conf.offset); 
        this.animate = {
            
            position: {
                x: 0,
                y: 0,
                getY: (change) =>{
                    if(change){
                        self.animate.position.y += self.animate.move.y();
                    }

                    return self.animate.position.y;
                },
                getX: (change) =>{
                    if(change){
                        self.animate.position.x += self.animate.move.x();
                    }

                    return self.animate.position.x;
                }
            },
            move : {
                vector: {
                    x: (Math.random() * 20) - 10,
                    y:0.1
                },
                x: () => {
                    var v = self.animate.move.vector.x;
                    self.animate.move.vector.x = self.animate.move.vector.x * 0.98;
                    return v;
                },
                y: () => {
                    var v = self.animate.move.vector.y;
                    self.animate.move.vector.y = self.animate.move.vector.y * 1.3;
                    return v;
                }
            }
        };

        this.offset = Object.assign(base, obj.conf.offset);

        if(find){
            this.img = this.getImgSrc();
        }
                

    }
}