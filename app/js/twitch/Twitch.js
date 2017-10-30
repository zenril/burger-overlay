//https://discuss.dev.twitch.tv/t/twitch-tv-web-browser-chat/6186
import irc from 'tmi.js';
import axios from 'axios';
import React from 'react';
import ReactDom from 'react-dom';

export default class Twitch
{
    constructor(channel) 
    {
        this.options = {
            options: {
                debug: !true
            },
            channels: [channel]
        };

        this.token = {
            client_id:"fnc2bpsohlmqnipq6sjz126xwzhgdy",
            redirect_uri:"http://localhost:7777/"
        }
     
    }

    escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }

    //oauth not needed
    init(callback)
    {//http://aaron-m.co.nz/twitch/redirect.php
        axios.get("https://api.twitch.tv/kraken/oauth2/authorize?client_id=fnc2bpsohlmqnipq6sjz126xwzhgdy&redirect_uri=http://localhost:7777/&response_type=authorization_code")
        .then(res => {
            return callback(res);
        });
    }

    formatter()
    {

    }

    img(message, start, end, str, i)
    {
        return (<img src={ "http://static-cdn.jtvnw.net/emoticons/v1/" + str + "/3.0" } alt={  message.substring( +start, +end )  } key={"emote-" + i} />);
    }

    parseEmotes(message, emotes)
    {   
        var me = this;      
        var start =0;
        var map = {};
        var emoteList = [];

        //aaaaaa Kreygasm bbbbbbb SMOrc ccccccc GingerPower ddddddd
        for (var id in emotes) {
            if ( emotes.hasOwnProperty(id) && emotes[id] ) {               
                var indexes = emotes[id][0].split("-");                
                var emote = message.substring( +indexes[0], (+indexes[1])+1 );
                if(!map[emote]){
                    emoteList.push(me.escapeRegExp(emote));
                    map[emote] = id;
                }
            }
        }
        
        if(!emotes || emoteList.length == 0){
            return message;
        }


        var split = message.split( new RegExp("(" + emoteList.join("|") + ")","g"));
        var ret = [];
        split.forEach(function(element, index) {    
            if(map[element]){
                ret.push(<img src={ "http://static-cdn.jtvnw.net/emoticons/v1/" + map[element] + "/3.0" } alt={element} key={"emote-" + index} />);
            } else {
                ret.push(<span className="text-chat" key={"emote-" + index} >{element}</span>);
            }            
        }, this);
        return ret;
    }

    chat(callback, dontParse)
    {   
        var me = this;
        var client = new irc.client(me.options);

        client.addListener('message', function (channel, user, message, self) {
            
            if(!dontParse){
                message = me.parseEmotes(message, user.emotes);
            }

            callback(channel,user,message);
        });

        client.connect();
    }
    
}