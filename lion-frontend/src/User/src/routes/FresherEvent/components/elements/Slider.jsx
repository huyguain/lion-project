import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow(props) {
    const { className, style, onClick } = props
    return (
        <div
            className={classNames('slick-arrow', 'nextArrowEvent')}
            onClick={onClick}>
            <i className='fa fa-chevron-right' />
        </div>
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props
    return (
        <div
            className={classNames('slick-arrow', 'prevArrowEvent')}
            onClick={onClick}>
            <i className='fa fa-chevron-left' />
        </div>
    );
}
const SliderEvent = props => {
    const { data } = props;
    const settings = {
        dots: false,
        dotsClass: 'slick-dots slick-thumb',
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 4000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: false
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    }
    return (
        <div className={'bodySlider'}>
            <Slider {...settings}>
                {
                    data.map((item, index) => (
                        <div className={'itemSlider'}
                            key={`${item.id}+${index}`}
                        >
                            <img width='100%' height='300px' src={item.preview} />
                        </div>
                    ))}
            </Slider>
        </div>
    )
}

export default SliderEvent;