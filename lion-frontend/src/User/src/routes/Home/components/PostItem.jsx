import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../../../../config';

class PostItem extends Component {
    getPadding(index) {
        let padding = '0px 0px 0px 0px';
        switch (index) {
            case 0: padding = '0px 3px 0px 0px'; break;
            case 3: padding = '0px 0px 0px 3px'; break;
            default: padding = '0px 3px 0px'; break;
        }
        return padding;
    }
    render() {
        const { index, post, goTo } = this.props;
        const { title, description, urlImage, titleView, id } = post;
        let category = (index == 0)
            ? '/list-job/category-intern' : (index == 1)
                ? '/list-job/category-fresher' : (index == 2)
                    ? '/list-job/category-junior' : (index == 3)
                        ? `/introduce-listing/lien-he` : ''
        return (
            <div className="col-lg-3 col-md-3"
                style={{ padding: this.getPadding(index) }}
            >
                <img className="card-Img-top"
                    height='100%'
                    width='100%'
                    src={`${urlImage}`} alt="post"
                    onClick={_ => goTo(`${category}`)}
                />
                <div className="cardPostBlock">
                    <h4 className="PostItem-Title" onClick={_ => goTo(`${category}`)}>{title}</h4>
                    <div className="ListPostItemDescription">
                        {
                            description.map(item => (
                                <div key={Math.random()} className="PostItemDescription"> {item}</div>
                            ))
                        }
                    </div>
                    <div className="applyPostItem" onClick={_ => goTo(`${category}`)}>
                        <img className="arrow-apply"
                            src={require("../assets/arrow-apply.png")}
                            alt="arrow" />
                        <div style={{ textDecoration: 'none' }}>
                            <div className="applytitlePostItem">{titleView}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default PostItem;