import React from 'react';
import ReactDom from 'react-dom';
import sizeOf from 'browser-image-size';

export default class Ingredient extends React.Component {

    constructor(props) 
    {
        
        super(props);
        var  self = this;
        let width = props.width;
        this.model = this.props.model;
        this.klss = (props.model.reversed ? "ir ingredient" : "ingredient" );

        this.style = {
            zIndex : this.model.index, 
            marginBottom: 0,
            marginLeft: 0
        };

        this.imageStyle = {
        };

        console.log(this.model);
        // let ratio = size.width / size.height;
        var height = width * this.model.ratio;
        var nwidth = height * this.model.ratio;
        var offset = (nwidth - width) / 2;

        self.style.marginLeft = -offset;
        self.style.height = ( (this.model.offset.pHeight + (this.props.expanded?20:0) + this.model.offset.oHeight) / 100 ) * height;
        self.imageStyle.bottom = ((this.model.offset.bottom) / 100 ) * height;

        // this.setState({
        //     ratio : this.model.ratio,
        //     height: height,
        //     loaded: true
        // });

        this.state = {
            width:width,
            height:height,
            ratio: this.model.ratio, 
            loaded:true
        };

    }

    componentWillUpdate(a){
    }

    render(){
        // let width = this.props.width;

        // var  self = this;
           
        // var height = width * this.model.ratio;
        // var nwidth = height * this.model.ratio;
        // var offset = (nwidth - width) / 2;

        // self.style.marginLeft = -offset;
        // self.style.height = ( (this.model.offset.pHeight + (this.props.expanded?20:0) + this.model.offset.oHeight) / 100 ) * height;
        // self.imageStyle.bottom = ((this.model.offset.bottom) / 100 ) * height;


        let style = Object.assign({}, this.style);
        let imageStyle = Object.assign({}, this.imageStyle);

        return this.state.loaded ? (
            <div className="ingredient-wrapper" style={style}>
                <img height={this.state.height} className={this.klss} src={this.model.img} style={imageStyle} />
            </div>
        ) : null;
    }
}