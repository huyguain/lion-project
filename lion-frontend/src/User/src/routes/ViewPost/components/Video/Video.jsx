import React, { Component } from 'react';
import './Video.css';
const data = [
	{
		url: `https://www.youtube.com/watch?v=1zDMKX1QB6Q`,
		description: `Chia sẻ của học viên về Fresher Academy`
	},
	{
		url: `https://www.youtube.com/watch?v=_JdzwxX1teo`,
		description: `{FPT Software} Giảng viên FA tiết lộ cơ hội "khủng" tại FPT Software`
	},
	{
		url: `https://www.youtube.com/watch?v=lz4nrhI04Dk`,
		description: `{FPT Software} Hiểu về Nghề lập trình viên tại FPT Software`
	}
]

class Video extends Component {
	render() {
		return (
			<div className="video">
				<div className="v-tittle">Video</div>
				<div className="v-contents">{
					data.map((obj, i) => {
						return (
							<ul key={i} className={`${i===2?"ul-end":""}`}>
								<iframe 
									src={`https://www.youtube.com/embed/${obj.url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)[1]}?autoplay=0&rel=0&modestbranding=1`} 
									frameborder="0"
									allowfullscreen="allowfullscreen"
								></iframe>
								<div className="vc-description">{obj.description}</div>
							</ul>
						)
					})
				}</div>
			</div>
		)
	}
}

export default Video;