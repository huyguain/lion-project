import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import config from '../../../../../../config'

const ShowElments = props => {
    const { data, reverse, onClick = {} } = props;
    return (
        <div className={classNames('row', 'rowPost')}>
            <img src={config.imageUrl + '/' + data.urlImage} className={classNames('col-md-6',
                reverse ? 'order-md-2' : '')} height='100%' onClick={_ => onClick()}
                alt='error'
            />
            <div className={classNames('col-md-6',
                reverse ? 'order-md-1' : '',
                reverse ? 'contextPostRight' : 'contextPostLeft',
                'contextPost'
            )}>
                <p className={'datetimeText'}>
                    <span className={'lateText'}>{data.category === 'Page' ? 'Giới Thiệu ' : data.category}</span>
                    - {moment(data.update_at).format('ll')}</p>
                <p className={classNames('titleText',
                    reverse ? 'contextPostRight' : 'contextPostLeft', )}
                    onClick={_ => onClick()}>{data.title}</p>
                <p className={'contentPostText'}>{data.description}</p>
            </div>
        </div >
    )
}

export default ShowElments;