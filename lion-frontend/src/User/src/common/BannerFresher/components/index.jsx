import React from 'react';
import './index.css';

import config from '../../../../../config'

const Banner = props => {
    const { category } = props;
    const categoryTitle = props.category.title;
    let title;
    if (categoryTitle == 'intern') title = 'Thực tập'
    else if (categoryTitle == 'fresher') title = 'Fresher'
    else title = 'Đi làm'
    return (
        <div className={'bodyBanner'}
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%,rgba(0,0,0,0.4) 80%) ,url(${config.imageUrl}/${category.urlImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%'
            }}>
            <div className={'mainContent'}>
                {`Chương trình (${title})`}
            </div>
        </div>
    )
}

Banner.defaultProps = {
    category: {
        urlImage: '0qgbxxrn9j_banner.png',
        title: 'FPT software',
        description: '<p>FPTsoftware<p>'
    }
}
export default Banner;