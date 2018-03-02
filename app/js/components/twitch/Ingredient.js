import React from 'react';
import ReactDom from 'react-dom';
import sizeOf from 'browser-image-size';

export default class Ingredient extends React.Component {

    constructor(props) 
    {
        
        super(props);
        var  self = this;
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
            marginLeft: 0
        };

        this.imageStyle = {
        };

        
        let image = sizeOf(props.model.img).then((size) => {

            let ratio = size.width / size.height;
            var height = width * ratio;
            var nwidth = height * ratio;
            var offset = (nwidth - width) / 2;

            self.style.marginLeft = -offset;
            self.style.height = ( (this.model.offset.pHeight + this.model.offset.oHeight) / 100 ) * height;
            self.imageStyle.bottom = ((this.model.offset.bottom) / 100 ) * height;

            this.setState({
                ratio : ratio,
                height: height,
                loaded: true
            });


        });
    }


    componentWillUpdate(a){
        if(a.frame > 0) {
            this.imageStyle = {
                left: this.model.animate.position.getX(a.frame > 0) + "px",
                bottom: - this.model.animate.position.getY(a.frame > 0) + "px",
            //    / opacity: Math.min( (100 - ((100 / 30) * a.frame)) / 100, 1)
            };
        }

        //this.setState({frame: a.frame});

    }

    render(){
        

        return this.state.loaded ? (
            <div className="ingredient-wrapper" style={this.style}>
                <img height={this.state.height} className={this.klss} src={this.model.img} style={this.imageStyle} />
            </div>
        ) : null;
    }
}