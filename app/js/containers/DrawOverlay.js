import React from 'react';
import ReactDom from 'react-dom';

import Twitch from '../twitch/Twitch.js';
import IngredientTemplate from '../components/twitch/Ingredient.js';
import parser from '../components/twitch/parse.js';

import Ingredient from '../models/Ingredient.js';
import Burger from '../models/Burger.js';
import Images from '../models/Images.js';
import Sounds from '../models/Sounds.js';

require("../../sass/app.scss");

export default class DrawOverlay extends React.Component
{
    
    constructor(props) 
    {
        super(props);
        this.timer = null;
        this.state = {
            channel : props.match.params["name"],
            burgers : 0,
            locked : false,
            ingredients : [],
            burgerBar : [],
            burger : null
        };
        this.twitch = new Twitch(props.match.params["name"]);
    }

    componentDidMount ()
    {
        var self = this;
        parser.onKeyword((f) => {
            clearTimeout(self.timer);
                        
            let burger = self.state.burger;
            if( burger == null){
                burger = new Burger();
            }

            for (var index = 0; index < f.count; index++) {
                var ingredient = new Ingredient(burger.ingredients.length, f);
                burger.add(ingredient);
            }
            
            self.setState({ burger });

            if(burger.isFinished()){
                self.timer = setTimeout(function(){
                    self.finishBurger();
                }, 3000);
            }

        });

        parser.onCommand("--namer",(f) => {
            
            console.log(f);

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

        return (
            <div className='burger-overlay'>
                <div id='widget-overlay' className="widget chat burger-box">
                    <div className='burger-count'>
                        {burgers} Burgers made
                    </div>
                    {
                        this.state.burger ? this.state.burger.ingredients.map(function(item, i) {
                            return <IngredientTemplate model={item} width={200} key={'currentburger-' + item.index} />
                        })
                        :
                        null
                    }
                </div>
                <div className='burger-bar'>
                    {
                        this.state.burgerBar.map(function(burger, i) {
                             return (
                             <div className='burger-bar-burger' key={'burgerbarburger-' + i}>
                                {
                                    burger.ingredients.map( (item, kk) => {
                                        return <IngredientTemplate model={item} width={150} key={'burgerbarburgeringredient-' + i + "-" + kk}/>
                                    })
                                }
                             </div>
                             );
                        })
                    }
                </div>
            </div>
        );
    }
};
