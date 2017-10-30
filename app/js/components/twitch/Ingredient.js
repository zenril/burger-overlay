import React from 'react';
import ReactDom from 'react-dom';

const Ingredient = (props) => {
    return (
       
       <img height='100' className='ingredient' src={'/app/img/' + props.attr.type + '.svg'} />
        
    );
}

export default Ingredient;