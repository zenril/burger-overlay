class Parser {


    constructor(keywords){
        this.keywords = keywords;
    
    }

    regexFind(list, word){
        let found = word.match(new RegExp(list.join("|"), "i"));
        if(found) {
            return found[0];
        }
        return null;
    }

    parse(str){
        let event = {
            count: 0,
            key: null,
            verb: "",
            word: "",
            command : false
        }

        var words = str.split(/[ ]*/);
        //loop through words
        for (var i = 0; i < words.length; i++) {
            var word = array[i];
            event.command = false;
            
            word = word.trim();            

            //is number
            if(/\d+/.test(word)){
                event.count = parseInt(word);
            }

            //is command
            if(/--[a-z-_]*/.test(word)){
                event.command = true;
            }
            var cword = word;
            
            //loop through keywords to find
            for (var j = 0; j < this.keywords.length; j++) {
                cword = word;
                var keyword = this.keywords[j]; 

                let foundVerb = this.regexFind(keyword.verb, cword);
                if(foundVerb){
                    event.verb = foundVerb;
                    cword = words[i+1];
                }

                let foundWord = this.regexFind(keyword.words, cword);
                if(foundWord){
                    event.word = foundWord;
                    if(foundVerb){
                        i++;
                    }
                }
                
                if(event.word){
                    event.key = keyword.key(event);
                    if(word.command){
                        Parser.triggerCommand(event);
                    } else {
                        Parser.triggerKeyword(event);
                    }
                    event.keyword = null;
                    event.command = null;
                    event.verb = "";
                    event.word = "";
                }
            }
        };
    }

    static keywordCBS = [];
    static commandCBS = [];

    onKeyword( cb ) {
        Parser.keywordCBS.push(cb);
        return cb;
    }

    onCommand( cb ) {
        Parser.commandCBS.push(cb);
        return cb;
    }

    static triggerKeyword(parsed){
        for (var index = 0; index < Parser.keywordCBS.length; index++) {
            var element = Parser.keywordCBS[index];

            if(typeof element == 'function'){
                element(parsed);
            }
            
        }
    }

    static triggerCommand(parsed){
        for (var index = 0; index < Parser.commandCBS.length; index++) {
            var element = Parser.commandCBS[index];

            if(typeof element == 'function'){
                element(parsed);
            }
            
        }
    }



}






var p = new Parser([
    { 
        words :["bread","bun"], 
        key : () => ("bun") 
    },
    { 
        words :["tomatoes","tomato"],         
        key : () => ("tomato") 
    },
    { 
        words :["meat"], 
        key : (found) => (found.verb + "meat") 
    },
    { 
        words :["egg"], 
        key : (found) => (found.verb + "egg") 
    },
    { 
        words :["cheese"],
        verb :["american","swiss","chedder"],
        key : (found) => (found.verb + "cheese") 
    },
    { 
        words :["cucumber"], 
        key : () => ("cucumber") 
    },
    { 
        words :["salami", "pepperoni", "chorizo", "sausage"], 
        key : () => ("salami") 
    },
    { 
        words :["bacon"], 
        verb: ["canadian", "burnt", "american", "good", "raw"],
        key : () => ("bacon") 
    },
    { 
        words :["beetroot", "beets"], 
        key : () => ("beetroot") 
    },
    { 
        words :["lettuce", "romaine"], 
        verb: ["iceburg"],
        key : () => ("lettuce") 
    },
    { 
        words :["onion"],
        verb :["red","white","fried","caramelized", "caramelised"],
        key : (found) => (found.verb + "onion") 
    },
    {
        words :["mustard"],
        verb:  ["american", "british", "good"],
        key : (found) => (found.verb + "mustard")
    },
    {
        words :["mayo", "mayonaise", "aioli", "ranch"],
        key : (found) => (found.verb + "mayo")
    },
    {
        words :["ketchup"],
        key : (found) => (found.verb + "ketchup")
    },   
    {
        words :["sauce"],
        verb:["bbq", "white", "red", "tomato"],
        key : (found) => (found.verb + "sauce")
    },   
    { 
        words :["pickles","pickle"], 
        key : () => ("pickles") 
    },
    { 
        words :["pineapple"], 
        key : () => ("pineapple")
    },
    { 
        words :["--undo"], 
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
    },
    {
        words :["--name"],
        command: {
            params : 0,
            action : (ingredients) => {
              console.log("Naming is TBD");
            }
        },
        key : () => ("name")
    }

]);

export default p;