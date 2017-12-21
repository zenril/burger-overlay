class Parser {


    constructor(keywords){
        this.keywords = keywords;
    
    }


    parse(str){

        var parsed = {
            n : null,
            keyword : null,
            command : false
        };

        var words = str.split(/[ ]*/);
        for (var i = 0; i < words.length; i++) {
            var word = array[i];
            
            word = word.trim();
            

            //is number
            if(/\d+/.test(word)){
                parsed.n = parseInt(word);
            }

            //is command
            if(/--[a-z-_]*/.test(word)){
                parsed.command = word
            }
            var cword = word;
            for (var j = 0; j < this.keywords.length; j++) {
                cword = word;
                var keyword = this.keywords[j];
                

                for (var k = 0; k < keyword.tokens.length; k++) {
                    var token = keyword.tokens[index];
                    token.split(/[ ]*/).forEach(function(element, l) {
                        
                        cword = cword + " " + words[i + 1]; 

                    }, this);

                }

                if(new RegExp([0].join("|"), i).test(word)){
                    
                }
            }

        };
    }



}


var p = new Parser([
    { 
        tokens :["bread","bun"], 
        key : () => ("bun") 
    },
    { 
        tokens :["tomatoes","tomato"], 
        key : () => ("tomato") 
    },
    { 
        tokens :["meat"], 
        key : () => ("meat") 
    },
    { 
        tokens :["cheese"], 
        key : () => ("cheese") 
    },
    { 
        tokens :["cucumber"], 
        key : () => ("cucumber") 
    },
    { 
        tokens :["salami"], 
        key : () => ("salami") 
    },
    { 
        tokens :["bacon"], 
        key : () => ("bacon") 
    },
    { 
        tokens :["beetroot"], 
        key : () => ("beetroot") 
    },
    { 
        tokens :["lettuce"], 
        key : () => ("lettuce") 
    },
    { 
        tokens :["onion"], 
        key : () => ("onion") 
    },
    { 
        tokens :["sauce1"], 
        key : () => ("sauce1"),
        thin : true
    },
    { 
        tokens :["sauce2"], 
        key : () => ("sauce2"),
        thin : true
    },
    { 
        tokens :["sauce3"], 
        key : () => ("sauce3"),
        thin : true
    },
    { 
        tokens :["sauce4"], 
        key : () => ("sauce4"),
        thin : true
    },
    { 
        tokens :["sauce5"], 
        key : () => ("sauce5"),
        thin : true 
    },
    { 
        tokens :["sauce6"], 
        key : () => ("sauce6"),
        thin : true
    },
    { 
        tokens :["pickles","pickle"], 
        key : () => ("pickles") 
    },
    { 
        tokens :["pineapple"], 
        key : () => ("pineapple")
    },
    { 
        tokens :["--undo"], 
        command: {
            params : 0,
            action : (ingredients) => {
                ingredients.splice(0, 1);
                this.setState({
                    ingredients : ingredients
                });
            }
        },
        key : () => ("undo") 
    }

]);