import React from 'react';
import ReactDom from 'react-dom';

import Twitch from '../twitch/Twitch.js';
import Ingredient from '../components/twitch/Ingredient.js';

export default class DrawOverlay extends React.Component
{   
    constructor(props) 
    {
        super(props);
        this.state = {
            channel : props.match.params["name"],
            ingredients : [],
            burgers : 0,
            locked : false
        };

        this.twitch = new Twitch(props.match.params["name"]);
    }

    componentDidMount ()
    {

        var parse = [
            { test : /bread|bun/, img : () => { return self.state.ingredients.length == 0? "bottom_bun" : "top_bun"; } },
            { test : /tomatoes|tomato/, img : () => { return "tomato"; } },
            { test : /meat|mince|pattie/, img : () => { return "meat"; } },
            { test : /cheese|dairy/, img : () => { return "cheese"; } }
        ];

        var self = this;
        self.twitch.chat((channel, user, message) => {

            const ingredients = self.state.ingredients;
            
            if(self.state.locked){
                return;
            }

            parse.forEach(function(element) {
                if(element.test.test(message) && ((ingredients.length == 0 &&  element.img() == "bottom_bun") || ingredients[0] )) {

                    ingredients.unshift( { type : element.img() } );
                    self.setState({ ingredients });
                }
            }, this);

            if(ingredients[0] && ingredients[0].type == 'top_bun'){
                self.setState({ locked : true });
                setTimeout(function(){
                    self.setState({ locked : false, ingredients : [], burgers : self.state.burgers + 1 });
                }, 3000);
            }
            
        }, true);
    }

    render ()
    {   
        const burgers = this.state.burgers;
        return (
            <div id='widget-overlay burger-box' className="widget chat">
                <div>
                    {burgers}
                </div>
                {
                    this.state.ingredients.map(function(item, i) {
                        return <Ingredient attr={item} key={i} />
                    })
                }
            </div>
        );
    }
};
