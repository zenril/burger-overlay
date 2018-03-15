import Images from './Images.js';

export default class Ingredient
{   

    static getTypes(){
        return [
            { 
                words :["bread","bun"], 
                key : () => ("bun"),
                offset : { pHeight:9 },
                max : 1,
                ratio : 1
            },
            { 
                words :["tomatoes","tomato"],         
                key : () => ("tomato"),
                offset : { pHeight:3.28 },
                ratio : 1
            },
            { 
                words :["meat"], 
                key : (found) => (found.verb + "meat"),
                offset : { pHeight:6.92 },
                ratio : 1
            },
            { 
                words :["beef"], 
                key : (found) => (found.verb + "beef"),
                offset : { pHeight:11.00 },
                ratio : 1
            },
            { 
                words :["chicken"], 
                key : (found) => (found.verb + "chicken"),
                offset : { pHeight:12.42 },
                ratio : 1
            },
            { 
                words :["jam"], 
                key : (found) => (found.verb + "jam"),
                offset : { pHeight:1.375 },
                ratio : 1
            },
            { 
                words :["banana", "bensnsbd"],
                verb :["sliced"],
                key : (found) => (found.verb + "banana"),
                offset : { pHeight:7.42 },
                ratio : 1.15873
            },
            { 
                words :["egg", "igg"], 
                key : (found) => ("egg"),
                offset : {pHeight:7.66},
                ratio : 1
            },
            { 
                words :["avocado"],
                verb :["sliced"],
                key : (found) => (found.verb + "avocado"),
                offset : {pHeight:8.66},
                ratio : 1
            },
            { 
                words :["shoe"], 
                key : (found) => ("shoe"),
                offset : {pHeight:50.66},
                ratio : 1.3333
            },
            { 
                words :["cheese"],
                verb :["american","swiss","chedder"],
                key : (found) => (found.verb + "cheese"),
                offset : {bottom: -12, oHeight:-4},
                ratio : 1
            },
            { 
                words :["cucumber"], 
                key : () => ("cucumber"),
                offset : {pHeight:5.35},
                ratio : 1
            },
            { 
                words :["salami", "pepperoni", "chorizo", "sausage"], 
                key : () => ("salami") ,
                offset : { pHeight:4.44 },
                ratio : 1
            },
            { 
                words :["bacon"], 
                verb: ["canadian", "burnt", "american", "good", "raw"],
                key : () => ("bacon"),
                offset : {bottom: -8,pHeight:4.42},
                ratio : 1
            },
            { 
                words :["beetroot", "beets"], 
                key : () => ("beetroot") ,
                ratio : 1
            },
            { 
                words :["lettuce", "romaine"], 
                verb: ["iceburg"],
                key : () => ("lettuce"),
                offset : {pHeight:7.66},
                ratio : 1
            },
            { 
                words :["onion"],
                verb :["red","white","fried","caramelized", "caramelised"],
                key : (found) => (found.verb + "onion"),
                offset : { pHeight:4.44 },
                ratio : 1
            },
            {
                words :["mustard"],
                verb:  ["american", "british", "good"],
                key : (found) => (found.verb + "mustard"),
                offset : {pHeight:1.375},
                ratio : 1
            },
            {
                words :["mayo", "mayonaise", "aioli", "ranch"],
                key : (found) => (found.verb + "mayo"),
                offset : {pHeight:1.375},
                ratio : 1
            },
            {
                words :["ketchup"],
                key : (found) => (found.verb + "ketchup"),
                offset : {pHeight:1.375},
                ratio : 1
            },   
            {
                words :["sauce"],
                verb:["bbq", "white", "red"],
                key : (found) => (found.verb + "sauce"),
                offset : {pHeight:1.375},
                ratio : 1
            },   
            { 
                words :["pickles","pickle"], 
                key : () => ("pickles"),
                offset : { pHeight:4.44 } ,
                ratio : 1
            },
            { 
                words :["pineapple"], 
                key : () => ("pineapple"),
                offset : { pHeight:5.59 },
                ratio : 1
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

    static fromKey(index, key){
        return new Ingredient(index, {
            word : key,
            key : key,
            verb : null,
        
            conf: {
                offset : 0,
                ratio  : 1
            }
        });
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
        this.ratio = obj.conf.ratio;

        
        var base = {x:0, y:0, top: 0, bottom: 0, left: 0, right: 0, pHeight: 8.66666666667, oHeight:0};


        this.offset = Object.assign(base, obj.conf.offset);

        if(find){
            this.img = this.getImgSrc();
        }
                

    }
}
