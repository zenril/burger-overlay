import React from 'react';
import ReactDom from 'react-dom';





const Ingredient = (props) => {
    let klss = (props.attr.reverse ? "ir ingredient" : "ingredient" );
    var style = {
        zIndex : props.ii, 
        paddingBottom: props.ii * (props.width * props.percent), 
        marginBottom:  props.attr.type == "cheese" ? - (props.width * (props.percent))  : 0 
    };
    
    return (
       
       <img height={props.width} className={klss} src={'/app/img/' + props.attr.type + '.svg'} style={style} />
    
    );
}

export default Ingredient;