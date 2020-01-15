import React, { Component } from 'react';
import './Nav.css';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { closeSidebar, openSidebar } from '../../../../actions';
import Notification from './Notification';

class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			widthNav: '',
			rotareChevronRightUser: ``,
			rotareChevronRightCandidate: ``,
			rotareChevronRightEnglish: ``,
			rotareChevronRightQuestion: ``,
			rotareChevronRightTemplate: ``,
			rotareChevronRightEntry: ``,
			rotareChevronRightPanel: ``,
			rotareChevronRightPost: ``,
			rotareChevronRightCourse: ``,
			rotareChevronRightLearningPath: ``,
			rotareChevronRightJobs: ``,
			showNotifi : true,
		}
	}

	handleOnclickNav = e => {
		if (this.state.widthNav === ``) {
			this.props.openSidebar()
			this.setState({
				widthNav: `240px`
			})
		} else {
			this.props.closeSidebar()
			this.setState({
				widthNav: '',
				rotareChevronRightUser: '',
				rotareChevronRightCandidate: ``,
				rotareChevronRightEnglish: ``,
				rotareChevronRightQuestion: ``,
				rotareChevronRightTemplate: ``,
				rotareChevronRightEntry: ``,
				rotareChevronRightPanel: ``,
				rotareChevronRightPost: ``,
				rotareChevronRightCourse: ``,
				rotareChevronRightLearningPath: ``,
				rotareChevronRightJobs: ``,
			})
		}
	}

	handleClickItem = text => {
		if (this.state.widthNav === ``) {
			if (text === `user`) {
				this.props.history.push('/admin/admin');
			}
			if (text === `candidate`) {
				this.props.history.push('/admin/candidate');
			}
			if (text === `english`) {
				this.props.history.push('/admin/english');
			}
			if (text === `question`) {
				this.props.history.push('/admin/question/view-question');
			}
			if (text === `template`) {
				this.props.history.push('/admin/template');
			}
			if (text === `entry`) {
				this.props.history.push('/admin/generate');
			}
			if (text === `panel`) {
				this.props.history.push('/admin/panel');
			}
			if (text === `post`) {
				this.props.history.push('/admin/post');
			}
			if (text === `course`) {
				this.props.history.push('/admin/course/create-course');
			}
			if (text === `learningPath`) {
				this.props.history.push('/admin/learning-path/table');
			}
			if (text === `jobs`) {
				this.props.history.push('/admin/jobs');
			}

		} else {
			if (text === `user`) {
				this.setState({
					rotareChevronRightUser: `${this.state.rotareChevronRightUser === `user` ? `` : `user`}`,
				});
			}
			if (text === `candidate`) {
				this.setState({
					rotareChevronRightCandidate: `${this.state.rotareChevronRightCandidate === `candidate` ? `` : `candidate`}`,
				});
			}
			if (text === `english`) {
				this.setState({
					showNotifi : false,
					rotareChevronRightEnglish: `${this.state.rotareChevronRightEnglish === `english` ? `` : `english`}`,
				});
			}
			if (text === `question`) {
				this.setState({
					rotareChevronRightQuestion: `${this.state.rotareChevronRightQuestion === `question` ? `` : `question`}`,
				});
			}
			if (text === `template`) {
				this.setState({
					rotareChevronRightTemplate: `${this.state.rotareChevronRightTemplate === `template` ? `` : `template`}`,
				});
			}
			if (text === `entry`) {
				this.setState({
					rotareChevronRightEntry: `${this.state.rotareChevronRightEntry === `entry` ? `` : `entry`}`,
				});
			}
			if (text === `panel`) {
				this.setState({
					rotareChevronRightPanel: `${this.state.rotareChevronRightPanel === `panel` ? `` : `panel`}`,
				});
			}
			if (text === `post`) {
				this.setState({
					rotareChevronRightPost: `${this.state.rotareChevronRightPost === `post` ? `` : `post`}`,
				});
			}
			if (text === `course`) {
				this.setState({
					rotareChevronRightCourse: `${this.state.rotareChevronRightCourse === `course` ? `` : `course`}`,
				});
			}
			if (text === `learningPath`) {
				this.setState({
					rotareChevronRightLearningPath: `${this.state.rotareChevronRightLearningPath === `learningPath` ? `` : `learningPath`}`,
				});
			}
			if (text === `jobs`) {
				this.setState({
					rotareChevronRightJobs: `${this.state.rotareChevronRightJobs === `jobs` ? `` : `jobs`}`,
				});
			}
		}

	}


	render() {
		let display = this.state.widthNav === `` ? `none` : `block`;
		return (
			<div
				className="nav"
				style={{ width: `${this.state.widthNav}` }}
			>
				<div className="nav-d" onClick={e => this.handleOnclickNav(e)}>
					<Icon name="mail" size="big" />
				</div>
				<div className="avatar"></div>
				<div className="nav-sidebar">
					<div className="ns-scroll" id={`scroll-style`}>
						<ul>
							<li>
								<div className="item-title" onClick={_ => this.handleClickItem(`user`)}>
									<div>
										<Icon name='user' size="big" />
										<span style={{ display: display }}>Admin</span>
									</div>
									<Icon name="chevron right" size="small" style={{
										display: display,
										transform: `${this.state.rotareChevronRightUser === `user` ? `rotate(90deg)` : ``}`
									}}
									/>
								</div>
								<div
									className="item-linkto"
									style={{ height: `${this.state.rotareChevronRightUser === `user` ? `80px` : `0px`}` }}
								>
									<div>
										<Link to="/admin/admin">Admin</Link>
										<Link to="/admin/admin/create-admin">Add Admin</Link>
									</div>
								</div>
							</li>
						{/*Job*/}
							<li>
								<div className="item-title" onClick={_ => this.handleClickItem(`jobs`)}>
									<div>
										<Icon name='briefcase' size="big" />
										<span style={{ display: display }}>Jobs</span>
									</div>
									<Icon name="chevron right" size="small" style={{
										display: display,
										transform: `${this.state.rotareChevronRightJobs === `jobs` ? `rotate(90deg)` : ``}`
									}}
									/>
								</div>
								<div
									className="item-linkto"
									style={{ height: `${this.state.rotareChevronRightJobs === `jobs` ? `280px` : `0px`}` }}
								>
									<div>
										<Link to="/admin/category">Category</Link>
										<Link to="/admin/jobs">Jobs</Link>
										<Link to="/admin/offer">Offer</Link>
										<Link to="/admin/location">Location</Link>
										<Link to="/admin/category">Category</Link>
										<Link to="/admin/applier">Applicant</Link>
										<Link to="/admin/testimonial">Testimonial</Link>
										<Link to="/admin/university">University</Link>
									</div>
								</div>
							</li>

							<li>
								<div className="item-title" onClick={_ => this.handleClickItem(`candidate`)}>
									<div>
										<Icon name="student" size="big" />
										<span style={{ display: display }}>Candidate</span>
									</div>
									<Icon name="chevron right" size="small" style={{
										display: display,
										transform: `${this.state.rotareChevronRightCandidate === `candidate` ? `rotate(90deg)` : ``}`
									}}
									/>
								</div>
								<div
									className="item-linkto"
									style={{ height: `${this.state.rotareChevronRightCandidate === `candidate` ? `80px` : `0px`}` }}
								>
									<div>
										<Link to="/admin/candidate">Candidate</Link>
										<Link to="/admin/candidate/create-candidate">Add candidate</Link>
									</div>
								</div>
							</li>
							<li>
								<div className="item-title" onClick={_ => this.handleClickItem(`english`)}>
									<div>
										<Icon name="list layout" size="big" />
										<span style={{ display: display }}>English</span>
										<Notification showNotifi={this.state.showNotifi}/>
									</div>
									<Icon name="chevron right" size="small" style={{
										display: display,
										transform: `${this.state.rotareChevronRightEnglish === `english` ? `rotate(90deg)` : ``}`
									}}
									/>
								</div>
								<div
									className="item-linkto"
									style={{ height: `${this.state.rotareChevronRightEnglish === `english` ? `80px` : `0px`}` }}
								>
									<div>
										<Link to="/admin/english">English</Link>
										<Link to="/admin/english/create-english">Add english exam</Link>
									</div>
								</div>
							</li>
							<li>
								<div className="item-title" onClick={_ => this.handleClickItem(`question`)}>
									<div>
										<Icon name="question circle" size="big" />
										<span style={{ display: display }}>Question</span>
									</div>
									<Icon name="chevron right" size="small" style={{
										display: display,
										transform: `${this.state.rotareChevronRightQuestion === `question` ? `rotate(90deg)` : ``}`
									}}
									/>
								</div>
								<div
									className="item-linkto"
									style={{ height: `${this.state.rotareChevronRightQuestion === `question` ? `120px` : `0px`}` }}
								>
									<div>
										<Link to="/admin/question">Question</Link>
										<Link to="/admin/question/view-question">Question detail</Link>
										<Link to="/admin/question/add-question">Add question</Link>
									</div>
								</div>
							</li>
							<li>
								<div className="item-title" onClick={_ => this.handleClickItem(`template`)}>
									<div>
										<Icon name="browser" size="big" />
										<span style={{ display: display }}>Template</span>
									</div>
									<Icon name="chevron right" size="small" style={{
										display: display,
										transform: `${this.state.rotareChevronRightTemplate === `template` ? `rotate(90deg)` : ``}`
									}}
									/>
								</div>
								<div
									className="item-linkto"
									style={{ height: `${this.state.rotareChevronRightTemplate === `template` ? `80px` : `0px`}` }}
								>
									<div>
										<Link to="/admin/template">Template</Link>
										<Link to="/admin/template/create-template">Add template</Link>
									</div>
								</div>
							</li>
							<li>
								<div className="item-title" onClick={_ => this.handleClickItem(`entry`)}>
									<div>
										<Icon name="settings" size="big" />
										<span style={{ display: display }}>Entry Code</span>
									</div>
									<Icon name="chevron right" size="small" style={{
										display: display,
										transform: `${this.state.rotareChevronRightEntry === `entry` ? `rotate(90deg)` : ``}`
									}}
									/>
								</div>
								<div
									className="item-linkto"
									style={{ height: `${this.state.rotareChevronRightEntry === `entry` ? `80px` : `0px`}` }}
								>
									<div>
										<Link to="/admin/generate">Entry</Link>
										<Link to="/admin/generate/generate-code">Entry code</Link>
									</div>
								</div>
							</li>
							<li>
								<div className="item-title" onClick={_ => this.handleClickItem(`panel`)}>
									<div>
										<Icon name="newspaper" size="big" />
										<span style={{ display: display }}>Panel</span>
									</div>
									<Icon name="chevron right" size="small" style={{
										display: display,
										transform: `${this.state.rotareChevronRightPanel === `panel` ? `rotate(90deg)` : ``}`
									}}
									/>
								</div>
								<div
									className="item-linkto"
									style={{ height: `${this.state.rotareChevronRightPanel === `panel` ? `80px` : `0px`}` }}
								>
									<div>
										<Link to="/admin/panel">Panel</Link>
										<Link to="/admin/panel/create-panel">Add panel</Link>
									</div>
								</div>
							</li>
							<li>
								<div className="item-title" onClick={_ => this.handleClickItem(`post`)}>
									<div>
										<Icon name="pencil" size="big" />
										<span style={{ display: display }}>Post</span>
									</div>
									<Icon name="chevron right" size="small" style={{
										display: display,
										transform: `${this.state.rotareChevronRightPost === `post` ? `rotate(90deg)` : ``}`
									}}
									/>
								</div>
								<div
									className="item-linkto"
									style={{ height: `${this.state.rotareChevronRightPost === `post` ? `80px` : `0px`}` }}
								>
									<div>
										<Link to="/admin/post">Post</Link>
										<Link to="/admin/post/create-post">Add post</Link>
									</div>
								</div>
							</li>
							<li>
								<div className="item-title" onClick={_ => this.handleClickItem(`course`)}>
									<div>
										<Icon name="book" size="big" />
										<span style={{ display: display }}>Course</span>
									</div>
									<Icon name="chevron right" size="small" style={{
										display: display,
										transform: `${this.state.rotareChevronRightCourse === `course` ? `rotate(90deg)` : ``}`
									}}
									/>
								</div>
								<div
									className="item-linkto"
									style={{ height: `${this.state.rotareChevronRightCourse === `course` ? `40px` : `0px`}` }}
								>
									<div>
										<Link to="/admin/course/create-course">Add course</Link>
									</div>
								</div>
							</li>
							<li>
								<div className="item-title" onClick={_ => this.handleClickItem(`learningPath`)}>
									<div>
										<Icon name="tasks" size="big" />
										<span style={{ display: display }}>Learning path</span>
									</div>
									<Icon name="chevron right" size="small" style={{
										display: display,
										transform: `${this.state.rotareChevronRightLearningPath === `learningPath` ? `rotate(90deg)` : ``}`
									}}
									/>
								</div>
								<div
									className="item-linkto"
									style={{ height: `${this.state.rotareChevronRightLearningPath === `learningPath` ? `40px` : `0px`}` }}
								>
									<div>
										<Link to="">none</Link>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(null, { openSidebar, closeSidebar })(Nav);