import Ingredient from '../../models/Ingredient.js';

class Parser {


    constructor(keywords){
        this.keywords = keywords;
    
    }

    regexFind(list, word){
        if(!list || !word){
            return null;
        }

        let found = word.match(new RegExp(list.join("|"), "i"));
        if(found) {
            return found[0];
        }
        return null;
    }

    parse(str, user = null, channel = null){

        if(!str){
            return;
        }
        
        str = str.toLowerCase();

        let event = {
            count: 1,
            key: null,
            verb: "",
            word: "",
            conf: null
        }

        var words = str.split(/[ ]+/);
        //loop through words
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            
            word = word.trim();

            //is number
            if(/\d+/.test(word)){
                event.count = parseInt(word);
            }

            //is command
            if(/--[a-z]+/.test(word)){
                
                Parser.triggerCommand({
                    word : word,
                    args : words.slice(i + 1),
                    user: user
                });
                event.verb = "";
                event.word = "";
                event.key = "";
                break;
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
                    
                    if(typeof keyword.max == 'number'){
                        event.count = Math.min(event.count,keyword.max);
                    } else {
                        event.count = Math.min(event.count,5); 
                    }

                    event.word = foundWord;
                    if(foundVerb){
                        i = i + 1;
                    }
                }
                
                if(event.word){
                    event.conf = keyword;
                    var e = Object.assign({}, event);
                    e.key = keyword.key(e);
                    Parser.triggerKeyword(e);
                    event.verb = "";
                    event.word = "";
                    event.key = "";
                    event.count = 1;
                    break;
                }
            }
        };
    }


    onKeyword( a ,b ) {
        if(!Parser._wordcallback){
            Parser._wordcallback = [];
        }

        Parser._wordcallback.push({
            cb: typeof a == 'string' ? b : a,
            word: typeof a == 'string' ? a : null
        });
    }

    onCommand( a, b ) {
        if(!Parser._cmdcallback){
            Parser._cmdcallback = [];
        }
        Parser._cmdcallback.push({
            cb: typeof a == 'string' ? b : a,
            word: typeof a == 'string' ? a : null
        });
    }

    static triggerKeyword(parsed){
        if(!Parser._wordcallback){
            Parser._wordcallback = [];
        }

        for (var index = 0; index < Parser._wordcallback.length; index++) {
            var element = Parser._wordcallback[index];

            if(typeof element.cb == 'function'){
                if(!element.word || element.word == parsed.word){
                    element.cb(parsed);
                }
            }
            
        }
    }

    static triggerCommand(parsed){
        if(!Parser._cmdcallback){
            Parser._cmdcallback = [];
        }

        for (var index = 0; index < Parser._cmdcallback.length; index++) {
            var element = Parser._cmdcallback[index];

            if(typeof element.cb == 'function'){
                if(!element.word || element.word == parsed.word){
                    element.cb(parsed);
                }
            }
            
        }
    }



}






var p = new Parser( Ingredient.getTypes());

    window.parser = (msg) => {
        p.parse(
            msg,
            {username:"faxwang"},
            "faxwang"
        );
    }

export default p;