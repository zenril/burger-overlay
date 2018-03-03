import React from 'react';
import ReactDom from 'react-dom';

import Twitch from '../twitch/Twitch.js';
import IngredientTemplate from '../components/twitch/Ingredient.js';
import Parser from '../components/twitch/parse.js';

import Ingredient from '../models/Ingredient.js';
import Burger from '../models/Burger.js';
import Images from '../models/Images.js';
import Sounds from '../models/Sounds.js';
import Commands from '../models/Commands.js';

require("../../sass/app.scss");
var parser = new Parser( Ingredient.getTypes());

window.parser = (msg) => {
    parser.parse(
        msg,
        {username:"faxwang"},
        "faxwang"
    );
}


export default class DrawOverlay extends React.Component
{
    
    constructor(props) 
    {
        super(props);
        this.timer = null;
        this.timer2 = null;
        this.state = {
            channel : props.match.params["name"],
            burgers : 0,
            locked : false,
            ingredients : [],
            burgerBar : [],
            style: {},
            burger : null,
            frame: 0,

            opts : {
                names : true,
                topple:false,
                threshhold: 20,
                maxtype: 0,
                volume: 0,
                expanded : false,
                finishable : true
            }
        };

        this.state.opts = Object.assign(this.state.opts, this.getOpts() );


        this.twitch = new Twitch(props.match.params["name"]);
        
    }
    
    canCommand (f) {
        return (f.user['user-type'] == "mod" || f.user.username == this.state.channel);
    }

    componentWillUpdate () 
    {
        Sounds.setVolume(this.state.opts.volume);
    }

    updateOpts () {
        window.localStorage["burgeropts"] = JSON.stringify(this.state.opts);
    }

    getOpts () {
        return JSON.parse(window.localStorage["burgeropts"] || "{}") || {};
    }

    defaultOpts () {
        return window.localStorage["burgeropts"] = "{}";
    }

    componentDidMount ()
    {
        var self = this;
        parser.onKeyword((f) => {
            //

            if(self.state.locked){
                return;
            }

            clearTimeout(self.timer);

            let burger = self.state.burger;
            if( burger == null){
                burger = new Burger();
            }

            for (var index = 0; index < f.count; index++) {
                var ingredient = new Ingredient(burger.ingredients.length, f);

                if( self.state.opts.maxtype > 0 && burger.type_map[ingredient.key] >= self.state.opts.maxtype ){
                    continue;
                }

                var added = burger.add(ingredient);

                if( added && burger.ingredients.length > self.state.opts.threshhold && self.state.frame == 0 && Math.random() > 0.95 && self.state.opts.topple ){
                    
                    let frame = () => {
                        
                        self.setState({ frame : self.state.frame + 1});
                        if(self.state.frame < 50){
                            setTimeout(frame, 1000 / 24 );
                        } else {
                            self.setState({ frame : 0, burger: null});
                        }
                    }

                    frame();
                }
            }
            
            self.setState({ burger });

            if(burger.isFinished()){

                self.setState({
                    locked : true
                });

                if(self.state.opts.finishable){
                    self.timer = setTimeout(function(){
                        self.finishBurger();
                        self.setState({
                            locked : false
                        });
                    }, 1500);
                }
            }

        });



        parser.onCommand("--name",(f) => {
            let burger = self.state.burger;
            if(burger){
                burger.name = f.args.join(" ");
                self.setState({ burger });
            }
        });

        parser.onCommand("--reset-opts",(f) => {
           self.defaultOpts();
        });

        parser.onCommand("--show-name",(f) => {
            
            if( self.canCommand(f) ){

                let opts = this.state.opts;
                opts["names"] = Commands.bool(f.args[0]);
                self.setState({ opts : opts });

                self.updateOpts();
            }

        });

        parser.onCommand("--expanded",(f) => {
            
            if( self.canCommand(f) ){

                let opts = this.state.opts;
                opts["expanded"] = Commands.bool(f.args[0]);
                self.setState({ opts : opts });

                self.updateOpts();
            }

        });

        parser.onCommand("--finish",(f) => {
            
            if( self.canCommand(f) ){
                self.finishBurger();
                // let opts = this.state.opts;
                // opts["finish"] = Commands.bool(f.args[0]);
                // self.setState({ opts : opts });
            }

        });

        parser.onCommand("--topple",(f) => {
            
            if( self.canCommand(f) ){
                let opts = this.state.opts;
                opts["topple"] = Commands.bool(f.args[0]);
                self.setState({ opts : opts });

                self.updateOpts();
            }

        });

        parser.onCommand("--threshhold",(f) => {
            
            if( self.canCommand(f) ){
                let opts = this.state.opts;
                opts["threshhold"] = Commands.int(f.args[0]);
                console.log(opts);
                self.setState({ opts : opts });

                self.updateOpts();
            }

        });

        parser.onCommand("--maxtype",(f) => {
            
            if( self.canCommand(f) ){
                let opts = this.state.opts;
                opts["maxtype"] = Commands.int(f.args[0]);
                self.setState({ opts : opts });

                self.updateOpts();
            }

        });

        
        parser.onCommand("--auto-finish",(f) => {
            
            if( self.canCommand(f) ){
                let opts = this.state.opts;
                opts["finishable"] = Commands.int(f.args[0]);
                self.setState({ opts : opts });
            
                self.updateOpts();
            }

        });


        parser.onCommand("--volume", (f) => {
            
            if( self.canCommand(f) ){
                let opts = this.state.opts;
                opts["volume"] = Commands.int(f.args[0]);
                self.setState({ opts : opts });

                self.updateOpts();
            }

        });

       
        self.twitch.chat((channel, user, message) => { 
            parser.parse(message, user, channel);
        }, true);

    }

