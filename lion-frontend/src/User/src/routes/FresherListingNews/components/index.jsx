import React, { Component } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import ShowElements from './elements/ShowElements';
import Carousel from '../../../common/Carousel';
import config from '../../../../../config'

import './index.css';

class FresherList extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            count: -1,
            dataNews: [],
            listSlide: [],
            paramCategory: '',
        }
    }
    setPage(count) {
        let { category } = this.props.match.params;
        const { path } = this.props.match;
        const paramCategory = category;
        if (!category && path === "/introduce-listing") {
            axios.post(`${config.host}/list-post-order`, {
                order: { category: "Page" }
            })
                .then(res => {
                    if (res.status === 200) {
                        const dataNews = res.data.data;
                        this.setState({
                            title: 'Giới thiệu',
                            dataNews, count, paramCategory,
                            displaySearch: 'none', path
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else if (!category && path === "/fresher/fresher-listing") {
            axios.post(`${config.host}/search-post`, {
                order: { value: " " }
            })
                .then(res => {
                    if (res.status === 200) {
                        const dataNews = res.data.data;
                        this.setState({
                            title: 'Tin tức sự kiện',
                            dataNews, count, paramCategory,
                            displaySearch: 'none', path
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            category =
                category === 'doi-song' ? 'Đời Sống' :
                    category === 'su-kien' ? 'Sự Kiện' :
                        category === 'tam-su' ? 'Tâm Sự' : '';
            const linkCallAPI = category !== '' ? `${config.host}/list-post-order` :
                `${config.host}/search-post`;
            axios.post(linkCallAPI, {
                order: category === '' ?
                    { value: paramCategory } : { category }
            })
                .then(res => {
                    if (res.status === 200) {
                        const dataNews = res.data.data;
                        this.setState({
                            title: 'Tin tức sự kiện', path,
                            dataNews, count, paramCategory,
                            displaySearch: category !== '' ? 'none' : 'block'
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        let { category } = this.props.match.params;
        const { path } = this.props.match;
        if (this.state.paramCategory !== category || this.state.path !== path) {
            this.setPage(0);
            window.scrollTo(0, 0)
        }
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
    getCategory(category) {
        switch (category) {
            case 'Đời Sống': return 'doi-song';
            case 'Sự Kiện': return 'su-kien';
            case 'Tâm Sự': return 'tam-su';
            default: return 'category';
        }
    }
    render() {
        const { count, dataNews, paramCategory, displaySearch, title } = this.state;
        const data = dataNews.slice(0, count * 4 + 4);
        const { history } = this.props;
        if (count === -1) this.setPage(0);
        return (
            <div className={classNames('bodyPageListing', 'row')}>
                <div className={classNames('contentPage')}>
                    {
                        paramCategory && paramCategory !== ' ' && <div className='SearchText' style={{ display: displaySearch, fontSize: 20 }}>
                            Kết quả tìm kiếm với từ khóa: {paramCategory}
                        </div>
                    }

                    <Carousel history={history} slides={this.state.listSlide} heightShow={330} interval={5000} autoPlay={this.state.autoPlay} />
                    <p className={'contentTitle'} style={{ marginTop: 30 }}>{title}</p>
                    <div className={'contentShape'} />
                    <div className={classNames('container-fluid', 'contentPost')}>
                        {
                            data.map((item, index) =>
                                <ShowElements
                                    key={Math.random() + index}
                                    data={item}
                                    reverse={index % 2 === 1}
                                    onClick={_ =>
                                        history.push(item.category === 'Page' ? `/introduce-listing/${item.link_url}` :
                                            `/news-listing/${this.getCategory(item.category)}/${item.link_url}`)
                                    }
                                />
                            )
                        }
                    </div>
                    <button className={'buttonShowMore'}
                        onClick={_ => this.setState({ count: count + 1 })}
                        style={{ display: (count * 4 + 4) >= dataNews.length ? 'none' : 'block' }}
                    >Xem Thêm</button>
                </div>
            </div >
        )
    }
}

export default FresherList;