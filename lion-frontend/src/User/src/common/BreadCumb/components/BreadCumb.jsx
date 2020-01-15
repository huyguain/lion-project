import React, { Component } from 'react';
import './BreadCumb.css';
import Home from 'react-icons/lib/md/home';
// 0
class BreadCrumb extends Component {
    constructor(props) {
        super(props)
    }
    // routes = [
    //     {
    //         path: "/list-job/fresher",
    //         title: "Fresher"
    //     },
    //     {
    //         path: "/list-job/intern",
    //         title: "Intern"
    //     },
    //     {
    //         path: '/list-job/junior',
    //         title: "Junior"
    //     }
    // ]
    linkTo(i) {
        const {pathname ,history} = this.props
        let pathnameArray = pathname.substr(1).split('/')
        console.log(i, pathnameArray.length)
        if ((i + 1) !== pathnameArray.length) {
            let t = pathname.split('/').slice(0, i + 2).join('/')
            history.push(t)
        }
    }
    render() {
        const { pathname, history } = this.props
        return (
            <div className="wrap-breadcrum-user">
                <span className="detail-bread-crum-user">
                    <span onClick={_ => history.push('/')} style={{ color: "#f57002" }}>
                        <Home style={{ marginBottom: "2px" }}/>Home&nbsp;
                    </span>
                    {
                        pathname.substr(1).split('/').map((e, i) => {
                            return (
                                <span className="path-name" key={i} 
                                    onClick={_ => this.linkTo(i)}>
                                / {e}&nbsp;
                                </span>
                            )
                        })
                    }
                </span>
            </div>
        )
    }
}

export default BreadCrumb;