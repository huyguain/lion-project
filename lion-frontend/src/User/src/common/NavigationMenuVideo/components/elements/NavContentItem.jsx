import React, { Component } from 'react';
import className from 'classnames';
import moment from 'moment'

class NavContentItem extends Component {
    getIdVideo(urlVideo) {
        let idVideo
        idVideo = urlVideo.split('?v=')[1]
        let end = idVideo.indexOf('&') + 1 ? idVideo.indexOf('&') : idVideo.length
        idVideo = idVideo.substring(0, end)
        return idVideo
    }
    Quiz = (history, idCourse, idSection, idLecture) => {
        // console.log('sdaddad', history)
        history.push(`/quiz/${idCourse}/${idSection}/${idLecture}`);
    }
    render() {
        const { section, lectures, _id } = this.props.content;
        const { result, idCourse, history } = this.props
        let arr = [];
        lectures.forEach(item => {
            result.map(value => {
                if (value.idLecture === item._id) {
                    item.check = value.result
                }
            })
        })
        return (
            <li className={'NavContentItem'}>
                <div className={'NavContentItemTitle'}>{section}</div>
                <ul className={'NavListItemLecture'}>
                    {
                        lectures.map(item =>
                            <li className={'NavItemLecture'}
                                key={JSON.stringify(item) + Math.random()}>
                                <div className={'NavItemLectureFinish'}>
                                    <i class={className(
                                        item.check ? "fa fa-check-circle" : "fa fa-play-circle",
                                        item.check ? 'NavItemLectureIconFinished' : 'NavItemLectureIconNotFinished')}></i>
                                </div>
                                {
                                    item.title ? (<div className={'NavItemLectureTitle'}
                                        onClick={() => this.props.naviLecture(this.getIdVideo(item.urlVideo), item._id)}>
                                        {item.title}
                                    </div>) : (<div className={'NavItemLectureTitle'}
                                        onClick={_ => this.Quiz(history, idCourse, _id, item._id)}
                                    >
                                        {item.type}
                                    </div>)
                                }
                                < div className={'NavItemLectureTime'} >
                                    {moment.duration(item.duration * 1000).minutes() + moment.duration(item.duration * 1000).hours() * 60} : {moment.duration(item.duration * 1000).seconds()}
                                </div>
                            </li>
                        )
                    }

                </ul>
            </li>
        )
    }
}

export default NavContentItem;