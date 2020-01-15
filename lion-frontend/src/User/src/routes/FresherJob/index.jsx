import React, { Component } from 'react';
import classNames from 'classnames';
// import FresherJobForm from './elements/FresherJobForm';
import FresherListJob from './elements/FresherListJob';
import config from '../../../../config'
import axios from 'axios'

import Banner from '../../common/BannerFresher';
import NavigationFresher from '../../common/NavigationFresherJob';
import FresherJobForm from '../../common/FresherJobForm';
import BreadCumb from '../../common/BreadCumb'
import './index.css';

class FresherJob extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            category: {}
        }
    }
    componentDidMount() {
        const { category, location, hashtag } = this.props.match.params
        if (category) {
            axios.get(`${config.host}/list-jobs/category/${category}`).
                then(
                data => {
                    this.setState({ data: data.data.data })
                }
                ).catch(
                err => console.log(err)
                )
            axios.get(`${config.host}/getCategoryByTitle/${category}`).
                then(
                data => {
                    this.setState({ category: data.data.data[0] })
                }
                ).catch(
                err => console.log(err)
                )
        }
        else if(location) {
            axios.get(`${config.host}/list-jobs/location/${location}`).
                then(
                data => {
                    console.log('data-location', location)
                    this.setState({ data: data.data.data })
                }
                ).catch(
                err => console.log(err)
                )
        }
        else if(hashtag) {
            axios.get(`${config.host}/list-jobs/hashtag/${hashtag}`).
                then(
                data => {
                    this.setState({ data: data.data.data })
                }
                ).catch(
                err => console.log(err)
                )
        }
        else {
            axios.get(`${config.host}/list-jobs`).
                then(
                data => {
                    this.setState({ data: data.data.data })
                }
                ).catch(
                err => console.log(err)
                )
        }            
    }
    componentWillReceiveProps(newProps) {
        console.log('newProps-co gi hot', newProps)
        const { location, hashtag } = newProps.match.params
        console.log('location', location)
        console.log('hashtag', hashtag)
        if(location) {
            axios.get(`${config.host}/list-jobs/location/${location}`).
                then(
                data => {
                    console.log('data-location', location)
                    console.log('data', data)
                    this.setState({ data: data.data.data })
                }
                ).catch(
                err => console.log(err)
                )
        }
        else if(hashtag) {
            axios.get(`${config.host}/list-jobs/hashtag/${hashtag}`).
                then(
                data => {
                    this.setState({ data: data.data.data })
                }
                ).catch(
                err => console.log(err)
                )
        }
        else {
            axios.get(`${config.host}/list-jobs`).
                then(
                data => {
                    this.setState({ data: data.data.data })
                }
                ).catch(
                err => console.log(err)
                )
        } 
    }
    render() {
        const { data, category } = this.state,
            { history } = this.props;
        if (!data) return (<div></div>)
        return (
            <div className={classNames('row')}>
                <Banner
                    category={category}
                />
                <div className={'bodyPage'}>
                    <BreadCumb
                        pathname={this.props.location.pathname}
                        history={this.props.history}
                    />
                    <div className={classNames('containList', 'row')}>
                        <NavigationFresher category={category} />
                        <FresherListJob
                            data={data}
                            category={category}
                            history={history}
                        />
                    </div>
                    <FresherJobForm category={category} />
                </div>
            </div>
        )
    }
}


export default FresherJob;