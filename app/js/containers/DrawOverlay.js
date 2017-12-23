import React from 'react';
import ReactDom from 'react-dom';

import Twitch from '../twitch/Twitch.js';
import Ingredient from '../components/twitch/Ingredient.js';
import parser from '../components/twitch/parse.js';

require("../../sass/app.scss");

export default class DrawOverlay extends React.Component
{   

    
    constructor(props) 
    {
        super(props);
        this.state = {
            channel : props.match.params["name"],
            burgers : 0,
            locked : false,
            ingredients : [],
            burgerBar : []
        };
        this.twitch = new Twitch(props.match.params["name"]);
    }

    componentDidMount ()
    {

        var self = this;
        self.twitch.chat((channel, user, message) => {

            parser.parse(message);

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
    }


    finishBurger(){
        this.state.burgerBar.unshift(this.state.ingredients);

        this.setState({
            burgerBar : this.state.burgerBar
        });

        this.setState({
            locked : false, 
            ingredients : [],
            burgers : this.state.burgers + 1 
        });
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
                        this.state.ingredients.map(function(item, i) {
                            return <Ingredient attr={item} key={i} ii={ingredients.length - i} width="200" percent="0.08"/>
                        })
                    }
                </div>
                <div className='burger-bar'>
                    {
                        this.state.burgerBar.map(function(ingredients, i) {
                             return (
                             <div className='burger-bar-burger' key={'bbb-' + i}>
                                {
                                    ingredients.map( (ingr, kk) => {
                                        return <Ingredient attr={ingr} key={'bbbi-' + kk} ii={ingredients.length - kk} width="50" percent="0.08" />
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
