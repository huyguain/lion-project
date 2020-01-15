import React from 'react';
import classNames from 'classnames';
import ItemListJob from './ItemListJob';
import ReactHtmlParser from 'react-html-parser';

const FresherListJob = props => {
    const { data, category, history } = props;
    let newData = new Map()
    for (let value of data) {
        if (newData.has(value.location.zone)) {
            newData.set(value.location.zone, newData.get(value.location.zone).concat(value))
        } else {
            newData.set(value.location.zone, [value])
        }
    }
    newData = [...newData]
    const categoryTitle = props.category.title;
    let title;
    if (categoryTitle == 'intern') title = 'Thực tập'
    else if (categoryTitle == 'fresher') title = 'Fresher'
    else title = 'Đi làm'
    return (
        <div className={classNames('FhListJob', 'col-md-9', 'col-sm-9', 'col-lg-9')}>
            <p className={'FhListJobTitle'}>
                Các vị trí {title} đang tuyển
            </p>
            <div className={'FhListJobIntroduce'}>
                {ReactHtmlParser(category.description)}
            </div>
            {
                newData.map((item, index) => (
                    <ItemListJob
                        item={item}
                        category={category}
                        history={history}
                    />
                ))
            }
        </div>
    )
}

FresherListJob.defaultProps = {
    category: {
        urlImage: '0qgbxxrn9j_banner.png',
        title: 'FPT software',
        description: '<p>FPTsoftware<p>'
    }
}

export default FresherListJob;