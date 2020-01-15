import React, { Component } from 'react';
import NavContentItem from './NavContentItem';

class NavContentListItem extends Component {
    render() {
        const { listitem, result, idCourse, history } = this.props;
        let arrLecture = []
        result.map(v => {
            v.lectureIds.map(val => {
                let obj = {
                    idLecture: val._id,
                    result: val.result
                }
                arrLecture.push(obj)
            })
        })
        return (
            <div className={'NavContentListItem'}>
                <div className={'NavContentTitle'}>Category</div>
                <div className={'navMenuScrollbar'}
                    id={'styleScrollbarVideo'}
                >
                    <ul style={{ padding: 0 }}>
                        {
                            listitem.map(item =>
                                <NavContentItem
                                    key={Math.random() + JSON.stringify(item)}
                                    content={item}
                                    naviLecture={this.props.naviLecture}
                                    result={arrLecture}
                                    idCourse={idCourse}
                                    history={history}
                                />
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default NavContentListItem;