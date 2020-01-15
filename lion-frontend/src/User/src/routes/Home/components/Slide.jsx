import React, { Component } from 'react';
import { BubbleLoader } from 'react-css-loaders';
import config from '../../../../../config';

class Slide extends Component {
    constructor(props) {
        super(props);
        this.slideIndex = 1;
        this.showSlides = this.showSlides.bind(this);
        this.plusSlides = this.plusSlides.bind(this);
        this.currentSlide = this.currentSlide.bind(this);
    }
    showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) { 
            this.slideIndex = 1 
        }
        if (n < 1) { this.slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[this.slideIndex - 1].style.display = "flex";
        dots[this.slideIndex - 1].className += " active";
    }
    plusSlides(n) {
        //run slide index -1
        this.showSlides(this.slideIndex += n);
    }
    currentSlide(n) {
        //run slide index +1
        this.showSlides(this.slideIndex = n);
    }
    componentDidUpdate() {
        if(this.props.listSlide.length !== 0) {
            this.showSlides(this.slideIndex);
            if(this.props.autoPlay) {
                this.intervalId = setInterval(() => {
                    this.slideIndex++;
                    this.showSlides(this.slideIndex);
                }, this.props.interval)
            }
        } 
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
    render() {
        if (this.props.listSlide.length === 0) 
            return (
                <div className="slideshow_container">
                     <BubbleLoader />
                </div>
            ) 
        return (
                <div className="slideshow_container">
                    <div className="slide-active">
                        {
                            this.props.listSlide.map((slide, index) => {
                                return (
                                    <div className="dot" onClick={() => this.currentSlide(index + 1)}></div>
                                ) 
                            })
                        }
                    </div>
                    {
                        this.props.listSlide.map((slide, index) => {
                            const style = {
                                backgroundImage: `url(${config.imageUrl}/${slide.urlImage})`,
                                height: '600px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: "relative",
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center center',
                                // backgroundAttachment: 'fixed',
                                webkitBackgroundSize: 'cover',
                                mozBackgroundSize: 'cover',
                                oBackgroundSize: 'cover',
                                backgroundSize: 'cover',
                            }
                            return (
                                <div className="mySlides myFade" style={style}>
                                    <div>
                                    <h1 className="title">{slide.title}</h1>
                                    <p className="description">
                                    {slide.description}
                                    </p>
                                      <center><button className="view-more">View more</button></center>
                                    </div>
                                    <a className="prev" onClick={() => this.plusSlides(-1)}>
                                        <img src={require("../assets/slider-arrow-left.png")} alt="" />
                                    </a>
                                    <a className="next" onClick={() => this.plusSlides(1)}>
                                        <img className="slider-arrow-right" src={require("../assets/slider-arrow-right.png")} alt="" />
                                    </a>
                                </div> 
                            )
                        })
                    }
            </div>
        )
    }
}
export default Slide;