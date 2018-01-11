import React from 'react';
import ReactDom from 'react-dom';

import Twitch from '../twitch/Twitch.js';
import IngredientTemplate from '../components/twitch/Ingredient.js';
import parser from '../components/twitch/parse.js';

import Ingredient from '../models/Ingredient.js';
import Burger from '../models/Burger.js';
import Images from '../models/Images.js';
import Sounds from '../models/Sounds.js';
import Commands from '../models/Commands.js';

require("../../sass/app.scss");

export default class DrawOverlay extends React.Component
{
    
    constructor(props) 
    {
        super(props);
        this.timer = null;
        this.timer2 = null;
        this.state = {
            channel : props.match.params["name"],
            names : true,
            burgers : 0,
            locked : false,
            ingredients : [],
            burgerBar : [],
            burger : null,
            frame: 0,
            topple:false,
            style: {}
        };
        this.twitch = new Twitch(props.match.params["name"]);
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
                var added = burger.add(ingredient);

                if( added && burger.ingredients.length > 20 && self.state.frame == 0 && Math.random() > 0.95 && self.state.topple ){
                    
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

                self.timer = setTimeout(function(){
                    self.finishBurger();
                    self.setState({
                        locked : false
                    });
                }, 1500);
            }

        });

        parser.onCommand("--name",(f) => {
            let burger = self.state.burger;
            if(burger){
                burger.name = f.args.join(" ");
                self.setState({ burger });
            }
        });

        parser.onCommand("--show-name",(f) => {
            
            if(f.user.username == self.state.channel && f.args.length == 1 ){
                self.setState({ names : Commands.bool(f.args[0]) });
            }

        });

        parser.onCommand("--topple",(f) => {
            
            if(f.user.username == self.state.channel && f.args.length == 1 ){
                self.setState({ topple : Commands.bool(f.args[0]) });
            }

        });

        parser.onCommand("--volume", (f) => {
            
            if(f.user.username == self.state.channel && f.args.length > 0){
                Sounds.setVolume(f.args[0]);
            }

        });

       
        self.twitch.chat((channel, user, message) => {

            parser.parse(message, user, channel);

            // console.log('a');

            // const ingredients = self.state.ingredients;
            
            // if(self.state.locked){
            //     return;
            // }

            // parse.forEach(function(element) {
                

            //     if(element.test.test(message) && ((ingredients.length == 0 &&  element.img() == "bottom_bun") || ingredients[0] )) {
                    
            //         if(element.action){
            //             element.action(ingredients);
            //             return;
            //         }

            //         ingredients.unshift({ 
            //             type : element.img(), 
            //             reverse : Math.random() >= 0.5,
            //             thin: !!element.thin
            //         });

            //         self.setState({ ingredients });
            //     }
            // }, this);

            // if(ingredients[0] && ingredients[0].type == 'top_bun'){
            //     self.setState({ locked : true });
            //     setTimeout(function(){
            //         self.finishBurger();
            //     }, 3000);
            // }
            
        }, true);

        //parser.parse('bun meat cheese sauce sauce');
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
                (burger && burger.name && this.state.names? "burgerbarburger-hasname" : "")
            ];
        }
        
        return (
            <div className='burger-overlay'>
                <div id='widget-overlay' className="widget chat burger-box" style={this.state.style}>
      
                    {
                        this.state.burger ? this.state.burger.ingredients.map(function(item, i) {
                            return <IngredientTemplate model={item} frame={state.frame} width={200} key={'currentburger-' + item.index} />
                        })
                        :
                        null
                    }
                    <div className='burger-name'>
                        {
                            this.state.burger && this.state.names? this.state.burger.name : null
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
                                                return <IngredientTemplate model={item} width={75} key={'burgerbarburgeringredient-' + burger.id + "-" + item.index}/>
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
