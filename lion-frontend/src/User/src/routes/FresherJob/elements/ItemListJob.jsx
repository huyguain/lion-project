import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import slug from 'slug';
import { Link } from 'react-router-dom';

const ItemListJob = props => {
    const convertUrl = (text) =>  slug(text.toLowerCase().trim())
    const { item, category, history } = props;
    const location = item[0]
    return (
        <div className={'itemListJob'}>
            <div className={'itemListJobTitle'}>
                <p className={classNames('itemLeft',
                    'itemTitle', 'itemLocation')} onClick={_ => history.push(`/list-job/location-${convertUrl(location)}`)}>{location}</p>
                <p className={classNames('itemRight',
                    'itemTitle', 'itemBeginDate')}>Lịch khai giảng</p>
            </div>
            {
                item[1].map((i, index) => (
                    <div className={'itemListJobContent'} key={i.id + index}>
                        <p className={classNames('itemLeft', 'itemContent')}
                            onClick={_ => history.push(`/list-job/category-${i.category.title}/${convertUrl(i.title)}&${i._id}`)}
                        >
                            {i.title}
                        </p>
                        <p className={classNames('itemRight',
                            'itemTitle', 'itemContentBegin')}>{moment(i.joinDate).format('DD/MM/YYYY')}</p>
                    </div>
                ))
            }
        </div >     
    )
}

export default ItemListJob;