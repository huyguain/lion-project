import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import Loader from 'react-loader';
import Footer from './common/Footer';
import Header from './common/Header';
import Home from './routes/Home';
import TestCode from './routes/TestCode/';
import TestStart from './routes/TestStart';
import TestDetail from './routes/TestDetail';
import TestFinish from './routes/TestFinish';
import ViewPost from '../src/routes/ViewPost';
import DetailJob from '../src/routes/DetailJob';
import { checkCode } from '../../utility';
import Course from './routes/Course';
import Quiz from './routes/Quiz';
import CourseOpen from './routes/CourseOpen/CourseOpen.jsx';
import ViewVideo from './routes/ViewVideo';
import FresherJob from './routes/FresherJob';
import FresherListing from './routes/FresherListingNews';
import FresherEvent from './routes/FresherEvent';
import NewDetail from './routes/NewDetail';

const TestRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        checkCode() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: '/test' }} />
            )
    )} />
)
const UserApp = (props) => {
    return (
        <Switch>
            <div className='root' style={{ marginLeft: 5, marginRight: 5, background: "#fafafa" }}>
                {/* <Route component={Header} /> */}
                <Switch >
                    <Route path="/" exact component={Home} />
                    <Route path="/test" exact component={TestCode} />
                    {<Route path="/view-post/:idPost" exact component={ViewPost} />}
                    <TestRoute exact path="/test/test-start" component={TestStart} />
                    <TestRoute exact path="/test/test-detail" component={TestDetail} />
                    <TestRoute exact path="/test/test-finish" component={TestFinish} />
                    <Route path="/list-myCourse" component={Course} />
                    <Route path="/course-open" component={CourseOpen} />
                    <Route path="/video/:idVideo/:idCourse/:idLecture" component={ViewVideo} />
                    <Route path="/quiz/:idCourse/:idSection/:idLecture" component={Quiz} />

                    <Route path='/introduce-listing' exact component={FresherListing} />
                    <Route path='/introduce-listing/:link_url' component={FresherEvent} />

                    <Route path='/news-listing' exact component={FresherListing} />
                    <Route path='/news-listing/:category' exact component={FresherListing} />
                    <Route path='/news-listing/:category/:link_url' exact component={NewDetail} />
                    {/*job*/}
                    <Route path='/list-job' exact component={FresherJob} />
                    <Route name='list-job-category' path='/list-job/category-:category' exact component={FresherJob} />
                    <Route name='list-job-location' path='/list-job/location-:location' exact component={FresherJob} />
                    <Route name='list-job-hashtag' path='/list-job/hashtag-:hashtag' exact component={FresherJob} />
                    <Route name='jobCategory' path="/list-job/category-:category/:titleJob&:idJob" component={DetailJob} />
                    <Route name='job-location'  path="/list-job/location-:location/:titleJob&:idJob" component={DetailJob} />
                    <Route name='job-hashtag' path="/list-job/hashtag-:hashtag/:titleJob&:idJob" component={DetailJob} />
                </Switch>
                {/* <Route component={Footer} /> */}
            </div>
        </Switch>
    )
}
export default UserApp;