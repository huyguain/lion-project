import React, { Component } from 'react';
import config from '../../../../config';
import { Link } from 'react-router-dom';
import { BubbleLoader } from 'react-css-loaders';

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: -1
        }
        this.goToSlide = this.goToSlide.bind(this);
        this.goToPrevSlide = this.goToPrevSlide.bind(this);
        this.goToNextSlide = this.goToNextSlide.bind(this);
    }
    goToSlide(index) {
        clearTimeout(this.action);
        this.setState({
            activeIndex: index
        });
    }
    goToNextSlide(e) {
        e.preventDefault();
        clearTimeout(this.action);
        let index = this.state.activeIndex;
        const { slides = [] } = this.props;
        let lengthSlides = slides.length;
        if (index === lengthSlides - 1) {
            index = -1;
        }
        index++;
        this.setState({ activeIndex: index });
    }
    goToPrevSlide(e) {
        e.preventDefault();
        clearTimeout(this.action);
        const { slides = [] } = this.props;
        let index = this.state.activeIndex;
        if (index < 1) {
            index = slides.length;
        }
        index--;
        this.setState({ activeIndex: index });
    }
    componentDidMount() {
        this.goToSlide(0);
    }
    componentDidUpdate() {
        const { slides = [] } = this.props;
        const index = this.state.activeIndex + 1;
        this.action = setTimeout(_ => {
            this.goToSlide(index >= slides.length ? 0 : index);
        }, this.props.interval)
    }
    componentWillUnmount() {
        clearTimeout(this.action);
    }
    render() {
        const { slides = [], history } = this.props;
        const { activeIndex } = this.state;
        if (activeIndex === -1 || slides.length === 0) {
            return (
                <div className={'carouselShowContainer'}>
                    <BubbleLoader />
                </div>
            );
        }
        else return (
            <div className={'carouselShowContainer'} style={{ height: this.props.heightShow }}>
                <div
                    className={'carouselArrow carouselArrow_left'}
                    onClick={e => this.goToPrevSlide(e)}>
                    <span className="fa fa-2x fa-angle-left" />
                </div>
                <ul className={'carouselSlides_ul carouselSlides'}>
                    {slides.map((slide, index) =>
                        <li key={slide._id ? slide._id : Math.random()} className={'carouselSlide'}
                            style={{
                                display: this.state.activeIndex === index ? 'flex' : 'none',
                                backgroundImage: `url(${config.imageUrl}/${slide.urlImage})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center center',
                            }}
                        >
                            <div className={'carouselSlideInfor'}>
                                <div className={'carouselSlide__title'}>{slide.title}</div>
                                <div className={'carouselSlide__description'}>
                                    {slide.description}</div>
                                <button className={'carouselSlide__viewmore'}
                                    onClick={_ => history.push(`/${slide.linkto}`)}>
                                    View more
                                </button>
                            </div>
                        </li>
                    )}
                </ul>
                <div
                    className={'carouselArrow carouselArrow_right'}
                    onClick={e => this.goToNextSlide(e)}
                >
                    <span className="fa fa-2x fa-angle-right" />
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <ul className={'carousel_ul carouselIndicators'}>
                        {slides.map((slide, index) =>
                            <li key={slide._id ? slide._id : Math.random()} style={{ marginLeft: 9 }}>
                                <div className={`carouselIndicator 
                                    ${this.state.activeIndex === index ? 'carouselIndicator_active' : ''}`}
                                    onClick={e => this.goToSlide(index)}
                                >
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div >
        )
    }
}

export default Carousel;