    finishBurger(){
        this.state.burgerBar.unshift(this.state.burger);

        this.setState({
            burgerBar : this.state.burgerBar
        });

        this.setState({
            locked : false,
            burger : null,
            burgers : this.state.burgers + 1 
        });
        
        Sounds.play('nom');
    }

    render ()
    {   
        const burgers = this.state.burgers;
        const ingredients = this.state.ingredients;
        let state  = this.state;
        let burgerBarBurgerClass = (burger) => {
            return [
                "burger-bar-burger-col", 
                (burger && burger.name && this.state.opts.names? "burgerbarburger-hasname" : "")
            ];
        }
        
        return (
            <div className='burger-overlay'>
                <div id='widget-overlay' className="widget chat burger-box" data-expanded={state.opts.expanded} style={this.state.style}>
      
                    {
                        this.state.burger ? this.state.burger.ingredients.map(function(item, i) {
                            return <IngredientTemplate model={item} expanded={state.opts.expanded} frame={state.frame} width={200} key={'currentburger-' + item.index + '-' + state.opts.expanded} />
                        })
                        :
                        null
                    }
                    <div className='burger-name'>
                        {
                            this.state.burger && this.state.opts.names? this.state.burger.name : null
                        }
                    </div>
                    <div className='burger-count'>
                        {burgers} Burgers made
                    </div>
                </div>
                <div className='burger-bar'>
                <div className='burger-bar-nowrap' style={{width:this.state.burgerBar.length * 140}}>
                    {
                        this.state.burgerBar.map(function(burger, i) {
                            


                             return (
                                <div className={burgerBarBurgerClass(burger).join(' ')} style={{width:80}} key={'burgerbarburger-' + i}>
                                    <div className='burger-bar-burger'>
                                        {
                                            burger.ingredients.map( (item, kk) => {
                                                return <IngredientTemplate model={item} expanded={false} width={75} key={'burgerbarburgeringredient-' + burger.id + "-" + item.index}/>
                                            })
                                        }
                                    </div>
                                    <div className='burger-name'>
                                        {
                                            burger && state.names? burger.name : null
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                </div>
            </div>
        );
    }
};
