import React, { Component } from 'react';
import Bear from '../../../Images/bear.jpg';
import Clippy from '../../../Images/Clippy.jpg';
import Nier from '../../../Images/Nier.jpg';
import ImageSlide from './ImageSlide';
import Arrow from './Arrow';
const imgUrls = [
    Bear,
    Clippy,
    Nier
];
class Carousel extends Component {
    constructor (props){
        super(props);


        this.state = {
            currentImageIndex:0
        };

        this.nextSlide = this.nextSlide.bind(this);
        this.previousSlide = this.previousSlide.bind(this);
    }

    previousSlide () {

        const lastIndex = imgUrls.length - 1;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === 0;
        const index =  shouldResetIndex ? lastIndex : currentImageIndex - 1;
    
        this.setState({
          currentImageIndex: index
        });
      }

      nextSlide () {
        const lastIndex = imgUrls.length - 1;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === lastIndex;
        const index =  shouldResetIndex ? 0 : currentImageIndex + 1;
    
        this.setState({
          currentImageIndex: index
        });
      }

    render() {
        return (
            <div className="carousel">
                <Arrow direction="left" clickFunction={this.previousSlide}
                glyph="&#9664;"/>

                <ImageSlide url={imgUrls[this.state.currentImageIndex]}/>

                <Arrow direction="right" clickFunction={this.nextSlide}
                glyph="&#9654;"/>
            </div>
        );
    }
}

export default Carousel;
