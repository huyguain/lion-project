import React, { Component } from 'react';
import './BreadCrumb.css';
import Home from 'react-icons/lib/md/home';
import Breadcrumbs from 'react-router-dynamic-breadcrumbs';
// 0
const routers = {
    '/admin': 'Home',
    '/admin/admin': 'Admin',
    '/admin/admin/create-admin': 'Create Admin',
    '/admin/candidate': 'Candidate',
    '/admin/candidate/create-candidate': 'Create Candidate',
    '/admin/english': 'English',
    '/admin/question': 'Question',
    '/admin/template': 'Template',
    '/admin/template/create-template': 'Create Template',
    '/admin/generate': 'Generate',
    '/admin/generate/generate-code': 'Gennerate Code',
    '/admin/panel': 'Panel',
    '/admin/panel/create-panel': 'Create Panel',
    '/admin/post': 'Post',
    '/admin/post/create-post': 'Create Post',
    '/admin/course/create-course': 'Create Course',
    '/admin/course': 'Course'
}
class BreadCrumb extends Component {
    routess = [
        {
            path: "/admin/generate",
            title: "GENERATE"
        },
        {
            path: "/admin/candidate",
            title: "CANDIDATE"
        },
        {
            path: '/admin/template',
            title: "TEMPLATE"
        },
        {
            path: '/admin/question',
            title: "QUESTION"
        },
        {
            path: '/admin/admin',
            title: 'Admin'
        },
        {
            path: '/admin/learning-path',
            title: 'LEARNING PATH'
        },
        {
            path: '/admin/panel',
            title: "PANEL"
        },
        {
            path: '/admin/post',
            title: "POST"
        },
        {
            path: '/admin/manager',
            title: "ADMIN"
        },
        {
            path: '/admin/course',
            title: "COURSE"
        },
        {
            path: '/admin/english',
            title: "ENGLISH"
        }
    ]
    getTitle(pathname) {
        return this.routess.map((route, index) => {
            return pathname.match(route.path) ? route.title : ""
        })
    }
    render() {
        const { pathname } = this.props.location;
        return (
            <div className="wrap-breadcrum-admin">
                <div className="title1">
                    {this.getTitle(pathname)}
                </div>
                <div className="detail-bread-crum">
                    <Home />
                    <div>
                        <Breadcrumbs
                            WrapperComponent={(props) => <ul className="mybreadcrumb" >{props.children}</ul>}
                            ActiveLinkComponent={(props) => <li className="active" >{props.children}</li>}
                            LinkComponent={(props) => <li>{props.children}</li>}
                            mappedRoutes={routers} />
                    </div>

                </div>
            </div>
        )
    }
}

export default BreadCrumb;