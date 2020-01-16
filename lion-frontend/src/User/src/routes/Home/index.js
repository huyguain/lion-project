import React, { Component } from 'react';
import './components/home.css';
import SlideShow from './components/SlideShow';
import Utility from './components/Utility';
import Utility2 from './components/Utility2';
import PostList from './components/PostList';
import LogoList from './components/LogoList';
import HotKeywordsComponent from './components/hot-keywords/HotKeywords.component';

class Home extends Component {
    goTo = url => {
        const { history } = this.props;
        history.push(`${url}`)
    }
    render() {
        return (
            <div className="container-fluid">
                {/* <SlideShow history={this.props.history} /> */}
                {/* <Utility2 /> */}
                <HotKeywordsComponent />
                {/* <PostList goTo={this.goTo} /> */}
                {/* <Utility /> */}
                {/* <LogoList /> */}
            </div>
        )
    }
}

export default Home;