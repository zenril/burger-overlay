import React from 'react';
import ReactDom from 'react-dom';
import Twitch from '../twitch/Twitch.js';

export default class SpeakOverlay extends React.Component
{   
    constructor(props) 
    {
        super(props);
        this.state = {
            channel : props.match.params["name"],
            question : "what does?"
        };

        this.twitch = new Twitch(props.match.params["name"]);
        self.twitch.chat((channel, user, message) => {
            
        }, true);
    }

    componentDidMount ()
    {
           
                
    }

    render ()
    {  
        return (
            <div className=''>
                <div>asdasd</div>
            </div>
        );
    }
};
