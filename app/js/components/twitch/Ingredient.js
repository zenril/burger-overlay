import React from 'react';
import ReactDom from 'react-dom';
import sizeOf from 'browser-image-size';

export default class Ingredient extends React.Component {

    constructor(props) 
    {

        super(props);

        let width = props.width;
        
        this.state = {
            width:width,
            height:0,
            ratio:0,
            loaded:false
        };

        this.model = this.props.model;
        this.klss = (props.model.reversed ? "ir ingredient" : "ingredient" );

        this.style = {
            zIndex : this.model.index, 
            marginBottom: 0,
            //marginBottom: -  (width * props.model.offset.y)
            //marginBottom:  props.props.model.type == "cheese" ? - (props.width * (props.percent))  : 0 
        };

        this.imageStyle = {
        };

        var  self = this;
        let image = sizeOf(props.model.img).then((size) => {

            console.log(size);
            let ratio = size.width / size.height;
            var height = width * ratio;

            self.style.height = ( (this.model.offset.pHeight + this.model.offset.oHeight) / 100 ) * height;
            self.imageStyle.bottom = ((this.model.offset.bottom) / 100 ) * height;



            // self.style.marginTop =  -(height * this.model.offset.top); 

            this.setState({
                ratio : ratio,
                height: height,
                loaded: true
            });


        });
    }

    componentWillUpdate(){
        
    }

    render(){
        return this.state.loaded ? (
            <div className="ingredient-wrapper" style={this.style}>
                <img height={this.state.height} className={this.klss} src={this.model.img} style={this.imageStyle} />
            </div>
        ) : null;
    }
}