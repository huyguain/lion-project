import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as GenerateCode from '../src/routes/GenerateCode';
import * as Panel from '../src/routes/Panel';
import * as Post from '../src/routes/Post';
import * as Template from './routes/Templates';
import * as Admin from './routes/Admin';
import * as Candidate from './routes/Candidate';
// import * as Fresher from './routes/Fresher'
import * as English from './routes/English'
import * as Question from './routes/Questions';
import * as Learning from './routes/LearningPath';
import * as WorkLocation from './routes/Location'
import * as WordOffer from './routes/WordOffer'
import * as Jobs from './routes/Jobs'
import * as Applier from './routes/Applier'
import * as University from './routes/university'
import * as Course from './routes/Course';
// import * as Student from './routes/Fresher';
import * as LearningPathCus from './routes/LearningPathCustomise';
import * as Class from './routes/Class'
import * as Testimonial from './routes/Testimonial';
import * as Category from './routes/Category';
import Auth from './common/Auth';
import HeaderMain from './common/Header';
import MyBreadCrumb from './common/BreadCrumb';
import Nav1 from './common/Nav1/Nav.jsx';
import { connect } from 'react-redux';


class AdminApp extends Component {
    render() {
        const { action } = this.props;
        return (
            <div className="wrapper" style={{ display: `flex`, flexDirection: `row`, backgroundSize: `100% 100%` }}>
                <Route component={Nav1} />
                
                <div className="w-right"
                    style={{
                        width: '100%',
                        paddingLeft: `${action === `OPEN_SIDEBAR` ? `240px` : `80px`}`,
                        transition: `all 0.2s`,
                    }}
                >
                    <div className="header" >
                        <Route role='Admin' component={HeaderMain} />
                    </div>
                    <div className="bread-crumb-0" >
                        <Route component={MyBreadCrumb} />
                    </div>
                    <div className="main">
                        <div className="content container-fluid">
                            <Switch >
                                <Auth path="/admin/generate/generate-code" role='Hr,Admin' component={GenerateCode.genCode} prop={this.props} />
                                <Auth path="/admin/generate" role='Hr,Admin' prop={this.props} component={GenerateCode.genTable} />
                                <Auth path="/admin/question" role='Hr,Admin' exact component={Question.listQuestion} />
                                <Auth path="/admin/question/upload-question" role='Hr,Admin' component={Question.uploadQuestion} />
                                <Auth path="/admin/question/view-question" role='Hr,Admin' component={Question.viewQuestion} />
                                <Auth path="/admin/question/add-question" role='Hr,Admin' component={Question.addQuestion} />
                                <Auth path="/admin/question/edit-question/:id" role='Hr,Admin' component={Question.addQuestion} />
                                <Auth path="/admin/question/view-detail/:id" role='Hr,Admin' component={Question.viewDetail} />
                                {/* LearningPath */}
                                <Auth path="/admin/learning-path/add" role='Hr,Admin' component={Learning.addLearning} />
                                <Auth path="/admin/learning-path/edit/:id" exact role='Hr,Admin' exact component={Learning.addLearning} />
                                <Auth path="/admin/learning-path/table" role='Hr,Admin' component={Learning.learningTable} />

                                {/* English */}
                                <Auth path="/admin/english/create-english" role='Hr,Admin' component={English.uploadQuestion} />
                                {/* list english entry test */}
                                <Auth path="/admin/english" exact role="Hr,Admin" component={English.listEnglishTest} />
                                {/* mark english test */}
                                <Auth path="/admin/english/mark-english-test/:id" role="Admin,Hr" component={English.MarkEnglishTest} /> 
                                <Auth path="/admin/english/create-english" role='Hr,Admin' component={English.uploadQuestion} /> 
                                {/* list english entry test */}
                                <Auth path="/admin/english" exact role="Hr,Admin" component={English.listEnglishTest} /> 
                                {/* mark english test */}
                                <Auth path="/admin/english/mark-english-test/:id" role="Admin,Hr" component={English.MarkEnglishTest} /> 
                                <Auth path="/admin/panel" role='Hr,Admin' exact component={Panel.list} />
                                <Auth path="/admin/panel/create-panel" exact role='Hr,Admin' exact component={Panel.form} />
                                <Auth path="/admin/panel/edit-panel/:id" exact role='Hr,Admin' exact component={Panel.form} />
                                <Auth path="/admin/panel/view/:id" role='Hr,Admin' component={Panel.view} />
                                <Auth path="/admin/post" role='Hr,Admin' exact component={Post.listPost} />

                                <Auth path="/admin/post/create-post" role='Hr,Admin' component={Post.upPost} />
                                <Auth path="/admin/post/edit-post/:id" role='Hr,Admin' component={Post.upPost} />
                                <Auth path="/admin/post/view/:id" role='Hr,Admin' component={Post.view} />


                                <Auth path="/admin/template/create-template" role='Hr,Admin' component={Template.addTemplate} />
                                <Auth path="/admin/template" role='Hr,Admin' component={Template.listTemplate} />

                                <Auth path="/admin/candidate/create-candidate" role='Hr,Admin' component={Candidate.addCandidate} />
                                <Auth path="/admin/candidate/edit-candidate/:id" role='Hr,Admin' component={Candidate.addCandidate} />
                                {/* <Auth path="/admin/candidate" role='Hr,Admin' exact component={Candidate.candidateTable} /> */}
                                {/* <Auth path="/admin/candidate/detail-test/:code" role='Hr,Admin' component={Candidate.reportTest} /> */}
                                <Auth path="/admin/candidate/import-candidate" role='Hr,Admin' component={Candidate.importCandidate} />
                                <Auth path="/admin/candidate/create-candidate" role='Hr,Admin' component={Candidate.addCandidate} />
                                <Auth path="/admin/candidate" role='Hr,Admin' exact component={Candidate.tableCandidate} />
                                <Auth path="/admin/candidate/edit-candidate/:id" role='Hr,Admin' component={Candidate.addCandidate} />
                                <Auth path="/admin/candidate/detail-test/:code" role='Hr,Admin' component={Candidate.reportTest} />
                                <Auth path="/admin/candidate/import-candidate" role='Hr,Admin' component={Candidate.importCandidate} />

                                <Auth path="/admin/admin/create-admin" role='Admin' component={Admin.addAdmin} />
                                <Auth path="/admin/admin/edit-admin/:id" role='Admin' component={Admin.addAdmin} />
                                <Auth path="/admin/admin" role='Admin' component={Admin.tableAdmin} />

                                <Auth path="/admin/course/create-course" role="Admin" component={Course.form} />
                                <Auth path="/admin/course/edit-course/:id" role="Admin" component={Course.form} />
                                <Auth path="/admin/course/view/:id" role="Admin" component={Course.view} />
                                <Auth path="/admin/course" exact role="Admin" component={Course.list} />

                                {/* <Auth path="/admin/student/create-student/:id" role="Admin" component={Student.form} /> */}
                                {/* Location */}
                                <Auth path="/admin/location/add" role='Hr,Admin' component={WorkLocation.addLocation} />
                                <Auth path="/admin/location/edit/:id" exact role='Hr,Admin' exact component={WorkLocation.addLocation} />
                                <Auth path="/admin/location" role='Hr,Admin' component={WorkLocation.locationTable} />

                                {/* Offer */}
                                <Auth path="/admin/offer/add" role='Hr,Admin' component={WordOffer.addOffer} />
                                <Auth path="/admin/offer/edit/:id" exact role='Hr,Admin' exact component={WordOffer.addOffer} />
                                <Auth path="/admin/offer" role='Hr,Admin' component={WordOffer.offerTable} />
                                {/* Job */}
                                <Auth path="/admin/jobs/add" role='Hr,Admin' component={Jobs.addJob} />
                                <Auth path="/admin/jobs/edit/:id" role='Hr,Admin' exact component={Jobs.addJob} />
                                <Auth path="/admin/jobs" exact role='Hr,Admin' component={Jobs.jobTable} />
                                {/* Applier */}
                                <Auth path="/admin/applier/add" role='Hr,Admin' component={Applier.addApplier} />
                                <Auth path="/admin/applier/edit/:id" role='Hr,Admin' component={Applier.addApplier} />
                                <Auth path="/admin/applier" exact role='Hr,Admin' component={Applier.applierTable} />
                                {/* <Auth path="/admin/student/create-student/:id" role="Admin" component={Fresher.form} /> */}
                                <Auth path="/admin/learning-pathCustomise/create-learningPathCustomise" role="Admin" component={LearningPathCus.addLearningPathCus} />
                                <Auth path="/admin/learning-pathCustomise" exact role="Admin" component={LearningPathCus.tableLearningPathCus} />
                                <Auth path="/admin/learning-pathCustomise/edit-learningPathCustomise/:id" role="Admin" component={LearningPathCus.addLearningPathCus} />
                                {/* Fresher */}
                                {/* <Auth path="/admin/fresher/create-fresher" role="Admin" component={Fresher.addFresher} />
                                <Auth path="/admin/fresher/edit-fresher/:id" role="Admin" component={Fresher.addFresher} />
                                <Auth path="/admin/fresher" exact role="Admin" component={Fresher.tableFresher} /> */}
                                {/* Class */}
                                <Auth path="/admin/class/create-class" role="Admin" component={Class.addClass} />
                                <Auth path="/admin/class/edit-class/:id" role="Admin" component={Class.addClass} />
                                <Auth path="/admin/class" exact role="Admin" component={Class.tableClass} />

                                <Auth path="/admin/testimonial/create-testimonial" exact role='Hr,Admin' component={Testimonial.form} />
                                <Auth path="/admin/testimonial/edit-testimonial/:id" exact role='Hr,Admin' component={Testimonial.form} />
                                <Auth path="/admin/testimonial" exact role='Hr,Admin' component={Testimonial.list} />
                                
                                <Auth path="/admin/category/create-category" exact role='Hr,Admin' component={Category.form} />
                                <Auth path="/admin/category/edit-category/:id" exact role='Hr,Admin' component={Category.form} />
                                <Auth path="/admin/category" exact role='Hr,Admin' component={Category.list} />
                            {/* University */}
                                <Auth path="/admin/university/add" role='Hr,Admin' component={University.addUniversity} />
                                <Auth path="/admin/university/edit/:id" exact role='Hr,Admin' exact component={University.addUniversity} />
                                <Auth path="/admin/university" exact role='Hr,Admin' component={University.universityTable} />
                                <Auth path="/admin/university/import" role='Hr,Admin' component={University.importUniversity} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        action: state.Sidebar
    }
}

export default connect(mapStateToProps, null)(AdminApp);