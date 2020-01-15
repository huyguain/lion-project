import React, { Component } from 'react';
import axios from 'axios';
import './ViewPost.css';
import config from '../../../../../config';
import ReactHtmlParser from 'react-html-parser';

import Video from './Video/Video.jsx';


class ViewPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			post: {},
		}
	}
	componentWillMount() {
		const { idPost } = this.props.match.params;
		axios.get(`${config.host}/post/${idPost}`)
			.then(res => {
				console.log('res', res.data)
				const { data } = res.data;
				if (res.status === 200) {
					this.setState({ post: data })
				}
			})
			.catch(err => {
				console.log('err', err);
			})
	}
	render() {
		let {  title, content, urlImage, create_at } = this.state.post;
		return (
			<div className="view-post">
				<div className="vp-left">
					<Video 
						video="mYFaghHyMKc" 
						autoplay="0" 
						rel="0" 
						modest="1"
					/>
				</div>
				<div className="vp-center">
					<div className="vpc-title">{title}</div>
					<div className="vpc-date">{(new Date(create_at)).toDateString()}</div>
					<div className="vpc-img">
						<image src={`${config.imageUrl}/${urlImage}`} />
					</div>
					<div className="vpc-description"> {ReactHtmlParser(content)}</div>
					<button className="vpc-button">Home</button>

				</div>
				<div className="vp-right"></div>

			</div>
		)
	}
}


export default ViewPost;