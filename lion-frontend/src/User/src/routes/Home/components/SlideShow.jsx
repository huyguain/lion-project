import React, { Component } from 'react';
import axios from 'axios';
import config from '../../../../../config'
import Carousel from '../../../common/Carousel';

class SlideShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSlide: [],
            autoPlay: false
        };
    }
    componentDidMount() {
        axios.get(`${config.host}/limit-list-panel`)
            .then(res => {
                const { data } = res.data;
                this.setState({ listSlide: data })
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        return (
            <Carousel slides={this.state.listSlide}
                interval={5000} autoPlay={this.state.autoPlay}
                history={this.props.history}
            />
        )
    }
}
export default SlideShow;