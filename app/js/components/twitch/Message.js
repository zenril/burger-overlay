import React from 'react';
import ReactDom from 'react-dom';

const Message = (props) => {
    var style = {
        color : props.user.color
    }
    return (<div className="user-message row" style={props.styles}>
        <div className='col-xs-4 name'>
            <span style={style}> {props.user.username} </span>
        </div>
        <div className='col-xs-8 text'>
            {props.message}
        </div>
    </div>)
}

export default Message;