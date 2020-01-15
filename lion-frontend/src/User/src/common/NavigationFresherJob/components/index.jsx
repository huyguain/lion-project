import React from 'react';
import backgound from '../assets/Layer5491.png';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './index.css';

const NavFresher = props => {
    console.log('props', props)
    const categoryTitle = props.category.title;
    let title, linkTo;
    if (categoryTitle == 'intern') { title = 'Thực tập'; linkTo = `/introduce-listing/ve-chuong-trinh-thuc-tap`; }
    else if (categoryTitle == 'fresher') { title = 'Fresher'; linkTo = `/introduce-listing/ve-chuong-trinh-fresher`; }
    else { title = 'Đi làm'; linkTo = `/introduce-listing/ve-chuong-trinh-di-lam-ngay`; }
    return (
        <div className={classNames('backgoundNavFS', 'col-md-3 col-sm-3 col-lg-3')}
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.45) 0%,rgba(0,0,0,0.45) 80%), url(${backgound})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}>
            <div className={'listMenuNavination'}>
                <p className={'navinationTitle'}>Các Vị Trí Đang Tuyển</p>
                <div className={'lineTitle'} />
                <Link to={`${linkTo}`} className={'navinationContentTitle'}>Về chương trình {title}</Link>
                <Link to='/introduce-listing/ve-fresher-academy' className={'navinationContentTitle'}>Về Fresher Academy</Link>
                <Link to='/introduce-listing/lien-he' className={'navinationContentTitle'}>Liên hệ</Link>
            </div>
        </div>
    )
}

export default NavFresher;