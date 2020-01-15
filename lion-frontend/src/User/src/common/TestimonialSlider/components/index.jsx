import React, { Component } from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';
import config from '../../../../../config'
import axios from 'axios';

import './index.css';

class SliderTestimonial extends Component {
    constructor() {
        super();
        this.state = {
            activeSlide: 0,
            data: []
        }
    }
    componentDidMount() {
        axios.get(`${config.host}/list-testimonial`).
            then(
            data => {
                this.setState({ data: data.data.data })
            }
            ).catch(
            err => console.log(err)
            )
    }
    render() {
        const { data, activeSlide } = this.state;
        const length = data.length;
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 3,
            autoplay: true,
            speed: 1500,
            autoplaySpeed: 3000,
            arrows: false,
            beforeChange: (current, next) => this.setState({ activeSlide: next }),
        }
        return (
            <div className={'bodySliderTestimonial'}>
                <p className={'sliderTitle'}>Chúng tôi nói về chúng tôi</p>
                <div className={'rectangleSeperate'} />
                <div className={'bodySlider'} >
                    <div className={'hideLeft'} />
                    <Slider {...settings}>
                        {
                            data.map((item, index) => (
                                <div className={'itemSlider'}
                                    key={`${item.id}+${Math.random()}`}>
                                    <div className={'contentItem'}
                                         style={{
                                            opacity: length < 3 ? 1 : index === activeSlide + 1 ||
                                                (activeSlide === length - 1 && index === 0) ? 1 : 0.5}}>
                                        <div className={'contentTestimonial'}>
                                            <i className={classNames("fa fa-quote-left",
                                                'quoteLeft')} aria-hidden="true"></i>
                                            <p className={'contentText'}>{item.content}</p>
                                            <i className={classNames("fa fa-quote-right",
                                                'quoteRight')} aria-hidden="true"></i>
                                        </div>
                                        <div className={'infoUserTestimonial'}>
                                            <img src={config.imageUrl + '/' + item.urlImage} height='100%' width='75px' />
                                            <div className={'infoTextTestimonial'}>
                                                <p className={'infoNameTestier'}>{`${item.gender === 0 ? 'Mr' : 'Ms'}. ${item.fullName}`}</p>
                                                <p className={'infoPositionTestier'}>{item.position}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Slider>
                    <div className={'hideRight'} />
                </div>
            </div>
        )
    }
}

export default SliderTestimonial;