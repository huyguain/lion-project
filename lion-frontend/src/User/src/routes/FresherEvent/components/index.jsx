import React, { Component } from 'react';
import classNames from 'classnames';
import SliderImage from './elements/Slider';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import config from '../../../../../config'
import BreadCumb from '../../../common/BreadCumb'
import './index.css';

class FresherEvent extends Component {
    constructor() {
        super();
        this.state = {
            listImage: [],
            listHashTag: [],
            content: '',
            category: ''
        }
    }
    getData() {
        const { link_url } = this.props.match.params;
        const order = {
            link_url,
            category: 'Page'
        }
        axios.post(`${config.host}/list-post-order`, { order })
            .then(res => {
                const { content, description,
                    title, urlImageSlider = [], hashTag = [], category } = res.data.data[0] ? res.data.data[0] : {};
                this.setState({
                    title, description,
                    listImage: urlImageSlider.map(item => ({
                        preview: `${config.imageUrl}/${item}`
                    })),
                    listHashTag: hashTag,
                    content,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    componentDidUpdate(prevProps, prevState) {
        let { link_url } = this.props.match.params;
        if (prevProps.match.params.link_url !== link_url) {
            this.getData();
            window.scrollTo(0, 0)
        }
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        const { content,
            title, listImage, listHashTag, category, description } = this.state;
        const pathname = this.props.location.pathname;
        return (
            <div style={{ paddingTop: 15 }}>
                <div style={{ paddingLeft: '12%' }}>
                    <BreadCumb
                        pathname={pathname}
                        history={this.props.history}
                    />
                </div>
                <div className={classNames('bodyPageEvent', 'row')}>

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <button className={'specialEventbtn'}>{'Giới thiệu'}</button>
                    </div>
                    <p className={'eventTitle'}>
                        {title}
                    </p>
                    {
                        listImage.length >= 4 && <SliderImage
                            data={listImage}
                        />
                    }
                    <div className={'contentEvent'}>
                        {description}
                        {
                            ReactHtmlParser(content)
                        }
                    </div>
                    <div className={'contentEvent'} style={{
                        borderBottomColor: '#ababab',
                        marginTop: 0,
                        paddingTop: 18, paddingBottom: 18,
                        display: 'flex', alignItems: 'center'
                    }}>
                        {
                            listHashTag.map((item, index) => (
                                <div key={index + Math.random()}
                                    className={'hasTagEvent'}>{item}</div>
                            ))
                        }
                    </div>
                    <div className={'shareEvent'}>
                        <div className={'shareWithFace'}>
                            <i className={classNames("fa fa-facebook-square")} style={{ marginRight: 15 }} />
                            Share
                    </div>
                        <div className={'shareWithFace'} style={{ backgroundColor: '#1dcaff' }}>
                            <i className={classNames("fa fa-twitter")} style={{ marginRight: 15 }} />
                            Share
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FresherEvent;