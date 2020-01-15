import React, { Component } from 'react';
import config from '../../../../../config'
import moment from 'moment';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import BreadCumb from '../../../common/BreadCumb'
import classNames from 'classnames';

import './NewDetail.css';


class ViewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            urlImage: '',
            hashTag: [],
            category: [],
            update_at: new Date(),
            postInvolve: [],
            postInvolveHight: [],
        }
    }
    getDetal = async () => {
        const { link_url } = this.props.match.params;
        let data = [];
        const order = {
            link_url
        }
        await axios.post(`${config.host}/list-post-order`, { order })
            .then(res => {
                data = res.data.data;
            })
            .catch(err => {
                data = []
            })
        return data.length !== 0 ? data[0] : this.state;
    }
    getNewInvolve = async (category, status) => {
        const { link_url } = this.props.match.params;
        let data;
        if (!category) data = [];
        const order = {
            category,
            status
        }
        await axios.post(`${config.host}/list-post-order`, { order })
            .then(res => {
                data = res.data.data;
            })
            .catch(err => {
                data = [];
            })
        return data.filter(item => item.link_url !== link_url);
    }
    getData = async () => {
        let { link_url } = this.props.match.params;
        const { title, content,
            hashTag, category, update_at, urlImage, description } = await this.getDetal();
        const postInvolve = await this.getNewInvolve(category);
        const postInvolveHight = await this.getNewInvolve(category, true);
        this.setState({
            urlImage,
            title, content, description,
            hashTag, category, update_at, postInvolve, postInvolveHight
        });
    }
    componentDidUpdate(prevProps, prevState) {
        let { link_url } = this.props.match.params;
        if (prevProps.match.params.link_url !== link_url) {
            this.getData();
            window.scrollTo(0, 0);
        }
    }
    componentDidMount() {
        this.getData();
        window.scrollTo(0, 0);        
    }
    getCategory(category) {
        switch (category) {
            case 'Đời Sống': return 'doi-song';
            case 'Sự Kiện': return 'su-kien';
            case 'Tâm Sự': return 'tam-su';
            default: return 'category';
        }
    }
    render() {
        const { title, content, hashTag, category,
            update_at, postInvolve, postInvolveHight, urlImage, description } = this.state;
        const { history } = this.props;
        const pathname = this.props.location.pathname;
        return (
            <div className="content-newdetail">
                <div className="row" style={{ width: '100%' }}>
                    <div className="newdetail-content col-sm-8 col-xs-8 col-md-8 col-lg-8">
                        <BreadCumb
                            pathname={pathname}
                            history={this.props.history}
                        />
                        <p className="title-newdetail">{title}</p>
                        <div className="job-time-social">
                            <div className="huong-nghiep">{`-- ${category}`}</div>
                            <div className="time">
                                <i className="fa fa-clock-o" style={{ marginRight: 5 }}></i>
                                {moment(update_at).format('hh:mm DD/MM/YYYY')}
                            </div>
                            {/* <div className="icon-social">
                                <i class="fa fa-facebook icon-social-facebook img1"></i>
                                <i class="fa fa-google-plus icon-social-google img1"></i>
                                <i class="fa fa-twitter icon-social-twitter img1"></i>
                                <i class="fa fa-youtube-play icon-social-youtube img1"></i>
                            </div> */}
                        </div>
                        <div className="post-relate">
                            <ul style={{ marginBottom: 0 }}>
                                {
                                    postInvolve.slice(0, 3).map(item => (
                                        <li key={Math.random()} className='li-post-relate'
                                            onClick={_ => history.push(
                                                `/news-listing/${this.getCategory(item.category)}/${item.link_url}`)}
                                        >
                                            {item.title}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className='post-content'>
                            <img src={config.imageUrl + '/' + urlImage} width='100%' alt='error' />
                            <div className="post-nav-content" style={{ fontSize: 14, marginTop: 10, marginBottom: 15 }}>
                                {description}
                            </div>
                            {
                                ReactHtmlParser(content)
                            }
                        </div>
                        <div className={'shareEvent'}>
                            <div className={'shareWithFace'}>
                                <i className={classNames("fa fa-thumbs-up")} style={{ marginRight: 15 }} />
                                Like
                        </div>
                            <div className={'shareWithFace'}>
                                <i className={classNames("fa fa-facebook-square")} style={{ marginRight: 15 }} />
                                Share
                            </div>
                        </div>
                        <div className="hash-tag">
                            {
                                hashTag.map((item, index) => (
                                    <div className='hash-tag-item' key={index + Math.random()}>
                                        {item}
                                    </div>
                                ))
                            }
                        </div>
                        <textarea className="facebook-comment"
                            placeholder='FACEBOOK COMMENT'
                        >
                        </textarea>
                    </div>
                    <div className="nav-register col-sm-4 col-xs-4 col-md-4 col-lg-4">
                        <div className="newdetail-nav">
                            <div className="newdetail-nav-search">
                                <i className="fa fa-search" style={{
                                    position: 'absolute', color: '#888888',
                                    fontSize: 18, zIndex: 2, top: '35%', right: '12%'
                                }}
                                    onClick={() => history.push(`/news-listing/${this.refs.searchInput.value.trim()}`)}
                                ></i>
                                <input
                                    type="text"
                                    placeholder="Nhập từ khóa"
                                    ref="searchInput"
                                    onKeyDown={event => event.keyCode == 13 && history.push(`/news-listing/${this.refs.searchInput.value.trim()}`)}
                                />
                            </div>
                            <div className="post-nav-note">
                                BÀI VIẾT NỔI BẬT
                                </div>
                            {
                                postInvolveHight.slice(0, 5).map((item, index) => (
                                    <div className={`post-nav ${(index === postInvolveHight.length - 1 || index === 4) && 'post-navbt'}`}
                                        key={Math.random()}>
                                        <div className="post-nav-title"
                                            onClick={_ => history.push(`/news-listing/${this.getCategory(item.category)}/${item.link_url}`)}>
                                            {item.title}
                                        </div>
                                        <div class="post-nav-content">
                                            {item.description}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="back-hr"
                        onClick={_ => history.push(`/news-listing/${this.getCategory(category)}`)}>
                        <i className="fa fa-chevron-left"></i>
                    </div>
                </div>
            </div >
        )
    }
}

export default ViewPost;