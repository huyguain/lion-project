import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import './DetailJob.css';
import axios from 'axios'
import config from '../../../../../config'
import moment from 'moment'
import TestimonialSlider from '../../../common/TestimonialSlider'
import ReactHtmlParser from 'react-html-parser';
import FresherJobForm from '../../../common/FresherJobForm'
import NavigationFresher from '../../../common/NavigationFresherJob';
import BreadCumb from '../../../common/BreadCumb'

class DetailJob extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            shouldShowModal: 'none'
        }
        // const modal = document.getElementById('applyModal');
        //     window.onclick = function(event) {
        //     if (event.target == modal) {
        //         modal.style.display = "none";
        //     }
        // }
    }
    componentDidMount() {
        const { idJob, titleJob } = this.props.match.params
        axios.get(`${config.host}/get-job/${idJob}`).
            then(
            data => {
                this.setState({ data: data.data.data[0] })
            }
            ).catch(
            err => console.log(err)
            )
    }
    hiddenModal() {
        this.setState({ shouldShowModal: 'none' })
    }
    render() {
        const settings = {
            className: 'center',
            centerMode: true,
            infinite: true,
            centerPadding: '60px',
            slidesToShow: 3,
            speed: 500,
        };
        const { category, content, deadlineSubmit, hashTag, location, offer, salary, title } = this.state.data,
            { shouldShowModal } = this.state
        let disabledApply
        const { idJob, titleJob } = this.props.match.params
        if (deadlineSubmit) {
            disabledApply = ((new Date(deadlineSubmit).getTime()) < Date.now()) ? true : false
        }
        if (!category) return (<div></div>)
        return (
            <div className={'bodyPage'}>
                <div className="ff-detail">
                    <BreadCumb
                        pathname={this.props.location.pathname}
                        history={this.props.history}
                    />
                    <div className="containList row">
                        <NavigationFresher category={category} />
                        <div className="ff-detail-content col-xs-9 col-sm-9 col-md-9 col-lg-9">
                            <div className="ff-title">
                                {title}
                            </div>
                            <div className="ff-description">
                                <div className="salary-location">
                                    <div className="bonus-salary">
                                        <span className="salary">{salary.toLocaleString('en')} VND</span>
                                    </div>
                                    <div className="word-location">
                                        <i className="fa fa-map-marker"></i>
                                        <b>Word location</b>: {location ? location.zone : ''}
                                    </div>
                                </div>
                                <div className="submit-profile">
                                    <div>Hạn nộp hồ sơ: <span style={{ color: 'red', fontWeight: "bold" }}>{moment(deadlineSubmit).format('DD/MM/YYYY')}</span></div>
                                    {
                                        disabledApply ? (
                                            <div></div>
                                        ) : (
                                                <div className="apply-job" onClick={_ => this.setState({ shouldShowModal: 'flex' })}>
                                                    ỨNG TUYỂN
                                            </div>
                                            )
                                    }
                                </div>
                            </div>
                            <div className="ff-content">
                                {ReactHtmlParser(content)}
                            </div>
                            <div className="can-offer">
                                <div className="can-offer-title">WHAT WE CAN OFFER</div>
                                <div className="row can-offer-items">
                                    {
                                        offer.map((e, i) => {
                                            return (
                                                <div className="can-offer-item col-lg-6" key={i}>
                                                    <i class={`fa ${e.icon} icon-offer`}></i>
                                                    <div className="offer-text">{e.content}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="tech-skill">
                                <div className="tech-skill-title">TECH SKILL</div>
                                <div className="tech-skill-items">
                                    {
                                        hashTag.map((e, i) => {
                                            return (
                                                <div key={i} className="tech-skill-item"
                                                    onClick={_ => this.props.history.push(`/list-job/hashtag-${e}`)}
                                                >
                                                    {e}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="applyModal" className="apply-modal"
                    style={{
                        display: this.state.shouldShowModal,
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 99
                    }}>
                    <FresherJobForm
                        hiddenModal={() => this.hiddenModal()}
                        location={location}
                        category={category}
                        idJob={idJob}
                        titleJob={titleJob}
                    />
                </div>
                <TestimonialSlider />
            </div>
        )
    }
}

export default DetailJob;